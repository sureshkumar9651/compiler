import { Metadata } from 'next';
import Link from 'next/link';
import { TerminalSquare, ShieldCheck, Database, Lock } from 'lucide-react';
import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Privacy Policy | JS CodeLab',
  description: 'Learn how JS CodeLab protects your privacy through local-first execution and IndexedDB storage.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | JS CodeLab',
    description: 'Learn how JS CodeLab protects your privacy through local-first execution and IndexedDB storage.',
    url: '/privacy',
    siteName: 'JS CodeLab',
    locale: 'en_US',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Your code belongs to you. Here&apos;s how we keep it that way.
            </p>
          </div>

          <section className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
            <p>
              At JS CodeLab, we believe that development tools shouldn&apos;t compromise your privacy. That&apos;s why we built JS CodeLab using a strictly &quot;local-first&quot; architecture. 
            </p>

            <h2 className="flex items-center gap-2"><Lock className="w-6 h-6 text-blue-500" /> What happens to your code</h2>
            <p>
              When you write, edit, or run JavaScript in the JS CodeLab playground, <strong>your code is never sent to our servers</strong>. 
            </p>
            <p>
              The application downloads the necessary static assets (HTML, CSS, JavaScript) to your browser, and from that point on, everything happens locally on your device. Your code is executed securely inside an isolated Web Worker, meaning it cannot access your local file system or sensitive browser data.
            </p>

            <h2 className="flex items-center gap-2"><Database className="w-6 h-6 text-purple-500" /> Where is your data stored?</h2>
            <p>
              Any projects or snippets you save are stored exclusively in your browser using a technology called <strong>IndexedDB</strong>. 
            </p>
            <p>
              Because your data is stored locally:
            </p>
            <ul>
              <li>If you clear your browser data or uninstall your browser, your saved projects will be deleted.</li>
              <li>Your projects are only accessible from the specific device and browser where you created them.</li>
              <li>We (the developers of JS CodeLab) have absolutely no way to view, access, or recover your saved code.</li>
            </ul>

            <h2 className="flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-green-500" /> URL Sharing</h2>
            <p>
              JS CodeLab offers a feature to generate a shareable URL. When you use this feature, your code is compressed and encoded directly into the URL itself (using base64 or similar encoding).
            </p>
            <p>
              This means the URL <em>is</em> the code. We do not store the shared snippet in a database. When someone clicks your link, their browser decodes the URL and loads the code into their local editor.
            </p>

            <h2>Analytics and Tracking</h2>
            <p>
              We do not use invasive third-party tracking scripts or advertising cookies. Our hosting provider (Vercel) provides basic, anonymized web analytics (such as page views and general geographic regions) to help us understand how the site is used and ensure it remains fast and reliable.
            </p>

            <h2>Changes to this Policy</h2>
            <p>
              If we ever introduce features that require server-side storage (such as user accounts or cloud syncing), this privacy policy will be updated, and such features will be strictly opt-in.
            </p>
            
            <p className="text-sm text-neutral-500 mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              Last updated: October 2026
            </p>
          </section>
        </div>
      </main>
      
      <footer className="py-12 text-center border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center space-y-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <Link href="/playground" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Playground</Link>
            <Link href="/examples" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Examples</Link>
            <Link href="/learn" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Learn</Link>
            <Link href="/about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">About</Link>
            <Link href="/privacy" className="text-neutral-900 dark:text-white transition-colors">Privacy</Link>
            <a href="https://github.com/sureshkumar9651/compiler" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-white transition-colors">GitHub</a>
          </div>
          <p className="text-sm text-neutral-500 mt-4">
            © 2026 JS CodeLab. Free Online JavaScript Compiler & Playground.
          </p>
        </div>
      </footer>
    </div>
  );
}
