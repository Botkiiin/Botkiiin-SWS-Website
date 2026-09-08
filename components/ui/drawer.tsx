'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

interface DrawerCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DrawerContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);

export function Drawer({ open, onOpenChange, children }: DrawerProps) {
  // Блокування скролу коли drawer відкритий
  React.useEffect(() => {
    if (open) {
      // Зберігаємо поточну позицію скролу
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      // Застосовуємо стилі для блокування скролу
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = `-${scrollX}px`;
      document.body.style.width = '100vw';
      document.body.style.height = '100vh';

      // Додаткове забезпечення для mobile browsers
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100vh';

      // Форсуємо перерахунок viewport
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 10);
    } else {
      // Відновлюємо скрол
      const scrollY = document.body.style.top;
      const scrollX = document.body.style.left;

      // Очищаємо стилі
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.style.height = '';

      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';

      // Відновлюємо позицію скролу
      if (scrollY || scrollX) {
        window.scrollTo(
          scrollX ? parseInt(scrollX.replace('px', '')) * -1 : 0,
          scrollY ? parseInt(scrollY.replace('px', '')) * -1 : 0
        );
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    };
  }, [open]);

  // Закриття на ESC
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  const [isOverlayVisible, setIsOverlayVisible] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Керування видимістю overlay
  React.useEffect(() => {
    if (open) {
      setIsOverlayVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsOverlayVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const renderOverlay = () => {
    if (!isOverlayVisible || !mounted) return null;

    return createPortal(
      <div
        className={cn(
          'fixed inset-0 sm:bg-black/60 z-[60] sm:backdrop-blur-sm transition-all',
          open
            ? 'animate-in fade-in duration-400 ease-out opacity-100'
            : 'animate-out fade-out duration-300 ease-in opacity-0'
        )}
        onClick={() => onOpenChange(false)}
        style={{
          animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          minHeight: '100vh',
          zIndex: 60,
        }}
      />,
      document.body
    );
  };

  return (
    <DrawerContext.Provider value={{ open, onOpenChange }}>
      {children}
      {renderOverlay()}
    </DrawerContext.Provider>
  );
}

export function DrawerTrigger({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error('DrawerTrigger must be used within a Drawer');
  }

  return (
    <button {...props} onClick={() => context.onOpenChange(true)}>
      {children}
    </button>
  );
}

export function DrawerContent({ className, children, ...props }: DrawerContentProps) {
  const context = React.useContext(DrawerContext);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Ensure component is mounted client-side for portal
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!context) {
    throw new Error('DrawerContent must be used within a Drawer');
  }

  // Обробка анімації закриття
  React.useEffect(() => {
    if (!context.open && isClosing) {
      const timer = setTimeout(() => {
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [context.open, isClosing]);

  // Встановлення стану закриття
  React.useEffect(() => {
    if (!context.open) {
      setIsClosing(true);
    }
  }, [context.open]);

  // Фокус на drawer при відкритті та форсування повного розміру
  React.useEffect(() => {
    if (context.open && contentRef.current) {
      contentRef.current.focus();

      // Форсуємо правильні розміри для drawer
      const forceResize = () => {
        if (contentRef.current) {
          contentRef.current.style.height = '100vh';
          contentRef.current.style.minHeight = '100vh';
          contentRef.current.style.maxHeight = '100vh';
        }
      };

      // Застосовуємо відразу та з невеликою затримкою для впевненості
      forceResize();
      const timer = setTimeout(forceResize, 50);

      return () => clearTimeout(timer);
    }
  }, [context.open]);

  if (!context.open && !isClosing) return null;

  if (!mounted) return null;

  return createPortal(
    <div
      ref={contentRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      className={cn(
        'fixed right-0 top-0 bg-background text-foreground shadow-xl z-[100] flex flex-col',
        'w-full sm:w-80 sm:max-w-[90vw] sm:border-l border-border',
        'transform focus:outline-none transition-all',
        context.open
          ? 'animate-in slide-in-from-right duration-500 ease-out translate-x-0'
          : 'animate-out slide-out-to-right duration-300 ease-in translate-x-full',
        className
      )}
      style={{
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        animationFillMode: 'forwards',
        height: '100vh',
        minHeight: '100vh',
        maxHeight: '100vh',
        top: 0,
        bottom: 0,
        ...props.style,
      }}
      {...props}>
      {children}
    </div>,
    document.body
  );
}

export function DrawerHeader({ className, children, ...props }: DrawerHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 border-b border-border bg-background/95',
        className
      )}
      {...props}>
      {children}
    </div>
  );
}

export function DrawerTitle({ className, children, ...props }: DrawerTitleProps) {
  return (
    <h2 className={cn('text-lg font-semibold text-foreground', className)} {...props}>
      {children}
    </h2>
  );
}

export function DrawerClose({ className, ...props }: DrawerCloseProps) {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error('DrawerClose must be used within a Drawer');
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors',
        className
      )}
      onClick={() => context.onOpenChange(false)}
      {...props}>
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  );
}
