import { Metadata } from 'next';
import { BookOpen, ChevronRight, Sparkles, Layers, Zap, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { learnTopics } from '@/features/learn/data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Learn JavaScript Online — Free Tutorials & Guides',
  description:
    'Master JavaScript with step-by-step interactive tutorials. Explore closures, promises, async/await, arrays, and scopes with runnable code in your browser.',
  alternates: {
    canonical: '/learn',
  },
  openGraph: {
    title: 'Learn JavaScript Online — Tutorials & Guides | JS CodeLab',
    description:
      'Master JavaScript with step-by-step interactive tutorials. Explore closures, promises, async/await, arrays, and scopes with runnable code in your browser.',
    url: '/learn',
    siteName: 'JS CodeLab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn JavaScript Online — Tutorials & Guides | JS CodeLab',
    description:
      'Master JavaScript with step-by-step interactive tutorials. Explore closures, promises, async/await, arrays, and scopes with runnable code in your browser.',
  },
};

export default function LearnIndexPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Learn JavaScript',
        item: `${siteUrl}/learn`,
      },
    ],
  };

  const tracks = [
    {
      title: '1. Core Language Fundamentals',
      icon: Sparkles,
      description: 'Master variable bindings, temporal dead zones, function mechanics, and lexical scoping.',
      ids: ['variables', 'functions', 'template-literals', 'scope-and-hoisting'],
    },
    {
      title: '2. Data Structures & Modern Syntax',
      icon: Layers,
      description: 'Work with complex object representations, array manipulation, and ES6 destructuring idioms.',
      ids: ['objects', 'arrays', 'destructuring', 'spread-rest'],
    },
    {
      title: '3. Functional Programming & Arrays',
      icon: Zap,
      description: 'Build immutable data processing pipelines and master closures and memory encapsulation.',
      ids: ['map-vs-foreach', 'array-reduce', 'closures'],
    },
    {
      title: '4. Asynchronous Flow & Execution Context',
      icon: ShieldAlert,
      description: 'Conquer the event loop, Promise resolution states, async/await concurrency, and dynamic this binding.',
      ids: ['promises', 'error-handling', 'this-keyword'],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <JsonLd data={structuredData} />
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="mb-14 space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <BookOpen className="h-3.5 w-3.5" />
            Curriculum & Tutorials
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            Learn JavaScript Step-by-Step
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Comprehensive, deeply-researched JavaScript guides written for engineers. Every tutorial features definition-first explanations, question-driven deep dives, common pitfalls, and live code examples runnable directly in your browser.
          </p>
        </div>

        {/* Structured Learning Tracks */}
        <div className="space-y-12">
          {tracks.map((track) => {
            const IconComponent = track.icon;
            const trackTopics = track.ids
              .map((id) => learnTopics.find((t) => t.id === id))
              .filter(Boolean);

            return (
              <section key={track.title} className="space-y-4">
                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2.5">
                    <IconComponent className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    {track.title}
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {track.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trackTopics.map((topic) => (
                    <Link
                      key={topic!.id}
                      href={`/learn/${topic!.id}`}
                      className="group p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {topic!.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                          {topic!.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
                        <span>Read Tutorial</span>
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
