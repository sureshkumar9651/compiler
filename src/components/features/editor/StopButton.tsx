'use client';

import { Square } from 'lucide-react';

interface StopButtonProps {
  onStop: () => void;
  isVisible: boolean;
}

export function StopButton({ onStop, isVisible }: StopButtonProps) {
  return (
    <button
      onClick={onStop}
      title="Stop Execution"
      disabled={!isVisible}
      className={`flex items-center justify-center gap-2 rounded-md py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out w-[80px] ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none w-0 overflow-hidden px-0 sm:w-[80px]'
      }`}
    >
      <Square className="h-4 w-4 shrink-0" fill="currentColor" />
      <span className="shrink-0">Stop</span>
    </button>
  );
}
