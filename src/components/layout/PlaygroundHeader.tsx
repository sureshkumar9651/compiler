'use client';

import { TerminalSquare, RotateCcw, Cloud, CloudOff, CloudLightning, Pencil, Check, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { useProjectStore } from '@/store/useProjectStore';
import { RunButton } from '@/components/features/editor/RunButton';
import { StopButton } from '@/components/features/editor/StopButton';
import { ShareButton } from '@/features/sharing/components/share-button';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { useExecution } from '@/hooks/useExecution';
import { useState, useEffect, useRef } from 'react';

export function PlaygroundHeader() {
  const { status, resetCode } = usePlaygroundStore();
  const { projects, activeProjectId, saveStatus, renameProject } = useProjectStore();
  const { executeCode, stopExecution } = useExecution();
  
  const activeProject = projects.find(p => p.id === activeProjectId);
  const [isRenaming, setIsRenaming] = useState(false);
  const [editName, setEditName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  const handleSaveRename = async () => {
    if (activeProject && editName.trim()) {
      await renameProject(activeProject.id, editName);
    }
    setIsRenaming(false);
  };

  const isRunning = status === 'running';

  const renderSaveStatus = () => {
    switch (saveStatus) {
      case 'saved':
        return <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400" title="Saved to Local Storage"><Cloud className="h-4 w-4" /><span className="text-xs font-medium hidden md:inline">Saved</span></div>;
      case 'saving':
        return <div className="flex items-center gap-1.5 text-blue-500" title="Saving..."><CloudLightning className="h-4 w-4 animate-pulse" /><span className="text-xs font-medium hidden md:inline">Saving</span></div>;
      case 'unsaved':
        return <div className="flex items-center gap-1.5 text-neutral-400" title="Unsaved changes"><Cloud className="h-4 w-4" /><span className="text-xs font-medium hidden md:inline">Unsaved</span></div>;
      case 'error':
        return <div className="flex items-center gap-1.5 text-red-500" title="Save Failed"><CloudOff className="h-4 w-4" /><span className="text-xs font-medium hidden md:inline">Error</span></div>;
    }
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-2 sm:px-4 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button 
          onClick={() => usePlaygroundStore.getState().toggleSidebar()}
          className="md:hidden flex items-center justify-center p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400"
          aria-label="Toggle projects sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/" className="flex items-center gap-2 text-neutral-900 hover:text-neutral-600 dark:text-neutral-50 dark:hover:text-neutral-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
          <TerminalSquare className="h-6 w-6 text-blue-500 shrink-0" />
          <span className="hidden lg:inline font-semibold text-lg tracking-tight whitespace-nowrap">JS CodeLab</span>
        </Link>
        <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-800 hidden sm:block" />
        <Link href="/examples" className="hidden lg:block text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors">
          Examples
        </Link>
        <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-800 hidden lg:block" />
        
        {/* Project Name Editor */}
        <div className="flex items-center gap-2 relative group min-w-[100px] sm:min-w-[120px] shrink-0">
          {isRenaming ? (
            <div className="flex items-center gap-1">
              <input 
                ref={inputRef}
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={handleSaveRename}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveRename()}
                className="bg-neutral-100 dark:bg-neutral-800 border border-blue-500 rounded px-2 py-1 text-sm font-medium text-neutral-900 dark:text-white outline-none w-32 sm:w-48"
              />
              <button onMouseDown={(e) => e.preventDefault()} onClick={handleSaveRename} className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded text-neutral-500">
                <Check className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div 
              className="flex items-center gap-2 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 px-2 py-1 -ml-2 rounded transition-colors max-w-[120px] sm:max-w-[200px]"
              onClick={() => {
                if (activeProject) {
                  setEditName(typeof activeProject.name === 'string' ? activeProject.name : 'Corrupted Project');
                  setIsRenaming(true);
                }
              }}
            >
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 truncate">
                {activeProject ? (typeof activeProject.name === 'string' ? activeProject.name : 'Corrupted Project') : 'Loading...'}
              </span>
              {activeProject && <Pencil className="h-3.5 w-3.5 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <div className="hidden sm:flex items-center mr-2">
          {renderSaveStatus()}
        </div>

        <button 
          onClick={resetCode}
          className="hidden sm:flex h-8 w-auto items-center justify-center rounded-md px-3 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Reset Code to Default"
          aria-label="Reset Code"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          <span>Reset</span>
        </button>
        
        <div className="hidden sm:block">
          <ShareButton />
        </div>

        <div className="hidden sm:block h-4 w-px bg-neutral-300 dark:bg-neutral-800" />
        
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
        
        <div className="flex items-center gap-2">
          <StopButton onStop={stopExecution} isVisible={isRunning} />
          <RunButton onRun={executeCode} isRunning={isRunning} />
        </div>
      </div>
    </header>
  );
}
