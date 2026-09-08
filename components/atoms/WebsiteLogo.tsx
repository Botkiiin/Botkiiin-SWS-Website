'use client';

import { getDomain } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState, useCallback, useMemo } from 'react';

interface IProps {
  url: string;
  size?: number;
  className?: string;
  timeout?: number;
}

const WebsiteLogo = ({
  url,
  size = 32,
  className = '',
  timeout = 1000, // 1 second
}: IProps) => {
  const domain = getDomain(url);
  
  const fallbackSources = useMemo(() => [
    `https://${domain}/logo.svg`,
    `https://${domain}/logo.icon`,
    `https://${domain}/logo.svg`,
    `https://${domain}/logo.svg`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    `https://${domain}/logo.ico`,
  ], [domain]);

  const [imgSrc, setImgSrc] = useState(fallbackSources[0]);
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    const nextIndex = fallbackIndex + 1;
    if (nextIndex < fallbackSources.length) {
      setFallbackIndex(nextIndex);
      setImgSrc(fallbackSources[nextIndex]);
      setIsLoading(true);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  }, [fallbackIndex, fallbackSources]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const timeoutId = setTimeout(() => {
      handleError();
    }, timeout);

    return () => clearTimeout(timeoutId);

  }, [isLoading, handleError, timeout]);

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      {/* placeholder */}
      {isLoading && (<div className="absolute inset-0 animate-pulse"> <div className="w-full h-full rounded-md bg-gray-200/60" /> </div>
      )}

      ```
      {!hasError && (
        <Image
          src={imgSrc}
          alt={`${domain} logo`}
          width={size}
          height={size}
          onError={handleError}
          onLoadingComplete={handleLoad}
          className={`inline-block transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          style={{ objectFit: 'contain' }}
        />
      )}

      {/* Fallback: Display first letter of domain when all image sources fail */}
      {hasError && (
        <div
          className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md"
          style={{ fontSize: `${size * 0.5}px` }}
        >
          {domain.charAt(0).toUpperCase()}
        </div>
      )}
    </div>

  );
};

export default WebsiteLogo;
