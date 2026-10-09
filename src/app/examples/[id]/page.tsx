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
      title: 'Example Not Found',
    };
  }

  return {
    title: `${example.title} JavaScript Example — Run Online`,
    description: `Learn how to use ${example.title} in JavaScript. View the code, read the explanation, and run this example instantly in our free online compiler.`,
    alternates: {
      canonical: `/examples/${example.id}`,
    },
    openGraph: {
      title: `${example.title} JavaScript Example | JS CodeLab`,
      description: `Run and edit the ${example.title} JavaScript example directly in your browser.`,
      url: `/examples/${example.id}`,
      siteName: 'JS CodeLab',
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${example.title} JavaScript Example | JS CodeLab`,
      description: `Run and edit the ${example.title} JavaScript example directly in your browser.`,
    }
  };
}

export default async function ExamplePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const example = exampleService.getExampleById(resolvedParams.id) || exampleService.getTemplateById(resolvedParams.id);

  if (!example) {
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
        "name": "JavaScript Examples",
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app'}/examples`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": example.title,
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app'}/examples/${example.id}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": example.title,
    "description": example.description,
    "datePublished": example.datePublished || "2026-10-09T00:00:00Z",
    "dateModified": example.dateModified || "2026-10-09T00:00:00Z",
    "author": {
      "@type": "Organization",
      "name": "JS CodeLab"
    },
    "publisher": {
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
      <header className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2">
          <TerminalSquare className="h-6 w-6 text-blue-500 shrink-0" />
          <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-neutral-50">JS CodeLab</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm font-medium text-neutral-500 dark:text-neutral-400">
          <Link href="/playground" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Playground</Link>
          <Link href="/examples" className="text-neutral-900 dark:text-neutral-50 transition-colors">Examples</Link>
          <Link href="/learn" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors hidden sm:inline-block">Learn</Link>
          <a href="https://github.com/sureshkumar9651/compiler" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors hidden sm:inline-block">GitHub</a>
        </nav>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ExampleDetail example={example} />
        
      </main>
      
      <footer className="py-8 text-center text-sm text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 mt-auto">
        © 2026 JS CodeLab. Free Online JavaScript Compiler & Playground.
      </footer>
    </div>
  );
}
