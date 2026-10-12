'use client';

import React, { useState, useEffect } from 'react';
import { CERTIFICATIONS, ASSESSMENT_QUESTIONS } from '../data/certificationsData';
import { Certification, Certificate, AssessmentAttempt } from '../types';
import { certificateRepository } from '../persistence/IndexedDBCertificateRepository';
import { CertificationCard } from './CertificationCard';
import { LearnerNameModal } from './LearnerNameModal';
import { AssessmentRunner } from './AssessmentRunner';
import { AssessmentResult } from './AssessmentResult';
import { CertificateView } from './CertificateView';
import { CertificateVerification } from './CertificateVerification';
import { MyCertificatesList } from './MyCertificatesList';
import { Award, ShieldCheck, FileCheck, Info } from 'lucide-react';

export function CertificationsClient() {
  const [activeTab, setActiveTab] = useState<'certifications' | 'my-certificates' | 'verify'>('certifications');
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Active Flow State
  const [modalCert, setModalCert] = useState<Certification | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<{
    certification: Certification;
    learnerName: string;
  } | null>(null);

  const [activeResult, setActiveResult] = useState<{
    attempt: AssessmentAttempt;
    certificate: Certificate | null;
    certification: Certification;
  } | null>(null);

  const [viewingCertificate, setViewingCertificate] = useState<Certificate | null>(null);

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

  useEffect(() => {
    loadCertificates();
  }, []);

  const handleStartAssessmentClick = (cert: Certification) => {
    setModalCert(cert);
  };

  const handleConfirmLearnerName = (name: string) => {
    if (!modalCert) return;
    const cert = modalCert;
    setModalCert(null);
    setActiveAssessment({
      certification: cert,
      learnerName: name,
    });
  };

  const handleAssessmentFinish = async (attempt: AssessmentAttempt, cert: Certificate | null) => {
    const currentCert = activeAssessment?.certification;
    setActiveAssessment(null);
    await loadCertificates();

    if (currentCert) {
      setActiveResult({
        attempt,
        certificate: cert,
        certification: currentCert,
      });
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    await certificateRepository.deleteCertificate(id);
    await loadCertificates();
  };

  // Full Screen / Modal Flows
  if (activeAssessment) {
    const questions = ASSESSMENT_QUESTIONS.filter(
      (q) => q.certificationId === activeAssessment.certification.id
    );

    return (
      <AssessmentRunner
        certification={activeAssessment.certification}
        questions={questions}
        learnerName={activeAssessment.learnerName}
        onCancel={() => setActiveAssessment(null)}
        onFinish={handleAssessmentFinish}
      />
    );
  }

  if (activeResult) {
    const questions = ASSESSMENT_QUESTIONS.filter(
      (q) => q.certificationId === activeResult.certification.id
    );

    return (
      <AssessmentResult
        attempt={activeResult.attempt}
        certificate={activeResult.certificate}
        certification={activeResult.certification}
        questions={questions}
        onRetake={() => {
          const cert = activeResult.certification;
          const learner = activeResult.attempt.learnerName;
          setActiveResult(null);
          setActiveAssessment({
            certification: cert,
            learnerName: learner,
          });
        }}
        onViewCertificate={(cert) => {
          setActiveResult(null);
          setViewingCertificate(cert);
        }}
        onBackToOverview={() => setActiveResult(null)}
      />
    );
  }

  if (viewingCertificate) {
    return (
      <CertificateView
        certificate={viewingCertificate}
        onBack={() => setViewingCertificate(null)}
      />
    );
  }

  return (
    <div className="space-y-12">
      {/* Name Input Modal */}
      {modalCert && (
        <LearnerNameModal
          certification={modalCert}
          onClose={() => setModalCert(null)}
          onConfirm={handleConfirmLearnerName}
        />
      )}

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-900">
          <Award className="h-3.5 w-3.5" />
          <span>Interactive Skill Assessment</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Get Certified in JavaScript & React
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Validate your technical competence through rigorous, interactive multiple-choice assessments. Earn and download official credentials stored right inside your browser.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center justify-center border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2 sm:gap-6 -mb-px">
          <button
            onClick={() => setActiveTab('certifications')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'certifications'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Award className="h-4 w-4" />
            <span>Available Certifications</span>
          </button>

          <button
            onClick={() => setActiveTab('my-certificates')}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'my-certificates'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <FileCheck className="h-4 w-4" />
            <span>My Certificates ({certificates.length})</span>
          </button>

          <button
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {CERTIFICATIONS.map((cert) => {
              const earned = certificates.find((c) => c.certificationId === cert.id);
              return (
                <CertificationCard
                  key={cert.id}
                  certification={cert}
                  earnedCertificate={earned}
                  onStartAssessment={handleStartAssessmentClick}
                  onViewCertificate={(c) => setViewingCertificate(c)}
                />
              );
            })}
          </div>

          {/* Local Architecture Info Card */}
          <div className="p-5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                Local-First Assessment Architecture:
              </p>
              <p>
                All assessment evaluations, scoring calculations, and earned credentials run client-side and persist securely inside your browser via IndexedDB. We do not require account registration or collect personal information. Locally stored certificates are verifiable against browser records and cryptographic checksums, but are not independently accredited by external certification authorities.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'my-certificates' && (
        <div className="animate-in fade-in duration-200">
          <MyCertificatesList
            certificates={certificates}
            onViewCertificate={(c) => setViewingCertificate(c)}
            onDeleteCertificate={handleDeleteCertificate}
            onExploreCertifications={() => setActiveTab('certifications')}
          />
        </div>
      )}

      {activeTab === 'verify' && (
        <div className="animate-in fade-in duration-200">
          <CertificateVerification />
        </div>
      )}
    </div>
  );
}
