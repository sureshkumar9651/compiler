import { ImageResponse } from 'next/og';

export const alt = 'JS CodeLab — Free Online JavaScript Compiler & Playground';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #262626 2%, transparent 0%), radial-gradient(circle at 75px 75px, #171717 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '80px',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 800,
              color: '#ffffff',
            }}
          >
            JS
          </div>
          <span style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px' }}>
            JS CodeLab
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1000px' }}>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-1.5px',
              color: '#f8fafc',
            }}
          >
            Free Online JavaScript Compiler &amp; Playground
          </h1>
          <p
            style={{
              fontSize: '26px',
              lineHeight: 1.4,
              color: '#94a3b8',
              margin: 0,
            }}
          >
            Run, test, and learn JavaScript directly in your browser with zero installation.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              backgroundColor: '#1e293b',
              color: '#38bdf8',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            Fast Web Worker Sandbox
          </div>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              backgroundColor: '#1e293b',
              color: '#a78bfa',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            50+ Certifications
          </div>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              backgroundColor: '#1e293b',
              color: '#34d399',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            100% Free &amp; Private
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
