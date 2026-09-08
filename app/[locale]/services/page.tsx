import { Locale, LOCALES } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Services } from '@/components/organisms/sections/Services';

type Params = Promise<{
  locale: string;
}>;

type MetadataProps = {
  params: Params;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services' });

  return constructMetadata({
    page: 'Services',
    title: t('title'),
    description: t('description'),
    locale: locale as Locale,
    path: `/services`,
    canonicalUrl: `/services`,
  });
}

export default async function ServicesPage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services' });

  return (
    <div className="min-h-screen overflow-x-hidden w-full sm:py-12">
      <div className="max-w-7xl mx-auto px-2 break-words">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent break-words">
            {t('heading')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto break-words">
            {t('subheading')}
          </p>
        </div>

        {/* Сервіси без заголовка у вигляді сітки */}
        <Services showTitle={false} asGrid={true} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({
    locale,
  }));
}
