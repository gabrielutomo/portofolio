'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Lazy-load Dither (heavy - three.js) only when needed - Requirement 4.6 / 8.3
const Dither = dynamic(() => import('./Dither'), { ssr: false });

interface DitherBackgroundProps {
  /** Override intensity (0-1). Auto-detected if not provided. */
  intensity?: number;
  /** Disable completely (e.g. reduced-motion or very low-end device) */
  disabled?: boolean;
}

type PerformanceTier = 'high' | 'medium' | 'low';

function detectPerformanceTier(): PerformanceTier {
  if (typeof window === 'undefined') return 'low';

  // Check number of logical processors
  const cores = navigator.hardwareConcurrency ?? 2;
  // Check device memory (GB) - Chrome only
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const isMobile = window.innerWidth < 768;

  if (isMobile && (cores <= 4 || memory <= 2)) return 'low';
  if (cores <= 4 || memory <= 4) return 'medium';
  return 'high';
}

/**
 * DitherBackground - Task 2.4 / 6.3
 * Wraps React Bits Dither with:
 * - Auto performance detection → reduces intensity on mobile/low-end devices
 * - Respects prefers-reduced-motion
 * - CSS noise fallback for browsers without WebGL
 * Requirements: 2.2, 2.3, 2.4, 4.3
 */
const DitherBackground = ({ intensity, disabled = false }: DitherBackgroundProps) => {
  const [mounted, setMounted] = useState(false);
  const [tier, setTier] = useState<PerformanceTier>('low');
  const [reducedMotion, setReducedMotion] = useState(true);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setMounted(true);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotion);

    // Detect WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglSupported(!!gl);
    } catch {
      setWebglSupported(false);
    }

    setTier(detectPerformanceTier());

    return () => motionQuery.removeEventListener('change', handleMotion);
  }, []);

  // Per-tier dither settings - Requirement 2.4
  const getSettings = useCallback(() => {
    const base = intensity ?? 1;
    switch (tier) {
      case 'high':
        return {
          waveSpeed: 0.04 * base,
          waveFrequency: 3,
          waveAmplitude: 0.3 * base,
          colorNum: 4,
          pixelSize: 2,
          enableMouseInteraction: true,
          waveColor: [0.08, 0.08, 0.18] as [number, number, number],
        };
      case 'medium':
        return {
          waveSpeed: 0.02 * base,
          waveFrequency: 2.5,
          waveAmplitude: 0.2 * base,
          colorNum: 3,
          pixelSize: 3,
          enableMouseInteraction: false,
          waveColor: [0.06, 0.06, 0.14] as [number, number, number],
        };
      case 'low':
      default:
        return {
          waveSpeed: 0.01 * base,
          waveFrequency: 2,
          waveAmplitude: 0.15 * base,
          colorNum: 2,
          pixelSize: 4,
          enableMouseInteraction: false,
          waveColor: [0.05, 0.05, 0.12] as [number, number, number],
        };
    }
  }, [tier, intensity]);

  // CSS fallback dither pattern - Requirement 2.3
  const cssFallback = (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.2,
        pointerEvents: 'none',
      }}
    />
  );

  // Not mounted yet (SSR) → nothing
  if (!mounted) return null;

  // Disabled entirely
  if (disabled) return null;

  // Reduced motion or no WebGL → CSS fallback
  if (reducedMotion || !webglSupported) return cssFallback;

  const settings = getSettings();

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        opacity: tier === 'low' ? 0.4 : tier === 'medium' ? 0.55 : 0.7,
        pointerEvents: tier === 'high' ? 'auto' : 'none',
        transition: 'opacity 1s ease',
      }}
    >
      <Dither
        waveSpeed={settings.waveSpeed}
        waveFrequency={settings.waveFrequency}
        waveAmplitude={settings.waveAmplitude}
        waveColor={settings.waveColor}
        colorNum={settings.colorNum}
        pixelSize={settings.pixelSize}
        disableAnimation={reducedMotion}
        enableMouseInteraction={settings.enableMouseInteraction}
        mouseRadius={1}
      />
    </div>
  );
};

export default DitherBackground;
