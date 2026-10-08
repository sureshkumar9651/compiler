export interface Project {
  id: string;
  name: string;
  language: 'javascript';
  code: string;
  createdAt: number;
  updatedAt: number;
}

export interface CreateProjectInput {
  name: string;
  code: string;
}

export interface UpdateProjectInput {
  name?: string;
  code?: string;
}

export interface ProjectRepository {
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | null>;
  createProject(input: CreateProjectInput): Promise<Project>;
  updateProject(id: string, input: UpdateProjectInput): Promise<Project>;
  deleteProject(id: string): Promise<void>;
}
