import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { useTranslations } from 'next-intl';
import { MessageCircleIcon } from 'lucide-react';
import GradientLink from '@/components/shared/GradientLink';

export const Hero = () => {
  const t = useTranslations('Home');

  return (
    <section className="relative w-screen">
      <Image
        src={'/hero/1-min.jpeg'}
        alt={'hero-bg'}
        fill
        className="absolute -z-[1] -mt-[64px] lg:-mt-[240px] inset-0 object-cover sm:max-lg:!h-[75%] brightness-[20%] bg-secondary/[.94]"
      />
      <div className="px-4 sm:px-6 lg:px-8 pt-18 lg:pt-24 pb-[88px] lg:pb-[340px] w-full max-w-7xl sm:max-lg:mb-[160px] mx-auto">
        <h1 className="max-w-full font-display text-3xl lg:text-5xl font-bold tracking-tight text-white overflow-x-hidden overflow-y-hidden min-h-fit sm:pr-5">
          <span>{`${t('welcomeTo')} `} </span>
          <br className="sm:hidden" />
          <span className="relative whitespace-nowrap text-primary">
            <span className=" text-wrap">{t('tagLine')} </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/30"
              preserveAspectRatio="none">
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
            </svg>
            <br />
          </span>
          {t('heroSpecialist')}
        </h1>
        <p className="mt-6 lg:text-2xl tracking-tight text-gray-100">{t('description')}</p>

        {/* backdrop-blur-3xl */}

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <Button
            className="h-11 rounded-xl py-2 text-primary border-[1px] border-primary transition-all duration-300 hover:bg-white/90 dark:hover:bg-white/70 hover:text-gray-900 hover:border-gray-900"
            variant="ghost"
            asChild>
            <Link
              href="/contacts"
              title="Contact us"
              prefetch={false}
              className="flex items-center gap-2 group">
              <MessageCircleIcon className="w-4 h-4 text-primary transition-colors duration-300 group-hover:text-gray-900" />
              {t('contactUs')}
            </Link>
          </Button>
          <Button
            className="h-11 rounded-xl py-2 transition-all duration-300 hover:bg-white/90 dark:hover:bg-white/70"
            variant="ghost"
            asChild>
            <GradientLink
              text={t('ourProjects')}
              href={siteConfig.socialLinks?.instagram || 'https://instagram.com/'}
            />
          </Button>
        </div>
      </div>
    </section>
  );
};
