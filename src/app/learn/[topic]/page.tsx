import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Play, BookOpen, Clock, Calendar, User, Code2 } from 'lucide-react';
import Link from 'next/link';
import { learnTopics, getLearnTopicById } from '@/features/learn/data';
import { exampleService } from '@/features/examples/services/example-service';
import ReactMarkdown from 'react-markdown';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateStaticParams() {
  return learnTopics.map((topic) => ({
    topic: topic.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const topic = getLearnTopicById(resolvedParams.topic);

  if (!topic) {
    return {
      title: 'Topic Not Found',
    };
  }

  const pageTitle = topic.seoTitle || `${topic.title} | JS CodeLab`;
  const pageDescription = topic.seoDescription || topic.description;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `/learn/${topic.id}`,
    },
    openGraph: {
      title: `${pageTitle} | JS CodeLab`,
      description: pageDescription,
      url: `/learn/${topic.id}`,
      siteName: 'JS CodeLab',
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} | JS CodeLab`,
      description: pageDescription,
    },
  };
}

export default async function LearnTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const resolvedParams = await params;
  const topic = getLearnTopicById(resolvedParams.topic);

  if (!topic) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app';
  const pageUrl = `${siteUrl}/learn/${topic.id}`;

  const currentIndex = learnTopics.findIndex((t) => t.id === topic.id);
  const prevTopic = currentIndex > 0 ? learnTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < learnTopics.length - 1 ? learnTopics[currentIndex + 1] : null;

  const relatedExamplesList = (topic.relatedExamples || [])
    .map((slug) => exampleService.getExampleById(slug) || exampleService.getTemplateById(slug))
    .filter((ex): ex is NonNullable<typeof ex> => Boolean(ex));

  const breadcrumbSchema = {
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
      {
        '@type': 'ListItem',
        position: 3,
        name: topic.title,
        item: pageUrl,
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: topic.seoTitle || topic.title,
    description: topic.seoDescription || topic.description,
    datePublished: topic.datePublished || '2026-10-09T00:00:00Z',
    dateModified: topic.dateModified || '2026-10-12T00:00:00Z',
    mainEntityOfPage: pageUrl,
    author: {
      '@type': 'Organization',
      name: 'JS CodeLab',
      url: `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'JS CodeLab',
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
    },
  };

  const structuredData: Array<Record<string, unknown>> = [breadcrumbSchema, articleSchema];

  if (topic.faq && topic.faq.length > 0) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: topic.faq.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <JsonLd data={structuredData} />
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Visible Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Learn JavaScript
          </Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-neutral-100 font-medium truncate">
            {topic.title}
          </span>
        </nav>

        <article className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
            {topic.title}
          </h1>

          {/* Author Byline & Published Meta */}
          <div className="flex items-center gap-4 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 pb-6 mb-6 border-b border-neutral-200 dark:border-neutral-800 not-prose flex-wrap">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-blue-500" />
              <span>By </span>
              <Link href="/about" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                JS CodeLab Engineering Team
              </Link>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-neutral-400" />
              <span>Last updated: October 12, 2026</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-neutral-400" />
              <span>5 min read</span>
            </span>
          </div>

          {/* Direct Answer / Executive Summary Box for AEO & Featured Snippets */}
          <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 mb-8 not-prose">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-1 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Direct Answer &amp; Key Concept</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed m-0">
              {topic.description}
            </p>
          </div>

          {topic.codeSnippet && (
            <div className="bg-neutral-900 text-neutral-100 p-6 rounded-2xl shadow-sm mb-10 overflow-x-auto font-mono text-sm border border-neutral-800 not-prose">
              <div className="flex items-center justify-between mb-3 text-xs text-neutral-400 uppercase font-semibold tracking-wider">
                <span>Runnable Code Snippet</span>
                <a
                  href="/playground"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Play className="h-3 w-3" />
                  <span>Run in Playground</span>
                </a>
              </div>
              <pre className="m-0 p-0 overflow-x-auto bg-transparent">
                <code>{topic.codeSnippet}</code>
              </pre>
            </div>
          )}

          <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <ReactMarkdown
              components={{
                pre: ({ node: _node, ...props }) => (
                  <div className="relative my-6">
                    <div className="absolute top-0 right-0 flex items-center pr-2 pt-2 z-10">
                      <a
                        href="/playground"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-md shadow-sm transition-colors"
                      >
                        <Play className="h-3 w-3" />
                        Try in CodeLab
                      </a>
                    </div>
                    <pre className="bg-neutral-100 dark:bg-neutral-950 p-4 rounded-lg overflow-x-auto text-sm" {...props} />
                  </div>
                ),
                code: ({ node: _node, className, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <code className={className} {...props} />
                  ) : (
                    <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono text-purple-600 dark:text-purple-400" {...props} />
                  );
                },
              }}
            >
              {topic.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Visible FAQs Section matching JSON-LD */}
        {topic.faq && topic.faq.length > 0 && (
          <section className="mt-16 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Frequently Asked Questions About {topic.title.replace(' Guide', '').replace(' Explained', '')}
            </h2>
            <div className="space-y-4">
              {topic.faq.map((q, i) => (
                <div key={i} className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-2">
                  <h3 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
                    {q.question}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {q.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Matching Related Examples Block */}
        {relatedExamplesList.length > 0 && (
          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Code2 className="h-5 w-5 text-emerald-500" />
              <span>Related Runnable JavaScript Examples</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedExamplesList.map((example) => (
                <Link
                  key={example.id}
                  href={`/examples/${example.id}`}
                  className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all shadow-xs group"
                >
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {example.title} Code Example
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                    {example.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Previous & Next Topic Navigation */}
        <nav aria-label="Tutorial Navigation" className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevTopic ? (
            <Link
              href={`/learn/${prevTopic.id}`}
              className="w-full sm:w-auto p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-left flex items-center gap-3"
            >
              <ArrowLeft className="h-5 w-5 text-neutral-400 shrink-0" />
              <div>
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold block">
                  Previous Lesson
                </span>
                <span className="text-sm font-bold text-neutral-900 dark:text-white">
                  {prevTopic.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextTopic && (
            <Link
              href={`/learn/${nextTopic.id}`}
              className="w-full sm:w-auto p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-right flex items-center justify-end gap-3"
            >
              <div>
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold block">
                  Next Lesson
                </span>
                <span className="text-sm font-bold text-neutral-900 dark:text-white">
                  {nextTopic.title}
                </span>
              </div>
              <ArrowRight className="h-5 w-5 text-neutral-400 shrink-0" />
            </Link>
          )}
        </nav>

        {/* Call to Action: Playground */}
        <div className="mt-14 p-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl text-center space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Ready to test what you learned?</h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
            The best way to solidify your JavaScript skills is by writing and running code. Open our free online compiler and test your scripts with real-time console feedback.
          </p>
          <a
            href="/playground"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-all shadow-md shadow-blue-500/20"
          >
            <Play className="h-4 w-4" />
            <span>Open JavaScript Compiler</span>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
