import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Project, ProjectRepository, CreateProjectInput, UpdateProjectInput } from '@/types/project';

interface JSCodeLabDB extends DBSchema {
  projects: {
    key: string;
    value: Project;
    indexes: { 'updatedAt': number };
  };
}

const DB_NAME = 'js-codelab';
const DB_VERSION = 1;

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
      : Promise.resolve(null as unknown as IDBPDatabase<JSCodeLabDB>); // Handle SSR gracefully
  }

  async getProjects(): Promise<Project[]> {
    const db = await this.dbPromise;
    if (!db) return [];
    
    // Sort by updatedAt descending
    const tx = db.transaction('projects', 'readonly');
    const store = tx.objectStore('projects');
    const index = store.index('updatedAt');
    const projects = [];
    
    // Iterate cursor backwards for descending order
    let cursor = await index.openCursor(null, 'prev');
    while (cursor) {
      projects.push(cursor.value);
      cursor = await cursor.continue();
    }
    
    return projects;
  }

  async getProject(id: string): Promise<Project | null> {
    const db = await this.dbPromise;
    if (!db) return null;
    return (await db.get('projects', id)) || null;
  }

  async createProject(input: CreateProjectInput): Promise<Project> {
    const db = await this.dbPromise;
    if (!db) throw new Error('Database not initialized');

    const now = Date.now();
    const project: Project = {
      id: crypto.randomUUID(),
      name: input.name,
      language: 'javascript',
      code: input.code,
      createdAt: now,
      updatedAt: now,
    };

    await db.add('projects', project);
    return project;
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

    const updatedProject: Project = {
      ...existing,
      ...input,
      updatedAt: Date.now()
    };

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

// Singleton instance for the application
export const projectRepository = new IndexedDBProjectRepository();
