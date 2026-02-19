'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const stars = Array.from({ length: 30 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  opacity: Math.random() * 0.3,
  duration: 1 + Math.random() * 3,
  delay: Math.random() * 2,
}));

export default function ArcadePage() {
  const [lives, setLives] = useState(3);
  const [score] = useState(0);
  const [phase, setPhase] = useState('dying'); // dying, dead, insert-coin
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    // Lives countdown
    const t1 = setTimeout(() => setLives(2), 600);
    const t2 = setTimeout(() => setLives(1), 1200);
    const t3 = setTimeout(() => { setLives(0); setPhase('dead'); }, 1800);
    const t4 = setTimeout(() => setPhase('insert-coin'), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: '#000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Press Start 2P", "Courier New", monospace',
        imageRendering: 'pixelated',
        padding: 20,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)',
          pointerEvents: 'none',
          zIndex: 50,
        }}
      />

      {/* CRT vignette */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none',
          zIndex: 49,
        }}
      />

      {/* Top HUD */}
      <div
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          right: 20,
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 10,
          zIndex: 10,
        }}
      >
        <span style={{ color: '#ff0' }}>1UP</span>
        <span style={{ color: '#fff' }}>HI-SCORE</span>
        <span style={{ color: '#0ff' }}>2UP</span>
      </div>
      <div
        style={{
          position: 'fixed',
          top: 34,
          left: 20,
          right: 20,
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 10,
          zIndex: 10,
        }}
      >
        <span style={{ color: '#fff' }}>{String(score).padStart(6, '0')}</span>
        <span style={{ color: '#f55' }}>404404</span>
        <span style={{ color: '#fff' }}>000000</span>
      </div>

      {/* Main content */}
      <div style={{ textAlign: 'center', zIndex: 10 }}>
        {/* Lives display */}
        <div style={{ marginBottom: 32, fontSize: 12 }}>
          <span style={{ color: '#888', marginRight: 12 }}>LIVES:</span>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                color: i < lives ? '#f55' : '#333',
                marginRight: 8,
                fontSize: 16,
                transition: 'color 0.3s',
              }}
            >
              ♥
            </span>
          ))}
        </div>

        {phase === 'dying' && (
          <div>
            <p style={{ color: '#ff0', fontSize: 14, marginBottom: 16 }}>WARNING</p>
            <p style={{ color: '#f55', fontSize: 10, lineHeight: 2 }}>PAGE INTEGRITY FAILING</p>
            <div style={{ margin: '20px auto', width: 32, height: 32, position: 'relative' }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: '#f55',
                  animation: 'playerDie 1.8s ease-out forwards',
                }}
              />
              <style>{`@keyframes playerDie {
                0% { transform: none; opacity: 1; }
                30% { transform: rotate(90deg); }
                60% { transform: rotate(180deg) scale(0.5); }
                100% { transform: rotate(360deg) scale(0); opacity: 0; }
              }`}</style>
            </div>
          </div>
        )}

        {phase === 'dead' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <p
              style={{
                color: '#f55',
                fontSize: 28,
                letterSpacing: 6,
                marginBottom: 16,
              }}
            >
              GAME OVER
            </p>
            <p style={{ color: '#888', fontSize: 10, lineHeight: 2.5 }}>
              FINAL SCORE: 000000
              <br />
              PAGES FOUND: 0 / 1
              <br />
              RANK: F
            </p>
            <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
          </div>
        )}

        {phase === 'insert-coin' && (
          <div>
            <p
              style={{
                color: '#f55',
                fontSize: 28,
                letterSpacing: 6,
                marginBottom: 24,
              }}
            >
              GAME OVER
            </p>

            <div
              style={{
                border: '2px solid #ff0',
                padding: '16px 24px',
                marginBottom: 24,
                display: 'inline-block',
              }}
            >
              <p style={{ color: '#ff0', fontSize: 10 }}>ERROR 404</p>
              <p style={{ color: '#888', fontSize: 8, marginTop: 8, lineHeight: 2 }}>
                PAGE NOT FOUND IN
                <br />
                ANY GAME WORLD
              </p>
            </div>

            <p
              style={{
                color: blink ? '#0ff' : 'transparent',
                fontSize: 12,
                letterSpacing: 2,
                marginBottom: 32,
              }}
            >
              INSERT COIN
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <Link
                href="/"
                style={{
                  display: 'inline-block',
                  padding: '8px 20px',
                  border: '2px solid #0f0',
                  color: '#0f0',
                  fontSize: 10,
                  textDecoration: 'none',
                  letterSpacing: 2,
                }}
              >
                ← CONTINUE
              </Link>
            </div>

            <p style={{ color: '#333', fontSize: 8, marginTop: 32, letterSpacing: 1 }}>
              © 2025 404 CORP · ALL PAGES RESERVED
            </p>
          </div>
        )}
      </div>

      {/* Pixel stars background */}
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: 2,
            height: 2,
            background: '#fff',
            opacity: s.opacity,
            animation: `starBlink ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes starBlink { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}
