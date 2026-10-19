import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/Images/logo.png';
import './Header.css';
import { ThemeToggle } from '../Theme/ThemeToggle';

export const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

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

  const sectionHref = (id) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header className="text-gray-400 bg-transparent body-font relative z-20">
      <div data-reveal="down" className="container mx-auto flex flex-wrap py-4 px-5 flex-row items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="logo"
            className="h-10 md:h-12 w-auto"
          />
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center font-medium">
          <a href={sectionHref('home')} className={`mx-3 md:mx-5 nav-link transition-all ${isHome && activeSection === 'home' ? 'active' : ''}`}>Home</a>
          <a href={sectionHref('about')} className={`mx-3 md:mx-5 nav-link transition-all ${isHome && activeSection === 'about' ? 'active' : ''}`}>About</a>
          <a href={sectionHref('projects')} className={`mx-3 md:mx-5 nav-link transition-all ${(pathname === '/projects') || (isHome && activeSection === 'projects') ? 'active' : ''}`}>Projects</a>
          <a href={sectionHref('contact')} className={`mx-3 md:mx-5 nav-link transition-all ${isHome && activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
