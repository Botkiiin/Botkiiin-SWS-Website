'use client';

import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { contactsConfig, getPhoneLink, getEmailLink } from '@/config/contacts';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { InlineSpinner } from '@/components/atoms/loaders/inline-spinner';

interface ContactFormProps {
  type: 'consultation' | 'general';
  title?: string;
  description?: string;
}

export default function ContactForm({ type, title, description }: ContactFormProps) {
  const t = useTranslations('ContactForm');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Client-side validation
    if (
      !formData.name.trim() ||
      !formData.city.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast({
        title: 'Error!',
        description: 'Please fill in all required fields: Name, City, Email, and Message.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/consultation-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        toast({
          title: 'Error!',
          description: data.error || 'Form submission failed. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error!',
        description: 'Form submission failed. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
    // Logging for debug
    console.log('Form submitted:', { type, ...formData, subject: formData.subject });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getFormTitle = () => {
    if (title) return title;
    switch (type) {
      case 'consultation':
        return t('consultationTitle');
      default:
        return t('generalTitle');
    }
  };

  const getFormDescription = () => {
    if (description) return description;
    switch (type) {
      case 'consultation':
        return t('consultationDescription');
      default:
        return t('generalDescription');
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-[#49ba74] mx-auto" />
            <h3 className="text-2xl font-bold text-[#49ba74]">{t('successTitle')}</h3>
            <p className="text-muted-foreground">{t('successMessage')}</p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  city: '',
                  email: '',
                  phone: '',
                  company: '',
                  subject: '',
                  message: '',
                });
              }}
              variant="outline">
              {t('sendAnother')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-[#49ba74] mx-auto" />
            <h3 className="text-2xl font-bold text-[#49ba74]">{t('successTitle')}</h3>
            <p className="text-muted-foreground">{t('successMessage')}</p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  city: '',
                  email: '',
                  phone: '',
                  company: '',
                  subject: '',
                  message: '',
                });
              }}
              variant="outline">
              {t('sendAnother')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Contact Form */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>{getFormTitle()}</CardTitle>
          <CardDescription>{getFormDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('nameLabel')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2">
                  {t('cityLabel')} *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('cityPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('emailLabel')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('emailPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  {t('phoneLabel')}
                </label>
                <PhoneInput
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(value) => setFormData((prev) => ({ ...prev, phone: value || '' }))}
                  className="w-full"
                  placeholder={t('phonePlaceholder')}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  {t('companyLabel')}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('companyPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                {t('subjectLabel')} *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('subjectPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {t('messageLabel')} *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                placeholder={t('messagePlaceholder')}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto flex items-center gap-2">
              {isLoading ? (
                <>
                  <InlineSpinner />
                  {t('sending')}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t('sendMessage')}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              {t('contactPhone')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">
              <a href={getPhoneLink()} className="hover:text-primary transition-colors">
                {contactsConfig.phone}
              </a>
            </p>
            <p className="text-sm text-muted-foreground">{t('phoneDescription')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              {t('contactEmail')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">
              <a href={getEmailLink()} className="hover:text-primary transition-colors">
                {contactsConfig.email}
              </a>
            </p>
            <p className="text-sm text-muted-foreground">{t('emailDescription')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {t('contactAddress')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{contactsConfig.address}</p>
            <p className="text-sm text-muted-foreground">{t('addressDescription')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
