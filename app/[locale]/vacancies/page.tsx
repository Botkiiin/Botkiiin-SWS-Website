import { Locale, LOCALES } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import VacancyProposalForm from '@/components/organisms/forms/VacancyProposalForm';

type Params = Promise<{
  locale: string;
}>;

type MetadataProps = {
  params: Params;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Vacancies' });

  return constructMetadata({
    page: 'Vacancies',
    title: t('title'),
    description: t('description'),
    locale: locale as Locale,
    path: `/vacancies`,
    canonicalUrl: `/vacancies`,
  });
}

export default async function VacanciesPage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Vacancies' });

  return (
    <div className="min-h-screen w-full max-sm:px-3">
      <div className="x-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-8 sm:pt-12 lg:pt-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('description')}</p>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 rounded-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('noOpenPositions')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{t('noOpenPositionsText')}</p>
          <p className="text-sm text-gray-500">{t('checkBackLater')}</p>
        </div>
        <VacancyProposalForm />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({
    locale,
  }));
}
