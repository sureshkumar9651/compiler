import { z } from 'zod';
import { ApiCollection, CollectionExport, SavedRequest } from '@/types/api-playground';

// ---------------------------------------------------------------------------
// Zod validation schema
// ---------------------------------------------------------------------------

const KeyValuePairSchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
  enabled: z.boolean(),
});

const SavedRequestSchema = z.object({
  id: z.string(),
  collectionId: z.string(),
  name: z.string().max(200),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  url: z.string().max(2000),
  params: z.array(KeyValuePairSchema),
  headers: z.array(KeyValuePairSchema),
  authType: z.enum(['none', 'bearer', 'basic']),
  // Secrets are never in exported files by default, but if present must be strings
  bearerToken: z.string().optional(),
  basicUsername: z.string().optional(),
  basicPassword: z.string().optional(),
  bodyType: z.enum(['none', 'json', 'form-urlencoded', 'form-data']),
  bodyJson: z.string(),
  bodyFormPairs: z.array(KeyValuePairSchema),
  createdAt: z.number(),
  updatedAt: z.number(),
});

const CollectionSchema = z.object({
  id: z.string(),
  name: z.string().max(200),
  createdAt: z.number(),
  updatedAt: z.number(),
});

const CollectionExportSchema = z.object({
  version: z.literal(1),
  exportedAt: z.string(),
  collection: CollectionSchema,
  requests: z.array(SavedRequestSchema),
});

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

/**
 * Serialise a collection and its requests to a JSON string for download.
 * By default, secrets (bearer tokens, basic passwords) are redacted.
 */
export function exportCollection(
  collection: ApiCollection,
  requests: SavedRequest[],
  includeSecrets = false
): string {
  const exportData: CollectionExport = {
    version: 1,
    exportedAt: new Date().toISOString(),
    collection,
    requests: requests.map((r) => ({
      ...r,
      bearerToken: includeSecrets ? r.bearerToken : undefined,
      basicPassword: includeSecrets ? r.basicPassword : undefined,
    })),
  };
  return JSON.stringify(exportData, null, 2);
}

/**
 * Trigger a browser download of the collection JSON file.
 */
export function downloadCollectionJson(
  collection: ApiCollection,
  requests: SavedRequest[],
  includeSecrets = false
): void {
  const json = exportCollection(collection, requests, includeSecrets);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${sanitizeFilename(collection.name)}.api-collection.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// Import
// ---------------------------------------------------------------------------

export interface ImportResult {
  ok: boolean;
  data?: CollectionExport;
  error?: string;
}

/**
 * Parse and validate an imported collection JSON string.
 * Rejects malformed or structurally invalid files.
 * Does NOT silently execute any imported requests.
 */
export function importCollectionJson(raw: string): ImportResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: 'Invalid JSON file.' };
  }

  const result = CollectionExportSchema.safeParse(parsed);
  if (!result.success) {
    const firstIssue = result.error.issues[0];
    return {
      ok: false,
      error: `Invalid collection file: ${firstIssue?.message ?? 'Unknown validation error'} at ${firstIssue?.path?.join('.') ?? '?'}`,
    };
  }

  // Safety: ensure no requests have URLs that could be dangerous (data: / javascript:)
  const dangerous = result.data.requests.find((r) =>
    /^(javascript|data|vbscript):/i.test(r.url.trim())
  );
  if (dangerous) {
    return { ok: false, error: `Unsafe URL scheme detected in request "${dangerous.name}". Import rejected.` };
  }

  return { ok: true, data: result.data };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sanitizeFilename(name: string): string {
  return name.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_').slice(0, 80) || 'collection';
}
