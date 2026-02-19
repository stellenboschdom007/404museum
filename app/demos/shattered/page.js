'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const shards = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2;
  const dist = 60 + Math.random() * 120;
  return {
    id: i,
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    rot: Math.random() * 40 - 20,
    scale: 0.6 + Math.random() * 0.5,
    delay: Math.random() * 0.8,
    width: 40 + Math.random() * 80,
    height: 40 + Math.random() * 80,
    clipPath: generateShardClip(),
  };
});

function generateShardClip() {
  const points = 3 + Math.floor(Math.random() * 3);
  const pts = Array.from({ length: points }, () =>
    `${Math.floor(Math.random() * 100)}% ${Math.floor(Math.random() * 100)}%`
  );
  return `polygon(${pts.join(', ')})`;
}

export default function ShatteredPage() {
  const [shattered, setShattered] = useState(false);
  const [cracks, setCracks] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setCracks(true), 800);
    const t2 = setTimeout(() => setShattered(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      style={{
        background: '#0a0a0a',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'monospace',
      }}
    >
      {/* Crack overlay */}
      {cracks && !shattered && <CrackOverlay />}

      {/* Shattered pieces flying out */}
      {shattered && shards.map((shard) => (
        <div
          key={shard.id}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: shard.width,
            height: shard.height,
            background: `linear-gradient(${shard.rot + 45}deg, #1a1a2e, #16213e, #0f3460)`,
            clipPath: shard.clipPath,
            transform: `translate(-50%, -50%) translate(${shard.x}px, ${shard.y}px) rotate(${shard.rot}deg) scale(${shard.scale})`,
            transition: `all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${shard.delay}s`,
            opacity: 0.6,
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: 'inset 0 0 20px rgba(255,255,255,0.03)',
          }}
        />
      ))}

      {/* Reflected light shimmers */}
      {shattered && <Shimmers />}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          textAlign: 'center',
          padding: 40,
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255,255,255,0.1)',
            marginBottom: 8,
            letterSpacing: 16,
            opacity: shattered ? 1 : 0,
            transform: shattered ? 'none' : 'scale(0.8)',
            transition: 'all 0.8s ease 0.5s',
          }}
        >
          404
        </div>

        <p
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 300,
            marginBottom: 8,
            opacity: shattered ? 1 : 0,
            transition: 'opacity 0.8s ease 0.8s',
          }}
        >
          This page shattered into pieces
        </p>

        <p
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.2)',
            maxWidth: 360,
            margin: '0 auto',
            lineHeight: 1.8,
            opacity: shattered ? 1 : 0,
            transition: 'opacity 0.8s ease 1s',
          }}
        >
          The fragments are too small to reassemble.
          Whatever was here is now irreparably broken.
        </p>

        <Link
          href="/"
          style={{
            display: 'inline-block',
            marginTop: 32,
            padding: '10px 28px',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 6,
            color: 'rgba(255,255,255,0.4)',
            fontSize: 14,
            textDecoration: 'none',
            opacity: shattered ? 1 : 0,
            transition: 'opacity 0.5s ease 1.2s',
          }}
        >
          ← Sweep up the pieces
        </Link>
      </div>

      {/* Initial "page" that cracks */}
      {!shattered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#111',
            zIndex: 30,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#444', fontSize: 14 }}>Loading page...</p>
            {cracks && (
              <p
                style={{
                  color: '#ff4444',
                  fontSize: 13,
                  marginTop: 8,
                  animation: 'crackPulse 0.3s ease-in-out 3',
                }}
              >
                ⚠ STRUCTURAL INTEGRITY FAILURE
              </p>
            )}
            <style>{`@keyframes crackPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>
          </div>
        </div>
      )}
    </div>
  );
}

const shimmerData = Array.from({ length: 12 }, () => ({
  left: 10 + Math.random() * 80,
  top: 10 + Math.random() * 80,
  delay: Math.random() * 3,
}));

function Shimmers() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {shimmerData.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: 2,
            height: 2,
            background: 'white',
            borderRadius: '50%',
            opacity: 0,
            animation: `shimmer 2s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes shimmer { 0%, 100% { opacity: 0; } 50% { opacity: 0.6; } }`}</style>
    </div>
  );
}

const crackData = Array.from({ length: 8 }, (_, i) => {
  const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.3;
  const len = 200 + Math.random() * 300;
  const strokeW = 1 + Math.random();
  return { angle, len, strokeW };
});

function CrackOverlay() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const lines = svg.querySelectorAll('line');
    crackData.forEach((c, i) => {
      const x2 = 50 + (Math.cos(c.angle) * c.len) / w * 100;
      const y2 = 50 + (Math.sin(c.angle) * c.len) / h * 100;
      if (lines[i]) {
        lines[i].setAttribute('x2', `${x2}%`);
        lines[i].setAttribute('y2', `${y2}%`);
      }
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 31,
        pointerEvents: 'none',
      }}
    >
      {crackData.map((c, i) => (
        <line
          key={i}
          x1="50%"
          y1="50%"
          x2="50%"
          y2="50%"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={c.strokeW}
          style={{
            strokeDasharray: 400,
            strokeDashoffset: 400,
            animation: `crackDraw 0.6s ease-out ${i * 0.08}s forwards`,
          }}
        />
      ))}
      <style>{`@keyframes crackDraw { to { stroke-dashoffset: 0; } }`}</style>
    </svg>
  );
}
