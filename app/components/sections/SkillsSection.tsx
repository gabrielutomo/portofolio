'use client';

import { useState } from 'react';

const skills = [
    { name: 'React / Next.js', level: 90, color: '#61DAFB', category: 'Frontend', icon: 'react' },
    { name: 'TypeScript', level: 85, color: '#3178C6', category: 'Frontend', icon: 'typescript' },
    { name: 'Python', level: 80, color: '#3776AB', category: 'Backend', icon: 'python' },
    { name: 'Tailwind CSS', level: 95, color: '#06B6D4', category: 'Frontend', icon: 'tailwindcss' },
    { name: 'Laravel', level: 85, color: '#FF2D20', category: 'Backend', icon: 'laravel' },
    { name: 'PHP', level: 80, color: '#777BB4', category: 'Backend', icon: 'php' },
    { name: 'TensorFlow', level: 75, color: '#FF6F00', category: 'AI/ML', icon: 'tensorflow' },
    { name: 'HTML5', level: 95, color: '#E34F26', category: 'Frontend', icon: 'html5' },
    { name: 'Node.js', level: 88, color: '#339933', category: 'Backend', icon: 'nodedotjs' },
    { name: 'JavaScript', level: 92, color: '#F7DF1E', category: 'Frontend', icon: 'javascript' },
    { name: 'PostgreSQL', level: 85, color: '#4169E1', category: 'Database', icon: 'postgresql' },
    { name: 'GitHub', level: 88, color: '#ffffff', category: 'Tools', icon: 'github' },
];

const SkillsSection = () => {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
            gap: '16px',
            justifyContent: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '40px 0'
        }}>
            {skills.map((skill, index) => (
                <div
                    key={index}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                        position: 'relative',
                        width: '90px',
                        height: '90px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '20px',
                        background: hovered === index ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                        border: `1px solid ${hovered === index ? skill.color + '40' : 'rgba(255, 255, 255, 0.08)'}`,
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: hovered === index ? 'translateY(-10px) scale(1.1)' : 'translateY(0) scale(1)',
                        boxShadow: hovered === index ? `0 20px 40px rgba(0,0,0,0.4), 0 0 25px ${skill.color}30` : 'none',
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://cdn.simpleicons.org/${skill.icon}/${hovered === index ? skill.color.replace('#', '') : '94a3b8'}`}
                        alt={skill.name}
                        style={{
                            width: '40px',
                            height: '40px',
                            transition: 'all 0.4s ease',
                            filter: hovered === index ? `drop-shadow(0 0 8px ${skill.color}80)` : 'none'
                        }}
                    />

                    {/* Tooltip */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-35px',
                        left: '50%',
                        transform: hovered === index ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)',
                        opacity: hovered === index ? 1 : 0,
                        transition: 'all 0.3s ease',
                        background: 'rgba(5, 5, 16, 0.95)',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        border: `1px solid ${skill.color}40`,
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#fff',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        zIndex: 10,
                    }}>
                        {skill.name}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkillsSection;
