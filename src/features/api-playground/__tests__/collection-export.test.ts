import { describe, it, expect } from 'vitest';
import { exportCollection, importCollectionJson } from '../services/collection-export';
import type { ApiCollection, SavedRequest } from '@/types/api-playground';

const collection: ApiCollection = {
  id: 'col-1',
  name: 'Test Collection',
  createdAt: 1000,
  updatedAt: 2000,
};

const savedRequest: SavedRequest = {
  id: 'req-1',
  collectionId: 'col-1',
  name: 'Get Posts',
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/posts',
  params: [{ id: 'p1', key: 'limit', value: '5', enabled: true }],
  headers: [],
  authType: 'bearer',
  bearerToken: 'super-secret-token',
  basicUsername: 'admin',
  basicPassword: 'password123',
  bodyType: 'none',
  bodyJson: '',
  bodyFormPairs: [],
  createdAt: 1000,
  updatedAt: 2000,
};

describe('exportCollection', () => {
  it('produces valid JSON', () => {
    const json = exportCollection(collection, [savedRequest]);
    expect(() => JSON.parse(json)).not.toThrow();
  });

  it('includes version 1 marker', () => {
    const data = JSON.parse(exportCollection(collection, [savedRequest]));
    expect(data.version).toBe(1);
  });

  it('redacts bearerToken and basicPassword by default', () => {
    const json = exportCollection(collection, [savedRequest], false);
    const data = JSON.parse(json);
    expect(data.requests[0].bearerToken).toBeUndefined();
    expect(data.requests[0].basicPassword).toBeUndefined();
  });

  it('includes secrets when includeSecrets=true', () => {
    const json = exportCollection(collection, [savedRequest], true);
    const data = JSON.parse(json);
    expect(data.requests[0].bearerToken).toBe('super-secret-token');
    expect(data.requests[0].basicPassword).toBe('password123');
  });

  it('preserves non-secret fields', () => {
    const data = JSON.parse(exportCollection(collection, [savedRequest]));
    const req = data.requests[0];
    expect(req.name).toBe('Get Posts');
    expect(req.method).toBe('GET');
    expect(req.url).toBe('https://jsonplaceholder.typicode.com/posts');
    expect(req.basicUsername).toBe('admin');
  });
});

describe('importCollectionJson', () => {
  it('accepts a valid exported collection', () => {
    const json = exportCollection(collection, [savedRequest]);
    const result = importCollectionJson(json);
    expect(result.ok).toBe(true);
    expect(result.data?.collection.name).toBe('Test Collection');
  });

  it('rejects invalid JSON', () => {
    const result = importCollectionJson('{not valid json');
    expect(result.ok).toBe(false);
    expect(result.error).toContain('Invalid JSON');
  });

  it('rejects missing required fields', () => {
    const result = importCollectionJson(JSON.stringify({ version: 1 }));
    expect(result.ok).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('rejects wrong version number', () => {
    const json = JSON.stringify({
      version: 99,
      exportedAt: new Date().toISOString(),
      collection,
      requests: [],
    });
    const result = importCollectionJson(json);
    expect(result.ok).toBe(false);
  });

  it('rejects javascript: URL scheme', () => {
    const evilRequest = { ...savedRequest, url: 'javascript:alert(1)' };
    const json = exportCollection(collection, [evilRequest], false);
    const result = importCollectionJson(json);
    expect(result.ok).toBe(false);
    expect(result.error).toContain('Unsafe URL');
  });

  it('rejects data: URL scheme', () => {
    const evilRequest = { ...savedRequest, url: 'data:text/html,<script>evil</script>' };
    const json = exportCollection(collection, [evilRequest], false);
    const result = importCollectionJson(json);
    expect(result.ok).toBe(false);
  });

  it('accepts requests with empty URL (valid edge case)', () => {
    const emptyUrlRequest = { ...savedRequest, url: 'https://example.com' };
    const json = exportCollection(collection, [emptyUrlRequest]);
    const result = importCollectionJson(json);
    expect(result.ok).toBe(true);
  });
});
