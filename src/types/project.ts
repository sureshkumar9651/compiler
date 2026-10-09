export interface ProjectFile {
  id: string;
  path: string; // e.g., "src/index.js", "src/App.jsx", "README.md"
  name: string; // e.g., "index.js", "App.jsx"
  type: 'file' | 'directory';
  content?: string;
  parentId?: string | null;
  updatedAt?: number;
}

export interface Project {
  id: string;
  name: string;
  language: 'javascript' | 'react';
  code: string;
  reactCode?: string;
  activeTab?: 'javascript' | 'react';
  files?: ProjectFile[];
  activeFilePath?: string;
  openFiles?: string[];
  expandedFolders?: string[];
  createdAt: number;
  updatedAt: number;
}

export interface CreateProjectInput {
  name: string;
  code?: string;
  reactCode?: string;
  activeTab?: 'javascript' | 'react';
  files?: ProjectFile[];
  activeFilePath?: string;
  openFiles?: string[];
  expandedFolders?: string[];
}

export interface UpdateProjectInput {
  name?: string;
  code?: string;
  reactCode?: string;
  activeTab?: 'javascript' | 'react';
  files?: ProjectFile[];
  activeFilePath?: string;
  openFiles?: string[];
  expandedFolders?: string[];
}

export interface ProjectRepository {
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | null>;
  createProject(input: CreateProjectInput): Promise<Project>;
  updateProject(id: string, input: UpdateProjectInput): Promise<Project>;
  deleteProject(id: string): Promise<void>;
}
