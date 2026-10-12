'use client';

import React, { useState } from 'react';
import { Certificate } from '../types';
import { Download, ShieldCheck, ArrowLeft, CheckCircle2, Copy, AlertCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { CertificateDocument } from './CertificateDocument';
import { downloadCertificatePdf } from '../services/pdfCertificateService';

interface CertificateViewProps {
  certificate: Certificate;
  onBack: () => void;
}

export function CertificateView({ certificate, onBack }: CertificateViewProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const verificationUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/certifications/verify?id=${certificate.id}`
    : `/certifications/verify?id=${certificate.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadPdf = async () => {
    if (isDownloading) return; // Prevent duplicate download clicks
    setIsDownloading(true);
    setDownloadError(null);

    try {
      await downloadCertificatePdf(certificate);
    } catch (err) {
      console.error('Failed to generate certificate PDF:', err);
      setDownloadError('Could not generate the PDF certificate. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Action Bar (Outside the Certificate document) */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-xs"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Overview</span>
        </button>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label="Copy credential verification link"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-xs"
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
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-xs"
          >
            <ExternalLink className="h-4 w-4 text-neutral-400" />
            <span>Verify Credential</span>
          </Link>

          {/* Primary Action: PDF Download Only */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            aria-label="Download Certificate as PDF"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm transition-colors shadow-md hover:shadow-lg shadow-blue-600/20"
          >
            <Download className="h-4 w-4" />
            <span>{isDownloading ? 'Generating PDF...' : 'Download Certificate (PDF)'}</span>
          </button>
        </div>
      </div>

      {/* Error Notice if PDF Generation Fails */}
      {downloadError && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs sm:text-sm text-red-700 dark:text-red-300 flex items-center gap-2"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{downloadError}</span>
        </div>
      )}

      {/* Centered, Scalable, Responsive Certificate Document Preview */}
      <div className="w-full overflow-x-auto py-2">
        <CertificateDocument certificate={certificate} />
      </div>

      {/* Local Verification & Transparency Notice */}
      <div className="p-5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-200">
          <ShieldCheck className="h-4 w-4 text-blue-500 shrink-0" />
          <span>Local Verification & Integrity Notice</span>
        </div>
        <p className="leading-relaxed">
          This credential was generated locally in your browser and stored in your device&apos;s IndexedDB. While cryptographic checksums ensure data consistency, locally generated certificates are not tamper-proof and are not independently verified by an accredited institution or third-party authority.
        </p>
        <p className="leading-relaxed">
          You can test verifying this certificate locally anytime using the{' '}
          <Link
            href={`/certifications/verify?id=${certificate.id}`}
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Certificate Verification Page
          </Link>.
        </p>
      </div>
    </div>
  );
}
