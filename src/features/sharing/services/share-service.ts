import { SharePayload, ShareResult, MAX_SHARE_URL_LENGTH } from '../types/share';
import { encodeSharePayload } from '../lib/encoder';
import { decodeSharePayload } from '../lib/decoder';

export class ShareService {
  /**
   * Generates a shareable URL based on the given payload.
   * Returns a ShareResult indicating if the generated URL exceeds safe limits.
   */
  createShareUrl(payload: SharePayload): ShareResult {
    const fragment = encodeSharePayload(payload);
    
    // Construct the full URL using current window location (assuming /playground path)
    const baseUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
    const fullUrl = `${baseUrl}#${fragment}`;
    
    return {
      url: fullUrl,
      isOversized: fullUrl.length > MAX_SHARE_URL_LENGTH
    };
  }

  /**
   * Decodes a full URL or fragment string into a SharePayload.
   */
  decodeShareUrl(urlOrFragment: string): SharePayload | null {
    if (!urlOrFragment) return null;
    
    let hash = urlOrFragment;
    
    // Extract hash if it's a full URL
    if (urlOrFragment.includes('#')) {
      hash = urlOrFragment.split('#')[1];
    }
    
    return decodeSharePayload(hash);
  }
}

export const shareService = new ShareService();
