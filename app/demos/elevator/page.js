'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ElevatorPage() {
  const [floor, setFloor] = useState(1);
  const [direction, setDirection] = useState('up');
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Count up to floor 404
    let current = 1;
    const counting = setInterval(() => {
      current += Math.floor(Math.random() * 30) + 5;
      if (current >= 404) {
        current = 404;
        clearInterval(counting);
        setTimeout(() => {
          setDoorsOpen(true);
          setTimeout(() => {
            setArrived(true);
            setMessage('Floor 404 does not exist.');
          }, 1500);
        }, 800);
      }
      setFloor(current);
    }, 300);

    return () => clearInterval(counting);
  }, []);

  return (
    <div
      style={{
        background: '#1a1a1a',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
      }}
    >
      {/* Elevator shaft */}
      <div
        style={{
          width: 320,
          position: 'relative',
        }}
      >
        {/* Floor display */}
        <div
          style={{
            background: '#111',
            border: '3px solid #333',
            borderRadius: 8,
            padding: '16px 24px',
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          {/* Direction arrow */}
          <div style={{ fontSize: 16, color: arrived ? '#f55' : '#4ade80', marginBottom: 4 }}>
            {arrived ? '✕' : direction === 'up' ? '▲' : '▼'}
          </div>
          {/* Floor number (LCD style) */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: arrived ? '#f55' : '#4ade80',
              fontFamily: 'monospace',
              letterSpacing: 4,
              textShadow: arrived
                ? '0 0 20px rgba(255, 85, 85, 0.5)'
                : '0 0 20px rgba(74, 222, 128, 0.5)',
              transition: 'color 0.3s',
            }}
          >
            {floor}
          </div>
        </div>

        {/* Elevator doors */}
        <div
          style={{
            height: 300,
            background: '#0a0a0a',
            border: '4px solid #333',
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Left door */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, #2a2a2a, #3a3a3a, #2a2a2a)',
              borderRight: '2px solid #222',
              transform: doorsOpen ? 'translateX(-90%)' : 'translateX(0)',
              transition: 'transform 1.5s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 8,
            }}
          >
            {/* Door handle */}
            <div style={{ width: 4, height: 40, background: '#555', borderRadius: 2 }} />
          </div>

          {/* Right door */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, #2a2a2a, #3a3a3a, #2a2a2a)',
              borderLeft: '2px solid #222',
              transform: doorsOpen ? 'translateX(90%)' : 'translateX(0)',
              transition: 'transform 1.5s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 8,
            }}
          >
            <div style={{ width: 4, height: 40, background: '#555', borderRadius: 2 }} />
          </div>

          {/* Behind doors — the void */}
          {doorsOpen && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                background: 'radial-gradient(circle, #111 0%, #000 100%)',
              }}
            >
              {arrived ? (
                <>
                  <p style={{ color: '#f55', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                    FLOOR NOT FOUND
                  </p>
                  <p style={{ color: '#555', fontSize: 12 }}>
                    This floor does not exist.
                  </p>
                  <p style={{ color: '#333', fontSize: 11, marginTop: 16 }}>
                    Please select another floor.
                  </p>
                </>
              ) : (
                <p style={{ color: '#333', fontSize: 40 }}>...</p>
              )}
            </div>
          )}
        </div>

        {/* Buttons panel */}
        <div
          style={{
            marginTop: 24,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'center',
          }}
        >
          {[1, 2, 3, 'B', '☆', '⚠'].map((label) => (
            <div
              key={label}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#222',
                border: '2px solid #444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Message & back link */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          {message && (
            <p style={{ color: '#f55', fontSize: 13, marginBottom: 16, opacity: 0.7 }}>
              {message}
            </p>
          )}
          <Link
            href="/"
            style={{
              color: '#555',
              fontSize: 12,
              textDecoration: 'none',
            }}
          >
            ← Take the stairs
          </Link>
        </div>
      </div>
    </div>
  );
}
