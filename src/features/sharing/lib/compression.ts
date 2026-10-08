import LZString from 'lz-string';

/**
 * Compress a string to a URI-safe format.
 */
export function compressString(value: string): string {
  return LZString.compressToEncodedURIComponent(value);
}

/**
 * Decompress a string from a URI-safe format.
 */
export function decompressString(compressed: string): string | null {
  return LZString.decompressFromEncodedURIComponent(compressed);
}
