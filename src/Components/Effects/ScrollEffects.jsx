import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './animations.css'

// Site-wide motion: scroll-reveal for any [data-reveal] element, a top
// scroll-progress bar, and a soft cursor spotlight on pointer devices.
export const ScrollEffects = () => {
  const { pathname } = useLocation();
  const progressRef = useRef(null);
  const glowRef = useRef(null);
  const topBtnRef = useRef(null);

  // Reveal elements as they enter the viewport. A MutationObserver picks up
  // elements mounted later (e.g. after the skeleton loader finishes).
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const observeAll = () => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el));
      // Let scroll-linked effects position newly mounted elements.
      window.dispatchEvent(new Event('scroll'));
    };
    observeAll();

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  // Scroll-linked effects: progress bar, back-to-top ring, a --scroll-y CSS
  // variable, [data-parallax] elements and the [data-scroll-fade] hero exit.
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const vh = window.innerHeight;
        const max = root.scrollHeight - vh;
        const progress = max > 0 ? y / max : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
        if (topBtnRef.current) {
          topBtnRef.current.classList.toggle('is-shown', y > vh * 0.6);
          topBtnRef.current.style.setProperty('--progress', progress);
        }
        if (reduceMotion) return;

        root.style.setProperty('--scroll-y', y);

        // Offset is measured from the parent so our own transform doesn't feed back.
        document.querySelectorAll('[data-parallax]').forEach((el) => {
          const rect = (el.parentElement || el).getBoundingClientRect();
          const fromCenter = rect.top + rect.height / 2 - vh / 2;
          const speed = parseFloat(el.dataset.parallax) || 0.15;
          el.style.transform = `translate3d(0, ${fromCenter * -speed}px, 0)`;
        });

        document.querySelectorAll('[data-scroll-fade]').forEach((el) => {
          const t = Math.min(1, y / (vh * 0.75));
          el.style.opacity = String(1 - t * 0.9);
          el.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(${1 - t * 0.06})`;
          el.style.filter = t > 0.02 ? `blur(${t * 4}px)` : '';
        });
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e) => {
      const glow = glowRef.current;
      if (!glow) return;
      glow.style.opacity = '1';
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const onLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <button
        ref={topBtnRef}
        type="button"
        className="back-to-top"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle className="track" cx="24" cy="24" r="21" />
          <circle className="bar" cx="24" cy="24" r="21" pathLength="1" />
          <path d="M24 31V17M17 23l7-7 7 7" />
        </svg>
      </button>
    </>
  );
};
