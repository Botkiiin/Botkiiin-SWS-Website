'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';

import ServiceDetail from '@/components/organisms/sections/ServiceDetail';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { LayoutGrid } from 'lucide-react';

// Детальні дані для сервісів
const serviceData = [
  {
    titleKey: 'windowRepairTitle',
    descriptionKey: 'windowRepairDescription',
    details: ['windowFrameRepair', 'glassReplacement', 'sealingWork'],
    features: ['qualityMaterials', 'fastService', 'warranty', 'professionalTeam'],
    processSteps: ['initialInspection', 'quotationPreparation', 'workExecution', 'finalCheck'],
    imageGallery: [
      {
        src: '/services/window/first-min.jpeg',
        alt: 'SWS Window Repair Service - Window replacement',
      },
      {
        src: '/services/window/after-min.jpeg',
        alt: 'SWS Window Repair Service - Window replacement',
      },
      {
        src: '/services/window/before-min.jpeg',
        alt: 'SWS Window Repair Service - Window with new glass',
      },
      {
        src: '/services/window/after-1-min.jpeg',
        alt: 'SWS Window Repair Service - Custom window',
      },
      {
        src: '/services/window/before-1-min.jpeg',
        alt: 'SWS Window Repair Service - Custom window',
      },
      {
        src: '/services/window/after-2-min.jpeg',
        alt: 'SWS Window Repair Service - Custom window',
      },
      {
        src: '/services/window/before-2-min.jpeg',
        alt: 'SWS Window Repair Service - Custom window',
      },
      {
        src: '/services/window/last-min.jpeg',
        alt: 'SWS Window Repair Service - Custom window',
      },
    ],
  },
  {
    titleKey: 'paintingTitle',
    descriptionKey: 'paintingDescription',
    details: ['technicalPainting', 'facadePainting', 'interiorPainting'],
    features: ['ecoFriendlyPaints', 'colorConsultation', 'surfacePreparation', 'longLastingFinish'],
    processSteps: [
      'surfaceAssessment',
      'colorSelection',
      'preparation',
      'painting',
      'qualityControl',
    ],
    imageGallery: [
      {
        src: '/services/paint/after-1-min.jpeg',
        alt: 'SWS Painting Service - Painted window part',
      },
      // { src: '/services/paint/before-min.jpeg', alt: 'SWS Painting Service - Painted window part' },
      {
        src: '/services/paint/after-4-min.jpeg',
        alt: 'SWS Painting Service - Painted window part',
      },
      {
        src: '/services/paint/after-2-min.jpeg',
        alt: 'SWS Painting Service - Painted window part',
      },
      {
        src: '/services/paint/after-3-min.jpeg',
        alt: 'SWS Painting Service - Painted window part',
      },
      { src: '/services/paint/after.jpeg', alt: 'SWS Painting Service - Painted window part' },
    ],
  },
  {
    titleKey: 'woodworkingTitle',
    descriptionKey: 'woodworkingDescription',
    details: ['customFurniture', 'doorInstallation', 'flooringWork'],
    features: ['sustainableMaterials', 'customDesign', 'precisionWork', 'durability'],
    processSteps: [
      'designConsultation',
      'materialSelection',
      'crafting',
      'installation',
      'finishing',
    ],
    imageGallery: [
      {
        src: '/services/woodworking/1.jpeg',
        alt: 'SWS Woodworking Service - Custom wooden furniture',
      },
      {
        src: '/services/woodworking/2.jpeg',
        alt: 'SWS Woodworking Service - Custom wooden furniture',
      },
      {
        src: '/services/woodworking/2-2.jpeg',
        alt: 'SWS Woodworking Service - Custom wooden furniture',
      },
      {
        src: '/services/woodworking/2-3.jpeg',
        alt: 'SWS Woodworking Service - Custom wooden furniture',
      },
      {
        src: '/services/woodworking/2-4.jpeg',
        alt: 'SWS Woodworking Service - Custom wooden furniture',
      },
      {
        src: '/services/woodworking/2-5.jpeg',
        alt: 'SWS Woodworking Service - Custom wooden furniture',
      },
      {
        src: '/services/woodworking/6.jpeg',
        alt: 'SWS Woodworking Service - Custom wooden furniture',
      },
    ],
  },
];

