'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CERTIFICATIONS, CERTIFICATION_CATEGORIES, ASSESSMENT_QUESTIONS } from '../data/certificationsData';
import { Certification, Certificate, AssessmentAttempt, ShuffledQuestion, CertificationCategory, CertificationDifficulty } from '../types';
import { certificateRepository } from '../persistence/IndexedDBCertificateRepository';
import { prepareAssessmentQuestions } from '../services/assessmentEngine';
import { CertificationCard } from './CertificationCard';
import { LearnerNameModal } from './LearnerNameModal';
import { AssessmentRunner } from './AssessmentRunner';
import { AssessmentResult } from './AssessmentResult';
import { CertificateVerification } from './CertificateVerification';
import { Award, ShieldCheck, Info, Search, Filter, X, Sparkles, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export function CertificationsClient() {
  const [activeTab, setActiveTab] = useState<'certifications' | 'verify'>('certifications');
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'available' | 'coming_soon'>('all');

  // Active Flow State
  const [modalCert, setModalCert] = useState<Certification | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<{
    certification: Certification;
    learnerName: string;
    questions: ShuffledQuestion[];
  } | null>(null);

  const [activeResult, setActiveResult] = useState<{
    attempt: AssessmentAttempt;
    certificate: Certificate | null;
    certification: Certification;
    questions: ShuffledQuestion[];
  } | null>(null);

  const loadCertificates = async () => {
    try {
      const list = await certificateRepository.getCertificates();
      setCertificates(list);
    } catch (e) {
      console.error('Failed to load certificates from IndexedDB:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // URL state synchronization and direct-link handling
  useEffect(() => {
    loadCertificates();

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const trackId = params.get('cert') || params.get('track');
      if (trackId) {
        const matched = CERTIFICATIONS.find((c) => c.id === trackId);
        // Only open directly if the certification is ready and has questions
        if (matched && matched.status === 'available') {
          const hasQuestions = ASSESSMENT_QUESTIONS.some((q) => q.certificationId === matched.id);
          if (hasQuestions) {
            setModalCert(matched);
          }
        }
      }

      const handlePopState = () => {
        const curParams = new URLSearchParams(window.location.search);
        const curTrack = curParams.get('cert') || curParams.get('track');
        if (!curTrack) {
          setModalCert(null);
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  const handleStartAssessmentClick = (cert: Certification) => {
    // Only open for ready certifications with questions
    if (cert.status !== 'available') return;
    const hasQuestions = ASSESSMENT_QUESTIONS.some((q) => q.certificationId === cert.id);
    if (!hasQuestions) return;

    setModalCert(cert);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('cert', cert.id);
      window.history.pushState({ certId: cert.id }, '', url.toString());
    }
  };

  const handleCloseNameModal = () => {
    setModalCert(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('cert');
      url.searchParams.delete('track');
      const cleanUrl = url.pathname + (url.search ? url.search : '');
      window.history.pushState(null, '', cleanUrl);
    }
  };

  const handleConfirmLearnerName = (name: string, _email: string) => {
    if (!modalCert) return;
    const cert = modalCert;
    setModalCert(null);

    // Prepare randomized assessment questions with independent option shuffling
    const matchingPool = ASSESSMENT_QUESTIONS.filter((q) => q.certificationId === cert.id);
    if (matchingPool.length === 0) {
      console.error(`Cannot start assessment: no verified question bank found for ${cert.id}`);
      return;
    }

    const preparedQuestions = prepareAssessmentQuestions(matchingPool, {
      totalQuestions: cert.totalQuestions,
    });

    setActiveAssessment({
      certification: cert,
      learnerName: name,
      questions: preparedQuestions,
    });
  };

  const handleAssessmentFinish = async (attempt: AssessmentAttempt, cert: Certificate | null) => {
    const currentCert = activeAssessment?.certification;
    const currentQuestions = activeAssessment?.questions || [];
    setActiveAssessment(null);
    await loadCertificates();

    if (currentCert) {
      setActiveResult({
        attempt,
        certificate: cert,
        certification: currentCert,
        questions: currentQuestions,
      });
    }
  };

  const availableCount = useMemo(() => CERTIFICATIONS.filter((c) => c.status === 'available').length, []);
  const inDevelopmentCount = useMemo(() => CERTIFICATIONS.filter((c) => c.status !== 'available').length, []);

  // Filtered certifications list
  const filteredCertifications = useMemo(() => {
    return CERTIFICATIONS.filter((cert) => {
      // Status filter
      if (selectedStatus !== 'all' && cert.status !== selectedStatus) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && cert.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && cert.difficulty !== selectedDifficulty) {
        return false;
      }

      // Search query (title, shortTitle, description, skills)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = cert.title.toLowerCase().includes(query);
        const matchesShortTitle = cert.shortTitle.toLowerCase().includes(query);
        const matchesDesc = cert.description.toLowerCase().includes(query);
        const matchesCategory = cert.categoryLabel.toLowerCase().includes(query);
        const matchesSkills = cert.skillsAssessed?.some((s) => s.toLowerCase().includes(query));

        if (!matchesTitle && !matchesShortTitle && !matchesDesc && !matchesCategory && !matchesSkills) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedStatus]);

  // Active Assessment Full Screen Flow
  if (activeAssessment) {
    return (
      <AssessmentRunner
        certification={activeAssessment.certification}
        questions={activeAssessment.questions}
        learnerName={activeAssessment.learnerName}
        onCancel={() => setActiveAssessment(null)}
        onFinish={handleAssessmentFinish}
      />
    );
  }

  // Active Assessment Result Flow (PDF-only, no HTML preview)
  if (activeResult) {
    return (
      <AssessmentResult
        attempt={activeResult.attempt}
        certificate={activeResult.certificate}
        certification={activeResult.certification}
        questions={activeResult.questions}
        onRetake={() => {
          const cert = activeResult.certification;
          const learner = activeResult.attempt.learnerName;
          setActiveResult(null);

          // Re-prepare randomized questions for retake
          const matchingPool = ASSESSMENT_QUESTIONS.filter((q) => q.certificationId === cert.id);
          const preparedQuestions = prepareAssessmentQuestions(matchingPool, {
            totalQuestions: cert.totalQuestions,
          });

          setActiveAssessment({
            certification: cert,
            learnerName: learner,
            questions: preparedQuestions,
          });
        }}
        onBackToOverview={() => setActiveResult(null)}
      />
    );
  }

  return (
    <div className="space-y-12">
      {/* Name Input Modal */}
      {modalCert && (
        <LearnerNameModal
          certification={modalCert}
          onClose={handleCloseNameModal}
          onConfirm={handleConfirmLearnerName}
        />
      )}

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-900">
          <Award className="h-3.5 w-3.5" />
          <span>Professional Multi-Technology Certification Platform</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
          JS CodeLab Technology Certifications
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl mx-auto">
          Validate your real-world engineering mastery across languages, frontend, backend, databases, DevOps, testing, and systems architecture. Rigorous technical assessments featuring code execution prediction, architectural trade-offs, and debugging.
        </p>

        {/* Vendor Accreditation Disclaimer Notice */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-300 max-w-2xl text-left">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>
            <strong>Official Notice:</strong> All credentials are issued directly by JS CodeLab to certify demonstrated skill through our interactive assessment engine. These are not official certifications from third-party vendor bodies such as AWS, Microsoft, or Google.
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-center border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2 sm:gap-6 -mb-px">
          <button
            type="button"
            onClick={() => setActiveTab('certifications')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'certifications'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Award className="h-4 w-4" />
            <span>Certification Catalog</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {CERTIFICATIONS.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('verify')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'verify'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Verify Credential</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'certifications' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Search Bar & Filter Controls */}
          <div className="space-y-4 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3.5 top-3.5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by technology, skill, or keyword (e.g. JavaScript, Docker, Microtasks, SQL)..."
                  className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-neutral-100 transition-shadow"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Difficulty filter dropdown */}
              <div className="sm:w-48 shrink-0">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full py-2.5 px-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 text-neutral-700 dark:text-neutral-300"
                  aria-label="Filter by difficulty"
                >
                  <option value="all">All Difficulties</option>
                  <option value="Intermediate">Intermediate (20%)</option>
                  <option value="Advanced">Advanced (50%)</option>
                  <option value="Expert">Expert (30%)</option>
                </select>
              </div>
            </div>

            {/* Status Filter Row */}
            <div className="flex items-center justify-between gap-3 flex-wrap pt-0.5">
              <div className="inline-flex p-1 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-800 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setSelectedStatus('all')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    selectedStatus === 'all'
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
                  }`}
                >
                  <span>All Tracks</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                    {CERTIFICATIONS.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStatus('available')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    selectedStatus === 'available'
                      ? 'bg-white dark:bg-neutral-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Ready to Start</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                    {availableCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStatus('coming_soon')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    selectedStatus === 'coming_soon'
                      ? 'bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>In Development</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                    {inDevelopmentCount}
                  </span>
                </button>
              </div>
            </div>

            {/* Category Pills Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
              {CERTIFICATION_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full font-medium transition-all whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Active filters status & result count */}
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 px-1 pt-1">
              <span>
                Showing {filteredCertifications.length} of {CERTIFICATIONS.length} certification tracks
                {selectedStatus !== 'all' && (
                  <span className="ml-1 font-semibold text-neutral-700 dark:text-neutral-300">
                    ({selectedStatus === 'available' ? 'Ready to Start' : 'In Development'})
                  </span>
                )}
              </span>
              {(searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedStatus !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                    setSelectedStatus('all');
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Reset all filters
                </button>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredCertifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {filteredCertifications.map((cert) => {
                const earned = certificates.find((c) => c.certificationId === cert.id);
                return (
                  <CertificationCard
                    key={cert.id}
                    certification={cert}
                    earnedCertificate={earned}
                    onStartAssessment={handleStartAssessmentClick}
                  />
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="max-w-md mx-auto text-center py-16 px-4 space-y-4">
              <div className="inline-flex p-4 rounded-3xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                No matching certifications found
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                We couldn&apos;t find any certification track matching your current search or filter criteria. Try adjusting the keywords or clear your filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Local Architecture Info Card */}
          <div className="max-w-6xl mx-auto p-5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                Assessment Architecture & Exam Integrity:
              </p>
              <p className="leading-relaxed">
                All evaluations, stratified question selection, option shuffling, and scoring calculations run directly in your browser. Questions are balanced across Intermediate (20%), Advanced (50%), and Expert (30%) tiers. Correct answers are tracked via immutable option IDs to ensure unbiased shuffling. Earned credentials persist locally in IndexedDB and are downloadable directly as high-resolution PDF certificates.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Verify Tab */}
      {activeTab === 'verify' && (
        <div className="animate-in fade-in duration-200">
          <CertificateVerification />
        </div>
      )}
    </div>
  );
}
