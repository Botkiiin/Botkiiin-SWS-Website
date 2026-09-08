'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import InteractiveStars from '@/components/ui/interactive-stars';
import { InlineSpinner } from '@/components/atoms/loaders/inline-spinner';

interface FeedbackFormData {
  name: string;
  city: string;
  service: string;
  rating: number;
  title: string;
  message: string;
}

export default function FeedbackForm() {
  const t = useTranslations('Feedback');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    city: '',
    service: '',
    rating: 0,
    title: '',
    message: '',
  });

  const services = [
    'Window Repair',
    'Glass Replacement',
    'Interior Painting',
    'Exterior Painting',
    'Facade Painting',
    'Custom Furniture',
    'Wooden Floors',
    'Custom Doors',
    'Other',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/feedback-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: t('successTitle'),
          description: t('successMessage'),
        });
        setFormData({
          name: '',
          city: '',
          service: '',
          rating: 0,
          title: '',
          message: '',
        });
      } else {
        toast({
          title: t('errorTitle'),
          description: data.error || t('errorMessage'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: t('errorTitle'),
        description: t('errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                {t('fullName')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                placeholder={t('namePlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                {t('city')} *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                required
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                placeholder={t('cityPlaceholder')}
              />
            </div>
          </div>

          {/* Contact Information removed (email) */}

          {/* Service Selection */}
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
              {t('service')} *
            </label>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground">
              <option value="">{t('selectService')}</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('rating')} *
            </label>
            <InteractiveStars rating={formData.rating} onStarClick={handleRatingChange} size="lg" />
          </div>

          {/* Review Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
              {t('reviewTitle')} *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
              placeholder={t('titlePlaceholder')}
            />
          </div>

          {/* Review Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              {t('reviewMessage')} *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground resize-none"
              placeholder={t('messagePlaceholder')}></textarea>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <InlineSpinner />
                {t('submitting')}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                {t('submitButton')}
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
