'use client';

import { About } from '@/components/organisms/sections/About';
import { Trust } from '@/components/organisms/sections/Trust';
import { useTranslations } from 'next-intl';

export default function AboutPageContent() {
  const t = useTranslations('About');

  return (
    <div className="min-h-screen w-full">
      <div className="px-4 sm:px-6 lg:px-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent break-words">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('description')}</p>
        </div>

        {/* About Section */}
        <div className="mb-16">
          <About hideTitle={true} noPadding={true} />
        </div>

        {/* Trust Section */}
        <div className="mb-16">
          <Trust hideTitle={false} noPadding={true} />
        </div>
      </div>
    </div>
  );
}
