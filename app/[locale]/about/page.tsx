import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, Locale } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';

type Params = Promise<{
  locale: string;
}>;

type MetadataProps = {
  params: Params;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  return constructMetadata({
    page: 'About',
    title: t('title'),
    description: t('description'),
    locale: locale as Locale,
    path: `/about`,
    canonicalUrl: `/about`,
  });
}

export default async function AboutPage({ params }: { params: Params }) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <AboutPageContent />
    </NextIntlClientProvider>
  );
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}
