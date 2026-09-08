'use client';

import { useState, useEffect } from 'react';

export interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  declined?: boolean;
  timestamp: string;
}

export function useCookieConsent() {
  const [settings, setSettings] = useState<CookieSettings | null>(null);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CookieSettings;
        setSettings(parsed);
        setHasConsent(true);
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
      }
    }
  }, []);

  const updateConsent = (newSettings: Partial<CookieSettings>) => {
    const updated = {
      necessary: true, // Завжди true
      analytics: false,
      marketing: false,
      ...newSettings,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('cookie-consent', JSON.stringify(updated));
    setSettings(updated);
    setHasConsent(true);
  };

  const clearConsent = () => {
    localStorage.removeItem('cookie-consent');
    setSettings(null);
    setHasConsent(false);
  };

  const canUseAnalytics = () => {
    return settings?.analytics === true;
  };

  const canUseMarketing = () => {
    return settings?.marketing === true;
  };

  return {
    settings,
    hasConsent,
    canUseAnalytics,
    canUseMarketing,
    updateConsent,
    clearConsent,
  };
}
