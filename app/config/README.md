# Responsive Configuration

This module provides centralized responsive breakpoints, configuration, and utilities for the mobile-responsive portfolio UI.

## Overview

The responsive configuration system provides:
- **Breakpoint Constants**: Standardized viewport breakpoints (mobile, tablet, desktop)
- **TypeScript Interfaces**: Type-safe configuration and context types
- **Utility Functions**: Helper functions for device detection and viewport calculations
- **React Context**: Provider and hooks for accessing responsive state in components

## Requirements

This implementation satisfies the following requirements:
- **Requirement 1.4**: Layout adapts to three breakpoints (mobile 0-768px, tablet 769px-1024px, desktop 1025px+)
- **Requirement 8.2**: Breakpoint configuration is centralized in a single configuration file
- **Requirement 8.3**: Component interfaces are well-documented with TypeScript types

## Installation

The responsive configuration is already integrated into the project. To use it in your components:

```tsx
import { useResponsiveContext } from '@/app/contexts';
import { BREAKPOINTS, MEDIA_QUERIES } from '@/app/config';
```

## Breakpoints

### Standard Breakpoints

```typescript
BREAKPOINTS = {
  mobile: 768,    // 0-768px
  tablet: 1024,   // 769px-1024px
  desktop: 1280,  // 1025px+
}
```

### Media Queries

Pre-defined media query strings for CSS-in-JS:

```typescript
MEDIA_QUERIES = {
  mobile: '(max-width: 768px)',
  tablet: '(min-width: 769px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)',
  mobileAndTablet: '(max-width: 1024px)',
  tabletAndDesktop: '(min-width: 769px)',
}
```

## Configuration

### ResponsiveConfig Interface

```typescript
interface ResponsiveConfig {
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  touchOptimization: {
    minTouchTarget: number;      // Default: 44px (iOS guideline)
    hoverToTapDelay: number;      // Default: 0ms
    swipeThreshold: number;       // Default: 50px
  };
  performance: {
    lazyLoadImages: boolean;      // Default: true
    reduceMotion: boolean;        // Default: false (auto-detected)
    optimizeAnimations: boolean;  // Default: true
  };
}
```

### Default Configuration

```typescript
const DEFAULT_RESPONSIVE_CONFIG: ResponsiveConfig = {
  breakpoints: BREAKPOINTS,
  touchOptimization: {
    minTouchTarget: 44,
    hoverToTapDelay: 0,
    swipeThreshold: 50,
  },
  performance: {
    lazyLoadImages: true,
    reduceMotion: false,
    optimizeAnimations: true,
  },
};
```

## Utility Functions

### Device Detection

```typescript
// Get device category based on viewport width
getDeviceCategory(width: number): 'mobile' | 'tablet' | 'desktop'

// Check if viewport is mobile
isMobileViewport(width: number): boolean

// Check if viewport is tablet
isTabletViewport(width: number): boolean

// Check if viewport is desktop
isDesktopViewport(width: number): boolean
```

### Viewport Utilities

```typescript
// Get device orientation
getOrientation(width: number, height: number): 'portrait' | 'landscape'

// Check if user prefers reduced motion
prefersReducedMotion(): boolean

// Check if device is touch-capable
isTouchDevice(): boolean
```

### Configuration Utilities

```typescript
// Merge custom configuration with defaults
mergeResponsiveConfig(customConfig?: Partial<ResponsiveConfig>): ResponsiveConfig
```

## Usage Examples

### Example 1: Basic Device Detection

```typescript
import { getDeviceCategory, isMobileViewport } from '@/app/config';

const width = window.innerWidth;
const device = getDeviceCategory(width); // 'mobile' | 'tablet' | 'desktop'
const isMobile = isMobileViewport(width); // boolean
```

### Example 2: Custom Breakpoints

```typescript
import { getDeviceCategory } from '@/app/config';

const customBreakpoints = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
};

const device = getDeviceCategory(width, customBreakpoints);
```

### Example 3: Orientation Detection

```typescript
import { getOrientation } from '@/app/config';

const orientation = getOrientation(window.innerWidth, window.innerHeight);
// 'portrait' | 'landscape'
```

### Example 4: User Preferences

```typescript
import { prefersReducedMotion, isTouchDevice } from '@/app/config';

const shouldReduceMotion = prefersReducedMotion();
const hasTouch = isTouchDevice();

if (shouldReduceMotion) {
  // Disable or simplify animations
}

if (hasTouch) {
  // Enable touch-optimized interactions
}
```

### Example 5: Configuration Merging

```typescript
import { mergeResponsiveConfig } from '@/app/config';

const customConfig = mergeResponsiveConfig({
  breakpoints: { mobile: 640 },
  touchOptimization: { minTouchTarget: 48 },
});
```

## TypeScript Types

All configuration types are fully typed and exported:

```typescript
import type {
  BreakpointConfig,
  TouchOptimizationConfig,
  PerformanceConfig,
  ResponsiveConfig,
  ViewportInfo,
  ResponsiveContextType,
  ResponsiveProviderProps,
} from '@/app/config';
```

## Integration with React Context

This configuration is used by the `ResponsiveProvider` context. See the [ResponsiveContext documentation](../contexts/README.md) for usage with React components.

## Performance Considerations

- All utility functions are pure and have no side effects
- Configuration objects are frozen to prevent accidental mutations
- Viewport calculations are optimized for performance
- SSR-safe: All browser-dependent functions check for `window` availability

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 14+
- Chrome for Android (latest 2 versions)
- Samsung Internet (latest version)

## Testing

Unit tests are provided in `responsive.test.ts`. Run tests with:

```bash
npm test app/config/responsive.test.ts
```

## Related Documentation

- [ResponsiveContext](../contexts/README.md) - React context and hooks
- [Usage Examples](../components/examples/ResponsiveExample.tsx) - Component examples
- [Design Document](../../.kiro/specs/mobile-responsive-portfolio-ui/design.md) - Full design specification
