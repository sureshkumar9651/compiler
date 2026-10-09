import { create } from 'zustand';
import { ConsoleEntry, ConsoleEntryType, ExecutionStatus, ExecutionError, ConsoleFilterType } from '@/types/playground';

const MAX_CONSOLE_ENTRIES = 1000;

interface PlaygroundState {
  code: string;
  consoleEntries: ConsoleEntry[];
  status: ExecutionStatus;
  executionTime: number;
  lastError: ExecutionError | null;
  isConsoleOpen: boolean;
  currentExecutionId: string | null;
  consoleFilter: ConsoleFilterType;
  isSidebarOpen: boolean;
  isFullscreen: boolean;
  activeTab: 'javascript' | 'react';
  reactCode: string;
  reactExecutionTrigger: number;
  
  // Actions
  setActiveTab: (tab: 'javascript' | 'react') => void;
  setReactCode: (code: string) => void;
  setCode: (code: string) => void;
  addConsoleEntry: (executionId: string, type: ConsoleEntryType, content: string, args?: string[]) => void;
  clearConsole: () => void;
  executeReact: () => void;
  setStatus: (status: ExecutionStatus) => void;
  setExecutionTime: (time: number) => void;
  setLastError: (error: ExecutionError | null) => void;
  setConsoleOpen: (isOpen: boolean) => void;
  resetCode: () => void;
  setCurrentExecutionId: (id: string | null) => void;
  setConsoleFilter: (filter: ConsoleFilterType) => void;
  toggleSidebar: () => void;
  toggleFullscreen: () => void;
  resetReactCode: () => void;
}

export const DEFAULT_CODE = `function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet("World");

console.log(message);`;

export const DEFAULT_REACT_CODE = `import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

export default function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-neutral-200">
      <h1 className="text-2xl font-bold mb-4 text-neutral-900">React Counter</h1>
      <button 
        onClick={() => setCount(c => c + 1)}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
      >
        Clicked {count} times
      </button>
    </div>
  );
}
`;

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  activeTab: 'javascript',
  reactCode: DEFAULT_REACT_CODE,
  code: DEFAULT_CODE,
  consoleEntries: [],
  status: 'idle',
  executionTime: 0,
  lastError: null,
  isConsoleOpen: true,
  currentExecutionId: null,
  consoleFilter: 'all',
  isSidebarOpen: true,
  isFullscreen: false,
  reactExecutionTrigger: 0,

  setActiveTab: (activeTab) => set({ activeTab }),
  setReactCode: (reactCode) => set({ reactCode }),
  setCode: (code) => set({ code }),
  addConsoleEntry: (executionId, type, content, args) => set((state) => {
    // Prevent stale execution output from race conditions
    if (executionId !== state.currentExecutionId && state.currentExecutionId !== null) {
      return state;
    }

    const newEntries = [
      ...state.consoleEntries,
      {
        id: crypto.randomUUID(),
        type,
        content,
        args,
        timestamp: Date.now(),
      }
    ];

    if (newEntries.length > MAX_CONSOLE_ENTRIES) {
      newEntries.splice(0, newEntries.length - MAX_CONSOLE_ENTRIES);
      // Optional: Add a truncation warning entry
      if (newEntries[0].type !== 'system') {
        newEntries[0] = {
          id: crypto.randomUUID(),
          type: 'system',
          content: 'Console output limit reached. Earlier entries omitted.',
          timestamp: Date.now()
        };
      }
    }

    return { consoleEntries: newEntries };
  }),
  clearConsole: () => set({ consoleEntries: [] }),
  executeReact: () => set((state) => ({ reactExecutionTrigger: state.reactExecutionTrigger + 1, status: 'idle', executionTime: 0, lastError: null })),
  setStatus: (status) => set({ status }),
  setExecutionTime: (executionTime) => set({ executionTime }),
  setLastError: (lastError) => set({ lastError }),
  setConsoleOpen: (isConsoleOpen) => set({ isConsoleOpen }),
  resetCode: () => set({ code: DEFAULT_CODE }),
  resetReactCode: () => set({ reactCode: DEFAULT_REACT_CODE }),
  setCurrentExecutionId: (id) => set({ currentExecutionId: id }),
  setConsoleFilter: (consoleFilter) => set({ consoleFilter }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
}));
