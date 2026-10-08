'use client';

import { Square } from 'lucide-react';

interface StopButtonProps {
  onStop: () => void;
  isVisible: boolean;
}

export function StopButton({ onStop, isVisible }: StopButtonProps) {
  if (!isVisible) return null;

  return (
    <button
      onClick={onStop}
      title="Stop Execution"
      className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      <Square className="h-4 w-4" fill="currentColor" />
      <span>Stop</span>
    </button>
  );
}
