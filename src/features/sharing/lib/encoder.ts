import { SharePayload } from '../types/share';
import { compressString } from './compression';

/**
 * Encodes a SharePayload into a versioned URL fragment string.
 * Format: v=1&code=<compressed>&title=<encoded>
 */
export function encodeSharePayload(payload: SharePayload): string {
  const parts: string[] = [`v=${payload.version}`];

  const compressedCode = compressString(payload.code);
  parts.push(`code=${compressedCode}`);

  if (payload.title) {
    parts.push(`title=${encodeURIComponent(payload.title)}`);
  }

  return parts.join('&');
}
