'use client';

import React, { useState } from 'react';
import { Certification, Certificate } from '../types';
import { FileCode2, Atom, Clock, Award, CheckCircle2, BookOpen, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface CertificationCardProps {
  certification: Certification;
  earnedCertificate?: Certificate;
  onStartAssessment: (certification: Certification) => void;
  onViewCertificate?: (certificate: Certificate) => void;
}

export function CertificationCard({
  certification,
  earnedCertificate,
  onStartAssessment,
  onViewCertificate,
}: CertificationCardProps) {
  const [isSyllabusExpanded, setIsSyllabusExpanded] = useState(false);

  const isReact = certification.iconName === 'react';

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all">
      <div className="space-y-6">
        {/* Header with Icon, Badge & Title */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`p-3.5 rounded-2xl ${
                isReact
                  ? 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-500'
                  : 'bg-yellow-50 dark:bg-yellow-950/50 text-yellow-500'
              }`}
            >
              {isReact ? <Atom className="h-8 w-8" /> : <FileCode2 className="h-8 w-8" />}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
                  {certification.difficulty}
                </span>
                {earnedCertificate && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Passed ({earnedCertificate.score}%)
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mt-1">
                {certification.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {certification.description}
        </p>

        {/* Key Metrics / Highlights */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y border-neutral-100 dark:border-neutral-800/80 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-neutral-400 text-xs">
              <Clock className="h-3.5 w-3.5" />
              <span>Duration</span>
            </div>
            <p className="font-semibold text-neutral-900 dark:text-white text-sm">
              {certification.durationMinutes} mins
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-neutral-400 text-xs">
              <Award className="h-3.5 w-3.5" />
              <span>Passing</span>
            </div>
            <p className="font-semibold text-neutral-900 dark:text-white text-sm">
              {certification.passingScore}% Score
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-neutral-400 text-xs">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Questions</span>
            </div>
            <p className="font-semibold text-neutral-900 dark:text-white text-sm">
              {certification.totalQuestions} MCQs
            </p>
          </div>
        </div>

        {/* Collapsible Syllabus */}
        <div className="space-y-2">
          <button
            onClick={() => setIsSyllabusExpanded(!isSyllabusExpanded)}
            className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors py-1"
          >
            <span>Assessment Syllabus ({certification.syllabus.length} Topics)</span>
            {isSyllabusExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {isSyllabusExpanded && (
            <div className="space-y-2 pt-2 animate-in fade-in duration-200">
              {certification.syllabus.map((topic, i) => (
                <div
                  key={i}
                  className="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200/60 dark:border-neutral-800 text-left space-y-1"
                >
                  <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                    {topic.title}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => onStartAssessment(certification)}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-xs"
        >
          <span>{earnedCertificate ? 'Retake Assessment' : 'Start Assessment'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        {earnedCertificate && onViewCertificate && (
          <button
            onClick={() => onViewCertificate(earnedCertificate)}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium text-sm transition-colors"
          >
            <Award className="h-4 w-4 text-emerald-500" />
            <span>View Certificate</span>
          </button>
        )}
      </div>
    </div>
  );
}
