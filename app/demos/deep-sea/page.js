'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function DeepSeaPage() {
  const canvasRef = useRef(null);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDepth((d) => Math.min(d + 47, 40400));
    }, 100);
    return () => clearInterval(interval);
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

    // Particles (jellyfish / plankton)
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speedY: -(Math.random() * 0.3 + 0.1),
      speedX: Math.random() * 0.4 - 0.2,
      opacity: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Bubbles
    const bubbles = Array.from({ length: 15 }, () => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 200,
      size: Math.random() * 6 + 2,
      speed: Math.random() * 1.5 + 0.5,
      wobble: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      frame++;

      // Deep ocean gradient
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#020818');
      grad.addColorStop(0.5, '#041030');
      grad.addColorStop(1, '#000510');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Light rays from top
      ctx.save();
      for (let i = 0; i < 5; i++) {
        const rx = w * 0.2 + i * w * 0.15;
        const rayGrad = ctx.createLinearGradient(rx, 0, rx + 20, h * 0.6);
        rayGrad.addColorStop(0, 'rgba(80, 180, 255, 0.03)');
        rayGrad.addColorStop(1, 'rgba(80, 180, 255, 0)');
        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(rx - 30, 0);
        ctx.lineTo(rx + 50, 0);
        ctx.lineTo(rx + 80 + Math.sin(frame * 0.005 + i) * 20, h * 0.5);
        ctx.lineTo(rx - 60 + Math.sin(frame * 0.005 + i) * 20, h * 0.5);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Particles (bioluminescent plankton)
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(frame * 0.01 + p.pulse) * 0.15;
        p.pulse += 0.02;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const glow = (Math.sin(p.pulse) + 1) * 0.5;
        const alpha = p.opacity * (0.5 + glow * 0.5);

        // Glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        g.addColorStop(0, `rgba(100, 200, 255, ${alpha * 0.3})`);
        g.addColorStop(1, 'rgba(100, 200, 255, 0)');
        ctx.fillStyle = g;
        ctx.fillRect(p.x - p.size * 4, p.y - p.size * 4, p.size * 8, p.size * 8);

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 220, 255, ${alpha})`;
        ctx.fill();
      });

      // Bubbles
      bubbles.forEach((b) => {
        b.y -= b.speed;
        b.wobble += 0.03;
        b.x += Math.sin(b.wobble) * 0.5;
        if (b.y < -20) { b.y = h + 20; b.x = Math.random() * w; }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Highlight
        ctx.beginPath();
        ctx.arc(b.x - b.size * 0.3, b.y - b.size * 0.3, b.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200, 240, 255, 0.1)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const id = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      />

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
          fontFamily: 'monospace',
        }}
      >
        {/* Depth gauge */}
        <div style={{ position: 'fixed', top: 20, right: 20, textAlign: 'right' }}>
          <p style={{ color: 'rgba(100, 200, 255, 0.3)', fontSize: 10, letterSpacing: 3, marginBottom: 4 }}>DEPTH</p>
          <p style={{ color: 'rgba(100, 200, 255, 0.6)', fontSize: 22, fontWeight: 700 }}>
            {depth.toLocaleString()}m
          </p>
          <p style={{ color: depth > 10000 ? 'rgba(255, 100, 100, 0.5)' : 'rgba(100, 200, 255, 0.3)', fontSize: 10, marginTop: 4 }}>
            {depth > 30000 ? '⚠ CRUSH DEPTH EXCEEDED' : depth > 10000 ? '⚠ PRESSURE WARNING' : 'NOMINAL'}
          </p>
        </div>

        {/* Sonar ping indicator */}
        <div style={{ position: 'fixed', top: 20, left: 20 }}>
          <SonarPing />
        </div>

        <p style={{ color: 'rgba(100, 200, 255, 0.25)', fontSize: 11, letterSpacing: 6, marginBottom: 20 }}>
          SUBMERSIBLE NAVIGATION SYSTEM
        </p>

        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: 'rgba(100, 200, 255, 0.15)',
            marginBottom: 8,
            letterSpacing: 8,
          }}
        >
          404
        </h1>

        <p style={{ fontSize: 24, color: 'rgba(100, 200, 255, 0.6)', fontWeight: 300, marginBottom: 8 }}>
          You&apos;ve gone too deep
        </p>
        <p style={{ fontSize: 14, color: 'rgba(100, 200, 255, 0.25)', maxWidth: 400, lineHeight: 1.8 }}>
          The page you&apos;re looking for has sunk beyond recoverable depth.
          No signal detected. Sonar returns empty.
        </p>

        <Link
          href="/"
          style={{
            marginTop: 32,
            padding: '12px 32px',
            border: '1px solid rgba(100, 200, 255, 0.2)',
            borderRadius: 8,
            color: 'rgba(100, 200, 255, 0.6)',
            fontSize: 14,
            textDecoration: 'none',
            transition: 'all 0.3s',
          }}
        >
          ↑ Surface
        </Link>
      </div>
    </div>
  );
}

function SonarPing() {
  const [ping, setPing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(true);
      setTimeout(() => setPing(false), 1500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', width: 40, height: 40 }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 6,
          height: 6,
          background: 'rgba(100, 200, 255, 0.6)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {ping && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 30,
              height: 30,
              border: '1px solid rgba(100, 200, 255, 0.3)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'sonarExpand 1.5s ease-out',
              opacity: 0,
            }}
          />
          <style>{`@keyframes sonarExpand { 0% { width: 6px; height: 6px; opacity: 0.6; } 100% { width: 40px; height: 40px; opacity: 0; } }`}</style>
        </>
      )}
    </div>
  );
}
