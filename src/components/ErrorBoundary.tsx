import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] w-full bg-neutral-50 dark:bg-neutral-900 p-8 text-center rounded-lg border border-neutral-200 dark:border-neutral-800">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Something went wrong</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4 max-w-md">
            An unexpected error occurred in this section of the application. The error has been logged.
          </p>
          {this.state.error && (
            <div className="w-full max-w-2xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 p-4 rounded-md text-left text-xs font-mono overflow-auto mb-8 border border-red-100 dark:border-red-900/30">
              <p className="font-bold mb-1">{this.state.error.name}: {this.state.error.message}</p>
              <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
            </div>
          )}
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-md font-medium transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
