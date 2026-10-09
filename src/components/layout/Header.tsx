'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TerminalSquare, Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <TerminalSquare className="h-6 w-6 text-blue-500 shrink-0" />
        <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white">JS CodeLab</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-500 dark:text-neutral-400">
        <a href="/playground" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Playground</a>
        <Link href="/examples" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Examples</Link>
        <Link href="/learn" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Learn</Link>
        <a href="https://github.com/sureshkumar9651/compiler" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">GitHub</a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 -mr-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shadow-lg md:hidden">
          <nav className="flex flex-col p-4 space-y-4 text-base font-medium text-neutral-600 dark:text-neutral-300">
            <a 
              href="/playground" 
              className="px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-xl transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Playground
            </a>
            <Link 
              href="/examples" 
              className="px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-xl transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Examples
            </Link>
            <Link 
              href="/learn" 
              className="px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-xl transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Learn
            </Link>
            <a 
              href="https://github.com/sureshkumar9651/compiler" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-xl transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
