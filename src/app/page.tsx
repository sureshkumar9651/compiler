import Link from 'next/link';
import { ArrowRight, Zap, Code2, BookOpen } from 'lucide-react';
import { HomeHeader } from '@/components/layout/HomeHeader';

export default function LandingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JS CodeLab",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "description": "A free browser-based JavaScript compiler and playground. Write, run, test, and learn JavaScript online instantly.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeHeader />

      <main className="flex-1 flex flex-col items-center px-4 py-16 md:py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        {/* Hero Section */}
        <section className="max-w-4xl text-center space-y-8 w-full mb-24">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 pb-2">
            Free Online JavaScript Compiler
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            JS CodeLab is a free online JavaScript compiler and playground for writing, running, testing, and learning JavaScript directly in your browser. No installation or account required.
          </p>
          <div className="flex items-center justify-center pt-4 gap-4 flex-wrap">
            <Link 
              href="/playground" 
              className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
            >
              Open JavaScript Compiler
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
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
            <h2 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">Run JavaScript Online</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Execute modern JavaScript code instantly. Our secure in-browser execution engine evaluates your code securely without requiring server round-trips, giving you immediate feedback.
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/50 shadow-sm">
            <Code2 className="h-10 w-10 text-blue-500 mb-6" />
            <h2 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">JavaScript Compiler Features</h2>
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

        {/* Content Section for AI & Search */}
        <section className="max-w-4xl w-full text-left space-y-16 mb-16 px-4">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">What is an online JavaScript compiler?</h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
              An online JavaScript compiler is a web-based tool that allows you to write, edit, and execute JavaScript code directly in your internet browser. Unlike traditional local development environments, JS CodeLab doesn&apos;t require you to install Node.js, configure build tools, or set up a local server. You can simply open the website and start coding immediately.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">How do I run JavaScript online?</h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
              Running JavaScript online with JS CodeLab is simple:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-neutral-600 dark:text-neutral-400 text-lg">
              <li>Open the <Link href="/playground" className="text-blue-500 hover:underline">Playground</Link>.</li>
              <li>Type your JavaScript code into the editor.</li>
              <li>Click the &quot;Run&quot; button or press <kbd className="bg-neutral-200 dark:bg-neutral-800 px-2 py-1 rounded text-sm">Ctrl + Enter</kbd>.</li>
              <li>View your output immediately in the integrated console.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Why use JS CodeLab?</h2>
            <ul className="list-disc pl-6 space-y-3 text-neutral-600 dark:text-neutral-400 text-lg">
              <li><strong className="text-neutral-900 dark:text-white">It is completely free:</strong> No subscriptions, no hidden fees.</li>
              <li><strong className="text-neutral-900 dark:text-white">Local-first privacy:</strong> Your projects are saved securely in your browser&apos;s IndexedDB. We don&apos;t store your code on our servers.</li>
              <li><strong className="text-neutral-900 dark:text-white">Instant sharing:</strong> Share your code snippets effortlessly by generating a unique URL containing your exact code state.</li>
              <li><strong className="text-neutral-900 dark:text-white">Professional tooling:</strong> Built with the same editor technology that powers Visual Studio Code.</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Frequently Asked Questions</h2>
            <div className="space-y-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Is JS CodeLab free?</h3>
                <p className="text-neutral-600 dark:text-neutral-400">Yes, JS CodeLab is a 100% free online JavaScript playground.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Does JS CodeLab require installation?</h3>
                <p className="text-neutral-600 dark:text-neutral-400">No installation is required. JS CodeLab runs entirely within your web browser using client-side Web Workers for execution.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Can I test modern JavaScript features?</h3>
                <p className="text-neutral-600 dark:text-neutral-400">Absolutely. You can write and test modern ECMAScript features including async/await, arrow functions, and destructuring.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-12 text-center border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center space-y-4">
          <div className="flex gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <Link href="/playground" className="hover:text-neutral-900 dark:hover:text-white transition-colors">JavaScript Compiler</Link>
            <Link href="/examples" className="hover:text-neutral-900 dark:hover:text-white transition-colors">JavaScript Examples</Link>
            <Link href="/learn" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Learn JavaScript</Link>
          </div>
          <p className="text-sm text-neutral-500">
            © 2026 JS CodeLab. Free Online JavaScript Compiler & Playground.
          </p>
        </div>
      </footer>
    </div>
  );
}
