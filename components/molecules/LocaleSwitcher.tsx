'use client';

import { Button } from '@/components/ui/button';
import { Locale, LOCALE_NAMES, usePathname, useRouter } from '@/i18n/routing';
import { useLocaleStore } from '@/stores/localeStore';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';

interface LocaleSwitcherProps {
  isScrolled?: boolean;
  isHomePage?: boolean;
}

export default function LocaleSwitcher({
  isScrolled = true,
  isHomePage = false,
}: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const { dismissLanguageAlert } = useLocaleStore();
  const [, startTransition] = useTransition();

  function toggleLocale() {
    const nextLocale: Locale = locale === 'en' ? 'nl' : 'en';
    dismissLanguageAlert();

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params: params || {} },
        { locale: nextLocale }
      );
    });
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className={cn(
        'flex items-center gap-1 transition-colors duration-300 cursor-pointer',
        // Динамічний колір бордера та тексту
        !isScrolled && isHomePage
          ? 'text-white hover:bg-white/10'
          : 'border-foreground text-foreground hover:bg-accent'
      )}>
      <Globe className="w-4 h-4" />
      <span className="font-medium">{LOCALE_NAMES[locale]}</span>
    </Button>
  );
}
