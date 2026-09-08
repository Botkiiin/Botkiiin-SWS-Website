'use client';

import { type CustomLink } from '@/types/navigation';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Link as I18nLink } from '@/i18n/routing';
import { contactsConfig, getPhoneLink, getEmailLink } from '@/config/contacts';
import { getIconForLink } from '@/components/layouts/header/HeaderLinks';

import LocaleSwitcher from '@/components/molecules/LocaleSwitcher';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Menu, Phone, Mail, MapPin } from 'lucide-react';

interface MobileMenuProps {
  isScrolled?: boolean;
  isHomePage?: boolean;
}

export default function MobileMenu({ isScrolled = true, isHomePage = false }: MobileMenuProps) {
  const t = useTranslations('Home');
  const tHeader = useTranslations('Header');
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const headerLinks: CustomLink[] = tHeader.raw('links');

  // Функція для перевірки чи є посилання активним
  const isLinkActive = (href: string): boolean => {
    // Видаляємо мову з pathname для порівняння
    const cleanPathname = pathname.replace(/^\/(en|nl)/, '') || '/';
    const cleanHref = href === '/' ? '/' : href;

    return cleanPathname === cleanHref;
  };

  return (
    <div className="flex items-center gap-1 md:hidden">
      <LocaleSwitcher isScrolled={isScrolled} isHomePage={isHomePage} />
      <ThemeToggle isScrolled={isScrolled} isHomePage={isHomePage} />
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger
          className={cn(
            'p-2 rounded-md transition-colors duration-300',
            !isScrolled && isHomePage
              ? 'text-white hover:bg-white/10'
              : 'hover:bg-accent hover:text-accent-foreground'
          )}>
          <Menu className="h-5 w-5" />
        </DrawerTrigger>
        <DrawerContent
          className={cn(
            isScrolled ? 'z-[100]' : 'z-[70]',
            '!fixed !top-0 !right-0 !h-screen !bottom-auto'
          )}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100vh',
            bottom: 'auto',
            zIndex: isScrolled ? 100 : 70,
          }}>
          <DrawerHeader>
            <DrawerTitle>
              <I18nLink
                href="/"
                title={t('tagLine')}
                prefetch={true}
                className="flex items-center space-x-2 font-bold"
                onClick={() => setIsOpen(false)}>
                <Image
                  alt={t('tagLine')}
                  src="/logo.svg"
                  className="w-8 h-8"
                  width={32}
                  height={32}
                />
                <span className="highlight-text text-sm">{t('tagLine')}</span>
              </I18nLink>
            </DrawerTitle>
            <DrawerClose />
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-1">
              {headerLinks.map((link, index) => (
                <div
                  key={link.name}
                  className="animate-in slide-in-from-right fade-in"
                  style={{
                    animationDelay: `${(index + 1) * 100}ms`,
                    animationDuration: '400ms',
                    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                  }}>
                  <I18nLink
                    href={link.href}
                    title={link.name}
                    prefetch={link.target && link.target === '_blank' ? false : true}
                    target={link.target || '_self'}
                    rel={link.rel || undefined}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 active:scale-95 hover:scale-105 hover:shadow-md group',
                      isLinkActive(link.href)
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    )}>
                    <span
                      className={cn(
                        'transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12',
                        isLinkActive(link.href)
                          ? 'text-primary'
                          : 'text-muted-foreground group-hover:text-accent-foreground'
                      )}>
                      {getIconForLink(link.href)}
                    </span>
                    <span className="transition-all duration-300 group-hover:translate-x-1">
                      {link.name}
                    </span>
                  </I18nLink>
                </div>
              ))}
            </nav>

            {/* Контактна інформація та CTA */}
            <div className="p-4 space-y-4 border-t border-border bg-gradient-to-b from-background/95 to-background">
              {/* Контактна інформація */}
              <div className="space-y-3">
                {[
                  { icon: Phone, text: contactsConfig.phone, href: getPhoneLink() },
                  { icon: Mail, text: contactsConfig.email, href: getEmailLink() },
                  { icon: MapPin, text: contactsConfig.address, href: null },
                ].map((contact, index) => (
                  <div
                    key={`mobile-contact-${index}`}
                    className="animate-in slide-in-from-bottom fade-in opacity-0"
                    style={{
                      animationDelay: `${600 + index * 150}ms`,
                      animationDuration: '500ms',
                      animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                    }}>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 group p-2 rounded-lg hover:bg-accent/30">
                        <span className="transition-transform duration-300 group-hover:scale-110">
                          <contact.icon size={16} />
                        </span>
                        <span className="transition-all duration-300 group-hover:translate-x-1">
                          {contact.text}
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground p-2 rounded-lg">
                        <contact.icon size={16} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{contact.text}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div
                className="animate-in slide-in-from-bottom fade-in opacity-0"
                style={{
                  animationDelay: '1050ms',
                  animationDuration: '500ms',
                  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                }}>
                <I18nLink
                  href="/contacts"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center rounded-xl px-8 py-2 text-primary border-[1px] border-primary transition-all duration-300 hover:text-foreground hover:bg-primary/20 hover:border-foreground">
                  {tHeader('incentive')}
                </I18nLink>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
