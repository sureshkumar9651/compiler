import Link from 'next/link';
import { ArrowRight, Zap, Code2, BookOpen } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { learnTopics } from '@/features/learn/data';
import { exampleService } from '@/features/examples/services/example-service';

export default function LandingPage() {
  const popularExamples = exampleService.getAllExamples().slice(0, 6);
  const topTopics = learnTopics.slice(0, 6);

  const faqItems = [
    { question: "Is JS CodeLab free?", answer: "Yes, JS CodeLab is a 100% free online JavaScript playground." },
    { question: "Does JS CodeLab require installation?", answer: "No installation is required. JS CodeLab runs entirely within your web browser using client-side Web Workers for execution." },
    { question: "Can I test modern JavaScript features?", answer: "Absolutely. You can write and test modern ECMAScript features including async/await, arrow functions, and destructuring." }
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "JS CodeLab",
      "url": "https://jscodelab-js.vercel.app",
      "sameAs": "https://github.com/sureshkumar9651/compiler",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any",
      "description": "A free browser-based JavaScript compiler and playground. Write, run, test, and learn JavaScript online instantly.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <main className="flex-1 flex flex-col items-center px-4 py-16 md:py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        {/* Hero Section */}
        <section className="max-w-4xl text-center space-y-8 w-full mb-24">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 pb-2">
            Free Online JavaScript Compiler
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            JS CodeLab is a free online JavaScript runner and playground for writing, running, testing, and learning JavaScript directly in your browser. Use this lightweight JS sandbox without any installation or account.
          </p>
          <div className="flex items-center justify-center pt-4 gap-4 flex-wrap">
            <a 
              href="/playground" 
              className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
            >
              Open JavaScript Compiler
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link 
              href="/examples" 
              className="group flex items-center gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
              View Examples
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full text-left mb-24">
          <div className="p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/50 shadow-sm">
            <Zap className="h-10 w-10 text-yellow-500 mb-6" />
            <h2 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">Test JavaScript Online</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Execute modern JavaScript code instantly. Our secure in-browser execution engine evaluates your code securely without requiring server round-trips, giving you immediate feedback.
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/50 shadow-sm">
            <Code2 className="h-10 w-10 text-blue-500 mb-6" />
            <h2 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">JavaScript Console Online</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Experience a professional IDE interface powered by Monaco Editor. Enjoy syntax highlighting, intelligent autocompletion, real-time diagnostics, and formatting right in your browser.
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/50 shadow-sm">
            <BookOpen className="h-10 w-10 text-purple-500 mb-6" />
            <h2 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">Learn JavaScript With Examples</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Explore our curated library of interactive examples. From basic variables to async/await, test concepts and see how JavaScript works in real-time.
            </p>
          </div>
        </section>

        {/* Popular Examples Section */}
        <section className="max-w-6xl w-full text-left mb-24 px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Popular Examples</h2>
              <p className="text-neutral-600 dark:text-neutral-400">Jump right into code with these runnable snippets.</p>
            </div>
            <Link href="/examples" className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularExamples.map(example => (
              <Link 
                key={example.id} 
                href={`/examples/${example.id}`}
                className="group p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-blue-500 dark:hover:border-blue-500 transition-colors shadow-sm"
              >
                <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {example.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {example.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Learn Section */}
        <section className="max-w-6xl w-full text-left mb-24 px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Learn JavaScript</h2>
              <p className="text-neutral-600 dark:text-neutral-400">Master the fundamentals with interactive guides.</p>
            </div>
            <Link href="/learn" className="text-purple-600 dark:text-purple-400 hover:underline font-medium flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topTopics.map(topic => (
              <Link 
                key={topic.id} 
                href={`/learn/${topic.id}`}
                className="group p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-purple-500 dark:hover:border-purple-500 transition-colors shadow-sm"
              >
                <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {topic.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Content Section for AI & Search */}
        <section className="max-w-4xl w-full text-left space-y-16 mb-16 px-4">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">What is an online JavaScript compiler?</h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
              An online JavaScript compiler (or JS runner) is a web-based tool that allows you to write, edit, and execute JavaScript code directly in your internet browser. Unlike traditional local development environments, JS CodeLab doesn&apos;t require you to install Node.js, configure build tools, or set up a local server. You can simply open the website and start coding immediately in a safe JS sandbox.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">How do I run JavaScript online?</h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
              Testing JavaScript online with JS CodeLab is simple:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-neutral-600 dark:text-neutral-400 text-lg">
              <li>Open the <a href="/playground" className="text-blue-500 hover:underline">Playground</a>.</li>
              <li>Type your JavaScript code into the editor.</li>
              <li>Click the &quot;Run&quot; button or press <kbd className="bg-neutral-200 dark:bg-neutral-800 px-2 py-1 rounded text-sm">Ctrl + Enter</kbd>.</li>
              <li>View your output immediately in the integrated JavaScript console online.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Privacy and how it works</h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
              JS CodeLab is built with a strictly local-first architecture to guarantee your privacy and ensure lightning-fast execution:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-neutral-600 dark:text-neutral-400 text-lg">
              <li><strong className="text-neutral-900 dark:text-white">Execution in Web Workers:</strong> Your code is executed safely in an isolated background thread (Web Worker) directly within your browser.</li>
              <li><strong className="text-neutral-900 dark:text-white">Code Saved in IndexedDB:</strong> All your projects, snippets, and settings are saved locally to your browser&apos;s IndexedDB.</li>
              <li><strong className="text-neutral-900 dark:text-white">Nothing Sent to Servers:</strong> Your code is never transmitted, processed, or saved on any external servers. The only network requests made are to download the static assets required to run the editor.</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Frequently Asked Questions</h2>
            <div className="space-y-6 mt-6">
              {faqItems.map((item, i) => (
                <div key={i}>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">{item.question}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
