'use client';

import { useApiPlaygroundStore, makeKv } from '@/store/useApiPlaygroundStore';
import { HttpMethod } from '@/types/api-playground';

interface Example {
  label: string;
  description: string;
  method: HttpMethod;
  url: string;
  params?: { key: string; value: string }[];
  headers?: { key: string; value: string }[];
  bodyType?: 'json' | 'none';
  bodyJson?: string;
  note?: string;
}

const EXAMPLES: Example[] = [
  {
    label: 'GET — JSONPlaceholder Posts',
    description: 'Fetch a list of posts from the JSONPlaceholder test API.',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: [{ key: 'limit', value: '5' }],
  },
  {
    label: 'GET — Query Parameters',
    description: 'Fetch a single post by ID using a query parameter.',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    params: [],
  },
  {
    label: 'POST — Create with JSON',
    description: 'POST a new post resource with a JSON body.',
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    bodyType: 'json',
    bodyJson: JSON.stringify({ title: 'API Playground Test', body: 'Hello from JS CodeLab!', userId: 1 }, null, 2),
  },
  {
    label: 'GET — Custom Headers',
    description: 'Send a custom Accept header.',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/users',
    headers: [{ key: 'Accept', value: 'application/json' }],
  },
  {
    label: 'GET — HTTP Error (404)',
    description: 'Request a resource that returns a 404 Not Found status.',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts/99999',
    note: 'The API returns an empty object ({}) for missing resources. Real APIs may return 404.',
  },
  {
    label: 'GET — Open Joke API',
    description: 'Fetch a programming joke from a CORS-friendly API.',
    method: 'GET',
    url: 'https://official-joke-api.appspot.com/random_joke',
  },
];

export function ExamplesPanel({ onClose }: { onClose: () => void }) {
  const { loadRequest } = useApiPlaygroundStore();

  function applyExample(ex: Example) {
    const makeRow = (k: string, v: string) => ({ id: crypto.randomUUID(), key: k, value: v, enabled: true });
    loadRequest({
      method: ex.method,
      url: ex.url,
      params: ex.params ? ex.params.map((p) => makeRow(p.key, p.value)) : [makeRow('', '')],
      headers: ex.headers ? ex.headers.map((h) => makeRow(h.key, h.value)) : [makeRow('', '')],
      bodyType: ex.bodyType ?? 'none',
      bodyJson: ex.bodyJson ?? '{\n  \n}',
    });
    onClose();
  }

  return (
    <div className="flex flex-col gap-3 p-4 overflow-y-auto h-full">
      <div>
        <h2 className="text-sm font-semibold text-neutral-200 mb-1">Example Requests</h2>
        <p className="text-xs text-neutral-500 leading-relaxed">
          These examples use public APIs that permit browser (CORS) requests.
          Not all public APIs allow cross-origin requests from browsers — see the CORS note below.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {EXAMPLES.map((ex, i) => (
          <button
            key={i}
            id={`api-example-${i}`}
            onClick={() => applyExample(ex)}
            className="text-left p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all group"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-bold font-mono ${
                ex.method === 'GET' ? 'text-emerald-400' : ex.method === 'POST' ? 'text-amber-400' : 'text-blue-400'
              }`}>
                {ex.method}
              </span>
              <span className="text-xs font-medium text-neutral-200 group-hover:text-white transition-colors">
                {ex.label}
              </span>
            </div>
            <p className="text-xs text-neutral-500">{ex.description}</p>
            {ex.note && (
              <p className="mt-1 text-xs text-amber-400/70 italic">{ex.note}</p>
            )}
          </button>
        ))}
      </div>

      {/* CORS explainer */}
      <div className="mt-2 p-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
        <h3 className="text-xs font-semibold text-blue-400 mb-1.5">About CORS</h3>
        <p className="text-xs text-neutral-400 leading-relaxed">
          Browser security policy (CORS) prevents JavaScript on one domain from reading responses
          from another domain unless that server explicitly allows it via{' '}
          <code className="text-blue-300 font-mono">Access-Control-Allow-Origin</code> headers.
          If a request fails with a &quot;Failed to fetch&quot; error, the API likely does not support
          browser cross-origin requests. This cannot be bypassed in a browser-only tool.
          Use a local development proxy or a CORS-friendly API instead.
        </p>
      </div>
    </div>
  );
}
