import { ProjectFile } from '@/types/project';

export interface FileTreeNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'directory';
  content?: string;
  children?: FileTreeNode[];
}

export function normalizePath(path: string): string {
  if (!path) return '';
  const clean = path
    .replace(/\\/g, '/')
    .replace(/\/+/g, '/')
    .replace(/^\//, '')
    .replace(/\/$/, '');

  const parts = clean.split('/');
  const stack: string[] = [];
  for (const part of parts) {
    if (part === '' || part === '.') continue;
    if (part === '..') {
      if (stack.length > 0 && stack[stack.length - 1] !== '..') {
        stack.pop();
      } else {
        stack.push('..');
      }
    } else {
      stack.push(part);
    }
  }
  return stack.join('/');
}

export function isValidFileName(name: string): boolean {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (!trimmed) return false;
  if (trimmed === '.' || trimmed === '..') return false;
  // Disallow illegal characters
  return !/[\\/:\*\?"<>\|]/.test(trimmed);
}

export function isValidPath(path: string): boolean {
  if (!path) return false;
  const rawParts = path.replace(/\\/g, '/').split('/');
  if (rawParts.some((p) => p === '..' || p === '.' || !p.trim())) return false;

  const normalized = normalizePath(path);
  return Boolean(normalized && !normalized.startsWith('..'));
}

export function getFileExtension(path: string): string {
  const normalized = normalizePath(path);
  const parts = normalized.split('/');
  const filename = parts[parts.length - 1];
  const dotIndex = filename.lastIndexOf('.');
  if (dotIndex <= 0) return '';
  return filename.slice(dotIndex + 1).toLowerCase();
}

export function getFileLanguage(path: string): string {
  const ext = getFileExtension(path);
  switch (ext) {
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'css':
      return 'css';
    case 'json':
      return 'json';
    case 'html':
    case 'htm':
      return 'html';
    case 'md':
    case 'markdown':
      return 'markdown';
    default:
      return 'plaintext';
  }
}

export function getParentPath(path: string): string | null {
  const normalized = normalizePath(path);
  const lastSlash = normalized.lastIndexOf('/');
  if (lastSlash === -1) return null;
  return normalized.slice(0, lastSlash);
}

export function buildFileTree(files: ProjectFile[]): FileTreeNode[] {
  const map = new Map<string, FileTreeNode>();
  const rootNodes: FileTreeNode[] = [];

  // First pass: instantiate nodes
  files.forEach((file) => {
    const normPath = normalizePath(file.path);
    map.set(normPath, {
      id: file.id,
      name: file.name,
      path: normPath,
      type: file.type,
      content: file.content,
      children: file.type === 'directory' ? [] : undefined,
    });
  });

  // Second pass: form parent-child linkages
  files.forEach((file) => {
    const normPath = normalizePath(file.path);
    const node = map.get(normPath)!;
    const parentPath = getParentPath(normPath);

    if (parentPath && map.has(parentPath)) {
      const parentNode = map.get(parentPath)!;
      if (parentNode.children) {
        parentNode.children.push(node);
      }
    } else {
      rootNodes.push(node);
    }
  });

  // Sort nodes: directories first, then alphabetical by name
  const sortNodes = (nodes: FileTreeNode[]) => {
    nodes.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'directory' ? -1 : 1;
      }
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
    });
    nodes.forEach((node) => {
      if (node.children) sortNodes(node.children);
    });
  };

  sortNodes(rootNodes);
  return rootNodes;
}

export function createDefaultReactFiles(customReactCode?: string): ProjectFile[] {
  const appCode = customReactCode !== undefined ? customReactCode : `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800">
      <h1 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
        React Counter
      </h1>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
      >
        Clicked {count} times
      </button>
    </div>
  );
}
`;

  return [
    {
      id: crypto.randomUUID(),
      path: 'public',
      name: 'public',
      type: 'directory',
      parentId: null,
    },
    {
      id: crypto.randomUUID(),
      path: 'public/index.html',
      name: 'index.html',
      type: 'file',
      parentId: 'public',
      content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
    },
    {
      id: crypto.randomUUID(),
      path: 'src',
      name: 'src',
      type: 'directory',
      parentId: null,
    },
    {
      id: crypto.randomUUID(),
      path: 'src/main.jsx',
      name: 'main.jsx',
      type: 'file',
      parentId: 'src',
      content: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}`,
    },
    {
      id: crypto.randomUUID(),
      path: 'src/App.jsx',
      name: 'App.jsx',
      type: 'file',
      parentId: 'src',
      content: appCode,
    },
    {
      id: crypto.randomUUID(),
      path: 'src/styles.css',
      name: 'styles.css',
      type: 'file',
      parentId: 'src',
      content: `/* Starter styles */
body {
  margin: 0;
  padding: 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}`,
    },
    {
      id: crypto.randomUUID(),
      path: 'package.json',
      name: 'package.json',
      type: 'file',
      parentId: null,
      content: JSON.stringify(
        {
          name: 'my-react-app',
          version: '1.0.0',
          private: true,
          dependencies: {
            react: '^18.2.0',
            'react-dom': '^18.2.0',
          },
        },
        null,
        2
      ),
    },
    {
      id: crypto.randomUUID(),
      path: 'README.md',
      name: 'README.md',
      type: 'file',
      parentId: null,
      content: `# React Project

Welcome to your React JS project!

Edit components inside \`src/\` to see live updates in the preview.`,
    },
  ];
}

export function createDefaultJSFiles(customJSCode?: string): ProjectFile[] {
  const indexCode =
    customJSCode !== undefined
      ? customJSCode
      : `function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`;

  return [
    {
      id: crypto.randomUUID(),
      path: 'index.js',
      name: 'index.js',
      type: 'file',
      parentId: null,
      content: indexCode,
    },
  ];
}
