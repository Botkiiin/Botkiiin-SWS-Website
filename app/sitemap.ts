import { siteConfig } from '@/config/site';
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/routing';
import { MetadataRoute } from 'next';

const siteUrl = siteConfig.url;

type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'
  | undefined;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with priorities
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as ChangeFrequency },
    { path: '/services', priority: 0.9, changeFrequency: 'daily' as ChangeFrequency },
    { path: '/about', priority: 0.8, changeFrequency: 'daily' as ChangeFrequency },
    { path: '/trust', priority: 0.8, changeFrequency: 'daily' as ChangeFrequency },
    { path: '/contacts', priority: 0.9, changeFrequency: 'weekly' as ChangeFrequency },
    { path: '/contacts/form', priority: 0.7, changeFrequency: 'weekly' as ChangeFrequency },
    { path: '/consultation', priority: 0.9, changeFrequency: 'daily' as ChangeFrequency },
    { path: '/feedback', priority: 0.7, changeFrequency: 'weekly' as ChangeFrequency },
    { path: '/vacancies', priority: 0.6, changeFrequency: 'weekly' as ChangeFrequency },
    { path: '/privacy-policy', priority: 0.5, changeFrequency: 'weekly' as ChangeFrequency },
    { path: '/terms-of-service', priority: 0.5, changeFrequency: 'weekly' as ChangeFrequency },
  ];

  // Generate multilingual pages
  const pages = LOCALES.flatMap((locale) => {
    return staticPages.map((page) => ({
      url: `${siteUrl}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }));
  });

  return pages;
}
