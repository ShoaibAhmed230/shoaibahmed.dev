import React from 'react';
import logo from '../assets/Images/logo.png';
import './Header.css';

export const Header = () => {
  return (
<header className="text-gray-400 bg-black body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
      <div className=''><img src={logo} alt='logo' className='w-36 h-34'/></div>
      {/* <span className="ml-3 text-xl">Tailblocks</span> */}
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <a className="mr-5 hover:text-white link link--dia">About</a>
      <a className="mr-5 hover:text-white link link--dia">Projects</a>
      <a className="mr-5 hover:text-white link link--dia">Contact</a>
      {/* <a className="mr-5 hover:text-white">Fourth Link</a> */}
    </nav>
    {/* <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Button
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button> */}
  </div>
</header>
  )
}
