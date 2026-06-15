# Responsive Context

React Context provider and hooks for accessing responsive viewport information throughout your application.

## Overview

The `ResponsiveContext` provides:
- **Automatic viewport detection**: Tracks window size and orientation changes
- **Device categorization**: Identifies mobile, tablet, or desktop viewports
- **React hooks**: Easy access to responsive state in any component
- **Performance optimized**: Debounced resize handling and memoized values
- **SSR-safe**: Works with Next.js server-side rendering

## Requirements

This implementation satisfies:
- **Requirement 1.4**: Responsive layout adapts to viewport breakpoints
- **Requirement 8.2**: Centralized responsive configuration
- **Requirement 8.3**: Well-documented TypeScript interfaces

## Installation

Wrap your application with the `ResponsiveProvider`:

```tsx
// app/layout.tsx
import { ResponsiveProvider } from '@/app/contexts';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ResponsiveProvider>
          {children}
        </ResponsiveProvider>
      </body>
    </html>
  );
}
```

## API Reference

### ResponsiveProvider

The main context provider component.

#### Props

```typescript
interface ResponsiveProviderProps {
  children: React.ReactNode;
  breakpoints?: Partial<BreakpointConfig>;
  enableTouchOptimization?: boolean;
  config?: Partial<ResponsiveConfig>;
}
```

#### Usage

```tsx
// Basic usage
<ResponsiveProvider>
  <App />
</ResponsiveProvider>

// With custom breakpoints
<ResponsiveProvider breakpoints={{ mobile: 640, tablet: 1024 }}>
  <App />
</ResponsiveProvider>

// With custom configuration
<ResponsiveProvider
  config={{
    touchOptimization: { minTouchTarget: 48 },
    performance: { lazyLoadImages: true },
  }}
>
  <App />
</ResponsiveProvider>
```

### useResponsiveContext

Main hook for accessing responsive context.

#### Returns

```typescript
interface ResponsiveContextType {
  isMobile: boolean;           // True if viewport ≤ 768px
  isTablet: boolean;           // True if viewport 769px-1024px
  isDesktop: boolean;          // True if viewport ≥ 1025px
  viewportWidth: number;       // Current viewport width in pixels
  viewportHeight: number;      // Current viewport height in pixels
  orientation: 'portrait' | 'landscape';
  viewport: ViewportInfo;      // Complete viewport information
  config: ResponsiveConfig;    // Responsive configuration
}
```

#### Usage

```tsx
import { useResponsiveContext } from '@/app/contexts';

function MyComponent() {
  const { isMobile, viewportWidth } = useResponsiveContext();
  
  return (
    <div>
      {isMobile ? 'Mobile View' : 'Desktop View'}
      <p>Width: {viewportWidth}px</p>
    </div>
  );
}
```

### useBreakpoint

Returns the current breakpoint name.

#### Returns

```typescript
'mobile' | 'tablet' | 'desktop'
```

#### Usage

```tsx
import { useBreakpoint } from '@/app/contexts';

function MyComponent() {
  const breakpoint = useBreakpoint();
  
  const styles = {
    mobile: { padding: '1rem' },
    tablet: { padding: '1.5rem' },
    desktop: { padding: '2rem' },
  };
  
  return <div style={styles[breakpoint]}>Content</div>;
}
```

### useMediaQuery

Subscribes to a custom media query.

#### Parameters

- `query: string` - CSS media query string

#### Returns

- `boolean` - True if media query matches

#### Usage

```tsx
import { useMediaQuery } from '@/app/contexts';

function MyComponent() {
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  return (
    <div>
      <p>Landscape: {isLandscape ? 'Yes' : 'No'}</p>
      <p>Reduced Motion: {prefersReducedMotion ? 'Yes' : 'No'}</p>
      <p>Dark Mode: {isDarkMode ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

### useOrientation

Returns the current device orientation.

#### Returns

```typescript
'portrait' | 'landscape'
```

#### Usage

```tsx
import { useOrientation } from '@/app/contexts';

