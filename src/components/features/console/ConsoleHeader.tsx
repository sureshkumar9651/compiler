'use client';

import { Terminal, Trash2, X, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { useState } from 'react';
import { ConsoleFilterType } from '@/types/playground';

export function ConsoleHeader() {
  const { clearConsole, setConsoleOpen, isConsoleOpen, consoleEntries, consoleFilter, setConsoleFilter } = usePlaygroundStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const visibleEntries = consoleEntries.filter(e => {
        if (consoleFilter === 'all') return true;
        if (consoleFilter === 'logs') return e.type === 'log' || e.type === 'info';
        if (consoleFilter === 'warnings') return e.type === 'warn';
        if (consoleFilter === 'errors') return e.type === 'error';
        return true;
      });
      
      const text = visibleEntries.map(e => e.content).join('\n');
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const filters: { label: string; value: ConsoleFilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Logs', value: 'logs' },
    { label: 'Warnings', value: 'warnings' },
    { label: 'Errors', value: 'errors' },
  ];

  return (
    <div className="flex h-10 shrink-0 items-center justify-between border-b border-neutral-200 bg-neutral-100 px-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
          <Terminal className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline-block">Console</span>
          <span className="text-xs font-medium text-neutral-500 bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
            {consoleEntries.length}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setConsoleFilter(filter.value)}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                consoleFilter === filter.value
                  ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800/50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={handleCopy}
          className="flex h-7 w-7 items-center justify-center rounded text-neutral-500 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 transition-colors"
          title="Copy Output"
          aria-label="Copy Output"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex h-7 w-7 items-center justify-center rounded text-neutral-500 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 transition-colors hidden lg:flex"
          title={isExpanded ? "Collapse Console" : "Expand Console"}
          aria-label="Toggle Console Size"
        >
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>
        <button
          onClick={clearConsole}
          className="flex h-7 w-7 items-center justify-center rounded text-neutral-500 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 transition-colors"
          title="Clear Console"
          aria-label="Clear Console"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
        <button
          onClick={() => setConsoleOpen(!isConsoleOpen)}
          className="flex h-7 w-7 items-center justify-center rounded text-neutral-500 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 transition-colors"
          title="Close Console"
          aria-label="Close Console"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
