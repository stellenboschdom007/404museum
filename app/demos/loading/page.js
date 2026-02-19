'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const messages = [
  'Initializing page loader...',
  'Locating requested resource...',
  'Reticulating splines...',
  'Generating witty error message...',
  'Searching the entire internet...',
  'Asking Stack Overflow...',
  'Consulting the ancient scrolls...',
  'Negotiating with the server hamsters...',
  'Attempting to divide by zero...',
  'Checking if the page is hiding behind the couch...',
  'Bribing the DNS resolver...',
  'Reversing the polarity of the neutron flow...',
  'Spinning up the quantum processors...',
  'Downloading more RAM...',
  'Convincing AI to help...',
  'Checking page\'s last known location...',
  'Contacting page\'s next of kin...',
  'Deploying trained search dogs...',
  'Scanning alternate dimensions...',
  'Compiling the compiler that compiles the compiler...',
  'Updating dependencies (this may take a while)...',
  'Running npm install (this will definitely take a while)...',
  'Waiting for the heat death of the universe...',
  'Almost there... just kidding.',
  'Error 404: Page still not found.',
  'Starting over...',
];

export default function LoadingPage() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loops, setLoops] = useState(0);

  useEffect(() => {
    const mi = setInterval(() => {
      setMsgIndex((i) => {
        const next = (i + 1) % messages.length;
        if (next === 0) setLoops((l) => l + 1);
        return next;
      });
    }, 2000);

    return () => clearInterval(mi);
  }, []);

  useEffect(() => {
    const pi = setInterval(() => {
      setProgress((p) => {
        // Never quite reaches 100
        if (p >= 99) return 0;
        const increment = p < 60 ? Math.random() * 8 + 2 : p < 90 ? Math.random() * 3 + 0.5 : Math.random() * 0.5;
        return Math.min(p + increment, 99.9);
      });
    }, 300);
    return () => clearInterval(pi);
  }, []);

  return (
    <div
      style={{
        background: '#111',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        padding: 40,
      }}
    >
      {/* Spinner */}
      <div style={{ marginBottom: 32, position: 'relative', width: 60, height: 60 }}>
        <div
          style={{
            width: 60,
            height: 60,
            border: '3px solid #222',
            borderTop: '3px solid #a855f7',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', maxWidth: 400, marginBottom: 16 }}>
        <div
          style={{
            height: 6,
            background: '#222',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              borderRadius: 3,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ color: '#555', fontSize: 11 }}>{progress.toFixed(1)}%</span>
          <span style={{ color: '#333', fontSize: 11 }}>
            {loops > 0 ? `Attempt #${loops + 1}` : 'Loading...'}
          </span>
        </div>
      </div>

      {/* Status message */}
      <p
        style={{
          color: '#888',
          fontSize: 14,
          textAlign: 'center',
          maxWidth: 400,
          minHeight: 40,
          transition: 'opacity 0.3s',
        }}
        key={msgIndex}
      >
        {messages[msgIndex]}
      </p>

      {/* Log output */}
      <div
        style={{
          marginTop: 32,
          width: '100%',
          maxWidth: 400,
          background: '#0a0a0a',
          border: '1px solid #222',
          borderRadius: 4,
          padding: 12,
          maxHeight: 120,
          overflow: 'hidden',
        }}
      >
        {messages.slice(Math.max(0, msgIndex - 4), msgIndex + 1).map((msg, i, arr) => (
          <p
            key={msgIndex - arr.length + i + 1}
            style={{
              fontSize: 10,
              color: i === arr.length - 1 ? '#a855f7' : '#333',
              lineHeight: 2,
            }}
          >
            <span style={{ color: '#333' }}>[{new Date().toLocaleTimeString()}]</span> {msg}
          </p>
        ))}
      </div>

      <Link
        href="/"
        style={{
          marginTop: 32,
          color: '#444',
          fontSize: 12,
          textDecoration: 'none',
        }}
      >
        ← Stop waiting
      </Link>
    </div>
  );
}
