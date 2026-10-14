import { Metadata } from 'next';
import { ApiPlaygroundClient } from './ApiPlaygroundClient';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'API Playground — Test HTTP APIs in Your Browser',
  description:
    'Test and debug HTTP APIs directly in your browser with JS CodeLab API Playground. Send GET, POST, PUT, PATCH, DELETE requests, manage collections, and view formatted responses — no backend required.',
  alternates: {
    canonical: '/api-playground',
  },
  openGraph: {
    title: 'API Playground — Test HTTP APIs in Your Browser | JS CodeLab',
    description:
      'A Postman-inspired browser-based API testing tool. Send HTTP requests, inspect responses, and save collections — all locally, no account needed.',
    url: '/api-playground',
    siteName: 'JS CodeLab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Playground — Test HTTP APIs | JS CodeLab',
    description:
      'Send HTTP requests and inspect responses in a browser-based API testing tool.',
  },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'JS CodeLab API Playground',
    url: 'https://jscodelab-js.vercel.app/api-playground',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    description:
      'A browser-based API testing tool for sending HTTP requests and inspecting responses.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jscodelab-js.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'API Playground', item: 'https://jscodelab-js.vercel.app/api-playground' },
    ],
  },
];

export default function ApiPlaygroundPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <ApiPlaygroundClient />
    </>
  );
}
