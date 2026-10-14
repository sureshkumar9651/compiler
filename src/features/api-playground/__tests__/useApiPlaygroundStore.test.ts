import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useApiPlaygroundStore } from '@/store/useApiPlaygroundStore';

describe('useApiPlaygroundStore', () => {
  beforeEach(() => {
    useApiPlaygroundStore.setState({
      request: {
        method: 'GET',
        url: '',
        params: [],
        headers: [],
        auth: { type: 'none' },
        bodyType: 'none',
        bodyJson: '{\n  \n}',
        bodyFormPairs: [],
      },
      response: null,
      responseStatus: 'idle',
      errorMessage: null,
      requestTab: 'params',
      responseTab: 'body',
      persistAuthTokens: false,
      abortController: null,
    });
  });

  it('initializes with idle state', () => {
    const state = useApiPlaygroundStore.getState();
    expect(state.responseStatus).toBe('idle');
    expect(state.response).toBeNull();
    expect(state.request.method).toBe('GET');
  });

  it('setMethod updates method', () => {
    useApiPlaygroundStore.getState().setMethod('POST');
    expect(useApiPlaygroundStore.getState().request.method).toBe('POST');
  });

  it('setMethod to GET switches bodyType to none when it was json', () => {
    useApiPlaygroundStore.getState().setMethod('POST');
    useApiPlaygroundStore.getState().setBodyType('json');
    useApiPlaygroundStore.getState().setMethod('GET');
    expect(useApiPlaygroundStore.getState().request.bodyType).toBe('none');
  });

  it('setUrl updates url', () => {
    useApiPlaygroundStore.getState().setUrl('https://example.com');
    expect(useApiPlaygroundStore.getState().request.url).toBe('https://example.com');
  });

  it('setRequestTab updates active tab', () => {
    useApiPlaygroundStore.getState().setRequestTab('headers');
    expect(useApiPlaygroundStore.getState().requestTab).toBe('headers');
  });

  it('setResponseTab updates response tab', () => {
    useApiPlaygroundStore.getState().setResponseTab('headers');
    expect(useApiPlaygroundStore.getState().responseTab).toBe('headers');
  });

  it('setAuth updates auth config', () => {
    useApiPlaygroundStore.getState().setAuth({ type: 'bearer', bearerToken: 'tok' });
    const { auth } = useApiPlaygroundStore.getState().request;
    expect(auth.type).toBe('bearer');
    expect(auth.bearerToken).toBe('tok');
  });

  it('setPersistAuthTokens toggles flag', () => {
    useApiPlaygroundStore.getState().setPersistAuthTokens(true);
    expect(useApiPlaygroundStore.getState().persistAuthTokens).toBe(true);
  });

  it('loadRequest merges config and resets response', () => {
    useApiPlaygroundStore.setState({ responseStatus: 'success' });
    useApiPlaygroundStore.getState().loadRequest({ method: 'POST', url: 'https://api.test.com' });
    const state = useApiPlaygroundStore.getState();
    expect(state.request.method).toBe('POST');
    expect(state.request.url).toBe('https://api.test.com');
    expect(state.responseStatus).toBe('idle');
  });

  it('resetRequest clears state', () => {
    useApiPlaygroundStore.getState().setUrl('https://something.com');
    useApiPlaygroundStore.getState().resetRequest();
    const state = useApiPlaygroundStore.getState();
    expect(state.request.url).toBe('');
    expect(state.responseStatus).toBe('idle');
  });

  it('cancelRequest sets cancelled status', () => {
    const controller = new AbortController();
    useApiPlaygroundStore.setState({ abortController: controller, responseStatus: 'loading' });
    useApiPlaygroundStore.getState().cancelRequest();
    expect(useApiPlaygroundStore.getState().responseStatus).toBe('cancelled');
    expect(useApiPlaygroundStore.getState().abortController).toBeNull();
  });

  it('setBodyJson updates body json', () => {
    useApiPlaygroundStore.getState().setBodyJson('{"test":true}');
    expect(useApiPlaygroundStore.getState().request.bodyJson).toBe('{"test":true}');
  });

  it('sendRequest returns error for empty URL', async () => {
    useApiPlaygroundStore.getState().setUrl('');
    await useApiPlaygroundStore.getState().sendRequest();
    const state = useApiPlaygroundStore.getState();
    expect(state.responseStatus).toBe('error');
    expect(state.errorMessage).toBeTruthy();
  });
});
