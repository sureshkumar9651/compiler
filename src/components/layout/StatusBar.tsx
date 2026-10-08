'use client';

import { CheckCircle2, AlertCircle, Clock, Loader2, Square } from 'lucide-react';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { useEditorStateStore } from '@/store/useEditorStateStore';
import { useEditorStore } from '@/store/useEditorStore';
import { ExecutionStatus } from '@/types/playground';

function StatusIcon({ status }: { status: ExecutionStatus }) {
  switch (status) {
    case 'running':
      return <Loader2 className="h-3.5 w-3.5 text-blue-500 animate-spin" />;
    case 'success':
      return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />;
    case 'error':
    case 'timeout':
      return <AlertCircle className="h-3.5 w-3.5 text-red-500" />;
    case 'stopped':
      return <Square className="h-3.5 w-3.5 text-neutral-500" fill="currentColor" />;
    default:
      return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />;
  }
}

function StatusText({ status }: { status: ExecutionStatus }) {
  switch (status) {
    case 'running':
      return 'Running...';
    case 'success':
      return 'Completed';
    case 'error':
      return 'Execution failed';
    case 'timeout':
      return 'Timed out';
    case 'stopped':
      return 'Execution stopped';
    default:
      return 'Ready';
  }
}

export function StatusBar() {
  const { status, executionTime } = usePlaygroundStore();
  const { cursorLine, cursorColumn, selectionLength } = useEditorStateStore();
  const { tabSize, insertSpaces } = useEditorStore();

  return (
    <footer className="flex h-8 shrink-0 items-center justify-between border-t border-neutral-200 bg-neutral-100 px-4 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <StatusIcon status={status} />
          <span><StatusText status={status} /></span>
        </div>
        <div className="h-3 w-px bg-neutral-300 dark:bg-neutral-700" />
        {executionTime > 0 && (
          <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
            <Clock className="h-3 w-3" />
            <span>{executionTime}ms</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline-block">
          Ln {cursorLine}, Col {cursorColumn}
          {selectionLength > 0 && ` (${selectionLength} selected)`}
        </span>
        <span className="hidden sm:inline-block">
          {insertSpaces ? 'Spaces: ' : 'Tabs: '}{tabSize}
        </span>
        <span className="hidden md:inline-block">JavaScript</span>
        <span className="hidden lg:inline-block">UTF-8</span>
      </div>
    </footer>
  );
}
