'use client';

import { CalendarDays } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

const GOOGLE_CALENDAR_URL =
  'https://calendar.app.google/PBJmbm9YyvG7LYmc6';

export function AppointmentDialog() {
  const t = useTranslations('Home');

  const openBooking = () => {
    window.open(GOOGLE_CALENDAR_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={openBooking}
      className="h-11 rounded-xl border border-primary px-5 text-primary transition-all duration-300 hover:bg-white/90 hover:text-gray-900"
    >
      <CalendarDays className="mr-2 h-4 w-4" />
      {t('appointmentButton')}
    </Button>
  );
}
