'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/i18n/routing';
import { MessageCircleIcon } from 'lucide-react';
import Image from 'next/image';

import { Carousel, CarouselContent, CarouselItem, useCarousel } from '@/components/ui/carousel';

// Local arrow components for inner carousel context
function LocalCarouselPrevious(props: React.ComponentProps<'button'>) {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <button
      type="button"
      aria-label="Previous slide"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className="absolute left-2 top-3/7 h-8 w-8 rounded-full z-20 bg-background/80 hover:text-primary flex items-center justify-center shadow transition cursor-pointer"
      {...props}>
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path
          d="M15 19l-7-7 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
function LocalCarouselNext(props: React.ComponentProps<'button'>) {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <button
      type="button"
      aria-label="Next slide"
      disabled={!canScrollNext}
      onClick={scrollNext}
      className="absolute right-2 top-3/7 h-8 w-8 rounded-full z-20 bg-background/80 hover:text-primary flex items-center justify-center shadow transition cursor-pointer"
      {...props}>
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 5l7 7-7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
interface ServiceDetailProps {
  titleKey: string;
  descriptionKey: string;
  details: string[];
  features?: string[];
  processSteps?: string[];
  imageSrc?: string;
  imageGallery?: { src: string; alt?: string }[];
  className?: string;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({
  titleKey,
  descriptionKey,
  details,
  features = [],
  processSteps = [],
  imageSrc,
  imageGallery = [],
  className = '',
}) => {
  const t = useTranslations('Home');

  return (
    <Card className={`rounded-lg shadow overflow-hidden h-full flex flex-col ${className}`}>
      {/* Slider with local arrows above image, only arrow interaction */}
      <div className="relative h-[420px] overflow-hidden">
        {imageGallery.length > 0 ? (
          <Carousel opts={{ dragFree: false, loop: true, watchDrag: false }} className="h-full">
            <LocalCarouselPrevious />
            <LocalCarouselNext />
            <CarouselContent className="min-h-[420px]">
              {imageGallery.map((img, idx) => (
                <CarouselItem key={img.src + idx} className="relative h-full min-h-[420px]">
                  <Image
                    src={img.src}
                    alt={img.alt || t(titleKey)}
                    fill
                    className="object-cover inset-0 h-full w-full"
                    sizes="(max-width: 640px) 500px, (max-width: 1024px) 50vw, 33vw"
                    priority={false}
                  />
                  <span className="text-sm sm:text-lg lg:text-2xl text-white font-semibold text-center px-1 sm:px-2 break-words hyphens-auto">
                    {t(titleKey)}
                  </span>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={t(titleKey)}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 500px, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <span className="text-sm sm:text-lg lg:text-2xl text-white font-semibold text-center px-1 sm:px-2 break-words hyphens-auto">
            {t(titleKey)}
          </span>
        )}
      </div>

      <CardContent className="p-4 sm:p-3 lg:p-6 flex flex-col flex-1 justify-start items-start">
        {/* Основний контент */}
        <div className="flex-1">
          <h3 className="text-base sm:text-lg lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 break-words">
            <span className="bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent">
              {t(titleKey)}
            </span>
          </h3>

          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground dark:text-muted-foreground mb-3 sm:mb-4 lg:mb-6 leading-relaxed break-words">
            {t(descriptionKey)}
          </p>

          {/* Основні послуги */}
          {details.length > 0 && (
            <div className="mb-3 sm:mb-4 lg:mb-6">
              <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2 lg:mb-3 text-foreground dark:text-foreground break-words">
                {t('mainServices')}
              </h4>
              <ul className="space-y-1 sm:space-y-2">
                {details.map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="mr-2 sm:mr-3 mt-1 w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground break-words">
                      {t(detail)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Додаткові особливості */}
          {features.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-foreground dark:text-foreground break-words">
                {t('keyFeatures')}
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="mr-2 mt-1 w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-muted-foreground dark:text-muted-foreground text-xs sm:text-sm break-words">
                      {t(feature)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Процес роботи */}
          {processSteps.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-foreground dark:text-foreground break-words">
                {t('workProcess')}
              </h4>
              <ol className="space-y-2 sm:space-y-3">
                {processSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-primary/10 border border-primary text-primary text-xs sm:text-sm font-bold rounded-full flex items-center justify-center mr-2 sm:mr-3">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground break-words leading-5 sm:leading-6">
                      {t(step)}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Адаптивна кнопка зв'язку - завжди внизу */}
        <div className="pt-3 sm:pt-4 border-t border-border mt-auto">
          <Link
            href="/consultation"
            className="inline-flex items-center w-full sm:w-auto justify-center px-4 sm:px-6 py-2 sm:py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm sm:text-base font-medium rounded-lg transition-colors duration-200 break-words gap-1">
            <MessageCircleIcon className="w-4 h-4" />
            <span className="break-words">{t('getConsultation')}</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceDetail;
