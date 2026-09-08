import { cn } from '@/lib/utils';
import Link from 'next/link';

interface GradientLinkProps {
  text: string;
  className?: string;
  gradSpanClass?: string;
  href?: string;
}

export default function GradientLink({
  text,
  className = '',
  gradSpanClass = '',
  href = 'https://instagram.com/',
}: GradientLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      title="Our projects"
      prefetch={false}
      className={cn('flex items-center gap-2 group', className)}>
      <span
        className={cn(
          'border-b-2 border-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-orange-400 bg-clip-text text-transparent pb-1 px-3 flex items-center gap-2 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-300 after:via-pink-400 after:to-orange-400',
          gradSpanClass
        )}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              {/* purple-400 */}
              <stop offset="0%" stopColor="#C084FC" />
              {/* pink-400 */}
              <stop offset="50%" stopColor="#F472B6" />
              {/* orange-400 */}
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>
          </defs>
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="5"
            ry="5"
            stroke="url(#instagram-gradient)"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            stroke="url(#instagram-gradient)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="18" cy="6" r="1.5" fill="url(#instagram-gradient)" />
        </svg>
        {text}
      </span>
    </Link>
  );
}
