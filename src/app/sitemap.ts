import { MetadataRoute } from 'next';
import { exampleService } from '@/features/examples/services/example-service';
import { learnTopics } from '@/features/learn/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jscodelab-js.vercel.app';
const LATEST_UPDATE = new Date('2026-10-12T00:00:00.000Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapData: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: LATEST_UPDATE,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/playground`,
      lastModified: LATEST_UPDATE,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/certifications`,
      lastModified: LATEST_UPDATE,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/certifications/verify`,
      lastModified: LATEST_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/examples`,
      lastModified: LATEST_UPDATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/learn`,
      lastModified: LATEST_UPDATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: LATEST_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: LATEST_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/api-playground`,
      lastModified: LATEST_UPDATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/jsonplaceholder`,
      lastModified: LATEST_UPDATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Add Example and Template pages
  const examples = exampleService.getAllExamples();
  const templates = exampleService.getStarterTemplates();
  const allExamples = [...examples, ...templates];

  allExamples.forEach((example) => {
    const lastModified = example.dateModified
      ? new Date(example.dateModified)
      : LATEST_UPDATE;

    sitemapData.push({
      url: `${SITE_URL}/examples/${example.id}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Add Learn Topic pages
  learnTopics.forEach((topic) => {
    const lastModified = topic.dateModified
      ? new Date(topic.dateModified)
      : LATEST_UPDATE;

    sitemapData.push({
      url: `${SITE_URL}/learn/${topic.id}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return sitemapData;
}
