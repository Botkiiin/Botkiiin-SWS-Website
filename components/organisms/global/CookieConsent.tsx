'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Cookie, Shield, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('CookieConsent');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Не показуємо банер на сторінках Privacy Policy та Terms of Service
    const isPrivacyOrTermsPage = pathname === '/privacy-policy' || pathname === '/terms-of-service';

    if (isPrivacyOrTermsPage) {
      setIsLoading(false);
      return;
    }

    // Перевіряємо, чи користувач вже прийняв cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
    setIsLoading(false);
  }, [pathname]);

  // Функція для переходу на Privacy Policy без збереження згоди
  const handlePrivacyPolicyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVisible(false); // Приховуємо модальне вікно
    router.push('/privacy-policy'); // Переходимо на сторінку
  };

  // Функція для переходу на Terms of Service без збереження згоди
  const handleTermsOfServiceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVisible(false); // Приховуємо модальне вікно
    router.push('/terms-of-service'); // Переходимо на сторінку
  };

  const acceptAll = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString(),
      })
    );
    setIsVisible(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
      })
    );
    setIsVisible(false);
  };

  const decline = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
        declined: true,
        timestamp: new Date().toISOString(),
      })
    );
    setIsVisible(false);
  };

  if (isLoading || !isVisible) {
    return null;
  }

  return (
    <div className="fixed max-w-svw inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={decline}
          className="absolute top-4 right-4 p-1 hover:bg-accent rounded-full transition-colors"
          aria-label="Close">
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{t('title')}</h2>
              <p className="text-sm text-muted-foreground mt-1">{t('subtitle')}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">{t('description')}</p>

            {/* Cookie types */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="font-medium">{t('necessary')}</span>
                <span className="text-muted-foreground">- {t('necessaryDesc')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Cookie className="w-4 h-4 text-blue-600" />
                <span className="font-medium">{t('analytics')}</span>
                <span className="text-muted-foreground">- {t('analyticsDesc')}</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4 text-sm">
            <button
              onClick={handlePrivacyPolicyClick}
              className="text-primary hover:underline flex items-center gap-1 cursor-pointer">
              <FileText className="w-3 h-3" />
              {t('privacyPolicy')}
            </button>
            <button
              onClick={handleTermsOfServiceClick}
              className="text-primary hover:underline flex items-center gap-1 cursor-pointer">
              <FileText className="w-3 h-3" />
              {t('termsOfService')}
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button onClick={acceptAll} className="flex-1 bg-primary hover:bg-primary/90">
              {t('acceptAll')}
            </Button>
            <Button onClick={acceptNecessary} variant="outline" className="flex-1">
              {t('acceptNecessary')}
            </Button>
            <Button
              onClick={decline}
              variant="ghost"
              className="flex-1 text-muted-foreground hover:text-foreground">
              {t('decline')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
