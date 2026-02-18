'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

const FloatingNav = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const selections = navItems.map(item => {
                const id = item.href.substring(1);
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return { id, top: rect.top, bottom: rect.bottom };
                }
                return { id, top: Infinity, bottom: Infinity };
            });

            const current = selections.find(s => s.top < 150 && s.bottom > 150);
            if (current) {
                setActiveSection(current.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (href: string) => {
        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
            setActiveSection(id); // Set immediately for instant feedback
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000] w-fit"
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                layout
                style={{
                    background: 'rgba(5, 5, 20, 0.6)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    padding: '8px',
                    borderRadius: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: scrolled ? '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(99, 102, 241, 0.15)' : '0 10px 20px rgba(0,0,0,0.3)',
                }}
            >
                {navItems.map((item) => {
                    const id = item.href.substring(1);
                    const isActive = activeSection === id;

                    return (
                        <button
                            key={item.label}
                            onClick={() => scrollTo(item.href)}
                            style={{
                                position: 'relative',
                                padding: '8px clamp(10px, 2vw, 18px)',
                                fontSize: 'clamp(12px, 2vw, 14px)',
                                fontWeight: 600,
                                color: isActive ? '#fff' : 'rgba(248, 250, 252, 0.7)',
                                borderRadius: '50px',
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                transition: 'color 0.3s ease',
                            }}
                        >
                            <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-nav"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                        borderRadius: '50px',
                                        zIndex: 0,
                                    }}
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                        </button>
                    );
                })}
            </motion.div>
        </nav>
    );
};

export default FloatingNav;
