'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useLocale } from 'next-intl';

const services = [
  {
    image: '/services/Wood-Restoration/01a97bd4-a7cf-4f11-8d09-afe276e67e1f(1).jpg',
    nl: 'Houtrestauratie',
    en: 'Wood Restoration',
    descriptionNl: 'Restauratie en herstel van houten ramen, deuren en andere houten elementen.',
    descriptionEn: 'Restoration and repair of wooden windows, doors and other wooden elements.',
  },
  {
    image: '/services/Bathrooms/0363b908-c029-4b40-89b5-c2780ec96e1f.jpg',
    nl: 'Badkamerrenovatie',
    en: 'Bathroom Renovation',
    descriptionNl: 'Complete renovatie en afwerking van moderne en praktische badkamers.',
    descriptionEn: 'Complete renovation and finishing of modern, practical bathrooms.',
  },
  {
    image: '/services/Kitchens/01a97bd4-a7cf-4f11-8d09-afe276e67e1f.jpg',
    nl: 'Keukenrenovatie',
    en: 'Kitchen Renovation',
    descriptionNl: 'Keukenrenovatie en hoogwaardige afwerking, afgestemd op uw woning.',
    descriptionEn: 'Kitchen renovation and high-quality finishing tailored to your home.',
  },
  {
    image: '/services/Stairs/a707f1a1-edbe-450f-9704-1cb42af9e3d8.jpg',
    nl: 'Traprenovatie',
    en: 'Stair Renovation',
    descriptionNl: 'Renovatie, herstel en afwerking van houten trappen.',
    descriptionEn: 'Renovation, repair and finishing of wooden stairs.',
  },
  {
    image: '/services/Painting-Finishing/02898ccc-63f4-470f-bc31-36ffe6131ff4.jpg',
    nl: 'Schilderwerk',
    en: 'Painting & Finishing',
    descriptionNl: 'Professioneel schilderwerk en nette afwerking van binnen- en buitenruimtes.',
    descriptionEn: 'Professional painting and finishing for interiors and exteriors.',
  },
  {
    image: '/services/Other-Renovation/641c0597-84c8-457c-92d7-037e677cdc72.jpg',
    nl: 'Overige renovatie',
    en: 'Other Renovation',
    descriptionNl: 'Diverse renovatie- en afwerkingswerkzaamheden voor woning en interieur.',
    descriptionEn: 'Additional renovation and finishing work for your home and interior.',
  },
];

export function PremiumServices() {
  const locale = useLocale();
  const isNl = locale === 'nl';

  return (
    <section id="services" className="bg-[#f5f3ef] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#a76c3b]">
              SWS · Services
            </p>

            <h2 className="font-serif text-4xl tracking-tight text-[#1f2925] sm:text-5xl">
              {isNl ? 'Vakmanschap voor ieder project' : 'Craftsmanship for every project'}
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-[#59625d]">
            {isNl
              ? 'Van restauratie tot complete renovatie: zorgvuldig uitgevoerd met oog voor detail en duurzaamheid.'
              : 'From restoration to complete renovation: carefully executed with attention to detail and durability.'}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <a
              key={service.nl}
              href="#contact"
              className="group relative min-h-[430px] overflow-hidden rounded-[1.5rem] bg-[#1f2925]"
            >
              <Image
                src={service.image}
                alt={isNl ? service.nl : service.en}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-7">
                <div className="mb-3 flex items-end justify-between gap-4">
                  <h3 className="font-serif text-2xl text-white sm:text-3xl">
                    {isNl ? service.nl : service.en}
                  </h3>

                  <ArrowUpRight className="mb-1 h-6 w-6 shrink-0 text-white transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>

                <p className="max-w-md text-sm leading-6 text-white/80">
                  {isNl ? service.descriptionNl : service.descriptionEn}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
