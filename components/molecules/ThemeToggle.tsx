'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// 1. Імпортуємо useState та useEffect
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  isScrolled?: boolean;
  isHomePage?: boolean;
}

export function ThemeToggle({ isScrolled = true, isHomePage = false }: ThemeToggleProps) {
  // 2. Створюємо стан 'mounted'
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // 3. Використовуємо useEffect, щоб встановити mounted у true лише на клієнті
  useEffect(() => {
    setMounted(true);
  }, []);

  // Якщо компонент ще не змонтовано на клієнті (ми на сервері або гідратація ще не відбулася)
  // повертаємо тимчасову заглушку (наприклад, іконку Сонця без умовних класів)
  if (!mounted) {
    return (
      <Button
        className={cn(
          'border shadow rounded-full cursor-pointer transition-colors duration-300',
          !isScrolled && isHomePage ? 'border-white' : 'border-foreground'
        )}
        variant="ghost"
        size="icon"
        aria-label="Loading theme selector">
        {/* Можна залишити будь-яку іконку або спінер як placeholder */}
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  // 4. Тільки після mounted ми безпечно визначаємо, яку іконку показувати
  const IconToDisplay = theme === 'dark' ? Moon : Sun;

  const iconClasses = 'h-[1.2rem] w-[1.2rem] transition-transform duration-300';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            'border shadow rounded-full cursor-pointer transition-colors duration-300',
            !isScrolled && isHomePage ? 'border-white' : 'border-foreground'
          )}
          variant="ghost"
          size="icon"
          aria-label={`Toggle theme: current is ${theme}`}>
          <IconToDisplay className={iconClasses} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
