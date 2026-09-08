'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Textarea } from '@/components/ui/textarea';

export default function VacancyProposalForm() {
  const t = useTranslations('Vacancies');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(t('vacancyFormError'));
      return;
    }
    try {
      const res = await fetch('/api/vacancy-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || t('vacancyFormError'));
      }
    } catch (err) {
      setError(t('vacancyFormError'));
    }
  };

  if (submitted) {
    return <div className="p-4 bg-green-100 rounded">{t('vacancyFormSuccess')}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-2">{t('vacancyFormTitle')}</h3>
      <p className="text-muted-foreground mb-2">{t('vacancyFormDescription')}</p>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          {t('vacancyFormNamePlaceholder')}
          <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          type="text"
          placeholder={t('vacancyFormNamePlaceholder')}
          value={name}
          className="w-full px-3 py-5 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          {t('vacancyFormEmailPlaceholder')}
          <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          placeholder={t('vacancyFormEmailPlaceholder')}
          value={email}
          className="w-full px-3 py-5 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          {t('vacancyFormPhonePlaceholder')}
          <span className="text-red-500">*</span>
        </label>
        <PhoneInput
          id="phone"
          className="w-full"
          defaultCountry="NL"
          placeholder={t('vacancyFormPhonePlaceholder')}
          value={phone}
          onChange={setPhone}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {t('vacancyFormMessagePlaceholder')}
          <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          placeholder={t('vacancyFormMessagePlaceholder')}
          value={message}
          className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
          required
          rows={5}
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit" className="w-full">
        {t('vacancyFormSubmit')}
      </Button>
    </form>
  );
}
