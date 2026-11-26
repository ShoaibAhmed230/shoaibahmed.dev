import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/Images/logo.webp';
import avatar from '../../assets/Images/shoaib-about-photo.webp';
import './Header.css';
import { ThemeToggle } from '../Theme/ThemeToggle';

export const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      // Near the top the mobile header spacer sits above #home, so pin it.
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }
      const sections = ['home', 'about', 'projects', 'contact'];
      // Measure below the fixed header so the section under it counts as active.
      const scrollPosition = window.scrollY + (headerRef.current?.offsetHeight || 0) + 40;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Header is fixed: track scroll for its shadow, and expose its
  // height so the spacer below keeps content from sliding under it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const el = headerRef.current;
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`);
    });
    ro.observe(el);

    return () => {
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, []);

  const sectionHref = (id) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <header
        ref={headerRef}
        className={`site-header text-gray-400 bg-transparent body-font fixed top-0 inset-x-0 z-40 ${scrolled ? 'is-scrolled' : ''}`}
      >
        <div data-reveal="down" className="container mx-auto flex flex-wrap py-3 md:py-4 px-5 flex-row items-center justify-between">
          <Link to="/" className="header-brand relative flex items-center order-1" aria-label="Shoaib Ahmed — home">
            <img
              id="header-logo"
              src={logo}
              alt="Shoaib Ahmed logo"
              width="246"
              height="96"
              className="h-10 md:h-12 w-auto"
            />
            {/* The hero photo docks here on scroll (see HeroAvatar). */}
            <img
              id="header-avatar"
              src={avatar}
              alt=""
              aria-hidden="true"
              width="40"
              height="40"
              className="absolute left-0 top-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#f1660a] object-cover object-top opacity-0 pointer-events-none"
            />
          </Link>
          <nav className="order-3 md:order-2 w-full md:w-auto md:ml-auto mt-1 md:mt-0 flex flex-wrap items-center text-base justify-center font-medium">
            <a href={sectionHref('home')} className={`mx-3 md:mx-5 nav-link transition-all ${isHome && activeSection === 'home' ? 'active' : ''}`}>Home</a>
            <a href={sectionHref('about')} className={`mx-3 md:mx-5 nav-link transition-all ${isHome && activeSection === 'about' ? 'active' : ''}`}>About</a>
            <a href={sectionHref('projects')} className={`mx-3 md:mx-5 nav-link transition-all ${(pathname.startsWith('/projects')) || (isHome && activeSection === 'projects') ? 'active' : ''}`}>Projects</a>
            <a href={sectionHref('contact')} className={`mx-3 md:mx-5 nav-link transition-all ${isHome && activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
          </nav>
          <div className="order-2 md:order-3 flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div style={{ height: 'var(--header-h, 104px)' }} aria-hidden="true" />
    </>
  );
};
