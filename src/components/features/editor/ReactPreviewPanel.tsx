'use client';

import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { useProjectStore } from '@/store/useProjectStore';
import { useEffect, useRef, useState } from 'react';
import { RefreshCw, Play, AlertCircle } from 'lucide-react';

export function ReactPreviewPanel() {
  const { reactExecutionTrigger, setLastError } = usePlaygroundStore();
  const { activeProjectId, projects } = useProjectStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  const activeProject = projects.find((p) => p.id === activeProjectId);

  useEffect(() => {
    if (reactExecutionTrigger === 0) return;
    updateIframe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactExecutionTrigger]);

  const updateIframe = () => {
    if (!iframeRef.current) return;

    setError(null);
    setLastError(null);

    const files = activeProject?.files || [];
    const filesMap: Record<string, string> = {};

    files.forEach((f) => {
      if (f.type === 'file') {
        filesMap[f.path] = f.content || '';
      }
    });

    const filesJson = JSON.stringify(filesMap).replace(/<\/script>/g, '<\\/script>');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin="anonymous"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin="anonymous"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js" crossorigin="anonymous"></script>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 16px; font-family: system-ui, -apple-system, sans-serif; background: transparent; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script>
            window.onerror = function(msg, url, lineNo, columnNo, error) {
              window.parent.postMessage({ type: 'REACT_ERROR', payload: msg + (lineNo ? ' at line ' + lineNo : '') }, '*');
              return false;
            };
            window.addEventListener('unhandledrejection', function(event) {
              window.parent.postMessage({ type: 'REACT_ERROR', payload: event.reason?.message || 'Promise Rejection' }, '*');
            });
          </script>
          <script>
            try {
              const files = ${filesJson};
              const moduleCache = {};

              function normalizePath(p) {
                const parts = p.replace(/\\\\/g, '/').split('/');
                const res = [];
                for (const part of parts) {
                  if (part === '' || part === '.') continue;
                  if (part === '..') {
                    if (res.length > 0) res.pop();
                  } else {
                    res.push(part);
                  }
                }
                return res.join('/');
              }

              function resolvePath(currentFile, importPath) {
                if (importPath === 'react') return { type: 'external', value: window.React };
                if (importPath === 'react-dom/client' || importPath === 'react-dom') return { type: 'external', value: window.ReactDOM };
                if (importPath === 'react/jsx-runtime') {
                  return {
                    type: 'external',
                    value: {
                      jsx: window.React.createElement,
                      jsxs: window.React.createElement,
                      Fragment: window.React.Fragment,
                    }
                  };
                }

                const currentDir = currentFile && currentFile.includes('/') 
                  ? currentFile.substring(0, currentFile.lastIndexOf('/')) 
                  : '';

                const pathsToTry = [];

                if (importPath.startsWith('./') || importPath.startsWith('../')) {
                  pathsToTry.push(currentDir ? currentDir + '/' + importPath : importPath);
                } else if (importPath.startsWith('/')) {
                  pathsToTry.push(importPath.substring(1));
                } else if (importPath.startsWith('@/')) {
                  pathsToTry.push('src/' + importPath.substring(2));
                } else {
                  pathsToTry.push(importPath);
                  if (currentDir) {
                    pathsToTry.push(currentDir + '/' + importPath);
                  }
                }

                for (const rawPath of pathsToTry) {
                  const target = normalizePath(rawPath);
                  const candidates = [
                    target,
                    target + '.jsx',
                    target + '.js',
                    target + '.tsx',
                    target + '.ts',
                    target + '.css',
                    target + '.json',
                    target + '/index.jsx',
                    target + '/index.js',
                    target + '/index.tsx',
                    target + '/index.ts',
                  ];

                  for (const cand of candidates) {
                    if (Object.prototype.hasOwnProperty.call(files, cand)) {
                      return { type: 'file', path: cand };
                    }
                  }
                }

                const isRelativeOrFile = 
                  importPath.startsWith('.') || 
                  importPath.startsWith('/') || 
                  importPath.startsWith('@/') || 
                  importPath.includes('/') || 
                  /\.(jsx|js|tsx|ts|css|json)$/i.test(importPath);

                if (isRelativeOrFile) {
                  throw new Error("Module not found: Can't resolve '" + importPath + "' in '" + (currentFile || 'root') + "'");
                }

                throw new Error("Module not found: External package '" + importPath + "' is not installed. Browser workspace supports built-in React modules.");
              }

              function injectCSS(filePath, cssContent) {
                let styleEl = document.getElementById('style-' + filePath);
                if (!styleEl) {
                  styleEl = document.createElement('style');
                  styleEl.id = 'style-' + filePath;
                  document.head.appendChild(styleEl);
                }
                styleEl.textContent = cssContent;
              }

              function requireModule(currentFile, importPath) {
                const resolved = resolvePath(currentFile, importPath);
                if (resolved.type === 'external') {
                  return resolved.value;
                }

                const targetPath = resolved.path;

                if (targetPath.endsWith('.css')) {
                  injectCSS(targetPath, files[targetPath] || '');
                  return {};
                }

                if (targetPath.endsWith('.json')) {
                  try {
                    return JSON.parse(files[targetPath] || '{}');
                  } catch (e) {
                    throw new Error('Failed to parse JSON in ' + targetPath + ': ' + e.message);
                  }
                }

                if (moduleCache[targetPath]) {
                  return moduleCache[targetPath].exports;
                }

                const code = files[targetPath];
                if (code === undefined) {
                  throw new Error('File not found: ' + targetPath);
                }

                const transpiled = Babel.transform(code, {
                  presets: [
                    ['react', { runtime: 'classic' }],
                    'env'
                  ],
                  plugins: ['transform-modules-commonjs'],
                  filename: targetPath
                }).code;

                const module = { exports: {} };
                moduleCache[targetPath] = module;

                const localRequire = (mod) => requireModule(targetPath, mod);

                const fn = new Function('require', 'module', 'exports', transpiled + '\\n//# sourceURL=' + targetPath);
                fn(localRequire, module, module.exports);

                return module.exports;
              }

              if (files['src/styles.css']) {
                injectCSS('src/styles.css', files['src/styles.css']);
              }

              let entryFile = null;
              const entryCandidates = [
                'src/main.jsx',
                'src/main.tsx',
                'src/main.js',
                'src/index.jsx',
                'src/index.js',
                'src/App.jsx',
                'src/App.tsx',
                'src/App.js'
              ];

              for (const cand of entryCandidates) {
                if (Object.prototype.hasOwnProperty.call(files, cand)) {
                  entryFile = cand;
                  break;
                }
              }

              if (!entryFile) {
                const allFiles = Object.keys(files);
                entryFile = allFiles.find(f => f.endsWith('.jsx') || f.endsWith('.js') || f.endsWith('.tsx') || f.endsWith('.ts')) || allFiles[0];
              }

              if (!entryFile) {
                throw new Error('No executable JavaScript or React files found in project.');
              }

              const entryExports = requireModule('', entryFile);

              const root = document.getElementById('root');
              if (root && root.children.length === 0) {
                let Component = entryExports.default || entryExports.App;
                if (!Component && files['src/App.jsx']) {
                  const appExports = requireModule('', 'src/App.jsx');
                  Component = appExports.default || appExports.App;
                }

                if (Component) {
                  const reactRoot = ReactDOM.createRoot(root);
                  reactRoot.render(React.createElement(Component));
                }
              }
            } catch (err) {
              window.parent.postMessage({ type: 'REACT_ERROR', payload: err.message }, '*');
            }
          </script>
        </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    iframeRef.current.src = URL.createObjectURL(blob);
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'REACT_ERROR') {
        const msg = event.data.payload;
        setError(msg);
        setLastError({ name: 'ReactError', message: msg });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [setLastError]);

  return (
    <div className="flex-1 w-full h-full relative border-l border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
        <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          Live Preview
        </span>
        <button
          onClick={updateIframe}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          title="Refresh Preview"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="flex-1 min-h-0 relative bg-white">
        {error ? (
          <div className="absolute inset-0 p-4 bg-red-50 text-red-600 overflow-auto">
            <div className="flex items-center gap-2 mb-2 font-semibold">
              <AlertCircle className="h-5 w-5" />
              Runtime Error
            </div>
            <pre className="text-sm whitespace-pre-wrap font-mono">{error}</pre>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin"
            title="React Preview"
          />
        )}

        {reactExecutionTrigger === 0 && !iframeRef.current?.src && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-neutral-900 text-neutral-400 flex-col gap-3">
            <Play className="h-8 w-8 text-neutral-300" />
            <p className="text-sm font-medium">Click Run to see preview</p>
          </div>
        )}
      </div>
    </div>
  );
}
