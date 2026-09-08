'use client';

import HeaderLinks from '@/components/layouts/header/HeaderLinks';
import MobileMenu from '@/components/layouts/header/MobileMenu';
import LocaleSwitcher from '@/components/molecules/LocaleSwitcher';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';
import { siteConfig } from '@/config/site';
import { Link as I18nLink, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

const Header = () => {
  const t = useTranslations('Header');
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHomePage = pathname === '/';

  const headerClasses = [
    'sticky top-0 z-50 w-full py-2 px-3 sm:px-6 will-change-transform transform-gpu', // Базові класи
    isScrolled
      ? 'bg-background/80 backdrop-blur-sm shadow-md text-foreground' // Класи, коли скрол > 0
      : isHomePage
        ? 'text-white'
        : '', // Пустий рядок, коли скрол = 0
  ].join(' '); // Об'єднуємо масив класів у рядок

  return (
    // 4. Застосовуємо динамічні класи
    <header className={headerClasses} style={{ transform: 'translate3d(0,0,0)' }}>
      <div className="container max-w-7xl lg:mx-auto w-full">
        <nav className="flex justify-between items-center w-full mx-auto xl:px-4">
          <div className="flex items-center">
            <I18nLink
              href="/"
              prefetch={false}
              className="flex items-center w-fit font-bold relative will-change-transform"
              style={{ transform: 'translate3d(0,0,0)' }}>
              <Image
                alt={siteConfig.name}
                src="/logo.svg"
                className={cn(
                  'transition-all duration-300 ease-in-out will-change-transform transform-gpu',
                  !isScrolled && isHomePage
                    ? 'w-12 h-12 min-w-12 max-md:w-24 max-md:h-24 max-md:min-w-24 absolute top-0 left-0 transform'
                    : 'max-md:w-12 h-12 max-md:min-w-12'
                )}
                width={!isScrolled && isHomePage ? 96 : 48}
                height={!isScrolled && isHomePage ? 96 : 48}
                style={{ transform: 'translate3d(0,0,0)' }}
              />
              {/* Invisible placeholder to maintain layout when logo is absolute */}
              {!isScrolled && isHomePage && <div className="w-12 h-12 min-w-12" />}
            </I18nLink>
            <HeaderLinks isScrolled={isScrolled} isHomePage={isHomePage} />
          </div>

          <div className="flex items-center gap-x-2 md:gap-x-3 lg:gap-x-4 flex-1 justify-end">
            {/* PC */}
            <div className="hidden md:flex items-center gap-x-3">
              <LocaleSwitcher isScrolled={isScrolled} isHomePage={isHomePage} />
              <ThemeToggle isScrolled={isScrolled} isHomePage={isHomePage} />
            </div>
            <Button
              variant="ghost"
              asChild
              className={cn(
                'max-sm:hidden shadow cursor-pointer border transition-all duration-300',
                // Hover ефекти як в Hero кнопках
                !isScrolled && isHomePage
                  ? 'hover:bg-white/90 hover:text-gray-900 hover:border-gray-900'
                  : 'hover:!text-primary hover:bg-primary/20 dark:hover:bg-primary/10',
                // Динамічний колір бордера та тексту
                'border-primary text-primary'
              )}>
              <I18nLink href="/contacts">{t('incentive')}</I18nLink>
            </Button>

            {/* Mobile */}
            <MobileMenu isScrolled={isScrolled} isHomePage={isHomePage} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
