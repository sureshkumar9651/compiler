import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TerminalSquare, ArrowLeft, Play } from 'lucide-react';
import Link from 'next/link';
import { learnTopics, getLearnTopicById } from '@/features/learn/data';
import ReactMarkdown from 'react-markdown';

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
      title: 'Topic Not Found | JS CodeLab',
    };
  }

  return {
    title: `${topic.title} Tutorial — Learn JavaScript Online | JS CodeLab`,
    description: topic.description,
    alternates: {
      canonical: `/learn/${topic.id}`,
    },
    openGraph: {
      title: `${topic.title} | Learn JavaScript`,
      description: topic.description,
      url: `/learn/${topic.id}`,
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

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <ReactMarkdown
              components={{
                pre: ({ node, ...props }) => (
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
                code: ({ node, className, ...props }) => {
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

        <div className="mt-16 p-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Ready to practice?</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-xl mx-auto">
            The best way to learn JavaScript is by writing code. Open our free online playground and test what you've just learned.
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
