'use client';

import Link from 'next/link';

const terminal = [
  { href: '/demos/red-team', label: 'Red Team / Hacker' },
  { href: '/demos/devops', label: 'DevOps / Cloud' },
  { href: '/demos/matrix', label: 'Retro / Matrix' },
  { href: '/demos/glitch', label: 'Glitch / Corrupted' },
  { href: '/demos/space', label: 'Space / Void' },
];

const other = [
  { href: '/demos/bsod', label: 'Blue Screen of Death' },
  { href: '/demos/radar', label: 'Radar / Sonar' },
  { href: '/demos/static', label: 'TV Static / No Signal' },
  { href: '/demos/redacted', label: 'Classified / Redacted' },
  { href: '/demos/deep-sea', label: 'Deep Sea / Underwater' },
  { href: '/demos/shattered', label: 'Shattered Glass' },
  { href: '/demos/arcade', label: 'Arcade / Game Over' },
  { href: '/demos/win95', label: 'Windows 95 / Retro OS' },
  { href: '/demos/maze', label: 'Unsolvable Maze' },
  { href: '/demos/falling', label: 'Falling Physics' },
  { href: '/demos/ouija', label: 'Ouija Board' },
  { href: '/demos/black-hole', label: 'Black Hole' },
  { href: '/demos/crime-scene', label: 'Crime Scene' },
  { href: '/demos/breaking-news', label: 'Breaking News' },
  { href: '/demos/typewriter', label: 'Typewriter' },
  { href: '/demos/construction', label: 'Under Construction' },
  { href: '/demos/elevator', label: 'Elevator' },
  { href: '/demos/loading', label: 'Loading Forever' },
  { href: '/demos/gallery', label: 'Art Gallery' },
  { href: '/demos/autopsy', label: 'Autopsy Report' },
];

export default function Home() {
  return (
    <div style={{ fontFamily: 'monospace', padding: 40, background: '#111', color: '#ccc', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 24, marginBottom: 4, color: '#fff' }}>terminal-not-found</h1>
      <p style={{ color: '#555', marginBottom: 32, fontSize: 13 }}>jank preview page — pick a demo</p>

      <h2 style={{ fontSize: 14, color: '#888', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 2 }}>Terminal themes</h2>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
        {terminal.map((p) => (
          <li key={p.href}>
            <Link href={p.href} style={{ color: '#a78bfa', textDecoration: 'underline', fontSize: 15 }}>{p.label}</Link>
            <span style={{ color: '#333', marginLeft: 8 }}>{p.href}</span>
          </li>
        ))}
      </ul>

      <h2 style={{ fontSize: 14, color: '#888', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 2 }}>Non-terminal themes</h2>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
        {other.map((p) => (
          <li key={p.href}>
            <Link href={p.href} style={{ color: '#34d399', textDecoration: 'underline', fontSize: 15 }}>{p.label}</Link>
            <span style={{ color: '#333', marginLeft: 8 }}>{p.href}</span>
          </li>
        ))}
      </ul>

      <hr style={{ border: 'none', borderTop: '1px solid #222', margin: '24px 0' }} />
      <Link href="/demos" style={{ color: '#666', fontSize: 13 }}>fancy gallery →</Link>
    </div>
  );
}
