'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { ResponsiveProvider } from '@/app/contexts';

interface ResponsiveLayoutWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * ResponsiveLayoutWrapper - Task 2.1
 * Wraps the layout with responsive context and handles:
 * - Viewport size detection via ResizeObserver
 * - Orientation change detection
 * - SSR-safe rendering
 * Requirements: 1.1, 1.2, 1.3, 1.5
 */
const ResponsiveLayoutWrapper = ({ children, className = '' }: ResponsiveLayoutWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // ResizeObserver for accurate viewport size tracking
    const resizeObserver = new ResizeObserver(() => {
      // Add mobile class based on viewport width for CSS targeting
      const width = window.innerWidth;
      document.documentElement.setAttribute(
        'data-viewport',
        width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'
      );
    });

    resizeObserver.observe(document.documentElement);

    // Initial viewport setup
    const initialWidth = window.innerWidth;
    document.documentElement.setAttribute(
      'data-viewport',
      initialWidth < 768 ? 'mobile' : initialWidth < 1024 ? 'tablet' : 'desktop'
    );

    // Orientation change handling
    const handleOrientationChange = () => {
      document.documentElement.setAttribute(
        'data-orientation',
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      );
    };

    handleOrientationChange();
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return (
    <ResponsiveProvider>
      <div ref={wrapperRef} className={`responsive-layout-wrapper ${className}`}>
        {children}
      </div>
    </ResponsiveProvider>
  );
};

export default ResponsiveLayoutWrapper;
