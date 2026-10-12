'use client';

import React from 'react';
import { Certificate } from '../types';
import { Award, Eye, Trash2, Calendar, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface MyCertificatesListProps {
  certificates: Certificate[];
  onViewCertificate: (cert: Certificate) => void;
  onDeleteCertificate: (id: string) => void;
  onExploreCertifications: () => void;
}

export function MyCertificatesList({
  certificates,
  onViewCertificate,
  onDeleteCertificate,
  onExploreCertifications,
}: MyCertificatesListProps) {
  if (certificates.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-5 shadow-xs">
        <div className="p-4 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
          <Award className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            No Certificates Earned Yet
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Take one of our interactive certification assessments to test your knowledge and earn your downloadable certificate.
          </p>
        </div>
        <button
          onClick={onExploreCertifications}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-xs"
        >
          <span>Explore Available Certifications</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
          Your Earned Credentials ({certificates.length})
        </h2>
        <span className="text-xs text-neutral-500">
          Saved in browser IndexedDB
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.map((cert) => {
          const dateStr = new Date(cert.issuedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

          return (
            <div
              key={cert.id}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-blue-500/50 transition-all shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 dark:text-white text-base">
                        {cert.certificationTitle}
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Recipient: <span className="font-medium text-neutral-700 dark:text-neutral-300">{cert.learnerName}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    {cert.score}%
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-neutral-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {dateStr}
                  </span>
                  <span className="font-mono text-[11px] truncate max-w-[150px]">
                    {cert.id}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={() => onViewCertificate(cert)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium text-xs transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>View Certificate</span>
                </button>

                <div className="flex items-center gap-1">
                  <Link
                    href={`/certifications/verify?id=${cert.id}`}
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title="Verify"
                  >
                    <ShieldCheck className="h-4 w-4" />
                  </Link>

                  <button
                    onClick={() => {
                      if (window.confirm('Delete this certificate record from local storage?')) {
                        onDeleteCertificate(cert.id);
                      }
                    }}
                    className="p-1.5 text-neutral-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title="Delete record"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
