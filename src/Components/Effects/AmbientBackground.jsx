import { useEffect, useRef } from 'react'

const LINK_DISTANCE = 130;
const MOUSE_RADIUS = 160;

// Fixed, full-screen particle network that drifts behind the whole site.
// Particles connect when close, gently push away from the cursor, and shift
// with scroll for a parallax feel.
export const AmbientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let particles = [];
    let frame = 0;

    const createParticles = () => {
      const count = Math.round(Math.min(90, (width * height) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        depth: Math.random() * 0.6 + 0.2, // parallax factor
        orange: Math.random() < 0.35,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const light = document.documentElement.dataset.theme === 'light';
      const linkAlpha = light ? 0.28 : 0.18;
      const dotColor = light ? 'rgba(120, 84, 52, 0.4)' : 'rgba(148, 163, 184, 0.45)';
      const scroll = window.scrollY;

      // Screen positions including scroll parallax, wrapped to the viewport.
      const pts = particles.map((p) => {
        const y = (((p.y - scroll * p.depth * 0.3) % height) + height) % height;
        return { x: p.x, y, p };
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * linkAlpha;
            ctx.strokeStyle = `rgba(241, 102, 10, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      for (const { x, y, p } of pts) {
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.orange ? 'rgba(241, 102, 10, 0.75)' : dotColor;
        ctx.fill();
      }

      return pts;
    };

    const step = () => {
      const pts = draw();
      pts.forEach(({ x, y, p }) => {
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.6;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = ((p.y % height) + height) % height;
      });
      frame = requestAnimationFrame(step);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduceMotion) frame = requestAnimationFrame(step);
    };
    const onScroll = () => {
      if (reduceMotion) draw();
    };

    resize();
    if (reduceMotion) draw();
    else frame = requestAnimationFrame(step);

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-grid" />
      <div className="ambient-aurora" />
      <canvas ref={canvasRef} />
    </div>
  );
};
