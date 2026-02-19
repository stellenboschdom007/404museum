'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function RadarPage() {
  const canvasRef = useRef(null);
  const [blips, setBlips] = useState([]);
  const [scanCount, setScanCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const size = Math.min(window.innerWidth * 0.8, 400);
    canvas.width = size;
    canvas.height = size;

    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 20;
    let angle = 0;
    let frame = 0;

    // Random blip positions (none will be "found")
    const blipPositions = Array.from({ length: 6 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: Math.random() * 0.7 + 0.15,
      fade: 0,
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 10, 0, 0.08)';
      ctx.fillRect(0, 0, size, size);

      // Concentric rings
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radius / 4) * i, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Cross lines
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Sweep line
      angle += 0.02;
      const sweepX = cx + Math.cos(angle) * radius;
      const sweepY = cy + Math.sin(angle) * radius;

      // Sweep gradient
      const grad = ctx.createLinearGradient(cx, cy, sweepX, sweepY);
      grad.addColorStop(0, 'rgba(0, 255, 65, 0)');
      grad.addColorStop(1, 'rgba(0, 255, 65, 0.6)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepX, sweepY);
      ctx.stroke();

      // Sweep arc trail
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle - 0.5, angle);
      ctx.closePath();
      const arcGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      arcGrad.addColorStop(0, 'rgba(0, 255, 65, 0)');
      arcGrad.addColorStop(0.5, 'rgba(0, 255, 65, 0.03)');
      arcGrad.addColorStop(1, 'rgba(0, 255, 65, 0.08)');
      ctx.fillStyle = arcGrad;
      ctx.fill();

      // Ghost blips that fade in and out (never found)
      blipPositions.forEach((blip) => {
        const angleDiff = ((angle % (Math.PI * 2)) - blip.a + Math.PI * 3) % (Math.PI * 2) - Math.PI;
        if (Math.abs(angleDiff) < 0.3) {
          blip.fade = Math.min(blip.fade + 0.08, 0.6);
        } else {
          blip.fade = Math.max(blip.fade - 0.01, 0);
        }

        if (blip.fade > 0.02) {
          const bx = cx + Math.cos(blip.a) * radius * blip.r;
          const by = cy + Math.sin(blip.a) * radius * blip.r;
          ctx.beginPath();
          ctx.arc(bx, by, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 65, ${blip.fade})`;
          ctx.fill();
        }
      });

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 255, 65, 0.8)';
      ctx.fill();

      // Track scan count
      frame++;
      if (frame % 314 === 0) {
        setScanCount((c) => c + 1);
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      style={{
        background: '#000a00',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        color: '#00ff41',
        padding: 40,
      }}
    >
      <p style={{ fontSize: 12, opacity: 0.4, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16 }}>
        SCANNING FOR TARGET
      </p>

      <canvas ref={canvasRef} style={{ borderRadius: '50%', marginBottom: 24 }} />

      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <p style={{ fontSize: 48, fontWeight: 900, marginBottom: 4, opacity: 0.9 }}>
          TARGET NOT FOUND
        </p>
        <p style={{ fontSize: 14, opacity: 0.4, marginBottom: 8 }}>
          Scans completed: {scanCount} · Targets located: 0
        </p>
        <p style={{ fontSize: 13, opacity: 0.3 }}>
          All contacts are ghost echoes. No valid page detected in sector.
        </p>
      </div>

      <Link
        href="/"
        style={{
          marginTop: 32,
          padding: '10px 28px',
          border: '1px solid rgba(0, 255, 65, 0.3)',
          borderRadius: 6,
          color: '#00ff41',
          fontSize: 14,
          textDecoration: 'none',
          transition: 'all 0.2s',
        }}
      >
        ← Return to Base
      </Link>
    </div>
  );
}
