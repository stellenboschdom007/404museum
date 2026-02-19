'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const FULL_TEXT = `ERROR 404
=========

Dear Visitor,

It is with considerable regret that we must inform you the page you have requested cannot be located at this time.

Our records indicate the following:

  - Route: /the/page/you/wanted
  - Status: MISSING
  - Last Modified: Unknown
  - Author: Departed

An exhaustive search of our servers has yielded no results. The page may have been moved, deleted, or perhaps it was merely a figment of a hopeful imagination.

We apologize for the inconvenience.

Sincerely,
The Server

P.S. If found, please return to the nearest web browser.`;

export default function TypewriterPage() {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current >= FULL_TEXT.length) {
        setDone(true);
        clearInterval(interval);
        return;
      }
      indexRef.current++;
      setText(FULL_TEXT.slice(0, indexRef.current));
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: '#f4edd8',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
      }}
    >
      <div
        style={{
          maxWidth: 600,
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Paper */}
        <div
          style={{
            background: '#faf6e9',
            padding: '60px 60px 80px',
            boxShadow: '0 2px 20px rgba(0,0,0,0.1), inset 0 0 80px rgba(0,0,0,0.02)',
            position: 'relative',
            minHeight: 500,
          }}
        >
          {/* Paper texture lines */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(transparent 0px, transparent 27px, rgba(0,0,0,0.03) 28px)',
              pointerEvents: 'none',
            }}
          />

          {/* Red margin line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 50,
              width: 1,
              background: 'rgba(220, 50, 50, 0.15)',
            }}
          />

          {/* Coffee stain */}
          <div
            style={{
              position: 'absolute',
              top: 30,
              right: 40,
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '2px solid rgba(139, 90, 43, 0.08)',
              background: 'rgba(139, 90, 43, 0.02)',
            }}
          />

          {/* Typed text */}
          <pre
            style={{
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: 14,
              lineHeight: 2,
              color: '#2a2a2a',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              position: 'relative',
              margin: 0,
            }}
          >
            {text}
            {!done && <span style={{ borderRight: '2px solid #333', animation: 'cursorBlink 0.6s infinite' }}>&nbsp;</span>}
          </pre>
          <style>{`@keyframes cursorBlink { 0%, 100% { border-color: #333; } 50% { border-color: transparent; } }`}</style>

          {/* Ink smudge */}
          <div
            style={{
              position: 'absolute',
              bottom: 120,
              right: 80,
              width: 30,
              height: 8,
              background: 'rgba(0,0,0,0.04)',
              borderRadius: '50%',
              transform: 'rotate(-15deg)',
            }}
          />
        </div>

        {done && (
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link
              href="/"
              style={{
                fontFamily: '"Courier New", monospace',
                color: '#8b7355',
                fontSize: 13,
                textDecoration: 'none',
                borderBottom: '1px solid #8b7355',
              }}
            >
              ← Remove paper from typewriter
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
