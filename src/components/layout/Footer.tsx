import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-12 text-center border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 mt-auto">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center space-y-4">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <a href="/playground" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Playground</a>
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
  );
}
