import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const csvPath = path.join(process.cwd(), 'keywords.csv');
  let keywords: string[] = [];
  try {
    const content = fs.readFileSync(csvPath, 'utf8');
    keywords = content
      .split('\n')
      .slice(1)
      .filter(line => line.trim() !== '');
  } catch {}

  const baseUrl = 'https://carplaygo.vercel.app';

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/product`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/support`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/cart`, lastModified: new Date(), changeFrequency: 'never', priority: 0.1 },
    { url: `${baseUrl}/admin`, lastModified: new Date(), changeFrequency: 'never', priority: 0.1 },
    { url: `${baseUrl}/legal/shipping`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/legal/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/legal/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  const dynamicPages: MetadataRoute.Sitemap = keywords.map(kw => ({
    url: `${baseUrl}/seo/${kw.trim().toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...dynamicPages];
}

