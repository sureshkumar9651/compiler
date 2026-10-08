export interface SharePayload {
  version: 1;
  code: string;
  title?: string;
}

export interface ShareResult {
  url: string;
  isOversized: boolean;
}

// 8000 characters is a safe limit for URLs across most modern browsers/services.
export const MAX_SHARE_URL_LENGTH = 8000;
