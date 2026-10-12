import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'JS CodeLab — Free Online JavaScript Compiler & Playground',
    short_name: 'JS CodeLab',
    description: 'Write, run, test, and debug JavaScript online with a free browser-based compiler and interactive playground.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
