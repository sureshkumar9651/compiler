import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CertificationsClient } from '@/features/certifications/components/CertificationsClient';

export const metadata: Metadata = {
  title: 'Get Certified in JavaScript & React | JS CodeLab',
  description: 'Test your knowledge and earn downloadable certifications in JavaScript Fundamentals and React JS. Interactive browser-based assessments with instant verification.',
  alternates: {
    canonical: '/certifications',
  },
  openGraph: {
    title: 'Get Certified in JavaScript & React | JS CodeLab',
    description: 'Test your knowledge and earn downloadable certifications in JavaScript Fundamentals and React JS.',
    url: '/certifications',
    siteName: 'JS CodeLab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Certified in JavaScript & React | JS CodeLab',
    description: 'Test your knowledge and earn downloadable certifications in JavaScript and React.',
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
