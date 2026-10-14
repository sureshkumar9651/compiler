import { create } from 'zustand';
import {
  ApiPlaygroundState,
  AuthConfig,
  BodyType,
  HttpMethod,
  KeyValuePair,
  RequestConfig,
  ResponseData,
  ResponseStatus,
} from '@/types/api-playground';
import { sendRequest, buildHistoryEntry } from '@/features/api-playground/services/http-client';
import { addHistoryEntry } from '@/lib/api-playground/persistence/IndexedDBApiRepository';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeKv(key = '', value = ''): KeyValuePair {
  return { id: crypto.randomUUID(), key, value, enabled: true };
}

const DEFAULT_REQUEST: RequestConfig = {
  method: 'GET',
  url: '',
  params: [makeKv()],
  headers: [makeKv()],
  auth: { type: 'none' },
  bodyType: 'none',
  bodyJson: '{\n  \n}',
  bodyFormPairs: [makeKv()],
};

// ---------------------------------------------------------------------------
// Store interface
// ---------------------------------------------------------------------------

interface ApiPlaygroundStoreState extends ApiPlaygroundState {
  abortController: AbortController | null;

  // Request builder mutations
  setMethod: (method: HttpMethod) => void;
  setUrl: (url: string) => void;
  setParams: (params: KeyValuePair[]) => void;
  setHeaders: (headers: KeyValuePair[]) => void;
  setAuth: (auth: AuthConfig) => void;
  setBodyType: (bodyType: BodyType) => void;
  setBodyJson: (json: string) => void;
  setBodyFormPairs: (pairs: KeyValuePair[]) => void;
  setRequestTab: (tab: ApiPlaygroundState['requestTab']) => void;
  setResponseTab: (tab: ApiPlaygroundState['responseTab']) => void;
  setPersistAuthTokens: (value: boolean) => void;

  // Actions
  sendRequest: () => Promise<void>;
  cancelRequest: () => void;
  loadRequest: (config: Partial<RequestConfig>) => void;
  resetRequest: () => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useApiPlaygroundStore = create<ApiPlaygroundStoreState>((set, get) => ({
  request: { ...DEFAULT_REQUEST },
  response: null,
  responseStatus: 'idle',
  errorMessage: null,
  requestTab: 'params',
  responseTab: 'body',
  persistAuthTokens: false,
  abortController: null,

  setMethod: (method) =>
    set((s) => ({
      request: {
        ...s.request,
        method,
        // Switch body to 'none' for GET/DELETE, json for others
        bodyType: method === 'GET' || method === 'DELETE' ? 'none' : s.request.bodyType === 'none' ? 'json' : s.request.bodyType,
      },
    })),

  setUrl: (url) => set((s) => ({ request: { ...s.request, url } })),
  setParams: (params) => set((s) => ({ request: { ...s.request, params } })),
  setHeaders: (headers) => set((s) => ({ request: { ...s.request, headers } })),
  setAuth: (auth) => set((s) => ({ request: { ...s.request, auth } })),
  setBodyType: (bodyType) => set((s) => ({ request: { ...s.request, bodyType } })),
  setBodyJson: (bodyJson) => set((s) => ({ request: { ...s.request, bodyJson } })),
  setBodyFormPairs: (bodyFormPairs) => set((s) => ({ request: { ...s.request, bodyFormPairs } })),
  setRequestTab: (requestTab) => set({ requestTab }),
  setResponseTab: (responseTab) => set({ responseTab }),
  setPersistAuthTokens: (persistAuthTokens) => set({ persistAuthTokens }),

  sendRequest: async () => {
    const { request, abortController: existing } = get();

    // Cancel any in-flight request
    if (existing) existing.abort();

    const controller = new AbortController();
    set({ abortController: controller, responseStatus: 'loading', errorMessage: null, response: null });

    const result = await sendRequest(request, controller.signal);

    // If a new request was started in the meantime, ignore this result
    if (get().abortController !== controller) return;

    set({
      response: result.response,
      responseStatus: result.status,
      errorMessage: result.errorMessage,
      abortController: null,
    });

    // Persist to history (never persist secrets)
    try {
      const entry = buildHistoryEntry(
        request,
        result.response?.status ?? null,
        result.response?.durationMs ?? null
      );
      await addHistoryEntry(entry);
    } catch {
      // Non-critical
    }
  },

  cancelRequest: () => {
    const { abortController } = get();
    if (abortController) {
      abortController.abort();
      set({ abortController: null, responseStatus: 'cancelled', errorMessage: 'Request was cancelled.' });
    }
  },

  loadRequest: (config) =>
    set((s) => ({
      request: { ...s.request, ...config },
      response: null,
      responseStatus: 'idle',
      errorMessage: null,
    })),

  resetRequest: () =>
    set({
      request: { ...DEFAULT_REQUEST, params: [makeKv()], headers: [makeKv()], bodyFormPairs: [makeKv()] },
      response: null,
      responseStatus: 'idle',
      errorMessage: null,
    }),
}));

export { makeKv };
