import React, { useState } from 'react'
import shImg from '../../assets/Images/shoaib-side-photo2.jpg'
import './About.css'
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaChevronDown } from "react-icons/fa";

export const About = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section id="about" className="abt-container mt-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch mb-8">
                    {/* LEFT CARD - BIO */}
                    <div data-reveal="left" className="lg:w-7/12 flex">
                    <div className="w-full abt-card p-8 md:p-12 text-left relative overflow-hidden group">
                        <span className="text-[#f1660a] font-medium mb-4 block">👋 Hey, I'm</span>
                        <h1 className="text-white text-4xl md:text-5xl font-bold mb-8">Shoaib Ahmed</h1>
                        
                        <div className="relative">
                            <div
                                className={`space-y-6 text-gray-400 leading-relaxed text-sm md:text-base overflow-hidden transition-[max-height] duration-500 ease-in-out lg:!max-h-none lg:overflow-visible ${isExpanded ? 'max-h-[1200px]' : 'max-h-[220px]'}`}
                            >
                                <p>
                                    I'm a Web Developer with 5+ years of experience, specializing in responsive, high-performance web applications, modern UI architectures, and Technical SEO.
                                </p>
                                <p>
                                    I build fast, user-friendly web apps using React, Next.js, and Tailwind CSS, with a focus on code quality, performance optimization, and clean UI. I've worked on projects ranging from WordPress redesigns to Next.js + Strapi v5 builds.
                                </p>
                                <p>
                                    Beyond development, I handle advanced website maintenance and Technical SEO — PHP upgrades, plugin audits, caching and performance tuning (WP Rocket, PageSpeed/Core Web Vitals), image optimization (WebP), security hardening, GA4/GTM/Search Console setup, and site health monitoring to keep sites fast, secure, and search-ready.
                                </p>
                                <p>
                                    I pair my expertise with AI tools for research, debugging, and automation — shipping better features faster without cutting corners. This site's chat assistant (bottom-right corner) is one example; feel free to ask it anything about my work.
                                </p>
                                <p>
                                    I also build WordPress websites through Claude's MCP connector — designing pages, adding content, and configuring the site directly from prompts. It cuts out repetitive manual work, so I can deliver complete sites faster and spend more time on quality and the details that matter.
                                </p>
                                <p>
                                    In my free time, I explore new technologies, hit the gym, and enjoy traveling to discover new cultures and landscapes.
                                </p>
                            </div>

                            {/* Fade-out overlay when collapsed, mobile only */}
                            {!isExpanded && (
                                <div className="lg:hidden pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0b1121] to-transparent" />
                            )}
                        </div>

                        <button
                            onClick={() => setIsExpanded((prev) => !prev)}
                            className="lg:hidden mt-4 flex items-center gap-2 text-[#f1660a] font-medium text-sm cursor-pointer"
                        >
                            {isExpanded ? 'Read less' : 'Read more'}
                            <FaChevronDown
                                className={`text-xs transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            />
                        </button>
                    </div>
                    </div>

                    {/* RIGHT CARD - PROFILE & SHAPES */}
                    <div data-reveal="right" style={{ "--d": "150ms" }} className="lg:w-5/12 flex">
                    <div className="w-full abt-card p-8 flex items-center justify-center relative shape-container">
                        {/* Abstract Shapes */}
                        <div className="shape shape-square animate-float top-10 left-10" />
                        <div className="shape shape-circle animate-float bottom-20 left-20" style={{ animationDelay: '1s' }} />
                        <div className="shape shape-outline-circle animate-float top-20 right-20" style={{ animationDelay: '0.5s' }} />
                        <div className="shape shape-arc absolute right-[-20px] top-[-20px] opacity-20" />

                        <div data-parallax="0.08" className="relative">
                            {/* Orbital border */}
                            <div className="absolute -inset-4 border-2 border-[#f1660a]/30 rounded-full animate-pulse" />
                            <div className="profile-ring" />
                            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-[#f1660a] overflow-hidden shadow-[0_0_50px_rgba(241,102,10,0.3)]">
                                <img 
                                    src={shImg} 
                                    alt="Shoaib Ahmed" 
                                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-110"
                                />
                            </div>
                        </div>
                        
                        {/* Floating Small shapes */}
                        <div className="absolute bottom-10 right-10 w-4 h-4 bg-gray-600 rotate-45" />
                        <div className="absolute top-1/2 left-10 w-3 h-1 bg-[#f1660a]" />
                    </div>
                    </div>
                </div>

                {/* SOCIAL ROW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div data-reveal="up">
                        <a href="https://www.linkedin.com/in/shoaib-ahmed-9a2803160/" target="_blank" rel="noopener noreferrer" className="social-card">
                            <FaLinkedin className="text-xl text-[#0a66c2]" />
                            <span className="font-medium">Linkedin</span>
                        </a>
                    </div>
                    <div data-reveal="up" style={{ "--d": "120ms" }}>
                        <a href="https://github.com/ShoaibAhmed230" target="_blank" rel="noopener noreferrer" className="social-card">
                            <FaGithub className="text-xl" />
                            <span className="font-medium">GitHub</span>
                        </a>
                    </div>
                    <div data-reveal="up" style={{ "--d": "240ms" }}>
                        <a href="https://www.instagram.com/shoaib52538?utm_source=qr&igsh=b2Z6bmVrcTRqOHh3" target="_blank" rel="noopener noreferrer" className="social-card">
                            <FaInstagram className="text-xl text-[#e4405f]" />
                            <span className="font-medium">Instagram</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
