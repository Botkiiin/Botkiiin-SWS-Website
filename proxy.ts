// src/proxy.ts (або в корені проекту)
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  // next-intl поки що використовує стару назву функції всередині,
  // але Next.js очікує експорт за замовчуванням або функцію proxy
  const handleI18nRouting = createMiddleware(routing);

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
