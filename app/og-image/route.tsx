import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/seo/config';

export const runtime = 'edge';

const width = 1200;
const height = 630;

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#f8fafc',
            marginBottom: 16,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#94a3b8',
            maxWidth: 800,
            textAlign: 'center',
          }}
        >
          {siteConfig.description}
        </div>
      </div>
    ),
    { width, height }
  );
}
