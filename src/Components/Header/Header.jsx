import React, { useState, useEffect } from 'react';
import logo from '../../assets/Images/logo.png';
import './Header.css';

export const Header = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
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
  }, []);

  return (
    <header className="text-gray-400 bg-transparent body-font relative z-20">
      <div className="container mx-auto flex flex-wrap py-4 px-5 flex-col md:flex-row items-center justify-between">
        <a href="#home" className="flex title-font font-medium items-center text-white mb-4 md:mb-0 hover:opacity-80 transition-opacity">
          <img src={logo} alt='logo' className='w-28 md:w-32 h-auto' />
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center font-medium">
          <a href="#about" className={`mx-3 md:mx-5 nav-link transition-all ${activeSection === 'about' ? 'active' : ''}`}>About</a>
          <a href="#projects" className={`mx-3 md:mx-5 nav-link transition-all ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a>
          <a href="#contact" className={`mx-3 md:mx-5 nav-link transition-all ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
        </nav>
      </div>
    </header>
  );
};
