'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LiveBackground from './LiveBackground';
import Particles from './Particles';
import CustomCursor from './CustomCursor';
import { cybersecurityLines } from './presets';

/**
 * TerminalNotFound — A customisable cybersecurity-themed 404 page.
 *
 * @param {Object}   props
 * @param {Array}    props.lines           - Terminal output lines array (see presets.js)
 * @param {string}   props.title           - Large heading text (default: "404")
 * @param {string}   props.statusText      - Small label above heading (default: "HTTP 404 — Not Found")
 * @param {string}   props.subtitle        - Text below heading
 * @param {string}   props.terminalUser    - Username in terminal title bar (default: "user@terminal: ~")
 * @param {string}   props.homeUrl         - URL for the back button (default: "/")
 * @param {string}   props.homeLabel       - Label for the back button (default: "← Back to Home")
 * @param {Array}    props.extraActions    - Additional buttons: [{ href, label, external? }]
 * @param {string}   props.footerText      - Small footer text
 * @param {boolean}  props.showBackground  - Show animated gradient background (default: true)
 * @param {boolean}  props.showParticles   - Show particle constellation (default: true)
 * @param {boolean}  props.showCursor      - Show custom cursor (default: true)
 * @param {string}   props.cursorColor     - CSS color for cursor glow (default: "200, 150, 255")
 * @param {string}   props.accentFrom      - CSS color for button gradient start (default: "#9333ea")
 * @param {string}   props.accentTo        - CSS color for button gradient end (default: "#4f46e5")
 * @param {string}   props.gradientColors  - CSS gradient for the big title (default: "135deg, #a855f7, #06b6d4")
 * @param {Function} props.renderLine      - Custom render function for each terminal line: (line, index) => JSX
 * @param {React.ReactNode} props.children - Extra content injected after the terminal window
 */
export default function TerminalNotFound({
  lines = cybersecurityLines,
  title = '404',
  statusText = 'HTTP 404 — Not Found',
  subtitle = 'Host unreachable. Packet lost. The void.',
  terminalUser = 'user@terminal: ~',
  homeUrl = '/',
  homeLabel = '← Back to Home',
  extraActions = [],
  footerText = 'error code 0x404 · page_not_found · null_ptr_dereference',
  showBackground = true,
  showParticles = true,
  showCursor = true,
  cursorColor = '200, 150, 255',
  accentFrom = '#9333ea',
  accentTo = '#4f46e5',
  gradientColors = '135deg, #a855f7, #06b6d4',
  renderLine,
  children,
}) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timers = lines.map((line) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [lines]);

  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(interval);
  }, []);

  const defaultRenderLine = (line, i) => {
    const colorClass =
      line.special === 'red'
        ? 'text-red-400/90'
        : line.special === 'green'
        ? 'text-green-400/90'
        : line.special === 'yellow'
        ? 'text-yellow-400/90'
        : line.special === 'cyan'
        ? 'text-cyan-400/90'
        : line.text.startsWith('$')
        ? 'text-cyan-400/90'
        : line.text.startsWith(' ')
        ? 'text-white/50'
        : 'text-white/70';

    return (
      <div key={i} className={`leading-relaxed ${colorClass}`}>
        {line.text || '\u00A0'}
      </div>
    );
  };

  const lineRenderer = renderLine || defaultRenderLine;

  return (
    <>
      {showBackground && <LiveBackground />}
      {showParticles && <Particles />}
      {showCursor && <CustomCursor color={cursorColor} />}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-24">
        {/* Heading */}
        <div className="text-center mb-10">
          {statusText && (
            <p className="text-xs font-mono text-fg/40 uppercase tracking-[0.3em] mb-3">
              {statusText}
            </p>
          )}
          <h1
            className="text-[5rem] sm:text-[8rem] md:text-[12rem] font-black leading-none select-none"
            style={{
              background: `linear-gradient(${gradientColors})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-xl text-fg/60 mt-2">{subtitle}</p>
          )}
        </div>

        {/* Terminal window */}
        <div className="w-full max-w-xl rounded-xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-sm">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-white/30 font-mono">{terminalUser}</span>
          </div>
          {/* Body */}
          <div className="p-5 font-mono text-sm min-h-70">
            {visibleLines.map((line, i) => lineRenderer(line, i))}
            <span
              className={`inline-block w-2 h-4 bg-cyan-400/80 align-middle transition-opacity duration-100 ${
                blink ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        </div>

        {/* Extra children slot */}
        {children}

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mt-10 justify-center">
          {homeUrl && (
            <Link
              href={homeUrl}
              className="rounded-lg px-7 py-3 text-sm font-semibold text-white hover:brightness-110 transition-all hover:scale-[1.02]"
              style={{ background: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}
            >
              {homeLabel}
            </Link>
          )}
          {extraActions.map((action, i) =>
            action.external ? (
              <a
                key={i}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-fg/20 px-7 py-3 text-sm font-medium text-fg hover:bg-fg/10 transition-all"
              >
                {action.label}
              </a>
            ) : (
              <Link
                key={i}
                href={action.href}
                className="rounded-lg border border-fg/20 px-7 py-3 text-sm font-medium text-fg hover:bg-fg/10 transition-all"
              >
                {action.label}
              </Link>
            )
          )}
        </div>

        {footerText && (
          <p className="mt-8 text-xs text-fg/25 font-mono">{footerText}</p>
        )}
      </div>
    </>
  );
}
