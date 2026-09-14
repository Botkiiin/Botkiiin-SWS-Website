'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi, // <-- Тип для API, якщо використовуєте TypeScript
} from '@/components/ui/carousel'; // Переконайтеся, що useCarousel доступний тут

import { serviceKeys } from '@/config/services';

interface AboutProps {
  hideTitle?: boolean;
  noPadding?: boolean;
  titleClassName?: string;
}

// =========================================================================
// 1. КОМПОНЕНТ ДЛЯ АВТОПЕРЕМИКАННЯ БЕЗ ПЛАГІНА
// =========================================================================

interface AutoPlayCarouselContentProps {
  children: React.ReactNode;
  interval?: number;
}

const AutoPlayCarouselContent = ({
  children,
  interval = 4000,
}: AutoPlayCarouselContentProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (!api) return;

    const resetAutoplay = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    const play = () => {
      api.scrollNext();
      timeoutRef.current = setTimeout(play, interval);
    };

    timeoutRef.current = setTimeout(play, interval);

    const onSelect = () => {
      resetAutoplay();
      timeoutRef.current = setTimeout(play, interval);
    };

    api.on('select', onSelect);

    return () => {
      resetAutoplay();
      api.off('select', onSelect);
    };
  }, [api, interval]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        loop: true,
        dragFree: false,
      }}
      className="cursor-grab"
    >
      <CarouselContent>{children}</CarouselContent>
    </Carousel>
  );
};
// =========================================================================
// 2. ОСНОВНИЙ КОМПОНЕНТ ABOUT
// =========================================================================

export function About({ hideTitle = false, noPadding = false, titleClassName = '' }: AboutProps) {
  const t = useTranslations('Home');

  const tags: string[] = serviceKeys.map((key: string) => t(key));

  // Images for slider
  const images = [
    { src: '/about/0.jpeg', alt: 'SWS Construction and Assembly Services - House' },
    { src: '/about/1.jpeg', alt: 'SWS Construction and Assembly Services - House' },
    { src: '/about/2.jpeg', alt: 'SWS Construction and Assembly Services - House' },
    { src: '/about/3.jpeg', alt: 'SWS Construction and Assembly Services - House' },
    { src: '/about/4.jpeg', alt: 'SWS Construction and Assembly Services - House' },
    { src: '/about/5.jpeg', alt: 'SWS Construction and Assembly Services - House' },
    { src: '/about/6.jpeg', alt: 'SWS Construction and Assembly Services - House' },
    { src: '/about/7.jpeg', alt: 'SWS Construction and Assembly Services - House' },
    { src: '/about/8.jpeg', alt: 'SWS Construction and Assembly Services - House' },
    { src: '/about/9.jpeg', alt: 'SWS Construction and Assembly Services - House' },
    { src: '/about/10.jpeg', alt: 'SWS Construction and Assembly Services - House' },
  ];

  return (
    <section
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
        noPadding ? '' : 'px-4 sm:px-6 lg:px-8 pt-8 pb-14'
      }`}>
      <div className="space-y-6">
        {!hideTitle && (
          <h2
            id="about-us"
            className={`text-3xl md:text-4xl font-bold text-foreground ${titleClassName}`}>
            <span className="bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent">
              {t('aboutUs')}
            </span>
            <span className="block text-2xl md:text-3xl font-medium text-muted-foreground mt-2">
              {t('aboutUsDesc')}
            </span>
          </h2>
        )}
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground leading-relaxed">{t('aboutText1')}</p>
          <p className="text-lg text-muted-foreground leading-relaxed">{t('aboutText2')}</p>
        </div>
        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-card p-6 rounded-lg text-center hover:bg-accent/50 transition-colors">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent mb-2">
              5+
            </h3>
            <p className="text-sm text-muted-foreground">{t('yearsExperience')}</p>
          </div>
          <div className="bg-card p-6 rounded-lg text-center hover:bg-accent/50 transition-colors">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent mb-2">
              98%
            </h3>
            <p className="text-sm text-muted-foreground">{t('goodReview')}</p>
          </div>
          <div className="bg-card p-6 rounded-lg text-center hover:bg-accent/50 transition-colors">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent mb-2">
              511+
            </h3>
            <p className="text-sm text-muted-foreground">{t('projectsClosed')}</p>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative w-full min-h-[400px] lg:min-h-[500px] rounded-xl overflow-hidden">
        {/* Tags знизу вгору, менше повторів */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap gap-2 justify-start">
          {tags.map((tag, idx) => (
            <span
              key={tag + idx}
              className="px-3 py-1 bg-background/90 dark:bg-foreground/90 text-foreground dark:text-background backdrop-blur-sm rounded-full shadow-lg border border-border/50 transition-all duration-200 hover:scale-105"
              style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.875rem)' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Project carousel slider з ручним автоперемиканням */}
        <AutoPlayCarouselContent interval={4000} loop={true}>
          {images.map((img, idx) => (
            <CarouselItem key={img.src + idx} className="relative h-[400px] lg:h-[500px]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover brightness-50"
              />
            </CarouselItem>
          ))}
        </AutoPlayCarouselContent>
      </div>
    </section>
  );
}
