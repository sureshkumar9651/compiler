import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PlaygroundClient } from './PlaygroundClient';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  Code2,
  Cpu,
  Database,
  Keyboard,
  ShieldCheck,
  Zap,
  HelpCircle,
  Play,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'JavaScript Playground & Online Code Runner',
  description:
    'Execute JavaScript online with real-time console feedback, Monaco editor, local Web Worker isolation, and offline IndexedDB saving in a secure JS sandbox.',
  alternates: {
    canonical: '/playground',
  },
  openGraph: {
    title: 'JavaScript Playground & Online Code Runner | JS CodeLab',
    description:
      'Execute JavaScript online with real-time console feedback, Monaco editor, local Web Worker isolation, and offline IndexedDB saving in a secure JS sandbox.',
    url: '/playground',
    siteName: 'JS CodeLab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JavaScript Playground & Online Code Runner | JS CodeLab',
    description:
      'Execute JavaScript online with real-time console feedback, Monaco editor, local Web Worker isolation, and offline IndexedDB saving in a secure JS sandbox.',
  },
};

const playgroundFaqs = [
  {
    question: 'How does JS CodeLab run JavaScript in the browser?',
    answer:
      'JS CodeLab uses browser-native Web Workers to isolate and execute JavaScript code on a dedicated background thread. Output from console.log, console.error, and console.warn is intercepted and streamed directly into the interactive console panel in real time.',
  },
  {
    question: 'Do I need to install Node.js, npm, or browser extensions?',
    answer:
      'No installation or configuration is required. JS CodeLab operates entirely within any standard modern web browser on desktop, tablet, or mobile devices without requiring Node.js runtime, npm packages, or third-party browser plugins.',
  },
  {
    question: 'Is my code private and secure when running in the playground?',
    answer:
      'Yes. Execution is strictly local-first. Your source code never leaves your device and is never transmitted to remote servers. All your workspaces and files persist exclusively inside your personal browser storage via IndexedDB.',
  },
  {
    question: 'Can I test modern ECMAScript features and asynchronous code?',
    answer:
      'Yes. The execution environment supports modern ECMAScript specifications (ES6 through ES2024+), including async/await, Promises, Fetch API, array transformations, destructuring, and generator functions.',
  },
  {
    question: 'What keyboard shortcuts are supported in the code editor?',
    answer:
      'Press Ctrl+Enter (or Cmd+Enter on macOS) to execute your JavaScript immediately. Use Ctrl+B (or Cmd+B) to toggle the project sidebar, and press Escape to exit fullscreen editing mode.',
  },
];

export default function PlaygroundPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'JS CodeLab JavaScript Playground',
      url: 'https://jscodelab-js.vercel.app/playground',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      description:
        'A browser-based JavaScript compiler and interactive code playground with Monaco editor, Web Worker sandboxing, and offline IndexedDB persistence.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
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
          item: 'https://jscodelab-js.vercel.app',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'JavaScript Playground',
          item: 'https://jscodelab-js.vercel.app/playground',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Run JavaScript Online in JS CodeLab',
      description:
        'Step-by-step guide to writing, executing, and debugging JavaScript in your browser using JS CodeLab.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Write or Paste Code',
          text: 'Type or paste your JavaScript code into the Monaco-powered editor pane.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Execute the Code',
          text: 'Press Ctrl+Enter or click the Run button to evaluate your code safely inside an isolated Web Worker.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Inspect Console Output',
          text: 'Review logs, returned expressions, and error stack traces in the integrated real-time Console panel.',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: playgroundFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <JsonLd data={structuredData} />
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Server-Rendered Hero Intro */}
        <header className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
            <Zap className="h-3.5 w-3.5" />
            <span>Interactive Web Worker Execution Sandbox</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            JavaScript Playground &amp; Online Code Runner
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            JS CodeLab is a free, high-performance in-browser JavaScript compiler and interactive code playground designed for modern web developers, students, and educators. Unlike traditional online code execution tools that route source code through server-side Docker containers or virtual machines, JS CodeLab executes code entirely on the client side using browser-native Web Workers. This architecture eliminates latency, enables instant execution, prevents rate limiting, and guarantees total confidentiality since your source code never traverses external networks.
          </p>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Whether you are prototyping modern ECMAScript features, testing recursive algorithms, exploring JavaScript closures, or debugging asynchronous Promise pipelines, JS CodeLab provides an immediate feedback loop. The playground combines an industry-standard Monaco Editor with real-time console logging, object inspection, error diagnostics, and offline persistence, giving you the full power of a desktop development environment directly in your web browser.
          </p>
        </header>

        {/* Interactive Client Workspace */}
        <section aria-label="Interactive Code Editor">
          <PlaygroundClient />
        </section>

        {/* Core Architecture & Features */}
        <section className="space-y-6 pt-4">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Why Use the JS CodeLab JavaScript Compiler?
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl">
              Engineered from the ground up for speed, privacy, and developer ergonomics with zero account barriers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-xs">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 w-fit">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Monaco Editor Engine
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Enjoy rich VS Code capabilities including syntax highlighting, IntelliSense autocompletion, bracket pair colorization, and error squiggles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 w-fit">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Web Worker Isolation
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Code executes in a separate background thread. Long-running calculations or infinite loops won&apos;t freeze your browser tab or editor interface.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-xs">
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 w-fit">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Offline IndexedDB Storage
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Every project and code snippet is saved locally on your device. Work uninterrupted offline without needing to create or remember login credentials.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-xs">
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 w-fit">
                <Keyboard className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Developer Hotkeys
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Run code instantly with <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs font-mono">Ctrl+Enter</kbd>, toggle sidebar with <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs font-mono">Ctrl+B</kbd>, and toggle fullscreen mode with ease.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Note Banner */}
        <section className="p-6 sm:p-8 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex items-start gap-4">
          <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-emerald-900 dark:text-emerald-200">
              100% Client-Side Privacy Guarantee
            </h2>
            <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
              Your source code is never uploaded, recorded, or sent to any remote server or third-party cloud analytics. All script execution happens entirely inside your local browser instance via a sandboxed Web Worker.
            </p>
          </div>
        </section>

        {/* How To Run JavaScript Online */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              How to Run JavaScript Online in 3 Steps
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Follow these simple steps to compile, execute, and debug your scripts in the playground.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Write or Paste Code
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Type your JavaScript into the Monaco editor. Utilize IntelliSense autocompletion and syntax formatting as you write.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Execute Instantly
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Click the green <strong>Run</strong> button in the header or use the <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs font-mono">Ctrl+Enter</kbd> shortcut to execute immediately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Inspect Output
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Review logged values, returned objects, timing metrics, and runtime errors in the interactive console panel.
              </p>
            </div>
          </div>
        </section>

        {/* Visible FAQs */}
        <section className="space-y-6 pt-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-semibold">
              <HelpCircle className="h-4 w-4" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Frequently Asked Questions About the JavaScript Playground
            </h2>
          </div>

          <div className="space-y-4">
            {playgroundFaqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2 shadow-xs"
              >
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
