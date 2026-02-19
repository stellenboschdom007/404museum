'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const evidenceMarkers = [
  { id: 1, x: 25, y: 30, label: 'Missing &lt;div&gt; tag' },
  { id: 2, x: 60, y: 55, label: 'Broken hyperlink' },
  { id: 3, x: 40, y: 70, label: 'Orphaned CSS rule' },
  { id: 4, x: 75, y: 35, label: 'Null reference' },
  { id: 5, x: 15, y: 65, label: 'Expired SSL cert' },
  { id: 6, x: 55, y: 80, label: 'DNS resolution failure' },
];

const notes = [
  'Victim: /requested/page.html',
  'Last seen: Unknown',
  'Status: 404 — Confirmed missing',
  'No witnesses. No logs. No backup.',
  'The page was last deployed 3 builds ago.',
  'Suspecting foul play by a rogue git rebase.',
];

export default function CrimeScenePage() {
  const [visible, setVisible] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => {
        if (v >= evidenceMarkers.length) {
          clearInterval(interval);
          setTimeout(() => setShowNotes(true), 600);
          return v;
        }
        return v + 1;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: '#1a1a1a',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'monospace',
      }}
    >
      {/* Police tape top */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: -20,
          right: -20,
          height: 32,
          background: 'repeating-linear-gradient(90deg, #ffd700 0px, #ffd700 120px, #111 120px, #111 140px)',
          transform: 'rotate(-2deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
        }}
      >
        <span style={{ color: '#111', fontWeight: 900, fontSize: 13, letterSpacing: 8 }}>
          ⚠ CRIME SCENE DO NOT CROSS ⚠ CRIME SCENE DO NOT CROSS ⚠ CRIME SCENE DO NOT CROSS ⚠
        </span>
      </div>

      {/* Police tape bottom */}
      <div
        style={{
          position: 'fixed',
          bottom: 50,
          left: -20,
          right: -20,
          height: 32,
          background: 'repeating-linear-gradient(90deg, #ffd700 0px, #ffd700 120px, #111 120px, #111 140px)',
          transform: 'rotate(1.5deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          boxShadow: '0 -2px 10px rgba(0,0,0,0.5)',
        }}
      >
        <span style={{ color: '#111', fontWeight: 900, fontSize: 13, letterSpacing: 8 }}>
          ⚠ CRIME SCENE DO NOT CROSS ⚠ CRIME SCENE DO NOT CROSS ⚠ CRIME SCENE DO NOT CROSS ⚠
        </span>
      </div>

      {/* Chalk outline of a webpage */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 280,
          height: 380,
          border: '2px dashed rgba(255,255,255,0.15)',
          borderRadius: 8,
          padding: 20,
        }}
      >
        {/* Fake header bar */}
        <div style={{ width: '100%', height: 12, background: 'rgba(255,255,255,0.04)', borderRadius: 3, marginBottom: 12 }} />
        {/* Fake nav */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[40, 50, 35, 45].map((w, i) => (
            <div key={i} style={{ width: w, height: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 2 }} />
          ))}
        </div>
        {/* Fake content lines */}
        {[100, 90, 95, 70, 85, 60, 80].map((w, i) => (
          <div key={i} style={{ width: `${w}%`, height: 6, background: 'rgba(255,255,255,0.03)', borderRadius: 2, marginBottom: 8 }} />
        ))}

        {/* Big X */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 120, color: 'rgba(255, 50, 50, 0.08)', fontWeight: 900,
        }}>
          ✕
        </div>
      </div>

      {/* Evidence markers */}
      {evidenceMarkers.slice(0, visible).map((m) => (
        <div
          key={m.id}
          style={{
            position: 'absolute',
            left: `${m.x}%`,
            top: `${m.y}%`,
            transform: 'translate(-50%, -50%)',
            animation: 'markerDrop 0.3s ease-out',
          }}
        >
          <div
            style={{
              width: 28,
              height: 36,
              background: '#ffd700',
              borderRadius: '2px 2px 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 16,
              color: '#111',
              position: 'relative',
            }}
          >
            {m.id}
            <div style={{
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '14px solid transparent',
              borderRight: '14px solid transparent',
              borderTop: '8px solid #ffd700',
            }} />
          </div>
          <p
            style={{
              position: 'absolute',
              top: 44,
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              fontSize: 9,
              color: '#666',
              background: 'rgba(0,0,0,0.8)',
              padding: '2px 6px',
              borderRadius: 2,
            }}
            dangerouslySetInnerHTML={{ __html: m.label }}
          />
        </div>
      ))}
      <style>{`@keyframes markerDrop { from { transform: translate(-50%, -100%); opacity: 0; } to { transform: translate(-50%, -50%); opacity: 1; } }`}</style>

      {/* Detective notepad */}
      {showNotes && (
        <div
          style={{
            position: 'fixed',
            top: 80,
            right: 20,
            width: 220,
            background: '#fefce8',
            padding: 16,
            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
            transform: 'rotate(2deg)',
            zIndex: 30,
            animation: 'slideIn 0.5s ease',
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, color: '#333', borderBottom: '1px solid #ddd', paddingBottom: 6, marginBottom: 8 }}>
            DETECTIVE NOTES
          </p>
          {notes.map((n, i) => (
            <p key={i} style={{ fontSize: 10, color: '#444', lineHeight: 1.8, fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
              {n}
            </p>
          ))}
        </div>
      )}
      <style>{`@keyframes slideIn { from { transform: rotate(2deg) translateX(100%); } to { transform: rotate(2deg) translateX(0); } }`}</style>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 12, left: 0, right: 0, textAlign: 'center', zIndex: 30 }}>
        <Link href="/" style={{ color: '#ffd700', fontSize: 12, textDecoration: 'none', opacity: 0.6 }}>
          ← Leave the scene
        </Link>
      </div>
    </div>
  );
}
