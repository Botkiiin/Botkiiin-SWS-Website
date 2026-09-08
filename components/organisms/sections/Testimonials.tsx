'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import FeedbackCard from '@/components/molecules/FeedbackCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

interface TestimonialsProps {
  titleClassName?: string;
}

export function Testimonials({ titleClassName = '' }: TestimonialsProps) {
  const t = useTranslations('Home');
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  // Автоматична прокрутка каруселі з паузою на ховер та прогрес-баром
  useEffect(() => {
    if (!api || isHovered) {
      setProgress(0);
      return;
    }

    const duration = 4000; // 4 секунди
    const interval = 50; // Оновлення кожні 50ms
    let elapsed = 0;

    const progressInterval = setInterval(() => {
      elapsed += interval;
      const progressValue = (elapsed / duration) * 100;
      setProgress(progressValue);

      if (elapsed >= duration) {
        api.scrollNext();
        setProgress(0);
        elapsed = 0;
      }
    }, interval);

    return () => clearInterval(progressInterval);
  }, [api, isHovered, current]);

  // Оновлення поточного слайда та загальної кількості
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Дані для відгуків з різними послугами та локаціями в Нідерландах
  const testimonials = [
    {
      id: 1,
      titleKey: 'feedback1Title',
      authorKey: 'feedback1Author',
      textKey: 'feedback1Text',
      serviceKey: 'feedback1Service',
      rating: 5,
    },
    {
      id: 2,
      titleKey: 'feedback2Title',
      authorKey: 'feedback2Author',
      textKey: 'feedback2Text',
      serviceKey: 'feedback2Service',
      rating: 5,
    },
    {
      id: 3,
      titleKey: 'feedback3Title',
      authorKey: 'feedback3Author',
      textKey: 'feedback3Text',
      serviceKey: 'feedback3Service',
      rating: 0,
    },
  ];

  return (
    <section className="px-3 w-full py-8">
      <h2
        id="testimonials"
        className={`text-3xl font-extrabold tracking-tight mb-8 ${titleClassName}`}>
        {t('whatOurCustomers')}
        <span>{t('the')}</span>
        <span className="text-primary">{t('sayAboutUs')}</span>
      </h2>

      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true, // Безкінечна прокрутка
          // Адаптивність: різна кількість слайдів на різних екранах
          breakpoints: {
            '(min-width: 0px)': { slidesToScroll: 1 },
            '(min-width: 768px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 3 },
          },
        }}
        className="w-full relative select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <CarouselContent className="-ml-4">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <FeedbackCard
                titleKey={testimonial.titleKey}
                authorKey={testimonial.authorKey}
                textKey={testimonial.textKey}
                serviceKey={testimonial.serviceKey}
                rating={testimonial.rating}
                isPlaceholder={testimonial.id === 3}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Прогрес-бар автопрокрутки */}
        <div className="flex justify-center mt-4">
          <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
            {!isHovered && (
              <div
                className="h-full bg-primary transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            )}
          </div>
        </div>

        {/* Індикатори (точки) */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={`testimonial-dot-${index}`}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                index === current - 1
                  ? 'bg-primary scale-110 shadow-lg'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
