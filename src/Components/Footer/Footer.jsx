import React from 'react'
import { FaInstagram, FaLinkedinIn, FaDribbble, FaBehance, FaEnvelope, FaPhoneAlt, FaGithub } from "react-icons/fa";


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
