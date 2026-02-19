'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';

export default function LiveBackground() {
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  const colorsRef = useRef([]);
  const nextColorsRef = useRef([]);
  const colorTransitionRef = useRef(0);
  const positionsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
    setIsMobile(mobile);
    if (mobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const isDark = theme === 'dark';

    // Palette adapts to theme
    const darkPalette = [
      'hsl(265, 65%, 32%)',    // Purple
      'hsl(240, 60%, 30%)',    // Indigo
      'hsl(200, 70%, 28%)',    // Deep teal-blue
      'hsl(280, 60%, 30%)',    // Violet
      'hsl(180, 55%, 25%)',    // Dark cyan
      'hsl(320, 55%, 28%)',    // Magenta-purple
      'hsl(220, 70%, 30%)',    // Royal blue
      'hsl(300, 50%, 26%)',    // Deep magenta
      'hsl(160, 50%, 22%)',    // Dark emerald
      'hsl(250, 70%, 34%)',    // Bright indigo
    ];

    const lightPalette = [
      'hsl(265, 60%, 85%)',    // Soft purple
      'hsl(240, 55%, 88%)',    // Soft indigo
      'hsl(200, 60%, 86%)',    // Soft teal-blue
      'hsl(280, 55%, 87%)',    // Soft violet
      'hsl(180, 50%, 85%)',    // Soft cyan
      'hsl(320, 50%, 86%)',    // Soft magenta-purple
      'hsl(220, 60%, 88%)',    // Soft royal blue
      'hsl(300, 45%, 87%)',    // Soft magenta
      'hsl(160, 45%, 85%)',    // Soft emerald
      'hsl(250, 60%, 88%)',    // Soft bright indigo
    ];

    const palette = isDark ? darkPalette : lightPalette;

    const generateVibrantColor = () => {
      return palette[Math.floor(Math.random() * palette.length)];
    };

    // Parse HSL color and return components
    const parseHSL = (hslStr) => {
      const match = hslStr.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
      return {
        h: parseInt(match[1]),
        s: parseInt(match[2]),
        l: parseInt(match[3]),
      };
    };

    // Interpolate between two HSL colors
    const interpolateHSL = (hsl1, hsl2, t) => {
      const h = hsl1.h + (hsl2.h - hsl1.h) * t;
      const s = hsl1.s + (hsl2.s - hsl1.s) * t;
      const l = hsl1.l + (hsl2.l - hsl1.l) * t;
      return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
    };

    colorsRef.current = Array(5)
      .fill(0)
      .map(() => generateVibrantColor());

    nextColorsRef.current = Array(5)
      .fill(0)
      .map(() => generateVibrantColor());

    // Initialize positions with slow, fluid movement
    positionsRef.current = Array(5)
      .fill(0)
      .map(() => ({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        vx: (Math.random() - 0.5) * 0.0015,
        vy: (Math.random() - 0.5) * 0.0015,
      }));

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const baseFill = isDark ? '#06060f' : '#f0f2f8';
    const blobAlpha = isDark ? 0.5 : 0.35;

    // Animation loop
    let animId;
    const animate = () => {
      timeRef.current += 0.016;

      // Smoothly transition to new colors
      colorTransitionRef.current += 0.004;
      if (colorTransitionRef.current >= 1) {
        colorTransitionRef.current = 0;
        colorsRef.current = nextColorsRef.current.slice();
        nextColorsRef.current = Array(5)
          .fill(0)
          .map(() => generateVibrantColor());
      }

      // Update positions with very smooth, fluid movement
      positionsRef.current.forEach((pos) => {
        pos.x += pos.vx;
        pos.y += pos.vy;

        pos.vx += (Math.random() - 0.5) * 0.0002;
        pos.vy += (Math.random() - 0.5) * 0.0002;

        pos.vx *= 0.99;
        pos.vy *= 0.99;

        if (pos.x > 1.5) { pos.x = 1.5; pos.vx *= -0.3; }
        if (pos.x < -1.5) { pos.x = -1.5; pos.vx *= -0.3; }
        if (pos.y > 1.5) { pos.y = 1.5; pos.vy *= -0.3; }
        if (pos.y < -1.5) { pos.y = -1.5; pos.vy *= -0.3; }
      });

      ctx.fillStyle = baseFill;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create overlapping radial gradients for liquid/water effect
      for (let i = 0; i < positionsRef.current.length; i++) {
        const pos = positionsRef.current[i];
        const x = canvas.width * 0.5 + pos.x * canvas.width * 0.35;
        const y = canvas.height * 0.5 + pos.y * canvas.height * 0.35;
        const radius = Math.max(canvas.width, canvas.height) * 0.9;

        const hsl1 = parseHSL(colorsRef.current[i]);
        const hsl2 = parseHSL(nextColorsRef.current[i]);
        const interpolatedColor = interpolateHSL(hsl1, hsl2, colorTransitionRef.current);

        const hsl1Next = parseHSL(colorsRef.current[(i + 1) % colorsRef.current.length]);
        const hsl2Next = parseHSL(nextColorsRef.current[(i + 1) % nextColorsRef.current.length]);
        const interpolatedColorNext = interpolateHSL(hsl1Next, hsl2Next, colorTransitionRef.current);

        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, interpolatedColor);
        grad.addColorStop(0.4, interpolatedColorNext);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.globalAlpha = blobAlpha;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  // Static background fallback for mobile
  if (isMobile) {
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #06060f 0%, #0d0a1a 50%, #06060f 100%)'
            : 'linear-gradient(135deg, #f0f2f8 0%, #e8e6f0 50%, #f0f2f8 100%)',
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 h-full w-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
