import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/metadata';
import { Locale } from '@/i18n/routing';
import ModernContactForm from '@/components/organisms/forms/ModernContactForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactFormPage' });

  return constructMetadata({
    page: 'ContactForm',
    title: t('title'),
    description: t('description'),
    locale: locale as Locale,
    path: '/contacts/form',
    canonicalUrl: '/contacts/form',
  });
}

export default async function ContactFormPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      <ModernContactForm />
    </main>
  );
}
