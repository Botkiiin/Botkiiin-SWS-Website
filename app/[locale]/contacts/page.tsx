import { Locale, LOCALES, Link as I18nLink } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { contactsConfig, getPhoneLink, getEmailLink } from '@/config/contacts';
import { siteConfig } from '@/config/site';
import { Phone, Mail, MapPin, GithubIcon, MailIcon } from 'lucide-react';
import { SiInstagram, /* SiTelegram, */ SiTiktok } from 'react-icons/si';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Hours from '@/components/molecules/Hours';

type Params = Promise<{
  locale: string;
}>;

type MetadataProps = {
  params: Params;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contacts' });

  return constructMetadata({
    page: 'Contacts',
    title: t('title'),
    description: t('description'),
    locale: locale as Locale,
    path: `/contacts`,
    canonicalUrl: `/contacts`,
  });
}

export default async function ContactsPage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contacts' });

  return (
    <div className="min-h-screen w-full">
      <div className=" px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-[#0851a3] bg-clip-text text-transparent">
            {t('heading')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('subheading')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column: Title, Buttons, Contact Info, Info Card */}
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Title above buttons */}
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {t('contactOptionsTitle') || 'Contact Options'}
              </h3>
              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <Button
                  asChild
                  size="lg"
                  className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <I18nLink href="/contacts/form">{t('buttons.requestCall')}</I18nLink>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full text-lg py-6 border-2 hover:bg-accent hover:scale-105 transition-all duration-300">
                  <I18nLink href="/consultation">{t('buttons.consultation')}</I18nLink>
                </Button>
              </div>
              {/* Contact Info below buttons */}
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                {t('contactInfo.title')}
              </h2>
              <div className="space-y-4 mb-8">
                <a
                  href={getPhoneLink()}
                  className="flex items-center shadow gap-4 p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-muted-foreground">{contactsConfig.phone}</p>
                  </div>
                </a>
                <a
                  href={getEmailLink()}
                  className="flex items-center shadow gap-4 p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">{contactsConfig.email}</p>
                  </div>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactsConfig.address)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center shadow gap-4 p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-muted-foreground">{contactsConfig.address}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Info and Working Hours */}
          {/* Right Column: Social Media Top, Working Hours Bottom */}
          <div className="flex flex-col h-full">
            {/* Social Media */}
            <h3 className="text-xl font-semibold mb-4 text-foreground">{t('socialMedia.title')}</h3>
            <p className="text-muted-foreground mb-6">{t('socialMedia.description')}</p>
            <div className="flex gap-4 mb-8">
              {siteConfig.socialLinks?.github && (
                <Link
                  href={siteConfig.socialLinks.github}
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  className="inline-flex shadow h-12 w-12 items-center justify-center rounded-lg bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 group">
                  <GithubIcon className="size-6 group-hover:scale-110 transition-transform" />
                </Link>
              )}
              {siteConfig.socialLinks?.instagram && (
                <Link
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  className="inline-flex shadow h-12 w-12 items-center justify-center rounded-lg bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 group">
                  <SiInstagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </Link>
              )}
              {siteConfig.socialLinks?.tiktok && (
                <Link
                  href={siteConfig.socialLinks.tiktok}
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  className="inline-flex shadow h-12 w-12 items-center justify-center rounded-lg bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 group">
                  <SiTiktok className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </Link>
              )}
              {/* {siteConfig.socialLinks?.telegram && (
                <Link
                  href={siteConfig.socialLinks.telegram}
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  className="inline-flex shadow h-12 w-12 items-center justify-center rounded-lg bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 group">
                  <SiTelegram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </Link>
              )} */}
              {siteConfig.socialLinks?.email && (
                <Link
                  href={`mailto:${siteConfig.socialLinks.email}`}
                  className="inline-flex shadow h-12 w-12 items-center justify-center rounded-lg bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 group">
                  <MailIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </Link>
              )}
            </div>
            {<Hours locale={locale}/}
            {/* Additional Info Card Bottom Left */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20 mt-8">
              <h4 className="font-semibold text-foreground mb-2">{t('readyToStart')}</h4>
              <p className="text-sm text-muted-foreground">{t('readyToStartDescription')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({
    locale,
  }));
}
