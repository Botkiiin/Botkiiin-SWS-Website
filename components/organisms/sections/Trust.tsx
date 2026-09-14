'use client';

import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface TrustProps {
  hideTitle?: boolean;
  noPadding?: boolean;
  titleClassName?: string;
}

const faqItems = [
  { id: 'item-1', questionKey: 'faq1Question', answerKey: 'faq1Answer' },
  { id: 'item-2', questionKey: 'faq2Question', answerKey: 'faq2Answer' },
  { id: 'item-3', questionKey: 'faq3Question', answerKey: 'faq3Answer' },
  { id: 'item-4', questionKey: 'faq4Question', answerKey: 'faq4Answer' },
  { id: 'item-5', questionKey: 'faq5Question', answerKey: 'faq5Answer' },
  { id: 'item-6', questionKey: 'faq6Question', answerKey: 'faq6Answer' },
  { id: 'item-7', questionKey: 'faq7Question', answerKey: 'faq7Answer' },
  { id: 'item-8', questionKey: 'faq8Question', answerKey: 'faq8Answer' },
];

const serviceBlocks = [
  {
    titleKey: 'woodworkingTitle',
    imageUrl: '/services/woodworking/1.jpeg',
  },
  {
    titleKey: 'bathroomTitle',
    imageUrl: '/services/Bathrooms/0363b908-c029-4b40-89b5-c2780ec96e1f.jpg',
  },
  {
    titleKey: 'kitchenTitle',
    imageUrl: '/services/Kitchens/01a97bd4-a7cf-4f11-8d09-afe276e67e1f.jpg',
  },
];

export const Trust = ({
  hideTitle = false,
  noPadding = false,
  titleClassName = '',
}: TrustProps) => {
  const t = useTranslations('Home');

  return (
    <section className={`w-full ${noPadding ? '' : 'px-4 py-8'}`}>
      {!hideTitle && (
        <div className="mb-12 max-w-7xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${titleClassName}`}>
            <span className="text-foreground">{t('trust')} </span>
            <span className="text-foreground">{t('the')} </span>
            <span className="bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent">
              {t('professionals')}
            </span>
          </h2>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Service Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceBlocks.map((block, index) => (
            <Link key={`trust-service-${index}`} href="/contacts/form" className="group">
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image
                  src={block.imageUrl}
                  alt={t(block.titleKey)}
                  fill
                  className="object-cover brightness-50 group-hover:brightness-75 transition-all duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl md:text-2xl font-bold text-center px-4 uppercase">
                    {t(block.titleKey)}
                  </h3>
                </div>

                <div className="absolute bottom-4 right-4">
                  <Button variant="secondary" size="sm" className="uppercase text-xs font-semibold">
                    {t('contactUs')}
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 shadow backdrop-blur-sm">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{t(item.questionKey)}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>{t(item.answerKey)}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
