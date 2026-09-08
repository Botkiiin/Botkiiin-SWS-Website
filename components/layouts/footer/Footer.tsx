'use client';

import { type FooterLink } from '@/types/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link as I18nLink, routing, usePathname } from '@/i18n/routing';

import { MailIcon } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { SiInstagram } from 'react-icons/si';

import { siteConfig } from '@/config/site';
import { contactsConfig, getPhoneLink, getEmailLink } from '@/config/contacts';
// import { Telegram } from '@/components/atoms/social-icons/icons';

export default function Footer() {
  const t = useTranslations('Home');
  const tFooter = useTranslations('Footer');
  const pathname = usePathname();

  // Автоматично визначаємо, чи потрібно ховати контактну інформацію
  const hideContactInfo = pathname === '/contacts';

  const footerLinks: FooterLink[] = tFooter.raw('Links.groups');
  const isLocaleLink = (href: string) =>
    routing.locales.some((locale) => href === `/${locale}` || href.startsWith(`/${locale}/`));

  return (
    <div className="bg-secondary text-gray-300">
      <footer className="py-2 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-12 lg:grid-cols-6">
            <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-4 col-span-full md:col-span-2">
              <div className="space-y-4 flex-1">
                <div className="items-center space-x-2 flex">
                  <I18nLink href="/" prefetch={false} className="flex items-center w-fit font-bold">
                    <Image
                      alt={siteConfig.name}
                      src="/logo.svg"
                      className="w-12 h-12 min-w-12"
                      width={48}
                      height={48}
                    />
                  </I18nLink>
                  <h2 className="highlight-text text-2xl font-bold">{t('tagLine')}</h2>
                </div>

                <div className="flex items-center gap-2">
                  {/* {siteConfig.socialLinks?.github && (
                    <Link
                      href={siteConfig.socialLinks.github}
                      prefetch={false}
                      target="_blank"
                      rel="noreferrer nofollow noopener"
                      aria-label="GitHub"
                      title="View on GitHub"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
                      <GithubIcon className="size-4" aria-hidden="true" />
                    </Link>
                  )} */}
                  {siteConfig.socialLinks?.instagram && (
                    <Link
                      href={siteConfig.socialLinks.instagram}
                      prefetch={false}
                      target="_blank"
                      rel="noreferrer nofollow noopener"
                      aria-label="Instagram"
                      title="Join Instagram"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
                      <SiInstagram className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  )}
                  {siteConfig.socialLinks?.tiktok && (
                    <Link
                      href={siteConfig.socialLinks.tiktok}
                      prefetch={false}
                      target="_blank"
                      rel="noreferrer nofollow noopener"
                      aria-label="TikTok"
                      title="View on TikTok"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
                      <SiTiktok className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  )}
                  {/* {siteConfig.socialLinks?.telegram && (
                    <Link
                      href={siteConfig.socialLinks.telegram}
                      prefetch={false}
                      target="_blank"
                      rel="noreferrer nofollow noopener"
                      aria-label="Telegram"
                      title="View on Telegram"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
                      <Telegram className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  )} */}
                  {siteConfig.socialLinks?.email && (
                    <Link
                      href={`mailto:${siteConfig.socialLinks.email}`}
                      prefetch={false}
                      target="_blank"
                      rel="noreferrer nofollow noopener"
                      aria-label="Email"
                      title="Email"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
                      <MailIcon className="w-4 h-4" />
                    </Link>
                  )}
                </div>

                {/* Contact Information - умовно показується */}
                {!hideContactInfo && (
                  <div className="space-y-3 mt-6">
                    <h3 className="text-white text-lg font-semibold">{tFooter('Contact.title')}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MailIcon className="w-4 h-4 text-gray-400" />
                        <a
                          href={getEmailLink()}
                          className="text-gray-300 hover:text-white transition-colors">
                          {contactsConfig.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <a
                          href={getPhoneLink()}
                          className="text-gray-300 hover:text-white transition-colors">
                          {contactsConfig.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-gray-300">{contactsConfig.address}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {footerLinks.map((section) => (
              <div key={section.title} className="flex-1">
                <h3 className="text-white text-lg font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, i) => (
                    <li key={`link-key-${i}`}>
                      {link.href.startsWith('/') && !isLocaleLink(link.href) ? (
                        <I18nLink
                          href={link.href}
                          title={link.name}
                          prefetch={false}
                          className="hover:text-white transition-colors"
                          target={link.target || ''}
                          rel={link.rel || ''}>
                          {link.name}
                        </I18nLink>
                      ) : (
                        <Link
                          href={link.href}
                          title={link.name}
                          prefetch={false}
                          className="hover:text-white transition-colors"
                          target={link.target || ''}
                          rel={link.rel || ''}>
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {tFooter('Copyright', {
                year: new Date().getFullYear(),
                name: siteConfig.name,
              })}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <I18nLink
                href="/privacy-policy"
                title={tFooter('PrivacyPolicy')}
                prefetch={false}
                className="text-gray-400 hover:text-white text-sm">
                {tFooter('PrivacyPolicy')}
              </I18nLink>
              <I18nLink
                href="/terms-of-service"
                title={tFooter('TermsOfService')}
                prefetch={false}
                className="text-gray-400 hover:text-white text-sm">
                {tFooter('TermsOfService')}
              </I18nLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
