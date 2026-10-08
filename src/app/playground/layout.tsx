import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playground | JS CodeLab',
  description: 'Write, run, and experiment with JavaScript code in your browser.',
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