interface ServicesProps {
  showButton?: boolean;
  children?: React.ReactNode;
  isHomePage?: boolean;
  showTitle?: boolean;
  asGrid?: boolean;
  titleClassName?: string;
}

export function Services({
  showButton = false,
  children,
  isHomePage = false,
  showTitle = true,
  asGrid = false,
  titleClassName = '',
}: ServicesProps) {
  const t = useTranslations('Home');

  const [api, setApi] = useState<CarouselApi>();
  const [_current, setCurrent] = useState(0);
  const [_count, setCount] = useState(0);

  // Логіка для оновлення поточного слайда
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section
      className={`${
        isHomePage
          ? 'container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-full -mt-14 sm:-mt-[220px]'
          : 'py-8'
      }`}>
      {/* Умовний заголовок секції */}
      {showTitle && (
        <h2
          id="our-services"
          className={`text-2xl sm:text-3xl lg:text-4xl w-full font-extrabold tracking-tight mb-6 sm:mb-8 text-left break-words ${titleClassName}`}>
          {t('our')}{' '}
          <span className="bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent">
            {t('services')}
          </span>
        </h2>
      )}

      {asGrid ? (
        // Відображення як сітка для сторінки сервісів
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {serviceData.map((service, index) => (
            <ServiceDetail
              key={`service-grid-${index}`}
              titleKey={service.titleKey}
              descriptionKey={service.descriptionKey}
              details={service.details}
              features={service.features}
              processSteps={service.processSteps}
              imageGallery={service.imageGallery}
            />
          ))}
        </div>
      ) : (
        // Відображення як карусель для головної сторінки
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: false,
            // Покращена адаптивність для різних розмірів екрану
            breakpoints: {
              '(min-width: 0px)': { slidesToScroll: 1, dragFree: false },
              '(min-width: 640px)': { slidesToScroll: 1, dragFree: false },
              '(min-width: 768px)': { slidesToScroll: 2, dragFree: false },
              '(min-width: 1024px)': { slidesToScroll: 3, dragFree: false },
            },
          }}
          className="w-full relative select-none">
          <CarouselContent className="-ml-1 sm:-ml-2 lg:-ml-4 mb-1">
            {serviceData.map((service, index) => (
              // Покращені адаптивні класи для дуже малих екранів
              <CarouselItem
                key={`service-carousel-${index}`}
                className="pl-1 sm:pl-2 lg:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <ServiceDetail
                  titleKey={service.titleKey}
                  descriptionKey={service.descriptionKey}
                  details={service.details}
                  features={service.features}
                  processSteps={service.processSteps}
                  imageGallery={service.imageGallery}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Адаптивні кнопки управління каруселлю */}
          <div className="flex absolute right-0 -bottom-16 w-full justify-end pr-2 sm:pr-4">
            <div className="flex space-x-2">
              <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-8 w-8 sm:h-10 sm:w-10" />
              <CarouselNext className="relative right-0 top-0 translate-y-0 h-8 w-8 sm:h-10 sm:w-10" />
            </div>
          </div>
        </Carousel>
      )}

      {/* Адаптивна кнопка для переходу на сторінку сервісів */}
      {showButton && (
        <div className="flex justify-center mt-8">
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-foreground hover:bg-foreground/90 text-background text-sm sm:text-base font-medium rounded-lg transition-colors duration-200 gap-2">
            <LayoutGrid className="w-4 h-4" />
            <span className="text-center">{t('viewAllServices')}</span>
          </Link>
        </div>
      )}

      {/* Місце для children - додаткового контенту */}
      {children}
    </section>
  );
}
