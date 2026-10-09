'use client';

import { Play, Loader2 } from 'lucide-react';

interface RunButtonProps {
  onRun?: () => void;
  isRunning?: boolean;
}

export function RunButton({ onRun, isRunning = false }: RunButtonProps) {
  return (
    <button
      onClick={onRun}
      disabled={isRunning}
      title="Run Code (Ctrl+Enter)"
      className={`group relative flex items-center justify-center gap-2 rounded-md py-1.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 w-[110px] ${
        isRunning
          ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700'
      }`}
    >
      {isRunning ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Play className="h-4 w-4" fill="currentColor" />
      )}
      <span>{isRunning ? 'Running...' : 'Run'}</span>
      
      {/* Tooltip hint for keyboard shortcut */}
      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-800 text-neutral-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
        Ctrl + Enter
      </span>
    </button>
  );
}
