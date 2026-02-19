'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const errorDialogs = [
  {
    title: 'Error',
    message: 'The page you requested could not be found.\n\nPage: C:\\WEBSITES\\THIS_PAGE.HTM\nError Code: 404',
    x: 120,
    y: 80,
    delay: 500,
  },
  {
    title: 'Warning',
    message: 'Not enough memory to display this page.\nClose some programs and try again.',
    x: 200,
    y: 160,
    delay: 1200,
  },
  {
    title: 'Fatal Error',
    message: 'A fatal exception 0E has occurred at\n0028:C004B3F7. The current page will\nbe terminated.',
    x: 160,
    y: 240,
    delay: 2000,
  },
  {
    title: 'Internet Explorer',
    message: 'Internet Explorer cannot display the\nwebpage.\n\nMost likely causes:\n• You are not connected to the Internet\n• The website has encountered a problem\n• The page does not exist',
    x: 280,
    y: 140,
    delay: 2800,
  },
];

export default function Win95Page() {
  const [time, setTime] = useState('');
  const [visibleDialogs, setVisibleDialogs] = useState([]);
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    errorDialogs.forEach((dialog, i) => {
      setTimeout(() => {
        setVisibleDialogs((prev) => [...prev, i]);
      }, dialog.delay);
    });
  }, []);

  return (
    <div
      style={{
        background: '#008080',
        minHeight: '100vh',
        fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", Tahoma, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        fontSize: 11,
      }}
    >
      {/* Desktop icons */}
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <DesktopIcon label="My Computer" icon="💻" />
        <DesktopIcon label="Recycle Bin" icon="🗑️" />
        <DesktopIcon label="Internet Explorer" icon="🌐" />
        <DesktopIcon label="The Missing Page" icon="📄" />
      </div>

      {/* Error dialogs */}
      {visibleDialogs.map((i) => (
        <ErrorDialog key={i} {...errorDialogs[i]} />
      ))}

      {/* Start menu */}
      {startOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 28,
            left: 0,
            width: 180,
            background: '#c0c0c0',
            border: '2px outset #fff',
            boxShadow: '2px -2px 0 rgba(0,0,0,0.2)',
            zIndex: 1000,
          }}
        >
          {/* Blue sidebar */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 24,
              background: 'linear-gradient(to top, #000080, #1084d0)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '0 0 4px 2px',
            }}
          >
            <span
              style={{
                color: '#c0c0c0',
                fontSize: 11,
                fontWeight: 700,
                writingMode: 'vertical-lr',
                transform: 'rotate(180deg)',
                letterSpacing: 2,
              }}
            >
              Page Not Found
            </span>
          </div>

          <div style={{ marginLeft: 24, padding: 2 }}>
            <MenuItem icon="📁" label="Programs" />
            <MenuItem icon="📄" label="Documents" />
            <MenuItem icon="⚙️" label="Settings" />
            <MenuItem icon="🔍" label="Find Page..." />
            <hr style={{ border: 'none', borderTop: '1px solid #808080', borderBottom: '1px solid #fff', margin: '2px 4px' }} />
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 8px',
                textDecoration: 'none',
                color: '#000',
              }}
            >
              <span>🏠</span>
              <span style={{ fontSize: 11 }}>Go Home</span>
            </Link>
            <hr style={{ border: 'none', borderTop: '1px solid #808080', borderBottom: '1px solid #fff', margin: '2px 4px' }} />
            <MenuItem icon="🔌" label="Shut Down..." />
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 28,
          background: '#c0c0c0',
          borderTop: '2px outset #fff',
          display: 'flex',
          alignItems: 'center',
          padding: '0 4px',
          gap: 4,
          zIndex: 999,
        }}
      >
        {/* Start button */}
        <button
          onClick={() => setStartOpen((s) => !s)}
          style={{
            height: 22,
            padding: '0 8px',
            background: '#c0c0c0',
            border: startOpen ? '2px inset #808080' : '2px outset #fff',
            fontFamily: 'inherit',
            fontSize: 11,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 14 }}>🪟</span> Start
        </button>

        {/* Divider */}
        <div style={{ width: 2, height: 20, borderLeft: '1px solid #808080', borderRight: '1px solid #fff' }} />

        {/* Task button */}
        <div
          style={{
            height: 22,
            padding: '0 8px',
            background: '#c0c0c0',
            border: '2px inset #808080',
            fontSize: 11,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            flex: 'none',
          }}
        >
          🌐 Error 404 - Internet E...
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Clock */}
        <div
          style={{
            border: '2px inset #808080',
            padding: '0 8px',
            height: 22,
            display: 'flex',
            alignItems: 'center',
            fontSize: 11,
          }}
        >
          {time}
        </div>
      </div>
    </div>
  );
}

function DesktopIcon({ label, icon }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 70,
        gap: 4,
        cursor: 'default',
      }}
    >
      <span style={{ fontSize: 32 }}>{icon}</span>
      <span
        style={{
          color: 'white',
          fontSize: 11,
          textAlign: 'center',
          textShadow: '1px 1px 1px rgba(0,0,0,0.8)',
          lineHeight: 1.3,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function ErrorDialog({ title, message, x, y }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: Math.min(x, typeof window !== 'undefined' ? window.innerWidth - 320 : 400),
        top: y,
        width: 300,
        background: '#c0c0c0',
        border: '2px outset #fff',
        boxShadow: '3px 3px 0 rgba(0,0,0,0.3)',
        zIndex: 100 + y,
        animation: 'dialogPop 0.15s ease-out',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, #000080, #1084d0)',
          color: 'white',
          padding: '3px 4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        <span>{title}</span>
        <button
          style={{
            width: 16,
            height: 14,
            background: '#c0c0c0',
            border: '2px outset #fff',
            fontSize: 9,
            lineHeight: '8px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            padding: 0,
          }}
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: 16, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 28, flexShrink: 0 }}>
          {title === 'Warning' ? '⚠️' : '❌'}
        </span>
        <p style={{ whiteSpace: 'pre-wrap', fontSize: 11, lineHeight: 1.6, color: '#000' }}>
          {message}
        </p>
      </div>

      {/* Button */}
      <div style={{ padding: '4px 16px 12px', textAlign: 'center' }}>
        <button
          style={{
            padding: '4px 24px',
            background: '#c0c0c0',
            border: '2px outset #fff',
            fontSize: 11,
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          OK
        </button>
      </div>

      <style>{`@keyframes dialogPop { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  );
}

function MenuItem({ icon, label }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 8px',
        cursor: 'default',
      }}
    >
      <span>{icon}</span>
      <span style={{ fontSize: 11 }}>{label}</span>
    </div>
  );
}
