'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import Lanyard from '../ui/Lanyard';

interface LanyardAboutProps {
    imageSrc: string;
}

const LanyardAbout: React.FC<LanyardAboutProps> = ({ imageSrc }) => {

    const hobbies = ['Guitar', 'Bass Guitar', 'Music Enthusiast', 'Explorer'];
    const facts = [
        { icon: '', label: 'University', value: 'IIB Darmajaya' },
        { icon: '', label: 'Major', value: 'Informatics Engineering' },
        { icon: '', label: 'Location', value: 'Bandar Lampung, Indonesia' },
        { icon: '', label: 'Status', value: 'Student' },
    ];

    return (
        <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Lanyard Card Wrapper */}
            <div className="reveal" style={{ flexShrink: 0 }}>
                <Lanyard
                    imageSrc={imageSrc}
                    cardTitle="Gabriel Adetya Utomo"
                    cardSubtitle="IIB DARMAJAYA"
                    cardMajor="Informatics Engineering"
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
                    marginBottom: '20px',
                }}>
                    Passionate Developer &<br />
                    <span style={{
                        background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>Creative Thinker</span>
                </h2>

                <p style={{
                    fontSize: '16px',
                    color: 'rgba(148,163,184,0.9)',
                    lineHeight: 1.8,
                    marginBottom: '24px',
                }}>
                    I&apos;m a Computer Science student at <strong style={{ color: '#c7d2fe' }}>IIB Darmajaya</strong>,
                    specializing in Informatics Engineering. I&apos;m passionate about building
                    full-stack web applications, exploring machine learning, and crafting beautiful UI/UX experiences.
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
