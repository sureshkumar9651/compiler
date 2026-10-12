export interface NameValidationResult {
  valid: boolean;
  sanitized: string;
  error?: string;
}

const DISALLOWED_PLACEHOLDER_NAMES = new Set([
  'your name here',
  'your name',
  'name here',
  'name',
  'placeholder',
  'anonymous',
  'unknown',
  'test',
  'tester',
  'test user',
  'sample',
  'sample user',
  'sample name',
  'demo user',
  'user',
  'admin',
  'administrator',
  'null',
  'undefined',
  'n/a',
  'na',
  'none',
  'no name',
  'first last',
  'john doe',
  'jane doe',
]);

/**
 * Validates and sanitizes learner name for certificate issuance.
 * Disallows empty, malformed, or placeholder names.
 */
export function validateAndSanitizeLearnerName(input: string): NameValidationResult {
  if (!input || typeof input !== 'string') {
    return { valid: false, sanitized: '', error: 'Name is required to issue a certificate.' };
  }

  // Strip HTML tags and non-printable control characters
  let clean = input
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .trim();

  // Collapse multiple internal whitespaces to a single space
  clean = clean.replace(/\s+/g, ' ');

  if (clean.length < 2) {
    return {
      valid: false,
      sanitized: clean,
      error: 'Name must be at least 2 characters long.',
    };
  }

  if (clean.length > 60) {
    return {
      valid: false,
      sanitized: clean,
      error: 'Name cannot exceed 60 characters.',
    };
  }

  // Must contain at least one alphabetical letter
  if (!/[a-zA-Z]/.test(clean)) {
    return {
      valid: false,
      sanitized: clean,
      error: 'Please enter a valid name containing alphabetical characters.',
    };
  }

  // Reject placeholder names
  const lower = clean.toLowerCase();
  if (DISALLOWED_PLACEHOLDER_NAMES.has(lower)) {
    return {
      valid: false,
      sanitized: clean,
      error: 'Please enter your real full name. Placeholder names cannot be issued on certificates.',
    };
  }

  return { valid: true, sanitized: clean };
}
