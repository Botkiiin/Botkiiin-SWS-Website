'use client';

import { useState } from 'react';
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
import { CalendarDays } from 'lucide-react';

export function AppointmentDialog() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = () => {
    if (!service || !date || !time) return;

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-11 rounded-xl border border-primary px-5 text-primary transition-all duration-300 hover:bg-white hover:text-gray-900"
          variant="ghost"
        >
          <CalendarDays className="mr-2 h-4 w-4" />
          Schedule an appointment
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Schedule an appointment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">
              Select service
            </label>

            <Select value={service} onValueChange={setService}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a service" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="wood-restoration">
                  Wood Restoration
                </SelectItem>
                <SelectItem value="window-repair">
                  Window Repair
                </SelectItem>
                <SelectItem value="bathroom-renovation">
                  Bathroom Renovation
                </SelectItem>
                <SelectItem value="kitchen-renovation">
                  Kitchen Renovation
                </SelectItem>
                <SelectItem value="stairs">
                  Stairs
                </SelectItem>
                <SelectItem value="painting-finishing">
                  Painting & Finishing
                </SelectItem>
                <SelectItem value="other-renovation">
                  Other Renovation
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">
              Select date
            </label>

            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(event) => setDate(event.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">
              Select time
            </label>

            <Select value={time} onValueChange={setTime}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a time" />
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

          <Button
            type="button"
            className="w-full rounded-xl"
            disabled={!service || !date || !time}
            onClick={handleSubmit}
          >
            Confirm appointment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
