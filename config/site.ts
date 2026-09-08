// src/types/siteConfig.ts
import { type SiteConfig } from '@/config/site.types';
import { contactsConfig } from '@/config/contacts';

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const AUTHOR_NAME = process.env.NEXT_PUBLIC_AUTHOR_NAME || 'SWS';
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'SWS';
export const APP_TAGLINE =
  process.env.NEXT_PUBLIC_APP_TAGLINE || 'Slimme Werkoplossingen & Services';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'Professional construction and renovation services in the Netherlands';

export const siteConfig: SiteConfig = {
  name: APP_NAME ?? '',
  tagLine: APP_TAGLINE,
  description: APP_DESCRIPTION,
  url: contactsConfig.siteUrl,
  creator: `@${AUTHOR_NAME ?? ''}`,
  socialLinks: {
    // telegramManager: contactsConfig.socialMedia.telegramManager,
    instagram: contactsConfig.socialMedia.instagram,
    tiktok: contactsConfig.socialMedia.tiktok,
    email: contactsConfig.socialMedia.email,
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/apple-touch-icon.png',
  },
};

export const DEFAULT_SITE_THEME = 'system' as 'system' | 'dark' | 'light'; // next-theme option: system | dark | light
