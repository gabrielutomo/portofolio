'use client';

import { useState } from 'react';

const projects = [
    {
        title: 'AI Image Detector',
        description: 'Web app for detecting AI-generated images using deep learning (CNN). Trained on the CIFAKE dataset from Kaggle to distinguish between synthetic and authentic visuals.',
        tags: ['Next.js', 'FastAPI', 'TensorFlow', 'CNN', 'Deep Learning'],
        color: '#6366f1', // Indigo
        link: 'https://github.com/gabrielutomo/ai-detector',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    },
    {
        title: 'Bandar Lampung Rainfall Prediction',
        description: 'A rainfall prediction system using the K-Nearest Neighbor (KNN) algorithm, developed with the Laravel framework to provide accurate data for the Bandar Lampung region.',
        tags: ['Laravel', 'PHP', 'KNN Algorithm', 'Machine Learning'],
        color: '#FF2D20', // Laravel Red
        link: 'https://skycast-intelligence.up.railway.app/',
        image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&q=80&w=800',
    },
    {
        title: 'Linnerud Analysis & Prediction',
        description: 'Machine Learning project using KNN algorithm on the Linnerud dataset. Developed as part of a Google Colab implementation for athletic performance data analysis.',
        tags: ['Python', 'KNN', 'Google Colab', 'Scikit-learn'],
        color: '#F9AB00', // Google Yellow/Orange
        link: 'https://github.com/gabrielutomo/uas-machinelearning-linnerud',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    }
];


const ProjectsSection = () => {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            {projects.map((project, index) => (
                <a
                    key={index}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                        flex: '1 1 340px',
                        maxWidth: '550px',
                        borderRadius: '24px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        overflow: 'hidden',
                        textDecoration: 'none',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: hovered === index ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
                        boxShadow: hovered === index ? `0 30px 60px rgba(0,0,0,0.6), 0 0 40px ${project.color}15` : '0 10px 30px rgba(0,0,0,0.3)',
                    }}
                >
                    {/* Project Top Bar */}
                    <div style={{ height: '4px', background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

                    <div style={{ padding: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#f8fafc', lineHeight: 1.3 }}>{project.title}</h3>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: project.color,
                                transition: 'all 0.3s ease',
                                transform: hovered === index ? 'rotate(45deg)' : 'rotate(0)',
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </div>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.7, marginBottom: '28px' }}>
                            {project.description}
                        </p>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {project.tags.map((tag, i) => (
                                <span key={i} style={{
                                    padding: '8px 16px',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '50px',
                                    fontSize: '12px',
                                    color: 'rgba(255,255,255,0.8)',
                                    fontWeight: 600,
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default ProjectsSection;
