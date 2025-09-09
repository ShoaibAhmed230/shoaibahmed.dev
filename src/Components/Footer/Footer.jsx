import React from 'react'
import { FaInstagram, FaLinkedinIn, FaDribbble, FaBehance, FaEnvelope, FaPhoneAlt, FaGithub  } from "react-icons/fa";


export const Footer = () => {
  return (
    <footer className=" text-gray-300 py-10">
    <div className="container mx-auto px-4 text-center">
      
      {/* Navigation Links */}
      {/* <nav className="mb-6">
        <ul className="flex justify-center space-x-8 text-sm font-medium">
          <li><a href="#home" className="hover:text-white">Home</a></li>
          <li><a href="#about" className="hover:text-white">About</a></li>
          <li><a href="#portfolio" className="hover:text-white">Projects</a></li>
          <li><a href="#contact" className="hover:text-white">Contact me</a></li>
        </ul>
      </nav> */}

      {/* Social Icons */}
      <div className="flex justify-center space-x-6 mb-6">
        <a href="https://github.com/ShoaibAhmed230" target='blank' className="w-10 h-10 flex items-center justify-center border rounded-full hover:bg-[#f1660abf]">
        <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/shoaib-ahmed-9a2803160/"  target='blank' className="w-10 h-10 flex items-center justify-center border rounded-full hover:bg-[#f1660abf]">
          <FaLinkedinIn />
        </a>
       
      </div>

      {/* Contact Info */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6 text-sm">
        <span className="flex items-center space-x-2">
          <FaEnvelope />
          <span>shoaib10ahmed10@gmail.com</span>
        </span>
        <span className="flex items-center space-x-2">
          <FaPhoneAlt />
          <span>+92 314 88 697 88</span>
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-4"></div>

      {/* Footer Bottom */}
      <p className="text-sm text-gray-500">
        Designed by @shoaib.ahmed Front-end developer
      </p>
    </div>
  </footer>
  )
}
