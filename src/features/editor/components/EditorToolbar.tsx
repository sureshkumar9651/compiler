import { useState } from 'react';
import { Settings, AlignLeft, Command } from 'lucide-react';
import { EditorSettingsDialog } from './EditorSettingsDialog';
import { formatJavaScript } from '../services/formatter';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { useEditorStore } from '@/store/useEditorStore';

interface EditorToolbarProps {
  onOpenCommandPalette: () => void;
}

export function EditorToolbar({ onOpenCommandPalette }: EditorToolbarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [formatError, setFormatError] = useState<string | null>(null);
  
  const { code, setCode } = usePlaygroundStore();
  const { tabSize, insertSpaces } = useEditorStore();

  const handleFormat = async () => {
    if (isFormatting || !code.trim()) return;
    
    setIsFormatting(true);
    setFormatError(null);
    
    const formatted = await formatJavaScript(code, tabSize, !insertSpaces);
    
    if (formatted) {
      setCode(formatted);
    } else {
      setFormatError('Unable to format code. The JavaScript may contain a syntax error.');
      setTimeout(() => setFormatError(null), 3000);
    }
    
    setIsFormatting(false);
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            JavaScript
          </span>
          {formatError && (
            <span className="text-xs text-amber-600 dark:text-amber-500 ml-2 animate-in fade-in">
              {formatError}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={handleFormat}
            disabled={isFormatting}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
            title="Format Document (Shift+Alt+F)"
          >
            <AlignLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Format</span>
          </button>
          
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            title="Command Palette (Ctrl+Shift+P)"
          >
            <Command className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Commands</span>
          </button>
          
          <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-700 mx-1" />
          
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-1.5 rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            title="Editor Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <EditorSettingsDialog 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}
