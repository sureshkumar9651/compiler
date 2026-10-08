'use client';

import { CodeExample } from '@/features/examples/types/example';
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { ArrowLeft, Check, Copy, Play } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProjectStore } from '@/store/useProjectStore';
import { useState } from 'react';

interface ExampleDetailProps {
  example: CodeExample;
}

export function ExampleDetail({ example }: ExampleDetailProps) {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const { createProject, selectProject, projects } = useProjectStore();
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Link 
        href="/examples"
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Examples
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div className="space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 text-xs font-semibold uppercase tracking-wider rounded-md">
              {example.category.replace('-', ' ')}
            </span>
            <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 text-xs font-semibold uppercase tracking-wider rounded-md">
              {example.difficulty}
            </span>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {example.title}
          </h1>
          
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {example.description}
          </p>

          {example.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {example.tags.map(tag => (
                <span key={tag} className="text-sm text-neutral-500 dark:text-neutral-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleCopyCode}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 text-neutral-900 dark:text-white font-medium rounded-xl transition-all"
          >
            {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          
          <button
            onClick={handleOpenPlayground}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            <Play className="h-5 w-5" />
            Open in Playground
          </button>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] shadow-xl">
        <div className="flex items-center px-4 py-3 bg-neutral-100/50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
          </div>
          <span className="ml-4 text-xs font-mono text-neutral-500">example.js</span>
        </div>
        
        <div className="h-[500px] w-full">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={example.code}
            theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'var(--font-geist-mono), monospace',
              padding: { top: 24, bottom: 24 },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              lineNumbersMinChars: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
}
