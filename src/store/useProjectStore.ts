import { create } from 'zustand';
import { Project, ProjectFile } from '@/types/project';
import { projectRepository } from '@/lib/playground/persistence/IndexedDBProjectRepository';
import { usePlaygroundStore } from './usePlaygroundStore';
import {
  createDefaultJSFiles,
  createDefaultReactFiles,
  getFileLanguage,
  getParentPath,
  isValidFileName,
  isValidPath,
  normalizePath,
} from '@/utils/fileTree';

export type SaveStatus = 'saved' | 'saving' | 'unsaved' | 'error';

interface ProjectState {
  projects: Project[];
  activeProjectId: string | null;
  activeFilePath: string | null;
  openFiles: string[];
  expandedFolders: string[];
  isLoading: boolean;
  saveStatus: SaveStatus;
  fileOperationError: string | null;

  // Actions
  initialize: () => Promise<void>;
  selectProject: (id: string) => Promise<void>;
  switchMode: (mode: 'javascript' | 'react') => Promise<void>;
  createProject: (
    name?: string,
    initialCode?: string,
    projectType?: 'javascript' | 'react'
  ) => Promise<Project>;
  updateCode: (code: string) => void;
  updateReactCode: (reactCode: string) => void;
  updateActiveTab: (activeTab: 'javascript' | 'react') => void;
  renameProject: (id: string, newName: string) => Promise<void>;
  duplicateProject: (id: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  manualSave: () => Promise<void>;

  // File and Folder operations
  selectFile: (path: string) => void;
  openFile: (path: string) => void;
  closeFile: (path: string) => void;
  createFile: (parentPath: string | null, name: string, content?: string) => Promise<boolean>;
  createFolder: (parentPath: string | null, name: string) => Promise<boolean>;
  renameFileOrFolder: (oldPath: string, newName: string) => Promise<boolean>;
  deleteFileOrFolder: (path: string) => Promise<void>;
  duplicateFile: (path: string) => Promise<void>;
  toggleFolderExpand: (folderPath: string) => void;
  updateFileContent: (path: string, content: string) => void;
  clearFileOperationError: () => void;
}

const LAST_OPENED_KEY = 'jscodelab_last_opened_project';
let saveTimeout: NodeJS.Timeout | null = null;

function ensureParentDirectories(files: ProjectFile[], targetPath: string): ProjectFile[] {
  const normPath = normalizePath(targetPath);
  const parentPath = getParentPath(normPath);
  if (!parentPath) return files;

  const exists = files.some((f) => normalizePath(f.path) === parentPath);
  let updated = files;
  if (!exists) {
    // Recursively create higher parents
    updated = ensureParentDirectories(updated, parentPath);
    const parentName = parentPath.split('/').pop() || parentPath;
    updated = [
      ...updated,
      {
        id: crypto.randomUUID(),
        path: parentPath,
        name: parentName,
        type: 'directory',
        parentId: getParentPath(parentPath),
      },
    ];
  }
  return updated;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  activeProjectId: null,
  activeFilePath: null,
  openFiles: [],
  expandedFolders: ['src'],
  isLoading: true,
  saveStatus: 'saved',
  fileOperationError: null,

  clearFileOperationError: () => set({ fileOperationError: null }),

  initialize: async () => {
    try {
      let projects = await projectRepository.getProjects();
      let targetId = localStorage.getItem(LAST_OPENED_KEY);

      if (projects.length === 0) {
        // Create initial default project
        const project = await projectRepository.createProject({
          name: 'Untitled JavaScript',
          activeTab: 'javascript',
          code: `function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet("World");

console.log(message);`,
        });
        projects = [project];
        targetId = project.id;
      }

      if (!targetId || !projects.find((p) => p.id === targetId)) {
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

    if (activeProjectId === id && get().activeFilePath) return;

    if (activeProjectId && get().saveStatus === 'unsaved') {
      await manualSave();
    }

    const project = await projectRepository.getProject(id);
    if (!project) return;

    localStorage.setItem(LAST_OPENED_KEY, id);

    const isReact = project.activeTab === 'react' || project.language === 'react';
    const activeTab: 'javascript' | 'react' = isReact ? 'react' : 'javascript';

    // Clear execution state before switching code
    const pStore = usePlaygroundStore.getState();
    if (pStore.status === 'running') {
      pStore.setCurrentExecutionId(null);
      pStore.setStatus('idle');
    }
    pStore.clearConsole();
    pStore.setLastError(null);
    pStore.setActiveTab(activeTab);

    const files = project.files || (isReact ? createDefaultReactFiles() : createDefaultJSFiles());
    const defaultActivePath = isReact ? 'src/App.jsx' : 'index.js';
    const activeFilePath =
      project.activeFilePath && files.some((f) => f.path === project.activeFilePath && f.type === 'file')
        ? project.activeFilePath
        : files.find((f) => f.type === 'file')?.path || defaultActivePath;

    const openFiles =
      project.openFiles && project.openFiles.length > 0
        ? project.openFiles.filter((p) => files.some((f) => f.path === p && f.type === 'file'))
        : [activeFilePath];

    if (!openFiles.includes(activeFilePath) && activeFilePath) {
      openFiles.push(activeFilePath);
    }

    const activeFileObj = files.find((f) => f.path === activeFilePath);
    if (activeTab === 'javascript') {
      const indexFile = files.find((f) => f.path === 'index.js' || f.path === 'src/index.js');
      pStore.setCode(activeFileObj?.content ?? indexFile?.content ?? project.code);
    } else {
      const appFile = files.find((f) => f.path === 'src/App.jsx');
      pStore.setReactCode(activeFileObj?.content ?? appFile?.content ?? project.reactCode ?? '');
    }

    set({
      activeProjectId: id,
      activeFilePath,
      openFiles,
      expandedFolders: project.expandedFolders || (isReact ? ['src', 'public'] : []),
      saveStatus: 'saved',
    });
  },

  createProject: async (name?: string, initialCode?: string, projectType?: 'javascript' | 'react') => {
    const { manualSave, activeProjectId } = get();

    if (activeProjectId && get().saveStatus === 'unsaved') {
      await manualSave();
    }

    const currentTab = usePlaygroundStore.getState().activeTab;
    const targetType = projectType || currentTab;
    const isReact = targetType === 'react';

    const defaultName = isReact ? 'Untitled React JS' : 'Untitled JavaScript';
    const resolvedName = name || defaultName;

    let finalName = resolvedName;
    if (resolvedName === defaultName) {
      const projects = get().projects;
      let count = 1;
      while (projects.some((p) => p.name === finalName)) {
        count++;
        finalName = `${defaultName} ${count}`;
      }
    }

    const defaultFiles = isReact
      ? createDefaultReactFiles(initialCode)
      : createDefaultJSFiles(initialCode);

    const project = await projectRepository.createProject({
      name: finalName,
      code: isReact ? '' : (initialCode || 'console.log("Hello World!");'),
      reactCode: isReact ? (initialCode || defaultFiles.find((f) => f.path === 'src/App.jsx')?.content) : '',
      activeTab: isReact ? 'react' : 'javascript',
      files: defaultFiles,
      activeFilePath: isReact ? 'src/App.jsx' : 'index.js',
      openFiles: [isReact ? 'src/App.jsx' : 'index.js'],
      expandedFolders: isReact ? ['src', 'public'] : [],
    });

    const projects = await projectRepository.getProjects();

    set({ projects });
    await get().selectProject(project.id);
    return project;
  },

  updateCode: (code: string) => {
    const { activeProjectId, activeFilePath } = get();
    if (!activeProjectId) return;

    if (activeFilePath) {
      get().updateFileContent(activeFilePath, code);
    }
  },

  updateReactCode: (reactCode: string) => {
    const { activeProjectId, activeFilePath } = get();
    if (!activeProjectId) return;

    if (activeFilePath) {
      get().updateFileContent(activeFilePath, reactCode);
    }
  },

  switchMode: async (mode: 'javascript' | 'react') => {
    const pStore = usePlaygroundStore.getState();
    pStore.setActiveTab(mode);

    const { projects, activeProjectId, selectProject, createProject } = get();
    const currentProject = projects.find((p) => p.id === activeProjectId);

    const isCurrentReact = currentProject
      ? currentProject.activeTab === 'react' || currentProject.language === 'react'
      : false;
    const currentMode = isCurrentReact ? 'react' : 'javascript';

    if (currentProject && currentMode === mode) {
      return;
    }

    const candidateProjects = projects.filter((p) => {
      const isReact = p.activeTab === 'react' || p.language === 'react';
      return mode === 'react' ? isReact : !isReact;
    });

    if (candidateProjects.length > 0) {
      const sorted = [...candidateProjects].sort((a, b) => b.updatedAt - a.updatedAt);
      await selectProject(sorted[0].id);
    } else {
      await createProject(undefined, undefined, mode);
    }
  },

  updateActiveTab: (activeTab: 'javascript' | 'react') => {
    get().switchMode(activeTab);
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

    if (get().activeProjectId === id && get().saveStatus === 'unsaved') {
      await get().manualSave();
    }

    const freshProject = (await projectRepository.getProject(id)) || project;
    const isReact = freshProject.activeTab === 'react' || freshProject.language === 'react';

    await get().createProject(`${freshProject.name} Copy`, undefined, isReact ? 'react' : 'javascript');
    
    // Copy exact files structure
    const newActiveId = get().activeProjectId;
    if (newActiveId) {
      await projectRepository.updateProject(newActiveId, {
        files: freshProject.files,
        activeFilePath: freshProject.activeFilePath,
        openFiles: freshProject.openFiles,
        expandedFolders: freshProject.expandedFolders,
      });
      await get().selectProject(newActiveId);
    }
  },

  deleteProject: async (id: string) => {
    try {
      await projectRepository.deleteProject(id);
      const projects = await projectRepository.getProjects();
      set({ projects });

      if (get().activeProjectId === id) {
        const activeTab = usePlaygroundStore.getState().activeTab;
        const matching = projects.filter((p) => {
          const isReact = p.activeTab === 'react' || p.language === 'react';
          return activeTab === 'react' ? isReact : !isReact;
        });

        if (matching.length > 0) {
          await get().selectProject(matching[0].id);
        } else if (projects.length > 0) {
          const firstIsReact = projects[0].activeTab === 'react' || projects[0].language === 'react';
          await get().switchMode(firstIsReact ? 'react' : 'javascript');
        } else {
          await get().createProject(undefined, undefined, activeTab);
        }
      }
    } catch (e) {
      console.error('Failed to delete project', e);
    }
  },

  manualSave: async () => {
    const { activeProjectId, activeFilePath, openFiles, expandedFolders } = get();
    if (!activeProjectId) return;

    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = null;

    set({ saveStatus: 'saving' });
    try {
      const activeProject = get().projects.find((p) => p.id === activeProjectId);
      if (activeProject) {
        await projectRepository.updateProject(activeProjectId, {
          files: activeProject.files,
          code: activeProject.code,
          reactCode: activeProject.reactCode,
          activeTab: activeProject.activeTab,
          activeFilePath: activeFilePath || undefined,
          openFiles,
          expandedFolders,
        });
      }
      const projects = await projectRepository.getProjects();
      set({ projects, saveStatus: 'saved' });
    } catch (e) {
      console.error('Manual save failed', e);
      set({ saveStatus: 'error' });
    }
  },

  selectFile: (path: string) => {
    const { projects, activeProjectId, openFiles } = get();
    const activeProject = projects.find((p) => p.id === activeProjectId);
    if (!activeProject || !activeProject.files) return;

    const normPath = normalizePath(path);
    const targetFile = activeProject.files.find((f) => normalizePath(f.path) === normPath);
    if (!targetFile || targetFile.type !== 'file') return;

    const newOpenFiles = openFiles.includes(normPath) ? openFiles : [...openFiles, normPath];

    // Sync content to usePlaygroundStore for editor view
    const pStore = usePlaygroundStore.getState();
    if (activeProject.activeTab === 'javascript') {
      pStore.setCode(targetFile.content || '');
    } else {
      pStore.setReactCode(targetFile.content || '');
    }

    set({
      activeFilePath: normPath,
      openFiles: newOpenFiles,
    });
  },

  openFile: (path: string) => {
    get().selectFile(path);
  },

  closeFile: (pathToClose: string) => {
    const { openFiles, activeFilePath, selectFile } = get();
    const normPath = normalizePath(pathToClose);
    const filtered = openFiles.filter((p) => normalizePath(p) !== normPath);

    let nextActive = activeFilePath;
    if (activeFilePath && normalizePath(activeFilePath) === normPath) {
      if (filtered.length > 0) {
        const closedIndex = openFiles.findIndex((p) => normalizePath(p) === normPath);
        nextActive = filtered[Math.max(0, closedIndex - 1)];
      } else {
        nextActive = null;
      }
    }

    set({ openFiles: filtered, activeFilePath: nextActive });

    if (nextActive) {
      selectFile(nextActive);
    }
  },

  createFile: async (parentPath: string | null, name: string, content = ''): Promise<boolean> => {
    const { projects, activeProjectId } = get();
    const activeProject = projects.find((p) => p.id === activeProjectId);
    if (!activeProject) return false;

    const trimmedName = name.trim();
    if (!isValidFileName(trimmedName)) {
      set({ fileOperationError: 'Invalid file name. Avoid characters like / \\ : * ? " < > |' });
      return false;
    }

    const parentNorm = parentPath ? normalizePath(parentPath) : null;
    const targetPath = parentNorm ? `${parentNorm}/${trimmedName}` : trimmedName;

    if (!isValidPath(targetPath)) {
      set({ fileOperationError: 'Invalid path. Traversal path segments are forbidden.' });
      return false;
    }

    const files = activeProject.files || [];
    if (files.some((f) => normalizePath(f.path).toLowerCase() === targetPath.toLowerCase())) {
      set({ fileOperationError: `A file or folder named "${trimmedName}" already exists.` });
      return false;
    }

    let updatedFiles = ensureParentDirectories(files, targetPath);
    const newFile: ProjectFile = {
      id: crypto.randomUUID(),
      path: targetPath,
      name: trimmedName,
      type: 'file',
      content,
      parentId: parentNorm,
      updatedAt: Date.now(),
    };
    updatedFiles = [...updatedFiles, newFile];

    const updatedProjects = projects.map((p) =>
      p.id === activeProjectId ? { ...p, files: updatedFiles, updatedAt: Date.now() } : p
    );

    set({ projects: updatedProjects, fileOperationError: null });
    get().selectFile(targetPath);
    await get().manualSave();
    return true;
  },

  createFolder: async (parentPath: string | null, name: string): Promise<boolean> => {
    const { projects, activeProjectId, expandedFolders } = get();
    const activeProject = projects.find((p) => p.id === activeProjectId);
    if (!activeProject) return false;

    const trimmedName = name.trim();
    if (!isValidFileName(trimmedName)) {
      set({ fileOperationError: 'Invalid folder name. Avoid characters like / \\ : * ? " < > |' });
      return false;
    }

    const parentNorm = parentPath ? normalizePath(parentPath) : null;
    const targetPath = parentNorm ? `${parentNorm}/${trimmedName}` : trimmedName;

    if (!isValidPath(targetPath)) {
      set({ fileOperationError: 'Invalid folder path.' });
      return false;
    }

    const files = activeProject.files || [];
    if (files.some((f) => normalizePath(f.path).toLowerCase() === targetPath.toLowerCase())) {
      set({ fileOperationError: `A file or folder named "${trimmedName}" already exists.` });
      return false;
    }

    let updatedFiles = ensureParentDirectories(files, targetPath);
    const newFolder: ProjectFile = {
      id: crypto.randomUUID(),
      path: targetPath,
      name: trimmedName,
      type: 'directory',
      parentId: parentNorm,
      updatedAt: Date.now(),
    };
    updatedFiles = [...updatedFiles, newFolder];

    const updatedProjects = projects.map((p) =>
      p.id === activeProjectId ? { ...p, files: updatedFiles, updatedAt: Date.now() } : p
    );

    const newExpanded = expandedFolders.includes(targetPath)
      ? expandedFolders
      : [...expandedFolders, targetPath];

    set({ projects: updatedProjects, expandedFolders: newExpanded, fileOperationError: null });
    await get().manualSave();
    return true;
  },

  renameFileOrFolder: async (oldPath: string, newName: string): Promise<boolean> => {
    const { projects, activeProjectId, activeFilePath, openFiles, expandedFolders } = get();
    const activeProject = projects.find((p) => p.id === activeProjectId);
    if (!activeProject || !activeProject.files) return false;

    const trimmedName = newName.trim();
    if (!isValidFileName(trimmedName)) {
      set({ fileOperationError: 'Invalid name provided.' });
      return false;
    }

    const oldNorm = normalizePath(oldPath);
    const parentPath = getParentPath(oldNorm);
    const newPath = parentPath ? `${parentPath}/${trimmedName}` : trimmedName;

    if (oldNorm === newPath) return true;

    if (!isValidPath(newPath)) {
      set({ fileOperationError: 'Invalid target path.' });
      return false;
    }

    if (activeProject.files.some((f) => normalizePath(f.path).toLowerCase() === newPath.toLowerCase())) {
      set({ fileOperationError: `An item named "${trimmedName}" already exists.` });
      return false;
    }

    const prefixMatch = oldNorm + '/';
    const updatedFiles = activeProject.files.map((f) => {
      const normFPath = normalizePath(f.path);
      if (normFPath === oldNorm) {
        return {
          ...f,
          path: newPath,
          name: trimmedName,
          parentId: parentPath,
          updatedAt: Date.now(),
        };
      }
      if (normFPath.startsWith(prefixMatch)) {
        const subPath = normFPath.slice(prefixMatch.length);
        const updatedPath = `${newPath}/${subPath}`;
        return {
          ...f,
          path: updatedPath,
          parentId: getParentPath(updatedPath),
          updatedAt: Date.now(),
        };
      }
      return f;
    });

    const updatedOpenFiles = openFiles.map((p) => {
      const normP = normalizePath(p);
      if (normP === oldNorm) return newPath;
      if (normP.startsWith(prefixMatch)) return `${newPath}/${normP.slice(prefixMatch.length)}`;
      return p;
    });

    let updatedActivePath = activeFilePath;
    if (activeFilePath) {
      const normActive = normalizePath(activeFilePath);
      if (normActive === oldNorm) {
        updatedActivePath = newPath;
      } else if (normActive.startsWith(prefixMatch)) {
        updatedActivePath = `${newPath}/${normActive.slice(prefixMatch.length)}`;
      }
    }

    const updatedExpanded = expandedFolders.map((p) => {
      const normP = normalizePath(p);
      if (normP === oldNorm) return newPath;
      if (normP.startsWith(prefixMatch)) return `${newPath}/${normP.slice(prefixMatch.length)}`;
      return p;
    });

    const updatedProjects = projects.map((p) =>
      p.id === activeProjectId ? { ...p, files: updatedFiles, updatedAt: Date.now() } : p
    );

    set({
      projects: updatedProjects,
      openFiles: updatedOpenFiles,
      activeFilePath: updatedActivePath,
      expandedFolders: updatedExpanded,
      fileOperationError: null,
    });

    await get().manualSave();
    return true;
  },

  deleteFileOrFolder: async (targetPath: string): Promise<void> => {
    const { projects, activeProjectId, activeFilePath, openFiles, expandedFolders, selectFile } =
      get();
    const activeProject = projects.find((p) => p.id === activeProjectId);
    if (!activeProject || !activeProject.files) return;

    const normPath = normalizePath(targetPath);
    const prefixMatch = normPath + '/';

    const updatedFiles = activeProject.files.filter((f) => {
      const normFPath = normalizePath(f.path);
      return normFPath !== normPath && !normFPath.startsWith(prefixMatch);
    });

    const updatedOpenFiles = openFiles.filter((p) => {
      const normP = normalizePath(p);
      return normP !== normPath && !normP.startsWith(prefixMatch);
    });

    const updatedExpanded = expandedFolders.filter((p) => {
      const normP = normalizePath(p);
      return normP !== normPath && !normP.startsWith(prefixMatch);
    });

    let newActivePath = activeFilePath;
    const wasActiveDeleted =
      activeFilePath &&
      (normalizePath(activeFilePath) === normPath ||
        normalizePath(activeFilePath).startsWith(prefixMatch));

    if (wasActiveDeleted) {
      if (updatedOpenFiles.length > 0) {
        newActivePath = updatedOpenFiles[0];
      } else {
        const remainingFile = updatedFiles.find((f) => f.type === 'file');
        newActivePath = remainingFile ? remainingFile.path : null;
      }
    }

    const updatedProjects = projects.map((p) =>
      p.id === activeProjectId ? { ...p, files: updatedFiles, updatedAt: Date.now() } : p
    );

    set({
      projects: updatedProjects,
      openFiles: updatedOpenFiles,
      activeFilePath: newActivePath,
      expandedFolders: updatedExpanded,
      fileOperationError: null,
    });

    if (newActivePath) {
      selectFile(newActivePath);
    }

    await get().manualSave();
  },

  duplicateFile: async (filePath: string): Promise<void> => {
    const { projects, activeProjectId } = get();
    const activeProject = projects.find((p) => p.id === activeProjectId);
    if (!activeProject || !activeProject.files) return;

    const normPath = normalizePath(filePath);
    const fileToDup = activeProject.files.find((f) => normalizePath(f.path) === normPath);
    if (!fileToDup || fileToDup.type !== 'file') return;

    const parentPath = getParentPath(normPath);
    const lastDot = fileToDup.name.lastIndexOf('.');
    const baseName = lastDot > 0 ? fileToDup.name.slice(0, lastDot) : fileToDup.name;
    const ext = lastDot > 0 ? fileToDup.name.slice(lastDot) : '';

    let dupCount = 1;
    let newFileName = `${baseName} Copy${ext}`;
    let newPath = parentPath ? `${parentPath}/${newFileName}` : newFileName;

    while (activeProject.files.some((f) => normalizePath(f.path) === newPath)) {
      dupCount++;
      newFileName = `${baseName} Copy ${dupCount}${ext}`;
      newPath = parentPath ? `${parentPath}/${newFileName}` : newFileName;
    }

    await get().createFile(parentPath, newFileName, fileToDup.content || '');
  },

  toggleFolderExpand: (folderPath: string) => {
    const { expandedFolders } = get();
    const normPath = normalizePath(folderPath);

    const isExpanded = expandedFolders.includes(normPath);
    const newExpanded = isExpanded
      ? expandedFolders.filter((p) => p !== normPath)
      : [...expandedFolders, normPath];

    set({ expandedFolders: newExpanded });
  },

  updateFileContent: (filePath: string, content: string) => {
    const { projects, activeProjectId } = get();
    if (!activeProjectId) return;

    const normPath = normalizePath(filePath);

    set({ saveStatus: 'unsaved' });

    const updatedProjects = projects.map((p) => {
      if (p.id !== activeProjectId) return p;
      const files = p.files || [];
      const updatedFiles = files.map((f) => {
        if (normalizePath(f.path) === normPath) {
          return { ...f, content, updatedAt: Date.now() };
        }
        return f;
      });

      let mainCode = p.code;
      let mainReactCode = p.reactCode;

      if (normPath === 'index.js' || normPath === 'src/index.js') {
        mainCode = content;
      }
      if (normPath === 'src/App.jsx' || normPath === 'src/main.jsx') {
        mainReactCode = content;
      }

      return {
        ...p,
        files: updatedFiles,
        code: mainCode,
        reactCode: mainReactCode,
        updatedAt: Date.now(),
      };
    });

    set({ projects: updatedProjects });

    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(async () => {
      const currentId = get().activeProjectId;
      if (currentId !== activeProjectId) return;

      set({ saveStatus: 'saving' });
      try {
        const currentProject = get().projects.find((p) => p.id === activeProjectId);
        if (currentProject) {
          await projectRepository.updateProject(activeProjectId, {
            files: currentProject.files,
            code: currentProject.code,
            reactCode: currentProject.reactCode,
            activeTab: currentProject.activeTab,
            activeFilePath: get().activeFilePath || undefined,
            openFiles: get().openFiles,
            expandedFolders: get().expandedFolders,
          });
        }
        const refreshed = await projectRepository.getProjects();
        set({ projects: refreshed, saveStatus: 'saved' });
      } catch (e) {
        console.error('Auto-save failed', e);
        set({ saveStatus: 'error' });
      }
    }, 1000);
  },
}));
