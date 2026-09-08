'use client';

import { type CustomLink } from '@/types/navigation';

import { Link as I18nLink, usePathname } from '@/i18n/routing';
import { ExternalLink, Home, Wrench, Shield, Users, Mail, Briefcase } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface HeaderLinksProps {
  isScrolled: boolean;
  isHomePage: boolean;
}

const HeaderLinks = ({ isScrolled, isHomePage }: HeaderLinksProps) => {
  const tHeader = useTranslations('Header');
  const pathname = usePathname();

  const headerLinks: CustomLink[] = tHeader.raw('links');

  // Функція для отримання іконки залежно від назви посилання
  const getIconForLink = (href: string) => {
    switch (href) {
      case '/':
        return <Home className="h-4 w-4" />;
      case '/services':
        return <Wrench className="h-4 w-4" />;
      case '/trust':
        return <Shield className="h-4 w-4" />;
      case '/about':
        return <Users className="h-4 w-4" />;
      case '/contacts':
        return <Mail className="h-4 w-4" />;
      case '/vacancies':
        return <Briefcase className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  return (
    <div className="hidden md:flex items-center gap-x-1 text-sm font-medium ml-4">
      {headerLinks.map((link) => (
        <I18nLink
          key={link.name}
          href={link.href}
          title={link.name}
          prefetch={link.target && link.target === '_blank' ? false : true}
          target={link.target || '_self'}
          rel={link.rel || undefined}
          className={cn(
            'rounded-xl py-2 px-2 flex items-center gap-x-1.5 transition-all duration-300 group pr-3',
            pathname === link.href && 'font-semibold text-primary',
            // Колір при hover залежить від стану скролу та сторінки
            !isScrolled && isHomePage ? 'hover:text-white' : 'hover:text-accent-foreground'
          )}>
          <span
            className={cn(
              'transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 hidden lg:block',
              pathname === link.href
                ? 'text-primary'
                : cn(
                    'text-muted-foreground',
                    !isScrolled && isHomePage
                      ? 'group-hover:text-white'
                      : 'group-hover:text-accent-foreground'
                  )
            )}>
            {getIconForLink(link.href)}
          </span>
          <span className="transition-all duration-300 group-hover:translate-x-1 whitespace-nowrap overflow-ellipsis truncate">
            {link.name}
          </span>
          {link.target && link.target === '_blank' && (
            <span className="text-xs">
              <ExternalLink className="w-4 h-4" />
            </span>
          )}
        </I18nLink>
      ))}
    </div>
  );
};

// Експорт функції для використання в інших компонентах
export const getIconForLink = (href: string) => {
  switch (href) {
    case '/':
      return <Home className="h-4 w-4" />;
    case '/services':
      return <Wrench className="h-4 w-4" />;
    case '/trust':
      return <Shield className="h-4 w-4" />;
    case '/about':
      return <Users className="h-4 w-4" />;
    case '/contacts':
      return <Mail className="h-4 w-4" />;
    case '/vacancies':
      return <Briefcase className="h-4 w-4" />;
    default:
      return <Home className="h-4 w-4" />;
  }
};

export default HeaderLinks;
