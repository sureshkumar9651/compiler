'use client';

import React, { useState } from 'react';
import { AssessmentAttempt, Certificate, Question, Certification } from '../types';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Download,
  Copy,
  ExternalLink,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { CertificateDocument } from './CertificateDocument';
import { downloadCertificatePdf } from '../services/pdfCertificateService';

interface AssessmentResultProps {
  attempt: AssessmentAttempt;
  certificate: Certificate | null;
  certification: Certification;
  questions: Question[];
  onRetake: () => void;
  onViewCertificate: (cert: Certificate) => void;
  onBackToOverview: () => void;
}

export function AssessmentResult({
  attempt,
  certificate,
  certification,
  questions,
  onRetake,
  onViewCertificate,
  onBackToOverview,
}: AssessmentResultProps) {
  const [showReview, setShowReview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const passed = !attempt.terminated && attempt.passed;
  const isTerminated = !!attempt.terminated;

  const verificationUrl =
    certificate && typeof window !== 'undefined'
      ? `${window.location.origin}/certifications/verify?id=${certificate.id}`
      : certificate
      ? `/certifications/verify?id=${certificate.id}`
      : '';

  const handleCopyLink = () => {
    if (!verificationUrl) return;
    navigator.clipboard.writeText(verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadPdf = async () => {
    if (!certificate || isDownloading) return;
    setIsDownloading(true);
    setDownloadError(null);

    try {
      await downloadCertificatePdf(certificate);
    } catch (err) {
      console.error('Failed to generate PDF certificate:', err);
      setDownloadError('Could not generate the certificate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Result Card Header */}
      <div
        className={`border rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-sm ${
          isTerminated
            ? 'bg-gradient-to-b from-red-50/80 to-white dark:from-red-950/30 dark:to-neutral-900 border-red-300 dark:border-red-900/60'
            : passed
            ? 'bg-gradient-to-b from-emerald-50/70 to-white dark:from-emerald-950/20 dark:to-neutral-900 border-emerald-200 dark:border-emerald-800/60'
            : 'bg-gradient-to-b from-red-50/70 to-white dark:from-red-950/20 dark:to-neutral-900 border-red-200 dark:border-red-900/50'
        }`}
      >
        <div className="inline-flex items-center justify-center p-4 rounded-3xl shadow-sm bg-white dark:bg-neutral-800">
          {isTerminated ? (
            <ShieldAlert className="h-14 w-14 sm:h-16 sm:w-16 text-red-600 dark:text-red-500" />
          ) : passed ? (
            <Award className="h-14 w-14 sm:h-16 sm:w-16 text-emerald-500 animate-bounce" />
          ) : (
            <XCircle className="h-14 w-14 sm:h-16 sm:w-16 text-red-500" />
          )}
        </div>

        <div className="space-y-2">
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${
              isTerminated
                ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                : passed
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                : 'bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300'
            }`}
          >
            {isTerminated
              ? 'Assessment Terminated'
              : passed
              ? 'Assessment Passed'
              : 'Assessment Not Passed'}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight">
            {isTerminated
              ? 'Assessment ended because the test rules were violated.'
              : passed
              ? 'Congratulations, ' + attempt.learnerName + '!'
              : 'Keep Practicing, ' + attempt.learnerName}
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
            {isTerminated
              ? attempt.terminationReason ||
                'This assessment was terminated due to a violation of the test rules (such as navigating away or switching browser tabs). No certificate has been awarded for this attempt.'
              : passed
              ? `You demonstrated comprehensive proficiency in ${certification.title} with a qualifying score of ${attempt.score}%. Your certificate is ready!`
              : `You scored ${attempt.score}%. You need at least ${certification.passingScore}% to earn the certificate. Review your answers below and try again.`}
          </p>
        </div>

        {/* Score metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto py-4 border-y border-neutral-200/80 dark:border-neutral-800">
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Final Score</p>
            <p className="text-2xl font-black text-neutral-900 dark:text-white mt-0.5">
              {attempt.score}%
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Passing Threshold</p>
            <p className="text-2xl font-black text-neutral-900 dark:text-white mt-0.5">
              {certification.passingScore}%
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Correct Answers</p>
            <p className="text-2xl font-black text-neutral-900 dark:text-white mt-0.5">
              {attempt.correctAnswers} / {attempt.totalQuestions}
            </p>
          </div>
        </div>

        {/* Action Buttons for non-passed attempts */}
        {!passed && (
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onRetake}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-xs"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retake Assessment</span>
            </button>

            <button
              type="button"
              onClick={() => setShowReview(!showReview)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium text-sm transition-colors"
            >
              <span>{showReview ? 'Hide Question Breakdown' : 'Review Questions & Explanations'}</span>
              {showReview ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={onBackToOverview}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white font-medium text-sm transition-colors"
            >
              <span>All Certifications</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Official Certificate Section (Rendered Only for Valid Passed Attempts) */}
      {passed && certificate && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Certificate Actions Bar (Strictly outside PDF content) */}
          <div className="flex items-center justify-between gap-4 flex-wrap bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Official Credential Ready
              </p>
              <p className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                Certificate ID: <span className="font-mono">{certificate.id}</span>
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Copy verification link"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                {copiedLink ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4 text-neutral-400" />
                )}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Verify Link'}</span>
              </button>

              <Link
                href={`/certifications/verify?id=${certificate.id}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                <ExternalLink className="h-4 w-4 text-neutral-400" />
                <span>Verify Credential</span>
              </Link>

              {/* Primary Action: PDF-Only Download */}
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isDownloading}
                aria-label="Download Certificate as PDF"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm transition-colors shadow-md hover:shadow-lg shadow-blue-600/20"
              >
                <Download className="h-4 w-4" />
                <span>{isDownloading ? 'Generating PDF...' : 'Download Certificate (PDF)'}</span>
              </button>
            </div>
          </div>

          {/* Download Error Banner */}
          {downloadError && (
            <div
              role="alert"
              className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs sm:text-sm text-red-700 dark:text-red-300 flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{downloadError}</span>
            </div>
          )}

          {/* Centered, Scalable, Responsive Certificate Document Preview */}
          <div className="w-full overflow-x-auto py-2">
            <CertificateDocument certificate={certificate} />
          </div>

          {/* Bottom Navigation for Passed Assessment */}
          <div className="flex items-center justify-between gap-4 pt-2 flex-wrap">
            <button
              type="button"
              onClick={() => setShowReview(!showReview)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <span>{showReview ? 'Hide Question Breakdown' : 'Review Questions & Explanations'}</span>
              {showReview ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={onBackToOverview}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-semibold text-xs sm:text-sm transition-colors shadow-xs"
            >
              <span>All Certifications</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Question Review Section */}
      {showReview && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
              Question Review & Explanations
            </h2>
            <span className="text-xs text-neutral-500">
              {attempt.correctAnswers} of {attempt.totalQuestions} answered correctly
            </span>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const selectedIdx = attempt.answers[q.id];
              const isCorrect = selectedIdx === q.correctAnswerIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border text-left space-y-3 bg-white dark:bg-neutral-900 ${
                    isCorrect
                      ? 'border-emerald-200 dark:border-emerald-900/60'
                      : 'border-red-200 dark:border-red-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      Question {idx + 1} · {q.topic}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                          : 'bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400'
                      }`}
                    >
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {q.question}
                  </p>

                  {q.codeSnippet && (
                    <div className="p-3 bg-neutral-950 rounded-xl font-mono text-xs text-neutral-200 border border-neutral-800 overflow-x-auto">
                      <pre>{q.codeSnippet}</pre>
                    </div>
                  )}

                  <div className="space-y-2 pt-1 text-xs">
                    {q.options.map((option, optIdx) => {
                      const isOptionSelected = selectedIdx === optIdx;
                      const isOptionCorrect = q.correctAnswerIndex === optIdx;

                      let badgeClass = 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300';
                      if (isOptionCorrect) {
                        badgeClass = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 font-semibold';
                      } else if (isOptionSelected && !isOptionCorrect) {
                        badgeClass = 'border-red-500 bg-red-50/70 dark:bg-red-950/50 text-red-800 dark:text-red-200 line-through';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-lg border flex items-center justify-between gap-3 ${badgeClass}`}
                        >
                          <span>{option}</span>
                          {isOptionCorrect && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                              Correct Answer
                            </span>
                          )}
                          {isOptionSelected && !isOptionCorrect && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                              Your Answer
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                    <p className="font-semibold text-neutral-700 dark:text-neutral-300">Explanation:</p>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
