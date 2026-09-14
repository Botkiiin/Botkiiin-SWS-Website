'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function AppointmentDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="h-11 rounded-xl border border-primary px-5 text-primary"
        variant="ghost"
      >
        📅 Schedule an appointment
      </Button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-gray-900 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold">
              Schedule an appointment
            </h2>

            <p className="mb-6">
              Appointment window is working.
            </p>

            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full rounded-xl"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
