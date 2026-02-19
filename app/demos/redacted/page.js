'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const paragraphs = [
  'On ██████████ at ████ hours, a request was submitted to access the resource located at the ██████████████ endpoint. The requesting agent was identified as ████████████████ operating from IP address ███.███.██.███.',
  'Upon review, the Directorate of ██████████ determined that the requested page ████ ███ █████. All records pertaining to its existence have been ████████ in accordance with Executive Order ██████.',
  'The resource was last known to be operational on ██/██/████ before being decommissioned under Operation ████████████. No further information is available at this classification level.',
  'Personnel seeking access to this material must submit Form ██-████ to the Office of ██████████████ with a minimum clearance of ████████. Unauthorized access attempts have been logged and forwarded to ████████████.',
];

const metadata = [
  { label: 'DOCUMENT ID', value: 'DOC-404-████████-██' },
  { label: 'CLASSIFICATION', value: 'TOP SECRET // ████ // NOFORN' },
  { label: 'DATE', value: '██/██/████' },
  { label: 'SUBJECT', value: 'Requested Page — Status: ██████████' },
  { label: 'HANDLING', value: 'EYES ONLY — DESTROY AFTER READING' },
];

export default function RedactedPage() {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevealed((r) => {
        if (r >= paragraphs.length + metadata.length + 1) {
          clearInterval(interval);
          return r;
        }
        return r + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: '#f4f0e8',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        fontFamily: '"Courier New", Courier, monospace',
      }}
    >
      <div
        style={{
          maxWidth: 680,
          width: '100%',
          background: '#faf6ee',
          border: '1px solid #d4cfc4',
          borderRadius: 2,
          padding: '48px 48px 40px',
          boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
          position: 'relative',
        }}
      >
        {/* Classification stamp */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 30,
            transform: 'rotate(12deg)',
            border: '3px solid #c0392b',
            color: '#c0392b',
            padding: '4px 14px',
            fontSize: 14,
            fontWeight: 900,
            letterSpacing: 3,
            opacity: revealed > 0 ? 0.7 : 0,
            transition: 'opacity 0.5s',
          }}
        >
          CLASSIFIED
        </div>

        {/* 404 stamp */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 40,
            transform: 'rotate(-8deg)',
            border: '4px solid #c0392b',
            color: '#c0392b',
            padding: '6px 20px',
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: 6,
            opacity: revealed > 2 ? 0.15 : 0,
            transition: 'opacity 0.8s',
          }}
        >
          404
        </div>

        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 32,
            opacity: revealed > 0 ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        >
          <p style={{ fontSize: 11, color: '#999', letterSpacing: 4, marginBottom: 4 }}>
            UNITED STATES DEPARTMENT OF ██████████
          </p>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#222', letterSpacing: 2 }}>
            PAGE NOT FOUND
          </p>
          <div style={{ width: 60, height: 2, background: '#c0392b', margin: '12px auto', opacity: 0.4 }} />
        </div>

        {/* Metadata */}
        <div
          style={{
            borderBottom: '1px solid #e0ddd4',
            paddingBottom: 20,
            marginBottom: 24,
          }}
        >
          {metadata.map((m, i) => (
            <div
              key={m.label}
              style={{
                display: 'flex',
                gap: 12,
                marginBottom: 6,
                fontSize: 12,
                opacity: revealed > i ? 1 : 0,
                transition: 'opacity 0.4s',
              }}
            >
              <span style={{ color: '#999', minWidth: 140 }}>{m.label}:</span>
              <span style={{ color: '#333' }}>{m.value}</span>
            </div>
          ))}
        </div>

        {/* Paragraphs */}
        {paragraphs.map((text, i) => (
          <p
            key={i}
            style={{
              fontSize: 13,
              lineHeight: 1.9,
              color: '#444',
              marginBottom: 16,
              opacity: revealed > metadata.length + i ? 1 : 0,
              transform: revealed > metadata.length + i ? 'none' : 'translateY(8px)',
              transition: 'all 0.5s ease',
            }}
          >
            {text}
          </p>
        ))}

        {/* Footer */}
        <div
          style={{
            borderTop: '1px solid #e0ddd4',
            paddingTop: 24,
            marginTop: 32,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: revealed > metadata.length + paragraphs.length ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        >
          <p style={{ fontSize: 10, color: '#bbb', letterSpacing: 2 }}>
            PAGE 1 OF 1 · COPY ██ OF ██
          </p>
          <Link
            href="/"
            style={{
              fontSize: 12,
              color: '#c0392b',
              textDecoration: 'none',
              border: '1px solid #c0392b',
              padding: '6px 16px',
              letterSpacing: 2,
              fontWeight: 700,
            }}
          >
            ← RETURN
          </Link>
        </div>
      </div>
    </div>
  );
}
