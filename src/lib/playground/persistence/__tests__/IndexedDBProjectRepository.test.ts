import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import { IndexedDBProjectRepository } from '../IndexedDBProjectRepository';


describe('IndexedDBProjectRepository', () => {
  let repository: IndexedDBProjectRepository;

  beforeEach(() => {
    // Re-initialize for a clean db connection in tests if needed, 
    // but idb memory is kept across tests. We can just instantiate a new repo.
    repository = new IndexedDBProjectRepository();
  });

  it('should create and retrieve a project', async () => {
    const project = await repository.createProject({ name: 'Test 1', code: 'console.log(1)' });
    expect(project.id).toBeDefined();
    expect(project.name).toBe('Test 1');
    expect(project.code).toBe('console.log(1)');

    const fetched = await repository.getProject(project.id);
    expect(fetched).toEqual(project);
  });

  it('should list projects sorted by updatedAt descending', async () => {
    const p1 = await repository.createProject({ name: 'First', code: '' });
    // artificial delay to ensure different timestamps
    await new Promise(r => setTimeout(r, 10));
    const p2 = await repository.createProject({ name: 'Second', code: '' });
    
    const projects = await repository.getProjects();
    // The most recently created (p2) should be first
    const p2Index = projects.findIndex(p => p.id === p2.id);
    const p1Index = projects.findIndex(p => p.id === p1.id);
    expect(p2Index).toBeLessThan(p1Index);
  });

  it('should update a project and its timestamp', async () => {
    const project = await repository.createProject({ name: 'Old Name', code: 'old' });
    const originalTime = project.updatedAt;
    
    await new Promise(r => setTimeout(r, 10));
    
    const updated = await repository.updateProject(project.id, { name: 'New Name' });
    expect(updated.name).toBe('New Name');
    expect(updated.code).toBe('old');
    expect(updated.updatedAt).toBeGreaterThan(originalTime);
  });

  it('should delete a project', async () => {
    const project = await repository.createProject({ name: 'To Delete', code: '' });
    let fetched = await repository.getProject(project.id);
    expect(fetched).not.toBeNull();
    
    await repository.deleteProject(project.id);
    fetched = await repository.getProject(project.id);
    expect(fetched).toBeNull();
  });
});
