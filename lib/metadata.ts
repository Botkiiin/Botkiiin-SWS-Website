import { siteConfig } from '@/config/site';
import { DEFAULT_LOCALE, LOCALE_NAMES, Locale } from '@/i18n/routing';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type MetadataProps = {
  page?: string;
  title?: string;
  description?: string;
  images?: string[];
  noIndex?: boolean;
  locale: Locale;
  path?: string;
  canonicalUrl?: string;
  keywords?: string[];
};

export async function constructMetadata({
  page = 'Home',
  title,
  description,
  images = [],
  noIndex = false,
  locale,
  path,
  canonicalUrl,
  keywords = [],
}: MetadataProps): Promise<Metadata> {
  // get translations
  const t = await getTranslations({ locale, namespace: 'Home' });

  // Safe URL fallback
  const siteUrl = siteConfig.url || 'http://localhost:3000';

  // get page specific metadata translations
  const pageTitle = title || t(`title`);
  const pageDescription = description || t(`description`);

  // build full title
  const finalTitle =
    page === 'Home' ? `${t('tagLine')} | ${t('title')}` : `${pageTitle} | ${t('title')}`;
  const siteName = `${t('tagLine')} | ${t('title')}`;

  // build image URLs
  const imageUrls =
    images.length > 0
      ? images.map((img) => ({
          url: img.startsWith('http') ? img : `${siteUrl}/${img}`,
          alt: pageTitle,
        }))
      : [
          {
            url: `${siteUrl}/og.png`,
            alt: pageTitle,
          },
        ];

  // Open Graph Site
  const pageURL = `${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${path}` || siteUrl;

  // build alternate language links
  const alternateLanguages = Object.keys(LOCALE_NAMES).reduce(
    (acc, lang) => {
      const path = canonicalUrl
        ? `${lang === DEFAULT_LOCALE ? '' : `/${lang}`}${canonicalUrl === '/' ? '' : canonicalUrl}`
        : `${lang === DEFAULT_LOCALE ? '' : `/${lang}`}`;
      acc[lang] = `${siteUrl}${path}`;

      return acc;
    },
    {} as Record<string, string>
  );

  const defaultKeywords = [
    'SWS',
    t('tagLine'),
    t('windowRepairTag'),
    t('windowFrameRepair'),
    t('glassReplacementTag'),
    t('sealingWork'),
    t('paintingTitle'),
    t('interiorPaintingTag'),
    t('exteriorPaintingTag'),
    t('facadePaintingTag'),
    t('maintenancePaintingTag'),
    t('woodworkingTitle'),
    t('customFurnitureTag'),
    t('woodenFloorsTag'),
    t('doorInstallationTag'),
    t('customDoorsTag'),
    t('generalRenovationTag'),
    t('reliabilityTag'),
  ];

  const allKeywords = [...new Set([...defaultKeywords, ...keywords])];

  return {
    title: finalTitle,
    applicationName: siteName,
    description: pageDescription,
    keywords: allKeywords,
    creator: siteConfig.creator,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl
        ? `${siteUrl}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${
            canonicalUrl === '/' ? '' : canonicalUrl
          }`
        : undefined,
      languages: alternateLanguages,
    },
    openGraph: {
      type: 'website',
      title: finalTitle,
      description: pageDescription,
      url: pageURL,
      siteName: siteName,
      locale: locale,
      images: imageUrls,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  };
}
