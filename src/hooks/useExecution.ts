import { useRef, useCallback } from 'react';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { BrowserWorkerExecutionService } from '@/lib/playground/BrowserWorkerExecutionService';
import { getErrorMessage } from '@/utils/error';

export function useExecution() {
  const serviceRef = useRef<BrowserWorkerExecutionService | null>(null);
  const { code, setStatus, setExecutionTime, setLastError, clearConsole, addConsoleEntry, setCurrentExecutionId } = usePlaygroundStore();

  const getService = () => {
    if (!serviceRef.current) {
      serviceRef.current = new BrowserWorkerExecutionService();
    }
    return serviceRef.current;
  };

  const executeCode = useCallback(async () => {
    const { activeTab, executeReact, code, setStatus, setExecutionTime, setLastError, clearConsole, addConsoleEntry, setCurrentExecutionId } = usePlaygroundStore.getState();
    
    if (activeTab === 'react') {
      executeReact();
      return;
    }

    const service = getService();
    const executionId = crypto.randomUUID();
    
    // Reset state before run
    setCurrentExecutionId(executionId);
    clearConsole();
    setStatus('running');
    setLastError(null);
    setExecutionTime(0);

    const result = await service.execute(
      code,
      (entry) => {
        addConsoleEntry(executionId, entry.type, entry.content, entry.args);
      },
      executionId
    );

    // Verify this execution is still active before updating global states
    const currentId = usePlaygroundStore.getState().currentExecutionId;
    if (currentId !== executionId) {
      return; // A new execution started or was stopped, ignore result
    }

    setStatus(result.status);
    setExecutionTime(result.executionTime);
    
    if (result.error) {
      setLastError(result.error);
      if (result.status === 'timeout') {
        addConsoleEntry(executionId, 'error', `Execution timed out after ${result.executionTime}ms.`);
      } else {
        const errType = result.error.name ? String(result.error.name).includes('SyntaxError') ? 'SyntaxError' : result.error.name : 'Error';
        // Format with line info if available
        let loc = '';
        if (result.error.line) loc += ` at line ${result.error.line}`;
        if (result.error.column) loc += `:${result.error.column}`;
        
        const safeMessage = getErrorMessage(result.error.message || result.error);
        addConsoleEntry(executionId, 'error', `${errType}: ${safeMessage}${loc}`);
        
        if (result.error.stack) {
          addConsoleEntry(executionId, 'error', getErrorMessage(result.error.stack));
        }
      }
    } else if (result.status === 'success') {
      addConsoleEntry(executionId, 'system', `✓ Completed in ${result.executionTime}ms`);
    }

  }, [code, clearConsole, setStatus, setLastError, setExecutionTime, addConsoleEntry, setCurrentExecutionId]);

  const stopExecution = useCallback(() => {
    const { activeTab, setStatus, addConsoleEntry, setCurrentExecutionId, currentExecutionId } = usePlaygroundStore.getState();
    
    if (activeTab === 'react') {
      return; // Stop doesn't do much for React preview yet
    }

    if (serviceRef.current) {
      if (currentExecutionId) {
        serviceRef.current.stop();
        setStatus('stopped');
        addConsoleEntry(currentExecutionId, 'system', '■ Execution stopped');
        setCurrentExecutionId(null);
      }
    }
  }, [setStatus, addConsoleEntry, setCurrentExecutionId]);

  return {
    executeCode,
    stopExecution
  };
}
