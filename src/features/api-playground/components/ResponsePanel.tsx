'use client';

import { useApiPlaygroundStore } from '@/store/useApiPlaygroundStore';
import { ResponseBody } from './ResponseBody';
import { Loader2, AlertCircle, Ban, Clock, Wifi } from 'lucide-react';

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function StatusBadge({ status }: { status: number }) {
  const color =
    status >= 200 && status < 300
      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
      : status >= 300 && status < 400
      ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
      : status >= 400 && status < 500
      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
      : 'bg-red-500/20 text-red-400 border-red-500/40';

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold font-mono border ${color}`}
    >
      {status}
    </span>
  );
}

const RESPONSE_TABS = [
  { id: 'body', label: 'Body' },
  { id: 'headers', label: 'Headers' },
  { id: 'cookies', label: 'Cookies' },
] as const;

export function ResponsePanel() {
  const { response, responseStatus, errorMessage, responseTab, setResponseTab } =
    useApiPlaygroundStore();

  return (
    <div className="flex flex-col h-full bg-neutral-950">
      {/* Status bar */}
      <div className="flex items-center gap-3 px-3 py-2.5 border-b border-neutral-800 bg-neutral-900 shrink-0">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          Response
        </span>
        {response && responseStatus === 'success' && (
          <>
            <StatusBadge status={response.status} />
            <span className="text-xs text-neutral-500">
              {response.statusText}
            </span>
            <span className="ml-auto text-xs text-neutral-500 font-mono">
              {response.durationMs} ms
            </span>
            <span className="text-xs text-neutral-500 font-mono">
              {formatSize(response.sizeBytes)}
            </span>
          </>
        )}
      </div>

      {/* Tab bar */}
      {response && responseStatus === 'success' && (
        <div className="flex border-b border-neutral-800 shrink-0">
          {RESPONSE_TABS.map((tab) => (
            <button
              key={tab.id}
              id={`api-response-tab-${tab.id}`}
              onClick={() => setResponseTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                responseTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
              role="tab"
              aria-selected={responseTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {/* Idle */}
        {responseStatus === 'idle' && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-neutral-600">
            <div className="h-12 w-12 rounded-2xl bg-neutral-900 flex items-center justify-center">
              <span className="text-2xl">↑</span>
            </div>
            <p className="text-sm">Enter a URL and click Send to get a response.</p>
          </div>
        )}

        {/* Loading */}
        {responseStatus === 'loading' && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-neutral-500">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-sm">Sending request…</p>
          </div>
        )}

        {/* Cancelled */}
        {responseStatus === 'cancelled' && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-neutral-500">
            <Ban className="h-8 w-8 text-neutral-600" />
            <p className="text-sm">Request cancelled.</p>
          </div>
        )}

        {/* Timeout */}
        {responseStatus === 'timeout' && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-amber-500">
            <Clock className="h-8 w-8" />
            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Network error (incl. CORS) */}
        {responseStatus === 'network-error' && (
          <div className="flex flex-col p-4 gap-3 overflow-auto h-full">
            <div className="flex items-center gap-2 text-red-400">
              <Wifi className="h-5 w-5" />
              <span className="font-semibold text-sm">Network Error</span>
            </div>
            <pre className="text-xs text-neutral-300 font-mono whitespace-pre-wrap bg-neutral-900 border border-neutral-800 rounded-lg p-3 leading-relaxed">
              {errorMessage}
            </pre>
          </div>
        )}

        {/* Generic error */}
        {responseStatus === 'error' && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-red-400">
            <AlertCircle className="h-8 w-8" />
            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Success */}
        {responseStatus === 'success' && response && (
          <>
            {responseTab === 'body' && <ResponseBody response={response} />}

            {responseTab === 'headers' && (
              <div className="p-3 overflow-auto h-full">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="text-neutral-500 border-b border-neutral-800">
                      <th className="text-left py-1.5 pr-4 font-semibold">Header</th>
                      <th className="text-left py-1.5 font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(response.headers).map(([key, val]) => (
                      <tr
                        key={key}
                        className="border-b border-neutral-900 hover:bg-neutral-900/50 transition-colors"
                      >
                        <td className="py-1.5 pr-4 text-blue-400 align-top">{key}</td>
                        <td className="py-1.5 text-neutral-300 break-all">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {Object.keys(response.headers).length === 0 && (
                  <p className="text-neutral-600 text-sm text-center py-8">
                    No response headers available.
                  </p>
                )}
              </div>
            )}

            {responseTab === 'cookies' && (
              <div className="p-4 overflow-auto h-full">
                {response.cookies ? (
                  <pre className="text-xs font-mono text-neutral-300 whitespace-pre-wrap">
                    {response.cookies}
                  </pre>
                ) : (
                  <p className="text-neutral-600 text-sm text-center py-8">
                    No cookies in this response.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
