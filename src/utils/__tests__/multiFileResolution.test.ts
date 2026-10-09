import { describe, it, expect } from 'vitest';
import { createDefaultReactFiles, createDefaultJSFiles, normalizePath, getParentPath } from '../fileTree';

describe('Multi-file React resolution and project structure', () => {
  it('creates default React file tree with all required entry points', () => {
    const files = createDefaultReactFiles();
    const paths = files.map(f => f.path);

    expect(paths).toContain('public/index.html');
    expect(paths).toContain('src/main.jsx');
    expect(paths).toContain('src/App.jsx');
    expect(paths).toContain('src/styles.css');
    expect(paths).toContain('package.json');
    expect(paths).toContain('README.md');
  });

  it('creates default JavaScript file tree with required files', () => {
    const files = createDefaultJSFiles('console.log("test")');
    const paths = files.map(f => f.path);

    expect(paths).toContain('index.js');
  });

  it('resolves relative directory paths correctly for imports', () => {
    const currentFile = 'src/components/App.jsx';
    const currentDir = getParentPath(currentFile);
    expect(currentDir).toBe('src/components');

    const importPath = '../utils/helpers';
    const rawPath = currentDir ? `${currentDir}/${importPath}` : importPath;
    const target = normalizePath(rawPath);
    expect(target).toBe('src/utils/helpers');
  });
});
