/**
 * Unit Tests for Responsive Configuration
 * 
 * Tests the responsive configuration utilities and helper functions.
 */

import {
  BREAKPOINTS,
  getDeviceCategory,
  isMobileViewport,
  isTabletViewport,
  isDesktopViewport,
  getOrientation,
  mergeResponsiveConfig,
  DEFAULT_RESPONSIVE_CONFIG,
} from './responsive';

describe('Responsive Configuration', () => {
  describe('BREAKPOINTS', () => {
    it('should have correct breakpoint values', () => {
      expect(BREAKPOINTS.mobile).toBe(768);
      expect(BREAKPOINTS.tablet).toBe(1024);
      expect(BREAKPOINTS.desktop).toBe(1280);
    });
  });

  describe('getDeviceCategory', () => {
    it('should return mobile for widths <= 768px', () => {
      expect(getDeviceCategory(320)).toBe('mobile');
      expect(getDeviceCategory(768)).toBe('mobile');
    });

    it('should return tablet for widths between 769px and 1024px', () => {
      expect(getDeviceCategory(769)).toBe('tablet');
      expect(getDeviceCategory(900)).toBe('tablet');
      expect(getDeviceCategory(1024)).toBe('tablet');
    });

    it('should return desktop for widths > 1024px', () => {
      expect(getDeviceCategory(1025)).toBe('desktop');
      expect(getDeviceCategory(1920)).toBe('desktop');
    });

    it('should work with custom breakpoints', () => {
      const customBreakpoints = { mobile: 640, tablet: 1024, desktop: 1280 };
      expect(getDeviceCategory(640, customBreakpoints)).toBe('mobile');
      expect(getDeviceCategory(641, customBreakpoints)).toBe('tablet');
    });
  });

  describe('isMobileViewport', () => {
    it('should return true for mobile widths', () => {
      expect(isMobileViewport(320)).toBe(true);
      expect(isMobileViewport(768)).toBe(true);
    });

    it('should return false for non-mobile widths', () => {
      expect(isMobileViewport(769)).toBe(false);
      expect(isMobileViewport(1920)).toBe(false);
    });
  });

  describe('isTabletViewport', () => {
    it('should return true for tablet widths', () => {
      expect(isTabletViewport(769)).toBe(true);
      expect(isTabletViewport(1024)).toBe(true);
    });

    it('should return false for non-tablet widths', () => {
      expect(isTabletViewport(768)).toBe(false);
      expect(isTabletViewport(1025)).toBe(false);
    });
  });

  describe('isDesktopViewport', () => {
    it('should return true for desktop widths', () => {
      expect(isDesktopViewport(1025)).toBe(true);
      expect(isDesktopViewport(1920)).toBe(true);
    });

    it('should return false for non-desktop widths', () => {
      expect(isDesktopViewport(1024)).toBe(false);
      expect(isDesktopViewport(768)).toBe(false);
    });
  });

  describe('getOrientation', () => {
    it('should return portrait when width < height', () => {
      expect(getOrientation(375, 667)).toBe('portrait');
      expect(getOrientation(768, 1024)).toBe('portrait');
    });

    it('should return landscape when width >= height', () => {
      expect(getOrientation(667, 375)).toBe('landscape');
      expect(getOrientation(1024, 768)).toBe('landscape');
      expect(getOrientation(1024, 1024)).toBe('landscape');
    });
  });

  describe('mergeResponsiveConfig', () => {
    it('should return default config when no custom config provided', () => {
      const config = mergeResponsiveConfig();
      expect(config).toEqual(DEFAULT_RESPONSIVE_CONFIG);
    });

    it('should merge custom breakpoints with defaults', () => {
      const customConfig = {
        breakpoints: { mobile: 640 },
      };
      const config = mergeResponsiveConfig(customConfig);
      
      expect(config.breakpoints.mobile).toBe(640);
      expect(config.breakpoints.tablet).toBe(BREAKPOINTS.tablet);
      expect(config.breakpoints.desktop).toBe(BREAKPOINTS.desktop);
    });

    it('should merge custom touch optimization with defaults', () => {
      const customConfig = {
        touchOptimization: { minTouchTarget: 48 },
      };
      const config = mergeResponsiveConfig(customConfig);
      
      expect(config.touchOptimization.minTouchTarget).toBe(48);
      expect(config.touchOptimization.hoverToTapDelay).toBe(0);
    });

    it('should merge custom performance config with defaults', () => {
      const customConfig = {
        performance: { lazyLoadImages: false },
      };
      const config = mergeResponsiveConfig(customConfig);
      
      expect(config.performance.lazyLoadImages).toBe(false);
      expect(config.performance.optimizeAnimations).toBe(true);
    });
  });
});
