import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow crawling of arbitrary generated share links if they existed as a path,
      // but since share links are handled via hash fragment (#), crawlers ignore them automatically.
      // We allow /playground because it's the primary product interface.
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
