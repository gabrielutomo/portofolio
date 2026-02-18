'use client';

import { forwardRef, useMemo, useRef, useEffect, useCallback } from 'react';

interface VariableProximityProps {
    label: string;
    fromFontVariationSettings: string;
    toFontVariationSettings: string;
    containerRef?: React.RefObject<HTMLElement | null>;
    radius?: number;
    falloff?: 'linear' | 'exponential' | 'gaussian';
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
    const {
        label,
        fromFontVariationSettings,
        toFontVariationSettings,
        containerRef,
        radius = 80,
        falloff = 'linear',
        className = '',
        style,
        onClick,
    } = props;

    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const lastPositionRef = useRef({ x: -1, y: -1 });
    const frameRef = useRef<number>(0);

    useEffect(() => {
        const updatePosition = (x: number, y: number) => {
            if (containerRef?.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mousePositionRef.current = { x: x - rect.left, y: y - rect.top };
            } else {
                mousePositionRef.current = { x, y };
            }
        };
        const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [containerRef]);

    const parsedSettings = useMemo(() => {
        const parse = (s: string) =>
            new Map(s.split(',').map(p => {
                const [name, value] = p.trim().split(' ');
                return [name.replace(/['"]/g, ''), parseFloat(value)] as [string, number];
            }));
        const from = parse(fromFontVariationSettings);
        const to = parse(toFontVariationSettings);
        return Array.from(from.entries()).map(([axis, fromValue]) => ({
            axis, fromValue, toValue: to.get(axis) ?? fromValue,
        }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    const calcFalloff = useCallback((distance: number) => {
        const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
        switch (falloff) {
            case 'exponential': return norm ** 2;
            case 'gaussian': return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
            default: return norm;
        }
    }, [radius, falloff]);

    useEffect(() => {
        const loop = () => {
            const { x, y } = mousePositionRef.current;
            if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
                frameRef.current = requestAnimationFrame(loop);
                return;
            }
            lastPositionRef.current = { x, y };

            letterRefs.current.forEach(letterRef => {
                if (!letterRef) return;
                const rect = letterRef.getBoundingClientRect();
                const containerRect = containerRef?.current?.getBoundingClientRect();
                const lx = rect.left + rect.width / 2 - (containerRect?.left ?? 0);
                const ly = rect.top + rect.height / 2 - (containerRect?.top ?? 0);
                const dist = Math.sqrt((x - lx) ** 2 + (y - ly) ** 2);

                if (dist >= radius) {
                    letterRef.style.fontVariationSettings = fromFontVariationSettings;
                    return;
                }
                const fv = calcFalloff(dist);
                const settings = parsedSettings
                    .map(({ axis, fromValue, toValue }) => `'${axis}' ${fromValue + (toValue - fromValue) * fv}`)
                    .join(', ');
                letterRef.style.fontVariationSettings = settings;
            });

            frameRef.current = requestAnimationFrame(loop);
        };
        frameRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frameRef.current);
    }, [parsedSettings, fromFontVariationSettings, radius, calcFalloff, containerRef]);

    const words = label.split(' ');
    let letterIndex = 0;

    return (
        <span ref={ref} className={className} style={style} onClick={onClick}>
            {words.map((word, wi) => (
                <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {word.split('').map((char, ci) => {
                        const idx = letterIndex++;
                        return (
                            <span
                                key={ci}
                                ref={el => { letterRefs.current[idx] = el; }}
                                style={{ display: 'inline-block', fontVariationSettings: fromFontVariationSettings }}
                            >
                                {char}
                            </span>
                        );
                    })}
                    {wi < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
                </span>
            ))}
        </span>
    );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
