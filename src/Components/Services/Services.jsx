import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../About/About.css'

const services = [
  {
    title: 'React & Next.js Development',
    text: 'Fast, SEO-friendly web apps and dashboards with React, Next.js, TypeScript and Tailwind CSS.',
    example: { label: 'TalentVare job portal', slug: 'talentvare-job-portal' },
  },
  {
    title: 'Headless CMS & Full-Stack Apps',
    text: 'Next.js front ends on Strapi or Supabase, with authentication, databases and media storage.',
    example: { label: 'Oxford Summer Program (Strapi + Next.js)', slug: 'oxford-summer-program' },
  },
  {
    title: 'WordPress Development with AI',
    text: 'WordPress websites built and managed through Claude\'s MCP connector: faster builds, same attention to detail.',
    example: { label: 'SmartStack restaurant site', slug: 'smartstack-restaurant-website' },
  },
  {
    title: 'Magento 2 & Hyvä Development',
    text: 'E-commerce storefronts on Magento 2 and the Hyvä theme, focused on speed and conversion.',
  },
  {
    title: 'Hosting & Server Management',
    text: 'WordPress hosting on Hostinger, SiteGround and VentraIP: PHP upgrades, plugin audits, caching, security hardening and site health monitoring.',
  },
  {
    title: 'Technical SEO & Core Web Vitals',
    text: 'Site audits, PageSpeed and Core Web Vitals tuning, structured data, GA4, GTM and Search Console setup.',
  },
  {
    title: 'HTML Email Templates',
    text: 'Responsive transactional emails and newsletters that render reliably across email clients.',
    example: { label: 'Nimbus Pay payment email', slug: 'nimbus-pay-payment-email' },
  },
];

const MOBILE = '(max-width: 767px)';
const AUTOPLAY_MS = 3500;
const RESUME_AFTER_MS = 6000;

export const Services = () => {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const pausedUntil = useRef(0);

  const select = (i) => {
    activeRef.current = i;
    setActive(i);
  };

  const goTo = (i) => {
    const track = trackRef.current;
    const card = track?.children[i];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft - (track.clientWidth - card.clientWidth) / 2, behavior: 'smooth' });
  };

  // Mobile: auto-advance the carousel while it's on screen; any touch pauses it for a while.
  useEffect(() => {
    const track = trackRef.current;
    const mq = window.matchMedia(MOBILE);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let inView = false;
    const io = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; }, { threshold: 0.5 });
    io.observe(track);

    const pause = () => { pausedUntil.current = Date.now() + RESUME_AFTER_MS; };
    track.addEventListener('pointerdown', pause, { passive: true });
    track.addEventListener('touchstart', pause, { passive: true });

    const timer = setInterval(() => {
      if (!mq.matches || !inView || document.hidden || Date.now() < pausedUntil.current) return;
      const next = (activeRef.current + 1) % services.length;
      select(next);
      goTo(next);
    }, AUTOPLAY_MS);

    return () => {
      clearInterval(timer);
      io.disconnect();
      track.removeEventListener('pointerdown', pause);
      track.removeEventListener('touchstart', pause);
    };
  }, []);

  // Keep the dots in sync when the user swipes.
  const onScroll = () => {
    const track = trackRef.current;
    const center = track.scrollLeft + track.clientWidth / 2;
    const mid = (card) => card.offsetLeft - track.offsetLeft + card.clientWidth / 2;
    let nearest = 0;
    [...track.children].forEach((card, i) => {
      if (Math.abs(mid(card) - center) < Math.abs(mid(track.children[nearest]) - center)) nearest = i;
    });
    if (nearest !== activeRef.current) select(nearest);
  };

  return (
    <section id="services" className="container mx-auto px-5 mt-10 mb-6">
      <div data-reveal="up" className="text-center mb-10">
        <h2 className="text-white md:text-3xl text-2xl font-bold">What I Do</h2>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
          Web development for startups, agencies and businesses worldwide, from front end and CMS to hosting and servers, delivered remotely from Karachi, Pakistan.
        </p>
      </div>
      <ul
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 pb-2"
      >
        {services.map((s, i) => (
          <li key={s.title} data-reveal="up" style={{ "--d": `${(i % 3) * 120}ms` }} className="abt-card p-6 flex flex-col snap-center shrink-0 w-[85%] md:w-auto">
            <h3 className="text-white text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed flex-grow">{s.text}</p>
            {s.example && (
              <Link to={`/projects/${s.example.slug}`} className="text-[#f1660a] text-sm font-medium mt-4 hover:underline">
                Example: {s.example.label} →
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile carousel dots */}
      <div className="md:hidden flex justify-center gap-2 mt-5" role="tablist" aria-label="Services">
        {services.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={s.title}
            onClick={() => { pausedUntil.current = Date.now() + RESUME_AFTER_MS; select(i); goTo(i); }}
            className={`h-2 rounded-full transition-all duration-300 ${active === i ? "w-6 bg-[#f1660a]" : "w-2 bg-gray-600"}`}
          />
        ))}
      </div>
    </section>
  )
}
