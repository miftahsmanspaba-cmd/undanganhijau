import React, { useEffect, useRef, useState } from 'react';

export type RevealVariant =
  | 'fade-up'
  | 'fade-down'
  | 'zoom-soft'
  | 'slide-left'
  | 'slide-right';

interface RevealTextProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  repeat?: boolean;
  className?: string;
}

/**
 * Lightweight GPU-only scroll reveal for typography, quotes, and cards.
 * Triggers whenever an element scrolls into view (both down and back up when repeat=true),
 * and also refreshes hero entrances when the cover curtain is opened.
 */
export const RevealText: React.FC<RevealTextProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  repeat = true,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (!repeat) {
              observer.unobserve(entry.target);
            }
          } else if (repeat) {
            const rect = entry.boundingClientRect;
            const vh = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top >= vh - 8 || rect.bottom <= 8) {
              setVisible(false);
            }
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -18px 0px' }
    );

    observer.observe(el);

    const handleOpened = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh && rect.bottom > 0) {
        setVisible(false);
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setVisible(true));
        });
      }
    };

    window.addEventListener('botanica-opened', handleOpened);

    return () => {
      observer.disconnect();
      window.removeEventListener('botanica-opened', handleOpened);
    };
  }, [repeat]);

  return (
    <div
      ref={ref}
      style={delay > 0 ? { transitionDelay: `${visible ? delay : 0}ms` } : undefined}
      className={`reveal-item reveal-item--${variant} ${visible ? 'reveal-item--visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export const RevealBlock: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <RevealText variant="fade-up" repeat className={className}>
      {children}
    </RevealText>
  );
};
