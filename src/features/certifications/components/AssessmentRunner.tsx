'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Certification, Question, ShuffledQuestion, AssessmentAttempt, Certificate } from '../types';
import { calculateScore, generateCertificateId, generateVerificationHash } from '../services/scoringService';
import { certificateRepository } from '../persistence/IndexedDBCertificateRepository';
import { Clock, AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Bookmark, Lock, ShieldAlert, LogOut } from 'lucide-react';
import { useAssessmentRestrictions, createTabSwitchMonitor, TabSwitchMonitor } from '../hooks/useAssessmentRestrictions';
import { AssessmentWarningModal } from './AssessmentWarningModal';
import { validateAndSanitizeLearnerName } from '../services/nameValidation';

interface AssessmentRunnerProps {
  certification: Certification;
  questions: (Question | ShuffledQuestion)[];
  learnerName: string;
  onCancel: () => void;
  onFinish: (attempt: AssessmentAttempt, certificate: Certificate | null) => void;
}

export function AssessmentRunner({
  certification,
  questions,
  learnerName,
  onCancel,
  onFinish,
}: AssessmentRunnerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const questionAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const tabMonitorRef = useRef<TabSwitchMonitor | null>(null);

  // Assessment flow state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(certification.durationMinutes * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);

  // Modals state
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [warningModal, setWarningModal] = useState<{
    isOpen: boolean;
    type: 'tab_switch' | 'prohibited_action';
  }>({
    isOpen: false,
    type: 'tab_switch',
  });

  // Termination handler for anti-cheating violations
  const handleTerminateAssessment = useCallback(
    async (reason = 'Assessment ended because the test rules were violated.') => {
      if (isSubmitting || isTerminated) return;
      setIsTerminated(true);
      setIsSubmitting(true);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      const timestamp = Date.now();
      const attempt: AssessmentAttempt = {
        id: crypto.randomUUID(),
        certificationId: certification.id,
        learnerName,
        score: 0,
        passed: false,
        totalQuestions: questions.length,
        correctAnswers: 0,
        answers,
        timestamp,
        terminated: true,
        terminationReason: reason,
      };

      try {
        await certificateRepository.saveAttempt(attempt);
      } catch (err) {
        console.error('Failed to save terminated attempt to IndexedDB:', err);
      }

      onFinish(attempt, null);
    },
    [answers, certification.id, isSubmitting, isTerminated, learnerName, onFinish, questions.length]
  );

  // Trigger prohibited action warning modal (throttled)
  const handleProhibitedActionDetected = useCallback(() => {
    if (isSubmitting || isTerminated) return;
    setWarningModal((prev) => {
      if (prev.isOpen) return prev; // Do not stack duplicate dialogs
      return {
        isOpen: true,
        type: 'prohibited_action',
      };
    });
  }, [isSubmitting, isTerminated]);

  // Hook for copy/paste/shortcut restrictions
  const { restrictionProps, restrictionNotice } = useAssessmentRestrictions(1500);

  // Monitor browser tab switches via Page Visibility API
  useEffect(() => {
    const monitor = createTabSwitchMonitor({
      onFirstViolation: () => {
        if (isSubmitting || isTerminated) return;
        setWarningModal({
          isOpen: true,
          type: 'tab_switch',
        });
      },
      onRepeatedViolation: () => {
        handleTerminateAssessment(
          'Assessment ended because the test rules were violated (multiple tab switches detected).'
        );
      },
    });

    tabMonitorRef.current = monitor;

    const onVisibilityChange = () => {
      monitor.handleVisibilityChange();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    // Prevent accidental reload or page leave
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleTerminateAssessment, isSubmitting, isTerminated]);

  // Trap focus inside the assessment interface
  useEffect(() => {
    // Focus question area on initial mount
    questionAreaRef.current?.focus();

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !containerRef.current) return;

      // If an active modal is open, let the modal trap focus
      const anyModalOpen =
        warningModal.isOpen || showSubmitConfirm || showExitConfirm;
      if (anyModalOpen) return;

      const focusable = containerRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [role="radio"], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || !containerRef.current.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !containerRef.current.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [warningModal.isOpen, showSubmitConfirm, showExitConfirm]);

  // Countdown timer effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTimeExpired = () => {
    if (!isSubmitting && !isTerminated) {
      submitAssessment();
    }
  };

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const isTimeLow = timeLeftSeconds <= 180; // 3 minutes or less

  const handleSelectOption = (optionId: string) => {
    if (isTerminated || isSubmitting) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const toggleFlag = (questionId: string) => {
    setFlagged((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const submitAssessment = async () => {
    if (isSubmitting || isTerminated) return;
    setIsSubmitting(true);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const calculation = calculateScore(questions, answers, certification.passingScore);
    const attemptId = crypto.randomUUID();
    const timestamp = Date.now();

    const nameValidation = validateAndSanitizeLearnerName(learnerName);
    const cleanLearnerName = nameValidation.valid ? nameValidation.sanitized : learnerName;

    let newCertificate: Certificate | null = null;

    // Disallow placeholder or invalid names from receiving certificates
    if (calculation.passed && nameValidation.valid) {
      const certId = generateCertificateId(certification.id);
      const hash = await generateVerificationHash({
        id: certId,
        certificationId: certification.id,
        learnerName: cleanLearnerName,
        score: calculation.score,
        issuedAt: timestamp,
      });

      newCertificate = {
        id: certId,
        certificationId: certification.id,
        certificationTitle: certification.title,
        learnerName: cleanLearnerName,
        score: calculation.score,
        issuedAt: timestamp,
        verificationHash: hash,
        status: 'valid',
      };

      await certificateRepository.saveCertificate(newCertificate);
    }

    const attempt: AssessmentAttempt = {
      id: attemptId,
      certificationId: certification.id,
      learnerName: cleanLearnerName,
      score: calculation.score,
      passed: calculation.passed && nameValidation.valid,
      totalQuestions: questions.length,
      correctAnswers: calculation.correctAnswers,
      answers,
      timestamp,
      certificateId: newCertificate?.id,
      terminated: false,
    };

    await certificateRepository.saveAttempt(attempt);
    onFinish(attempt, newCertificate);
  };

  // Keyboard navigation for options list
  const handleOptionKeyDown = (e: React.KeyboardEvent, optIdx: number, optionId: string) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleSelectOption(optionId);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextOpt = (optIdx + 1) % currentQuestion.options.length;
      const nextOptObj = currentQuestion.options[nextOpt];
      const nextId = typeof nextOptObj === 'string' ? String(nextOpt) : nextOptObj.id;
      handleSelectOption(nextId);
      const nextEl = document.getElementById(`option-${nextOpt}`);
      nextEl?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevOpt =
        (optIdx - 1 + currentQuestion.options.length) % currentQuestion.options.length;
      const prevOptObj = currentQuestion.options[prevOpt];
      const prevId = typeof prevOptObj === 'string' ? String(prevOpt) : prevOptObj.id;
      handleSelectOption(prevId);
      const prevEl = document.getElementById(`option-${prevOpt}`);
      prevEl?.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 bg-neutral-900/80 backdrop-blur-md flex flex-col justify-between overflow-y-auto outline-none"
    >
      {/* Top Header Bar */}
      <header className="sticky top-0 z-10 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setShowExitConfirm(true)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors"
          >
            Exit
          </button>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
              {certification.title}
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Candidate: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{learnerName}</span>
            </p>
          </div>
        </div>

        {/* Timer, Protection Status and Submit */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[11px] font-medium text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700/60 select-none">
            <Lock className="h-3 w-3 text-amber-500" />
            <span>Copy & paste disabled</span>
          </div>

          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-sm font-semibold transition-colors ${
              isTimeLow
                ? 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 animate-pulse'
                : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowSubmitConfirm(true)}
            disabled={isSubmitting || isTerminated}
            className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-xs sm:text-sm transition-colors shadow-xs"
          >
            Submit
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Progress & Question Navigation Palette */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-3">
              <span>
                {answeredCount} answered ({progressPercent}%)
              </span>
              <span className="text-neutral-400 dark:text-neutral-600">·</span>
              <span
                className={
                  questions.length - answeredCount > 0
                    ? 'text-amber-600 dark:text-amber-400 font-medium'
                    : 'text-emerald-600 dark:text-emerald-400 font-medium'
                }
              >
                {questions.length - answeredCount} unanswered
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Question Number Badges Grid */}
          <div className="flex flex-wrap gap-2 pt-1" role="toolbar" aria-label="Question selection toolbar">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = idx === currentIndex;
              const isQFlagged = flagged[q.id];

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all relative ${
                    isCurrent
                      ? 'ring-2 ring-blue-500 bg-blue-600 text-white shadow-xs'
                      : isAnswered
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                  aria-label={`Go to question ${idx + 1}`}
                >
                  {idx + 1}
                  {isQFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Question Card with Scoped Restrictions */}
        <div
          ref={questionAreaRef}
          tabIndex={-1}
          data-testid="assessment-question-area"
          className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs select-none outline-none"
          {...restrictionProps}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                {currentQuestion.topic}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
                {currentQuestion.difficulty}
              </span>
            </div>

            <button
              type="button"
              onClick={() => toggleFlag(currentQuestion.id)}
              className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${
                flagged[currentQuestion.id]
                  ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400'
                  : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>{flagged[currentQuestion.id] ? 'Flagged' : 'Flag for review'}</span>
            </button>
          </div>

          {/* Question Text */}
          <h2 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Optional Code Snippet */}
          {currentQuestion.codeSnippet && (
            <div className="p-4 bg-neutral-950 rounded-xl font-mono text-xs text-neutral-200 border border-neutral-800 overflow-x-auto leading-relaxed">
              <pre>{currentQuestion.codeSnippet}</pre>
            </div>
          )}

          {/* Multiple Choice Options */}
          <div className="space-y-3 pt-2" role="radiogroup" aria-label="Question options">
            {currentQuestion.options.map((option, optIdx) => {
              const optionId = typeof option === 'string' ? String(optIdx) : option.id;
              const optionText = typeof option === 'string' ? option : option.text;
              const isSelected = answers[currentQuestion.id] === optionId;
              const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

              return (
                <div
                  id={`option-${optIdx}`}
                  key={optionId}
                  onClick={() => handleSelectOption(optionId)}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isSelected ? 0 : 0}
                  onKeyDown={(e) => handleOptionKeyDown(e, optIdx, optionId)}
                  className={`group flex items-start gap-3.5 p-4 rounded-xl border text-sm cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 font-medium ring-1 ring-blue-500/40'
                      : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg border text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:border-blue-400'
                    }`}
                  >
                    {letter}
                  </div>
                  <span className="flex-1 select-none leading-relaxed text-sm">{optionText}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 disabled:opacity-40 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowSubmitConfirm(true)}
              disabled={isSubmitting || isTerminated}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white transition-colors shadow-xs"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Submit Assessment</span>
            </button>
          )}
        </div>
      </main>

      {/* In-app Exit Confirmation Modal */}
      {showExitConfirm && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-modal-title"
        >
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-2xl">
                <LogOut className="h-6 w-6" />
              </div>
              <h2 id="exit-modal-title" className="text-lg font-bold text-neutral-900 dark:text-white">
                Exit Assessment?
              </h2>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Are you sure you want to exit the assessment? Your current session and answered questions will not be saved.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowExitConfirm(false);
                  onCancel();
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-colors shadow-xs"
              >
                Exit Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-modal-title"
        >
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-2xl">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h2 id="submit-modal-title" className="text-lg font-bold text-neutral-900 dark:text-white">
                Submit Assessment?
              </h2>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              You have answered <strong>{answeredCount}</strong> of <strong>{questions.length}</strong> questions.
              {answeredCount < questions.length && (
                <span className="block mt-2 text-amber-600 dark:text-amber-400 font-medium">
                  Notice: You have {questions.length - answeredCount} unanswered questions that will be marked as incorrect.
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                disabled={isSubmitting}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
              >
                Continue Reviewing
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmitConfirm(false);
                  submitAssessment();
                }}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm transition-colors shadow-xs"
              >
                {isSubmitting ? 'Submitting...' : 'Yes, Submit Assessment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Anti-Cheating Warning Dialog (Tab Switch / Prohibited Action) */}
      <AssessmentWarningModal
        isOpen={warningModal.isOpen}
        type={warningModal.type}
        onReturn={() => setWarningModal((prev) => ({ ...prev, isOpen: false }))}
        onEndTest={() =>
          handleTerminateAssessment(
            'Assessment ended because the test rules were violated (candidate ended assessment following tab switch warning).'
          )
        }
      />

      {/* Floating Copy/Paste Restriction Notice Toast */}
      {restrictionNotice && (
        <div
          role="status"
          aria-live="polite"
          data-testid="restriction-notice-toast"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-70 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none"
        >
          <ShieldAlert className="h-4 w-4 text-amber-400 dark:text-amber-600 shrink-0" />
          <span>{restrictionNotice}</span>
        </div>
      )}
    </div>
  );
}
