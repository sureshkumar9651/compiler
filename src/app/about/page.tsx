import { Metadata } from 'next';
import Link from 'next/link';
import { TerminalSquare, Info, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About JS CodeLab',
  description: 'Learn more about JS CodeLab, a free, browser-based JavaScript compiler and playground built for developers and learners.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About JS CodeLab',
    description: 'Learn more about JS CodeLab, a free, browser-based JavaScript compiler and playground built for developers and learners.',
    url: '/about',
    siteName: 'JS CodeLab',
    locale: 'en_US',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2">
          <TerminalSquare className="h-6 w-6 text-blue-500 shrink-0" />
          <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-neutral-50">JS CodeLab</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm font-medium text-neutral-500 dark:text-neutral-400">
          <Link href="/playground" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Playground</Link>
          <Link href="/examples" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Examples</Link>
          <Link href="/learn" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors hidden sm:inline-block">Learn</Link>
          <a href="https://github.com/sureshkumar9651/compiler" target="_blank" rel="noopener noreferrer" className="text-neutral-900 dark:text-neutral-50 transition-colors hidden sm:inline-block">GitHub</a>
        </nav>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              About JS CodeLab
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              A free, privacy-first JavaScript playground built for everyone.
            </p>
          </div>

          <section className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
            <h2 className="flex items-center gap-2"><Info className="w-6 h-6 text-blue-500" /> Our Mission</h2>
            <p>
              JS CodeLab was created with a single goal: to provide the fastest, safest, and most accessible way to write, test, and learn JavaScript online. Whether you are a beginner exploring variables for the first time, or a seasoned developer testing a complex algorithm, JS CodeLab offers a professional-grade environment entirely within your browser.
            </p>

            <h2 className="flex items-center gap-2"><Shield className="w-6 h-6 text-green-500" /> Why we built it</h2>
            <p>
              Many online code runners require you to create an account, log in, or wait for server-side containers to spin up. Worse, many of them transmit your code to their servers, raising privacy concerns.
            </p>
            <p>
              We wanted to build something better. JS CodeLab leverages modern browser capabilities to evaluate your code locally using a Web Worker. Your code never leaves your device unless you explicitly generate a shareable URL. All your projects and settings are saved locally in your browser&apos;s IndexedDB.
            </p>
            <ul>
              <li><strong>Zero friction:</strong> Open the page and start typing immediately.</li>
              <li><strong>Total privacy:</strong> Your code stays on your machine.</li>
              <li><strong>Pro features:</strong> Powered by the Monaco Editor, bringing VS Code-level IntelliSense, syntax highlighting, and formatting directly to the web.</li>
            </ul>

            <h2 className="flex items-center gap-2">Open Source</h2>
            <p>
              We believe in the power of open source. The entire JS CodeLab platform is open source and available on GitHub. We welcome contributions, bug reports, and feature requests from the community.
            </p>
            <p>
              <a href="https://github.com/sureshkumar9651/compiler" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">
                View the source code on GitHub →
              </a>
            </p>
          </section>
        </div>
      </main>
      
      <footer className="py-12 text-center border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center space-y-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <Link href="/playground" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Playground</Link>
            <Link href="/examples" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Examples</Link>
            <Link href="/learn" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Learn</Link>
            <Link href="/about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy</Link>
            <a href="https://github.com/sureshkumar9651/compiler" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-white transition-colors">GitHub</a>
          </div>
          <p className="text-sm text-neutral-500 mt-4">
            © 2026 JS CodeLab. Free Online JavaScript Compiler & Playground.
          </p>
        </div>
      </footer>
    </div>
  );
}
