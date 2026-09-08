import { Trust } from '@/components/organisms/sections/Trust';
import { Locale } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Params = Promise<{
  locale: string;
}>;

type MetadataProps = {
  params: Params;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations('Trust');

  return constructMetadata({
    page: 'Trust',
    title: t('title'),
    description: t('description'),
    locale: locale as Locale,
    path: `/trust`,
    canonicalUrl: `/trust`,
  });
}

export default async function TrustPage() {
  return (
    <main className="min-h-screen w-full">
      <Trust titleClassName="container mx-auto w-full text-center sm:py-4" />
    </main>
  );
}
