'use client';

import dynamic from 'next/dynamic';

export const ClientLanguageDetectionAlert = dynamic(
  () => import('@/components/organisms/global/LanguageDetectionAlert'),
  { ssr: false }
);

export const ClientFooter = dynamic(() => import('@/components/layouts/footer/Footer'), {
  ssr: false,
});

export const ClientCookieConsent = dynamic(
  () => import('@/components/organisms/global/CookieConsent'),
  { ssr: false }
);
