import Link from 'next/link';
import { ArrowRight, Code2, BookOpen, Award, Terminal } from 'lucide-react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Page Not Found (404) | JS CodeLab',
  description: 'The requested page could not be found. Explore JS CodeLab playground, runnable JavaScript examples, interactive tutorials, or technology certifications.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24 max-w-4xl mx-auto w-full">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 mb-6">
          Error 404
        </span>
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto mb-10 leading-relaxed">
          The page you requested could not be located. It may have been moved, renamed, or does not exist. Choose one of our core resources below to continue coding.
        </p>

        {/* Key Section Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl text-left mb-10">
          <a
            href="/playground"
            className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-xs"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Terminal className="h-5 w-5" />
              </div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                JavaScript Playground
              </h2>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Run and test JavaScript instantly with our in-browser Monaco editor and Web Worker sandbox.
            </p>
          </a>

          <Link
            href="/examples"
            className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all shadow-xs"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Code2 className="h-5 w-5" />
              </div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Code Examples
              </h2>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Explore 25+ runnable examples covering async/await, closures, array methods, and algorithms.
            </p>
          </Link>

          <Link
            href="/learn"
            className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all shadow-xs"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Learn Tutorials
              </h2>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              In-depth guides on JavaScript syntax, scope, hoisting, closures, promises, and the event loop.
            </p>
          </Link>

          <Link
            href="/certifications"
            className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500 dark:hover:border-amber-500 transition-all shadow-xs"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Award className="h-5 w-5" />
              </div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Certifications
              </h2>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Earn validated technology certificates across 50 engineering disciplines with PDF verification.
            </p>
          </Link>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <span>Return to JS CodeLab Homepage</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </main>

      <Footer />
    </div>
  );
}
