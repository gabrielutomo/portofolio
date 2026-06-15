'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import FloatingNav from './components/nav/FloatingNav';
import ShinyText from './components/text/ShinyText';
import VariableProximity from './components/text/VariableProximity';
import TrueFocus from './components/text/TrueFocus';
import ProfileCard from './components/sections/ProfileCard';
import LanyardAbout from './components/sections/LanyardAbout';
import SkillsSection from './components/sections/SkillsSection';
import MobileOptimizedProjectsSection from './components/sections/MobileOptimizedProjectsSection';
import ContactSection from './components/sections/ContactSection';
import Stats from './components/sections/Stats';

// Dynamic imports for heavy effects — Task 4.2 / 8.3
const Squares = dynamic(() => import('./components/backgrounds/Squares'), { ssr: false });
const Particles = dynamic(() => import('./components/backgrounds/Particles'), { ssr: false });
const DitherBackground = dynamic(() => import('./components/backgrounds/DitherBackground'), { ssr: false });

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
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main style={{ background: '#050510', minHeight: '100vh', overflowX: 'hidden' }}>
      <FloatingNav />

      {/* Background Effects Container */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {/* Animated squares grid */}
        <Squares
          direction="diagonal"
          speed={0.3}
          borderColor="rgba(99,102,241,0.08)"
          squareSize={60}
          hoverFillColor="rgba(99,102,241,0.05)"
          className=""
        />
        {/* Floating particles */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Particles
            particleCount={40}
            particleSpread={6}
            speed={0.02}
            particleColors={['#6366f1', '#8b5cf6', '#06b6d4']}
            particleBaseSize={35}
            alphaParticles
          />
        </div>
        {/* Dither background — Task 6.3, auto-adjusts by performance tier */}
        <DitherBackground />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ===== HERO: ASYMMETRIC COMPOSITION ===== */}
        <section
          id="home"
          ref={heroRef}
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: 'clamp(100px, 15vh, 140px) clamp(16px, 4vw, 48px) clamp(60px, 8vh, 100px)',
          }}
        >
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            gap: 'clamp(32px, 6vw, 80px)',
            alignItems: 'center',
            flexWrap: 'wrap-reverse',
          }}>

            {/* Left: Content (Asymmetric dominance) */}
            <div ref={containerRef} style={{ flex: '1.2', minWidth: '280px' }}>
              <div style={{ marginBottom: '24px', animation: 'fadeInUp 0.8s ease' }}>
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                  fontWeight: 900,
                  lineHeight: 0.95,
                  letterSpacing: 'clamp(-2px, -0.5vw, -3px)',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  <ShinyText text="Gabriel Adetya" color="rgba(248,250,252,0.95)" shineColor="#ffffff" speed={3} className="" />
                  <br />
                  <ShinyText text="Utomo" color="rgba(99,102,241,0.9)" shineColor="#c7d2fe" speed={2.5} className="" />
                </h1>
              </div>

              <div style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)',
                color: 'rgba(148,163,184,0.8)',
                marginBottom: '32px',
                animation: 'fadeInUp 0.8s ease 0.2s both'
              }}>
                <TrueFocus
                  sentence="Full Stack Developer Machine Learning UI/UX Designer"
                  blurAmount={3}
                  borderColor="#6366f1"
                  animationDuration={0.6}
                />
              </div>

              <div style={{
                maxWidth: '540px',
                marginBottom: '40px',
                animation: 'fadeInUp 0.8s ease 0.4s both'
              }}>
                <VariableProximity
                  label="Open to new opportunities. I build clean, functional, and user-centered web applications — from frontend interfaces to full-stack systems"
                  fromFontVariationSettings="'wght' 300"
                  toFontVariationSettings="'wght' 700"
                  containerRef={containerRef as React.RefObject<HTMLElement>}
                  radius={100}
                />
              </div>

              <div style={{
                animation: 'fadeInUp 0.8s ease 0.6s both',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}>
                <a href="#projects" className="btn-primary" id="hero-cta-projects">
                  <span>Explore My Work</span>
                </a>
                <a href="#contact" className="btn-secondary" id="hero-cta-contact">
                  Get in Touch
                </a>
              </div>

              <Stats />
            </div>

            {/* Right: Floating Card (Organic Placement) */}
            <div
              className="reveal"
              style={{
                flex: '0.8',
                display: 'flex',
                justifyContent: 'center',
                animationDelay: '0.2s',
                minWidth: '240px',
              }}
            >
              <ProfileCard
                name="Gabriel Adetya Utomo"
                title="Full Stack Engineer"
                status="Available for high impact projects and software engineering roles."
                imageSrc="/profile2.jpg"
                linkedin="https://www.linkedin.com/in/gabriel-adetya-utomo-9232b63a9/"
                github="https://github.com/gabrielutomo"
              />
            </div>
          </div>
        </section>

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

        {/* ===== PROJECTS — Task 2.2 / 6.1 / 6.2 ===== */}
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
              {/* MobileOptimizedProjectsSection replaces old ProjectsSection */}
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
