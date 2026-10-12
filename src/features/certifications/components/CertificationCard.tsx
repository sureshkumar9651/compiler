'use client';

import React, { useState } from 'react';
import { Certification, Certificate } from '../types';
import {
  FileCode2,
  Code2,
  Atom,
  Clock,
  Award,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Download,
  Terminal,
  Layers,
  Server,
  Database,
  Boxes,
  GitBranch,
  Network,
  Cpu,
  Shield,
  Bot,
  Binary,
} from 'lucide-react';
import { downloadCertificatePdf } from '../services/pdfCertificateService';

interface CertificationCardProps {
  certification: Certification;
  earnedCertificate?: Certificate;
  onStartAssessment: (certification: Certification) => void;
}

function getTechIcon(iconName: string) {
  switch (iconName) {
    case 'javascript':
      return { icon: FileCode2, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50' };
    case 'typescript':
      return { icon: Code2, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50' };
    case 'python':
      return { icon: Terminal, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50' };
    case 'react':
      return { icon: Atom, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/50' };
    case 'nextjs':
      return { icon: Layers, color: 'text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800' };
    case 'node':
      return { icon: Server, color: 'text-green-500 bg-green-50 dark:bg-green-950/50' };
    case 'sql':
    case 'database':
      return { icon: Database, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50' };
    case 'docker':
      return { icon: Boxes, color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/50' };
    case 'git':
      return { icon: GitBranch, color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/50' };
    case 'system-design':
      return { icon: Network, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/50' };
    case 'security':
      return { icon: Shield, color: 'text-red-500 bg-red-50 dark:bg-red-950/50' };
    case 'ai':
      return { icon: Bot, color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/50' };
    case 'dsa':
      return { icon: Binary, color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/50' };
    default:
      return { icon: Cpu, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50' };
  }
}

export function CertificationCard({
  certification,
  earnedCertificate,
  onStartAssessment,
}: CertificationCardProps) {
  const [isSyllabusExpanded, setIsSyllabusExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const { icon: TechIcon, color: iconStyle } = getTechIcon(certification.iconName);
  const isAvailable = certification.status === 'available';

  const handleDownloadPdf = async () => {
    if (!earnedCertificate || isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadCertificatePdf(earnedCertificate);
    } catch (err) {
      console.error('Failed to download PDF:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all group">
      <div className="space-y-5">
        {/* Header with Icon, Category & Difficulty Badges */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`p-3 rounded-2xl shrink-0 ${iconStyle}`}>
              <TechIcon className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  {certification.categoryLabel}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                    certification.difficulty === 'Expert'
                      ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800/60'
                      : certification.difficulty === 'Advanced'
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60'
                      : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60'
                  }`}
                >
                  {certification.difficulty}
                </span>
                {earnedCertificate && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                    <CheckCircle2 className="h-3 w-3" />
                    Passed ({earnedCertificate.score}%)
                  </span>
                )}
                {!isAvailable && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
                    Coming Soon
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white leading-snug">
                {certification.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {certification.description}
        </p>

        {/* Skills Assessed Chips */}
        {certification.skillsAssessed && certification.skillsAssessed.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Skills Assessed
            </span>
            <div className="flex flex-wrap gap-1.5">
              {certification.skillsAssessed.slice(0, 4).map((skill, i) => (
                <span
                  key={i}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-700/50"
                >
                  {skill}
                </span>
              ))}
              {certification.skillsAssessed.length > 4 && (
                <span className="text-[11px] text-neutral-400 self-center">
                  +{certification.skillsAssessed.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Key Metrics / Highlights */}
        <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-neutral-100 dark:border-neutral-800/80 text-center">
          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-1 text-neutral-400 text-[11px]">
              <Clock className="h-3 w-3" />
              <span>Duration</span>
            </div>
            <p className="font-semibold text-neutral-900 dark:text-white text-xs sm:text-sm">
              {certification.durationMinutes} mins
            </p>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-1 text-neutral-400 text-[11px]">
              <Award className="h-3 w-3" />
              <span>Passing</span>
            </div>
            <p className="font-semibold text-neutral-900 dark:text-white text-xs sm:text-sm">
              {certification.passingScore}%
            </p>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-1 text-neutral-400 text-[11px]">
              <BookOpen className="h-3 w-3" />
              <span>Questions</span>
            </div>
            <p className="font-semibold text-neutral-900 dark:text-white text-xs sm:text-sm">
              {certification.totalQuestions} MCQs
            </p>
          </div>
        </div>

        {/* Collapsible Syllabus */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setIsSyllabusExpanded(!isSyllabusExpanded)}
            className="w-full flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors py-0.5"
          >
            <span>Assessment Syllabus ({certification.syllabus.length} Topics)</span>
            {isSyllabusExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          {isSyllabusExpanded && (
            <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
              {certification.syllabus.map((topic, i) => (
                <div
                  key={i}
                  className="p-2.5 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200/60 dark:border-neutral-800 text-left space-y-0.5"
                >
                  <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                    {topic.title}
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 mt-5 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row gap-2.5">
        {isAvailable ? (
          <button
            type="button"
            onClick={() => onStartAssessment(certification)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm transition-colors shadow-xs"
          >
            <span>{earnedCertificate ? 'Retake Assessment' : 'Start Assessment'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 font-medium text-xs sm:text-sm cursor-not-allowed border border-neutral-200 dark:border-neutral-800"
          >
            <span>Question Bank in Verification</span>
          </button>
        )}

        {earnedCertificate && (
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            aria-label="Download Certificate PDF"
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium text-xs sm:text-sm transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-blue-500" />
            <span>{isDownloading ? 'Generating...' : 'Download PDF'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
