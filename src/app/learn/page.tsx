import { Metadata } from 'next';
import { TerminalSquare, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { learnTopics } from '@/features/learn/data';

export const metadata: Metadata = {
  title: 'Learn JavaScript | JS CodeLab',
  description: 'Learn JavaScript with interactive tutorials, practical examples, and clear explanations. Write and run code directly in your browser.',
  alternates: {
    canonical: '/learn',
  },
  openGraph: {
    title: 'Learn JavaScript Online | JS CodeLab',
    description: 'Learn JavaScript with interactive tutorials and real-time execution in the browser.',
    url: '/learn',
  }
};

export default function LearnIndexPage() {
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
        "name": "Learn JavaScript",
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app'}/learn`
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2">
          <TerminalSquare className="h-6 w-6 text-blue-500" />
          <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-neutral-50">JS CodeLab</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-neutral-500 dark:text-neutral-400">
          <Link href="/playground" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Playground</Link>
          <Link href="/examples" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Examples</Link>
          <Link href="/learn" className="text-neutral-900 dark:text-neutral-50 transition-colors">Learn</Link>
          <a href="https://github.com/sureshkumar9651/compiler" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">GitHub</a>
        </nav>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 space-y-4 text-center">
          <BookOpen className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            Learn JavaScript
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Master JavaScript concepts with our interactive tutorials. Read clear explanations and instantly test your knowledge in the playground.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {learnTopics.map(topic => (
            <Link 
              key={topic.id} 
              href={`/learn/${topic.id}`}
              className="group p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-colors flex items-center justify-between"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {topic.title}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {topic.description}
                </p>
              </div>
              <ChevronRight className="h-6 w-6 text-neutral-400 group-hover:text-purple-500 transition-colors" />
            </Link>
          ))}
        </div>
      </main>
      
      <footer className="py-8 text-center text-sm text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 mt-auto">
        © 2026 JS CodeLab. Built for modern developers.
      </footer>
    </div>
  );
}
