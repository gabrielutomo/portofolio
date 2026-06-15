'use client';

/**
 * Responsive Context Provider
 * 
 * Provides responsive viewport information and device detection
 * to all child components through React Context.
 * 
 * Requirements: 1.4, 8.2, 8.3
 */

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
  ResponsiveContextType,
  ResponsiveProviderProps,
  ResponsiveConfig,
  ViewportInfo,
  BREAKPOINTS,
  getDeviceCategory,
  isMobileViewport,
  isTabletViewport,
  isDesktopViewport,
  getOrientation,
  mergeResponsiveConfig,
  prefersReducedMotion,
} from '../config/responsive';

// ============================================================================
// Context Creation
// ============================================================================

/**
 * Responsive Context
 * Provides viewport state and responsive configuration to child components
 */
const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined);

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Gets current viewport dimensions
 * Safe for SSR - returns default values on server
 */
function getViewportDimensions(): { width: number; height: number } {
  if (typeof window === 'undefined') {
    // SSR default: assume desktop viewport
    return { width: 1920, height: 1080 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Debounces a function call
 * Used to optimize resize event handling
 */
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// ============================================================================
// Responsive Provider Component
// ============================================================================

/**
 * ResponsiveProvider Component
 * 
 * Wraps the application and provides responsive context to all child components.
 * Automatically detects viewport changes and updates context accordingly.
 * 
 * @example
 * ```tsx
 * <ResponsiveProvider>
 *   <App />
 * </ResponsiveProvider>
 * ```
 * 
 * @example With custom breakpoints
 * ```tsx
 * <ResponsiveProvider breakpoints={{ mobile: 640, tablet: 1024 }}>
 *   <App />
 * </ResponsiveProvider>
 * ```
 */
export function ResponsiveProvider({
  children,
  breakpoints,
  enableTouchOptimization = true,
  config: customConfig,
}: ResponsiveProviderProps) {
  // Merge custom configuration with defaults
  const config = useMemo<ResponsiveConfig>(() => {
    const mergedConfig = mergeResponsiveConfig(customConfig);
    
    // Override breakpoints if provided
    if (breakpoints) {
      mergedConfig.breakpoints = {
        ...mergedConfig.breakpoints,
        ...breakpoints,
      };
    }

    // Update performance config based on user preferences
    if (typeof window !== 'undefined') {
      mergedConfig.performance.reduceMotion = prefersReducedMotion();
    }

    return mergedConfig;
  }, [breakpoints, customConfig]);

  // Viewport state
  const [viewport, setViewport] = useState<ViewportInfo>(() => {
    const { width, height } = getViewportDimensions();
    return {
      width,
      height,
      orientation: getOrientation(width, height),
    };
  });

  // Update viewport dimensions
  const updateViewport = useCallback(() => {
    const { width, height } = getViewportDimensions();
    const orientation = getOrientation(width, height);

    setViewport((prev) => {
      // Only update if values actually changed
      if (
        prev.width === width &&
        prev.height === height &&
        prev.orientation === orientation
      ) {
        return prev;
      }

      return { width, height, orientation };
    });
  }, []);

  // Debounced resize handler
  const debouncedUpdateViewport = useMemo(
    () => debounce(updateViewport, 150),
    [updateViewport]
  );

  // Set up resize and orientation change listeners
  useEffect(() => {
    // Initial update on mount (client-side only)
    updateViewport();

    // Add event listeners
    window.addEventListener('resize', debouncedUpdateViewport);
    window.addEventListener('orientationchange', updateViewport);

    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedUpdateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, [updateViewport, debouncedUpdateViewport]);

  // Compute responsive values based on viewport
  const contextValue = useMemo<ResponsiveContextType>(() => {
    const { width, height, orientation } = viewport;
    const { breakpoints: bp } = config;

    return {
      isMobile: isMobileViewport(width, bp),
      isTablet: isTabletViewport(width, bp),
      isDesktop: isDesktopViewport(width, bp),
      viewportWidth: width,
      viewportHeight: height,
      orientation,
      viewport,
      config,
    };
  }, [viewport, config]);

  return (
    <ResponsiveContext.Provider value={contextValue}>
      {children}
    </ResponsiveContext.Provider>
  );
}

// ============================================================================
// Custom Hook
// ============================================================================

/**
 * useResponsiveContext Hook
 * 
 * Provides access to responsive context values.
 * Must be used within a ResponsiveProvider.
 * 
 * @returns ResponsiveContextType with viewport information and device detection
 * @throws Error if used outside ResponsiveProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isMobile, viewportWidth } = useResponsiveContext();
 *   
 *   return (
 *     <div>
 *       {isMobile ? 'Mobile View' : 'Desktop View'}
 *       <p>Width: {viewportWidth}px</p>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @example Conditional rendering based on device
 * ```tsx
 * function Navigation() {
 *   const { isMobile, isTablet, isDesktop } = useResponsiveContext();
 *   
 *   if (isMobile) return <MobileNav />;
 *   if (isTablet) return <TabletNav />;
 *   return <DesktopNav />;
 * }
 * ```
 * 
 * @example Using viewport dimensions
 * ```tsx
 * function DynamicComponent() {
 *   const { viewportWidth, viewportHeight, orientation } = useResponsiveContext();
 *   
 *   const columns = viewportWidth < 640 ? 1 : viewportWidth < 1024 ? 2 : 3;
 *   
 *   return (
 *     <div style={{ 
 *       columns,
 *       height: orientation === 'portrait' ? '100vh' : 'auto'
 *     }}>
 *       Content here
 *     </div>
 *   );
 * }
 * ```
 */
export function useResponsiveContext(): ResponsiveContextType {
  const context = useContext(ResponsiveContext);

  if (context === undefined) {
    throw new Error(
      'useResponsiveContext must be used within a ResponsiveProvider. ' +
      'Wrap your component tree with <ResponsiveProvider> to use this hook.'
    );
  }

  return context;
}

// ============================================================================
// Utility Hooks
// ============================================================================

/**
 * useMediaQuery Hook
 * 
 * Subscribes to a media query and returns whether it matches.
 * Useful for custom responsive logic beyond standard breakpoints.
 * 
 * @param query - CSS media query string
 * @returns True if media query matches
 * 
 * @example
 * ```tsx
 * function Component() {
 *   const isLandscape = useMediaQuery('(orientation: landscape)');
 *   const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 *   
 *   return <div>{isLandscape ? 'Landscape' : 'Portrait'}</div>;
 * }
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Add listener
    mediaQuery.addEventListener('change', handler);

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/**
 * useBreakpoint Hook
 * 
 * Returns the current breakpoint name based on viewport width.
 * 
 * @returns Current breakpoint: 'mobile', 'tablet', or 'desktop'
 * 
 * @example
 * ```tsx
 * function Component() {
 *   const breakpoint = useBreakpoint();
 *   
 *   return <div>Current breakpoint: {breakpoint}</div>;
 * }
 * ```
 */
export function useBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
  const { viewportWidth, config } = useResponsiveContext();
  return useMemo(
    () => getDeviceCategory(viewportWidth, config.breakpoints),
    [viewportWidth, config.breakpoints]
  );
}

/**
 * useOrientation Hook
 * 
 * Returns the current device orientation.
 * 
 * @returns Current orientation: 'portrait' or 'landscape'
 * 
 * @example
 * ```tsx
 * function Component() {
 *   const orientation = useOrientation();
 *   
 *   return <div>Orientation: {orientation}</div>;
 * }
 * ```
 */
export function useOrientation(): 'portrait' | 'landscape' {
  const { orientation } = useResponsiveContext();
  return orientation;
}

// ============================================================================
// Exports
// ============================================================================

export default ResponsiveContext;
