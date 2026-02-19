'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function StaticPage() {
  const canvasRef = useRef(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animId;
    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;       // R
        data[i + 1] = v;   // G
        data[i + 2] = v;   // B
        data[i + 3] = 40;  // A — semi-transparent for dark feel
      }

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, w, h);
      ctx.putImageData(imageData, 0, 0);

      // Scan lines
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      for (let y = 0; y < h; y += 3) {
        ctx.fillRect(0, y, w, 1);
      }

      // Random horizontal glitch bars
      if (Math.random() > 0.92) {
        const gy = Math.random() * h;
        const gh = Math.random() * 20 + 5;
        ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '255,255,255' : '0,0,0'}, 0.15)`;
        ctx.fillRect(0, gy, w, gh);
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      />

      {/* Color bars at top */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          display: 'flex',
          zIndex: 10,
        }}
      >
        {['#fff', '#ff0', '#0ff', '#0f0', '#f0f', '#f00', '#00f', '#000'].map((c) => (
          <div key={c} style={{ flex: 1, background: c }} />
        ))}
      </div>

      {/* Content overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 40,
          opacity: showText ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <div
          style={{
            border: '3px solid rgba(255,255,255,0.6)',
            padding: '30px 50px',
            background: 'rgba(0,0,0,0.7)',
            marginBottom: 24,
          }}
        >
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: 64,
              fontWeight: 900,
              color: 'white',
              letterSpacing: 12,
              marginBottom: 8,
            }}
          >
            NO SIGNAL
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: 16, color: 'rgba(255,255,255,0.4)', letterSpacing: 4 }}>
            CH 404 · INPUT NOT FOUND
          </p>
        </div>

        <div style={{ fontFamily: 'monospace', fontSize: 13, color: 'rgba(255,255,255,0.25)', marginBottom: 32 }}>
          <p>Check antenna connection</p>
          <p>Verify input source</p>
          <p style={{ marginTop: 8 }}>AUTO — — — — —</p>
        </div>

        <Link
          href="/"
          style={{
            fontFamily: 'monospace',
            padding: '10px 28px',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            fontSize: 14,
            textDecoration: 'none',
          }}
        >
          ← SWITCH INPUT
        </Link>
      </div>
    </div>
  );
}
