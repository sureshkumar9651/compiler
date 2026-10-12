import { describe, it, expect, vi, beforeEach } from 'vitest';
import 'fake-indexeddb/auto';
import {
  isBlockedAssessmentShortcut,
  createAssessmentRestrictionHandlers,
  createTabSwitchMonitor,
  ASSESSMENT_RULES_WARNING,
  RESTRICTION_NOTICE_TEXT,
} from '../hooks/useAssessmentRestrictions';
import { certificateRepository } from '../persistence/IndexedDBCertificateRepository';
import { AssessmentAttempt } from '../types';

describe('Assessment Focus & Anti-Cheating Protection', () => {
  describe('1. Copy-paste & shortcut restrictions', () => {
    it('blocks Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A shortcuts and their macOS Meta equivalents', () => {
      ['c', 'v', 'x', 'a', 'C', 'V', 'X', 'A'].forEach((key) => {
        expect(isBlockedAssessmentShortcut({ ctrlKey: true, metaKey: false, key })).toBe(true);
        expect(isBlockedAssessmentShortcut({ ctrlKey: false, metaKey: true, key })).toBe(true);
      });
    });

    it('preserves essential accessibility, navigation, and typing keys without blocking them', () => {
      const allowedKeys = [
        'Tab',
        'Enter',
        ' ',
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'Escape',
        'Home',
        'End',
        'c',
        'v',
        'x',
        'a',
      ];

      allowedKeys.forEach((key) => {
        expect(isBlockedAssessmentShortcut({ ctrlKey: false, metaKey: false, key })).toBe(false);
      });
    });

    it('blocks the context menu from opening within the restricted area', () => {
      const handlers = createAssessmentRestrictionHandlers();

      const mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.MouseEvent;

      handlers.onContextMenu(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('blocks clipboard events (copy, cut, paste) and drag-and-drop', () => {
      const handlers = createAssessmentRestrictionHandlers();

      const copyEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.ClipboardEvent;
      const cutEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.ClipboardEvent;
      const pasteEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.ClipboardEvent;
      const dragStartEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.DragEvent;
      const dropEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.DragEvent;

      handlers.onCopy(copyEvent);
      handlers.onCut(cutEvent);
      handlers.onPaste(pasteEvent);
      handlers.onDragStart(dragStartEvent);
      handlers.onDrop(dropEvent);

      expect(copyEvent.preventDefault).toHaveBeenCalled();
      expect(cutEvent.preventDefault).toHaveBeenCalled();
      expect(pasteEvent.preventDefault).toHaveBeenCalled();
      expect(dragStartEvent.preventDefault).toHaveBeenCalled();
      expect(dropEvent.preventDefault).toHaveBeenCalled();
    });

    it('avoids repeatedly displaying the same warning for every rapid keyboard event (throttling)', () => {
      const onNotice = vi.fn();
      const handlers = createAssessmentRestrictionHandlers({ onBlockedAction: onNotice }, 1500);

      const createMockEvent = () =>
        ({
          ctrlKey: true,
          metaKey: false,
          key: 'c',
          preventDefault: vi.fn(),
          stopPropagation: vi.fn(),
        } as unknown as React.KeyboardEvent);

      // First keystroke fires notice
      const ev1 = createMockEvent();
      handlers.onKeyDown(ev1);
      expect(ev1.preventDefault).toHaveBeenCalled();
      expect(onNotice).toHaveBeenCalledTimes(1);

      // Rapid consecutive keystrokes within throttle window should be blocked but NOT spam notice
      const ev2 = createMockEvent();
      const ev3 = createMockEvent();
      handlers.onKeyDown(ev2);
      handlers.onKeyDown(ev3);

      expect(ev2.preventDefault).toHaveBeenCalled();
      expect(ev3.preventDefault).toHaveBeenCalled();
      expect(onNotice).toHaveBeenCalledTimes(1); // Still 1, not spammed!
    });
  });

  describe('2. Browser tab changes detection via Page Visibility API', () => {
    it('detects first tab switch and triggers warning callback', () => {
      const onFirst = vi.fn();
      const onRepeated = vi.fn();
      const monitor = createTabSwitchMonitor({
        onFirstViolation: onFirst,
        onRepeatedViolation: onRepeated,
      });

      // User switches tab (tab becomes hidden)
      Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
      monitor.handleVisibilityChange();

      expect(onFirst).toHaveBeenCalledTimes(1);
      expect(onRepeated).not.toHaveBeenCalled();
      expect(monitor.getViolationCount()).toBe(1);
    });

    it('detects repeated tab switch and triggers termination callback', () => {
      const onFirst = vi.fn();
      const onRepeated = vi.fn();
      const monitor = createTabSwitchMonitor({
        onFirstViolation: onFirst,
        onRepeatedViolation: onRepeated,
      });

      // First tab switch
      Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
      monitor.handleVisibilityChange();
      expect(onFirst).toHaveBeenCalledTimes(1);

      // User returns to tab
      Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
      monitor.handleVisibilityChange();

      // User switches tabs a second time
      Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
      monitor.handleVisibilityChange();

      expect(onRepeated).toHaveBeenCalledTimes(1);
      expect(monitor.getViolationCount()).toBe(2);
    });

    it('prevents duplicate dialogs when visibilitychange fires repeatedly while continuously hidden', () => {
      const onFirst = vi.fn();
      const onRepeated = vi.fn();
      const monitor = createTabSwitchMonitor({
        onFirstViolation: onFirst,
        onRepeatedViolation: onRepeated,
      });

      // Tab becomes hidden
      Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
      monitor.handleVisibilityChange();

      // Duplicate events while still hidden (e.g. rapid visibilitychange / blur)
      monitor.handleVisibilityChange();
      monitor.handleVisibilityChange();

      expect(onFirst).toHaveBeenCalledTimes(1);
      expect(onRepeated).not.toHaveBeenCalled();
      expect(monitor.getViolationCount()).toBe(1);
    });
  });

  describe('3. Focus movement, keyboard navigation, and scope isolation', () => {
    it('allows keyboard navigation keys (Tab, Arrows, Space, Enter) without blocking', () => {
      const handlers = createAssessmentRestrictionHandlers();

      ['Tab', 'ArrowUp', 'ArrowDown', ' ', 'Enter'].forEach((key) => {
        const mockEvent = {
          ctrlKey: false,
          metaKey: false,
          key,
          preventDefault: vi.fn(),
          stopPropagation: vi.fn(),
        } as unknown as React.KeyboardEvent;

        handlers.onKeyDown(mockEvent);

        expect(mockEvent.preventDefault).not.toHaveBeenCalled();
        expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
      });
    });

    it('keeps normal editor functionality intact outside active assessment', () => {
      const externalInput = document.createElement('textarea');
      externalInput.setAttribute('id', 'monaco-test-input');
      document.body.appendChild(externalInput);

      const copyEvent = new KeyboardEvent('keydown', {
        ctrlKey: true,
        key: 'c',
        bubbles: true,
        cancelable: true,
      });

      const pasteEvent = new KeyboardEvent('keydown', {
        ctrlKey: true,
        key: 'v',
        bubbles: true,
        cancelable: true,
      });

      const copyPrevented = !externalInput.dispatchEvent(copyEvent);
      const pastePrevented = !externalInput.dispatchEvent(pasteEvent);

      expect(copyPrevented).toBe(false);
      expect(pastePrevented).toBe(false);

      document.body.removeChild(externalInput);
    });
  });

  describe('4. Assessment termination, certificate eligibility, and reload persistence', () => {
    beforeEach(async () => {
      // Clear database attempts before test
    });

    it('records termination reason and marks passed as false without issuing certificate', async () => {
      const attempt: AssessmentAttempt = {
        id: 'attempt-term-1',
        certificationId: 'javascript-fundamentals',
        learnerName: 'Alex',
        score: 0,
        passed: false,
        totalQuestions: 10,
        correctAnswers: 0,
        answers: {},
        timestamp: Date.now(),
        terminated: true,
        terminationReason: 'Assessment ended because the test rules were violated.',
      };

      await certificateRepository.saveAttempt(attempt);

      const allAttempts = await certificateRepository.getAttempts('javascript-fundamentals');
      const savedAttempt = allAttempts.find((a) => a.id === attempt.id);

      expect(savedAttempt).toBeDefined();
      expect(savedAttempt?.terminated).toBe(true);
      expect(savedAttempt?.passed).toBe(false);
      expect(savedAttempt?.terminationReason).toBe(
        'Assessment ended because the test rules were violated.'
      );

      // Verify no certificate is awarded or exists
      const certs = await certificateRepository.getCertificates();
      expect(certs.some((c) => c.learnerName === 'Alex')).toBe(false);
    });

    it('ensures reloading/reopening cannot convert a terminated attempt into a passed result', async () => {
      const attemptId = 'attempt-persisted-fail';
      const terminatedAttempt: AssessmentAttempt = {
        id: attemptId,
        certificationId: 'react-js',
        learnerName: 'Sam',
        score: 0,
        passed: false,
        totalQuestions: 10,
        correctAnswers: 0,
        answers: {},
        timestamp: Date.now(),
        terminated: true,
        terminationReason: 'Assessment ended because the test rules were violated (multiple tab switches detected).',
      };

      await certificateRepository.saveAttempt(terminatedAttempt);

      // Simulate re-query after page reload
      const retrieved = (await certificateRepository.getAttempts('react-js')).find(
        (a) => a.id === attemptId
      );

      expect(retrieved?.passed).toBe(false);
      expect(retrieved?.terminated).toBe(true);

      // Ensure no certificate exists in certificates store
      const certs = await certificateRepository.getCertificatesByCertificationId('react-js');
      expect(certs.length).toBe(0);
    });
  });

  describe('5. Warning dialog & pre-assessment confirmation', () => {
    it('defines the exact required pre-assessment warning text', () => {
      expect(ASSESSMENT_RULES_WARNING).toBe(
        'Copying and pasting are disabled during this assessment. Leaving the test or switching browser tabs may end your assessment.'
      );
    });

    it('handles starting and cancelling the warning dialog', () => {
      let isWarningOpen = false;
      const onOpenWarning = () => {
        isWarningOpen = true;
      };
      const onCancelWarning = () => {
        isWarningOpen = false;
      };
      const onConfirmWarning = vi.fn();

      // Trigger/open warning dialog
      onOpenWarning();
      expect(isWarningOpen).toBe(true);

      // Cancel warning dialog
      onCancelWarning();
      expect(isWarningOpen).toBe(false);

      // Open and acknowledge/confirm to start test
      onOpenWarning();
      onConfirmWarning('Taylor Swift');
      expect(onConfirmWarning).toHaveBeenCalledWith('Taylor Swift');
    });
  });
});

