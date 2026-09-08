'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

import { siteConfig } from '@/config/site';
import Image from 'next/image';
import GradientLink from '@/components/shared/GradientLink';
import { PhoneInput } from '@/components/ui/phone-input';
import { useToast } from '@/hooks/use-toast';

import { serviceKeys } from '@/config/services';

interface FormData {
  firstName: string;
  lastName: string;
  number: string;
  service: string;
}

export default function ModernContactForm() {
  const t = useTranslations('Home');
  const tf = useTranslations('ModernContactForm');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    number: '',
    service: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/telegram-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          number: formData.number,
          service: formData.service,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: tf('successTitle'),
          description: tf('successDesc'),
        });
        setFormData({ firstName: '', lastName: '', number: '', service: '' });
      } else {
        toast({
          title: tf('errorTitle'),
          description: data.error || tf('errorDesc'),
        });
      }
    } catch (error) {
      toast({
        title: tf('errorTitle'),
        description: tf('errorDesc'),
      });
    }
    setIsLoading(false);
  };

  const steps = [
    { num: 1, titleKey: 'step1Title', descKey: 'step1Description' },
    { num: 2, titleKey: 'step2Title', descKey: 'step2Description' },
    { num: 3, titleKey: 'step3Title', descKey: 'step3Description' },
    { num: 4, titleKey: 'step4Title', descKey: 'step4Description' },
  ];

  return (
    <section className="w-screen bg-[#1a1a1a] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
          {/* Image Section */}
          <div className="relative lg:h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/contact.jpeg"
              alt="Construction workers"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Form Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase">
              {tf('title')} <span className="text-blue-500">{tf('bestOffer')}</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 uppercase">{tf('firstName')}</label>
                  <input
                    type="text"
                    placeholder={tf('firstName')}
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 uppercase">{tf('lastName')}</label>
                  <input
                    type="text"
                    placeholder={tf('lastName')}
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Number and Service Selects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 uppercase">{tf('number')}</label>
                  <PhoneInput
                    value={formData.number}
                    onChange={(value) => {
                      let val = value || '';
                      if (val && !val.startsWith('+')) {
                        val = '+' + val.replace(/^0+/, '');
                      }
                      setFormData({ ...formData, number: val });
                    }}
                    defaultCountry="NL"
                    className="w-full rounded-md bg-transparent border border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 uppercase">{tf('chooseService')}</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors appearance-none cursor-pointer">
                    <option value="" disabled className="bg-gray-800">
                      {tf('selectService')}
                    </option>
                    {serviceKeys.map((key) => (
                      <option key={key} value={t(key)} className="bg-gray-800">
                        {t(key)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center flex-wrap gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="outline"
                  className="px-8 py-3 border border-white dark:border-white text-white hover:border-primary hover:text-primary bg-white/20 dark:bg-white/20 hover:bg-secondary/30 dark:hover:bg-secondary/30 rounded-lg font-medium transition-colors uppercase cursor-pointer">
                  {isLoading ? tf('sending') : tf('send')}
                </Button>
                <span className="text-gray-400 uppercase">{tf('or')}</span>
                <Button
                  className="h-11 rounded-xl py-2 transition-all duration-300 hover:bg-white/90 dark:hover:bg-white/70"
                  variant="ghost"
                  asChild>
                  <GradientLink
                    text={tf('useInstagram')}
                    className="uppercase"
                    href={siteConfig.socialLinks?.instagram || 'https://instagram.com/'}
                  />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Steps Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold mb-12 uppercase">{tf('stepsTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={`form-step-${step.num}`}
                className="flex gap-3 p-6 rounded-xl border border-gray-700 hover:border-gray-500 transition-colors">
                <div className="text-4xl font-bold text-primary">{step.num}</div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">{tf(step.titleKey)}</h4>
                  <p className="text-sm text-gray-300">{tf(step.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
