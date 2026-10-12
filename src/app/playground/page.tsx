import { Metadata } from 'next';
import { PlaygroundClient } from './PlaygroundClient';
import { JsonLd } from '@/components/seo/JsonLd';

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
];

export default function PlaygroundPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PlaygroundClient />
    </>
  );
}
