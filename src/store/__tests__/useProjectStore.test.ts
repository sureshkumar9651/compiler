import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import { useProjectStore } from '../useProjectStore';
import { usePlaygroundStore } from '../usePlaygroundStore';
import { projectRepository } from '@/lib/playground/persistence/IndexedDBProjectRepository';

describe('useProjectStore - Mode Isolation & Filtering', () => {
  beforeEach(async () => {
    localStorage.clear();
    // Clear all existing IndexedDB projects between tests
    const existing = await projectRepository.getProjects();
    for (const p of existing) {
      await projectRepository.deleteProject(p.id);
    }

    const store = useProjectStore.getState();
    store.projects = [];
    store.activeProjectId = null;
    store.activeFilePath = null;
    store.openFiles = [];
    usePlaygroundStore.getState().setActiveTab('javascript');
  });

  it('initializes default JavaScript project in JavaScript mode', async () => {
    await useProjectStore.getState().initialize();
    const state = useProjectStore.getState();
    
    expect(usePlaygroundStore.getState().activeTab).toBe('javascript');
    expect(state.projects.length).toBe(1);
    expect(state.projects[0].activeTab).toBe('javascript');
  });

  it('switches to React mode without modifying existing JavaScript project', async () => {
    await useProjectStore.getState().initialize();
    const jsProject = useProjectStore.getState().projects[0];

    // Switch to React mode
    await useProjectStore.getState().switchMode('react');

    const state = useProjectStore.getState();
    expect(usePlaygroundStore.getState().activeTab).toBe('react');
    
    // JS project should still exist and remain a JS project
    const originalJs = state.projects.find(p => p.id === jsProject.id);
    expect(originalJs?.activeTab).toBe('javascript');

    // A React project should now be created and active
    const activeReact = state.projects.find(p => p.id === state.activeProjectId);
    expect(activeReact?.activeTab).toBe('react');
  });

  it('switches repeatedly between modes retaining accurate active project per mode', async () => {
    await useProjectStore.getState().initialize();
    
    // Wait small tick to ensure timestamp progression
    await new Promise(r => setTimeout(r, 10));
    const jsProject = await useProjectStore.getState().createProject('JS App 1', undefined, 'javascript');

    await new Promise(r => setTimeout(r, 10));
    const reactProject = await useProjectStore.getState().createProject('React App 1', undefined, 'react');

    // Currently active: reactProject
    expect(usePlaygroundStore.getState().activeTab).toBe('react');
    expect(useProjectStore.getState().activeProjectId).toBe(reactProject.id);

    // Switch back to JavaScript mode -> should select jsProject
    await useProjectStore.getState().switchMode('javascript');
    expect(usePlaygroundStore.getState().activeTab).toBe('javascript');
    expect(useProjectStore.getState().activeProjectId).toBe(jsProject.id);

    // Switch back to React mode -> should select reactProject
    await useProjectStore.getState().switchMode('react');
    expect(usePlaygroundStore.getState().activeTab).toBe('react');
    expect(useProjectStore.getState().activeProjectId).toBe(reactProject.id);
  });

  it('creates project matching the active workspace mode', async () => {
    await useProjectStore.getState().initialize();
    
    // In JS mode
    const jsP = await useProjectStore.getState().createProject('My JS');
    expect(jsP.activeTab).toBe('javascript');
    expect(jsP.files?.some(f => f.path === 'index.js')).toBe(true);

    // Switch to React mode
    await useProjectStore.getState().switchMode('react');
    const reactP = await useProjectStore.getState().createProject('My React');
    expect(reactP.activeTab).toBe('react');
    expect(reactP.files?.some(f => f.path === 'src/App.jsx')).toBe(true);
  });

  it('handles project deletion and falls back to mode-matching project', async () => {
    await useProjectStore.getState().initialize();
    const js1 = await useProjectStore.getState().createProject('JS 1', undefined, 'javascript');
    
    await new Promise(r => setTimeout(r, 10));
    const js2 = await useProjectStore.getState().createProject('JS 2', undefined, 'javascript');

    expect(useProjectStore.getState().activeProjectId).toBe(js2.id);

    // Delete active JS project (js2)
    await useProjectStore.getState().deleteProject(js2.id);
    expect(useProjectStore.getState().activeProjectId).toBe(js1.id);
  });
});
