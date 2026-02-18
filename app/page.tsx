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
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';
import Stats from './components/sections/Stats';

// Dynamic imports for effects
const Squares = dynamic(() => import('./components/backgrounds/Squares'), { ssr: false });
const Particles = dynamic(() => import('./components/backgrounds/Particles'), { ssr: false });

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
        <Squares
          direction="diagonal"
          speed={0.3}
          borderColor="rgba(99,102,241,0.08)"
          squareSize={60}
          hoverFillColor="rgba(99,102,241,0.05)"
          className=""
        />
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
        {/* Dither pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.3,
        }} />
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
            padding: '120px 24px 80px',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', gap: 'clamp(40px, 8vw, 80px)', alignItems: 'center', flexWrap: 'wrap-reverse' }}>

            {/* Left: Content (Asymmetric dominance) */}
            <div ref={containerRef} style={{ flex: '1.2', minWidth: '320px' }}>
              <div style={{ marginBottom: '24px', animation: 'fadeInUp 0.8s ease' }}>
                <h1 style={{
                  fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                  fontWeight: 900,
                  lineHeight: 0.95,
                  letterSpacing: '-3px',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  <ShinyText text="Gabriel Adetya" color="rgba(248,250,252,0.95)" shineColor="#ffffff" speed={3} className="" />
                  <br />
                  <ShinyText text="Utomo" color="rgba(99,102,241,0.9)" shineColor="#c7d2fe" speed={2.5} className="" />
                </h1>
              </div>

              <div style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
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
                marginBottom: '48px',
                animation: 'fadeInUp 0.8s ease 0.4s both'
              }}>
                <VariableProximity
                  label="A passionate tech learner committed to continuous growth in Web Development, UI/UX Design, and Full-Stack Engineering."
                  fromFontVariationSettings="'wght' 300"
                  toFontVariationSettings="'wght' 700"
                  containerRef={containerRef as React.RefObject<HTMLElement>}
                  radius={100}
                />
              </div>

              <div style={{ animation: 'fadeInUp 0.8s ease 0.6s both', display: 'flex', gap: '16px' }}>
                <a href="#projects" className="btn-primary"><span>Explore My Work</span></a>
                <a href="#contact" className="btn-secondary">Get in Touch</a>
              </div>

              <Stats />
            </div>

            {/* Right: Floating Card (Organic Placement) */}
            <div className="reveal" style={{ flex: '0.8', display: 'flex', justifyContent: 'center', animationDelay: '0.2s' }}>
              <ProfileCard
                name="Gabriel Adetya Utomo"
                title="Full Stack Engineer"
                status="Available for high impact projects and software engineering roles."
                imageSrc="/profile.jpg"
                linkedin="https://www.linkedin.com/in/gabriel-adetya-utomo-9232b63a9/"
                github="https://github.com/gabrielutomo"
              />
            </div>
          </div>
        </section>

        {/* ===== ABOUT: THE PENDULUM SECTION (Restored Spacing) ===== */}
        <section
          id="about"
          style={{ padding: '160px 24px', position: 'relative' }}
        >
          {/* Subtle decoration */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '-10%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
          }} />

          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="reveal">
              <LanyardAbout imageSrc="/profile.jpg" />
            </div>
          </div>
        </section>

        {/* ===== MOTTO: FILLING THE GAP ===== */}
        <section style={{ padding: '80px 24px', textAlign: 'center' }}>
          <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.4,
              fontStyle: 'italic'
            }}>
              "Grow in wisdom, <span style={{ color: '#6366f1', fontStyle: 'normal' }}>build with purpose</span>,
              and let every work reflect grace."
            </h3>
          </div>
        </section>

        {/* ===== SKILLS: GRID VARIATION ===== */}
        <section
          id="skills"
          style={{ padding: '160px 24px' }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="reveal" style={{ marginBottom: '80px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff' }}>
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

        {/* ===== PROJECTS: STAGGERED FLOW ===== */}
        <section
          id="projects"
          style={{ padding: '160px 24px', background: 'rgba(255,255,255,0.01)' }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
              <span className="tag" style={{ marginBottom: '16px' }}>Curated Portfolio</span>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff' }}>Featured Projects</h2>
            </div>
            <div className="reveal">
              <ProjectsSection />
            </div>
          </div>
        </section>

        {/* ===== CONTACT: PREMIUM FINALE ===== */}
        <section
          id="contact"
          style={{ padding: '200px 24px', position: 'relative' }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)',
          }} />
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="reveal">
              <ContactSection />
            </div>
          </div>
        </section>

        <footer style={{ padding: '40px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontSize: '13px', color: 'rgba(148,163,184,0.4)', letterSpacing: '1px' }}>
            © {new Date().getFullYear()} GABRIEL ADETYA UTOMO
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
