import { ImageResponse } from 'next/og';
import { getLearnTopicById } from '@/features/learn/data';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ topic: string }> }) {
  const resolvedParams = await params;
  const topic = getLearnTopicById(resolvedParams.topic);

  const title = topic ? topic.title : 'JavaScript Tutorial';
  const description = topic
    ? topic.description
    : 'Learn JavaScript fundamentals, syntax, and concepts with interactive browser tutorials.';

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
          padding: '80px',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: '#9333ea',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 800,
                color: '#ffffff',
              }}
            >
              JS
            </div>
            <span style={{ fontSize: '24px', fontWeight: 700 }}>JS CodeLab Learn</span>
          </div>

          <div
            style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: '#1e293b',
              color: '#c084fc',
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            INTERACTIVE GUIDE
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1040px' }}>
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
            {title}
          </h1>
          <p
            style={{
              fontSize: '24px',
              lineHeight: 1.4,
              color: '#94a3b8',
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              backgroundColor: '#9333ea',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            Read Tutorial &amp; Run Code
          </div>
          <span style={{ fontSize: '18px', color: '#64748b' }}>
            In-Browser Code Lab • Hands-on Learning
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
