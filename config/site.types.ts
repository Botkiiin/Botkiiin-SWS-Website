export type SiteConfig = {
  name: string;
  tagLine?: string;
  description?: string;
  url: string;
  socialLinks?: {
    github?: string;
    telegramManager?: string;
    tiktok?: string;
    twitter?: string;
    twitterZh?: string;
    instagram?: string;
    email?: string;
  };
  creator: string;
  icons: {
    icon: string;
    shortcut?: string;
    apple?: string;
  };
};
