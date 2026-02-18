'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Point {
    x: number;
    y: number;
    oldX: number;
    oldY: number;
    isFixed?: boolean;
}

interface Constraint {
    p1: Point;
    p2: Point;
    distance: number;
}

interface LanyardProps {
    imageSrc: string;
    cardTitle: string;
    cardSubtitle: string;
    cardMajor: string;
}

const Lanyard: React.FC<LanyardProps> = ({ imageSrc, cardTitle, cardSubtitle, cardMajor }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const mousePos = useRef({ x: 0, y: 0 });

    // Physics parameters
    const points = useRef<Point[]>([]);
    const constraints = useRef<Constraint[]>([]);
    const segmentCount = 10;
    const segmentLength = 15;
    const gravity = 0.5;
    const friction = 0.98;

    const [cardState, setCardState] = useState({ x: 0, y: 0, angle: 0 });

    const initPhysics = useCallback(() => {
        const pts: Point[] = [];
        const ctrs: Constraint[] = [];

        // Initial anchor point (top center)
        const startX = 150;
        const startY = 10;

        for (let i = 0; i <= segmentCount; i++) {
            // Add a horizontal offset and randomized vertical jitter for the "mental" intro effect
            const offset = i * 15 + (Math.random() * 20 - 10);
            pts.push({
                x: startX + (i === 0 ? 0 : offset),
                y: startY + i * (segmentLength - 2),
                oldX: startX + (i === 0 ? 0 : offset),
                oldY: startY + i * (segmentLength - 2),
                isFixed: i === 0
            });

            if (i > 0) {
                ctrs.push({
                    p1: pts[i - 1],
                    p2: pts[i],
                    distance: segmentLength
                });
            }
        }

        points.current = pts;
        constraints.current = ctrs;
        // Set initial state
        setCardState({ x: startX, y: startY + segmentCount * segmentLength, angle: 0 });
    }, [segmentCount, segmentLength]);

    useEffect(() => {
        initPhysics();

        let animId: number;
        const ctx = canvasRef.current?.getContext('2d');

        const update = () => {
            // Update points (Verlet)
            points.current.forEach(p => {
                if (p.isFixed) return;

                const vx = (p.x - p.oldX) * friction;
                const vy = (p.y - p.oldY) * friction;

                p.oldX = p.x;
                p.oldY = p.y;

                p.x += vx;
                p.y += vy + gravity;
            });

            // Handle dragging the last point (ID Card)
            if (isDragging) {
                const lastPoint = points.current[points.current.length - 1];
                lastPoint.x = mousePos.current.x;
                lastPoint.y = mousePos.current.y;
            }

            // Constraints
            for (let i = 0; i < 5; i++) {
                constraints.current.forEach(c => {
                    const dx = c.p2.x - c.p1.x;
                    const dy = c.p2.y - c.p1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const diff = (c.distance - dist) / dist;
                    const offsetX = dx * diff * 0.5;
                    const offsetY = dy * diff * 0.5;

                    if (!c.p1.isFixed) {
                        c.p1.x -= offsetX;
                        c.p1.y -= offsetY;
                    }
                    if (!c.p2.isFixed) {
                        c.p2.x += offsetX;
                        c.p2.y += offsetY;
                    }
                });
            }

            // Update Card State for React render
            const lp = points.current[points.current.length - 1];
            const pp = points.current[points.current.length - 2];
            if (lp && pp) {
                const ang = Math.atan2(lp.y - pp.y, lp.x - pp.x) - Math.PI / 2;
                setCardState({ x: lp.x, y: lp.y, angle: ang });
            }

            // Render Rope on Canvas
            if (ctx && canvasRef.current) {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                ctx.beginPath();
                ctx.moveTo(points.current[0].x, points.current[0].y);
                for (let i = 1; i < points.current.length; i++) {
                    ctx.lineTo(points.current[i].x, points.current[i].y);
                }
                ctx.strokeStyle = '#6366f1';
                ctx.lineWidth = 2.5;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Draw Anchor
                ctx.beginPath();
                ctx.arc(points.current[0].x, points.current[0].y, 5, 0, Math.PI * 2);
                ctx.fillStyle = '#6366f1';
                ctx.fill();
            }

            animId = requestAnimationFrame(update);
        };

        update();
        return () => cancelAnimationFrame(animId);
    }, [isDragging, initPhysics]);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        updateMousePos(e);
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        updateMousePos(e);
    };

    const updateMousePos = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        mousePos.current = {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const handleMouseUp = () => setIsDragging(false);

    // Calculate card rotation based on last segments
    const lastP = points.current[points.current.length - 1];
    const prevP = points.current[points.current.length - 2];
    const angle = lastP && prevP ? Math.atan2(lastP.y - prevP.y, lastP.x - prevP.x) - Math.PI / 2 : 0;

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            style={{
                position: 'relative',
                width: '300px',
                height: '500px',
                overflow: 'visible',
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
        >
            <canvas
                ref={canvasRef}
                width={300}
                height={500}
                style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            />

            {/* ID CARD */}
            <div
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                style={{
                    position: 'absolute',
                    left: cardState.x,
                    top: cardState.y,
                    width: '180px',
                    transform: `translate(-50%, 0) rotate(${cardState.angle}rad)`,
                    transformOrigin: 'top center',
                    pointerEvents: 'auto',
                    userSelect: 'none',
                    zIndex: 10,
                }}
            >
                <div style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: 'rgba(10, 10, 26, 0.8)',
                    border: '1px solid rgba(99, 102, 241, 0.4)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(99,102,241,0.2)',
                }}>
                    {/* Header */}
                    <div style={{
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 12px',
                    }}>
                        <span style={{ fontSize: '10px', color: '#fff', fontWeight: 700, letterSpacing: '1px' }}>
                            {cardSubtitle}
                        </span>
                    </div>

                    {/* Photo */}
                    <div style={{ position: 'relative', height: '140px', width: '100%' }}>
                        <Image
                            src={imageSrc}
                            alt="ID Card Photo"
                            fill
                            style={{ objectFit: 'cover', objectPosition: 'center 95%' }}
                            draggable={false}
                        />
                    </div>

                    {/* Content */}
                    <div style={{ padding: '16px', textAlign: 'center' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>
                            {cardTitle}
                        </h4>
                        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', margin: '0' }}>
                            {cardMajor}
                        </p>
                        <div style={{
                            marginTop: '12px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 8px',
                            background: 'rgba(34,197,94,0.1)',
                            border: '1px solid rgba(34,197,94,0.3)',
                            borderRadius: '50px',
                        }}>
                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }} />
                            <span style={{ fontSize: '9px', color: '#22c55e', fontWeight: 700 }}>AVAILABLE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lanyard;
