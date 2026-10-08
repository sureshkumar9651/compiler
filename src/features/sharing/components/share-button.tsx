import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { ShareDialog } from './share-dialog';

export function ShareButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsDialogOpen(true)}
        className="flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Share Code"
        aria-label="Share Code"
      >
        <Share2 className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Share</span>
      </button>

      <ShareDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </>
  );
}
