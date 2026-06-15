/**
 * Responsive Configuration
 * 
 * This module provides centralized responsive breakpoints, configuration,
 * and TypeScript interfaces for the mobile-responsive portfolio UI.
 * 
 * Requirements: 1.4, 8.2, 8.3
 */

// ============================================================================
// Breakpoint Constants
// ============================================================================

/**
 * Responsive breakpoint values in pixels
 * Based on Requirement 1.4: mobile (0-768px), tablet (769px-1024px), desktop (1025px+)
 */
export const BREAKPOINTS = {
  /** Mobile viewport: 0-768px */
  mobile: 768,
  /** Tablet viewport: 769px-1024px */
  tablet: 1024,
  /** Desktop viewport: 1025px+ */
  desktop: 1280,
} as const;

/**
 * Media query strings for use in CSS-in-JS or styled components
 */
export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.mobile}px)`,
  tablet: `(min-width: ${BREAKPOINTS.mobile + 1}px) and (max-width: ${BREAKPOINTS.tablet}px)`,
  desktop: `(min-width: ${BREAKPOINTS.tablet + 1}px)`,
  mobileAndTablet: `(max-width: ${BREAKPOINTS.tablet}px)`,
  tabletAndDesktop: `(min-width: ${BREAKPOINTS.mobile + 1}px)`,
} as const;

// ============================================================================
// TypeScript Interfaces
// ============================================================================

/**
 * Breakpoint configuration interface
 */
export interface BreakpointConfig {
  /** Mobile breakpoint in pixels (default: 768) */
  mobile: number;
  /** Tablet breakpoint in pixels (default: 1024) */
  tablet: number;
  /** Desktop breakpoint in pixels (default: 1280) */
  desktop: number;
}

/**
 * Touch optimization configuration
 * Based on Requirement 5: Touch Interaction Enhancement
 */
export interface TouchOptimizationConfig {
  /** Minimum touch target size in pixels (iOS guideline: 44px) */
  minTouchTarget: number;
  /** Delay before tap action in milliseconds */
  hoverToTapDelay: number;
  /** Distance threshold for swipe detection in pixels */
  swipeThreshold: number;
}

/**
 * Performance optimization configuration
 * Based on Requirement 4: Performance Optimization
 */
export interface PerformanceConfig {
  /** Enable lazy loading for images */
  lazyLoadImages: boolean;
  /** Respect prefers-reduced-motion media query */
  reduceMotion: boolean;
  /** Optimize/simplify animations on mobile */
  optimizeAnimations: boolean;
}

/**
 * Complete responsive configuration
 * Based on Requirement 8.2: Centralized configuration
 */
export interface ResponsiveConfig {
  /** Breakpoint configuration */
  breakpoints: BreakpointConfig;
  /** Touch optimization settings */
  touchOptimization: TouchOptimizationConfig;
  /** Performance optimization settings */
  performance: PerformanceConfig;
}

/**
 * Viewport information
 */
export interface ViewportInfo {
  /** Current viewport width in pixels */
  width: number;
  /** Current viewport height in pixels */
  height: number;
  /** Current device orientation */
  orientation: 'portrait' | 'landscape';
}

/**
 * Responsive context type
 * Provides viewport state and device category information
 */
export interface ResponsiveContextType {
  /** True if viewport is mobile size (≤768px) */
  isMobile: boolean;
  /** True if viewport is tablet size (769px-1024px) */
  isTablet: boolean;
  /** True if viewport is desktop size (≥1025px) */
  isDesktop: boolean;
  /** Current viewport width in pixels */
  viewportWidth: number;
  /** Current viewport height in pixels */
  viewportHeight: number;
  /** Current device orientation */
  orientation: 'portrait' | 'landscape';
  /** Complete viewport information */
  viewport: ViewportInfo;
  /** Responsive configuration */
  config: ResponsiveConfig;
}

/**
 * Props for ResponsiveProvider component
 */
export interface ResponsiveProviderProps {
  /** Child components */
  children: React.ReactNode;
  /** Optional custom breakpoint configuration */
  breakpoints?: Partial<BreakpointConfig>;
  /** Enable touch optimization (default: true on mobile) */
  enableTouchOptimization?: boolean;
  /** Custom responsive configuration */
  config?: Partial<ResponsiveConfig>;
}

// ============================================================================
// Default Configuration
// ============================================================================

/**
 * Default touch optimization configuration
 * Based on iOS Human Interface Guidelines and Requirement 5
 */
export const DEFAULT_TOUCH_CONFIG: TouchOptimizationConfig = {
  minTouchTarget: 44, // iOS guideline minimum
  hoverToTapDelay: 0, // No artificial delay
  swipeThreshold: 50, // 50px minimum swipe distance
};

/**
 * Default performance configuration
 * Based on Requirement 4: Performance Optimization
 */
export const DEFAULT_PERFORMANCE_CONFIG: PerformanceConfig = {
  lazyLoadImages: true,
  reduceMotion: false, // Will be detected from user preference
  optimizeAnimations: true,
};

/**
 * Default responsive configuration
 * Combines all default settings
 */
export const DEFAULT_RESPONSIVE_CONFIG: ResponsiveConfig = {
  breakpoints: BREAKPOINTS,
  touchOptimization: DEFAULT_TOUCH_CONFIG,
  performance: DEFAULT_PERFORMANCE_CONFIG,
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Determines device category based on viewport width
 * 
 * @param width - Current viewport width in pixels
 * @param breakpoints - Breakpoint configuration
 * @returns Device category: 'mobile', 'tablet', or 'desktop'
 */
export function getDeviceCategory(
  width: number,
  breakpoints: BreakpointConfig = BREAKPOINTS
): 'mobile' | 'tablet' | 'desktop' {
  if (width <= breakpoints.mobile) {
    return 'mobile';
  } else if (width <= breakpoints.tablet) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

/**
 * Checks if viewport is in mobile range
 * 
 * @param width - Current viewport width in pixels
 * @param breakpoints - Breakpoint configuration
 * @returns True if mobile viewport
 */
export function isMobileViewport(
  width: number,
  breakpoints: BreakpointConfig = BREAKPOINTS
): boolean {
  return width <= breakpoints.mobile;
}

/**
 * Checks if viewport is in tablet range
 * 
 * @param width - Current viewport width in pixels
 * @param breakpoints - Breakpoint configuration
 * @returns True if tablet viewport
 */
export function isTabletViewport(
  width: number,
  breakpoints: BreakpointConfig = BREAKPOINTS
): boolean {
  return width > breakpoints.mobile && width <= breakpoints.tablet;
}

/**
 * Checks if viewport is in desktop range
 * 
 * @param width - Current viewport width in pixels
 * @param breakpoints - Breakpoint configuration
 * @returns True if desktop viewport
 */
export function isDesktopViewport(
  width: number,
  breakpoints: BreakpointConfig = BREAKPOINTS
): boolean {
  return width > breakpoints.tablet;
}

/**
 * Detects device orientation based on viewport dimensions
 * 
 * @param width - Current viewport width in pixels
 * @param height - Current viewport height in pixels
 * @returns Device orientation: 'portrait' or 'landscape'
 */
export function getOrientation(width: number, height: number): 'portrait' | 'landscape' {
  return width < height ? 'portrait' : 'landscape';
}

/**
 * Merges custom configuration with defaults
 * 
 * @param customConfig - Partial custom configuration
 * @returns Complete responsive configuration
 */
export function mergeResponsiveConfig(
  customConfig?: Partial<ResponsiveConfig>
): ResponsiveConfig {
  if (!customConfig) {
    return DEFAULT_RESPONSIVE_CONFIG;
  }

  return {
    breakpoints: {
      ...DEFAULT_RESPONSIVE_CONFIG.breakpoints,
      ...customConfig.breakpoints,
    },
    touchOptimization: {
      ...DEFAULT_RESPONSIVE_CONFIG.touchOptimization,
      ...customConfig.touchOptimization,
    },
    performance: {
      ...DEFAULT_RESPONSIVE_CONFIG.performance,
      ...customConfig.performance,
    },
  };
}

/**
 * Checks if user prefers reduced motion
 * Based on prefers-reduced-motion media query
 * 
 * @returns True if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}

/**
 * Detects if device is touch-capable
 * 
 * @returns True if device supports touch
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - Legacy IE support
    navigator.msMaxTouchPoints > 0
  );
}
