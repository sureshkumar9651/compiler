import Link from 'next/link';
import { TerminalSquare, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <Link href="/" className="flex items-center gap-2">
          <TerminalSquare className="h-6 w-6 text-blue-500" />
          <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-neutral-50">JS CodeLab</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-neutral-200 dark:text-neutral-800 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-10">
          We couldn&apos;t find the page you were looking for. It might have been moved or deleted.
        </p>
        
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link 
            href="/playground" 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-semibold transition-all"
          >
            Open Playground
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link 
            href="/examples" 
            className="flex items-center gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white px-6 py-3 rounded-full font-semibold transition-all"
          >
            View Examples
          </Link>
        </div>
      </main>
      
      <footer className="py-8 text-center text-sm text-neutral-500 border-t border-neutral-200 dark:border-neutral-800">
        © 2026 JS CodeLab. Free Online JavaScript Compiler & Playground.
      </footer>
    </div>
  );
}
