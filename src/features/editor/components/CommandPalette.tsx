import { useEffect, useState, useRef } from 'react';
import { Play, Square, Save, AlignLeft, FolderPlus, Share2, PanelLeftClose, PanelLeft, WrapText, Settings, Search, X } from 'lucide-react';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { useProjectStore } from '@/store/useProjectStore';
import { useEditorStore } from '@/store/useEditorStore';
import { useExecution } from '@/hooks/useExecution';
import { formatJavaScript } from '../services/formatter';

export interface Command {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  execute: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
  onOpenShare: () => void;
}

export function CommandPalette({ isOpen, onClose, onOpenSettings, onOpenShare }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { code, setCode, status, clearConsole, toggleSidebar, toggleFullscreen } = usePlaygroundStore();
  const { manualSave, createProject } = useProjectStore();
  const { executeCode, stopExecution } = useExecution();
  const { toggleWordWrap, toggleMinimap, tabSize, insertSpaces } = useEditorStore();

  const isRunning = status === 'running';

  const commands: Command[] = [
    {
      id: 'run-code',
      label: 'Run Code',
      icon: <Play className="w-4 h-4" />,
      shortcut: 'Ctrl+Enter',
      execute: () => {
        if (!isRunning) executeCode();
      }
    },
    {
      id: 'stop-execution',
      label: 'Stop Execution',
      icon: <Square className="w-4 h-4" />,
      execute: () => {
        if (isRunning) stopExecution();
      }
    },
    {
      id: 'save-project',
      label: 'Save Project',
      icon: <Save className="w-4 h-4" />,
      shortcut: 'Ctrl+S',
      execute: manualSave
    },
    {
      id: 'format-document',
      label: 'Format Document',
      icon: <AlignLeft className="w-4 h-4" />,
      shortcut: 'Shift+Alt+F',
      execute: async () => {
        const formatted = await formatJavaScript(code, tabSize, !insertSpaces);
        if (formatted) setCode(formatted);
      }
    },
    {
      id: 'clear-console',
      label: 'Clear Console',
      icon: <X className="w-4 h-4" />,
      execute: clearConsole
    },
    {
      id: 'new-project',
      label: 'New Project',
      icon: <FolderPlus className="w-4 h-4" />,
      execute: () => createProject()
    },
    {
      id: 'share-code',
      label: 'Share Code',
      icon: <Share2 className="w-4 h-4" />,
      execute: onOpenShare
    },
    {
      id: 'toggle-sidebar',
      label: 'Toggle Sidebar',
      icon: <PanelLeftClose className="w-4 h-4" />,
      shortcut: 'Ctrl+B',
      execute: toggleSidebar
    },
    {
      id: 'toggle-fullscreen',
      label: 'Toggle Fullscreen',
      icon: <PanelLeft className="w-4 h-4" />,
      execute: toggleFullscreen
    },
    {
      id: 'toggle-word-wrap',
      label: 'Toggle Word Wrap',
      icon: <WrapText className="w-4 h-4" />,
      execute: toggleWordWrap
    },
    {
      id: 'toggle-minimap',
      label: 'Toggle Minimap',
      icon: <PanelLeft className="w-4 h-4" />,
      execute: toggleMinimap
    },
    {
      id: 'editor-settings',
      label: 'Editor Settings',
      icon: <Settings className="w-4 h-4" />,
      execute: onOpenSettings
    }
  ];

  const filteredCommands = commands.filter(c => 
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setSearch('');
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+P or Cmd+Shift+P
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        // Since we don't have a global toggle yet, this is handled in EditorPanel
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].execute();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-[15vh] px-3 sm:px-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-[calc(100vw-24px)] max-w-xl max-h-[calc(100vh-8rem)] sm:max-h-[70vh] flex flex-col bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
          <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command..."
            className="flex-1 bg-transparent border-none outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
          />
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 min-h-[50px]">
          {filteredCommands.length === 0 ? (
            <div className="py-6 text-center text-sm text-neutral-500">
              No commands found.
            </div>
          ) : (
            filteredCommands.map((command, index) => (
              <button
                key={command.id}
                onClick={() => {
                  command.execute();
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                  index === selectedIndex
                    ? 'bg-blue-600 text-white'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
                }`}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex items-center gap-3">
                  <span className={`${index === selectedIndex ? 'text-white' : 'text-neutral-500 dark:text-neutral-400'}`}>
                    {command.icon}
                  </span>
                  <span className="font-medium text-sm">{command.label}</span>
                </div>
                {command.shortcut && (
                  <span className={`text-xs ${index === selectedIndex ? 'text-blue-200' : 'text-neutral-400 dark:text-neutral-500'}`}>
                    {command.shortcut}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
