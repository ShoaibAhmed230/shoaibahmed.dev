import React, { useEffect, useRef } from 'react'
import avatar from '../../assets/Images/shoaib-about-photo.webp'

const clamp01 = (n) => Math.min(1, Math.max(0, n));

// A round photo above the hero text that, as the page scrolls,
// glides up and shrinks into the header, then hands off to #header-avatar in
// place of the logo (like a profile header on Upwork).
export const HeroAvatar = () => {
  const slotRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const logo = document.getElementById('header-logo');
    const docked = document.getElementById('header-avatar');
    let frame = 0;

    const reset = () => {
      if (photoRef.current) {
        photoRef.current.style.transform = '';
        photoRef.current.style.opacity = '';
      }
      if (logo) logo.style.opacity = '';
      if (docked) docked.style.opacity = '';
    };

    const update = () => {
      const slot = slotRef.current;
      const photo = photoRef.current;
      if (!slot || !photo || !docked) return;

      const from = slot.getBoundingClientRect();
      const to = docked.getBoundingClientRect();
      const s = window.scrollY;
      const fromCx = from.left + from.width / 2;
      const fromCy = from.top + from.height / 2;
      const toCx = to.left + to.width / 2;
      const toCy = to.top + to.height / 2;

      // Scroll distance the photo would need to reach the header on its own.
      const distance = Math.max(1, fromCy + s - toCy);
      const p = clamp01(s / distance);
      const done = p >= 1;

      if (reduceMotion) {
        photo.style.opacity = done ? '0' : '1';
      } else {
        const eased = p * p * (3 - 2 * p);
        const scale = 1 + (to.width / from.width - 1) * eased;
        photo.style.transform = `translate3d(${(toCx - fromCx) * eased}px, ${(toCy - fromCy) * p}px, 0) scale(${scale})`;
        photo.style.opacity = done ? '0' : '1';
      }

      docked.style.opacity = done ? '1' : '0';
      if (logo) logo.style.opacity = String(1 - clamp01((p - 0.55) / 0.45));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reset();
    };
  }, []);

  return (
    <div ref={slotRef} className="hero-avatar-slot relative z-50 w-28 h-28 lg:w-32 lg:h-32 mb-6 shrink-0">
      <div ref={photoRef} className="hero-avatar w-full h-full rounded-full p-[3px] will-change-transform">
        <img
          src={avatar}
          alt="Shoaib Ahmed"
          width="128"
          height="128"
          fetchPriority="high"
          className="w-full h-full rounded-full object-cover object-top"
        />
      </div>
    </div>
  )
}
