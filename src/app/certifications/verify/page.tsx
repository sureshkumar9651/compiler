import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { VerifyClient } from '@/features/certifications/components/VerifyClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Verify Certificate Credential',
  description: 'Verify the authenticity, issuance date, score, and assessed skills of any official JS CodeLab technology credential using its unique certificate ID.',
  alternates: {
    canonical: '/certifications/verify',
  },
  openGraph: {
    title: 'Verify Certificate Credential | JS CodeLab',
    description: 'Verify the authenticity, issuance date, and skills of any official JS CodeLab technology credential.',
    url: '/certifications/verify',
    siteName: 'JS CodeLab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Verify Certificate Credential | JS CodeLab',
    description: 'Verify the authenticity and skills of any official JS CodeLab certificate.',
  },
};

import { JsonLd } from '@/components/seo/JsonLd';

export default function CertificationsVerifyPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Certifications',
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app'}/certifications`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Verify Credential',
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app'}/certifications/verify`,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <JsonLd data={structuredData} />
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
          <VerifyClient />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
