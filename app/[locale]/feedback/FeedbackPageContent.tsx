'use client';

import { useTranslations } from 'next-intl';
import FeedbackForm from '@/components/organisms/forms/FeedbackForm';

export default function FeedbackPageContent() {
  const t = useTranslations('Feedback');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('description')}</p>
        </div>

        {/* Feedback Form */}
        <FeedbackForm />
      </div>
    </div>
  );
}
