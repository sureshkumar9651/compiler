import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  getRequestsByCollection,
  saveRequest,
  deleteRequest,
  getHistory,
  addHistoryEntry,
  clearHistory,
} from '../../../lib/api-playground/persistence/IndexedDBApiRepository';

async function clearAll() {
  const cols = await getCollections();
  for (const c of cols) await deleteCollection(c.id);
  await clearHistory();
}

describe('IndexedDBApiRepository', () => {
  beforeEach(clearAll);

  // --- Collections ---
  it('creates and retrieves a collection', async () => {
    const col = await createCollection('My API');
    const all = await getCollections();
    expect(all.find((c) => c.id === col.id)?.name).toBe('My API');
  });

  it('renames a collection', async () => {
    const col = await createCollection('Old Name');
    await updateCollection(col.id, { name: 'New Name' });
    const all = await getCollections();
    expect(all.find((c) => c.id === col.id)?.name).toBe('New Name');
  });

  it('deletes a collection and its requests', async () => {
    const col = await createCollection('Ephemeral');
    await saveRequest({
      collectionId: col.id,
      name: 'Req',
      method: 'GET',
      url: 'https://example.com',
      params: [],
      headers: [],
      authType: 'none',
      bodyType: 'none',
      bodyJson: '',
      bodyFormPairs: [],
    });
    await deleteCollection(col.id);
    const all = await getCollections();
    expect(all.find((c) => c.id === col.id)).toBeUndefined();
    const reqs = await getRequestsByCollection(col.id);
    expect(reqs).toHaveLength(0);
  });

  // --- Requests ---
  it('saves and retrieves requests by collection', async () => {
    const col = await createCollection('TestColl');
    await saveRequest({
      collectionId: col.id,
      name: 'Get Users',
      method: 'GET',
      url: 'https://api.example.com/users',
      params: [{ id: '1', key: 'limit', value: '10', enabled: true }],
      headers: [],
      authType: 'none',
      bodyType: 'none',
      bodyJson: '',
      bodyFormPairs: [],
    });
    const reqs = await getRequestsByCollection(col.id);
    expect(reqs).toHaveLength(1);
    expect(reqs[0].name).toBe('Get Users');
    expect(reqs[0].params[0].key).toBe('limit');
  });

  it('deletes a request', async () => {
    const col = await createCollection('Del');
    const req = await saveRequest({
      collectionId: col.id,
      name: 'Temporary',
      method: 'DELETE',
      url: 'https://api.example.com/item/1',
      params: [],
      headers: [],
      authType: 'none',
      bodyType: 'none',
      bodyJson: '',
      bodyFormPairs: [],
    });
    await deleteRequest(req.id);
    const reqs = await getRequestsByCollection(col.id);
    expect(reqs).toHaveLength(0);
  });

  // --- History ---
  it('adds and retrieves history entries', async () => {
    await addHistoryEntry({
      method: 'GET',
      url: 'https://api.example.com/posts',
      status: 200,
      durationMs: 150,
      timestamp: Date.now(),
      request: {
        name: '',
        method: 'GET',
        url: 'https://api.example.com/posts',
        params: [],
        headers: [],
        authType: 'none',
        bodyType: 'none',
        bodyJson: '',
        bodyFormPairs: [],
      },
    });
    const hist = await getHistory();
    expect(hist.length).toBeGreaterThan(0);
    expect(hist[0].method).toBe('GET');
  });

  it('clears history', async () => {
    await addHistoryEntry({
      method: 'POST',
      url: 'https://api.example.com/users',
      status: 201,
      durationMs: 200,
      timestamp: Date.now(),
      request: {
        name: '',
        method: 'POST',
        url: 'https://api.example.com/users',
        params: [],
        headers: [],
        authType: 'none',
        bodyType: 'none',
        bodyJson: '',
        bodyFormPairs: [],
      },
    });
    await clearHistory();
    const hist = await getHistory();
    expect(hist).toHaveLength(0);
  });
});
