'use client';

import Editor, { useMonaco, Monaco } from '@monaco-editor/react';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { useProjectStore } from '@/store/useProjectStore';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { Loader2 } from 'lucide-react';
import { useExecution } from '@/hooks/useExecution';
import { useEditorStore } from '@/store/useEditorStore';
import { useEditorStateStore } from '@/store/useEditorStateStore';
import { EditorToolbar } from '@/features/editor/components/EditorToolbar';
import { EditorTabBar } from '@/components/features/editor/EditorTabBar';
import { CommandPalette } from '@/features/editor/components/CommandPalette';
import { ShareDialog } from '@/features/sharing/components/share-dialog';
import { EditorSettingsDialog } from '@/features/editor/components/EditorSettingsDialog';
import { getErrorMessage } from '@/utils/error';
import { formatJavaScript } from '@/features/editor/services/formatter';
import { getFileLanguage } from '@/utils/fileTree';

export function EditorPanel() {
  const { code, reactCode, setCode, setReactCode, activeTab, lastError } = usePlaygroundStore();
  const { updateCode, updateReactCode, updateFileContent, manualSave, activeProjectId, activeFilePath, projects } = useProjectStore();
  const { executeCode } = useExecution();
  const monaco = useMonaco();
  const { resolvedTheme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  
  const { 
    fontSize, wordWrap, minimap, lineNumbers, tabSize, insertSpaces,
    suggestOn, syntaxDiagnosticsOn, semanticDiagnosticsOn
  } = useEditorStore();
  const { setCursorPosition, setMarkers } = useEditorStateStore();
  
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const activeProject = projects.find(p => p.id === activeProjectId);
  const activeFile = activeProject?.files?.find(f => f.path === activeFilePath);
  const currentLanguage = activeFilePath ? getFileLanguage(activeFilePath) : (activeTab === 'react' ? 'javascript' : 'javascript');
  const currentContent = activeFile !== undefined ? (activeFile.content || '') : (activeTab === 'javascript' ? code : reactCode);

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#0a0a0a',
        'editor.lineHighlightBackground': '#171717',
        'editorLineNumber.foreground': '#525252',
        'editorLineNumber.activeForeground': '#a3a3a3',
      },
    });

    monaco.editor.defineTheme('custom-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.lineHighlightBackground': '#f5f5f5',
        'editorLineNumber.foreground': '#a3a3a3',
        'editorLineNumber.activeForeground': '#525252',
      },
    });

    monaco.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      moduleResolution: monaco.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.typescript.ModuleKind.CommonJS,
      typeRoots: ['node_modules/@types'],
      lib: ['esnext', 'dom'], 
      allowJs: true,
      checkJs: true,
      jsx: monaco.typescript.JsxEmit.React,
      jsxFactory: 'React.createElement',
      jsxFragmentFactory: 'React.Fragment',
      allowSyntheticDefaultImports: true
    });

    monaco.typescript.javascriptDefaults.addExtraLib(
      `declare module 'react' {
        export as namespace React;
        const React: any;
        export default React;
        export const useState: any;
        export const useEffect: any;
        export const useRef: any;
        export const useMemo: any;
        export const useCallback: any;
        export const useContext: any;
        export const useReducer: any;
      }`,
      'file:///node_modules/@types/react/index.d.ts'
    );
    
    monaco.typescript.javascriptDefaults.addExtraLib(
      `declare module 'react-dom/client' {
        export const createRoot: any;
        export const hydrateRoot: any;
      }`,
      'file:///node_modules/@types/react-dom/client.d.ts'
    );
  };

  useEffect(() => {
    if (monaco) {
      monaco.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: !semanticDiagnosticsOn,
        noSyntaxValidation: !syntaxDiagnosticsOn,
        noSuggestionDiagnostics: !suggestOn,
      });
    }
  }, [monaco, suggestOn, syntaxDiagnosticsOn, semanticDiagnosticsOn]);

  useEffect(() => {
    if (!monaco || !editorRef.current) return;
    const model = editorRef.current.getModel();
    if (!model) return;

    if (lastError && lastError.line) {
      monaco.editor.setModelMarkers(model, 'playground', [
        {
          startLineNumber: lastError.line,
          startColumn: lastError.column || 1,
          endLineNumber: lastError.line,
          endColumn: 1000,
          message: getErrorMessage(lastError.message || lastError),
          severity: monaco.MarkerSeverity.Error,
        }
      ]);
    } else {
      monaco.editor.setModelMarkers(model, 'playground', []);
    }
  }, [lastError, monaco]);

  useEffect(() => {
    if (!monaco) return;
    
    const disposable = monaco.editor.onDidChangeMarkers(() => {
      const allMarkers = monaco.editor.getModelMarkers({});
      setMarkers(allMarkers);
    });

    return () => disposable.dispose();
  }, [monaco, setMarkers]);

  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{ line: number; column: number }>;
      const { line, column } = customEvent.detail;
      if (editorRef.current) {
        editorRef.current.focus();
        editorRef.current.revealPositionInCenter({ lineNumber: line, column: column });
        editorRef.current.setPosition({ lineNumber: line, column: column });
      }
    };
    
    window.addEventListener('editor-navigate', handleNavigate);
    return () => window.removeEventListener('editor-navigate', handleNavigate);
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      if (activeFilePath) {
        updateFileContent(activeFilePath, value);
      } else if (activeTab === 'javascript') {
        setCode(value);
        updateCode(value);
      } else {
        setReactCode(value);
        updateReactCode(value);
      }
    }
  };

  const handleEditorMount = (editorInstance: unknown, monacoInstance: Monaco) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editor = editorInstance as any;
    editorRef.current = editor;

    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter, () => {
      executeCode();
    });

    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyS, async () => {
      if (useEditorStore.getState().formatOnSave) {
        const currentCode = editor.getValue();
        const formatted = await formatJavaScript(currentCode, useEditorStore.getState().tabSize, !useEditorStore.getState().insertSpaces);
        if (formatted) {
          if (activeFilePath) {
            updateFileContent(activeFilePath, formatted);
          } else if (activeTab === 'javascript') {
            setCode(formatted);
            updateCode(formatted);
          } else {
            setReactCode(formatted);
            updateReactCode(formatted);
          }
          setTimeout(() => manualSave(), 50);
          return;
        }
      }
      manualSave();
    });

    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyMod.Shift | monacoInstance.KeyCode.KeyP, () => {
      setIsCommandPaletteOpen(true);
    });

    editor.onDidChangeCursorPosition((e: unknown) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pos = (e as any).position;
      const selection = editor.getSelection();
      let selectionLength = 0;
      if (selection && !selection.isEmpty()) {
        selectionLength = editor.getModel().getValueInRange(selection).length;
      }
      setCursorPosition(pos.lineNumber, pos.column, selectionLength);
    });
  };

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 w-full h-full relative border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-col overflow-hidden">
      <EditorToolbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      <EditorTabBar />
      
      <div className="flex-1 min-h-0 relative">
        {isReady && (
          <Editor
            height="100%"
            language={currentLanguage}
            theme={resolvedTheme === 'dark' ? 'custom-dark' : 'custom-light'}
            value={currentContent}
            onChange={handleEditorChange}
            beforeMount={handleEditorWillMount}
            onMount={handleEditorMount}
            options={{
              minimap: { enabled: minimap, scale: 0.75 },
              fontSize: fontSize,
              fontFamily: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              lineHeight: Math.max(20, Math.floor(fontSize * 1.6)),
              padding: { top: 16, bottom: 16 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: 'smooth',
              cursorSmoothCaretAnimation: 'on',
              formatOnPaste: true,
              wordWrap: wordWrap ? 'on' : 'off',
              lineNumbers: lineNumbers ? 'on' : 'off',
              bracketPairColorization: { enabled: true },
              autoClosingBrackets: 'always',
              folding: true,
              automaticLayout: true,
              renderLineHighlight: 'all',
              hideCursorInOverviewRuler: true,
              tabSize,
              insertSpaces,
              scrollbar: {
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
              },
            }}
            loading={
              <div className="flex h-full items-center justify-center text-neutral-500 gap-2 flex-col">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="text-sm font-medium">Initializing Editor...</span>
              </div>
            }
          />
        )}
      </div>
      
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
      />
      <ShareDialog isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
      <EditorSettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

