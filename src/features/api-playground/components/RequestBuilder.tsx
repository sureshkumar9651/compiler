'use client';

import { HttpMethod } from '@/types/api-playground';
import { useApiPlaygroundStore } from '@/store/useApiPlaygroundStore';
import { Send, X, Loader2, ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: 'text-emerald-400',
  POST: 'text-amber-400',
  PUT: 'text-blue-400',
  PATCH: 'text-purple-400',
  DELETE: 'text-red-400',
};

const METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export function RequestBuilder() {
  const { request, responseStatus, setMethod, setUrl, sendRequest, cancelRequest } =
    useApiPlaygroundStore();
  const isLoading = responseStatus === 'loading';
  const [methodOpen, setMethodOpen] = useState(false);
  const urlRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !isLoading) {
      sendRequest();
    }
  }

  return (
    <div className="flex items-center gap-2 p-3 bg-neutral-900 border-b border-neutral-800">
      {/* Method selector */}
      <div className="relative">
        <button
          id="api-method-selector"
          onClick={() => setMethodOpen((v) => !v)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-sm font-bold transition-colors ${METHOD_COLORS[request.method]}`}
          aria-label="Select HTTP method"
          aria-haspopup="listbox"
          aria-expanded={methodOpen}
        >
          {request.method}
          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
        </button>
        {methodOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setMethodOpen(false)}
            />
            <ul
              role="listbox"
              className="absolute left-0 top-full mt-1 z-20 w-32 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl overflow-hidden"
            >
              {METHODS.map((m) => (
                <li key={m} role="option" aria-selected={request.method === m}>
                  <button
                    className={`w-full text-left px-4 py-2.5 text-sm font-semibold hover:bg-neutral-700 transition-colors ${METHOD_COLORS[m]} ${request.method === m ? 'bg-neutral-700' : ''}`}
                    onClick={() => {
                      setMethod(m);
                      setMethodOpen(false);
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

      {/* URL input */}
      <input
        id="api-url-input"
        ref={urlRef}
        type="text"
        value={request.url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="https://api.example.com/endpoint"
        className="flex-1 px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-blue-500 focus:outline-none text-sm text-neutral-100 placeholder-neutral-500 transition-colors font-mono"
        aria-label="Request URL"
        autoComplete="off"
        spellCheck={false}
      />

      {/* Send / Cancel */}
      {isLoading ? (
        <button
          id="api-cancel-btn"
          onClick={cancelRequest}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors"
          aria-label="Cancel request"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
      ) : (
        <button
          id="api-send-btn"
          onClick={() => sendRequest()}
          disabled={!request.url.trim()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
          aria-label="Send request"
        >
          <Send className="h-4 w-4" />
          Send
        </button>
      )}
    </div>
  );
}
