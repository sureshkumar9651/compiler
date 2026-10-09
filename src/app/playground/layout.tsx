import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Write, run, and experiment with JavaScript code in your browser.',
  alternates: {
    canonical: '/playground',
  },
  openGraph: {
    title: 'Playground | JS CodeLab',
    description: 'Write, run, and experiment with JavaScript code in your browser.',
    url: '/playground',
    siteName: 'JS CodeLab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Playground | JS CodeLab',
    description: 'Write, run, and experiment with JavaScript code in your browser.',
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
