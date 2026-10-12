import { ImageResponse } from 'next/og';
import { exampleService } from '@/features/examples/services/example-service';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const example =
    exampleService.getExampleById(resolvedParams.id) ||
    exampleService.getTemplateById(resolvedParams.id);

  const title = example ? example.title : 'JavaScript Example';
  const category = example ? example.category.toUpperCase() : 'EXAMPLE';
  const description = example
    ? example.description
    : 'Run and edit JavaScript directly in your browser with JS CodeLab.';

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
                backgroundColor: '#2563eb',
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
            <span style={{ fontSize: '24px', fontWeight: 700 }}>JS CodeLab</span>
          </div>

          <div
            style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: '#1e293b',
              color: '#38bdf8',
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            {category}
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
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            Run Online in JS CodeLab
          </div>
          <span style={{ fontSize: '18px', color: '#64748b' }}>
            Free Browser Compiler • Zero Setup
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
