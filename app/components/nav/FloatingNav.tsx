'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

/**
 * FloatingNav - Task 4.3
 * Mobile-responsive navigation with:
 * - Hamburger toggle for mobile (< 768px)
 * - Touch-friendly targets (min 44×44px)
 * - Touch feedback on tap
 * - Scroll-aware active section detection
 * Requirements: 1.3, 5.1, 5.2, 5.3
 */
const FloatingNav = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Detect mobile viewport
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Scroll tracking
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
            if (current) setActiveSection(current.id);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on resize to desktop
    useEffect(() => {
        if (!isMobile && menuOpen) setMenuOpen(false);
    }, [isMobile, menuOpen]);

    // Prevent body scroll when mobile menu is open (Req 5.3 - gesture conflict)
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const scrollTo = useCallback((href: string) => {
        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
            setActiveSection(id);
            setMenuOpen(false);
            // Small delay so menu close animation starts first
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 200);
        }
    }, []);

    return (
        <>
            {/* ─── Desktop & Mobile pill nav wrapper ─── */}
            <nav
                className="floating-nav-wrapper"
                style={{
                    position: 'fixed',
                    top: 'max(20px, env(safe-area-inset-top, 20px))',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    width: isMobile ? 'calc(100% - 32px)' : 'fit-content',
                    maxWidth: isMobile ? '480px' : 'none',
                }}
            >
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    layout
                    style={{
                        background: 'rgba(5, 5, 20, 0.75)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        padding: isMobile ? '8px 12px' : '8px',
                        borderRadius: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isMobile ? 'space-between' : 'center',
                        gap: '4px',
                        boxShadow: scrolled
                            ? '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(99, 102, 241, 0.15)'
                            : '0 10px 20px rgba(0,0,0,0.3)',
                        width: '100%',
                    }}
                >
                    {/* Mobile: Logo/Brand + Hamburger */}
                    {isMobile ? (
                        <>
                            <span style={{
                                fontSize: '14px',
                                fontWeight: 700,
                                color: 'rgba(248,250,252,0.9)',
                                paddingLeft: '8px',
                                letterSpacing: '-0.3px',
                                fontFamily: "'Space Grotesk', sans-serif",
                            }}>
                                GAU
                            </span>

                            {/* Hamburger button — 44×44 touch target */}
                            <button
                                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                                aria-expanded={menuOpen}
                                onClick={() => setMenuOpen(prev => !prev)}
                                className={`hamburger${menuOpen ? ' open' : ''}`}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '5px',
                                    width: '44px',
                                    height: '44px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    background: 'transparent',
                                    border: 'none',
                                    borderRadius: '50px',
                                    WebkitTapHighlightColor: 'transparent',
                                    touchAction: 'manipulation',
                                    padding: '0',
                                    flexShrink: 0,
                                }}
                            >
                                <span style={{
                                    display: 'block',
                                    width: '22px',
                                    height: '2px',
                                    background: '#f8fafc',
                                    borderRadius: '2px',
                                    transition: 'transform 0.3s ease, opacity 0.3s ease',
                                    transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                                }} />
                                <span style={{
                                    display: 'block',
                                    width: '22px',
                                    height: '2px',
                                    background: '#f8fafc',
                                    borderRadius: '2px',
                                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                                    opacity: menuOpen ? 0 : 1,
                                    transform: menuOpen ? 'scaleX(0)' : 'none',
                                }} />
                                <span style={{
                                    display: 'block',
                                    width: '22px',
                                    height: '2px',
                                    background: '#f8fafc',
                                    borderRadius: '2px',
                                    transition: 'transform 0.3s ease, opacity 0.3s ease',
                                    transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                                }} />
                            </button>
                        </>
                    ) : (
                        /* Desktop: Pill nav items */
                        navItems.map((item) => {
                            const id = item.href.substring(1);
                            const isActive = activeSection === id;
                            return (
                                <button
                                    key={item.label}
                                    id={`nav-${id}`}
                                    onClick={() => scrollTo(item.href)}
                                    aria-label={`Navigate to ${item.label} section`}
                                    aria-current={isActive ? 'page' : undefined}
                                    style={{
                                        position: 'relative',
                                        padding: '8px clamp(10px, 2vw, 18px)',
                                        minHeight: '44px',
                                        minWidth: '44px',
                                        fontSize: 'clamp(12px, 2vw, 14px)',
                                        fontWeight: 600,
                                        color: isActive ? '#fff' : 'rgba(248, 250, 252, 0.7)',
                                        borderRadius: '50px',
                                        border: 'none',
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        transition: 'color 0.3s ease',
                                        WebkitTapHighlightColor: 'transparent',
                                        touchAction: 'manipulation',
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
                        })
                    )}
                </motion.div>
            </nav>

            {/* ─── Mobile full-screen menu overlay ─── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setMenuOpen(false)}   // tap backdrop → close
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(5, 5, 16, 0.96)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            zIndex: 999,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            paddingTop: '80px',  // account for nav bar
                        }}
                    >
                        {navItems.map((item, idx) => {
                            const id = item.href.substring(1);
                            const isActive = activeSection === id;
                            return (
                                <motion.button
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={(e) => { e.stopPropagation(); scrollTo(item.href); }}
                                    aria-label={`Navigate to ${item.label} section`}
                                    aria-current={isActive ? 'page' : undefined}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        maxWidth: '280px',
                                        minHeight: '56px',
                                        padding: '12px 32px',
                                        fontSize: '20px',
                                        fontWeight: 700,
                                        color: isActive ? '#fff' : 'rgba(248, 250, 252, 0.8)',
                                        background: isActive
                                            ? 'rgba(99, 102, 241, 0.15)'
                                            : 'transparent',
                                        border: `1px solid ${isActive ? 'rgba(99,102,241,0.4)' : 'transparent'}`,
                                        borderRadius: '16px',
                                        cursor: 'pointer',
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        letterSpacing: '-0.3px',
                                        WebkitTapHighlightColor: 'transparent',
                                        touchAction: 'manipulation',
                                        transition: 'background 0.2s ease, border-color 0.2s ease',
                                    }}
                                >
                                    {item.label}
                                </motion.button>
                            );
                        })}

                        {/* Close hint */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                marginTop: '24px',
                                fontSize: '12px',
                                color: 'rgba(148,163,184,0.5)',
                                letterSpacing: '1px',
                            }}
                        >
                            TAP ANYWHERE TO CLOSE
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingNav;
