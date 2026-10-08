'use client';

import { EditorPanel } from '@/components/features/editor/EditorPanel';
import { ConsolePanel } from '@/components/features/console/ConsolePanel';
import { PlaygroundHeader } from '@/components/layout/PlaygroundHeader';
import { StatusBar } from '@/components/layout/StatusBar';
import { ProjectSidebar } from '@/components/features/projects/ProjectSidebar';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { useProjectStore } from '@/store/useProjectStore';
import { ErrorBoundary } from '@/components/ErrorBoundary';

import { useEffect, useState } from 'react';
import { Loader2, Code2, Terminal } from 'lucide-react';
import { Panel, Group, Separator } from 'react-resizable-panels';

export default function PlaygroundPage() {
  const { isConsoleOpen, isSidebarOpen, isFullscreen } = usePlaygroundStore();
  const { initialize, isLoading } = useProjectStore();
  const [mounted, setMounted] = useState(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'console'>('editor');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    const initAndHandleShare = async () => {
      await initialize();
      
      if (!isSubscribed) return;

      // Handle shared code in URL fragment
      if (typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash;
        
        // Dynamic import to avoid SSR issues with lz-string
        const { shareService } = await import('@/features/sharing/services/share-service');
        const payload = shareService.decodeShareUrl(hash);
        
        if (payload && payload.code) {
          const { createProject, projects } = useProjectStore.getState();
          const rawTitle = payload.title || '';
          const safeTitle = rawTitle.slice(0, 50).trim();
          const baseName = safeTitle ? `Shared: ${safeTitle}` : 'Shared JavaScript';
          
          // Generate unique name
          let newName = baseName;
          let count = 1;
          while (projects.some(p => p.name === newName)) {
            newName = `${baseName} ${count}`;
            count++;
          }
          
          await createProject(newName, payload.code);
          
          // Clean up the URL hash without triggering a navigation
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    };

    initAndHandleShare();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && usePlaygroundStore.getState().isFullscreen) {
        usePlaygroundStore.getState().toggleFullscreen();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        usePlaygroundStore.getState().toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isSubscribed = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [initialize]);

  if (!mounted || isLoading) {
    return (
      <div className="flex h-screen w-full flex-col bg-white dark:bg-neutral-950 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
        <p className="text-neutral-500 dark:text-neutral-400 font-medium">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className={`flex h-screen w-full flex-col bg-white dark:bg-neutral-950 overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {!isFullscreen && <PlaygroundHeader />}
      
      <ErrorBoundary>
        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar */}
          {!isFullscreen && isSidebarOpen && (
            <div className="hidden md:flex">
              <ProjectSidebar />
            </div>
          )}

          {/* Mobile Sidebar Overlay */}
          {!isFullscreen && isSidebarOpen && (
            <div className="md:hidden fixed inset-0 z-50 flex">
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
                onClick={() => usePlaygroundStore.getState().toggleSidebar()} 
              />
              <div className="relative w-[85%] max-w-[320px] bg-white dark:bg-neutral-900 h-full shadow-2xl flex flex-col">
                <ProjectSidebar />
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0 flex flex-col lg:flex-row h-full">
            {isConsoleOpen ? (
              <Group orientation="horizontal" className="h-full w-full hidden lg:flex">
                <Panel defaultSize={60} minSize={30}>
                  <EditorPanel />
                </Panel>
                <Separator className="w-1 bg-neutral-200 dark:bg-neutral-800 hover:bg-blue-500 transition-colors" />
                <Panel defaultSize={40} minSize={20}>
                  <ConsolePanel />
                </Panel>
              </Group>
            ) : (
              <div className="flex-1 h-full hidden lg:flex">
                <EditorPanel />
              </div>
            )}

            {/* Mobile/Tablet Fallback Layout */}
            <div className="flex flex-col h-full w-full lg:hidden overflow-hidden bg-white dark:bg-neutral-950">
               {/* Mobile Tab Strip */}
               <div className="flex h-11 shrink-0 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 overflow-x-auto no-scrollbar">
                 <button
                   onClick={() => setMobileTab('editor')}
                   className={`flex-1 flex items-center justify-center gap-2 px-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${mobileTab === 'editor' ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-white dark:bg-neutral-950' : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'}`}
                 >
                   <Code2 className="w-4 h-4" />
                   Editor
                 </button>
                 <button
                   onClick={() => {
                     setMobileTab('console');
                     usePlaygroundStore.getState().setConsoleOpen(true);
                   }}
                   className={`flex-1 flex items-center justify-center gap-2 px-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${mobileTab === 'console' ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-white dark:bg-neutral-950' : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'}`}
                 >
                   <Terminal className="w-4 h-4" />
                   Output / Problems
                 </button>
               </div>

               <div className="flex-1 overflow-hidden relative">
                 <div className={`absolute inset-0 flex flex-col overflow-hidden ${mobileTab === 'editor' ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'}`}>
                   <EditorPanel />
                 </div>
                 <div className={`absolute inset-0 flex flex-col overflow-hidden ${mobileTab === 'console' ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'}`}>
                   <ConsolePanel />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
      
      {!isFullscreen && <StatusBar />}
    </div>
  );
}
