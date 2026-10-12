import { Metadata } from 'next';
import Link from 'next/link';
import { Info, Shield, Cpu, GitBranch, ExternalLink, Calendar, Mail, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'About JS CodeLab: Architecture & Team',
  description:
    'Learn about JS CodeLab, our mission for accessible web development, local-first execution via Web Workers, IndexedDB storage, and open-source architecture.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About JS CodeLab — Architecture, Team & Privacy Model',
    description:
      'Learn about JS CodeLab, our mission for accessible web development, local-first execution via Web Workers, IndexedDB storage, and open-source architecture.',
    url: '/about',
    siteName: 'JS CodeLab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About JS CodeLab — Architecture, Team & Privacy Model',
    description:
      'Learn about JS CodeLab, our mission for accessible web development, local-first execution via Web Workers, IndexedDB storage, and open-source architecture.',
  },
};

export default function AboutPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app';

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About JS CodeLab',
      url: `${siteUrl}/about`,
      description:
        'Technical architecture, privacy guarantees, engineering team, and open-source release notes for JS CodeLab.',
      mainEntity: {
        '@type': 'Organization',
        name: 'JS CodeLab',
        url: siteUrl,
        logo: `${siteUrl}/icon.png`,
        founder: {
          '@type': 'Person',
          name: 'Suresh Kumar',
        },
        sameAs: ['https://github.com/sureshkumar9651/compiler'],
      },
    },
    {
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
          name: 'About',
          item: `${siteUrl}/about`,
        },
      ],
    },
  ];

  const changelog = [
    {
      version: 'v2.4',
      date: 'October 2026',
      title: 'Full Certification Catalog & Technical SEO Overhaul',
      highlights: [
        'Activated all 30+ interactive developer certification question banks with validated grading.',
        'Engineered complete server-rendered documentation and FAQ schema across the playground and example hubs.',
        'Published detailed answer-engine-optimized (AEO) tutorials for closures, promises, arrays, and scopes.',
        'Implemented public machine-readable llms.txt specifications for generative engines.',
      ],
    },
    {
      version: 'v2.2',
      date: 'September 2026',
      title: 'Multi-Project IndexedDB Workspace & Dark Theme',
      highlights: [
        'Integrated IndexedDB local storage using Dexie.js for persistent, zero-login project tabs.',
        'Added Prettier-powered automatic code formatting.',
        'Implemented seamless system, dark, and light theme switching.',
      ],
    },
    {
      version: 'v2.0',
      date: 'August 2026',
      title: 'Web Worker Isolation & Monaco Engine',
      highlights: [
        'Migrated code evaluation to an isolated Web Worker sandbox using Comlink RPC.',
        'Upgraded core code editor to Monaco with VS Code-grade TypeScript IntelliSense.',
        'Introduced real-time console stdout stream interceptor and timing profiling.',
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <JsonLd data={structuredData} />
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-14">
          {/* Hero Header */}
          <header className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              About JS CodeLab
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              A free, privacy-first JavaScript playground and learning platform built for modern web developers.
            </p>
          </header>

          {/* Mission & Purpose */}
          <section className="p-8 rounded-3xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Info className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                Our Mission & Vision
              </h2>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base">
              JS CodeLab was founded on a simple principle: writing, testing, and learning JavaScript should be instantaneous, distraction-free, and respectful of developer privacy. We eliminate the barriers of traditional cloud IDEs—no account registration required, no subscription paywalls, and no waiting for remote server containers to boot.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base">
              Whether you are an aspiring software engineer understanding variables for the first time or a senior architect verifying an ECMAScript edge case, JS CodeLab provides a high-performance playground and structured assessment catalog.
            </p>
          </section>

          {/* Privacy & Sandboxing Architecture */}
          <section className="p-8 rounded-3xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                Client-Side Privacy Architecture
              </h2>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base">
              Unlike server-side code runners that transmit your code across the internet to execute inside remote Docker containers, JS CodeLab operates entirely on a <strong>local-first execution model</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <h3 className="font-semibold text-neutral-900 dark:text-white text-base">
                  Web Worker Isolation
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Code executes inside an isolated background Web Worker thread, preventing infinite loops or syntax crashes from freezing the UI.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <h3 className="font-semibold text-neutral-900 dark:text-white text-base">
                  IndexedDB Storage
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Your projects, test drafts, and certificate states persist inside your browser&apos;s IndexedDB database. Nothing is sent to a remote database.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <h3 className="font-semibold text-neutral-900 dark:text-white text-base">
                  Monaco Code Editor
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Powered by Microsoft&apos;s Monaco Editor—the engine behind VS Code—offering desktop-class autocompletion and diagnostic linting.
                </p>
              </div>
            </div>
          </section>

          {/* Engineering Team & Open Source */}
          <section className="p-8 rounded-3xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                Team & Open Source Community
              </h2>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base">
              JS CodeLab is developed and maintained by <strong>Suresh Kumar</strong> alongside a global community of open-source software engineers. We believe educational developer tooling should be open, transparent, and auditable.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="https://github.com/sureshkumar9651/compiler"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm"
              >
                <GitBranch className="w-4 h-4" />
                View GitHub Repository
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
              </a>
              <Link
                href="/certifications"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-sm font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                Explore Developer Certifications
              </Link>
            </div>
          </section>

          {/* Visible Changelog / What's New */}
          <section aria-labelledby="changelog-heading" className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Calendar className="w-6 h-6" />
              </div>
              <h2 id="changelog-heading" className="text-2xl font-bold text-neutral-900 dark:text-white">
                Changelog & Platform Releases
              </h2>
            </div>

            <div className="space-y-6">
              {changelog.map((release) => (
                <div
                  key={release.version}
                  className="p-6 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono text-xs font-bold">
                        {release.version}
                      </span>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                        {release.title}
                      </h3>
                    </div>
                    <time className="text-xs text-neutral-500 font-medium">{release.date}</time>
                  </div>
                  <ul className="space-y-2 pt-1">
                    {release.highlights.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Information */}
          <section className="p-8 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-neutral-500" />
              Contact & Inquiries
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Have feedback, detected a bug, or want to contribute new example templates? Open an issue on our{' '}
              <a
                href="https://github.com/sureshkumar9651/compiler/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline font-medium"
              >
                GitHub Issues tracker
              </a>{' '}
              or reach out via our community discussions.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
