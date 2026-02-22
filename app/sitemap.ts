import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo/config';
import { locales } from '@/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  // Static routes
  const routes = ['', '/about', '/services', '/contact'];
  
  // Generate sitemap entries for each locale and route
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = `${baseUrl}/${locale}${route}`;
      
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}${route}`])
          ),
        },
      });
    });
  });

  return sitemapEntries;
}
