import { describe, it, expect } from 'vitest';
import {
  normalizePath,
  isValidFileName,
  isValidPath,
  getFileExtension,
  getFileLanguage,
  getParentPath,
  buildFileTree,
  createDefaultReactFiles,
  createDefaultJSFiles,
} from '../fileTree';

describe('fileTree utilities', () => {
  it('normalizes paths properly', () => {
    expect(normalizePath('/src//components/App.jsx/')).toBe('src/components/App.jsx');
    expect(normalizePath('README.md')).toBe('README.md');
    expect(normalizePath('')).toBe('');
  });

  it('validates file names correctly', () => {
    expect(isValidFileName('App.jsx')).toBe(true);
    expect(isValidFileName('my-folder')).toBe(true);
    expect(isValidFileName('')).toBe(false);
    expect(isValidFileName('   ')).toBe(false);
    expect(isValidFileName('folder/name')).toBe(false);
    expect(isValidFileName('file:name')).toBe(false);
    expect(isValidFileName('..')).toBe(false);
  });

  it('validates paths and rejects path traversal', () => {
    expect(isValidPath('src/components/App.jsx')).toBe(true);
    expect(isValidPath('README.md')).toBe(true);
    expect(isValidPath('../secret.txt')).toBe(false);
    expect(isValidPath('src/../secret.txt')).toBe(false);
    expect(isValidPath('')).toBe(false);
  });

  it('detects file extension and language mode', () => {
    expect(getFileExtension('src/App.jsx')).toBe('jsx');
    expect(getFileLanguage('src/App.jsx')).toBe('javascript');
    expect(getFileLanguage('src/index.ts')).toBe('typescript');
    expect(getFileLanguage('src/styles.css')).toBe('css');
    expect(getFileLanguage('package.json')).toBe('json');
    expect(getFileLanguage('public/index.html')).toBe('html');
    expect(getFileLanguage('README.md')).toBe('markdown');
  });

  it('calculates parent path accurately', () => {
    expect(getParentPath('src/components/App.jsx')).toBe('src/components');
    expect(getParentPath('src/components')).toBe('src');
    expect(getParentPath('README.md')).toBeNull();
  });

  it('builds a hierarchical file tree structure', () => {
    const files = createDefaultReactFiles();
    const tree = buildFileTree(files);
    
    // Expect top-level directories first, sorted alphabetically
    expect(tree.length).toBeGreaterThan(0);
    const publicNode = tree.find(n => n.name === 'public');
    expect(publicNode?.type).toBe('directory');
    expect(publicNode?.children?.some(c => c.name === 'index.html')).toBe(true);
    
    const srcNode = tree.find(n => n.name === 'src');
    expect(srcNode?.type).toBe('directory');
    expect(srcNode?.children?.some(c => c.name === 'App.jsx')).toBe(true);
    expect(srcNode?.children?.some(c => c.name === 'main.jsx')).toBe(true);
  });

  it('generates starter JS and React file sets', () => {
    const jsFiles = createDefaultJSFiles('console.log("hello")');
    expect(jsFiles.some(f => f.path === 'index.js' && f.content === 'console.log("hello")')).toBe(true);

    const reactFiles = createDefaultReactFiles();
    expect(reactFiles.some(f => f.path === 'src/main.jsx')).toBe(true);
    expect(reactFiles.some(f => f.path === 'src/App.jsx')).toBe(true);
    expect(reactFiles.some(f => f.path === 'src/styles.css')).toBe(true);
  });
});
