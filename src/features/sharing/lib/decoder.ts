import { SharePayload } from '../types/share';
import { decompressString } from './compression';

/**
 * Decodes a versioned URL fragment string into a SharePayload.
 * Format: v=1&code=<compressed>&title=<encoded>
 */
export function decodeSharePayload(hashString: string): SharePayload | null {
  try {
    // Remove leading # if present
    const cleanHash = hashString.startsWith('#') ? hashString.slice(1) : hashString;
    
    // Parse URLSearchParams from the fragment
    const params = new URLSearchParams(cleanHash);
    
    const version = params.get('v');
    const code = params.get('code');
    const title = params.get('title');

    // Currently only support version 1
    if (version !== '1') {
      console.warn('Unsupported share version or missing version.', version);
      return null;
    }

    if (!code) {
      console.warn('Share URL missing code payload.');
      return null;
    }

    const decompressedCode = decompressString(code);
    if (decompressedCode === null) {
      console.warn('Failed to decompress share code.');
      return null;
    }

    const payload: SharePayload = {
      version: 1,
      code: decompressedCode,
    };

    if (title) {
      // URLSearchParams automatically decodes values for us
      payload.title = title;
    }

    return payload;
  } catch (err) {
    console.error('Error decoding share payload:', err);
    return null;
  }
}
