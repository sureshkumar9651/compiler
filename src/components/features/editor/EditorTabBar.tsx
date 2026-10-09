'use client';

import { useProjectStore } from '@/store/useProjectStore';
import { getFileExtension } from '@/utils/fileTree';
import { X, FileCode, FileText, FileJson, Palette, Atom, Code2 } from 'lucide-react';
import React from 'react';

function getFileIcon(path: string) {
  const ext = getFileExtension(path);
  switch (ext) {
    case 'jsx':
    case 'tsx':
      return <Atom className="h-3.5 w-3.5 text-cyan-500" />;
    case 'js':
    case 'ts':
      return <FileCode className="h-3.5 w-3.5 text-yellow-500" />;
    case 'css':
      return <Palette className="h-3.5 w-3.5 text-sky-400" />;
    case 'json':
      return <FileJson className="h-3.5 w-3.5 text-amber-400" />;
    case 'html':
    case 'htm':
      return <Code2 className="h-3.5 w-3.5 text-orange-500" />;
    case 'md':
      return <FileText className="h-3.5 w-3.5 text-blue-400" />;
    default:
      return <FileCode className="h-3.5 w-3.5 text-neutral-400" />;
  }
}

export function EditorTabBar() {
  const { openFiles, activeFilePath, selectFile, closeFile, saveStatus } = useProjectStore();

  if (!openFiles || openFiles.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto no-scrollbar shrink-0 select-none">
      <div className="flex items-center h-9 px-1 gap-1">
        {openFiles.map((path) => {
          const isActive = activeFilePath === path;
          const fileName = path.split('/').pop() || path;

          return (
            <div
              key={path}
              onClick={() => selectFile(path)}
              title={path}
              className={`group flex items-center gap-2 h-7 px-2.5 rounded-t-md text-xs font-medium cursor-pointer transition-colors border-t-2 ${
                isActive
                  ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 border-blue-500 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 border-transparent'
              }`}
            >
              <span className="shrink-0">{getFileIcon(path)}</span>
              <span className="truncate max-w-[130px]">{fileName}</span>

              {/* Unsaved indicator or Close button */}
              <div className="flex items-center justify-center w-4 h-4 ml-1">
                {isActive && saveStatus === 'unsaved' ? (
                  <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:hidden" />
                ) : null}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeFile(path);
                  }}
                  className={`p-0.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors ${
                    isActive && saveStatus === 'unsaved' ? 'hidden group-hover:block' : 'opacity-70 group-hover:opacity-100'
                  }`}
                  title="Close tab"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
