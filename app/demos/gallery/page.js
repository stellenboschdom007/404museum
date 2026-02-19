'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GalleryPage() {
  const [hoveredFrame, setHoveredFrame] = useState(null);

  return (
    <div
      style={{
        background: '#1a1410',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Georgia, "Times New Roman", serif',
        padding: 40,
      }}
    >
      {/* Gallery wall */}
      <div
        style={{
          background: 'linear-gradient(180deg, #2a2018, #1a1410)',
          maxWidth: 700,
          width: '100%',
          padding: '60px 40px',
          position: 'relative',
        }}
      >
        {/* Spotlight effect */}
        <div
          style={{
            position: 'absolute',
            top: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 300,
            height: 40,
            background: 'radial-gradient(ellipse, rgba(255,230,180,0.15) 0%, transparent 70%)',
          }}
        />

        {/* The "artwork" */}
        <div
          style={{
            margin: '0 auto',
            maxWidth: 400,
          }}
        >
          {/* Frame */}
          <div
            style={{
              border: '12px solid',
              borderImage: 'linear-gradient(135deg, #c4a44a, #8b6914, #c4a44a, #8b6914, #c4a44a) 1',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)',
              padding: 8,
              background: '#111',
            }}
          >
            {/* Inner mat */}
            <div
              style={{
                border: '2px solid #3a3020',
                padding: 24,
                background: '#faf8f4',
              }}
            >
              {/* The "art" — a dead center 404 */}
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p
                  style={{
                    fontSize: 72,
                    fontWeight: 100,
                    color: '#e0d8c8',
                    letterSpacing: 20,
                    fontFamily: 'Georgia, serif',
                    marginBottom: 16,
                  }}
                >
                  404
                </p>
                <div style={{ width: 60, height: 1, background: '#d4cfc4', marginBottom: 16 }} />
                <p
                  style={{
                    fontSize: 11,
                    color: '#b8b0a0',
                    fontStyle: 'italic',
                    letterSpacing: 4,
                    textTransform: 'uppercase',
                  }}
                >
                  the absence of content
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Museum placard */}
        <div
          style={{
            margin: '32px auto 0',
            maxWidth: 320,
            background: '#f8f5f0',
            padding: '16px 24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            borderRadius: 2,
          }}
        >
          <p style={{ fontSize: 16, fontStyle: 'italic', color: '#333', marginBottom: 4 }}>
            Untitled (Page Not Found)
          </p>
          <p style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>
            HTTP Response on Canvas, 2025
          </p>
          <div style={{ width: 40, height: 1, background: '#ddd', marginBottom: 8 }} />
          <p style={{ fontSize: 11, color: '#999', lineHeight: 1.8, fontStyle: 'italic' }}>
            In this provocative work, the artist confronts the viewer with the existential void
            left by a missing resource. The stark numerical composition evokes feelings of loss,
            confusion, and the fundamental impermanence of digital content. The deliberate absence
            of the requested page serves as a meditation on entropy in the information age.
          </p>
          <p style={{ fontSize: 10, color: '#bbb', marginTop: 12 }}>
            Medium: HTTP 404 Response<br />
            Dimensions: Variable (viewport-dependent)<br />
            Collection: The Server Permanent Collection<br />
            Gift of the Load Balancer, 2025
          </p>
        </div>

        {/* Audio guide number */}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <span
            style={{
              display: 'inline-block',
              background: '#333',
              color: '#c4a44a',
              padding: '4px 12px',
              fontSize: 11,
              borderRadius: 12,
              letterSpacing: 2,
            }}
          >
            🎧 AUDIO GUIDE #404
          </span>
        </div>
      </div>

      {/* Gallery footer */}
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: '#5a4a35', marginBottom: 16, letterSpacing: 2 }}>
          THE 404 MUSEUM OF MODERN ERRORS
        </p>
        <Link
          href="/"
          style={{
            color: '#8b7355',
            fontSize: 12,
            textDecoration: 'none',
            borderBottom: '1px solid #5a4a35',
            paddingBottom: 2,
          }}
        >
          ← Exit Through the Gift Shop
        </Link>
      </div>
    </div>
  );
}
