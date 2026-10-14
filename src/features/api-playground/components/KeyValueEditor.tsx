'use client';

import { KeyValuePair } from '@/types/api-playground';
import { Plus, Trash2 } from 'lucide-react';
import { makeKv } from '@/store/useApiPlaygroundStore';

interface Props {
  pairs: KeyValuePair[];
  onChange: (pairs: KeyValuePair[]) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  addLabel?: string;
}

export function KeyValueEditor({
  pairs,
  onChange,
  keyPlaceholder = 'Key',
  valuePlaceholder = 'Value',
  addLabel = 'Add row',
}: Props) {
  function update(id: string, field: keyof KeyValuePair, value: string | boolean) {
    onChange(pairs.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
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
          {/* Enabled checkbox */}
          <input
            type="checkbox"
            checked={pair.enabled}
            onChange={(e) => update(pair.id, 'enabled', e.target.checked)}
            className="accent-blue-500 shrink-0"
            aria-label={`Enable ${pair.key || 'row'}`}
          />
          {/* Key */}
          <input
            type="text"
            value={pair.key}
            onChange={(e) => update(pair.id, 'key', e.target.value)}
            placeholder={keyPlaceholder}
            className="flex-1 min-w-0 px-2.5 py-1.5 rounded-md bg-neutral-800 border border-neutral-700 focus:border-blue-500 focus:outline-none text-sm text-neutral-200 placeholder-neutral-600 font-mono transition-colors"
            spellCheck={false}
            aria-label="Parameter key"
          />
          {/* Value */}
          <input
            type="text"
            value={pair.value}
            onChange={(e) => update(pair.id, 'value', e.target.value)}
            placeholder={valuePlaceholder}
            className="flex-1 min-w-0 px-2.5 py-1.5 rounded-md bg-neutral-800 border border-neutral-700 focus:border-blue-500 focus:outline-none text-sm text-neutral-200 placeholder-neutral-600 font-mono transition-colors"
            spellCheck={false}
            aria-label="Parameter value"
          />
          {/* Remove */}
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
