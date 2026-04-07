import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Gabriel Adetya Utomo - Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050510',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
          color: 'white',
          padding: '40px',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '40px',
          padding: '80px 100px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.2)',
        }}>
          <h1 style={{
            fontSize: '90px',
            fontWeight: 800,
            margin: 0,
            color: '#f8fafc',
            textAlign: 'center',
            letterSpacing: '-3px',
            lineHeight: 1.1,
          }}>
            Gabriel Adetya
          </h1>
          <h1 style={{
            fontSize: '90px',
            fontWeight: 800,
            margin: '0 0 20px 0',
            color: '#c7d2fe',
            textAlign: 'center',
            letterSpacing: '-3px',
            lineHeight: 1.1,
          }}>
            Utomo
          </h1>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 500,
            margin: '20px 0 0 0',
            color: '#8b5cf6', 
            textAlign: 'center',
            letterSpacing: '-0.5px'
          }}>
            Full Stack Developer | ML Engineer | UI/UX
          </h2>
          <div style={{ display: 'flex', marginTop: '50px', gap: '20px' }}>
            <span style={{ fontSize: '24px', fontWeight: 600, color: 'rgba(248,250,252,0.9)', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', padding: '12px 30px', borderRadius: '50px' }}>Portfolio</span>
            <span style={{ fontSize: '24px', fontWeight: 600, color: '#94a3b8', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 30px', borderRadius: '50px' }}>Bandar Lampung</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
