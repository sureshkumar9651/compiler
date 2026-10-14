import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { buildUrl, sendRequest } from '../services/http-client';

// ---------------------------------------------------------------------------
// buildUrl
// ---------------------------------------------------------------------------

describe('buildUrl', () => {
  it('returns base URL unchanged when no params', () => {
    expect(buildUrl('https://api.example.com/posts', [])).toBe('https://api.example.com/posts');
  });

  it('appends enabled params with proper encoding', () => {
    const url = buildUrl('https://api.example.com/search', [
      { id: '1', key: 'q', value: 'hello world', enabled: true },
      { id: '2', key: 'page', value: '2', enabled: true },
    ]);
    expect(url).toContain('q=hello+world');
    expect(url).toContain('page=2');
  });

  it('skips disabled params', () => {
    const url = buildUrl('https://api.example.com/search', [
      { id: '1', key: 'active', value: '1', enabled: true },
      { id: '2', key: 'hidden', value: 'skip', enabled: false },
    ]);
    expect(url).toContain('active=1');
    expect(url).not.toContain('hidden');
  });

  it('skips params with empty keys', () => {
    const url = buildUrl('https://api.example.com/', [
      { id: '1', key: '', value: 'value', enabled: true },
    ]);
    expect(url).toBe('https://api.example.com/');
  });

  it('handles URLs without scheme', () => {
    const url = buildUrl('api.example.com/posts', [
      { id: '1', key: 'limit', value: '5', enabled: true },
    ]);
    expect(url).toContain('limit=5');
  });
});

// ---------------------------------------------------------------------------
// sendRequest — fetch mocking
// ---------------------------------------------------------------------------

describe('sendRequest', () => {
  const mockAbortSignal = () => new AbortController().signal;

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.stubGlobal('performance', { now: () => Date.now() });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const baseRequest = {
    method: 'GET' as const,
    url: 'https://api.example.com/posts',
    params: [],
    headers: [],
    auth: { type: 'none' as const },
    bodyType: 'none' as const,
    bodyJson: '',
    bodyFormPairs: [],
  };

  it('returns error when URL is empty', async () => {
    const result = await sendRequest({ ...baseRequest, url: '' }, mockAbortSignal());
    expect(result.status).toBe('error');
    expect(result.errorMessage).toContain('URL');
  });

  it('parses a JSON response successfully', async () => {
    const mockJson = [{ id: 1, title: 'Test Post' }];
    const encoder = new TextEncoder();
    const body = encoder.encode(JSON.stringify(mockJson));
    const mockHeaders = new Headers({ 'content-type': 'application/json' });

    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      status: 200,
      statusText: 'OK',
      headers: mockHeaders,
      arrayBuffer: async () => body.buffer,
    });

    const result = await sendRequest(baseRequest, mockAbortSignal());
    expect(result.status).toBe('success');
    expect(result.response?.status).toBe(200);
    expect(result.response?.isJson).toBe(true);
    expect(result.response?.parsedJson).toEqual(mockJson);
  });

  it('handles plain text response', async () => {
    const textBody = 'plain text response';
    const encoder = new TextEncoder();
    const mockHeaders = new Headers({ 'content-type': 'text/plain' });

    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      status: 200,
      statusText: 'OK',
      headers: mockHeaders,
      arrayBuffer: async () => encoder.encode(textBody).buffer,
    });

    const result = await sendRequest(baseRequest, mockAbortSignal());
    expect(result.status).toBe('success');
    expect(result.response?.isJson).toBe(false);
    expect(result.response?.bodyText).toBe(textBody);
  });

  it('handles HTTP error status codes correctly', async () => {
    const encoder = new TextEncoder();
    const mockHeaders = new Headers({ 'content-type': 'application/json' });

    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      status: 404,
      statusText: 'Not Found',
      headers: mockHeaders,
      arrayBuffer: async () => encoder.encode('{"error":"Not found"}').buffer,
    });

    // HTTP errors are still "success" from a request perspective — status code is in response.status
    const result = await sendRequest(baseRequest, mockAbortSignal());
    expect(result.status).toBe('success');
    expect(result.response?.status).toBe(404);
  });

  it('detects network error (CORS / fetch failure)', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new TypeError('Failed to fetch')
    );

    const result = await sendRequest(baseRequest, mockAbortSignal());
    expect(result.status).toBe('network-error');
    expect(result.errorMessage).toContain('CORS');
  });

  it('detects request cancellation', async () => {
    const controller = new AbortController();
    controller.abort();

    (fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new DOMException('The user aborted a request.', 'AbortError')
    );

    const result = await sendRequest(baseRequest, controller.signal);
    expect(result.status).toBe('cancelled');
  });

  it('sets bearer token in Authorization header', async () => {
    const encoder = new TextEncoder();
    const mockHeaders = new Headers({ 'content-type': 'application/json' });
    let capturedHeaders: Headers | undefined;

    (fetch as ReturnType<typeof vi.fn>).mockImplementationOnce((url, init) => {
      capturedHeaders = init.headers as Headers;
      return Promise.resolve({
        status: 200,
        statusText: 'OK',
        headers: mockHeaders,
        arrayBuffer: async () => encoder.encode('{}').buffer,
      });
    });

    await sendRequest(
      {
        ...baseRequest,
        auth: { type: 'bearer', bearerToken: 'my-secret-token' },
      },
      mockAbortSignal()
    );

    expect(capturedHeaders?.get('Authorization')).toBe('Bearer my-secret-token');
  });

  it('sets basic auth in Authorization header', async () => {
    const encoder = new TextEncoder();
    const mockHeaders = new Headers({ 'content-type': 'application/json' });
    let capturedHeaders: Headers | undefined;

    (fetch as ReturnType<typeof vi.fn>).mockImplementationOnce((url, init) => {
      capturedHeaders = init.headers as Headers;
      return Promise.resolve({
        status: 200,
        statusText: 'OK',
        headers: mockHeaders,
        arrayBuffer: async () => encoder.encode('{}').buffer,
      });
    });

    await sendRequest(
      {
        ...baseRequest,
        auth: { type: 'basic', basicUsername: 'user', basicPassword: 'pass' },
      },
      mockAbortSignal()
    );

    const authHeader = capturedHeaders?.get('Authorization') ?? '';
    expect(authHeader.startsWith('Basic ')).toBe(true);
    const decoded = atob(authHeader.slice(6));
    expect(decoded).toBe('user:pass');
  });

  it('encodes JSON body for POST requests', async () => {
    const encoder = new TextEncoder();
    const mockHeaders = new Headers({ 'content-type': 'application/json' });
    let capturedBody: string | undefined;

    (fetch as ReturnType<typeof vi.fn>).mockImplementationOnce((url, init) => {
      capturedBody = init.body as string;
      return Promise.resolve({
        status: 201,
        statusText: 'Created',
        headers: mockHeaders,
        arrayBuffer: async () => encoder.encode('{"id":1}').buffer,
      });
    });

    await sendRequest(
      {
        ...baseRequest,
        method: 'POST',
        bodyType: 'json',
        bodyJson: '{"title":"Test"}',
      },
      mockAbortSignal()
    );

    expect(capturedBody).toBe('{"title":"Test"}');
  });
});
