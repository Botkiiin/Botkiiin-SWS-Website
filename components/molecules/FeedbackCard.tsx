'use client';
import { useTranslations } from 'next-intl';
import { Link as I18nLink } from '@/i18n/routing';
import { useRouter } from 'next/navigation';
import InteractiveStars from '@/components/ui/interactive-stars';

interface FeedbackCardProps {
  titleKey?: string;
  authorKey?: string;
  textKey?: string;
  serviceKey?: string;
  rating?: number;
  isPlaceholder?: boolean;
}

export default function FeedbackCard({
  titleKey = 'feedbackTitle',
  authorKey = 'feedbackAuthor',
  textKey = 'feedbackText',
  serviceKey = 'feedbackService',
  rating = 5,
  isPlaceholder = false,
}: FeedbackCardProps) {
  const t = useTranslations('Home');
  const router = useRouter();

  const handleStarClick = () => {
    router.push('/feedback');
  };

  return (
    <div className="gap-1 p-1">
      <h4 className="text-2xl font-light uppercase">{t(titleKey)}</h4>
      <p className="text-gray-400 text-sm">{t(authorKey)}</p>
      <hr className="border-primary my-3" />
      <p className="italic font-medium">{t(textKey)}</p>
      <div className="relative flex flex-col gap-2 mt-3">
        {isPlaceholder ? (
          <>
            <I18nLink
              href={'/feedback'}
              className="uppercase font-light hover:text-primary transition-colors duration-200">
              {t(serviceKey)}
            </I18nLink>
            <InteractiveStars rating={0} onStarClick={handleStarClick} size="md" />
          </>
        ) : (
          <>
            <div className="uppercase font-light">{t(serviceKey)}</div>
            <InteractiveStars rating={rating} readonly={true} size="md" />
          </>
        )}
      </div>
    </div>
  );
}
