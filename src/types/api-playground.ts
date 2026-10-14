// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type AuthType = 'none' | 'bearer' | 'basic';

export type BodyType = 'none' | 'json' | 'form-urlencoded' | 'form-data';

export type ResponseStatus = 'idle' | 'loading' | 'success' | 'error' | 'cancelled' | 'timeout' | 'network-error';

// ---------------------------------------------------------------------------
// Request building
// ---------------------------------------------------------------------------

export interface KeyValuePair {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface AuthConfig {
  type: AuthType;
  /** Bearer token — NEVER persisted by default */
  bearerToken?: string;
  /** Basic auth username */
  basicUsername?: string;
  /** Basic auth password — NEVER persisted by default */
  basicPassword?: string;
}

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  params: KeyValuePair[];
  headers: KeyValuePair[];
  auth: AuthConfig;
  bodyType: BodyType;
  bodyJson: string;
  bodyFormPairs: KeyValuePair[];
}

// ---------------------------------------------------------------------------
// Response
// ---------------------------------------------------------------------------

export interface ResponseData {
  status: number;
  statusText: string;
  /** Duration in milliseconds */
  durationMs: number;
  /** Size of the response body in bytes */
  sizeBytes: number;
  headers: Record<string, string>;
  /** Raw body text, truncated if very large */
  bodyText: string;
  /** True if bodyText was truncated */
  isTruncated: boolean;
  /** True if bodyText is valid JSON */
  isJson: boolean;
  /** Parsed JSON value (only when isJson is true) */
  parsedJson?: unknown;
  /** Cookie header value if present */
  cookies?: string;
}

export interface ApiPlaygroundState {
  /** Currently editing request */
  request: RequestConfig;
  /** Response from the last send */
  response: ResponseData | null;
  responseStatus: ResponseStatus;
  /** Human-readable error message */
  errorMessage: string | null;
  /** Active tab in the request editor */
  requestTab: 'params' | 'headers' | 'auth' | 'body';
  /** Active tab in the response panel */
  responseTab: 'body' | 'headers' | 'cookies';
  /** Whether to persist auth tokens (user-explicit consent) */
  persistAuthTokens: boolean;
}

// ---------------------------------------------------------------------------
// Collections & persistence
// ---------------------------------------------------------------------------

export interface SavedRequest {
  id: string;
  collectionId: string;
  name: string;
  method: HttpMethod;
  url: string;
  params: KeyValuePair[];
  headers: KeyValuePair[];
  /** Auth type only — tokens are NOT stored by default */
  authType: AuthType;
  /** Stored only when user has explicitly opted in */
  bearerToken?: string;
  basicUsername?: string;
  /** Password stored only with explicit consent */
  basicPassword?: string;
  bodyType: BodyType;
  bodyJson: string;
  bodyFormPairs: KeyValuePair[];
  createdAt: number;
  updatedAt: number;
}

export interface ApiCollection {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

export interface HistoryEntry {
  id: string;
  method: HttpMethod;
  url: string;
  status: number | null;
  durationMs: number | null;
  timestamp: number;
  /** Snapshot of the request config (auth tokens excluded) */
  request: Omit<SavedRequest, 'id' | 'collectionId' | 'createdAt' | 'updatedAt'>;
}

// ---------------------------------------------------------------------------
// Export / import
// ---------------------------------------------------------------------------

export interface CollectionExport {
  version: 1;
  exportedAt: string;
  collection: ApiCollection;
  requests: Array<Omit<SavedRequest, 'bearerToken' | 'basicPassword'>>;
}
