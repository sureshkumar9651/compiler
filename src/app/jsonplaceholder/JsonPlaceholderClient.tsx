'use client';

import { useState, useRef, useCallback, useEffect, startTransition } from 'react';
import {
  Send,
  X,
  Loader2,
  Copy,
  Download,
  ChevronDown,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Wifi,
  Ban,
  FlaskConical,
  BookOpen,
  History,
  ChevronRight,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type ResponseStatus = 'idle' | 'loading' | 'success' | 'error' | 'cancelled' | 'timeout' | 'network-error';

interface KV {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

interface ApiResponse {
  status: number;
  statusText: string;
  durationMs: number;
  sizeBytes: number;
  headers: Record<string, string>;
  bodyText: string;
  isJson: boolean;
  parsedJson?: unknown;
  isTruncated: boolean;
}

interface HistoryItem {
  id: string;
  method: HttpMethod;
  url: string;
  status: number | null;
  durationMs: number | null;
  timestamp: number;
}

interface ApiExample {
  label: string;
  description: string;
  method: HttpMethod;
  endpoint: string;
  params?: { key: string; value: string }[];
  bodyJson?: string;
  note?: string;
  category: string;
}

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const ALLOWED_ORIGIN = 'jsonplaceholder.typicode.com';
const TIMEOUT_MS = 30_000;
const MAX_HISTORY = 30;
const HISTORY_KEY = 'jscodelab:jsonplaceholder:history';
const MAX_RENDER = 200_000;

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: 'text-emerald-400',
  POST: 'text-amber-400',
  PUT: 'text-blue-400',
  PATCH: 'text-purple-400',
  DELETE: 'text-red-400',
};

const METHOD_BG: Record<HttpMethod, string> = {
  GET: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  POST: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  PUT: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  PATCH: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
  DELETE: 'bg-red-500/10 border-red-500/30 text-red-400',
};

const METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const EXAMPLES: ApiExample[] = [
  {
    category: 'Posts',
    label: 'GET All Posts',
    description: 'Fetch all available posts.',
    method: 'GET',
    endpoint: '/posts',
  },
  {
    category: 'Posts',
    label: 'GET Single Post',
    description: 'Fetch the details of a single post.',
    method: 'GET',
    endpoint: '/posts/1',
  },
  {
    category: 'Posts',
    label: 'Filter Posts by User',
    description: 'Fetch posts belonging to a particular user.',
    method: 'GET',
    endpoint: '/posts',
    params: [{ key: 'userId', value: '1' }],
  },
  {
    category: 'Posts',
    label: 'Limit Results',
    description: 'Fetch a limited number of posts.',
    method: 'GET',
    endpoint: '/posts',
    params: [{ key: '_limit', value: '5' }],
  },
  {
    category: 'Comments',
    label: 'GET Comments for Post',
    description: 'Fetch comments associated with post 1.',
    method: 'GET',
    endpoint: '/posts/1/comments',
  },
  {
    category: 'Posts',
    label: 'CREATE Post',
    description: 'Practice sending a JSON request body.',
    method: 'POST',
    endpoint: '/posts',
    bodyJson: JSON.stringify(
      { title: 'Learning JavaScript', body: 'Practicing REST APIs with JS CodeLab', userId: 1 },
      null,
      2
    ),
    note: 'Write operations are simulated. The API returns a fake response and does not permanently save the data.',
  },
  {
    category: 'Posts',
    label: 'REPLACE Post (PUT)',
    description: 'Practice sending a PUT request to replace a post.',
    method: 'PUT',
    endpoint: '/posts/1',
    bodyJson: JSON.stringify(
      { id: 1, title: 'Updated post title', body: 'Updated post content', userId: 1 },
      null,
      2
    ),
    note: 'Write operations are simulated. Changes are not permanently saved.',
  },
  {
    category: 'Posts',
    label: 'UPDATE Post (PATCH)',
    description: 'Practice sending a PATCH request to partially update a post.',
    method: 'PATCH',
    endpoint: '/posts/1',
    bodyJson: JSON.stringify({ title: 'Partially updated title' }, null, 2),
    note: 'Write operations are simulated. Changes are not permanently saved.',
  },
  {
    category: 'Posts',
    label: 'DELETE Post',
    description: 'Practice sending a DELETE request.',
    method: 'DELETE',
    endpoint: '/posts/1',
    note: 'Write operations are simulated. The post is not actually deleted.',
  },
  {
    category: 'Users',
    label: 'GET All Users',
    description: 'Fetch user records.',
    method: 'GET',
    endpoint: '/users',
  },
  {
    category: 'Albums',
    label: 'GET All Albums',
    description: 'Fetch album records.',
    method: 'GET',
    endpoint: '/albums',
  },
  {
    category: 'Todos',
    label: 'GET All Todos',
    description: 'Fetch todo records.',
    method: 'GET',
    endpoint: '/todos',
  },
  {
    category: 'Photos',
    label: 'GET All Photos',
    description: 'Fetch photo records.',
    method: 'GET',
    endpoint: '/photos',
  },
  {
    category: 'Comments',
    label: 'Filter Comments by Post',
    description: 'Filter comments by post ID.',
    method: 'GET',
    endpoint: '/comments',
    params: [{ key: 'postId', value: '1' }],
  },
];

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function makeKv(key = '', value = ''): KV {
  return { id: crypto.randomUUID(), key, value, enabled: true };
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function formatTimestamp(ts: number): string {
  return new Date(ts).toLocaleTimeString();
}

function validateUrl(raw: string): { valid: boolean; error?: string; url?: URL } {
  if (!raw.trim()) return { valid: false, error: 'Please enter a URL.' };

  let urlStr = raw.trim();
  if (!/^https?:\/\//i.test(urlStr)) urlStr = `https://${urlStr}`;

  let parsed: URL;
  try {
    parsed = new URL(urlStr);
  } catch {
    return { valid: false, error: 'The URL is not valid. Please check the format.' };
  }

  if (parsed.username || parsed.password) {
    return { valid: false, error: 'URLs with credentials are not allowed.' };
  }

  if (parsed.hostname !== ALLOWED_ORIGIN) {
    return {
      valid: false,
      error: `Only requests to ${ALLOWED_ORIGIN} are allowed in this playground.`,
    };
  }

  return { valid: true, url: parsed };
}

function buildUrl(baseUrl: string, params: KV[]): string {
  const enabled = params.filter((p) => p.enabled && p.key.trim());
  if (!enabled.length) return baseUrl;
  try {
    const url = new URL(baseUrl);
    for (const { key, value } of enabled) url.searchParams.append(key, value);
    return url.toString();
  } catch {
    const qs = enabled.map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join('&');
    return baseUrl.includes('?') ? `${baseUrl}&${qs}` : `${baseUrl}?${qs}`;
  }
}

function readHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(items: HistoryItem[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, MAX_HISTORY)));
  } catch {
    /* storage unavailable */
  }
}

