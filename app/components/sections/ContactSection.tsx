'use client';

import { useState } from 'react';

const contacts = [
    { id: 'email', label: 'Email', value: 'gabrielutomo33@gmail.com', icon: '', color: '#6366f1' },
    { id: 'linkedin', label: 'LinkedIn', value: 'Gabriel Utomo', icon: '', color: '#06b6d4' },
    { id: 'github', label: 'GitHub', value: '@gabrielutomo', icon: '', color: '#f8fafc' },
];

const ContactSection = () => {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '16px', color: '#fff' }}>
                Let&apos;s Build Something <span style={{ color: '#6366f1' }}>Together</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
                Currently looking for new opportunities and collaborations. Feel free to reach out!
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {contacts.map((contact) => (
                    <a
                        key={contact.id}
                        onMouseEnter={() => setHovered(contact.id)}
                        onMouseLeave={() => setHovered(null)}
                        href={contact.id === 'email' ? `mailto:${contact.value}` :
                            contact.id === 'linkedin' ? 'https://www.linkedin.com/in/gabriel-adetya-utomo-9232b63a9/' :
                                'https://github.com/gabrielutomo'}
                        target={contact.id === 'email' ? undefined : "_blank"}
                        style={{
                            padding: '16px 32px',
                            background: hovered === contact.id ? `${contact.color}20` : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${hovered === contact.id ? contact.color : 'rgba(255,255,255,0.08)'}`,
                            borderRadius: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: hovered === contact.id ? '#fff' : 'rgba(255,255,255,0.8)',
                            fontSize: '16px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            transform: hovered === contact.id ? 'translateY(-5px)' : 'translateY(0)',
                            boxShadow: hovered === contact.id ? `0 15px 30px ${contact.color}30` : 'none',
                        }}
                    >
                        {contact.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ContactSection;
