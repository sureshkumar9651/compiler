import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { exampleService } from '@/features/examples/services/example-service';
import { ExampleDetail } from '@/features/examples/components/example-detail';
import { TerminalSquare } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const examples = exampleService.getAllExamples();
  const templates = exampleService.getStarterTemplates();
  const allIds = [...examples.map(e => e.id), ...templates.map(t => t.id)];
  
  return allIds.map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const example = exampleService.getExampleById(resolvedParams.id) || exampleService.getTemplateById(resolvedParams.id);
  
  if (!example) {
    return {
      title: 'Example Not Found | JS CodeLab',
    };
  }

  return {
    title: `${example.title} JavaScript Example | JS CodeLab`,
    description: example.description,
  };
}

export default async function ExamplePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const example = exampleService.getExampleById(resolvedParams.id) || exampleService.getTemplateById(resolvedParams.id);

  if (!example) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2">
          <TerminalSquare className="h-6 w-6 text-blue-500" />
          <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-neutral-50">JS CodeLab</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-neutral-500 dark:text-neutral-400">
          <Link href="/playground" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Playground</Link>
          <Link href="/examples" className="text-neutral-900 dark:text-neutral-50 transition-colors">Examples</Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">GitHub</a>
        </nav>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ExampleDetail example={example} />
      </main>
      
      <footer className="py-8 text-center text-sm text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 mt-auto">
        © 2026 JS CodeLab. Built for modern developers.
      </footer>
    </div>
  );
}
