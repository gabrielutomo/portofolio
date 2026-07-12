'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import FloatingNav from './components/nav/FloatingNav';
import LanyardAbout from './components/sections/LanyardAbout';
import SkillsSection from './components/sections/SkillsSection';
import MobileOptimizedProjectsSection from './components/sections/MobileOptimizedProjectsSection';
import ContactSection from './components/sections/ContactSection';
import { Component as HorizonHero } from './components/ui/horizon-hero-section';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  useScrollReveal();

  return (
    <main style={{ background: '#000000', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* HORIZON Hero Section - Full viewport with Three.js */}
      <HorizonHero />

      {/* Floating Navigation */}
      <FloatingNav />

      <div style={{ position: 'relative', zIndex: 10, background: '#050510' }}>
        {/* ===== ABOUT ===== */}
        <section
          id="about"
          style={{ padding: 'clamp(80px, 12vw, 160px) clamp(16px, 4vw, 48px)', position: 'relative' }}
        >
          {/* Subtle decoration */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '-10%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="reveal">
              <LanyardAbout imageSrc="/profile.jpg" />
            </div>
          </div>
        </section>

        {/* ===== MOTTO ===== */}
        <section style={{ padding: 'clamp(40px, 6vw, 80px) clamp(16px, 4vw, 48px)', textAlign: 'center' }}>
          <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{
              fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.4,
              fontStyle: 'italic'
            }}>
              &quot;Grow in wisdom, <span style={{ color: '#6366f1', fontStyle: 'normal' }}>build with purpose</span>,
              and let every work reflect grace.&quot;
            </h3>
          </div>
        </section>

        {/* ===== SKILLS ===== */}
        <section
          id="skills"
          style={{ padding: 'clamp(80px, 12vw, 160px) clamp(16px, 4vw, 48px)' }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="reveal" style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, color: '#fff' }}>
                  Tools of the <span style={{ color: '#6366f1' }}>Trade.</span>
                </h2>
                <p style={{ color: 'rgba(148,163,184,0.6)', maxWidth: '400px', paddingBottom: '10px' }}>
                  A curated collection of technologies I leverage to build state-of-the-art solutions.
                </p>
              </div>
            </div>

            <div className="reveal">
              <SkillsSection />
            </div>
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section
          id="projects"
          style={{ padding: 'clamp(80px, 12vw, 160px) clamp(16px, 4vw, 48px)', background: 'rgba(255,255,255,0.01)' }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 80px)' }}>
              <span className="tag" style={{ marginBottom: '16px' }}>Curated Portfolio</span>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, color: '#fff' }}>
                Featured Projects
              </h2>
            </div>
            <div className="reveal">
              <MobileOptimizedProjectsSection />
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section
          id="contact"
          style={{ padding: 'clamp(100px, 15vw, 200px) clamp(16px, 4vw, 48px)', position: 'relative' }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="reveal">
              <ContactSection />
            </div>
          </div>
        </section>

        <footer style={{
          padding: 'clamp(24px, 4vw, 40px) clamp(16px, 4vw, 24px)',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(148,163,184,0.4)', letterSpacing: '1px' }}>
            © {new Date().getFullYear()} GABRIEL ADETYA UTOMO
          </p>
        </footer>
      </div>
    </main>
  );
}
