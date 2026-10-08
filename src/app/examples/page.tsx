import { Metadata } from 'next';
import { TerminalSquare } from 'lucide-react';
import Link from 'next/link';
import { ExamplesClient } from '@/features/examples/components/examples-client';

export const metadata: Metadata = {
  title: 'JavaScript Examples | JS CodeLab',
  description: 'Explore our curated library of interactive JavaScript examples. Learn, experiment, and run JavaScript code directly in your browser with our free online playground.',
  alternates: {
    canonical: '/examples',
  },
  openGraph: {
    title: 'Interactive JavaScript Examples | JS CodeLab',
    description: 'Learn and run JavaScript directly in your browser with our curated examples.',
    url: '/examples',
  }
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
      <header className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2">
          <TerminalSquare className="h-6 w-6 text-blue-500 shrink-0" />
          <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-neutral-50">JS CodeLab</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm font-medium text-neutral-500 dark:text-neutral-400">
          <Link href="/playground" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Playground</Link>
          <Link href="/examples" className="text-neutral-900 dark:text-neutral-50 transition-colors">Examples</Link>
          <Link href="/learn" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors hidden sm:inline-block">Learn</Link>
          <a href="https://github.com/sureshkumar9651/compiler" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors hidden sm:inline-block">GitHub</a>
        </nav>
      </header>

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
