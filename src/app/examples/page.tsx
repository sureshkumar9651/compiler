import { Metadata } from 'next';
import { TerminalSquare } from 'lucide-react';
import Link from 'next/link';
import { ExamplesClient } from '@/features/examples/components/examples-client';
import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'JavaScript Examples',
  description: 'Explore our curated library of interactive JavaScript examples. Learn, experiment, and run JavaScript code directly in your browser with our free online playground.',
  alternates: {
    canonical: '/examples',
  },
  openGraph: {
    title: 'Interactive JavaScript Examples | JS CodeLab',
    description: 'Learn and run JavaScript directly in your browser with our curated examples.',
    url: '/examples',
    siteName: 'JS CodeLab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive JavaScript Examples | JS CodeLab',
    description: 'Learn and run JavaScript directly in your browser with our curated examples.',
  },
};

export default function ExamplesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app'
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "JavaScript Examples",
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app'}/examples`
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            JavaScript Examples
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Learn, experiment, and run JavaScript code directly in your browser. Choose an example below to open it in the compiler, test how it works, and modify it in real-time.
          </p>
        </div>

        <ExamplesClient />
      </main>
      
      <footer className="py-8 text-center text-sm text-neutral-500 border-t border-neutral-200 dark:border-neutral-800">
        © 2026 JS CodeLab. Built for modern developers.
      </footer>
    </div>
  );
}
