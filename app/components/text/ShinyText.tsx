'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
    color?: string;
    shineColor?: string;
    spread?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({
    text,
    disabled = false,
    speed = 3,
    className = '',
    color = 'rgba(248,250,252,0.8)',
    shineColor = '#ffffff',
    spread = 120,
}) => {
    const progress = useMotionValue(0);
    const elapsedRef = useRef(0);
    const lastTimeRef = useRef<number | null>(null);

    useAnimationFrame(time => {
        if (disabled) return;
        if (lastTimeRef.current === null) {
            lastTimeRef.current = time;
            return;
        }
        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;
        elapsedRef.current += deltaTime;
        const animationDuration = speed * 1000;
        const cycleDuration = animationDuration + 500;
        const cycleTime = elapsedRef.current % cycleDuration;
        if (cycleTime < animationDuration) {
            progress.set((cycleTime / animationDuration) * 100);
        } else {
            progress.set(100);
        }
    });

    const backgroundPosition = useTransform(progress, p => `${150 - p * 2}% center`);

    const gradientStyle = {
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text' as const,
        backgroundClip: 'text' as const,
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
    };

    return (
        <motion.span
            className={className}
            style={{ ...gradientStyle, backgroundPosition }}
        >
            {text}
        </motion.span>
    );
};

export default ShinyText;
