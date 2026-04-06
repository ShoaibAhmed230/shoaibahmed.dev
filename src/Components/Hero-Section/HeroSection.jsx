import React from 'react';
import './HeroSection.css'
import heroImg from '../../assets/Images/IMG-20250708-WA0013.jpg'

export const HeroSection = () => {
  return (
    <section id="home" className="hero-container text-gray-400 body-font py-10 lg:py-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="blur-blob blob-1" />
      <div className="blur-blob blob-2" />

      <div className="container mx-auto flex px-5 lg:flex-row flex-col items-center relative z-10">

        {/* LEFT SIDE - TEXT CONTENT */}
        <div className="lg:flex-grow lg:w-1/2 lg:pr-24 flex flex-col lg:items-start lg:text-left items-center text-center mb-16 lg:mb-0">
          <span className="text-[#f1660a] font-bold tracking-widest text-sm mb-4 uppercase drop-shadow-lg">
            👋 Welcome to my world
          </span>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            I'm <span className="hero-gradient-text">Shoaib Ahmed</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 font-medium mb-8">
            Frontend Web Developer
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed max-w-lg">
            Turning complex ideas into <span className="text-white font-semibold">responsive</span>, high-performing websites with a focus on immersive user experiences.
          </p>

          <div className="flex flex-col items-center lg:items-start gap-6">
            <a href="#contact" className="hero-btn-premium">
              Contact me
            </a>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <span className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-[11px] font-mono text-gray-400">WordPress</span>
              <span className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-[11px] font-mono text-gray-400">Strapi 5</span>
              <span className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-[11px] font-mono text-gray-400">SEO</span>
              <span className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-[11px] font-mono text-gray-400">Magento 2</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
            <span className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-[11px] font-mono text-gray-400">React.js</span>
            <span className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-[11px] font-mono text-gray-400">Tailwind CSS</span>
            <span className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-[11px] font-mono text-gray-400">JavaScript</span>
          </div>
        </div>

        <div className="lg:w-5/12 w-full flex justify-center lg:justify-end items-end relative overflow-visible">
          <div className="hero-img-box max-w-xs md:max-w-sm">
            <img
              className="hero-img-blend"
              alt="Shoaib Ahmed - Frontend Developer"
              src={heroImg}
            />
          </div>
        </div>

      </div>
    </section>
  )
}
