export type ConsoleEntryType = 'log' | 'info' | 'warn' | 'error' | 'result' | 'system';
export type ConsoleFilterType = 'all' | 'logs' | 'warnings' | 'errors';

export interface ConsoleEntry {
  id: string;
  type: ConsoleEntryType;
  content: string; // The primary text representation
  args?: string[]; // The stringified arguments for complex logs
  timestamp: number;
}

export type ExecutionStatus = 'idle' | 'running' | 'success' | 'error' | 'timeout' | 'stopped';

export interface ExecutionError {
  name: string;
  message: string;
  stack?: string;
  line?: number;
  column?: number;
}

export interface ExecutionResult {
  status: ExecutionStatus;
  output: ConsoleEntry[];
  executionTime: number;
  error?: ExecutionError;
}

export interface IExecutionService {
  execute(
    code: string, 
    onConsole: (entry: ConsoleEntry) => void,
    executionId: string
  ): Promise<ExecutionResult>;
  stop(): void;
}
