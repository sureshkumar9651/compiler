'use client';

import React, { useEffect, useRef } from 'react';
import { ShieldAlert, AlertTriangle, ArrowLeft, XCircle } from 'lucide-react';
import { ASSESSMENT_RULES_WARNING } from '../hooks/useAssessmentRestrictions';

export interface AssessmentWarningModalProps {
  type: 'tab_switch' | 'prohibited_action';
  isOpen: boolean;
  onReturn: () => void;
  onEndTest?: () => void;
}

export function AssessmentWarningModal({
  type,
  isOpen,
  onReturn,
  onEndTest,
}: AssessmentWarningModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const returnButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    returnButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key returns to assessment
      if (e.key === 'Escape') {
        e.preventDefault();
        onReturn();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onReturn]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="warning-modal-title"
      aria-describedby="warning-modal-desc"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-neutral-900 border-2 border-amber-400 dark:border-amber-600 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-2xl shrink-0">
            {type === 'tab_switch' ? (
              <AlertTriangle className="h-6 w-6" />
            ) : (
              <ShieldAlert className="h-6 w-6" />
            )}
          </div>
          <div>
            <h2
              id="warning-modal-title"
              className="text-lg font-bold text-neutral-900 dark:text-white leading-snug"
            >
              {type === 'tab_switch'
                ? 'Warning: Browser Tab Switch Detected'
                : 'Prohibited Action Detected'}
            </h2>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
              Assessment Anti-Cheating Protection
            </p>
          </div>
        </div>

        <div id="warning-modal-desc" className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
          {type === 'tab_switch' ? (
            <>
              <p>
                You left the assessment window or switched browser tabs. This action has been recorded as a focus-loss violation.
              </p>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 font-semibold leading-relaxed">
                Leaving the test or switching browser tabs again will automatically terminate your assessment and disqualify you from certification.
              </div>
            </>
          ) : (
            <>
              <p>
                {ASSESSMENT_RULES_WARNING}
              </p>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 font-semibold leading-relaxed">
                Copy, paste, cut, select-all, and drag-and-drop are blocked to preserve credential integrity.
              </div>
            </>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {type === 'tab_switch' && onEndTest && (
            <button
              type="button"
              onClick={onEndTest}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40 transition-colors"
            >
              <XCircle className="h-4 w-4" />
              <span>End Test</span>
            </button>
          )}

          <button
            ref={returnButtonRef}
            type="button"
            onClick={onReturn}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-xs"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Assessment</span>
          </button>
        </div>
      </div>
    </div>
  );
}
