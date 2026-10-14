import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Playground',
  description: 'Test and debug HTTP APIs directly in your browser.',
  alternates: {
    canonical: '/api-playground',
  },
};

export default function ApiPlaygroundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
