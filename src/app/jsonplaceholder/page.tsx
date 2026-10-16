import { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonPlaceholderWrapper } from './JsonPlaceholderWrapper';

export const metadata: Metadata = {
  title: 'JSONPlaceholder API Playground \u2013 Test REST APIs Online',
  description:
    'Test JSONPlaceholder REST API endpoints online. Send GET, POST, PUT, PATCH, and DELETE requests, inspect JSON responses, and learn API testing with JS CodeLab.',
  alternates: {
    canonical: '/jsonplaceholder',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'JSONPlaceholder API Playground \u2013 Test REST APIs Online | JS CodeLab',
    description:
      'Test JSONPlaceholder REST API endpoints online. Send GET, POST, PUT, PATCH, and DELETE requests, inspect JSON responses, and learn API testing with JS CodeLab.',
    url: '/jsonplaceholder',
    siteName: 'JS CodeLab',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'JSONPlaceholder API Playground \u2013 JS CodeLab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSONPlaceholder API Playground \u2013 Test REST APIs Online | JS CodeLab',
    description:
      'Test JSONPlaceholder REST API endpoints online. Send GET, POST, PUT, PATCH, and DELETE requests, inspect JSON responses, and learn API testing with JS CodeLab.',
    images: ['/og.png'],
  },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'JSONPlaceholder API Playground \u2013 JS CodeLab',
    url: 'https://jscodelab-js.vercel.app/jsonplaceholder',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    description:
      'A browser-based tool for testing JSONPlaceholder REST API endpoints. Send HTTP requests, inspect JSON responses, and learn API concepts.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
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
        name: 'JSONPlaceholder API Playground',
        item: 'https://jscodelab-js.vercel.app/jsonplaceholder',
      },
    ],
  },
];

export default function JsonPlaceholderPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <JsonLd data={structuredData} />
      <Header />
      <main className="flex-1">
        <JsonPlaceholderWrapper />
      </main>
      <Footer />
    </div>
  );
}
