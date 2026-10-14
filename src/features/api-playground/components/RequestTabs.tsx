'use client';

import { useApiPlaygroundStore } from '@/store/useApiPlaygroundStore';
import { KeyValueEditor } from './KeyValueEditor';
import { AuthEditor } from './AuthEditor';
import { BodyEditor } from './BodyEditor';
import { buildUrl } from '@/features/api-playground/services/http-client';

const TABS = [
  { id: 'params', label: 'Params' },
  { id: 'headers', label: 'Headers' },
  { id: 'auth', label: 'Auth' },
  { id: 'body', label: 'Body' },
] as const;

export function RequestTabs() {
  const store = useApiPlaygroundStore();
  const { request, requestTab, setRequestTab, setParams, setHeaders } = store;

  // Count active params and headers for badge
  const activeParamCount = request.params.filter((p) => p.enabled && p.key.trim()).length;
  const activeHeaderCount = request.headers.filter((h) => h.enabled && h.key.trim()).length;
  const authActive = request.auth.type !== 'none';
  const bodyActive = request.bodyType !== 'none';

  // Show resolved URL preview
  const resolvedUrl = request.url
    ? buildUrl(request.url.startsWith('http') ? request.url : `https://${request.url}`, request.params)
    : '';

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Tab bar */}
      <div className="flex items-center border-b border-neutral-800 bg-neutral-900 shrink-0 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          const badge =
            tab.id === 'params' && activeParamCount > 0
              ? activeParamCount
              : tab.id === 'headers' && activeHeaderCount > 0
              ? activeHeaderCount
              : tab.id === 'auth' && authActive
              ? '•'
              : tab.id === 'body' && bodyActive
              ? '•'
              : null;

          const isBodyDisabled = tab.id === 'body' && (request.method === 'GET' || request.method === 'DELETE');

          return (
            <button
              key={tab.id}
              id={`api-tab-${tab.id}`}
              onClick={() => !isBodyDisabled && setRequestTab(tab.id)}
              disabled={isBodyDisabled}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                requestTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : isBodyDisabled
                  ? 'border-transparent text-neutral-600 cursor-not-allowed'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
              aria-selected={requestTab === tab.id}
              role="tab"
            >
              {tab.label}
              {badge !== null && (
                <span className="text-xs bg-blue-500/20 text-blue-400 rounded px-1.5 py-0.5 font-mono">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Resolved URL preview */}
      {resolvedUrl && request.params.some((p) => p.enabled && p.key.trim()) && (
        <div className="px-3 py-1.5 bg-neutral-950 border-b border-neutral-800 shrink-0">
          <p className="text-xs text-neutral-500 font-mono truncate" title={resolvedUrl}>
            <span className="text-neutral-600">URL preview: </span>{resolvedUrl}
          </p>
        </div>
      )}

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {requestTab === 'params' && (
          <KeyValueEditor
            pairs={request.params}
            onChange={setParams}
            keyPlaceholder="param"
            valuePlaceholder="value"
            addLabel="Add parameter"
          />
        )}
        {requestTab === 'headers' && (
          <KeyValueEditor
            pairs={request.headers}
            onChange={setHeaders}
            keyPlaceholder="Header-Name"
            valuePlaceholder="value"
            addLabel="Add header"
          />
        )}
        {requestTab === 'auth' && <AuthEditor />}
        {requestTab === 'body' && <BodyEditor />}
      </div>
    </div>
  );
}
