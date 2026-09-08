import { Clock } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function Hours({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Contacts' });
  return (
    <div className="mt-0">
      {/* Working Hours Bottom Right */}
      <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        {t('contactInfo.workingHours.title')}
      </h3>
      <div className="space-y-2 shadow bg-card p-4 rounded-lg">
        <p className="text-muted-foreground">{t('contactInfo.workingHours.weekdays')}</p>
        <p className="text-muted-foreground">{t('contactInfo.workingHours.saturday')}</p>
        <p className="text-muted-foreground">{t('contactInfo.workingHours.sunday')}</p>
      </div>
    </div>
  );
}
