'use client';

import { motion } from 'motion/react';

const stats = [
    { label: 'Core Projects', value: '5+' },
    { label: 'Technologies', value: '12+' },
    { label: 'Current Status', value: 'Student' },
    { label: 'Location', value: 'Bandar Lampung' },
];

const Stats = () => {
    return (
        <div style={{
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
            marginTop: '40px'
        }}>
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.8 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                    }}
                >
                    <span style={{
                        fontSize: '24px',
                        fontWeight: 800,
                        color: '#6366f1',
                        fontFamily: "'Space Grotesk', sans-serif",
                    }}>
                        {stat.value}
                    </span>
                    <span style={{
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: 'rgba(148,163,184,0.5)',
                        fontWeight: 600
                    }}>
                        {stat.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};

export default Stats;
