import Link from 'next/link';
import { TerminalSquare, ArrowRight, Zap, Code2, LayoutTemplate } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <TerminalSquare className="h-6 w-6 text-blue-500" />
          <span className="font-bold text-xl tracking-tight">JS CodeLab</span>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-neutral-400">
          <Link href="/playground" className="hover:text-neutral-50 transition-colors">Playground</Link>
          <Link href="/examples" className="hover:text-neutral-50 transition-colors">Examples</Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-50 transition-colors">GitHub</a>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neutral-50 to-neutral-400">
            Code, run, and share JavaScript instantly.
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            A professional online IDE designed for modern JavaScript developers. 
            Experience instant feedback, deep editor integration, and seamless execution.
          </p>
          <div className="flex items-center justify-center pt-4">
            <Link 
              href="/playground" 
              className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 active:scale-95"
            >
              Open Playground
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mt-32 text-left">
          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950/50">
            <Zap className="h-8 w-8 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Execution</h3>
            <p className="text-neutral-400 leading-relaxed">Run your JavaScript code instantly with our fast and secure execution environment.</p>
          </div>
          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950/50">
            <Code2 className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pro Editor</h3>
            <p className="text-neutral-400 leading-relaxed">Powered by Monaco, featuring syntax highlighting, autocompletion, and multi-cursor support.</p>
          </div>
          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950/50">
            <LayoutTemplate className="h-8 w-8 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Clean UI</h3>
            <p className="text-neutral-400 leading-relaxed">A developer-first interface without the clutter. Focus entirely on your code.</p>
          </div>
        </div>
      </main>
      
      <footer className="py-8 text-center text-sm text-neutral-500 border-t border-neutral-800">
        © 2026 JS CodeLab. Built for modern developers.
      </footer>
    </div>
  );
}
