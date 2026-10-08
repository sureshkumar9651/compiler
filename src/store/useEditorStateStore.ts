import { create } from 'zustand';

export interface EditorMarker {
  owner: string;
  resource: unknown;
  severity: number;
  message: string;
  source?: string;
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
}

interface EditorStateStore {
  cursorLine: number;
  cursorColumn: number;
  selectionLength: number;
  markers: EditorMarker[];
  setCursorPosition: (line: number, column: number, selectionLength?: number) => void;
  setMarkers: (markers: EditorMarker[]) => void;
}

export const useEditorStateStore = create<EditorStateStore>((set) => ({
  cursorLine: 1,
  cursorColumn: 1,
  selectionLength: 0,
  markers: [],
  setCursorPosition: (line, column, selectionLength = 0) => set({ cursorLine: line, cursorColumn: column, selectionLength }),
  setMarkers: (markers) => set({ markers }),
}));
