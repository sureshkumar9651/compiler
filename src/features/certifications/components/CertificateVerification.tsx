'use client';

import React, { useState, useEffect } from 'react';
import { certificateRepository } from '../persistence/IndexedDBCertificateRepository';
import { evaluateCertificate } from '../services/verificationService';
import { Certificate, VerificationResult } from '../types';
import { Search, ShieldCheck, CheckCircle2, AlertTriangle, XCircle, Award, Calendar, Hash } from 'lucide-react';

interface CertificateVerificationProps {
  initialCertificateId?: string;
}

export function CertificateVerification({
  initialCertificateId = '',
}: CertificateVerificationProps) {
  const [certIdInput, setCertIdInput] = useState(initialCertificateId);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  useEffect(() => {
    if (initialCertificateId) {
      setCertIdInput(initialCertificateId);
      handleVerify(initialCertificateId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCertificateId]);

  const handleVerify = async (idToVerify: string) => {
    const trimmed = idToVerify.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setResult(null);

    try {
      const foundCert = await certificateRepository.getCertificate(trimmed);
      const evalResult = await evaluateCertificate(foundCert);
      setResult(evalResult);
    } catch (e) {
      console.error('Verification error:', e);
      setResult({
        status: 'not_found',
        message: 'An error occurred while verifying the certificate record in local storage.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerify(certIdInput);
  };

  return (
    <div className="max-w-2xl w-full mx-auto space-y-8 animate-in fade-in duration-200">
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
          Verify Certificate
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
          Enter a certificate ID (e.g. <span className="font-mono text-neutral-900 dark:text-neutral-200">JSCL-JS-XXXX-XXXX</span>) to verify its authenticity against local browser records and cryptographic checksum.
        </p>
      </div>

      {/* Input Search Bar */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3.5 top-3.5 text-neutral-400" />
          <input
            type="text"
            value={certIdInput}
            onChange={(e) => setCertIdInput(e.target.value)}
            placeholder="Enter Certificate ID..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-neutral-100 transition-shadow"
          />
        </div>
        <button
          type="submit"
          disabled={!certIdInput.trim() || isLoading}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm transition-colors shadow-xs shrink-0"
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>

      {/* Verification Results */}
      {result && (
        <div className="animate-in fade-in duration-300">
          {result.status === 'valid' && result.certificate && (
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-emerald-300 dark:border-emerald-800/80 shadow-md space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-emerald-700 dark:text-emerald-400">
                    Certificate Verified & Authentic
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Matches local browser store and passed cryptographic hash verification.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/80 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="space-y-1">
                  <p className="text-neutral-400 flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" /> Learner Name
                  </p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">
                    {result.certificate.learnerName}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-neutral-400 flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" /> Certification Program
                  </p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">
                    {result.certificate.certificationTitle}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-neutral-400 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> Issue Date
                  </p>
                  <p className="font-semibold text-neutral-900 dark:text-neutral-200">
                    {new Date(result.certificate.issuedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-neutral-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Score Achieved
                  </p>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {result.certificate.score}% (Passed)
                  </p>
                </div>

                <div className="col-span-1 sm:col-span-2 pt-2 border-t border-neutral-200 dark:border-neutral-800 space-y-1">
                  <p className="text-neutral-400 flex items-center gap-1">
                    <Hash className="h-3.5 w-3.5" /> Certificate ID & Integrity Hash
                  </p>
                  <p className="font-mono text-neutral-800 dark:text-neutral-300">
                    {result.certificate.id}
                  </p>
                  <p className="font-mono text-[11px] text-neutral-500 break-all">
                    Checksum: {result.certificate.verificationHash}
                  </p>
                </div>
              </div>
            </div>
          )}

          {result.status === 'tampered' && (
            <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-left space-y-3">
              <div className="flex items-center gap-3 text-amber-700 dark:text-amber-400 font-bold">
                <AlertTriangle className="h-6 w-6" />
                <span>Integrity Check Failed</span>
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                {result.message}
              </p>
            </div>
          )}

          {result.status === 'not_found' && (
            <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-left space-y-3">
              <div className="flex items-center gap-3 text-neutral-800 dark:text-neutral-200 font-bold">
                <XCircle className="h-6 w-6 text-neutral-400" />
                <span>Certificate Not Found</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {result.message}
              </p>
              <p className="text-xs text-neutral-500">
                Tip: Certificates are stored locally in the browser where the assessment was completed. If you cleared browser data or are using a different device or private window, locally stored credentials are not accessible.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Honest Local Architecture Disclosure */}
      <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 space-y-1">
        <p className="font-semibold text-neutral-700 dark:text-neutral-300">
          How Verification Works:
        </p>
        <p>
          JS CodeLab uses a local-first architecture. This verification utility checks the cryptographic checksum and existence of records inside your browser&apos;s IndexedDB. We do not claim certificates are verified by a centralized authentication server or third-party academic institution.
        </p>
      </div>
    </div>
  );
}
