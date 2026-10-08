/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BrowserWorkerExecutionService } from '../BrowserWorkerExecutionService';

describe('BrowserWorkerExecutionService', () => {
  let service: BrowserWorkerExecutionService;
  let mockWorker: Record<string, unknown>;

  beforeEach(() => {
    service = new BrowserWorkerExecutionService();
    
    global.URL.createObjectURL = vi.fn(() => 'blob:test');
    
    mockWorker = {
      postMessage: vi.fn(),
      terminate: vi.fn(),
    };
    
    global.Worker = vi.fn().mockImplementation(function(this: Record<string, unknown>) {
      this.postMessage = mockWorker.postMessage;
      this.terminate = mockWorker.terminate;
      mockWorker.instance = this;
      return this;
    }) as unknown as typeof Worker;
  });

  afterEach(() => {
    service.stop();
    vi.restoreAllMocks();
  });

  it('should handle basic console.log output', async () => {
    const code = 'console.log("Hello");';
    const onConsole = vi.fn();
    
    const promise = service.execute(code, onConsole, 'test-id-1');
    
    // Simulate the event loop so the constructor finishes setting up
    await new Promise(r => setTimeout(r, 0));
    
    expect(mockWorker.postMessage).toHaveBeenCalledWith({ code });
    
    (mockWorker.instance as any).onmessage({
      data: {
        type: 'CONSOLE',
        payload: { type: 'log', args: ['Hello'] }
      }
    });
    
    (mockWorker.instance as any).onmessage({
      data: { type: 'DONE' }
    });
    
    const result = await promise;
    
    expect(onConsole).toHaveBeenCalled();
    expect(result.status).toBe('success');
    expect(result.output).toHaveLength(1);
    expect(result.output[0].content).toBe('Hello');
  });

  it('should handle multiple logs', async () => {
    const promise = service.execute('code', vi.fn(), 'test-id-2');
    await new Promise(r => setTimeout(r, 0));
    
    (mockWorker.instance as any).onmessage({ data: { type: 'CONSOLE', payload: { type: 'log', args: ['A'] } } });
    (mockWorker.instance as any).onmessage({ data: { type: 'CONSOLE', payload: { type: 'log', args: ['B'] } } });
    (mockWorker.instance as any).onmessage({ data: { type: 'DONE' } });
    
    const result = await promise;
    expect(result.output).toHaveLength(2);
    expect(result.output[0].content).toBe('A');
    expect(result.output[1].content).toBe('B');
  });

  it('should handle runtime exceptions', async () => {
    const promise = service.execute('throw new Error("Test error");', vi.fn(), 'test-id-3');
    await new Promise(r => setTimeout(r, 0));
    
    (mockWorker.instance as any).onmessage({
      data: {
        type: 'ERROR',
        payload: { name: 'Error', message: 'Test error' }
      }
    });
    
    const result = await promise;
    expect(result.status).toBe('error');
    expect(result.error?.message).toBe('Test error');
  });
});
