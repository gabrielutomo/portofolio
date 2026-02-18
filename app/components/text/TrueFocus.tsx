'use client';

import { useRef, useEffect, useState } from 'react';

interface TrueFocusProps {
    sentence: string;
    manualMode?: boolean;
    blurAmount?: number;
    borderColor?: string;
    glowColor?: string;
    animationDuration?: number;
    pauseBetweenAnimations?: number;
    className?: string;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
    sentence = 'True Focus',
    manualMode = false,
    blurAmount = 5,
    borderColor = '#6366f1',
    glowColor = 'rgba(99,102,241,0.6)',
    animationDuration = 0.5,
    pauseBetweenAnimations = 1,
    className = '',
}) => {
    const words = sentence.split(' ');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

    useEffect(() => {
        if (!manualMode) {
            const interval = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % words.length);
            }, (animationDuration + pauseBetweenAnimations) * 1000);
            return () => clearInterval(interval);
        }
    }, [manualMode, words.length, animationDuration, pauseBetweenAnimations]);

    useEffect(() => {
        if (!wordRefs.current[currentIndex] || !containerRef.current) return;
        const wordEl = wordRefs.current[currentIndex];
        const containerEl = containerRef.current;
        const wordRect = wordEl!.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();
        setFocusRect({
            x: wordRect.left - containerRect.left - 8,
            y: wordRect.top - containerRect.top - 4,
            width: wordRect.width + 16,
            height: wordRect.height + 8,
        });
        setLastActiveIndex(currentIndex);
    }, [currentIndex]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ position: 'relative', display: 'inline-flex', gap: '0.5em', flexWrap: 'wrap', justifyContent: 'center' }}
        >
            {words.map((word, index) => {
                const isActive = index === currentIndex;
                const isLast = index === lastActiveIndex;
                return (
                    <span
                        key={index}
                        ref={el => { wordRefs.current[index] = el; }}
                        style={{
                            filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
                            transition: `filter ${animationDuration}s ease`,
                            cursor: manualMode ? 'pointer' : 'default',
                            color: 'inherit',
                        }}
                        onClick={() => manualMode && setCurrentIndex(index)}
                    >
                        {word}
                    </span>
                );
            })}
            <span
                style={{
                    position: 'absolute',
                    left: focusRect.x,
                    top: focusRect.y,
                    width: focusRect.width,
                    height: focusRect.height,
                    border: `2px solid ${borderColor}`,
                    borderRadius: '6px',
                    boxShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
                    transition: `all ${animationDuration}s ease`,
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

export default TrueFocus;
