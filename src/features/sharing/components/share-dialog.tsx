import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Check, Copy, AlertTriangle, Link as LinkIcon, Share2 } from 'lucide-react';
import { shareService } from '../services/share-service';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { useProjectStore } from '@/store/useProjectStore';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type ShareState = 'idle' | 'generating' | 'ready' | 'copied' | 'too-large' | 'invalid';

export function ShareDialog({ isOpen, onClose }: ShareDialogProps) {
  const [state, setState] = useState<ShareState>('idle');
  const [shareUrl, setShareUrl] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  
  const { code } = usePlaygroundStore();
  const { projects, activeProjectId } = useProjectStore();

  const generateLink = useCallback(async () => {
    setState('generating');
    
    try {
      // Small delay to show generating state if it's too fast
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const activeProject = projects.find(p => p.id === activeProjectId);
      const title = activeProject?.name !== 'Untitled JavaScript' ? activeProject?.name : undefined;
      
      const result = shareService.createShareUrl({
        version: 1,
        code,
        title: typeof title === 'string' ? title : undefined
      });

      if (result.isOversized) {
        setState('too-large');
      } else {
        setShareUrl(result.url);
        setState('ready');
      }
    } catch (err) {
      console.error('Error generating share link:', err);
      setState('invalid');
    }
  }, [code, projects, activeProjectId]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => generateLink(), 0);
    } else {
      // Reset state when closed
      setTimeout(() => {
        setState('idle');
        setShareUrl('');
      }, 300);
    }
  }, [isOpen, generateLink]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Trap focus roughly
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen, state]);



  const copyToClipboard = async () => {
    try {
      if (navigator.share) {
        // Try native share API if available, fallback to clipboard
        try {
          await navigator.share({
            title: 'Shared JavaScript Code',
            url: shareUrl
          });
          return;
        } catch (err) {
          if ((err as Error).name !== 'AbortError') {
             // Fallback to clipboard if native share fails and wasn't manually aborted
          } else {
             return; // user cancelled native share
          }
        }
      }
      
      await navigator.clipboard.writeText(shareUrl);
      setState('copied');
      setTimeout(() => {
        if (isOpen) setState('ready');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback is handled by the input field being selectable
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div 
        ref={dialogRef}
        role="dialog" 
        aria-modal="true"
        aria-labelledby="share-dialog-title"
        className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
          <h2 id="share-dialog-title" className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
            <Share2 className="h-5 w-5 text-blue-500" />
            Share JavaScript
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:text-neutral-300 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {state === 'generating' && (
            <div className="flex flex-col items-center justify-center py-6 text-neutral-500 dark:text-neutral-400">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p>Generating link...</p>
            </div>
          )}

          {(state === 'ready' || state === 'copied') && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Anyone with this link can view and edit this code in JS CodeLab.
              </p>
              
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-4 w-4 text-neutral-400" />
                </div>
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  onFocus={(e) => e.target.select()}
                  className="block w-full pl-10 pr-3 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-xl leading-5 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center gap-2 px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                    state === 'copied' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {state === 'copied' ? (
                    <>
                      <Check className="h-4 w-4" />
                      Link Copied ✓
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {state === 'too-large' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800/50">
                <AlertTriangle className="h-6 w-6 shrink-0" />
                <p className="text-sm font-medium">
                  This code is too large to share using a URL.
                </p>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                The generated link exceeds safe browser limits. Try removing unnecessary code, comments, or base64 data to create a shorter link.
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-sm font-medium text-white bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {state === 'invalid' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800/50">
                <AlertTriangle className="h-6 w-6 shrink-0" />
                <p className="text-sm font-medium">
                  Unable to generate a share link.
                </p>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-sm font-medium text-white bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