function MyComponent() {
  const orientation = useOrientation();
  
  return (
    <div className={`orientation-${orientation}`}>
      Current orientation: {orientation}
    </div>
  );
}
```

## Usage Examples

### Example 1: Conditional Rendering

```tsx
function Navigation() {
  const { isMobile, isTablet, isDesktop } = useResponsiveContext();
  
  if (isMobile) return <MobileNav />;
  if (isTablet) return <TabletNav />;
  return <DesktopNav />;
}
```

### Example 2: Dynamic Styling

```tsx
function Gallery() {
  const { viewportWidth } = useResponsiveContext();
  
  const columns = viewportWidth < 640 ? 1 : viewportWidth < 1024 ? 2 : 3;
  
  return (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '1rem'
    }}>
      {/* Gallery items */}
    </div>
  );
}
```

### Example 3: Touch-Optimized Interactions

```tsx
function Button({ children, onClick }) {
  const { isMobile, config } = useResponsiveContext();
  const minSize = config.touchOptimization.minTouchTarget;
  
  return (
    <button
      onClick={onClick}
      style={{
        minWidth: isMobile ? `${minSize}px` : 'auto',
        minHeight: isMobile ? `${minSize}px` : 'auto',
        padding: isMobile ? '0.75rem' : '0.5rem 1rem',
      }}
    >
      {children}
    </button>
  );
}
```

### Example 4: Responsive Layout

```tsx
function PageLayout({ children }) {
  const { isMobile, orientation } = useResponsiveContext();
  
  return (
    <div
      style={{
        maxWidth: isMobile ? '100%' : '1200px',
        margin: '0 auto',
        padding: isMobile ? '1rem' : '2rem',
        minHeight: orientation === 'portrait' ? '100vh' : 'auto',
      }}
    >
      {children}
    </div>
  );
}
```

### Example 5: Performance Optimization

```tsx
function AnimatedComponent() {
  const { config } = useResponsiveContext();
  const shouldAnimate = !config.performance.reduceMotion;
  
  return (
    <div
      className={shouldAnimate ? 'animated' : 'static'}
      style={{
        transition: shouldAnimate ? 'all 0.3s ease' : 'none',
      }}
    >
      Content
    </div>
  );
}
```

### Example 6: Responsive Images

```tsx
function ResponsiveImage({ src, alt }) {
  const { isMobile, config } = useResponsiveContext();
  
  return (
    <img
      src={src}
      alt={alt}
      loading={config.performance.lazyLoadImages ? 'lazy' : 'eager'}
      style={{
        width: '100%',
        height: 'auto',
        objectFit: isMobile ? 'cover' : 'contain',
      }}
    />
  );
}
```

## Performance Considerations

### Debounced Resize Handling

The context automatically debounces resize events (150ms) to prevent excessive re-renders:

```typescript
// Resize events are debounced internally
window.addEventListener('resize', debouncedUpdateViewport);
```

### Memoized Values

All context values are memoized to prevent unnecessary re-renders:

```typescript
const contextValue = useMemo(() => ({
  isMobile,
  isTablet,
  isDesktop,
  // ... other values
}), [viewport, config]);
```

### Optimized Updates

The context only updates when values actually change:

```typescript
setViewport((prev) => {
  if (prev.width === width && prev.height === height) {
    return prev; // No update needed
  }
  return { width, height, orientation };
});
```

## SSR Considerations

The context is SSR-safe and provides default values during server-side rendering:

```typescript
// Server-side default: desktop viewport
const defaultViewport = { width: 1920, height: 1080 };
```

On the client, the context immediately updates to the actual viewport size after hydration.

## Error Handling

The `useResponsiveContext` hook throws an error if used outside a provider:

```typescript
if (context === undefined) {
  throw new Error(
    'useResponsiveContext must be used within a ResponsiveProvider'
  );
}
```

Always ensure your components are wrapped with `ResponsiveProvider`.

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 14+
- Chrome for Android (latest 2 versions)
- Samsung Internet (latest version)

## Testing

When testing components that use responsive context, wrap them with the provider:

```tsx
import { render } from '@testing-library/react';
import { ResponsiveProvider } from '@/app/contexts';

test('renders mobile view', () => {
  // Mock window.innerWidth
  global.innerWidth = 375;
  
  render(
    <ResponsiveProvider>
      <MyComponent />
    </ResponsiveProvider>
  );
  
  // Assertions...
});
```

## Related Documentation

- [Responsive Configuration](../config/README.md) - Configuration and utilities
- [Usage Examples](../components/examples/ResponsiveExample.tsx) - Complete examples
- [Design Document](../../.kiro/specs/mobile-responsive-portfolio-ui/design.md) - Full specification
