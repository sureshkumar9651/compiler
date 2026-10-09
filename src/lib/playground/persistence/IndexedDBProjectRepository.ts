import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Project, ProjectRepository, CreateProjectInput, UpdateProjectInput } from '@/types/project';
import { createDefaultJSFiles, createDefaultReactFiles } from '@/utils/fileTree';

interface JSCodeLabDB extends DBSchema {
  projects: {
    key: string;
    value: Project;
    indexes: { 'updatedAt': number };
  };
}

const DB_NAME = 'js-codelab';
const DB_VERSION = 1;

export function migrateProject(project: Project): Project {
  if (!project.files || project.files.length === 0) {
    const isReact = project.activeTab === 'react' || project.language === 'react' || Boolean(project.reactCode && project.reactCode.trim());
    if (isReact) {
      project.language = 'react';
      project.activeTab = 'react';
      project.files = createDefaultReactFiles(project.reactCode);
      project.activeFilePath = 'src/App.jsx';
      project.openFiles = ['src/App.jsx'];
      project.expandedFolders = ['src', 'public'];
    } else {
      project.language = 'javascript';
      project.activeTab = 'javascript';
      project.files = createDefaultJSFiles(project.code);
      project.activeFilePath = 'index.js';
      project.openFiles = ['index.js'];
      project.expandedFolders = [];
    }
  } else {
    if (!project.language) {
      project.language = project.activeTab === 'react' ? 'react' : 'javascript';
    }
    if (!project.activeFilePath) {
      const firstFile = project.files.find(f => f.type === 'file');
      project.activeFilePath = firstFile ? firstFile.path : 'index.js';
    }
    if (!project.openFiles || project.openFiles.length === 0) {
      project.openFiles = project.activeFilePath ? [project.activeFilePath] : [];
    }
    if (!project.expandedFolders) {
      project.expandedFolders = project.language === 'react' ? ['src'] : [];
    }
  }
  return project;
}

export class IndexedDBProjectRepository implements ProjectRepository {
  private dbPromise: Promise<IDBPDatabase<JSCodeLabDB>>;

  constructor() {
    this.dbPromise = typeof window !== 'undefined' 
      ? openDB<JSCodeLabDB>(DB_NAME, DB_VERSION, {
          upgrade(db) {
            if (!db.objectStoreNames.contains('projects')) {
              const store = db.createObjectStore('projects', { keyPath: 'id' });
              store.createIndex('updatedAt', 'updatedAt');
            }
          },
        })
      : Promise.resolve(null as unknown as IDBPDatabase<JSCodeLabDB>);
  }

  async getProjects(): Promise<Project[]> {
    const db = await this.dbPromise;
    if (!db) return [];
    
    const tx = db.transaction('projects', 'readonly');
    const store = tx.objectStore('projects');
    const index = store.index('updatedAt');
    const projects: Project[] = [];
    
    let cursor = await index.openCursor(null, 'prev');
    while (cursor) {
      projects.push(migrateProject({ ...cursor.value }));
      cursor = await cursor.continue();
    }
    
    return projects;
  }

  async getProject(id: string): Promise<Project | null> {
    const db = await this.dbPromise;
    if (!db) return null;
    const project = await db.get('projects', id);
    if (!project) return null;
    return migrateProject({ ...project });
  }

  async createProject(input: CreateProjectInput): Promise<Project> {
    const db = await this.dbPromise;
    if (!db) throw new Error('Database not initialized');

    const now = Date.now();
    const isReact = input.activeTab ? input.activeTab === 'react' : Boolean(input.reactCode && input.reactCode.trim());
    const defaultFiles = isReact 
      ? createDefaultReactFiles(input.reactCode) 
      : createDefaultJSFiles(input.code);

    const project: Project = {
      id: crypto.randomUUID(),
      name: input.name,
      language: isReact ? 'react' : 'javascript',
      code: input.code || (isReact ? '' : 'console.log("Hello World!");'),
      reactCode: input.reactCode,
      activeTab: isReact ? 'react' : 'javascript',
      files: input.files || defaultFiles,
      activeFilePath: input.activeFilePath || (isReact ? 'src/App.jsx' : 'index.js'),
      openFiles: input.openFiles || [input.activeFilePath || (isReact ? 'src/App.jsx' : 'index.js')],
      expandedFolders: input.expandedFolders || (isReact ? ['src'] : []),
      createdAt: now,
      updatedAt: now,
    };

    const migrated = migrateProject(project);
    await db.add('projects', migrated);
    return migrated;
  }

  async updateProject(id: string, input: UpdateProjectInput): Promise<Project> {
    const db = await this.dbPromise;
    if (!db) throw new Error('Database not initialized');

    const tx = db.transaction('projects', 'readwrite');
    const store = tx.objectStore('projects');
    
    const existing = await store.get(id);
    if (!existing) {
      throw new Error(`Project ${id} not found`);
    }

    const updatedProject: Project = migrateProject({
      ...existing,
      ...input,
      updatedAt: Date.now()
    });

    await store.put(updatedProject);
    await tx.done;
    
    return updatedProject;
  }

  async deleteProject(id: string): Promise<void> {
    const db = await this.dbPromise;
    if (!db) return;
    await db.delete('projects', id);
  }
}

export const projectRepository = new IndexedDBProjectRepository();

