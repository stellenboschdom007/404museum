'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor({ color = '200, 150, 255' }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices
    if (window.innerWidth < 768 || 'ontouchstart' in window) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Track actual mouse position
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Hide default cursor
    document.body.style.cursor = 'none';

    window.addEventListener('mousemove', handleMouseMove);

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth cursor movement (easing)
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.2;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.2;

      const x = smoothMouseRef.current.x;
      const y = smoothMouseRef.current.y;

      // Draw outer glow
      const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, 25);
      outerGlow.addColorStop(0, `rgba(${color}, 0.3)`);
      outerGlow.addColorStop(0.7, `rgba(${color}, 0.1)`);
      outerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = outerGlow;
      ctx.fillRect(x - 25, y - 25, 50, 50);

      // Draw middle glow
      const middleGlow = ctx.createRadialGradient(x, y, 0, x, y, 15);
      middleGlow.addColorStop(0, `rgba(${color}, 0.5)`);
      middleGlow.addColorStop(0.8, `rgba(${color}, 0.2)`);
      middleGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = middleGlow;
      ctx.fillRect(x - 15, y - 15, 30, 30);

      // Draw core orb
      ctx.fillStyle = `rgba(${color}, 0.8)`;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();

      // Draw inner bright core
      ctx.fillStyle = `rgba(${color}, 1)`;
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none hidden md:block"
      style={{ zIndex: 9999 }}
    />
  );
}
