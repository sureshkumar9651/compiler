import { X } from 'lucide-react';
import { useEditorStore } from '@/store/useEditorStore';

interface EditorSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditorSettingsDialog({ isOpen, onClose }: EditorSettingsDialogProps) {
  const { 
    fontSize, wordWrap, minimap, lineNumbers, tabSize, formatOnSave,
    suggestOn, syntaxDiagnosticsOn, semanticDiagnosticsOn,
    updatePreferences, resetPreferences 
  } = useEditorStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="settings-dialog-title"
        className="w-[calc(100vw-24px)] max-w-md max-h-[calc(100vh-24px)] flex flex-col bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
          <h2 id="settings-dialog-title" className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            Editor Settings
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:text-neutral-300 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close settings"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Font Size</span>
            <div className="flex items-center gap-2">
              <button 
                className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                onClick={() => updatePreferences({ fontSize: Math.max(fontSize - 1, 10) })}
              >
                -
              </button>
              <span className="w-8 text-center text-sm">{fontSize}</span>
              <button 
                className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                onClick={() => updatePreferences({ fontSize: Math.min(fontSize + 1, 24) })}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Word Wrap</span>
            <button 
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 ${wordWrap ? 'bg-blue-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
              onClick={() => updatePreferences({ wordWrap: !wordWrap })}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${wordWrap ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Minimap</span>
            <button 
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 ${minimap ? 'bg-blue-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
              onClick={() => updatePreferences({ minimap: !minimap })}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${minimap ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Line Numbers</span>
            <button 
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 ${lineNumbers ? 'bg-blue-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
              onClick={() => updatePreferences({ lineNumbers: !lineNumbers })}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${lineNumbers ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Format on Save</span>
            <button 
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 ${formatOnSave ? 'bg-blue-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
              onClick={() => updatePreferences({ formatOnSave: !formatOnSave })}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formatOnSave ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">JavaScript Suggestions</span>
            <button 
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 ${suggestOn ? 'bg-blue-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
              onClick={() => updatePreferences({ suggestOn: !suggestOn })}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${suggestOn ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Syntax Diagnostics</span>
            <button 
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 ${syntaxDiagnosticsOn ? 'bg-blue-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
              onClick={() => updatePreferences({ syntaxDiagnosticsOn: !syntaxDiagnosticsOn })}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${syntaxDiagnosticsOn ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Semantic Diagnostics</span>
            <button 
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 ${semanticDiagnosticsOn ? 'bg-blue-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
              onClick={() => updatePreferences({ semanticDiagnosticsOn: !semanticDiagnosticsOn })}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${semanticDiagnosticsOn ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Tab Size</span>
            <select 
              value={tabSize}
              onChange={(e) => updatePreferences({ tabSize: Number(e.target.value) as 2 | 4 })}
              className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md px-2 py-1 text-sm text-neutral-700 dark:text-neutral-300"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <button 
              onClick={resetPreferences}
              className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
            >
              Reset to Defaults
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
