import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { exampleService } from '@/features/examples/services/example-service';
import { ExampleDetail } from '@/features/examples/components/example-detail';
import { TerminalSquare } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

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

  const pageTitle = example.seoTitle || `${example.title} JavaScript Example — Run Online`;
  const pageDescription =
    example.seoDescription ||
    `Explore the ${example.title} JavaScript example with code, expected output, and explanation. Run and test this code live in our free online playground.`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `/examples/${example.id}`,
    },
    openGraph: {
      title: `${pageTitle} | JS CodeLab`,
      description: pageDescription,
      url: `/examples/${example.id}`,
      siteName: 'JS CodeLab',
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} | JS CodeLab`,
      description: pageDescription,
    },
  };
}

import { JsonLd } from '@/components/seo/JsonLd';

export default async function ExamplePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const example = exampleService.getExampleById(resolvedParams.id) || exampleService.getTemplateById(resolvedParams.id);

  if (!example) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app';
  const pageUrl = `${siteUrl}/examples/${example.id}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'JavaScript Examples',
        item: `${siteUrl}/examples`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: example.title,
        item: pageUrl,
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: example.seoTitle || `${example.title} JavaScript Example`,
    description: example.seoDescription || example.description,
    datePublished: example.datePublished || '2026-10-09T00:00:00Z',
    dateModified: example.dateModified || '2026-10-12T00:00:00Z',
    mainEntityOfPage: pageUrl,
    author: {
      '@type': 'Organization',
      name: 'JS CodeLab',
      url: `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'JS CodeLab',
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
    },
  };

  const sourceCodeSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: `${example.title} JavaScript Source Code`,
    programmingLanguage: 'JavaScript',
    codeSampleType: 'code snippet',
    text: example.code,
  };

  const structuredData: Array<Record<string, unknown>> = [
    breadcrumbSchema,
    articleSchema,
    sourceCodeSchema,
  ];

  if (example.faq && example.faq.length > 0) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: example.faq.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  const allExamples = exampleService.getAllExamples();
  const currentIndex = allExamples.findIndex((e) => e.id === example.id);
  const prevExample =
    currentIndex > 0
      ? { id: allExamples[currentIndex - 1].id, title: allExamples[currentIndex - 1].title }
      : undefined;
  const nextExample =
    currentIndex >= 0 && currentIndex < allExamples.length - 1
      ? { id: allExamples[currentIndex + 1].id, title: allExamples[currentIndex + 1].title }
      : undefined;

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <JsonLd data={structuredData} />
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ExampleDetail example={example} prevExample={prevExample} nextExample={nextExample} />
      </main>
      
      <Footer />
    </div>
  );
}
