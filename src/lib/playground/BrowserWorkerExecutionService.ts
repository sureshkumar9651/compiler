import { ConsoleEntry, ExecutionResult, IExecutionService } from '@/types/playground';
import { getErrorMessage } from '@/utils/error';

const WORKER_TIMEOUT_MS = 2000;

export class BrowserWorkerExecutionService implements IExecutionService {
  private worker: Worker | null = null;
  private timeoutId: NodeJS.Timeout | null = null;
  private currentExecutionId: string | null = null;

  async execute(code: string, onConsole: (entry: ConsoleEntry) => void, executionId: string): Promise<ExecutionResult> {
    this.stop(); // Ensure any existing execution is stopped
    this.currentExecutionId = executionId;

    return new Promise((resolve) => {
      const startTime = performance.now();
      const output: ConsoleEntry[] = [];
      let resolved = false;

      const handleConsole = (type: ConsoleEntry['type'], args: unknown[]) => {
        // We receive stringified JSON for safe transfer. We try to keep it as raw strings.
        // The worker sends args as an array of stringified values.
        // For simple rendering, content is the space-separated string.
        const stringArgs = args as string[];
        
        let content = '';
        try {
          content = stringArgs.map(a => {
            if (a === 'undefined') return 'undefined';
            if (a === 'null') return 'null';
            try {
              const parsed = JSON.parse(a);
              if (typeof parsed === 'string') return parsed;
              return a; // Keep JSON format for objects/arrays
            } catch {
              return a;
            }
          }).join(' ');
        } catch {
          content = stringArgs.join(' ');
        }

        const entry: ConsoleEntry = {
          id: crypto.randomUUID(),
          type,
          content,
          args: stringArgs,
          timestamp: Date.now(),
        };
        output.push(entry);
        onConsole(entry);
      };

      const finish = (status: ExecutionResult['status'], error?: ExecutionResult['error']) => {
        if (resolved) return;
        resolved = true;
        this.stop();
        resolve({
          status,
          output,
          executionTime: Math.max(1, Math.round(performance.now() - startTime)),
          error
        });
      };

      try {
        const workerCode = `
          // Safe serialization helper for the worker
          const safeSerialize = (arg, cache = new Set(), depth = 0) => {
            if (depth > 5) return '"[Max Depth Reached]"';
            if (arg === undefined) return 'undefined';
            if (arg === null) return 'null';
            if (typeof arg === 'string') {
              if (arg.length > 10000) {
                return JSON.stringify(arg.slice(0, 10000) + '... [Truncated]');
              }
              return JSON.stringify(arg);
            }
            if (typeof arg === 'function') return '"[Function: ' + (arg.name || 'anonymous') + ']"';
            if (typeof arg === 'symbol') return '"' + arg.toString() + '"';
            if (arg instanceof Error) {
              return JSON.stringify({ 
                name: arg.name, 
                message: arg.message, 
                stack: arg.stack 
              });
            }
            
            if (typeof arg === 'object') {
              if (cache.has(arg)) return '"[Circular]"';
              cache.add(arg);
              
              if (Array.isArray(arg)) {
                if (arg.length > 100) {
                  const subset = arg.slice(0, 100).map(val => safeSerialize(val, cache, depth + 1));
                  return '[' + subset.join(', ') + ', "...' + (arg.length - 100) + ' more items"]';
                }
                return '[' + arg.map(val => safeSerialize(val, cache, depth + 1)).join(', ') + ']';
              }
              
              const obj = {};
              let keys = Object.keys(arg);
              let omitted = 0;
              if (keys.length > 100) {
                omitted = keys.length - 100;
                keys = keys.slice(0, 100);
              }
              
              for (const key of keys) {
                try {
                  obj[key] = JSON.parse(safeSerialize(arg[key], cache, depth + 1));
                } catch(e) {
                  obj[key] = String(arg[key]);
                }
              }
              
              if (omitted > 0) {
                obj['...'] = omitted + ' more properties';
              }
              
              return JSON.stringify(obj, null, 2);
            }
            
            return JSON.stringify(arg);
          };

          const originalConsole = {
            log: console.log,
            info: console.info,
            warn: console.warn,
            error: console.error,
          };

          let messageCount = 0;
          const MAX_MESSAGES = 1000;

          const sendConsole = (type, args) => {
            if (messageCount >= MAX_MESSAGES) {
              if (messageCount === MAX_MESSAGES) {
                self.postMessage({ type: 'CONSOLE', payload: { type: 'error', args: ['"[Console rate limit exceeded. Further messages truncated]"'] } });
                messageCount++;
              }
              return;
            }
            messageCount++;
            try {
              const serializedArgs = args.map(arg => safeSerialize(arg));
              self.postMessage({ type: 'CONSOLE', payload: { type, args: serializedArgs } });
            } catch(e) {
              self.postMessage({ type: 'CONSOLE', payload: { type: 'error', args: ['"[Serialization Error]"'] } });
            }
          };

          console.log = (...args) => sendConsole('log', args);
          console.info = (...args) => sendConsole('info', args);
          console.warn = (...args) => sendConsole('warn', args);
          console.error = (...args) => sendConsole('error', args);

          self.onmessage = async (e) => {
            const { code } = e.data;
            try {
              const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
              const fn = new AsyncFunction(code);
              await fn();
              self.postMessage({ type: 'DONE' });
            } catch (error) {
              // Extract line/column if possible (rudimentary approach)
              let line = undefined;
              let column = undefined;
              
              if (error.stack) {
                const match = error.stack.match(/<anonymous>:(\\d+):(\\d+)/);
                if (match) {
                  line = parseInt(match[1], 10);
                  column = parseInt(match[2], 10);
                }
              }
              
              self.postMessage({
                type: 'ERROR',
                payload: {
                  name: error.name || 'Error',
                  message: error.message || String(error),
                  stack: error.stack,
                  line,
                  column
                }
              });
            } finally {
              console.log = originalConsole.log;
              console.info = originalConsole.info;
              console.warn = originalConsole.warn;
              console.error = originalConsole.error;
            }
          };
        `;

        const blob = new Blob([workerCode], { type: 'application/javascript' });
        this.worker = new Worker(URL.createObjectURL(blob));

        this.worker.onmessage = (e) => {
          const { type, payload } = e.data;
          
          if (type === 'CONSOLE') {
            handleConsole(payload.type, payload.args);
          } else if (type === 'ERROR') {
            const isSyntaxError = payload.name === 'SyntaxError';
            payload.message = getErrorMessage(payload.message || payload);
            if (payload.name) payload.name = typeof payload.name === 'string' ? payload.name : 'Error';
            if (payload.stack) payload.stack = typeof payload.stack === 'string' ? payload.stack : getErrorMessage(payload.stack);
            finish(isSyntaxError ? 'error' : 'error', payload);
          } else if (type === 'DONE') {
            finish('success');
          }
        };

        this.worker.onerror = (e) => {
          e.preventDefault();
          finish('error', { name: 'WorkerError', message: getErrorMessage(e.message || e), line: e.lineno, column: e.colno });
        };

        this.timeoutId = setTimeout(() => {
          finish('timeout');
        }, WORKER_TIMEOUT_MS);

        this.worker.postMessage({ code });
      } catch (err: unknown) {
        finish('error', { name: 'SystemError', message: getErrorMessage(err) });
      }
    });
  }

  stop(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.currentExecutionId = null;
  }
}
