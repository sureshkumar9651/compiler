import { Metadata } from 'next';
import Link from 'next/link';
import { ExamplesClient } from '@/features/examples/components/examples-client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { exampleService } from '@/features/examples/services/example-service';
import { Code2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'JavaScript Code Examples (Run Online)',
  description:
    'Browse practical, runnable JavaScript code examples covering arrays, async/await, closures, algorithms, and DOM-free ES features. Run and edit code instantly.',
  alternates: {
    canonical: '/examples',
  },
  openGraph: {
    title: 'JavaScript Code Examples (Run Online) | JS CodeLab',
    description:
      'Browse practical, runnable JavaScript code examples covering arrays, async/await, closures, algorithms, and DOM-free ES features. Run and edit code instantly.',
    url: '/examples',
    siteName: 'JS CodeLab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JavaScript Code Examples (Run Online) | JS CodeLab',
    description:
      'Browse practical, runnable JavaScript code examples covering arrays, async/await, closures, algorithms, and DOM-free ES features.',
  },
};

export default function ExamplesPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app';
  const allExamples = exampleService.getAllExamples();
  const starterTemplates = exampleService.getStarterTemplates();

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
        name: 'JavaScript Examples',
        item: `${siteUrl}/examples`,
      },
    ],
  };

  const categories = [
    {
      id: 'basics',
      title: 'Language Basics & Primitives',
      description: 'Foundational syntax including console logging, variable scoping with let/const, and string interpolation.',
      examples: allExamples.filter((e) => e.category === 'basics'),
    },
    {
      id: 'functions',
      title: 'Functions & Execution Models',
      description: 'Function declarations, ES6 arrow expressions with lexical this, and default parameter fallback patterns.',
      examples: allExamples.filter((e) => e.category === 'functions'),
    },
    {
      id: 'arrays',
      title: 'Arrays & Functional Pipelines',
      description: 'Immutable transformation pipelines using higher-order methods: map, filter, reduce, and find.',
      examples: allExamples.filter((e) => e.category === 'arrays'),
    },
    {
      id: 'objects',
      title: 'Objects & Modern ES Features',
      description: 'Object key-value manipulation, destructuring assignment, spread cloning, and optional chaining syntax.',
      examples: [
        ...allExamples.filter((e) => e.category === 'objects'),
        ...allExamples.filter((e) => e.category === 'modern-javascript'),
      ],
    },
    {
      id: 'async',
      title: 'Asynchronous Programming & Timers',
      description: 'Promise chaining, async/await sequential flow, microtask scheduling, and setTimeout event loop timing.',
      examples: allExamples.filter((e) => e.category === 'async'),
    },
    {
      id: 'error-handling',
      title: 'Defensive Error Handling',
      description: 'Robust try/catch exception interception and custom Error object throwing with debugging stack traces.',
      examples: allExamples.filter((e) => e.category === 'error-handling'),
    },
    {
      id: 'algorithms',
      title: 'Algorithms & Problem Solving',
      description: 'Classic algorithmic challenges: string reversals, palindrome checks, FizzBuzz modulo loops, and recursion.',
      examples: allExamples.filter((e) => e.category === 'algorithms'),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <JsonLd data={structuredData} />
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Hero */}
        <div className="mb-10 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            JavaScript Code Examples
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            Explore curated, production-tested JavaScript code examples. Every example runs in an isolated client-side Web Worker sandbox without server round-trips. Inspect expected terminal output, review common developer pitfalls, and edit the code live in our browser-based compiler.
          </p>
        </div>

        {/* Interactive Filterable Client Component */}
        <ExamplesClient />

        {/* Server-Rendered Categorized Directory for SEO & Generative Crawlers */}
        <section aria-labelledby="all-examples-directory" className="mt-20 pt-12 border-t border-neutral-200 dark:border-neutral-800 space-y-12">
          <div className="space-y-2">
            <h2 id="all-examples-directory" className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Complete JavaScript Code Directory
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl text-base">
              Explore our full catalog categorized by language domain. Every link leads to a dedicated lesson page with direct code walkthroughs, expected terminal outputs, and FAQs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm"
              >
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {category.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {category.description}
                  </p>
                </div>

                <ul className="space-y-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  {category.examples.map((example) => (
                    <li key={example.id}>
                      <Link
                        href={`/examples/${example.id}`}
                        className="group flex items-center justify-between text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <span className="truncate pr-2">{example.title}</span>
                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-transform group-hover:translate-x-0.5 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Starter Templates Box */}
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-500" />
                  Starter Scratchpads & Templates
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Pre-configured boilerplate environments for prototyping algorithms, array methods, and async operations.
                </p>
              </div>

              <ul className="space-y-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                {starterTemplates.map((template) => (
                  <li key={template.id}>
                    <Link
                      href={`/examples/${template.id}`}
                      className="group flex items-center justify-between text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span className="truncate pr-2">{template.title}</span>
                      <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-transform group-hover:translate-x-0.5 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
