'use client';

import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { ConsoleHeader } from './ConsoleHeader';
import { ConsoleEntry } from '@/types/playground';
import { useEffect, useRef, useState } from 'react';
import { useEditorStateStore } from '@/store/useEditorStateStore';
import { Terminal, AlertTriangle, AlertCircle, Info } from 'lucide-react';

function ConsoleEntryRow({ entry }: { entry: ConsoleEntry }) {
  let colorClass = 'text-neutral-700 dark:text-neutral-300';
  let prefix = '';

  switch (entry.type) {
    case 'error':
      colorClass = 'text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20';
      prefix = '× ';
      break;
    case 'warn':
      colorClass = 'text-yellow-700 dark:text-yellow-400 bg-yellow-50/50 dark:bg-yellow-950/20';
      prefix = '⚠ ';
      break;
    case 'info':
      colorClass = 'text-blue-600 dark:text-blue-400';
      prefix = 'ⓘ ';
      break;
    case 'system':
      colorClass = 'text-neutral-500 italic';
      break;
    case 'result':
      colorClass = 'text-emerald-600 dark:text-emerald-400 font-bold';
      prefix = '← ';
      break;
    case 'log':
    default:
      prefix = '› ';
      break;
  }

  const formattedTime = new Date(entry.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second:'2-digit' });

  let contentNodes: React.ReactNode = entry.content;
  
  if (entry.type === 'error' && typeof entry.content === 'string') {
    const lineMatch = entry.content.match(/at line (\d+)(?::(\d+))?/);
    if (lineMatch) {
      const line = parseInt(lineMatch[1], 10);
      const column = lineMatch[2] ? parseInt(lineMatch[2], 10) : 1;
      
      const before = entry.content.substring(0, lineMatch.index);
      const matchText = lineMatch[0];
      const after = entry.content.substring((lineMatch.index || 0) + matchText.length);
      
      contentNodes = (
        <>
          {before}
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('editor-navigate', { detail: { line, column } }))}
            className="underline decoration-red-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            {matchText}
          </button>
          {after}
        </>
      );
    }
  }

  return (
    <div className={`py-1.5 px-2 border-b border-neutral-100 dark:border-neutral-800/50 last:border-0 ${colorClass} flex group hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors`}>
      <div className="w-16 shrink-0 text-neutral-400 dark:text-neutral-600 text-[11px] select-none opacity-0 group-hover:opacity-100 transition-opacity flex items-start pt-0.5">
        {formattedTime}
      </div>
      <div className="flex-1 flex items-start">
        <span className="select-none mr-1.5 shrink-0 opacity-70">{prefix}</span>
        <span className="whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed">
          {contentNodes}
        </span>
      </div>
    </div>
  );
}

export function ConsolePanel() {
  const { consoleEntries, isConsoleOpen, consoleFilter } = usePlaygroundStore();
  const { markers } = useEditorStateStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'console' | 'problems'>('console');

  // Filter entries
  const visibleEntries = consoleEntries.filter(e => {
    if (consoleFilter === 'all') return true;
    if (consoleFilter === 'logs') return e.type === 'log' || e.type === 'info';
    if (consoleFilter === 'warnings') return e.type === 'warn';
    if (consoleFilter === 'errors') return e.type === 'error';
    return true;
  });

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      // Basic auto-scroll to bottom. In a more advanced implementation, 
      // we'd check if the user is already scrolled up and show a "New Output" pill instead.
      const el = scrollRef.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [visibleEntries.length]);

  if (!isConsoleOpen) return null;

  const errorCount = markers.filter(m => m.severity === 8).length; // 8 is Monaco Error
  const warningCount = markers.filter(m => m.severity === 4).length; // 4 is Monaco Warning

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 lg:border-t-0">
      
      {/* Tabs Header */}
      <div className="flex h-10 shrink-0 items-end border-b border-neutral-200 bg-neutral-50 px-4 dark:border-neutral-900/50 dark:bg-neutral-900 pt-1 gap-1">
        <button
          onClick={() => setActiveTab('console')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-md text-xs font-medium transition-colors border border-b-0 ${
            activeTab === 'console'
              ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-neutral-800 relative translate-y-[1px]'
              : 'bg-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 border-transparent hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
          }`}
        >
          <Terminal className="h-3.5 w-3.5" />
          Console
        </button>
        <button
          onClick={() => setActiveTab('problems')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-md text-xs font-medium transition-colors border border-b-0 ${
            activeTab === 'problems'
              ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-neutral-800 relative translate-y-[1px]'
              : 'bg-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 border-transparent hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
          }`}
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          Problems
          {(errorCount > 0 || warningCount > 0) && (
            <span className="flex items-center gap-1 ml-1 px-1.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-[10px]">
              {errorCount > 0 && <span className="text-red-500 flex items-center gap-0.5"><AlertCircle className="w-3 h-3"/> {errorCount}</span>}
              {warningCount > 0 && <span className="text-yellow-500 flex items-center gap-0.5"><AlertTriangle className="w-3 h-3"/> {warningCount}</span>}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'console' && (
        <>
          <ConsoleHeader />
          <div ref={scrollRef} className="flex-1 overflow-auto p-2 font-mono text-[13px] leading-relaxed">
            {consoleEntries.length > 0 ? (
              visibleEntries.length > 0 ? (
                <div className="flex flex-col">
                  {visibleEntries.map((entry) => (
                    <ConsoleEntryRow key={entry.id} entry={entry} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-neutral-500 dark:text-neutral-500 space-y-2">
                  <p>No {consoleFilter} found</p>
                  <p className="text-xs">There are no {consoleFilter} in this execution.</p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-neutral-500 dark:text-neutral-500 space-y-2">
                <p>Console is empty</p>
                <p className="text-xs">Run your JavaScript code to see output here.</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'problems' && (
        <div className="flex-1 overflow-auto p-2 font-mono text-[13px] leading-relaxed">
          {markers.length > 0 ? (
            <div className="flex flex-col">
              {markers.map((marker, i) => (
                <button
                  key={i}
                  className="flex items-start text-left py-2 px-3 border-b border-neutral-100 dark:border-neutral-800/50 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors group"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('editor-navigate', { detail: { line: marker.startLineNumber, column: marker.startColumn } }));
                  }}
                >
                  <div className="shrink-0 pt-0.5 mr-3">
                    {marker.severity === 8 ? (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    ) : marker.severity === 4 ? (
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    ) : (
                      <Info className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    <span className={`break-words ${marker.severity === 8 ? 'text-red-700 dark:text-red-400' : marker.severity === 4 ? 'text-yellow-700 dark:text-yellow-400' : 'text-blue-700 dark:text-blue-400'}`}>
                      {marker.message}
                    </span>
                    <span className="text-neutral-400 dark:text-neutral-500 text-[11px] shrink-0">
                      Ln {marker.startLineNumber}, Col {marker.startColumn}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-neutral-500 dark:text-neutral-500 space-y-2">
              <p>No problems detected.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
