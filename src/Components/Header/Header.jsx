import React from 'react';
import logo from '../../assets/Images/logo.png';
import './Header.css';
import '../../assets/Theme/Theme.css';

export const Header = () => {
  return (
<header className="text-gray-400 bg-black body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
      <div className=''><img src={logo} alt='logo' className='w-36 h-34'/></div>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <a href="#about" className="mr-5 hover:text-white link link--dia">About</a>
      <a href="#projects" className="mr-5 hover:text-white link link--dia">Projects</a>
      <a href="#contact" className="mr-5 hover:text-white link link--dia">Contact</a>
    </nav>
  </div>
</header>
  )
}
