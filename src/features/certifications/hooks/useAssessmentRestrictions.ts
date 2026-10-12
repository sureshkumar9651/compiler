'use client';

import React, { useState, useCallback, useRef } from 'react';

export interface AssessmentRestrictionsProps {
  onKeyDown: (e: React.KeyboardEvent) => void;
  onCopy: (e: React.ClipboardEvent) => void;
  onPaste: (e: React.ClipboardEvent) => void;
  onCut: (e: React.ClipboardEvent) => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onDragStart: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
}

export interface RestrictionHandlerCallbacks {
  onBlockedAction?: (message: string) => void;
}

export const ASSESSMENT_RULES_WARNING =
  'Copying and pasting are disabled during this assessment. Leaving the test or switching browser tabs may end your assessment.';

export const RESTRICTION_NOTICE_TEXT =
  'Copying and pasting are disabled during this assessment.';

/**
 * Checks if a keyboard event matches restricted shortcuts:
 * Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A or their macOS Command (metaKey) equivalents.
 */
export function isBlockedAssessmentShortcut(event: {
  ctrlKey?: boolean;
  metaKey?: boolean;
  key?: string;
}): boolean {
  if (!event.ctrlKey && !event.metaKey) return false;
  const key = event.key ? event.key.toLowerCase() : '';
  return key === 'c' || key === 'v' || key === 'x' || key === 'a';
}

/**
 * Pure factory creating scoped restriction handlers for React elements.
 * Throttles warning callbacks to avoid flooding the user on every rapid keystroke.
 */
export function createAssessmentRestrictionHandlers(
  callbacks?: RestrictionHandlerCallbacks,
  throttleMs = 1500
): AssessmentRestrictionsProps {
  let lastNoticeTimestamp = 0;

  const triggerNotice = () => {
    const now = Date.now();
    if (now - lastNoticeTimestamp >= throttleMs) {
      lastNoticeTimestamp = now;
      callbacks?.onBlockedAction?.(ASSESSMENT_RULES_WARNING);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isBlockedAssessmentShortcut(e)) {
      e.preventDefault();
      e.stopPropagation();
      triggerNotice();
    }
  };

  const handleClipboardEvent = (e: React.ClipboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    triggerNotice();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return {
    onKeyDown: handleKeyDown,
    onCopy: handleClipboardEvent,
    onPaste: handleClipboardEvent,
    onCut: handleClipboardEvent,
    onContextMenu: handleContextMenu,
    onDragStart: handleDragDrop,
    onDrop: handleDragDrop,
    onDragOver: handleDragDrop,
  };
}

export interface TabSwitchMonitorCallbacks {
  onFirstViolation: () => void;
  onRepeatedViolation: () => void;
}

export interface TabSwitchMonitor {
  handleVisibilityChange: () => void;
  getViolationCount: () => number;
  reset: () => void;
}

/**
 * Pure state machine detecting tab switches using Page Visibility API.
 * Suppresses duplicate events while the page is continuously hidden.
 */
export function createTabSwitchMonitor(callbacks: TabSwitchMonitorCallbacks): TabSwitchMonitor {
  let violationCount = 0;
  let isCurrentlyHidden = false;

  const handleVisibilityChange = () => {
    if (typeof document === 'undefined') return;

    if (document.visibilityState === 'hidden') {
      // Prevent duplicate triggers if visibilitychange or blur fires repeatedly while hidden
      if (isCurrentlyHidden) return;
      isCurrentlyHidden = true;

      if (violationCount === 0) {
        violationCount = 1;
        callbacks.onFirstViolation();
      } else {
        violationCount += 1;
        callbacks.onRepeatedViolation();
      }
    } else if (document.visibilityState === 'visible') {
      isCurrentlyHidden = false;
    }
  };

  return {
    handleVisibilityChange,
    getViolationCount: () => violationCount,
    reset: () => {
      violationCount = 0;
      isCurrentlyHidden = false;
    },
  };
}

/**
 * Hook providing scoped copy-paste and context-menu restrictions for active assessments.
 *
 * NOTE ON INTEGRITY:
 * These browser-side restrictions discourage casual copying and pasting.
 * However, client-side restrictions can be bypassed and cannot prevent screenshots,
 * external devices, or developer-tools usage.
 */
export function useAssessmentRestrictions(throttleMs = 1500) {
  const [restrictionNotice, setRestrictionNotice] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showNotice = useCallback((message = ASSESSMENT_RULES_WARNING) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setRestrictionNotice(message);
    timeoutRef.current = setTimeout(() => {
      setRestrictionNotice(null);
    }, 2800);
  }, []);

  const restrictionProps = React.useMemo(() => {
    return createAssessmentRestrictionHandlers(
      {
        onBlockedAction: showNotice,
      },
      throttleMs
    );
  }, [showNotice, throttleMs]);

  return {
    restrictionProps,
    restrictionNotice,
    dismissNotice: () => setRestrictionNotice(null),
    showNotice,
  };
}
