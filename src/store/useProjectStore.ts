import { create } from 'zustand';
import { Project } from '@/types/project';
import { projectRepository } from '@/lib/playground/persistence/IndexedDBProjectRepository';
import { usePlaygroundStore } from './usePlaygroundStore';

export type SaveStatus = 'saved' | 'saving' | 'unsaved' | 'error';

interface ProjectState {
  projects: Project[];
  activeProjectId: string | null;
  isLoading: boolean;
  saveStatus: SaveStatus;
  
  // Actions
  initialize: () => Promise<void>;
  selectProject: (id: string) => Promise<void>;
  createProject: (name?: string, initialCode?: string) => Promise<Project>;
  updateCode: (code: string) => void;
  renameProject: (id: string, newName: string) => Promise<void>;
  duplicateProject: (id: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  manualSave: () => Promise<void>;
}

const LAST_OPENED_KEY = 'jscodelab_last_opened_project';
const DEFAULT_CODE = `function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet("World");

console.log(message);`;

const NEW_PROJECT_CODE = `console.log("Hello World!");`;

let saveTimeout: NodeJS.Timeout | null = null;

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  activeProjectId: null,
  isLoading: true,
  saveStatus: 'saved',

  initialize: async () => {
    try {
      const projects = await projectRepository.getProjects();
      let targetId = localStorage.getItem(LAST_OPENED_KEY);
      
      if (projects.length === 0) {
        // First launch ever, create default project
        const project = await projectRepository.createProject({
          name: 'Untitled JavaScript',
          code: DEFAULT_CODE
        });
        projects.push(project);
        targetId = project.id;
      }

      // Check if targetId exists in projects
      if (!targetId || !projects.find(p => p.id === targetId)) {
        targetId = projects[0].id;
      }

      set({ projects, isLoading: false });
      
      if (targetId) {
        await get().selectProject(targetId);
      }
    } catch (e) {
      console.error('Failed to initialize projects', e);
      set({ isLoading: false });
    }
  },

  selectProject: async (id: string) => {
    const { activeProjectId, manualSave } = get();
    
    if (activeProjectId === id) return;

    // Flush any pending saves before switching
    if (activeProjectId && get().saveStatus === 'unsaved') {
      await manualSave();
    }

    const project = await projectRepository.getProject(id);
    if (!project) return;

    localStorage.setItem(LAST_OPENED_KEY, id);
    
    // Clear execution state before switching code
    const pStore = usePlaygroundStore.getState();
    if (pStore.status === 'running') {
      // Need a way to stop execution safely. This might require firing a stop via the hook,
      // but store can't access hooks. We can reset the currentExecutionId to prevent leak.
      pStore.setCurrentExecutionId(null);
      pStore.setStatus('idle');
    }
    pStore.clearConsole();
    pStore.setLastError(null);
    pStore.setCode(project.code);

    set({ activeProjectId: id, saveStatus: 'saved' });
  },

  createProject: async (name = 'Untitled JavaScript', initialCode = NEW_PROJECT_CODE) => {
    const { manualSave, activeProjectId } = get();
    
    if (activeProjectId && get().saveStatus === 'unsaved') {
      await manualSave();
    }

    // Attempt to make unique name if 'Untitled JavaScript' exists
    let finalName = name;
    if (name === 'Untitled JavaScript') {
      const projects = get().projects;
      let count = 1;
      while (projects.some(p => p.name === finalName)) {
        count++;
        finalName = `Untitled JavaScript ${count}`;
      }
    }

    const project = await projectRepository.createProject({ name: finalName, code: initialCode });
    const projects = await projectRepository.getProjects();
    
    set({ projects });
    await get().selectProject(project.id);
    return project;
  },

  updateCode: (code: string) => {
    const { activeProjectId } = get();
    if (!activeProjectId) return;

    set({ saveStatus: 'unsaved' });
    
    if (saveTimeout) clearTimeout(saveTimeout);
    
    saveTimeout = setTimeout(async () => {
      // Avoid saving if project switched during debounce
      const currentId = get().activeProjectId;
      if (currentId !== activeProjectId) return;
      
      set({ saveStatus: 'saving' });
      try {
        await projectRepository.updateProject(activeProjectId, { code });
        const projects = await projectRepository.getProjects();
        set({ projects, saveStatus: 'saved' });
      } catch (e) {
        console.error('Auto-save failed', e);
        set({ saveStatus: 'error' });
      }
    }, 1000);
  },

  manualSave: async () => {
    const { activeProjectId } = get();
    if (!activeProjectId) return;

    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = null;

    set({ saveStatus: 'saving' });
    try {
      const code = usePlaygroundStore.getState().code;
      await projectRepository.updateProject(activeProjectId, { code });
      const projects = await projectRepository.getProjects();
      set({ projects, saveStatus: 'saved' });
    } catch (e) {
      console.error('Manual save failed', e);
      set({ saveStatus: 'error' });
    }
  },

  renameProject: async (id: string, newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    
    try {
      await projectRepository.updateProject(id, { name: trimmed });
      const projects = await projectRepository.getProjects();
      set({ projects });
    } catch (e) {
      console.error('Failed to rename project', e);
    }
  },

  duplicateProject: async (id: string) => {
    const project = await projectRepository.getProject(id);
    if (!project) return;
    
    // Force save active if it's the duplicated one
    if (get().activeProjectId === id && get().saveStatus === 'unsaved') {
      await get().manualSave();
    }
    
    // Refetch the freshest code for duplication if active project was just saved
    const freshProject = await projectRepository.getProject(id) || project;

    await get().createProject(`${freshProject.name} Copy`, freshProject.code);
  },

  deleteProject: async (id: string) => {
    try {
      await projectRepository.deleteProject(id);
      const projects = await projectRepository.getProjects();
      set({ projects });

      if (get().activeProjectId === id) {
        if (projects.length > 0) {
          await get().selectProject(projects[0].id);
        } else {
          // If no projects remain, create a new default one
          await get().createProject();
        }
      }
    } catch (e) {
      console.error('Failed to delete project', e);
    }
  }
}));
