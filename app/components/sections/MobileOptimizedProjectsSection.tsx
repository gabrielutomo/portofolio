'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import BorderGlow from '@/app/components/ui/BorderGlow';

interface Project {
  title: string;
  description: string;
  detailedDescription?: string;
  tags: string[];
  technologies?: string[];
  color: string;
  link: string;
  image?: string;
  featured?: boolean;
}

/**
 * Projects data - Requirements: 3.1, 3.2, 3.3, 3.4
 * Distrik Bunyi is added as a featured project with complete metadata
 */
const projects: Project[] = [
  {
    title: 'Distrik Bunyi',
    description: 'An Indonesian indie music media platform featuring KURATOR AI, an AI music discovery chatbot powered by Gemini API.',
    detailedDescription: 'Built with Next.js, Tailwind CSS & Supabase. Submitted to JuaraVibeCoding 2026 by Google, deployed on Google Cloud Run.',
    tags: ['Next.js', 'Tailwind CSS', 'Supabase', 'Gemini API', 'Google Cloud Run', 'AI Chatbot'],
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Gemini API', 'Google Cloud Run'],
    color: '#14b8a6',
    link: 'https://distrik-bunyi-697721761061.asia-southeast2.run.app/',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    featured: true,
  },
  {
    title: 'AI Image Detector',
    description: 'Web app for detecting AI-generated images using deep learning (CNN). Trained on the CIFAKE dataset from Kaggle to distinguish between synthetic and authentic visuals.',
    tags: ['Next.js', 'FastAPI', 'TensorFlow', 'CNN', 'Deep Learning'],
    color: '#6366f1',
    link: 'https://github.com/gabrielutomo/ai-detector',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Bandar Lampung Rainfall Prediction',
    description: 'A rainfall prediction system using the K-Nearest Neighbor (KNN) algorithm, developed with the Laravel framework to provide accurate data for the Bandar Lampung region.',
    tags: ['Laravel', 'PHP', 'KNN Algorithm', 'Machine Learning'],
    color: '#FF2D20',
    link: 'https://skycast-intelligence-production.up.railway.app/',
    image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Linnerud Analysis & Prediction',
    description: 'Machine Learning project using KNN algorithm on the Linnerud dataset. Developed as part of a Google Colab implementation for athletic performance data analysis.',
    tags: ['Python', 'KNN', 'Google Colab', 'Scikit-learn'],
    color: '#F9AB00',
    link: 'https://github.com/gabrielutomo/uas-machinelearning-linnerud',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Blurred Frame',
    description: 'A fun and interactive selfie website where users can take photos with creative filters and cute frames — perfect for capturing memorable moments in style.',
    tags: ['Next.js', 'Canvas API', 'Filters', 'Webcam'],
    color: '#ec4899',
    link: 'https://blurred-frame.vercel.app/',
    image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&q=80&w=800',
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  hovered: number | null;
  isMobile: boolean;
  onHoverEnter: (index: number) => void;
  onHoverLeave: () => void;
}

const ProjectCardInner = ({ project, index, hovered, isMobile, onHoverEnter, onHoverLeave }: ProjectCardProps) => {
  const isHovered = hovered === index;

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => onHoverEnter(index)}
      onMouseLeave={onHoverLeave}
      onTouchStart={() => onHoverEnter(index)}
      onTouchEnd={onHoverLeave}
      aria-label={`View ${project.title} project`}
      style={{
        display: 'block',
        width: '100%',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: `1px solid ${isHovered ? project.color + '40' : 'rgba(255, 255, 255, 0.08)'}`,
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered && !isMobile ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
        boxShadow: isHovered
          ? `0 24px 48px rgba(0,0,0,0.5), 0 0 30px ${project.color}20`
          : '0 8px 24px rgba(0,0,0,0.25)',
        // Minimum touch target - per Requirement 5.1
        minHeight: isMobile ? '44px' : 'auto',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Color bar */}
      <div style={{ height: '3px', background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      {/* Project Image - optimized per Task 8.1 */}
      {project.image && (
        <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isHovered && !isMobile ? 'scale(1.05)' : 'scale(1)',
            }}
            loading="lazy"
          />
          {/* Subtle overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(5,5,16,0) 50%, rgba(5,5,16,0.85) 100%)',
          }} />
        </div>
      )}

      {/* Content */}
      <div style={{ padding: isMobile ? '20px' : '28px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            {project.featured && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 10px',
                background: `${project.color}20`,
                border: `1px solid ${project.color}40`,
                borderRadius: '50px',
                fontSize: '11px',
                fontWeight: 600,
                color: project.color,
                marginBottom: '8px',
                letterSpacing: '0.5px',
              }}>
                ★ FEATURED
              </span>
            )}
            <h3 style={{
              fontSize: isMobile ? '18px' : '22px',
              fontWeight: 700,
              color: '#f8fafc',
              lineHeight: 1.3,
            }}>
              {project.title}
            </h3>
          </div>
          {/* Arrow icon - touch target 44x44 */}
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: project.color,
            transition: 'all 0.3s ease',
            transform: isHovered ? 'rotate(45deg)' : 'rotate(0)',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </div>

        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: isMobile ? '13px' : '15px',
          lineHeight: 1.7,
          marginBottom: project.detailedDescription ? '8px' : '20px',
        }}>
          {project.description}
        </p>

        {project.detailedDescription && (
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '12px',
            lineHeight: 1.6,
            marginBottom: '20px',
            fontStyle: 'italic',
          }}>
            {project.detailedDescription}
          </p>
        )}

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {project.tags.map((tag, i) => (
            <span key={i} style={{
              padding: isMobile ? '5px 10px' : '6px 14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '50px',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

/**
 * MobileOptimizedProjectsSection - Task 2.2
 * - Mobile-first layout with responsive grid
 * - BorderGlow on featured projects - Task 6.2
 * - Touch-optimized interactions
 * Requirements: 1.3, 2.1, 3.2, 5.1
 */
const MobileOptimizedProjectsSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkMotion = () => setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    checkMobile();
    checkMotion();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile
        ? '1fr'
        : 'repeat(auto-fill, minmax(340px, 1fr))',
      gap: isMobile ? '16px' : '24px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {projects.map((project, index) => {
        const cardContent = (
          <ProjectCardInner
            key={index}
            project={project}
            index={index}
            hovered={hovered}
            isMobile={isMobile}
            onHoverEnter={setHovered}
            onHoverLeave={() => setHovered(null)}
          />
        );

        // Featured projects get BorderGlow - Requirement 2.1 & 3.2
        if (project.featured && !prefersReducedMotion) {
          return (
            <div key={index} style={{ gridColumn: isMobile ? 'auto' : '1 / -1' }}>
              <BorderGlow
                glowColor="140 80 60"
                backgroundColor="#050510"
                borderRadius={20}
                glowRadius={50}
                glowIntensity={0.8}
                colors={[project.color, '#6366f1', '#8b5cf6']}
                fillOpacity={0.3}
              >
                {cardContent}
              </BorderGlow>
            </div>
          );
        }

        return <div key={index}>{cardContent}</div>;
      })}
    </div>
  );
};

export default MobileOptimizedProjectsSection;
