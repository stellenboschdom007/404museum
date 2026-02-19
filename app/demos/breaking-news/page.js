'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const headlines = [
  'PAGE MISSING: Officials confirm 404 error at popular website',
  'SEARCH CONTINUES: "We may never find this page," says engineer',
  'EXPERTS BAFFLED: No trace of requested URL in server logs',
  'WEB COMMUNITY IN SHOCK: Beloved page vanishes without warning',
];

const ticker = [
  'BREAKING: Server returns 404 for requested resource',
  'DNS lookup successful but page not found on host',
  'Cache invalidated — page confirmed missing from CDN',
  'Developers "looking into it" — no ETA for recovery',
  'Stack Overflow post about this error receives 10,000 views',
  'User reports suggest page may have never existed',
  'Load balancer confirms: page not on any backend node',
  'Incident response team deployed to investigate missing page',
];

export default function BreakingNewsPage() {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [tickerOffset, setTickerOffset] = useState(0);
  const [liveSeconds, setLiveSeconds] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const hi = setInterval(() => setHeadlineIdx((i) => (i + 1) % headlines.length), 5000);
    const ti = setInterval(() => setTickerOffset((o) => o + 1), 30);
    const li = setInterval(() => setLiveSeconds((s) => s + 1), 1000);
    const bi = setInterval(() => setShowBanner((b) => !b), 800);

    return () => { clearInterval(hi); clearInterval(ti); clearInterval(li); clearInterval(bi); };
  }, []);

  const tickerText = ticker.join('  ///  ');

  return (
    <div
      style={{
        background: '#111',
        minHeight: '100vh',
        fontFamily: 'Arial, Helvetica, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Top bar */}
      <div style={{ background: '#b91c1c', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'white', fontWeight: 900, fontSize: 14, letterSpacing: 2 }}>404 NEWS NETWORK</span>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        {/* LIVE badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div
            style={{
              background: showBanner ? '#b91c1c' : '#991b1b',
              color: 'white',
              padding: '4px 12px',
              fontWeight: 900,
              fontSize: 12,
              letterSpacing: 3,
            }}
          >
            ● LIVE
          </div>
          <span style={{ color: '#666', fontSize: 11, fontFamily: 'monospace' }}>
            {String(Math.floor(liveSeconds / 60)).padStart(2, '0')}:{String(liveSeconds % 60).padStart(2, '0')}
          </span>
        </div>

        {/* BREAKING NEWS banner */}
        <div
          style={{
            background: 'linear-gradient(90deg, #b91c1c, #dc2626, #b91c1c)',
            padding: '12px 40px',
            marginBottom: 24,
            position: 'relative',
          }}
        >
          <p style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(18px, 4vw, 32px)', letterSpacing: 4, textAlign: 'center' }}>
            BREAKING NEWS
          </p>
          {/* Corner accents */}
          <div style={{ position: 'absolute', top: -2, left: -2, width: 8, height: 8, borderTop: '2px solid white', borderLeft: '2px solid white' }} />
          <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderTop: '2px solid white', borderRight: '2px solid white' }} />
          <div style={{ position: 'absolute', bottom: -2, left: -2, width: 8, height: 8, borderBottom: '2px solid white', borderLeft: '2px solid white' }} />
          <div style={{ position: 'absolute', bottom: -2, right: -2, width: 8, height: 8, borderBottom: '2px solid white', borderRight: '2px solid white' }} />
        </div>

        {/* Headline */}
        <p
          style={{
            color: 'white',
            fontSize: 'clamp(16px, 3vw, 28px)',
            fontWeight: 700,
            textAlign: 'center',
            maxWidth: 600,
            lineHeight: 1.5,
            marginBottom: 16,
          }}
          key={headlineIdx}
        >
          {headlines[headlineIdx]}
        </p>

        {/* Sub-details */}
        <div style={{
          display: 'flex', gap: 24, color: '#666', fontSize: 12, marginBottom: 40,
          flexWrap: 'wrap', justifyContent: 'center',
        }}>
          <span>Source: Server Access Logs</span>
          <span>|</span>
          <span>Status: Unresolved</span>
          <span>|</span>
          <span>Response Code: 404</span>
        </div>

        <Link
          href="/"
          style={{
            padding: '10px 24px',
            border: '1px solid #444',
            borderRadius: 4,
            color: '#888',
            fontSize: 13,
            textDecoration: 'none',
          }}
        >
          ← Return to Coverage
        </Link>
      </div>

      {/* Ticker bar */}
      <div
        style={{
          background: '#1a1a1a',
          borderTop: '3px solid #b91c1c',
          padding: '10px 0',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex' }}>
          <div style={{ background: '#b91c1c', padding: '0 16px', display: 'flex', alignItems: 'center', flexShrink: 0, zIndex: 2 }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: 12, letterSpacing: 2 }}>ALERT</span>
          </div>
          <div
            style={{
              color: 'white',
              fontSize: 13,
              transform: `translateX(-${tickerOffset}px)`,
              paddingLeft: 20,
            }}
          >
            {tickerText}{'  ///  '}{tickerText}
          </div>
        </div>
      </div>
    </div>
  );
}