function pushHistory(item: HistoryItem) {
  const existing = readHistory();
  saveHistory([item, ...existing]);
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────
function MethodSelector({
  method,
  onChange,
}: {
  method: HttpMethod;
  onChange: (m: HttpMethod) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-sm font-bold transition-colors ${METHOD_COLORS[method]}`}
        aria-label="Select HTTP method"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {method}
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <ul
            role="listbox"
            className="absolute left-0 top-full mt-1 z-20 w-32 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl overflow-hidden"
          >
            {METHODS.map((m) => (
              <li key={m} role="option" aria-selected={method === m}>
                <button
                  className={`w-full text-left px-4 py-2.5 text-sm font-semibold hover:bg-neutral-700 transition-colors ${METHOD_COLORS[m]} ${method === m ? 'bg-neutral-700' : ''}`}
                  onClick={() => {
                    onChange(m);
                    setOpen(false);
                  }}
                >
                  {m}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function KVEditor({
  pairs,
  onChange,
  keyPlaceholder = 'Key',
  valuePlaceholder = 'Value',
  addLabel = 'Add row',
}: {
  pairs: KV[];
  onChange: (pairs: KV[]) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  addLabel?: string;
}) {
  function update(id: string, field: keyof KV, val: string | boolean) {
    onChange(pairs.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  }
  function addRow() {
    onChange([...pairs, makeKv()]);
  }
  function removeRow(id: string) {
    const filtered = pairs.filter((p) => p.id !== id);
    onChange(filtered.length === 0 ? [makeKv()] : filtered);
  }

  return (
    <div className="flex flex-col gap-1 p-3">
      {pairs.map((pair) => (
        <div key={pair.id} className="flex items-center gap-2 group">
          <input
            type="checkbox"
            checked={pair.enabled}
            onChange={(e) => update(pair.id, 'enabled', e.target.checked)}
            className="accent-blue-500 shrink-0"
            aria-label={`Enable ${pair.key || 'row'}`}
          />
          <input
            type="text"
            value={pair.key}
            onChange={(e) => update(pair.id, 'key', e.target.value)}
            placeholder={keyPlaceholder}
            className="flex-1 min-w-0 px-2.5 py-1.5 rounded-md bg-neutral-800 border border-neutral-700 focus:border-blue-500 focus:outline-none text-sm text-neutral-200 placeholder-neutral-600 font-mono transition-colors"
            spellCheck={false}
            aria-label="Key"
          />
          <input
            type="text"
            value={pair.value}
            onChange={(e) => update(pair.id, 'value', e.target.value)}
            placeholder={valuePlaceholder}
            className="flex-1 min-w-0 px-2.5 py-1.5 rounded-md bg-neutral-800 border border-neutral-700 focus:border-blue-500 focus:outline-none text-sm text-neutral-200 placeholder-neutral-600 font-mono transition-colors"
            spellCheck={false}
            aria-label="Value"
          />
          <button
            onClick={() => removeRow(pair.id)}
            className="p-1 rounded text-neutral-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
            aria-label="Remove row"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        onClick={addRow}
        className="self-start mt-1 flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-md transition-colors"
        aria-label={addLabel}
      >
        <Plus className="h-3.5 w-3.5" />
        {addLabel}
      </button>
    </div>
  );
}

function StatusBadge({ status }: { status: number }) {
  const colorClass =
    status >= 200 && status < 300
      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
      : status >= 300 && status < 400
      ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
      : status >= 400 && status < 500
      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
      : 'bg-red-500/20 text-red-400 border-red-500/40';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold font-mono border ${colorClass}`}>
      {status}
    </span>
  );
}

