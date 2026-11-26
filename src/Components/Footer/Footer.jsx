import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedinIn, FaEnvelope, FaGithub } from "react-icons/fa";


export const Footer = () => {
  return (
    <footer className=" text-gray-300 py-10">
      <div data-reveal="up" className="container mx-auto px-4 text-center">

        {/* Navigation Links */}
        <nav aria-label="Footer" className="mb-6">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium">
            <li><a href="/#home" className="hover:text-white">Home</a></li>
            <li><a href="/#about" className="hover:text-white">About</a></li>
            <li><Link to="/projects" className="hover:text-white">Projects</Link></li>
            <li><a href="/#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </nav>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-6 text-lg">
          <a href="https://www.linkedin.com/in/shoaib-ahmed-9a2803160/" target="_blank" rel="me noopener noreferrer" aria-label="Shoaib Ahmed on LinkedIn" className="hover:text-white"><FaLinkedinIn /></a>
          <a href="https://github.com/ShoaibAhmed230" target="_blank" rel="me noopener noreferrer" aria-label="Shoaib Ahmed on GitHub" className="hover:text-white"><FaGithub /></a>
          <a href="mailto:shoaib10ahmed10@gmail.com" aria-label="Email Shoaib Ahmed" className="hover:text-white"><FaEnvelope /></a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-4"></div>

        {/* Footer Bottom */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Shoaib Ahmed — Web Developer in Karachi, Pakistan
        </p>
      </div>
    </footer>
  )
}
