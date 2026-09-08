import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/metadata';
import { Locale } from '@/i18n/routing';
import ContactForm from '@/components/organisms/forms/ContactForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ConsultationPage' });

  return constructMetadata({
    page: 'Consultation',
    title: t('title'),
    description: t('description'),
    locale: locale as Locale,
    path: '/consultation',
    canonicalUrl: '/consultation',
  });
}

export default async function ConsultationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ConsultationPage');

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent">
            {t('heading')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('subheading')}</p>
        </div>

        {/* Contact Form */}
        <ContactForm type="consultation" />
      </div>
    </div>
  );
}
