// app/[locale]/layout.tsx
import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import { cn } from '@/lib/utils';
import { constructMetadata } from '@/lib/metadata';
import { DEFAULT_SITE_THEME, siteConfig } from '@/config/site';
import { DEFAULT_LOCALE, Locale, routing } from '@/i18n/routing';

import '@/styles/globals.css';
// import '@/styles/loading.css';

// import GoogleAdsense from '@/app/GoogleAdsense';
// import GoogleAnalytics from '@/app/GoogleAnalytics';
// import PlausibleAnalytics from '@/app/PlausibleAnalytics';
import Header from '@/components/layouts/header/Header';
import { TailwindIndicator } from '@/components/TailwindIndicator';
import { Toaster } from '@/components/ui/toaster';
import CookieConsent from '@/components/organisms/global/CookieConsent';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { ClientFooter, ClientLanguageDetectionAlert } from '@/components/ClientWrappers';

// Виправлено: 'params' має тип 'Promise'
type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params; // Виправлено: використовуємо await
  const t = await getTranslations({ locale, namespace: 'Home' });

  return constructMetadata({
    page: 'Home',
    title: t('title'),
    description: t('description'),
    images: [`${siteConfig.url}/SWS_logo_outline.png`],
    locale: locale as Locale,
    path: `/`,
    canonicalUrl: `/`,
  });
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Виправлено: 'params' має тип 'Promise'
}) {
  const { locale } = await params; // Виправлено: використовуємо await

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale || DEFAULT_LOCALE} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background flex flex-col font-sans antialiased overflow-x-hidden w-full'
        )}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider attribute="class" defaultTheme={DEFAULT_SITE_THEME} enableSystem>
            {messages.LanguageDetection && <ClientLanguageDetectionAlert />}

            {messages.Header && <Header />}

            <main className="flex-1 flex flex-col items-center lg:max-w-7xl mx-auto max-w-full h-fit w-full">
              {children}
            </main>
            {messages.Footer && <ClientFooter />}
            {messages.CookieConsent && <CookieConsent />}
          </ThemeProvider>
        </NextIntlClientProvider>
        <Toaster />
        {process.env.NODE_ENV === 'development' ? (
          <>
            <TailwindIndicator />
          </>
        ) : (
          <>
            <Analytics />
            <SpeedInsights />
            {/* <GoogleAnalytics /> */}
            {/* <GoogleAdsense /> */}
            {/* <PlausibleAnalytics /> */}
          </>
        )}
      </body>
    </html>
  );
}
