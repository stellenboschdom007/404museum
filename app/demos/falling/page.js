'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const ITEMS = [
  { text: '404', w: 120, h: 60, fontSize: 48, color: '#f55', fontWeight: 900 },
  { text: 'Page', w: 80, h: 36, fontSize: 24, color: '#888', fontWeight: 700 },
  { text: 'Not', w: 60, h: 32, fontSize: 22, color: '#888', fontWeight: 700 },
  { text: 'Found', w: 90, h: 36, fontSize: 24, color: '#888', fontWeight: 700 },
  { text: 'Error', w: 80, h: 28, fontSize: 16, color: '#555', fontWeight: 400 },
  { text: 'Oops', w: 70, h: 28, fontSize: 16, color: '#555', fontWeight: 400 },
  { text: ':(', w: 40, h: 36, fontSize: 28, color: '#666', fontWeight: 400 },
  { text: '???', w: 50, h: 28, fontSize: 18, color: '#444', fontWeight: 400 },
  { text: 'null', w: 55, h: 24, fontSize: 14, color: '#444', fontWeight: 400 },
  { text: 'undefined', w: 100, h: 24, fontSize: 14, color: '#444', fontWeight: 400 },
  { text: 'HTTP 404', w: 100, h: 28, fontSize: 14, color: '#555', fontWeight: 400 },
  { text: 'MISSING', w: 90, h: 28, fontSize: 16, color: '#a855f7', fontWeight: 700 },
];

export default function FallingPage() {
  const canvasRef = useRef(null);

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

    const GRAVITY = 0.3;
    const BOUNCE = 0.6;
    const FRICTION = 0.99;

    const bodies = ITEMS.map((item, i) => ({
      ...item,
      x: 80 + (i % 4) * (canvas.width / 5) + Math.random() * 40,
      y: -60 - i * 80 - Math.random() * 100,
      vx: (Math.random() - 0.5) * 2,
      vy: 0,
      rotation: (Math.random() - 0.5) * 0.5,
      vr: (Math.random() - 0.5) * 0.03,
    }));

    let animId;
    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, w, h);

      bodies.forEach((b) => {
        b.vy += GRAVITY;
        b.x += b.vx;
        b.y += b.vy;
        b.rotation += b.vr;
        b.vx *= FRICTION;

        // Floor
        if (b.y + b.h / 2 > h - 40) {
          b.y = h - 40 - b.h / 2;
          b.vy = -b.vy * BOUNCE;
          b.vr *= 0.8;
          if (Math.abs(b.vy) < 1) b.vy = 0;
        }

        // Walls
        if (b.x - b.w / 2 < 0) { b.x = b.w / 2; b.vx = Math.abs(b.vx) * BOUNCE; }
        if (b.x + b.w / 2 > w) { b.x = w - b.w / 2; b.vx = -Math.abs(b.vx) * BOUNCE; }

        // Draw
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rotation);
        ctx.fillStyle = '#1a1a1a';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
        ctx.strokeRect(-b.w / 2, -b.h / 2, b.w, b.h);

        ctx.fillStyle = b.color;
        ctx.font = `${b.fontWeight} ${b.fontSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.text, 0, 2);
        ctx.restore();
      });

      // Floor line
      ctx.fillStyle = '#222';
      ctx.fillRect(0, h - 40, w, 1);

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#0a0a0a' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      />
      <div style={{ position: 'fixed', bottom: 8, left: 0, right: 0, textAlign: 'center', zIndex: 10 }}>
        <Link href="/" style={{ color: '#444', fontSize: 12, fontFamily: 'monospace', textDecoration: 'none' }}>
          ← back
        </Link>
      </div>
    </div>
  );
}
