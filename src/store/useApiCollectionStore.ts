import { create } from 'zustand';
import { ApiCollection, HistoryEntry, SavedRequest } from '@/types/api-playground';
import {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  getRequestsByCollection,
  saveRequest,
  updateRequest,
  deleteRequest,
  duplicateRequest,
  getHistory,
  clearHistory,
} from '@/lib/api-playground/persistence/IndexedDBApiRepository';

// ---------------------------------------------------------------------------
// Store interface
// ---------------------------------------------------------------------------

interface ApiCollectionStoreState {
  collections: ApiCollection[];
  requestsByCollection: Record<string, SavedRequest[]>;
  history: HistoryEntry[];
  activeCollectionId: string | null;
  isLoading: boolean;

  // Lifecycle
  initialize: () => Promise<void>;

  // Collections
  createCollection: (name: string) => Promise<ApiCollection>;
  renameCollection: (id: string, name: string) => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
  setActiveCollection: (id: string | null) => void;

  // Requests
  loadCollectionRequests: (collectionId: string) => Promise<void>;
  saveRequest: (
    req: Omit<SavedRequest, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<SavedRequest>;
  updateRequest: (
    id: string,
    patch: Partial<Omit<SavedRequest, 'id' | 'createdAt'>>
  ) => Promise<void>;
  deleteRequest: (id: string, collectionId: string) => Promise<void>;
  duplicateRequest: (id: string, collectionId: string) => Promise<void>;

  // History
  loadHistory: () => Promise<void>;
  clearHistory: () => Promise<void>;

  // Import: merge an imported collection (creates new IDs to avoid collisions)
  importCollection: (
    collection: ApiCollection,
    requests: Omit<SavedRequest, 'bearerToken' | 'basicPassword'>[]
  ) => Promise<void>;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useApiCollectionStore = create<ApiCollectionStoreState>((set, get) => ({
  collections: [],
  requestsByCollection: {},
  history: [],
  activeCollectionId: null,
  isLoading: false,

  initialize: async () => {
    set({ isLoading: true });
    try {
      const [collections, history] = await Promise.all([getCollections(), getHistory()]);
      set({ collections, history });
      // Pre-load requests for the first collection
      if (collections.length > 0) {
        const first = collections[0];
        set({ activeCollectionId: first.id });
        const requests = await getRequestsByCollection(first.id);
        set((s) => ({
          requestsByCollection: { ...s.requestsByCollection, [first.id]: requests },
        }));
      }
    } finally {
      set({ isLoading: false });
    }
  },

  createCollection: async (name) => {
    const col = await createCollection(name.trim() || 'New Collection');
    set((s) => ({
      collections: [col, ...s.collections],
      activeCollectionId: col.id,
      requestsByCollection: { ...s.requestsByCollection, [col.id]: [] },
    }));
    return col;
  },

  renameCollection: async (id, name) => {
    await updateCollection(id, { name: name.trim() });
    set((s) => ({
      collections: s.collections.map((c) =>
        c.id === id ? { ...c, name: name.trim(), updatedAt: Date.now() } : c
      ),
    }));
  },

  deleteCollection: async (id) => {
    await deleteCollection(id);
    set((s) => {
      const newCollections = s.collections.filter((c) => c.id !== id);
      const newActive =
        s.activeCollectionId === id
          ? (newCollections[0]?.id ?? null)
          : s.activeCollectionId;
      const { [id]: _removed, ...rest } = s.requestsByCollection;
      return {
        collections: newCollections,
        activeCollectionId: newActive,
        requestsByCollection: rest,
      };
    });
  },

  setActiveCollection: (id) => {
    set({ activeCollectionId: id });
    if (id) get().loadCollectionRequests(id);
  },

  loadCollectionRequests: async (collectionId) => {
    const requests = await getRequestsByCollection(collectionId);
    set((s) => ({
      requestsByCollection: { ...s.requestsByCollection, [collectionId]: requests },
    }));
  },

  saveRequest: async (req) => {
    const saved = await saveRequest(req);
    set((s) => ({
      requestsByCollection: {
        ...s.requestsByCollection,
        [req.collectionId]: [saved, ...(s.requestsByCollection[req.collectionId] ?? [])],
      },
    }));
    return saved;
  },

  updateRequest: async (id, patch) => {
    await updateRequest(id, patch);
    const collectionId =
      patch.collectionId ?? get().collections.find(() => true)?.id;
    if (collectionId) {
      await get().loadCollectionRequests(collectionId);
    }
  },

  deleteRequest: async (id, collectionId) => {
    await deleteRequest(id);
    set((s) => ({
      requestsByCollection: {
        ...s.requestsByCollection,
        [collectionId]: (s.requestsByCollection[collectionId] ?? []).filter(
          (r) => r.id !== id
        ),
      },
    }));
  },

  duplicateRequest: async (id, collectionId) => {
    const dup = await duplicateRequest(id);
    if (dup) {
      set((s) => ({
        requestsByCollection: {
          ...s.requestsByCollection,
          [collectionId]: [dup, ...(s.requestsByCollection[collectionId] ?? [])],
        },
      }));
    }
  },

  loadHistory: async () => {
    const history = await getHistory();
    set({ history });
  },

  clearHistory: async () => {
    await clearHistory();
    set({ history: [] });
  },

  importCollection: async (collection, requests) => {
    // Give everything fresh IDs so imports don't collide with existing data
    const newCol: ApiCollection = {
      ...collection,
      name: `${collection.name} (imported)`,
      updatedAt: Date.now(),
    };

    // Create collection via store action (handles state update)
    const createdCol = await get().createCollection(newCol.name);

    // Insert requests with fresh IDs
    const saved: SavedRequest[] = [];
    for (const req of requests) {
      const s = await saveRequest({
        ...req,
        collectionId: createdCol.id,
      } as Omit<SavedRequest, 'id' | 'createdAt' | 'updatedAt'>);
      saved.push(s);
    }

    set((s) => ({
      requestsByCollection: {
        ...s.requestsByCollection,
        [createdCol.id]: saved,
      },
    }));
  },
}));
