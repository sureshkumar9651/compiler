'use client';

import { BodyType } from '@/types/api-playground';
import { useApiPlaygroundStore } from '@/store/useApiPlaygroundStore';
import { KeyValueEditor } from './KeyValueEditor';

const BODY_TYPES: { id: BodyType; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'json', label: 'JSON' },
  { id: 'form-urlencoded', label: 'URL Encoded' },
  { id: 'form-data', label: 'Form Data' },
];

export function BodyEditor() {
  const { request, setBodyType, setBodyJson, setBodyFormPairs } = useApiPlaygroundStore();
  const { bodyType, bodyJson, bodyFormPairs } = request;

  // Validate JSON on the fly
  let jsonError: string | null = null;
  if (bodyType === 'json' && bodyJson.trim()) {
    try {
      JSON.parse(bodyJson);
    } catch (e) {
      jsonError = (e as Error).message;
    }
  }

  return (
    <div className="flex flex-col gap-0 flex-1">
      {/* Body type selector */}
      <div className="flex gap-1 px-3 pt-3 pb-2 shrink-0">
        {BODY_TYPES.map((t) => (
          <button
            key={t.id}
            id={`api-body-${t.id}`}
            onClick={() => setBodyType(t.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              bodyType === t.id
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border border-transparent'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Body content */}
      <div className="flex-1 px-3 pb-3">
        {bodyType === 'none' && (
          <div className="flex items-center justify-center h-24 text-sm text-neutral-600">
            No body
          </div>
        )}

        {bodyType === 'json' && (
          <div className="flex flex-col gap-1.5">
            <textarea
              id="api-body-json-textarea"
              value={bodyJson}
              onChange={(e) => setBodyJson(e.target.value)}
              placeholder='{"key": "value"}'
              rows={12}
              className={`w-full px-3 py-2.5 rounded-lg bg-neutral-800 border ${
                jsonError ? 'border-red-500/70' : 'border-neutral-700 focus:border-blue-500'
              } focus:outline-none text-sm text-neutral-200 font-mono resize-none transition-colors leading-relaxed`}
              spellCheck={false}
              aria-label="JSON request body"
            />
            {jsonError && (
              <p className="text-xs text-red-400 font-mono">{jsonError}</p>
            )}
          </div>
        )}

        {(bodyType === 'form-urlencoded' || bodyType === 'form-data') && (
          <KeyValueEditor
            pairs={bodyFormPairs}
            onChange={setBodyFormPairs}
            keyPlaceholder="field"
            valuePlaceholder="value"
            addLabel={bodyType === 'form-data' ? 'Add form field' : 'Add field'}
          />
        )}
      </div>
    </div>
  );
}
