'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UnderConstructionPage() {
  const [counter, setCounter] = useState(1337);
  const [marqueeOffset, setMarqueeOffset] = useState(0);

  useEffect(() => {
    const ci = setInterval(() => setCounter((c) => c + 1), 3000);
    const mi = setInterval(() => setMarqueeOffset((o) => o - 1), 30);
    return () => { clearInterval(ci); clearInterval(mi); };
  }, []);

  return (
    <div
      style={{
        background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'20\' height=\'20\' fill=\'%23c0c0c0\'/%3E%3Crect width=\'10\' height=\'10\' fill=\'%23b0b0b0\'/%3E%3Crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%23b0b0b0\'/%3E%3C/svg%3E")',
        minHeight: '100vh',
        fontFamily: '"Comic Sans MS", "Comic Sans", cursive, sans-serif',
        padding: 20,
      }}
    >
      {/* Construction bar top */}
      <div
        style={{
          height: 20,
          background: 'repeating-linear-gradient(45deg, #ffd700 0px, #ffd700 10px, #111 10px, #111 20px)',
          marginBottom: 16,
        }}
      />

      <div style={{ maxWidth: 700, margin: '0 auto', background: 'white', border: '3px solid #000080', padding: 20 }}>
        {/* Header with animated GIF placeholder */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 40 }}>🚧</span>
          <span style={{ fontSize: 40 }}>👷</span>
          <span style={{ fontSize: 40 }}>🚧</span>
        </div>

        {/* Spinning rainbow text */}
        <h1
          style={{
            textAlign: 'center',
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 8,
            background: 'linear-gradient(90deg, red, orange, yellow, green, blue, purple)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          UNDER CONSTRUCTION!!!
        </h1>

        <hr style={{ border: 'none', borderTop: '3px double #000080', margin: '16px 0' }} />

        {/* Marquee text */}
        <div style={{ overflow: 'hidden', height: 24, background: '#000', marginBottom: 16 }}>
          <p style={{ color: '#0f0', fontSize: 14, fontFamily: 'monospace', whiteSpace: 'nowrap', transform: `translateX(${marqueeOffset}px)` }}>
            ★★★ This page is currently under construction! Come back later! ★★★ Error 404: Page not found! ★★★ Best viewed in Netscape Navigator at 800x600 ★★★
          </p>
        </div>

        {/* Content */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
          <tbody>
            <tr>
              <td style={{ width: 100, verticalAlign: 'top', padding: 8 }}>
                <div style={{ fontSize: 50, textAlign: 'center', animation: 'spin 2s linear infinite' }}>🔨</div>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              </td>
              <td style={{ padding: 8, fontSize: 14, lineHeight: 1.8, color: '#333' }}>
                <p style={{ marginBottom: 8 }}>
                  <b>Welcome to my <font color="blue">AWESOME</font> webpage!!!</b>
                </p>
                <p style={{ marginBottom: 8 }}>
                  Sorry, the page you were looking for is still being built! 😅
                  I&apos;m working really hard on it, I promise!! Check back soon!!!
                </p>
                <p style={{ marginBottom: 8 }}>
                  In the meantime, please sign my <u style={{ color: 'blue', cursor: 'pointer' }}>guestbook</u>! 📖
                </p>
                <p>
                  <b>Cool links:</b><br />
                  🔗 <u style={{ color: 'blue' }}>My other page</u><br />
                  🔗 <u style={{ color: 'blue' }}>Download Winamp</u><br />
                  🔗 <u style={{ color: 'blue' }}>AltaVista search</u>
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        <hr style={{ border: 'none', borderTop: '1px solid #999', margin: '16px 0' }} />

        {/* Webring & counter */}
        <div style={{ textAlign: 'center', fontSize: 12, color: '#666' }}>
          <p style={{ marginBottom: 8 }}>
            [ ← Prev | <b>404 Webring</b> | Next → ]
          </p>
          <div
            style={{
              display: 'inline-block',
              background: '#000',
              color: '#0f0',
              padding: '4px 12px',
              fontFamily: 'monospace',
              fontSize: 14,
              border: '2px inset #666',
            }}
          >
            Visitors: {counter.toLocaleString()}
          </div>
          <p style={{ marginTop: 8, fontSize: 10, color: '#999' }}>
            Last updated: January 15, 1999
          </p>
          <p style={{ marginTop: 4, fontSize: 10 }}>
            <span style={{ color: '#999' }}>Made with </span>
            <span style={{ fontSize: 14 }}>❤️</span>
            <span style={{ color: '#999' }}> in Notepad</span>
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link
            href="/"
            style={{
              color: '#000080',
              fontSize: 14,
              textDecoration: 'underline',
            }}
          >
            ← Back to Home (it actually works!)
          </Link>
        </div>
      </div>

      {/* Construction bar bottom */}
      <div
        style={{
          height: 20,
          background: 'repeating-linear-gradient(45deg, #ffd700 0px, #ffd700 10px, #111 10px, #111 20px)',
          marginTop: 16,
        }}
      />
    </div>
  );
}
