import React from 'react';
import './HeroSection.css'
import { HeroCodeCard } from './HeroCodeCard'

const SKILLS = [
  'Frontend Development',
  'React.js',
  'Next.js',
  'WordPress',
  'Technical SEO',
  'JavaScript',
  'Tailwind CSS',
  'Bootstrap',
  'Material UI',
  'Strapi',
  'Magento 2',
  'Hyva Theme',
  'AI-Assisted Development',
  'WordPress via Claude MCP',
  'Email Templates',
];

const SkillPill = ({ label, index }) => (
  <span
    className={`skill-pill px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-[11px] font-mono text-gray-400 whitespace-nowrap ${index !== undefined ? 'skill-pop' : ''}`}
    style={index !== undefined ? { '--d': `${900 + index * 60}ms` } : undefined}
  >
    {label}
  </span>
);

export const HeroSection = () => {
  return (
    <section id="home" className="hero-container text-gray-400 body-font py-10 lg:py-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="blur-blob blob-1" />
      <div className="blur-blob blob-2" />

      <div className="container mx-auto flex px-5 lg:flex-row flex-col items-center relative z-10">

        {/* LEFT SIDE - TEXT CONTENT */}
        <div data-scroll-fade className="w-full lg:flex-grow lg:w-1/2 lg:pr-24 flex flex-col lg:items-start lg:text-left items-center text-center mb-16 lg:mb-0">
          <span data-reveal="down" className="text-[#f1660a] font-bold tracking-widest text-sm mb-4 uppercase drop-shadow-lg">
            <span className="wave-hand">👋</span> Welcome to my world
          </span>
          <h1 data-reveal="blur" style={{ "--d": "150ms" }} className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            I'm <span className="hero-gradient-text">Shoaib Ahmed</span>
          </h1>
          <h2 data-reveal="up" style={{ "--d": "300ms" }} className="text-2xl md:text-3xl text-gray-300 font-medium mb-8">
            AI-Powered Web Developer, Building Smart, Efficient &amp; Future-Ready Experiences
          </h2>
          <p data-reveal="up" style={{ "--d": "450ms" }} className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed max-w-lg">
            Turning complex ideas into responsive, high-performing websites — accelerated with <span className="text-white font-semibold">AI</span>-assisted development — with a focus on immersive user experiences.
          </p>

          <div data-reveal="zoom" style={{ "--d": "600ms" }} className="flex flex-col items-center lg:items-start gap-6">
            <a href="#contact" className="hero-btn-premium shine-btn pulse-ring">
              Contact me
            </a>
          </div>

          {/* Desktop: static wrapped grid */}
          <div className="mt-8 hidden lg:flex flex-wrap justify-start gap-3">
            {SKILLS.map((skill, i) => (
              <SkillPill key={skill} label={skill} index={i} />
            ))}
          </div>

          {/* Tablet & mobile: auto-sliding marquee */}
          <div className="mt-8 w-full lg:hidden overflow-hidden marquee-mask">
            <div className="marquee-track gap-3">
              {[...SKILLS, ...SKILLS].map((skill, i) => (
                <SkillPill key={`${skill}-${i}`} label={skill} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-5/12 w-full flex justify-center lg:justify-end items-center relative overflow-visible">
          <div data-parallax="0.25" className="w-full flex justify-center lg:justify-end">
          <div data-reveal="right" style={{ "--d": "300ms" }} className="w-full flex justify-center lg:justify-end">
            <HeroCodeCard />
          </div>
          </div>
        </div>

      </div>
    </section>
  )
}
