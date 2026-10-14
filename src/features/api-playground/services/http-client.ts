import {
  RequestConfig,
  ResponseData,
  ResponseStatus,
  HistoryEntry,
  KeyValuePair,
} from '@/types/api-playground';

/** Maximum response body size to render (500 KB) */
const MAX_RENDER_BYTES = 512_000;
/** Request timeout in milliseconds */
const TIMEOUT_MS = 30_000;

export interface SendResult {
  response: ResponseData | null;
  status: ResponseStatus;
  errorMessage: string | null;
}

/**
 * Build a URL with correctly encoded query parameters from the request config.
 */
export function buildUrl(baseUrl: string, params: KeyValuePair[]): string {
  const enabledParams = params.filter((p) => p.enabled && p.key.trim() !== '');
  if (enabledParams.length === 0) return baseUrl;

  try {
    // Try to detect whether the URL already has a scheme
    const hasScheme = /^https?:\/\//i.test(baseUrl);
    const fullUrl = hasScheme ? baseUrl : `https://${baseUrl}`;
    const url = new URL(fullUrl);
    for (const { key, value } of enabledParams) {
      url.searchParams.append(key, value);
    }
    return hasScheme ? url.toString() : url.toString().replace(/^https?:\/\//, '');
  } catch {
    // Fallback: manual append
    const qs = enabledParams
      .map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
      .join('&');
    return baseUrl.includes('?') ? `${baseUrl}&${qs}` : `${baseUrl}?${qs}`;
  }
}

/**
 * Send an HTTP request from the browser.
 * Handles AbortController cancellation, timeout, JSON/text response parsing,
 * large response truncation, and CORS detection.
 */
export async function sendRequest(
  config: RequestConfig,
  signal: AbortSignal
): Promise<SendResult> {
  const { method, url, headers, auth, bodyType, bodyJson, bodyFormPairs } = config;

  if (!url.trim()) {
    return { response: null, status: 'error', errorMessage: 'Please enter a URL.' };
  }

  // Normalise URL scheme
  const hasScheme = /^https?:\/\//i.test(url.trim());
  const resolvedUrl = hasScheme ? url.trim() : `https://${url.trim()}`;

  // Build request headers
  const requestHeaders = new Headers();
  for (const h of headers) {
    if (h.enabled && h.key.trim()) {
      requestHeaders.set(h.key.trim(), h.value);
    }
  }

  // Authorization
  if (auth.type === 'bearer' && auth.bearerToken?.trim()) {
    requestHeaders.set('Authorization', `Bearer ${auth.bearerToken.trim()}`);
  } else if (auth.type === 'basic' && auth.basicUsername?.trim()) {
    const encoded = btoa(`${auth.basicUsername}:${auth.basicPassword ?? ''}`);
    requestHeaders.set('Authorization', `Basic ${encoded}`);
  }

  // Request body
  let body: BodyInit | undefined;
  if (method !== 'GET' && method !== 'DELETE') {
    if (bodyType === 'json') {
      requestHeaders.set('Content-Type', 'application/json');
      body = bodyJson || '';
    } else if (bodyType === 'form-urlencoded') {
      requestHeaders.set('Content-Type', 'application/x-www-form-urlencoded');
      const pairs = bodyFormPairs.filter((p) => p.enabled && p.key.trim());
      body = pairs
        .map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
        .join('&');
    } else if (bodyType === 'form-data') {
      const formData = new FormData();
      for (const p of bodyFormPairs.filter((p) => p.enabled && p.key.trim())) {
        formData.append(p.key, p.value);
      }
      body = formData;
      // Let browser set Content-Type with boundary for multipart/form-data
    }
  }

  // Build full URL with params
  const finalUrl = buildUrl(resolvedUrl, config.params);

  // Timeout controller
  const timeoutId = setTimeout(() => {
    if (!signal.aborted) {
      // We cannot abort through the passed signal, but the TimeoutError will surface
    }
  }, TIMEOUT_MS);

  const combinedController = new AbortController();
  const timeoutHandle = setTimeout(() => combinedController.abort(new DOMException('Request timed out', 'TimeoutError')), TIMEOUT_MS);
  signal.addEventListener('abort', () => combinedController.abort(signal.reason));

  const startTime = performance.now();

  try {
    const res = await fetch(finalUrl, {
      method,
      headers: requestHeaders,
      body,
      signal: combinedController.signal,
    });

    clearTimeout(timeoutHandle);
    clearTimeout(timeoutId);

    const durationMs = Math.round(performance.now() - startTime);

    // Read headers
    const responseHeaders: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    // Read body
    const buffer = await res.arrayBuffer();
    const sizeBytes = buffer.byteLength;
    const isTruncated = sizeBytes > MAX_RENDER_BYTES;
    const slice = isTruncated ? buffer.slice(0, MAX_RENDER_BYTES) : buffer;
    const bodyText = new TextDecoder('utf-8', { fatal: false }).decode(slice);

    // Parse JSON
    let isJson = false;
    let parsedJson: unknown;
    const contentType = res.headers.get('content-type') ?? '';
    if (contentType.includes('application/json') || contentType.includes('+json')) {
      try {
        parsedJson = JSON.parse(bodyText);
        isJson = true;
      } catch {
        // Not valid JSON despite Content-Type
      }
    } else {
      // Try parsing anyway
      try {
        parsedJson = JSON.parse(bodyText);
        isJson = true;
      } catch {
        /* not JSON */
      }
    }

    const cookies = responseHeaders['set-cookie'] ?? responseHeaders['cookie'] ?? undefined;

    const responseData: ResponseData = {
      status: res.status,
      statusText: res.statusText,
      durationMs,
      sizeBytes,
      headers: responseHeaders,
      bodyText,
      isTruncated,
      isJson,
      parsedJson,
      cookies,
    };

    return { response: responseData, status: 'success', errorMessage: null };
  } catch (err: unknown) {
    clearTimeout(timeoutHandle);
    clearTimeout(timeoutId);

    const durationMs = Math.round(performance.now() - startTime);

    if (err instanceof DOMException && (err.name === 'AbortError' || err.name === 'TimeoutError')) {
      if (signal.aborted) {
        return { response: null, status: 'cancelled', errorMessage: 'Request was cancelled.' };
      }
      return {
        response: null,
        status: 'timeout',
        errorMessage: `Request timed out after ${TIMEOUT_MS / 1000} seconds.`,
      };
    }

    // Network error (CORS, DNS, offline, etc.)
    const message =
      err instanceof TypeError
        ? detectNetworkErrorMessage(err, finalUrl)
        : String(err);

    return {
      response: { status: 0, statusText: '', durationMs, sizeBytes: 0, headers: {}, bodyText: '', isTruncated: false, isJson: false },
      status: 'network-error',
      errorMessage: message,
    };
  }
}

function detectNetworkErrorMessage(err: TypeError, url: string): string {
  const msg = err.message.toLowerCase();
  if (msg.includes('failed to fetch') || msg.includes('networkerror') || msg.includes('load failed')) {
    return [
      `Network error — the request to "${url}" failed.`,
      '',
      'Possible causes:',
      '• CORS: The server did not include Access-Control-Allow-Origin headers. This is the most common cause when testing public APIs from a browser.',
      '• The server is unreachable or offline.',
      '• The URL is incorrect or the server returned a non-HTTP error.',
      '',
      'CORS note: Browser security prevents JavaScript on this page from reading responses from servers that do not explicitly allow cross-origin requests. This cannot be bypassed in a browser-only environment.',
    ].join('\n');
  }
  return err.message || 'An unknown network error occurred.';
}

/**
 * Build a HistoryEntry snapshot from a request config (secrets excluded).
 */
export function buildHistoryEntry(
  config: RequestConfig,
  status: number | null,
  durationMs: number | null
): Omit<HistoryEntry, 'id'> {
  return {
    method: config.method,
    url: config.url,
    status,
    durationMs,
    timestamp: Date.now(),
    request: {
      name: '',
      method: config.method,
      url: config.url,
      params: config.params,
      headers: config.headers,
      authType: config.auth.type,
      // No tokens
      basicUsername: config.auth.basicUsername,
      bodyType: config.bodyType,
      bodyJson: config.bodyJson,
      bodyFormPairs: config.bodyFormPairs,
    },
  };
}
