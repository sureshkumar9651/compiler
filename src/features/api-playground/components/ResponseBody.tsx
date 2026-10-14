'use client';

import { ResponseData } from '@/types/api-playground';

interface Props {
  response: ResponseData;
}

const MAX_DISPLAY_CHARS = 200_000; // ~200 KB of text

export function ResponseBody({ response }: Props) {
  const { bodyText, isJson, parsedJson, isTruncated } = response;

  if (!bodyText && !isTruncated) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-neutral-600">
        No response body
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-3 h-full overflow-auto">
      {isTruncated && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 shrink-0">
          ⚠ Response body is large and has been truncated for display. Showing the first 500 KB.
        </div>
      )}

      {isJson ? (
        <pre
          className="text-xs font-mono text-neutral-200 whitespace-pre-wrap break-words leading-relaxed"
          aria-label="JSON response body"
        >
          {/* Safely stringify — never execute */}
          {JSON.stringify(parsedJson, null, 2).slice(0, MAX_DISPLAY_CHARS)}
          {JSON.stringify(parsedJson, null, 2).length > MAX_DISPLAY_CHARS && '\n… (truncated)'}
        </pre>
      ) : (
        <pre
          className="text-xs font-mono text-neutral-300 whitespace-pre-wrap break-words leading-relaxed"
          aria-label="Text response body"
        >
          {bodyText.slice(0, MAX_DISPLAY_CHARS)}
          {bodyText.length > MAX_DISPLAY_CHARS && '\n… (truncated)'}
        </pre>
      )}
    </div>
  );
}
