import { MetadataRoute } from 'next';
import { exampleService } from '@/features/examples/services/example-service';
import { learnTopics } from '@/features/learn/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapData: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/playground`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/examples`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/learn`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Add Example pages
  const examples = exampleService.getAllExamples();
  const templates = exampleService.getStarterTemplates();
  const allExamples = [...examples, ...templates];

  allExamples.forEach(example => {
    sitemapData.push({
      url: `${SITE_URL}/examples/${example.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Add Learn pages
  learnTopics.forEach(topic => {
    sitemapData.push({
      url: `${SITE_URL}/learn/${topic.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return sitemapData;
}
