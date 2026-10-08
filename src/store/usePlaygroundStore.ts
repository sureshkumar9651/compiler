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
  
  // Actions
  setCode: (code: string) => void;
  addConsoleEntry: (executionId: string, type: ConsoleEntryType, content: string, args?: string[]) => void;
  clearConsole: () => void;
  setStatus: (status: ExecutionStatus) => void;
  setExecutionTime: (time: number) => void;
  setLastError: (error: ExecutionError | null) => void;
  setConsoleOpen: (isOpen: boolean) => void;
  resetCode: () => void;
  setCurrentExecutionId: (id: string | null) => void;
  setConsoleFilter: (filter: ConsoleFilterType) => void;
  toggleSidebar: () => void;
  toggleFullscreen: () => void;
}

export const DEFAULT_CODE = `function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet("World");

console.log(message);`;

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
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
  setStatus: (status) => set({ status }),
  setExecutionTime: (executionTime) => set({ executionTime }),
  setLastError: (lastError) => set({ lastError }),
  setConsoleOpen: (isConsoleOpen) => set({ isConsoleOpen }),
  resetCode: () => set({ code: DEFAULT_CODE }),
  setCurrentExecutionId: (id) => set({ currentExecutionId: id }),
  setConsoleFilter: (consoleFilter) => set({ consoleFilter }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
}));
