'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';

// Generate a maze using recursive backtracking
function generateMaze(cols, rows) {
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ top: true, right: true, bottom: true, left: true, visited: false }))
  );

  const stack = [];
  const start = { r: 0, c: 0 };
  grid[0][0].visited = true;
  stack.push(start);

  while (stack.length > 0) {
    const { r, c } = stack[stack.length - 1];
    const neighbors = [];
    if (r > 0 && !grid[r - 1][c].visited) neighbors.push({ r: r - 1, c, dir: 'top' });
    if (r < rows - 1 && !grid[r + 1][c].visited) neighbors.push({ r: r + 1, c, dir: 'bottom' });
    if (c > 0 && !grid[r][c - 1].visited) neighbors.push({ r, c: c - 1, dir: 'left' });
    if (c < cols - 1 && !grid[r][c + 1].visited) neighbors.push({ r, c: c + 1, dir: 'right' });

    if (neighbors.length === 0) {
      stack.pop();
    } else {
      const ni = Math.floor(Math.random() * neighbors.length);
      const next = neighbors[ni];
      // Remove walls
      if (next.dir === 'top') { grid[r][c].top = false; grid[next.r][next.c].bottom = false; }
      if (next.dir === 'bottom') { grid[r][c].bottom = false; grid[next.r][next.c].top = false; }
      if (next.dir === 'left') { grid[r][c].left = false; grid[next.r][next.c].right = false; }
      if (next.dir === 'right') { grid[r][c].right = false; grid[next.r][next.c].left = false; }
      grid[next.r][next.c].visited = true;
      stack.push(next);
    }
  }

  return grid;
}

const COLS = 11;
const ROWS = 11;

export default function MazePage() {
  const [maze] = useState(() => generateMaze(COLS, ROWS));
  const [pos, setPos] = useState({ r: 0, c: 0 });
  const [moves, setMoves] = useState(0);
  const [message, setMessage] = useState('');
  const containerRef = useRef(null);

  const move = useCallback((dir) => {
    setPos((p) => {
      const cell = maze[p.r][p.c];
      let nr = p.r, nc = p.c;
      if (dir === 'up' && !cell.top) nr--;
      else if (dir === 'down' && !cell.bottom) nr++;
      else if (dir === 'left' && !cell.left) nc--;
      else if (dir === 'right' && !cell.right) nc++;
      else return p;

      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) return p;
      setMoves((m) => m + 1);

      // Check if reached "exit" area (bottom-right) — but there's no actual exit
      if (nr === ROWS - 1 && nc === COLS - 1) {
        setMessage('...there is no exit. The page was never here.');
      }
      return { r: nr, c: nc };
    });
  }, [maze]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') move('up');
      if (e.key === 'ArrowDown' || e.key === 's') move('down');
      if (e.key === 'ArrowLeft' || e.key === 'a') move('left');
      if (e.key === 'ArrowRight' || e.key === 'd') move('right');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [move]);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const cellSize = typeof window !== 'undefined' ? Math.min(Math.floor((Math.min(window.innerWidth, window.innerHeight) - 160) / COLS), 40) : 30;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      style={{
        background: '#0a0a0a',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        color: '#888',
        padding: 20,
        outline: 'none',
      }}
    >
      <p style={{ fontSize: 11, letterSpacing: 4, color: '#444', marginBottom: 16 }}>
        FIND THE PAGE
      </p>

      <div style={{ position: 'relative' }}>
        {maze.map((row, ri) => (
          <div key={ri} style={{ display: 'flex' }}>
            {row.map((cell, ci) => (
              <div
                key={ci}
                style={{
                  width: cellSize,
                  height: cellSize,
                  borderTop: cell.top ? '1px solid #333' : '1px solid transparent',
                  borderRight: cell.right ? '1px solid #333' : '1px solid transparent',
                  borderBottom: cell.bottom ? '1px solid #333' : '1px solid transparent',
                  borderLeft: cell.left ? '1px solid #333' : '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  background: pos.r === ri && pos.c === ci ? 'rgba(147, 51, 234, 0.3)' : 'transparent',
                }}
              >
                {pos.r === ri && pos.c === ci && (
                  <div style={{ width: cellSize * 0.5, height: cellSize * 0.5, borderRadius: '50%', background: '#a855f7' }} />
                )}
                {ri === ROWS - 1 && ci === COLS - 1 && !(pos.r === ri && pos.c === ci) && (
                  <span style={{ fontSize: cellSize * 0.4, opacity: 0.3 }}>?</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#555' }}>Moves: {moves}</p>
        {message && <p style={{ fontSize: 14, color: '#a855f7', marginTop: 12, maxWidth: 300 }}>{message}</p>}
      </div>

      {/* Mobile controls */}
      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 44px)', gap: 4 }}>
        <div />
        <button onClick={() => move('up')} style={btnStyle}>↑</button>
        <div />
        <button onClick={() => move('left')} style={btnStyle}>←</button>
        <button onClick={() => move('down')} style={btnStyle}>↓</button>
        <button onClick={() => move('right')} style={btnStyle}>→</button>
      </div>

      <Link href="/" style={{ marginTop: 24, color: '#555', fontSize: 12, textDecoration: 'none' }}>
        ← give up
      </Link>
    </div>
  );
}

const btnStyle = {
  width: 44,
  height: 44,
  background: '#1a1a1a',
  border: '1px solid #333',
  color: '#888',
  fontSize: 18,
  borderRadius: 6,
  cursor: 'pointer',
};
