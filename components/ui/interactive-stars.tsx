'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

interface InteractiveStarsProps {
  rating?: number;
  onStarClick?: (rating: number) => void;
  onStarHover?: (rating: number) => void;
  onStarLeave?: () => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function InteractiveStars({
  rating = 0,
  onStarClick,
  onStarHover,
  onStarLeave,
  readonly = false,
  size = 'md',
  className = '',
}: InteractiveStarsProps) {
  const [hoveredStar, setHoveredStar] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const handleStarClick = (starRating: number) => {
    if (!readonly && onStarClick) {
      onStarClick(starRating);
    }
  };

  const handleStarHover = (starRating: number) => {
    if (!readonly) {
      setHoveredStar(starRating);
      if (onStarHover) {
        onStarHover(starRating);
      }
    }
  };

  const handleStarLeave = () => {
    if (!readonly) {
      setHoveredStar(0);
      if (onStarLeave) {
        onStarLeave();
      }
    }
  };

  const displayRating = readonly ? rating : (hoveredStar || rating);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
          onMouseLeave={handleStarLeave}
          disabled={readonly}
          className={`
            focus:outline-none transition-all duration-300 ease-in-out
            ${readonly ? 'cursor-default' : 'cursor-pointer transform hover:scale-110'}
          `}>
          <Star
            className={`
              ${sizeClasses[size]} 
              transition-all duration-300 ease-in-out
              ${
                star <= displayRating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }
              ${!readonly && star <= hoveredStar ? 'scale-110' : ''}
              ${!readonly && !hoveredStar ? 'hover:text-gray-400' : ''}
            `}
          />
        </button>
      ))}
    </div>
  );
}