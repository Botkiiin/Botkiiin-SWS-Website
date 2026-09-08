// Централізований конфіг для контактних даних та соціальних мереж

export const contactsConfig = {
  // Основні контактні дані
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || '+31 6 87402492',
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'swsklussenbedrijf@gmail.com',
  address:
    process.env.NEXT_PUBLIC_COMPANY_ADDRESS ||
    'Entrada 700, 1114 AA Amsterdam-Duivendrecht, Netherlands',

  // Соціальні мережі
  socialMedia: {
    // telegramManager: process.env.NEXT_PUBLIC_TELEGRAM_URL || '#',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/sws_nl/',
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://www.tiktok.com/@sws_nl',
    email: process.env.NEXT_PUBLIC_EMAIL_URL || 'swsklussenbedrijf@gmail.com',
  },

  // URL сайту
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://slimwerk.services/',
};

// Утилітарні функції
export const getPhoneLink = () => `tel:${contactsConfig.phone.replace(/\s/g, '')}`;
export const getEmailLink = () => `mailto:${contactsConfig.email}`;
export const getWhatsAppLink = (message?: string) => {
  const phone = contactsConfig.phone.replace(/[\s\+\(\)]/g, '');
  const text = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${phone}${text ? `?text=${text}` : ''}`;
};
