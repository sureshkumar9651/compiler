import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { ApiCollection, SavedRequest, HistoryEntry } from '@/types/api-playground';

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

interface JSCodeLabDBv3 extends DBSchema {
  projects: {
    key: string;
    value: any;
    indexes: { updatedAt: number };
  };
  certificates: {
    key: string;
    value: any;
    indexes: { issuedAt: number; certificationId: string };
  };
  assessment_attempts: {
    key: string;
    value: any;
    indexes: { timestamp: number; certificationId: string };
  };
  api_collections: {
    key: string;
    value: ApiCollection;
    indexes: { updatedAt: number };
  };
  api_requests: {
    key: string;
    value: SavedRequest;
    indexes: { collectionId: string; updatedAt: number };
  };
  api_history: {
    key: string;
    value: HistoryEntry;
    indexes: { timestamp: number };
  };
}

const DB_NAME = 'js-codelab';
const DB_VERSION = 3;
const MAX_HISTORY_ENTRIES = 100;

function getDB(): Promise<IDBPDatabase<JSCodeLabDBv3>> {
  if (typeof window === 'undefined') {
    return Promise.resolve(null as unknown as IDBPDatabase<JSCodeLabDBv3>);
  }
  return openDB<JSCodeLabDBv3>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      // Additive migrations — existing stores are preserved
      if (!db.objectStoreNames.contains('projects')) {
        const s = db.createObjectStore('projects', { keyPath: 'id' });
        s.createIndex('updatedAt', 'updatedAt');
      }
      if (!db.objectStoreNames.contains('certificates')) {
        const s = db.createObjectStore('certificates', { keyPath: 'id' });
        s.createIndex('issuedAt', 'issuedAt');
        s.createIndex('certificationId', 'certificationId');
      }
      if (!db.objectStoreNames.contains('assessment_attempts')) {
        const s = db.createObjectStore('assessment_attempts', { keyPath: 'id' });
        s.createIndex('timestamp', 'timestamp');
        s.createIndex('certificationId', 'certificationId');
      }

      // Version 3: API Playground stores
      if (oldVersion < 3) {
        if (!db.objectStoreNames.contains('api_collections')) {
          const s = db.createObjectStore('api_collections', { keyPath: 'id' });
          s.createIndex('updatedAt', 'updatedAt');
        }
        if (!db.objectStoreNames.contains('api_requests')) {
          const s = db.createObjectStore('api_requests', { keyPath: 'id' });
          s.createIndex('collectionId', 'collectionId');
          s.createIndex('updatedAt', 'updatedAt');
        }
        if (!db.objectStoreNames.contains('api_history')) {
          const s = db.createObjectStore('api_history', { keyPath: 'id' });
          s.createIndex('timestamp', 'timestamp');
        }
      }
    },
  });
}

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

export async function getCollections(): Promise<ApiCollection[]> {
  const db = await getDB();
  if (!db) return [];
  const index = db.transaction('api_collections').store.index('updatedAt');
  const all: ApiCollection[] = [];
  let cursor = await index.openCursor(null, 'prev');
  while (cursor) {
    all.push(cursor.value);
    cursor = await cursor.continue();
  }
  return all;
}

export async function createCollection(name: string): Promise<ApiCollection> {
  const db = await getDB();
  if (!db) throw new Error('DB not available');
  const now = Date.now();
  const col: ApiCollection = { id: crypto.randomUUID(), name, createdAt: now, updatedAt: now };
  await db.add('api_collections', col);
  return col;
}

export async function updateCollection(id: string, patch: Partial<Pick<ApiCollection, 'name'>>): Promise<void> {
  const db = await getDB();
  if (!db) return;
  const tx = db.transaction('api_collections', 'readwrite');
  const existing = await tx.store.get(id);
  if (!existing) { await tx.done; return; }
  await tx.store.put({ ...existing, ...patch, updatedAt: Date.now() });
  await tx.done;
}

export async function deleteCollection(id: string): Promise<void> {
  const db = await getDB();
  if (!db) return;
  // Delete all requests in this collection
  const requests = await getRequestsByCollection(id);
  const tx = db.transaction(['api_collections', 'api_requests'], 'readwrite');
  for (const r of requests) {
    await tx.objectStore('api_requests').delete(r.id);
  }
  await tx.objectStore('api_collections').delete(id);
  await tx.done;
}

// ---------------------------------------------------------------------------
// Saved requests
// ---------------------------------------------------------------------------

export async function getRequestsByCollection(collectionId: string): Promise<SavedRequest[]> {
  const db = await getDB();
  if (!db) return [];
  const index = db.transaction('api_requests').store.index('collectionId');
  return index.getAll(collectionId);
}

export async function saveRequest(req: Omit<SavedRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<SavedRequest> {
  const db = await getDB();
  if (!db) throw new Error('DB not available');
  const now = Date.now();
  const saved: SavedRequest = { ...req, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
  await db.add('api_requests', saved);
  return saved;
}

export async function updateRequest(id: string, patch: Partial<Omit<SavedRequest, 'id' | 'createdAt'>>): Promise<void> {
  const db = await getDB();
  if (!db) return;
  const tx = db.transaction('api_requests', 'readwrite');
  const existing = await tx.store.get(id);
  if (!existing) { await tx.done; return; }
  await tx.store.put({ ...existing, ...patch, updatedAt: Date.now() });
  await tx.done;
}

export async function deleteRequest(id: string): Promise<void> {
  const db = await getDB();
  if (!db) return;
  await db.delete('api_requests', id);
}

export async function duplicateRequest(id: string): Promise<SavedRequest | null> {
  const db = await getDB();
  if (!db) return null;
  const existing = await db.get('api_requests', id);
  if (!existing) return null;
  const now = Date.now();
  const dup: SavedRequest = { ...existing, id: crypto.randomUUID(), name: `${existing.name} Copy`, createdAt: now, updatedAt: now };
  await db.add('api_requests', dup);
  return dup;
}

// ---------------------------------------------------------------------------
// History
// ---------------------------------------------------------------------------

export async function getHistory(limit = 50): Promise<HistoryEntry[]> {
  const db = await getDB();
  if (!db) return [];
  const index = db.transaction('api_history').store.index('timestamp');
  const all: HistoryEntry[] = [];
  let cursor = await index.openCursor(null, 'prev');
  let count = 0;
  while (cursor && count < limit) {
    all.push(cursor.value);
    cursor = await cursor.continue();
    count++;
  }
  return all;
}

export async function addHistoryEntry(entry: Omit<HistoryEntry, 'id'>): Promise<void> {
  const db = await getDB();
  if (!db) return;
  const full: HistoryEntry = { ...entry, id: crypto.randomUUID() };
  await db.add('api_history', full);

  // Prune old entries
  const tx = db.transaction('api_history', 'readwrite');
  const index = tx.store.index('timestamp');
  const all: string[] = [];
  let cursor = await index.openCursor(null, 'prev');
  while (cursor) {
    all.push(cursor.primaryKey as string);
    cursor = await cursor.continue();
  }
  if (all.length > MAX_HISTORY_ENTRIES) {
    for (const oldId of all.slice(MAX_HISTORY_ENTRIES)) {
      await tx.store.delete(oldId);
    }
  }
  await tx.done;
}

export async function clearHistory(): Promise<void> {
  const db = await getDB();
  if (!db) return;
  await db.clear('api_history');
}
