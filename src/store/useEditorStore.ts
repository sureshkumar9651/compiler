import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EditorPreferences {
  fontSize: number;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;
  tabSize: 2 | 4;
  insertSpaces: boolean;
  formatOnSave: boolean;
  suggestOn: boolean;
  syntaxDiagnosticsOn: boolean;
  semanticDiagnosticsOn: boolean;
}

export const defaultPreferences: EditorPreferences = {
  fontSize: 14,
  wordWrap: false,
  minimap: typeof window !== 'undefined' && window.innerWidth >= 768, // On by default for desktop
  lineNumbers: true,
  tabSize: 2,
  insertSpaces: true,
  formatOnSave: false,
  suggestOn: true,
  syntaxDiagnosticsOn: true,
  semanticDiagnosticsOn: true,
};

interface EditorStore extends EditorPreferences {
  updatePreferences: (prefs: Partial<EditorPreferences>) => void;
  resetPreferences: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleWordWrap: () => void;
  toggleMinimap: () => void;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      ...defaultPreferences,
      updatePreferences: (prefs) => set((state) => ({ ...state, ...prefs })),
      resetPreferences: () => set(defaultPreferences),
      increaseFontSize: () => set((state) => ({ fontSize: Math.min(state.fontSize + 1, 24) })),
      decreaseFontSize: () => set((state) => ({ fontSize: Math.max(state.fontSize - 1, 10) })),
      toggleWordWrap: () => set((state) => ({ wordWrap: !state.wordWrap })),
      toggleMinimap: () => set((state) => ({ minimap: !state.minimap })),
    }),
    {
      name: 'jscodelab-editor-preferences',
    }
  )
);