// ─────────────────────────────────────────────
// Main Client Component
// ─────────────────────────────────────────────
export function JsonPlaceholderClient() {
  // ── Request state ──
  const [method, setMethodState] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState(`${BASE_URL}/posts`);
  const [params, setParams] = useState<KV[]>([makeKv()]);
  const [headers, setHeaders] = useState<KV[]>([makeKv()]);
  const [bodyJson, setBodyJson] = useState('{\n  \n}');
  const [urlError, setUrlError] = useState<string | null>(null);

  // ── Response state ──
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>('idle');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [responseTab, setResponseTab] = useState<'body' | 'headers'>('body');

  // ── UI state ──
  const [requestTab, setRequestTab] = useState<'params' | 'headers' | 'body'>('params');
  const [activePanel, setActivePanel] = useState<'builder' | 'examples' | 'history'>('builder');
  const [mobileTab, setMobileTab] = useState<'request' | 'response'>('request');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const abortRef = useRef<AbortController | null>(null);

  // Load history on mount
  useEffect(() => {
    startTransition(() => {
      setHistory(readHistory());
    });
  }, []);

  const setMethod = useCallback((m: HttpMethod) => {
    setMethodState(m);
    if (m === 'POST') {
      setBodyJson(
        JSON.stringify({ title: 'Learning JavaScript', body: 'Testing REST APIs with JS CodeLab', userId: 1 }, null, 2)
      );
    } else if (m === 'PUT') {
      setBodyJson(
        JSON.stringify({ id: 1, title: 'Updated post title', body: 'Updated post content', userId: 1 }, null, 2)
      );
    } else if (m === 'PATCH') {
      setBodyJson(JSON.stringify({ title: 'Partially updated title' }, null, 2));
    }
  }, []);

  // Derived
  const isBodyMethod = method === 'POST' || method === 'PUT' || method === 'PATCH';
  const resolvedUrl = (() => {
    try {
      const base = /^https?:\/\//i.test(url) ? url : `https://${url}`;
      return buildUrl(base, params);
    } catch {
      return url;
    }
  })();

  // ── Request send ──
  const sendRequest = useCallback(async () => {
    // Abort any in-flight request
    if (abortRef.current) abortRef.current.abort();

    // Validate URL
    const validation = validateUrl(url);
    if (!validation.valid) {
      setUrlError(validation.error ?? 'Invalid URL');
      return;
    }
    setUrlError(null);

    // Validate JSON body
    if (isBodyMethod && bodyJson.trim()) {
      try {
        JSON.parse(bodyJson);
      } catch (e) {
        setUrlError((e as Error).message);
        return;
      }
    }

    const controller = new AbortController();
    abortRef.current = controller;

    const timeoutHandle = setTimeout(
      () => controller.abort(new DOMException('Request timed out', 'TimeoutError')),
      TIMEOUT_MS
    );

    setResponseStatus('loading');
    setResponse(null);
    setErrorMessage(null);

    const startTime = performance.now();

    try {
      // Build final URL with params
      const finalUrl = buildUrl(validation.url!.toString(), params);

      // Build headers
      const reqHeaders = new Headers();
      for (const h of headers) {
        if (h.enabled && h.key.trim()) reqHeaders.set(h.key.trim(), h.value);
      }

      // Build body
      let body: BodyInit | undefined;
      if (isBodyMethod && bodyJson.trim()) {
        reqHeaders.set('Content-Type', 'application/json');
        body = bodyJson;
      }

      const res = await fetch(finalUrl, {
        method,
        headers: reqHeaders,
        body,
        signal: controller.signal,
      });

      clearTimeout(timeoutHandle);
      const durationMs = Math.round(performance.now() - startTime);

      // Parse headers
      const responseHeaders: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      // Parse body
      const buffer = await res.arrayBuffer();
      const sizeBytes = buffer.byteLength;
      const isTruncated = sizeBytes > MAX_RENDER;
      const slice = isTruncated ? buffer.slice(0, MAX_RENDER) : buffer;
      const bodyText = new TextDecoder('utf-8', { fatal: false }).decode(slice);

      // Parse JSON
      let isJson = false;
      let parsedJson: unknown;
      try {
        parsedJson = JSON.parse(bodyText);
        isJson = true;
      } catch {
        /* not JSON */
      }

      const responseData: ApiResponse = {
        status: res.status,
        statusText: res.statusText,
        durationMs,
        sizeBytes,
        headers: responseHeaders,
        bodyText,
        isJson,
        parsedJson,
        isTruncated,
      };

      setResponse(responseData);
      setResponseStatus('success');

      // Save to history
      const historyEntry: HistoryItem = {
        id: crypto.randomUUID(),
        method,
        url: finalUrl,
        status: res.status,
        durationMs,
        timestamp: Date.now(),
      };
      pushHistory(historyEntry);
      setHistory(readHistory());
    } catch (err: unknown) {
      clearTimeout(timeoutHandle);
      const durationMs = Math.round(performance.now() - startTime);

      if (err instanceof DOMException && (err.name === 'AbortError' || err.name === 'TimeoutError')) {
        if (controller.signal.aborted && err.name !== 'TimeoutError') {
          setResponseStatus('cancelled');
          setErrorMessage('Request was cancelled.');
        } else {
          setResponseStatus('timeout');
          setErrorMessage(`Request timed out after ${TIMEOUT_MS / 1000} seconds.`);
        }
        return;
      }

      const msg =
        err instanceof TypeError && err.message.toLowerCase().includes('fetch')
          ? `Network error — the request failed.\n\nPossible causes:\n• CORS: The server did not include Access-Control-Allow-Origin headers.\n• The server is unreachable or offline.\n• The URL is incorrect.\n\nDuration: ${durationMs}ms`
          : String(err);

      setResponseStatus('network-error');
      setErrorMessage(msg);
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
    }
  }, [url, method, params, headers, bodyJson, isBodyMethod]);

  const cancelRequest = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
      setResponseStatus('cancelled');
      setErrorMessage('Request was cancelled.');
    }
  }, []);

  // ── Apply example ──
  const applyExample = useCallback((ex: ApiExample) => {
    setMethodState(ex.method);
    setUrl(`${BASE_URL}${ex.endpoint}`);
    setParams(ex.params ? ex.params.map((p) => ({ id: crypto.randomUUID(), key: p.key, value: p.value, enabled: true })) : [makeKv()]);
    setHeaders([makeKv()]);
    setBodyJson(ex.bodyJson ?? '{\n  \n}');
    setUrlError(null);
    setResponseStatus('idle');
    setResponse(null);
    setErrorMessage(null);
    setActivePanel('builder');
  }, []);

  // ── Apply history item ──
  const applyHistory = useCallback((item: HistoryItem) => {
    setUrl(item.url);
    setMethodState(item.method);
    setParams([makeKv()]);
    setHeaders([makeKv()]);
    setBodyJson('{\n  \n}');
    setResponseStatus('idle');
    setResponse(null);
    setErrorMessage(null);
    setActivePanel('builder');
  }, []);

  // ── Copy response ──
  const copyResponse = useCallback(async () => {
    if (!response) return;
    const text = response.isJson
      ? JSON.stringify(response.parsedJson, null, 2)
      : response.bodyText;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: create textarea
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [response]);

  // ── Download response ──
  const downloadResponse = useCallback(() => {
    if (!response) return;
    const text = response.isJson
      ? JSON.stringify(response.parsedJson, null, 2)
      : response.bodyText;
    const ext = response.isJson ? 'json' : 'txt';
    const mime = response.isJson ? 'application/json' : 'text/plain';
    const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `jsonplaceholder-response-${ts}.${ext}`;
    const blob = new Blob([text], { type: mime });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(href);
  }, [response]);

  // Compute jsonError as a derived value
  const jsonError = (() => {
    if (!isBodyMethod || !bodyJson.trim()) return null;
    try {
      JSON.parse(bodyJson);
      return null;
    } catch (e) {
      return (e as Error).message;
    }
  })();

  const activeParamCount = params.filter((p) => p.enabled && p.key.trim()).length;
  const activeHeaderCount = headers.filter((h) => h.enabled && h.key.trim()).length;

  // ─── Render ───────────────────────────────────
  return (
    <div className="w-full">
      {/* ── Page Hero ── */}
      <section className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider">
                <FlaskConical className="h-3.5 w-3.5" />
                REST API Playground
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                JSONPlaceholder API Playground
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                Test REST APIs online, explore JSON responses, and practice HTTP requests with JSONPlaceholder.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  onClick={() => {
                    setActivePanel('builder');
                    document.getElementById('jph-playground')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors shadow-sm"
                >
                  <Send className="h-4 w-4" />
                  Start Testing
                </button>
                <button
                  onClick={() => {
                    setActivePanel('examples');
                    document.getElementById('jph-playground')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-sm font-semibold transition-colors border border-neutral-200 dark:border-neutral-700"
                >
                  <BookOpen className="h-4 w-4" />
                  Explore API Examples
                </button>
              </div>
            </div>

            {/* Resource chips */}
            <div className="shrink-0">
              <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-2 font-medium uppercase tracking-wider">Available Resources</p>
              <div className="flex flex-wrap gap-2 max-w-xs">
                {['posts', 'comments', 'albums', 'photos', 'todos', 'users'].map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setUrl(`${BASE_URL}/${r}`);
                      setMethodState('GET');
                      setParams([makeKv()]);
                      setActivePanel('builder');
                      document.getElementById('jph-playground')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-mono font-medium transition-colors border border-neutral-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-700"
                  >
                    /{r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notice banner */}
          <div className="mt-6 flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-400 text-sm">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <p>
              <strong>Note:</strong> JSONPlaceholder is a free fake REST API for testing and prototyping. Write
              operations (POST, PUT, PATCH, DELETE) are simulated and are{' '}
              <strong>not permanently saved</strong>.{' '}
              <a
                href="https://jsonplaceholder.typicode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                Learn more
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── Playground ── */}
      <section id="jph-playground" className="max-w-6xl mx-auto px-4 py-8">
        {/* Panel toggle (desktop) */}
        <div className="hidden md:flex items-center gap-1 mb-4 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 w-fit">
          {[
            { id: 'builder' as const, label: 'Request Builder', icon: Send },
            { id: 'examples' as const, label: 'Examples', icon: BookOpen },
            { id: 'history' as const, label: 'History', icon: History },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActivePanel(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePanel === id
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Mobile panel toggle */}
        <div className="flex md:hidden items-center gap-1 mb-4 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
          {[
            { id: 'builder' as const, label: 'Builder', icon: Send },
            { id: 'examples' as const, label: 'Examples', icon: BookOpen },
            { id: 'history' as const, label: 'History', icon: History },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActivePanel(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activePanel === id
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* ── Examples Panel ── */}
        {activePanel === 'examples' && (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Ready-Made API Examples</h2>
              <p className="text-xs text-neutral-500 mt-1">Click an example to load it into the request builder. No request is sent automatically.</p>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => applyExample(ex)}
                  className="text-left p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-neutral-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded border ${METHOD_BG[ex.method]}`}>
                      {ex.method}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 truncate">
                      {ex.endpoint}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    {ex.label}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">{ex.description}</p>
                  {ex.note && (
                    <p className="mt-1.5 text-xs text-amber-600 dark:text-amber-400 italic">{ex.note}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── History Panel ── */}
        {activePanel === 'history' && (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Request History</h2>
                <p className="text-xs text-neutral-500 mt-0.5">Stored locally in your browser. Click to restore.</p>
              </div>
              {history.length > 0 && (
                <button
                  onClick={() => {
                    saveHistory([]);
                    setHistory([]);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors border border-red-200 dark:border-red-900/50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear All
                </button>
              )}
            </div>
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-neutral-400 dark:text-neutral-600 gap-3">
                <History className="h-10 w-10" />
                <p className="text-sm">No request history yet. Send a request to get started.</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => applyHistory(item)}
                    className="w-full text-left px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-3"
                  >
                    <span className={`text-xs font-bold font-mono w-14 shrink-0 ${METHOD_COLORS[item.method]}`}>
                      {item.method}
                    </span>
                    <span className="flex-1 text-xs font-mono text-neutral-600 dark:text-neutral-400 truncate">
                      {item.url}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      {item.status !== null && <StatusBadge status={item.status} />}
                      {item.durationMs !== null && (
                        <span className="text-xs text-neutral-400">{item.durationMs}ms</span>
                      )}
                      <span className="text-xs text-neutral-400">{formatTimestamp(item.timestamp)}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Request Builder + Response ── */}
        {activePanel === 'builder' && (
          <>
            {/* Mobile tab bar */}
            <div className="flex md:hidden border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden mb-4">
              {(['request', 'response'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setMobileTab(t)}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors capitalize ${
                    mobileTab === t
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* ── Request Builder ── */}
              <div
                className={`${mobileTab === 'response' ? 'hidden md:flex' : 'flex'} flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden`}
              >
                {/* Method + URL + Send */}
                <div className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
                  <MethodSelector method={method} onChange={setMethod} />
                  <div className="flex-1 min-w-0">
                    <input
                      id="jph-url-input"
                      type="text"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        setUrlError(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && responseStatus !== 'loading') sendRequest();
                      }}
                      placeholder="https://jsonplaceholder.typicode.com/posts"
                      className={`w-full px-3 py-2 rounded-lg bg-white dark:bg-neutral-800 border ${
                        urlError
                          ? 'border-red-500'
                          : 'border-neutral-200 dark:border-neutral-700 focus:border-blue-500'
                      } focus:outline-none text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 transition-colors font-mono`}
                      aria-label="Request URL"
                      autoComplete="off"
                      spellCheck={false}
                    />
                    {urlError && (
                      <p className="text-xs text-red-500 mt-1 px-1">{urlError}</p>
                    )}
                  </div>
                  {responseStatus === 'loading' ? (
                    <button
                      id="jph-cancel-btn"
                      onClick={cancelRequest}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors shrink-0"
                      aria-label="Cancel request"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  ) : (
                    <button
                      id="jph-send-btn"
                      onClick={sendRequest}
                      disabled={!url.trim()}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors shrink-0"
                      aria-label="Send request"
                    >
                      <Send className="h-4 w-4" />
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  )}
                </div>

                {/* URL preview */}
                {activeParamCount > 0 && (
                  <div className="px-3 py-1.5 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 font-mono truncate">
                      <span className="text-neutral-500 dark:text-neutral-600">URL: </span>
                      {resolvedUrl}
                    </p>
                  </div>
                )}

                {/* Request tabs */}
                <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'params' as const, label: 'Params', badge: activeParamCount > 0 ? activeParamCount : null },
                    { id: 'headers' as const, label: 'Headers', badge: activeHeaderCount > 0 ? activeHeaderCount : null },
                    {
                      id: 'body' as const,
                      label: 'Body',
                      badge: null,
                      disabled: !isBodyMethod,
                    },
                  ].map(({ id, label, badge, disabled }) => (
                    <button
                      key={id}
                      id={`jph-tab-${id}`}
                      onClick={() => !disabled && setRequestTab(id)}
                      disabled={disabled}
                      className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                        requestTab === id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : disabled
                          ? 'border-transparent text-neutral-300 dark:text-neutral-700 cursor-not-allowed'
                          : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                      }`}
                      role="tab"
                      aria-selected={requestTab === id}
                    >
                      {label}
                      {badge !== null && (
                        <span className="text-xs bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded px-1.5 py-0.5 font-mono">
                          {badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="flex-1 overflow-y-auto min-h-0" style={{ maxHeight: '400px' }}>
                  {requestTab === 'params' && (
                    <KVEditor
                      pairs={params}
                      onChange={setParams}
                      keyPlaceholder="param"
                      valuePlaceholder="value"
                      addLabel="Add parameter"
                    />
                  )}
                  {requestTab === 'headers' && (
                    <KVEditor
                      pairs={headers}
                      onChange={setHeaders}
                      keyPlaceholder="Header-Name"
                      valuePlaceholder="value"
                      addLabel="Add header"
                    />
                  )}
                  {requestTab === 'body' && isBodyMethod && (
                    <div className="flex flex-col gap-2 p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">Content-Type: application/json</span>
                        <button
                          onClick={() => {
                            try {
                              const pretty = JSON.stringify(JSON.parse(bodyJson), null, 2);
                              setBodyJson(pretty);
                            } catch {
                              /* invalid JSON, ignore */
                            }
                          }}
                          className="ml-auto text-xs px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 transition-colors"
                          title="Format JSON"
                        >
                          <RefreshCw className="h-3 w-3 inline mr-1" />
                          Format
                        </button>
                        <button
                          onClick={() => setBodyJson('{\n  \n}')}
                          className="text-xs px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 transition-colors"
                          title="Clear body"
                        >
                          <X className="h-3 w-3 inline mr-1" />
                          Clear
                        </button>
                      </div>
                      <textarea
                        id="jph-body-textarea"
                        value={bodyJson}
                        onChange={(e) => setBodyJson(e.target.value)}
                        rows={12}
                        className={`w-full px-3 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 border ${
                          jsonError
                            ? 'border-red-500'
                            : 'border-neutral-200 dark:border-neutral-700 focus:border-blue-500'
                        } focus:outline-none text-sm text-neutral-800 dark:text-neutral-200 font-mono resize-none transition-colors leading-relaxed`}
                        spellCheck={false}
                        aria-label="JSON request body"
                      />
                      {jsonError && (
                        <p className="text-xs text-red-500 font-mono">{jsonError}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Response Panel ── */}
              <div
                className={`${mobileTab === 'request' ? 'hidden md:flex' : 'flex'} flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden`}
                aria-live="polite"
                aria-atomic="true"
              >
                {/* Response header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
                  <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Response
                  </span>
                  {response && responseStatus === 'success' && (
                    <>
                      <StatusBadge status={response.status} />
                      {response.statusText && (
                        <span className="text-xs text-neutral-400">{response.statusText}</span>
                      )}
                      <span className="ml-auto text-xs text-neutral-400 font-mono">{response.durationMs}ms</span>
                      <span className="text-xs text-neutral-400 font-mono">{formatSize(response.sizeBytes)}</span>
                    </>
                  )}
                </div>

                {/* Response tabs */}
                {response && responseStatus === 'success' && (
                  <>
                    <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 shrink-0">
                      {(['body', 'headers'] as const).map((tab) => (
                        <button
                          key={tab}
                          id={`jph-response-tab-${tab}`}
                          onClick={() => setResponseTab(tab)}
                          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors capitalize ${
                            responseTab === tab
                              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                              : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                          }`}
                          role="tab"
                          aria-selected={responseTab === tab}
                        >
                          {tab}
                        </button>
                      ))}
                      {/* Action buttons */}
                      <div className="ml-auto flex items-center gap-1 pr-3">
                        <button
                          onClick={copyResponse}
                          title={copied ? 'Copied!' : 'Copy response'}
                          className="flex items-center gap-1 px-2 py-1.5 rounded text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                        </button>
                        <button
                          onClick={downloadResponse}
                          title="Download response"
                          className="flex items-center gap-1 px-2 py-1.5 rounded text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Download</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Response content */}
                <div className="flex-1 overflow-auto min-h-0" style={{ minHeight: '300px', maxHeight: '500px' }}>
                  {/* Idle */}
                  {responseStatus === 'idle' && (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-neutral-400 dark:text-neutral-600 py-16">
                      <div className="h-14 w-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                        <Send className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium">Enter a URL and click Send</p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-600">The response will appear here</p>
                    </div>
                  )}

                  {/* Loading */}
                  {responseStatus === 'loading' && (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-neutral-500 py-16">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                      <p className="text-sm font-medium">Sending request…</p>
                    </div>
                  )}

                  {/* Cancelled */}
                  {responseStatus === 'cancelled' && (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-neutral-400 py-16">
                      <Ban className="h-8 w-8 text-neutral-400" />
                      <p className="text-sm">Request cancelled.</p>
                    </div>
                  )}

                  {/* Timeout */}
                  {responseStatus === 'timeout' && (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-amber-500 py-16">
                      <Clock className="h-8 w-8" />
                      <p className="text-sm font-medium">{errorMessage}</p>
                    </div>
                  )}

                  {/* Network error */}
                  {responseStatus === 'network-error' && (
                    <div className="flex flex-col p-4 gap-3 overflow-auto">
                      <div className="flex items-center gap-2 text-red-500">
                        <Wifi className="h-5 w-5" />
                        <span className="font-semibold text-sm">Network Error</span>
                      </div>
                      <pre className="text-xs text-neutral-700 dark:text-neutral-300 font-mono whitespace-pre-wrap bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50 rounded-lg p-3 leading-relaxed">
                        {errorMessage}
                      </pre>
                    </div>
                  )}

                  {/* Generic error */}
                  {responseStatus === 'error' && (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-red-500 py-16">
                      <AlertCircle className="h-8 w-8" />
                      <p className="text-sm font-medium">{errorMessage}</p>
                    </div>
                  )}

                  {/* Success */}
                  {responseStatus === 'success' && response && (
                    <>
                      {responseTab === 'body' && (
                        <div className="p-3">
                          {response.isTruncated && (
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-700 dark:text-amber-400 mb-3">
                              ⚠ Response body is large and has been truncated for display.
                            </div>
                          )}
                          {!response.bodyText && !response.isTruncated ? (
                            <div className="flex items-center justify-center py-12 text-neutral-400 dark:text-neutral-600 text-sm">
                              {response.status === 200 || response.status === 204
                                ? 'Empty response body (this is expected for DELETE requests).'
                                : 'No response body.'}
                            </div>
                          ) : (
                            <pre className="text-xs font-mono text-neutral-700 dark:text-neutral-200 whitespace-pre-wrap break-words leading-relaxed">
                              {response.isJson
                                ? JSON.stringify(response.parsedJson, null, 2).slice(0, MAX_RENDER)
                                : response.bodyText.slice(0, MAX_RENDER)}
                            </pre>
                          )}
                        </div>
                      )}

                      {responseTab === 'headers' && (
                        <div className="p-3 overflow-auto">
                          <table className="w-full text-xs font-mono">
                            <thead>
                              <tr className="text-neutral-500 border-b border-neutral-200 dark:border-neutral-800">
                                <th className="text-left py-2 pr-4 font-semibold">Header</th>
                                <th className="text-left py-2 font-semibold">Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(response.headers).map(([key, val]) => (
                                <tr
                                  key={key}
                                  className="border-b border-neutral-100 dark:border-neutral-800/60 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                                >
                                  <td className="py-2 pr-4 text-blue-600 dark:text-blue-400 align-top">{key}</td>
                                  <td className="py-2 text-neutral-600 dark:text-neutral-300 break-all">{val}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {Object.keys(response.headers).length === 0 && (
                            <p className="text-neutral-400 text-sm text-center py-8">
                              No response headers available (browser may restrict access to some headers).
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── Integration links ── */}
        <div className="mt-6 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-wrap gap-3 items-center">
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 shrink-0">Try in JS CodeLab:</span>
          <Link
            href="/playground"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-950/60 transition-colors border border-blue-200 dark:border-blue-800"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            JS Playground
          </Link>
          <Link
            href="/api-playground"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 text-xs font-semibold hover:bg-purple-100 dark:hover:bg-purple-950/60 transition-colors border border-purple-200 dark:border-purple-800"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            API Playground
          </Link>
          <Link
            href="/examples"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-950/60 transition-colors border border-emerald-200 dark:border-emerald-800"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Code Examples
          </Link>
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors border border-amber-200 dark:border-amber-800"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Learn JS
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          REST API Learning Center (Server-rendered)
      ───────────────────────────────────────────── */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              REST API Learning Center
            </div>
            <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Learn REST APIs with JSONPlaceholder
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-3 max-w-2xl mx-auto">
              Practical documentation to help you understand HTTP methods, status codes, and API testing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Section A */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold shrink-0">A</span>
                What is JSONPlaceholder?
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">JSONPlaceholder</a> is a free, open-source fake REST API designed for learning, prototyping, and testing HTTP requests. It provides realistic data across six resource types without requiring you to set up a backend, database, or authentication system. It&apos;s the go-to tool for developers learning how to work with APIs.
              </p>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50">
                <p className="text-sm text-blue-700 dark:text-blue-300 font-semibold mb-1">Key Features</p>
                <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                  <li>✓ Free and open source</li>
                  <li>✓ No signup or authentication required</li>
                  <li>✓ Supports all HTTP methods</li>
                  <li>✓ CORS-enabled for browser requests</li>
                  <li>✓ Returns realistic JSON data</li>
                </ul>
              </div>
            </div>

            {/* Section B */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-sm font-bold shrink-0">B</span>
                Available Resources
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Posts', path: '/posts', desc: '100 posts with title, body, and userId' },
                  { name: 'Comments', path: '/comments', desc: '500 comments linked to posts' },
                  { name: 'Albums', path: '/albums', desc: '100 albums with userId' },
                  { name: 'Photos', path: '/photos', desc: '5000 photos with thumbnailUrl' },
                  { name: 'Todos', path: '/todos', desc: '200 todos with completed status' },
                  { name: 'Users', path: '/users', desc: '10 users with contact details' },
                ].map((r) => (
                  <div key={r.name} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-1.5 py-0.5 rounded">
                        {r.path}
                      </code>
                    </div>
                    <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">{r.name}</p>
                    <p className="text-xs text-neutral-500">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section C */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 text-sm font-bold shrink-0">C</span>
                HTTP Methods
              </h3>
              <div className="space-y-2">
                {[
                  { method: 'GET', color: 'emerald', desc: 'Retrieve data from the server. No request body needed. Safe and idempotent.' },
                  { method: 'POST', color: 'amber', desc: 'Create or simulate creation of a new resource. Sends a JSON body. Returns 201 Created.' },
                  { method: 'PUT', color: 'blue', desc: 'Replace an entire resource representation. Requires the full object in the body.' },
                  { method: 'PATCH', color: 'purple', desc: 'Partially update a resource. Only send the fields you want to change.' },
                  { method: 'DELETE', color: 'red', desc: 'Delete or simulate deletion of a resource. Returns 200 OK with an empty object {}.' },
                ].map(({ method: m, desc }) => (
                  <div key={m} className="flex gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <span className={`text-xs font-bold font-mono shrink-0 w-14 px-1.5 py-1 rounded text-center border ${METHOD_BG[m as HttpMethod]}`}>
                      {m}
                    </span>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-700 dark:text-amber-400">
                <strong>Important:</strong> JSONPlaceholder simulates write operations. POST/PUT/PATCH/DELETE requests return fake success responses, but no data is actually modified or stored.
              </div>
            </div>

            {/* Section D */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 text-sm font-bold shrink-0">D</span>
                HTTP Status Codes
              </h3>
              <div className="space-y-2">
                {[
                  { code: 200, name: 'OK', desc: 'Request succeeded. Body contains the result.' },
                  { code: 201, name: 'Created', desc: 'Resource was created (POST). Body contains the new resource.' },
                  { code: 204, name: 'No Content', desc: 'Request succeeded but there is no response body.' },
                  { code: 400, name: 'Bad Request', desc: 'The request was malformed or had invalid data.' },
                  { code: 401, name: 'Unauthorized', desc: 'Authentication is required and was not provided.' },
                  { code: 403, name: 'Forbidden', desc: 'Authenticated but not permitted to access this resource.' },
                  { code: 404, name: 'Not Found', desc: 'The requested resource does not exist.' },
                  { code: 429, name: 'Too Many Requests', desc: 'Rate limit exceeded. Wait before retrying.' },
                  { code: 500, name: 'Internal Server Error', desc: 'An unexpected server-side error occurred.' },
                ].map(({ code, name, desc }) => {
                  const color =
                    code < 300 ? 'emerald' : code < 400 ? 'blue' : code < 500 ? 'amber' : 'red';
                  const colorMap: Record<string, string> = {
                    emerald: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400',
                    blue: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-400',
                    amber: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-400',
                    red: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400',
                  };
                  return (
                    <div key={code} className="flex gap-3 items-start">
                      <span className={`text-xs font-bold font-mono px-2 py-1 rounded border shrink-0 ${colorMap[color]}`}>
                        {code}
                      </span>
                      <div>
                        <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{name}</span>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section E */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold shrink-0">E</span>
                Query Parameters
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                Query parameters allow you to filter, limit, and paginate results. JSONPlaceholder supports several built-in parameters:
              </p>
              <div className="space-y-3">
                {[
                  { url: '/posts?userId=1', desc: 'Filter posts by a specific user ID.' },
                  { url: '/comments?postId=1', desc: 'Filter comments belonging to post 1.' },
                  { url: '/posts?_limit=5', desc: 'Limit the response to 5 items.' },
                  { url: '/posts?_start=0&_limit=10', desc: 'Paginate: skip 0, return 10 posts.' },
                  { url: '/albums?userId=1', desc: 'Fetch albums for a specific user.' },
                  { url: '/todos?userId=1', desc: 'Fetch todos for a specific user.' },
                ].map(({ url: u, desc }) => (
                  <div key={u} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <code className="text-sm font-mono text-blue-600 dark:text-blue-400 block mb-1 break-all">{u}</code>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section F */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-sm font-bold shrink-0">F</span>
                Request Headers
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                HTTP headers carry metadata about the request and response. These are the most common ones:
              </p>
              <div className="space-y-3">
                {[
                  {
                    header: 'Content-Type: application/json',
                    desc: 'Tells the server that the request body is JSON. Required for POST, PUT, and PATCH.',
                  },
                  {
                    header: 'Accept: application/json',
                    desc: 'Tells the server what format you can handle in the response.',
                  },
                  {
                    header: 'Authorization: Bearer <token>',
                    desc: 'Used for authenticated APIs. JSONPlaceholder does not require this.',
                  },
                ].map(({ header, desc }) => (
                  <div key={header} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <code className="text-sm font-mono text-purple-600 dark:text-purple-400 block mb-1 break-all">{header}</code>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-400">
                <strong>Browser note:</strong> Some headers (like <code className="font-mono">Host</code>, <code className="font-mono">Cookie</code>, <code className="font-mono">User-Agent</code>) are controlled by the browser and cannot be set manually by JavaScript for security reasons.
              </div>
            </div>

            {/* Section G — Fetch API Tutorial */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 text-sm font-bold shrink-0">G</span>
                Fetch API Tutorial
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                The <code className="font-mono text-blue-600 dark:text-blue-400">fetch()</code> API is the standard browser method for making HTTP requests. Here&apos;s how to use it with JSONPlaceholder:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2">GET Request</p>
                  <pre className="text-xs font-mono bg-neutral-900 text-neutral-200 p-4 rounded-xl overflow-x-auto leading-relaxed border border-neutral-700">{`async function getPosts() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );

    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }

    const posts = await response.json();
    console.log(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
}

getPosts();`}</pre>
                  <div className="mt-3 space-y-1.5 text-sm">
                    {[
                      ['fetch(url)', 'Sends the HTTP request. Returns a Promise.'],
                      ['response.ok', 'True if status is 200–299.'],
                      ['response.status', 'The HTTP status code (e.g. 200, 404).'],
                      ['response.json()', 'Parses the response body as JSON.'],
                      ['try/catch', 'Catches network errors. Does not catch HTTP errors — check response.ok.'],
                    ].map(([term, desc]) => (
                      <div key={term as string} className="flex gap-2">
                        <code className="text-xs font-mono text-blue-600 dark:text-blue-400 shrink-0">{term}</code>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">— {desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section H */}
                <div>
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2">POST Request</p>
                  <pre className="text-xs font-mono bg-neutral-900 text-neutral-200 p-4 rounded-xl overflow-x-auto leading-relaxed border border-neutral-700">{`async function createPost() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Learning JavaScript",
          body: "Testing REST APIs",
          userId: 1,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }

    const newPost = await response.json();
    console.log(newPost); // { id: 101, title: ..., ... }
  } catch (error) {
    console.error("Failed to create post:", error);
  }
}

createPost();`}</pre>
                </div>
              </div>
            </div>

            {/* Section I */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-red-600 dark:text-red-400 text-sm font-bold shrink-0">I</span>
                Common API Errors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Invalid Endpoint',
                    desc: 'The URL path does not exist on the server. Check for typos. JSONPlaceholder returns {} for missing resources instead of 404.',
                    icon: '🔗',
                  },
                  {
                    title: 'Invalid JSON',
                    desc: 'The request body is not valid JSON. Missing quotes, trailing commas, or unmatched brackets are common causes.',
                    icon: '{ }',
                  },
                  {
                    title: 'Network Failure',
                    desc: 'The server is unreachable, you are offline, or DNS resolution failed. Check your internet connection.',
                    icon: '📡',
                  },
                  {
                    title: 'CORS Restriction',
                    desc: 'The server did not include Access-Control-Allow-Origin headers. JSONPlaceholder supports CORS. Other APIs may not.',
                    icon: '🔒',
                  },
                  {
                    title: 'Request Timeout',
                    desc: 'The server took too long to respond. This playground cancels requests after 30 seconds.',
                    icon: '⏱',
                  },
                  {
                    title: 'Unexpected Format',
                    desc: 'The response Content-Type is not application/json but the code treats it as JSON. Always check response.headers.',
                    icon: '⚠️',
                  },
                ].map(({ title, desc, icon }) => (
                  <div key={title} className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <div className="text-2xl mb-2">{icon}</div>
                    <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1">{title}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800/50">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">Continue Learning</h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:border-blue-400 dark:hover:border-blue-600 transition-colors shadow-sm"
              >
                <BookOpen className="h-4 w-4 text-purple-500" />
                JavaScript Tutorials
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:border-blue-400 dark:hover:border-blue-600 transition-colors shadow-sm"
              >
                <ExternalLink className="h-4 w-4 text-blue-500" />
                JS Playground
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/api-playground"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:border-blue-400 dark:hover:border-blue-600 transition-colors shadow-sm"
              >
                <FlaskConical className="h-4 w-4 text-emerald-500" />
                Full API Playground
                <ChevronRight className="h-4 w-4" />
              </Link>
              <a
                href="https://jsonplaceholder.typicode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:border-blue-400 dark:hover:border-blue-600 transition-colors shadow-sm"
              >
                <ExternalLink className="h-4 w-4 text-amber-500" />
                JSONPlaceholder Docs
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
