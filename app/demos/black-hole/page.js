'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function BlackHolePage() {
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

    // Particle system — everything spirals inward
    const particles = Array.from({ length: 200 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 200 + Math.random() * 400;
      return {
        angle,
        dist,
        speed: 0.002 + Math.random() * 0.008,
        shrink: 0.15 + Math.random() * 0.3,
        size: 1 + Math.random() * 2.5,
        brightness: 0.3 + Math.random() * 0.7,
        hue: Math.random() > 0.7 ? 270 + Math.random() * 60 : 30 + Math.random() * 30,
      };
    });

    // Text fragments getting sucked in
    const texts = ['4', '0', '4', 'PAGE', 'NOT', 'FOUND', 'ERROR', 'MISSING', 'VOID'].map((text, i) => {
      const angle = (i / 9) * Math.PI * 2 + Math.random() * 0.5;
      return {
        text,
        angle,
        dist: 250 + Math.random() * 250,
        speed: 0.003 + Math.random() * 0.005,
        shrink: 0.05 + Math.random() * 0.15,
        fontSize: text.length <= 1 ? 48 : 16,
        opacity: 1,
      };
    });

    let frame = 0;
    let animId;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      frame++;

      // Trail effect
      ctx.fillStyle = 'rgba(2, 0, 8, 0.15)';
      ctx.fillRect(0, 0, w, h);

      // Accretion disk glow
      const diskGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 200);
      diskGrad.addColorStop(0, 'rgba(100, 50, 200, 0.02)');
      diskGrad.addColorStop(0.3, 'rgba(180, 100, 255, 0.01)');
      diskGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = diskGrad;
      ctx.fillRect(0, 0, w, h);

      // Draw particles spiraling in
      particles.forEach((p) => {
        p.angle += p.speed + (0.05 / Math.max(p.dist, 10));
        p.dist -= p.shrink;

        if (p.dist < 8) {
          p.dist = 200 + Math.random() * 400;
          p.angle = Math.random() * Math.PI * 2;
        }

        const x = cx + Math.cos(p.angle) * p.dist;
        const y = cy + Math.sin(p.angle) * p.dist * 0.4; // Elliptical

        const alpha = Math.min(p.brightness, p.dist / 100);
        ctx.beginPath();
        ctx.arc(x, y, p.size * Math.min(1, p.dist / 100), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${alpha})`;
        ctx.fill();
      });

      // Draw text fragments
      texts.forEach((t) => {
        t.angle += t.speed + (0.02 / Math.max(t.dist, 10));
        t.dist -= t.shrink;
        t.opacity = Math.min(1, t.dist / 80);

        if (t.dist < 15) {
          t.dist = 250 + Math.random() * 250;
          t.angle = Math.random() * Math.PI * 2;
          t.opacity = 1;
        }

        const x = cx + Math.cos(t.angle) * t.dist;
        const y = cy + Math.sin(t.angle) * t.dist * 0.4;
        const scale = Math.min(1, t.dist / 60);

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.rotate(t.angle);
        ctx.fillStyle = `rgba(200, 170, 255, ${t.opacity * 0.6})`;
        ctx.font = `${t.fontSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(t.text, 0, 0);
        ctx.restore();
      });

      // Black hole center
      const holeGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
      holeGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      holeGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.95)');
      holeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = holeGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.fill();

      // Event horizon ring
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(150, 100, 255, ${0.15 + Math.sin(frame * 0.02) * 0.05})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#020008' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      />

      <div
        style={{
          position: 'fixed',
          bottom: 40,
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <p style={{ fontFamily: 'monospace', fontSize: 13, color: 'rgba(200, 170, 255, 0.3)', marginBottom: 16 }}>
          This page crossed the event horizon.
        </p>
        <Link
          href="/"
          style={{
            fontFamily: 'monospace',
            color: 'rgba(200, 170, 255, 0.5)',
            fontSize: 13,
            textDecoration: 'none',
            padding: '8px 20px',
            border: '1px solid rgba(200, 170, 255, 0.15)',
            borderRadius: 6,
          }}
        >
          ← Escape Velocity
        </Link>
      </div>
    </div>
  );
}
