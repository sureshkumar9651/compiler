'use client';

import { useEffect, useState } from 'react';
import { TerminalSquare, Boxes, BookOpen, PanelLeft, PanelLeftClose, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { RequestBuilder } from '@/features/api-playground/components/RequestBuilder';
import { RequestTabs } from '@/features/api-playground/components/RequestTabs';
import { ResponsePanel } from '@/features/api-playground/components/ResponsePanel';
import { CollectionSidebar } from '@/features/api-playground/components/CollectionSidebar';
import { ExamplesPanel } from '@/features/api-playground/components/ExamplesPanel';
import { useApiCollectionStore } from '@/store/useApiCollectionStore';
import { Panel, Group, Separator } from 'react-resizable-panels';

type RightPanel = 'response' | 'examples';

export function ApiPlaygroundClient() {
  const { initialize, isLoading } = useApiCollectionStore();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanel, setRightPanel] = useState<RightPanel>('response');
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    if (mobile) setSidebarOpen(false);
    setMounted(true);
    initialize();

    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initialize]);

  if (!mounted || isMobile === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-950">
        <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-neutral-100 overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center gap-3 px-4 py-2.5 border-b border-neutral-800 bg-neutral-950 shrink-0 z-20">
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <TerminalSquare className="h-5 w-5 text-blue-500" />
          <span className="font-bold text-sm text-white">JS CodeLab</span>
        </Link>
        <span className="text-neutral-700">/</span>
        <span className="text-sm font-semibold text-neutral-300">API Playground</span>

        <div className="flex items-center gap-1 ml-auto">
          {/* Examples toggle */}
          <button
            id="api-examples-btn"
            onClick={() => setRightPanel(rightPanel === 'examples' ? 'response' : 'examples')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              rightPanel === 'examples'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border border-transparent'
            }`}
            title="Toggle Examples"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Examples</span>
          </button>

          {/* Sidebar toggle */}
          <button
            id="api-sidebar-toggle-btn"
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-2 rounded-lg text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
            title={sidebarOpen ? 'Hide collections' : 'Show collections'}
          >
            {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </button>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 ml-2 border-l border-neutral-800 pl-3">
            <Link href="/playground" className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors">
              Playground
            </Link>
            <Link href="/examples" className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors">
              Examples
            </Link>
          </nav>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Collections sidebar */}
        {sidebarOpen && (
          <>
            {/* Desktop */}
            <div className="hidden md:flex shrink-0">
              <CollectionSidebar />
            </div>
            {/* Mobile overlay */}
            <div className="md:hidden fixed inset-0 z-30 flex">
              <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
              <div className="relative w-72 bg-neutral-950 border-r border-neutral-800 h-full flex flex-col">
                <CollectionSidebar />
              </div>
            </div>
          </>
        )}

        {/* Main pane */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {!isMobile ? (
            <Group orientation="horizontal" className="flex-1 h-full">
              {/* Left: request builder */}
              <Panel defaultSize={45} minSize={25}>
                <div className="flex flex-col h-full border-r border-neutral-800">
                  <RequestBuilder />
                  <RequestTabs />
                </div>
              </Panel>

              <Separator className="w-px bg-neutral-800 hover:bg-blue-500/50 transition-colors" />

              {/* Right: response or examples */}
              <Panel defaultSize={55} minSize={25}>
                {rightPanel === 'response' ? (
                  <ResponsePanel />
                ) : (
                  <div className="flex flex-col h-full bg-neutral-950">
                    <div className="flex items-center justify-between px-3 py-2.5 border-b border-neutral-800 bg-neutral-900 shrink-0">
                      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Boxes className="h-3.5 w-3.5" /> Examples
                      </span>
                      <button
                        onClick={() => setRightPanel('response')}
                        className="text-xs text-neutral-500 hover:text-neutral-300"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <ExamplesPanel onClose={() => setRightPanel('response')} />
                    </div>
                  </div>
                )}
              </Panel>
            </Group>
          ) : (
            /* Mobile: stacked tabs */
            <MobileLayout rightPanel={rightPanel} setRightPanel={setRightPanel} />
          )}
        </div>
      </div>
    </div>
  );
}

function MobileLayout({
  rightPanel,
  setRightPanel,
}: {
  rightPanel: RightPanel;
  setRightPanel: (p: RightPanel) => void;
}) {
  const [mobileTab, setMobileTab] = useState<'request' | 'response'>('request');

  return (
    <div className="flex flex-col h-full">
      {/* Mobile tab bar */}
      <div className="flex border-b border-neutral-800 shrink-0">
        <button
          onClick={() => setMobileTab('request')}
          className={`flex-1 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            mobileTab === 'request'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-neutral-500'
          }`}
        >
          Request
        </button>
        <button
          onClick={() => setMobileTab('response')}
          className={`flex-1 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            mobileTab === 'response'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-neutral-500'
          }`}
        >
          Response
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className={`absolute inset-0 flex flex-col ${mobileTab === 'request' ? 'z-10' : 'z-0 pointer-events-none'}`}>
          <RequestBuilder />
          <RequestTabs />
        </div>
        <div className={`absolute inset-0 ${mobileTab === 'response' ? 'z-10' : 'z-0 pointer-events-none'}`}>
          {rightPanel === 'response' ? (
            <ResponsePanel />
          ) : (
            <ExamplesPanel onClose={() => setRightPanel('response')} />
          )}
        </div>
      </div>
    </div>
  );
}
