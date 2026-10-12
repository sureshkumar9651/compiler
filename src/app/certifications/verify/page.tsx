'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CertificateVerification } from '@/features/certifications/components/CertificateVerification';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

function VerifyContent() {
  const searchParams = useSearchParams();
  const idFromQuery = searchParams.get('id') || '';

  return <CertificateVerification initialCertificateId={idFromQuery} />;
}

export default function CertificationsVerifyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
        <div>
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Certifications</span>
          </Link>
        </div>

        <Suspense fallback={<div className="text-center py-12 text-sm text-neutral-500">Loading verification...</div>}>
          <VerifyContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
