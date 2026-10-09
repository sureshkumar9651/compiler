import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TerminalSquare, ArrowLeft, Play } from 'lucide-react';
import Link from 'next/link';
import { learnTopics, getLearnTopicById } from '@/features/learn/data';
import ReactMarkdown from 'react-markdown';
import { Header } from '@/components/layout/Header';

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

  return {
    title: `${topic.title} Tutorial — Learn JavaScript Online`,
    description: topic.description,
    alternates: {
      canonical: `/learn/${topic.id}`,
    },
    openGraph: {
      title: `${topic.title} | Learn JavaScript`,
      description: topic.description,
      url: `/learn/${topic.id}`,
      siteName: 'JS CodeLab',
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${topic.title} | Learn JavaScript`,
      description: topic.description,
    }
  };
}

export default async function LearnTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const resolvedParams = await params;
  const topic = getLearnTopicById(resolvedParams.topic);

  if (!topic) {
    notFound();
  }

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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": topic.title,
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app'}/learn/${topic.id}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": topic.title,
    "description": topic.description,
    "articleBody": topic.content,
    "datePublished": "2026-10-09T00:00:00Z",
    "author": {
      "@type": "Organization",
      "name": "JS CodeLab"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([structuredData, articleSchema]) }}
      />
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link 
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Topics
          </Link>
        </div>

        <article className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-6">
            {topic.title}
          </h1>
          <p className="lead text-xl text-neutral-600 dark:text-neutral-400 mb-10">
            {topic.description}
          </p>

          {topic.codeSnippet && (
            <div className="bg-neutral-900 text-neutral-100 p-6 rounded-2xl shadow-sm mb-10 overflow-x-auto font-mono text-sm border border-neutral-800">
              <div className="text-xs text-neutral-400 mb-2 uppercase font-semibold tracking-wider">Example</div>
              <pre><code>{topic.codeSnippet}</code></pre>
            </div>
          )}

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <ReactMarkdown
              components={{
                pre: ({ node: _node, ...props }) => (
                  <div className="relative my-6">
                    <div className="absolute top-0 right-0 flex items-center pr-2 pt-2 z-10">
                      <Link
                        href="/playground"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-md shadow-sm transition-colors"
                      >
                        <Play className="h-3 w-3" />
                        Try in CodeLab
                      </Link>
                    </div>
                    <pre className="bg-neutral-100 dark:bg-neutral-950 p-4 rounded-lg overflow-x-auto text-sm" {...props} />
                  </div>
                ),
                code: ({ node: _node, className, ...props }) => {
                  const match = /language-(\\w+)/.exec(className || '');
                  return match ? (
                    <code className={className} {...props} />
                  ) : (
                    <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono text-purple-600 dark:text-purple-400" {...props} />
                  );
                }
              }}
            >
              {topic.content}
            </ReactMarkdown>
          </div>
        </article>

        {topic.faq && topic.faq.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {topic.faq.map((q, i) => (
                <div key={i} className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-2">{q.question}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">{q.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 p-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Ready to practice?</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-xl mx-auto">
            The best way to learn JavaScript is by writing code. Open our free online playground and test what you&apos;ve just learned.
          </p>
          <Link 
            href="/playground" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
          >
            <Play className="h-5 w-5" />
            Open JavaScript Compiler
          </Link>
        </div>
      </main>
      
      <footer className="py-8 text-center text-sm text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 mt-auto">
        © 2026 JS CodeLab. Free Online JavaScript Compiler & Playground.
      </footer>
    </div>
  );
}
