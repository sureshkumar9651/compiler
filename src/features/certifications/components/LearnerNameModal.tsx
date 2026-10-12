'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Certification } from '../types';
import { X, Award, AlertCircle, ArrowRight, ShieldAlert, Check } from 'lucide-react';
import { ASSESSMENT_RULES_WARNING } from '../hooks/useAssessmentRestrictions';
import { validateAndSanitizeLearnerName } from '../services/nameValidation';

interface LearnerNameModalProps {
  certification: Certification;
  onClose: () => void;
  onConfirm: (learnerName: string) => void;
}

export function LearnerNameModal({
  certification,
  onClose,
  onConfirm,
}: LearnerNameModalProps) {
  const [name, setName] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const nameValidation = validateAndSanitizeLearnerName(name);
  const isReadyToStart = nameValidation.valid && acknowledged;


  // Accessible focus trap and Escape key listener
  useEffect(() => {
    nameInputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameValidation.valid) {
      setError(nameValidation.error || 'Please enter your actual full name.');
      return;
    }
    if (!acknowledged) {
      setError('You must acknowledge the anti-cheating and test rules to start.');
      return;
    }
    setError(null);
    onConfirm(nameValidation.sanitized);
  };


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h2
                id="modal-title"
                className="font-bold text-neutral-900 dark:text-white text-base"
              >
                Start Certification Assessment
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {certification.title}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="learner-name-input"
              className="block text-sm font-semibold text-neutral-900 dark:text-neutral-100"
            >
              Your Full Name
            </label>
            <input
              id="learner-name-input"
              ref={nameInputRef}
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. Alex Morgan"
              className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-neutral-100 transition-shadow"
            />
            {error && (
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5 mt-1">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* Certificate Name Preview */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/80 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Certificate Name Appearance
            </p>
            <div className="p-3 bg-white dark:bg-neutral-900 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 text-center">
              <span className="text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100 italic">
                {nameValidation.valid ? nameValidation.sanitized : 'Your Official Name'}
              </span>
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Please enter your full legal or professional name as you would like it displayed on the downloadable certificate.
            </p>
          </div>

          {/* Anti-Cheating & Assessment Rules Notice */}
          <div
            id="modal-description"
            className="space-y-3 text-xs bg-amber-50/60 dark:bg-amber-950/20 p-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/40"
          >
            <div className="flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300">
              <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>Assessment Anti-Cheating Rules</span>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-100/70 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 font-medium leading-relaxed border border-amber-200 dark:border-amber-800/50">
              “{ASSESSMENT_RULES_WARNING}”
            </div>

            <ul className="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300 pt-1">
              <li>Assessment contains <strong>{certification.totalQuestions} questions</strong> ({certification.durationMinutes} minutes limit).</li>
              <li>Passing score is <strong>{certification.passingScore}% or higher</strong>.</li>
              <li>Switching tabs once displays an in-test warning dialog.</li>
              <li>Leaving or switching tabs a second time will <strong>immediately terminate the assessment</strong>.</li>
              <li>No certificate is issued for terminated attempts.</li>
            </ul>

            {/* User Acknowledgement Checkbox */}
            <label
              htmlFor="rules-acknowledgement"
              className="flex items-start gap-2.5 pt-2 cursor-pointer select-none text-neutral-900 dark:text-neutral-100 font-medium"
            >
              <input
                id="rules-acknowledgement"
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => {
                  setAcknowledged(e.target.checked);
                  if (error) setError(null);
                }}
                className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs leading-normal">
                I understand and agree to the assessment rules, copy-paste restrictions, and tab-switch policy.
              </span>
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isReadyToStart}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm transition-colors shadow-xs"
            >
              <span>Start Test</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
