'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const MESSAGE = 'PAGE NOT FOUND';
const BOARD_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BOARD_NUMBERS = '1234567890';

export default function OuijaPage() {
  const [revealed, setRevealed] = useState('');
  const [planchettePos, setPlanchettePos] = useState({ x: 50, y: 60 });
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current >= MESSAGE.length) {
        setDone(true);
        clearInterval(interval);
        return;
      }

      const char = MESSAGE[indexRef.current];
      indexRef.current++;

      if (char === ' ') {
        setPlanchettePos({ x: 50, y: 60 });
        setRevealed((r) => r + ' ');
        return;
      }

      // Find letter position on board
      const li = BOARD_LETTERS.indexOf(char);
      if (li !== -1) {
        const row = li < 13 ? 0 : 1;
        const col = li < 13 ? li : li - 13;
        const totalInRow = row === 0 ? 13 : 13;
        const x = 10 + (col / (totalInRow - 1)) * 80;
        const y = row === 0 ? 35 : 45;
        setPlanchettePos({ x, y });
      }

      setTimeout(() => {
        setRevealed((r) => r + char);
      }, 400);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: '#1a0f00',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'serif',
        padding: 20,
      }}
    >
      {/* Board */}
      <div
        style={{
          position: 'relative',
          width: '90vw',
          maxWidth: 600,
          aspectRatio: '3/2',
          background: 'linear-gradient(135deg, #2a1a08, #3d2810, #2a1a08)',
          borderRadius: 20,
          border: '3px solid #4a3520',
          boxShadow: '0 0 40px rgba(0,0,0,0.5), inset 0 0 60px rgba(0,0,0,0.3)',
          padding: '5%',
          overflow: 'hidden',
        }}
      >
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3%' }}>
          <span style={{ fontSize: 'clamp(18px, 4vw, 32px)', color: '#c4a265', letterSpacing: 6, fontStyle: 'italic' }}>
            Ouija
          </span>
        </div>

        {/* YES / NO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10%', marginBottom: '2%' }}>
          <span style={{ color: '#8b7355', fontSize: 'clamp(10px, 2vw, 16px)', fontStyle: 'italic' }}>YES</span>
          <span style={{ color: '#8b7355', fontSize: 'clamp(10px, 2vw, 16px)', fontStyle: 'italic' }}>NO</span>
        </div>

        {/* Letters row 1 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(4px, 1.5vw, 14px)', marginBottom: '2%' }}>
          {BOARD_LETTERS.slice(0, 13).split('').map((l) => (
            <span key={l} style={{ color: '#c4a265', fontSize: 'clamp(12px, 2.5vw, 22px)', fontWeight: 600 }}>{l}</span>
          ))}
        </div>

        {/* Letters row 2 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(4px, 1.5vw, 14px)', marginBottom: '4%' }}>
          {BOARD_LETTERS.slice(13).split('').map((l) => (
            <span key={l} style={{ color: '#c4a265', fontSize: 'clamp(12px, 2.5vw, 22px)', fontWeight: 600 }}>{l}</span>
          ))}
        </div>

        {/* Numbers */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(6px, 2vw, 18px)', marginBottom: '3%' }}>
          {BOARD_NUMBERS.split('').map((n) => (
            <span key={n} style={{ color: '#8b7355', fontSize: 'clamp(10px, 2vw, 16px)' }}>{n}</span>
          ))}
        </div>

        {/* GOODBYE */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ color: '#8b7355', fontSize: 'clamp(12px, 2.5vw, 20px)', letterSpacing: 4, fontStyle: 'italic' }}>
            GOODBYE
          </span>
        </div>

        {/* Planchette */}
        <div
          style={{
            position: 'absolute',
            left: `${planchettePos.x}%`,
            top: `${planchettePos.y}%`,
            transform: 'translate(-50%, -50%)',
            width: 'clamp(30px, 8vw, 60px)',
            height: 'clamp(36px, 10vw, 72px)',
            background: 'rgba(60, 40, 20, 0.85)',
            borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
            border: '2px solid #6b5535',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              width: 'clamp(10px, 3vw, 20px)',
              height: 'clamp(10px, 3vw, 20px)',
              borderRadius: '50%',
              background: 'rgba(255, 220, 160, 0.15)',
              border: '1px solid #8b7355',
            }}
          />
        </div>
      </div>

      {/* Revealed message */}
      <div style={{ marginTop: 32, textAlign: 'center', minHeight: 60 }}>
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: 24,
            color: '#c4a265',
            letterSpacing: 6,
            fontWeight: 700,
          }}
        >
          {revealed}
          {!done && <span style={{ opacity: 0.4, animation: 'blink 1s infinite' }}>_</span>}
        </p>
        {done && (
          <p style={{ color: '#5a4a35', fontSize: 13, marginTop: 12, fontStyle: 'italic' }}>
            The spirits have spoken.
          </p>
        )}
        <style>{`@keyframes blink { 0%, 100% { opacity: 0.4; } 50% { opacity: 0; } }`}</style>
      </div>

      <Link href="/" style={{ marginTop: 24, color: '#5a4a35', fontSize: 12, fontFamily: 'monospace', textDecoration: 'none' }}>
        ← leave the séance
      </Link>
    </div>
  );
}
