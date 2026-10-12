import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CertificationsClient } from '@/features/certifications/components/CertificationsClient';

export const metadata: Metadata = {
  title: 'Professional Technology Certifications | JS CodeLab',
  description: 'Validate real-world software engineering mastery across programming languages, frontend, backend, databases, DevOps, testing, and system architecture. Interactive assessments with downloadable PDF credentials.',
  alternates: {
    canonical: '/certifications',
  },
  openGraph: {
    title: 'Professional Technology Certifications | JS CodeLab',
    description: 'Validate real-world engineering mastery across 7 technology domains with interactive browser-based assessments and verifiable PDF credentials.',
    url: '/certifications',
    siteName: 'JS CodeLab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Technology Certifications | JS CodeLab',
    description: 'Validate real-world engineering mastery across 7 technology domains with verifiable PDF credentials.',
  },
};

export default function CertificationsPage() {
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
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <CertificationsClient />
      </main>

      <Footer />
    </div>
  );
}
