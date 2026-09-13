'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (!api || isHovered) {
      setProgress(0);
      return;
    }

    const duration = 4000;
    const interval = 50;
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

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const testimonials = [
    {
      id: 1,
      author: 'Milo',
      source: 'Klantreactie via WhatsApp',
      service: 'Uitgevoerd werk',
      text:
        'Hallo Stas, ik heb de factuur zojuist voldaan. Bedankt voor al het goede werk. We zijn erg blij met het resultaat. Wellicht zien we elkaar weer in de toekomst.',
    },
    {
      id: 2,
      author: 'Jeroen Letterie',
      source: 'Klantreactie via e-mail',
      service: 'Houtrotherstel',
      text:
        'Goedemiddag,\n\nTer volledigheid heb ik een opleveringsdocument gemaakt voor het houtrotherstel tpv de begane grond van het Rosaklooster.\n\nDaarin heb ik vastgelegd aan welke kozijnen herstel heeft plaatsgevonden, door zowel De Vries als SWS Klussenbedrijf.\n\nHiermee hoop ik een duidelijk overzicht te hebben gemaakt, dat in de toekomst bruikbaar is voor garantie en voor eventuele communicatie met Monumentenzorg.\n\nAls er verder vragen zijn, dan hoor ik het graag.\n\nMet vriendelijke groet,\nJeroen',
    },
    {
      id: 3,
      author: 'Anny en Dick Poel',
      source: 'Klantreactie via e-mail',
      service: 'Bouw- en renovatiewerk',
      text:
        'Beste Lucas,\n\nWe willen je bedanken voor je wetk, de werkzaamheden en begeleiding.apport.Het was voor.onsc een intensief en complex proces ernaartoe.\n\nWe zijn blij met het resultaat en de werk van de mensen die het uitgevoerd hebben van SWS klusbedrijf.Misschien kan je hun naam doorgeven naar andere klanten.\n\nHet is een opluchting om door het proces heen te komen, en verder te kunnen. .\n\nEen ding aub bevestigen dat wij Anny en Dick Poel alles  hebben betaald . Op een paar facturen stond 87C of 83 C . Dat was onjuist\n\nMet vriendelijke groeten,\nAnny en Dick Poel',
    },
    {
      id: 4,
      author: 'Dick',
      source: 'Klantreactie via e-mail',
      service: 'Geluidsmeting / KGI',
      text:
        'Stas, Hierbij het eindrapport van het KGI.\nDe geluidsmeting is heel positief en veel beter dan verwacht.\nDankzij Sacha en Sergei.\n\nHeel erg goed.\n\nDick',
    },
  ];

  return (
    <section className="px-3 w-full py-8">
      <h2
        id="testimonials"
        className={`text-3xl font-extrabold tracking-tight mb-8 ${titleClassName}`}
      >
        {t('whatOurCustomers')}
        <span>{t('the')}</span>
        <span className="text-primary">{t('sayAboutUs')}</span>
      </h2>

      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
          breakpoints: {
            '(min-width: 0px)': { slidesToScroll: 1 },
            '(min-width: 768px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 3 },
          },
        }}
        className="w-full relative select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <article className="h-full rounded-2xl border bg-card p-6 shadow-sm flex flex-col">
                <div className="text-primary text-4xl font-serif leading-none mb-4">
                  “
                </div>

                <p className="text-base leading-7 whitespace-pre-line flex-1">
                  {testimonial.text}
                </p>

                <div className="mt-6 pt-4 border-t">
                  <p className="font-bold text-lg">{testimonial.author}</p>
                  <p className="text-sm text-primary mt-1">
                    {testimonial.service}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {testimonial.source}
                  </p>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

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
