'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

const GooeyNav: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [blobStyle, setBlobStyle] = useState({ left: 0, width: 0 });
    const navRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const updateBlob = () => {
            const el = itemRefs.current[activeIndex];
            const nav = navRef.current;
            if (!el || !nav) return;
            const navRect = nav.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            setBlobStyle({
                left: elRect.left - navRect.left - 4,
                width: elRect.width + 8,
            });
        };
        updateBlob();
        window.addEventListener('resize', updateBlob);
        return () => window.removeEventListener('resize', updateBlob);
    }, [activeIndex]);

    const handleClick = (index: number, href: string) => {
        setActiveIndex(index);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="gooey">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="gooey" />
                        <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <nav
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: '16px 24px',
                    display: 'flex',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    background: scrolled ? 'rgba(5,5,16,0.85)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(99,102,241,0.15)' : 'none',
                }}
            >
                <div
                    ref={navRef}
                    style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px',
                        background: scrolled ? 'transparent' : 'rgba(255,255,255,0.05)',
                        borderRadius: '50px',
                        border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.08)',
                        filter: 'url(#gooey)',
                    }}
                >
                    {/* Gooey blob */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '6px',
                            height: 'calc(100% - 12px)',
                            left: blobStyle.left,
                            width: blobStyle.width,
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            borderRadius: '50px',
                            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            zIndex: 0,
                        }}
                    />

                    {navItems.map((item, index) => (
                        <a
                            key={item.label}
                            ref={el => { itemRefs.current[index] = el; }}
                            href={item.href}
                            onClick={e => { e.preventDefault(); handleClick(index, item.href); }}
                            style={{
                                position: 'relative',
                                zIndex: 1,
                                padding: '8px 18px',
                                borderRadius: '50px',
                                fontSize: '14px',
                                fontWeight: 500,
                                color: activeIndex === index ? '#fff' : 'rgba(248,250,252,0.7)',
                                textDecoration: 'none',
                                transition: 'color 0.3s ease',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </nav>
        </>
    );
};

export default GooeyNav;
