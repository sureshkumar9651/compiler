import { Metadata } from 'next';
import { TerminalSquare } from 'lucide-react';
import Link from 'next/link';
import { ExamplesClient } from '@/features/examples/components/examples-client';

export const metadata: Metadata = {
  title: 'JavaScript Examples | JS CodeLab',
  description: 'Learn, experiment, and run JavaScript directly in browser with curated examples.',
};

export default function ExamplesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2">
          <TerminalSquare className="h-6 w-6 text-blue-500" />
          <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-neutral-50">JS CodeLab</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-neutral-500 dark:text-neutral-400">
          <Link href="/playground" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Playground</Link>
          <Link href="/examples" className="text-neutral-900 dark:text-neutral-50 transition-colors">Examples</Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">GitHub</a>
        </nav>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-5xl mb-4">
            JavaScript Examples
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Learn, experiment, and run JavaScript directly in browser. Choose an example to open in the playground or start from a blank template.
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
