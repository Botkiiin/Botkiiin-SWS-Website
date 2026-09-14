'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CalendarDays } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function AppointmentDialog() {
  const t = useTranslations('Home');

  const [open, setOpen] = useState(false);
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  const handleSubmit = () => {
    if (!service || !date || !time) return;

    // Пока это только форма.
    // Реальную отправку и проверку свободного времени подключим следующим этапом.
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-11 rounded-xl border border-primary px-5 text-primary transition-all duration-300 hover:bg-white/90 hover:text-gray-900"
        >
          <CalendarDays className="mr-2 h-4 w-4" />
          {t('appointmentButton')}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {t('appointmentTitle')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-4">
          {/* Service */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">
              {t('appointmentService')}
            </label>

            <Select value={service} onValueChange={setService}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder={t('appointmentChooseService')} />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="wood-restoration">
                  {t('appointmentWoodRestoration')}
                </SelectItem>

                <SelectItem value="window-repair">
                  {t('appointmentWindowRepair')}
                </SelectItem>

                <SelectItem value="bathroom-renovation">
                  {t('appointmentBathroom')}
                </SelectItem>

                <SelectItem value="kitchen-renovation">
                  {t('appointmentKitchen')}
                </SelectItem>

                <SelectItem value="stairs">
                  {t('appointmentStairs')}
                </SelectItem>

                <SelectItem value="painting-finishing">
                  {t('appointmentPainting')}
                </SelectItem>

                <SelectItem value="other-renovation">
                  {t('appointmentOther')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">
              {t('appointmentDate')}
            </label>

            <input
              type="date"
              value={date}
              min={minDate}
              onChange={(event) => setDate(event.target.value)}
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          {/* Time */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">
              {t('appointmentTime')}
            </label>

            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder={t('appointmentChooseTime')} />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="08:00">08:00</SelectItem>
                <SelectItem value="09:00">09:00</SelectItem>
                <SelectItem value="10:00">10:00</SelectItem>
                <SelectItem value="11:00">11:00</SelectItem>
                <SelectItem value="12:00">12:00</SelectItem>
                <SelectItem value="13:00">13:00</SelectItem>
                <SelectItem value="14:00">14:00</SelectItem>
                <SelectItem value="15:00">15:00</SelectItem>
                <SelectItem value="16:00">16:00</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Confirm */}
          <Button
            type="button"
            className="h-11 w-full rounded-xl"
            disabled={!service || !date || !time}
            onClick={handleSubmit}
          >
            {t('appointmentConfirm')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
