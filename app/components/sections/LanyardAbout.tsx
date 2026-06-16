'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import Lanyard from '../ui/Lanyard';

interface LanyardAboutProps {
    imageSrc: string;
}

const LanyardAbout: React.FC<LanyardAboutProps> = ({ imageSrc }) => {

    const hobbies = ['Guitar', 'Bass Guitar', 'Music Enthusiast', 'Explorer', 'AI Enthusiast', 'AI-Assisted Design', 'Automation & Workflow Tools'];
    const facts = [
        { icon: '', label: 'University', value: 'IIB Darmajaya' },
        { icon: '', label: 'Major', value: 'Informatics Engineering' },
        { icon: '', label: 'Location', value: 'Bandar Lampung, Indonesia' },
        { icon: '', label: 'GPA', value: '3.77 / 4.00' },
    ];

    return (
        <div style={{ display: 'flex', gap: '60px', alignItems: 'stretch', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Lanyard Card Wrapper */}
            <div className="reveal" style={{ flexShrink: 0, width: '460px', height: '580px' }}>
                <Lanyard
                    frontImage={imageSrc}
                    position={[0, 0, 5]}
                    lookAt={[0, -1, 0]}
                    gravity={[0, -40, 0]}
                    fov={40}
                    lanyardWidth={1}
                />
            </div>

            {/* About content */}
            <div style={{ flex: 1, minWidth: '300px', maxWidth: '560px' }}>
                <div style={{ marginBottom: '12px' }}>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        background: 'rgba(99,102,241,0.1)',
                        border: '1px solid rgba(99,102,241,0.3)',
                        borderRadius: '50px',
                        fontSize: '13px',
                        color: '#818cf8',
                        fontWeight: 500,
                    }}>
                        About Me
                    </span>
                </div>

                <h2 style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    fontWeight: 800,
                    color: '#f8fafc',
                    lineHeight: 1.2,
                    marginBottom: '8px',
                }}>
                    Passionate Developer &amp; Creative Thinker
                </h2>
                <h3 style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                    fontWeight: 600,
                    marginBottom: '20px',
                    background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    &ldquo;Frontend Developer with a Design Eye&rdquo;
                </h3>

                <p style={{
                    fontSize: '16px',
                    color: 'rgba(148,163,184,0.9)',
                    lineHeight: 1.8,
                    marginBottom: '24px',
                }}>
                    I&apos;m a fresh graduate in Informatics Engineering from{' '}
                    <strong style={{ color: '#c7d2fe' }}>IIB Darmajaya</strong> (GPA 3.77/4.00), with 3 years of
                    hands-on experience in web development, UI/UX design, and startup operations. I enjoy turning
                    ideas into clean, functional, and user-centered products — from designing interfaces in Figma
                    to building them with React, Next.js, and Tailwind CSS. I&apos;m currently focused on growing
                    as a frontend/full-stack developer, with a strong interest in crafting interfaces that feel
                    as good as they look.
                </p>

                {/* Facts grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                    marginBottom: '24px',
                }}>
                    {facts.map((fact, i) => (
                        <div key={i} style={{
                            padding: '14px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}>
                            {fact.icon && <span style={{ fontSize: '20px' }}>{fact.icon}</span>}
                            <div>
                                <p style={{ fontSize: '11px', color: 'rgba(148,163,184,0.6)', marginBottom: '2px' }}>{fact.label}</p>
                                <p style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: 500 }}>{fact.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hobbies */}
                <div>
                    <p style={{ fontSize: '13px', color: 'rgba(148,163,184,0.7)', marginBottom: '10px', fontWeight: 500 }}>
                        HOBBIES & INTERESTS
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {hobbies.map((h, i) => (
                            <span key={i} style={{
                                padding: '8px 14px',
                                background: 'rgba(99,102,241,0.08)',
                                border: '1px solid rgba(99,102,241,0.2)',
                                borderRadius: '50px',
                                fontSize: '13px',
                                color: '#c7d2fe',
                                fontWeight: 500,
                            }}>
                                {h}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LanyardAbout;
