import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import { useProjectStore } from '../useProjectStore';

describe('useProjectStore', () => {
  beforeEach(async () => {
    localStorage.clear();
    const store = useProjectStore.getState();
    store.projects = [];
    store.activeProjectId = null;
  });

  it('should initialize and create a default project if none exist', async () => {
    await useProjectStore.getState().initialize();
    
    const state = useProjectStore.getState();
    expect(state.projects.length).toBeGreaterThan(0);
    expect(state.activeProjectId).not.toBeNull();
    expect(state.projects[0].name).toBe('Untitled JavaScript');
  });

  it('should create a new project and switch to it', async () => {
    await useProjectStore.getState().initialize();
    const newProject = await useProjectStore.getState().createProject('My Test', 'console.log()');
    
    const state = useProjectStore.getState();
    expect(state.activeProjectId).toBe(newProject.id);
    expect(state.projects.find(p => p.id === newProject.id)?.name).toBe('My Test');
  });

  it('should duplicate a project with a new ID', async () => {
    await useProjectStore.getState().initialize();
    const originalId = useProjectStore.getState().activeProjectId as string;
    
    await useProjectStore.getState().duplicateProject(originalId);
    
    const state = useProjectStore.getState();
    const currentId = state.activeProjectId;
    
    expect(currentId).not.toBe(originalId);
    const newProject = state.projects.find(p => p.id === currentId);
    expect(newProject?.name).toContain('Copy');
  });

  it('should rename a project', async () => {
    await useProjectStore.getState().initialize();
    const id = useProjectStore.getState().activeProjectId as string;
    
    await useProjectStore.getState().renameProject(id, 'Renamed!');
    
    const project = useProjectStore.getState().projects.find(p => p.id === id);
    expect(project?.name).toBe('Renamed!');
  });

  it('should delete a project and fallback if it was active', async () => {
    await useProjectStore.getState().initialize();
    const id1 = useProjectStore.getState().activeProjectId as string;
    
    await useProjectStore.getState().createProject('Second');
    const id2 = useProjectStore.getState().activeProjectId as string;
    
    expect(id1).not.toBe(id2);
    
    // Delete the active project (id2)
    await useProjectStore.getState().deleteProject(id2);
    
    const state = useProjectStore.getState();
    expect(state.projects.find(p => p.id === id2)).toBeUndefined();
    // Should fallback to id1
    expect(state.activeProjectId).toBe(id1);
  });
});
