'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BSODPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        background: '#0078d7',
        color: 'white',
        fontFamily: '"Segoe UI", system-ui, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        cursor: 'default',
      }}
    >
      <div
        style={{
          maxWidth: 700,
          opacity: show ? 1 : 0,
          transform: show ? 'none' : 'translateY(10px)',
          transition: 'all 0.6s ease',
        }}
      >
        <div style={{ fontSize: '140px', fontWeight: 100, lineHeight: 1, marginBottom: 20 }}>
          :(
        </div>

        <p style={{ fontSize: 28, fontWeight: 300, marginBottom: 24, lineHeight: 1.4 }}>
          Your page ran into a problem and needs to restart.
          We&apos;re just collecting some error info, and then we&apos;ll redirect you.
        </p>

        <PercentLoader />

        <div style={{ marginTop: 40, display: 'flex', alignItems: 'flex-start', gap: 20 }}>
          <QRCode />
          <div style={{ fontSize: 13, lineHeight: 1.8, opacity: 0.9 }}>
            <p style={{ marginBottom: 8 }}>For more information about this issue and possible fixes, visit:</p>
            <p style={{ marginBottom: 16 }}>https://your-site.com/help/404</p>
            <p style={{ marginBottom: 4 }}>If you call a support person, give them this info:</p>
            <p style={{ fontFamily: 'monospace', letterSpacing: 1 }}>Stop code: PAGE_NOT_FOUND</p>
            <p style={{ fontFamily: 'monospace', letterSpacing: 1 }}>What failed: requested_route.sys</p>
          </div>
        </div>

        <Link
          href="/"
          style={{
            display: 'inline-block',
            marginTop: 40,
            color: 'white',
            fontSize: 14,
            textDecoration: 'underline',
            opacity: 0.7,
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

function PercentLoader() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPct((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.floor(Math.random() * 8) + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <p style={{ fontSize: 28, fontWeight: 300 }}>
      {Math.min(pct, 100)}% complete
    </p>
  );
}

function QRCode() {
  // Fake QR code made of divs
  const grid = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
    [1,0,1,0,0,1,1,1,0,0,1,1,0,1,1,0,1,0,1,1,0],
    [0,1,0,1,1,0,0,0,1,0,1,0,1,0,0,1,0,1,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  ];
  return (
    <div style={{ flexShrink: 0 }}>
      {grid.map((row, ri) => (
        <div key={ri} style={{ display: 'flex' }}>
          {row.map((cell, ci) => (
            <div
              key={ci}
              style={{
                width: 4,
                height: 4,
                background: cell ? 'white' : 'transparent',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
