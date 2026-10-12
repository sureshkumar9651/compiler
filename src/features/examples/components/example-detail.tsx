'use client';

import { CodeExample } from '@/features/examples/types/example';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { ArrowLeft, ArrowRight, Check, Code2, Copy, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProjectStore } from '@/store/useProjectStore';
import { useState } from 'react';

// Monaco is loaded only on user interaction to keep initial bundle lightweight and fast
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[450px] bg-neutral-900 text-neutral-400 font-mono text-sm">
      Loading interactive Monaco editor...
    </div>
  ),
});

interface ExampleDetailProps {
  example: CodeExample;
  prevExample?: { id: string; title: string };
  nextExample?: { id: string; title: string };
}

export function ExampleDetail({ example, prevExample, nextExample }: ExampleDetailProps) {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const { createProject, selectProject, projects } = useProjectStore();
  const [copied, setCopied] = useState(false);
  const [showInteractiveEditor, setShowInteractiveEditor] = useState(false);

  const handleOpenPlayground = async () => {
    let newName = example.title;
    let counter = 1;
    while (projects.some(p => p.name === newName)) {
      newName = `${example.title} Copy ${counter}`;
      counter++;
    }

    const newProject = await createProject(newName, example.code);
    selectProject(newProject.id);
    router.push('/playground');
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(example.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formattedDate = example.dateModified
    ? new Date(example.dateModified).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'October 12, 2026';

  return (
    <article className="max-w-4xl mx-auto space-y-10">
      {/* Visual Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/examples" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Examples
        </Link>
        <span>/</span>
        <span className="capitalize">{example.category.replace('-', ' ')}</span>
        <span>/</span>
        <span className="text-neutral-900 dark:text-neutral-100 font-medium truncate max-w-[240px]">
          {example.title}
        </span>
      </nav>

      {/* Header & Meta */}
      <header className="space-y-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40 text-xs font-semibold uppercase tracking-wider rounded-md">
            {example.category.replace('-', ' ')}
          </span>
          <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold uppercase tracking-wider rounded-md">
            {example.difficulty}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
          {example.seoTitle || example.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span>By</span>
            <Link
              href="/about"
              className="font-medium text-neutral-900 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline-offset-4 hover:underline"
            >
              JS CodeLab Engineering Team
            </Link>
          </div>
          <span className="text-neutral-300 dark:text-neutral-700">•</span>
          <div>Updated <time dateTime={example.dateModified || '2026-10-12'}>{formattedDate}</time></div>
        </div>

        {/* Direct Answer / Definition Box */}
        <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Direct Answer & Overview
          </p>
          <p className="text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
            {example.description}
          </p>
        </div>

        {example.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {example.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-xs text-neutral-600 dark:text-neutral-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Code Actions & Execution Area */}
      <section aria-labelledby="code-runner-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h2 id="code-runner-heading" className="text-xl font-bold text-neutral-900 dark:text-white">
            JavaScript Source Code
          </h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopyCode}
              type="button"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-800 dark:text-neutral-200 text-sm font-medium rounded-xl transition-all shadow-sm"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied to Clipboard' : 'Copy Code'}
            </button>
            <button
              onClick={handleOpenPlayground}
              type="button"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-all shadow-md shadow-blue-500/20"
            >
              <Play className="h-4 w-4" />
              Run in Playground
            </button>
          </div>
        </div>

        {/* Code Editor Window */}
        <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] shadow-lg">
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-100/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-400/80"></span>
              <span className="ml-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">example.js</span>
            </div>
            <button
              onClick={() => setShowInteractiveEditor(!showInteractiveEditor)}
              type="button"
              className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Code2 className="w-3.5 h-3.5" />
              {showInteractiveEditor ? 'View Static Code' : 'Load Interactive Editor'}
            </button>
          </div>

          <div className="w-full relative min-h-[220px]">
            {showInteractiveEditor ? (
              <div className="h-[450px]">
                <MonacoEditor
                  height="100%"
                  defaultLanguage="javascript"
                  value={example.code}
                  theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
                  options={{
                    readOnly: false,
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: 'var(--font-geist-mono), monospace',
                    padding: { top: 16, bottom: 16 },
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    lineNumbersMinChars: 4,
                  }}
                />
              </div>
            ) : (
              <pre className="p-6 font-mono text-sm text-neutral-900 dark:text-neutral-100 overflow-x-auto bg-neutral-50/50 dark:bg-neutral-950/50 leading-relaxed">
                <code>{example.code}</code>
              </pre>
            )}
          </div>
        </div>
      </section>

      {/* Technical Explanation */}
      {example.explanation && (
        <section aria-labelledby="explanation-heading" className="space-y-3">
          <h2 id="explanation-heading" className="text-2xl font-bold text-neutral-900 dark:text-white">
            How does this JavaScript code work?
          </h2>
          <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 leading-relaxed text-base">
            <p>{example.explanation}</p>
          </div>
        </section>
      )}

      {/* Expected Output */}
      {example.expectedOutput && (
        <section aria-labelledby="output-heading" className="space-y-3">
          <h2 id="output-heading" className="text-2xl font-bold text-neutral-900 dark:text-white">
            What is the expected terminal output?
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Executing this code in JS CodeLab produces the following stdout sequence in the developer console:
          </p>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-200 font-mono text-sm p-4 overflow-x-auto shadow-inner">
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-2 pb-2 border-b border-neutral-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Console Standard Output
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed">
              <code>{example.expectedOutput}</code>
            </pre>
          </div>
        </section>
      )}

      {/* Common Mistakes */}
      {example.commonMistakes && example.commonMistakes.length > 0 && (
        <section aria-labelledby="mistakes-heading" className="space-y-4">
          <h2 id="mistakes-heading" className="text-2xl font-bold text-neutral-900 dark:text-white">
            Common mistakes to avoid
          </h2>
          <ul className="space-y-3 list-none pl-0">
            {example.commonMistakes.map((mistake, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed"
              >
                <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">!</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Frequently Asked Questions */}
      {example.faq && example.faq.length > 0 && (
        <section aria-labelledby="faq-heading" className="space-y-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <h2 id="faq-heading" className="text-2xl font-bold text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {example.faq.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-2"
              >
                <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                  {item.question}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Learn Guide Deep Dive Callout */}
      {example.learnGuideSlug && (
        <section className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-transparent border border-blue-200 dark:border-blue-900/50 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Comprehensive Tutorial
          </p>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
            Want an in-depth understanding of this topic?
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 pb-2">
            Read our complete, interactive tutorial covering memory management, edge cases, and best practices.
          </p>
          <Link
            href={`/learn/${example.learnGuideSlug}`}
            className="inline-flex items-center gap-2 font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
          >
            Read the full {example.learnGuideSlug.replace('-', ' ')} tutorial &rarr;
          </Link>
        </section>
      )}

      {/* Previous / Next Navigation */}
      {(prevExample || nextExample) && (
        <nav aria-label="Example Navigation" className="pt-6 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevExample ? (
            <Link
              href={`/examples/${prevExample.id}`}
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-800 transition-all text-left group"
            >
              <div className="flex items-center gap-2 text-xs text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous Example
              </div>
              <div className="font-semibold text-neutral-900 dark:text-neutral-100 mt-1 truncate">
                {prevExample.title}
              </div>
            </Link>
          ) : <div />}

          {nextExample ? (
            <Link
              href={`/examples/${nextExample.id}`}
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-800 transition-all text-right group"
            >
              <div className="flex items-center justify-end gap-2 text-xs text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Next Example
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="font-semibold text-neutral-900 dark:text-neutral-100 mt-1 truncate">
                {nextExample.title}
              </div>
            </Link>
          ) : <div />}
        </nav>
      )}

      {/* Related Examples Block */}
      {example.relatedSlugs && example.relatedSlugs.length > 0 && (
        <section aria-labelledby="related-examples-heading" className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
          <h2 id="related-examples-heading" className="text-xl font-bold text-neutral-900 dark:text-white">
            Related JavaScript Examples
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {example.relatedSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/examples/${slug}`}
                className="px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-sm font-medium text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                {slug.replace(/-/g, ' ')} &rarr;
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
