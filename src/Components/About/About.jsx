import React from 'react'
import shImg from '../../assets/Images/shoaib-side-photo2.jpg'
import './About.css'
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";

export const About = () => {
    return (
        <section id="about" className="abt-container mt-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch mb-8">
                    {/* LEFT CARD - BIO */}
                    <div className="lg:w-7/12 abt-card p-8 md:p-12 text-left relative overflow-hidden group">
                        <span className="text-[#f1660a] font-medium mb-4 block">👋 Hey, I'm</span>
                        <h1 className="text-white text-4xl md:text-5xl font-bold mb-8">Shoaib Ahmed</h1>
                        
                        <div className="space-y-6 text-gray-400 leading-relaxed text-sm md:text-base">
                            <p>
                                I hold a degree in Frontend Development and Engineering, and I'm currently specializing in full-stack integrations and modern UI architectures.
                            </p>
                            <p>
                                Currently, I work as a lead frontend developer, where I develop responsive and high-performance web applications using React, Tailwind CSS, and Node.js. I participate in code reviews, performance optimization, and the development of new features according to client and stakeholder requirements.
                            </p>
                            <p>
                                In my free time, I enjoy exploring new technologies and staying fit by regularly going to the gym. Traveling to different places and discovering new cultures and landscapes is something that fascinates me and keeps my creative perspective fresh.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT CARD - PROFILE & SHAPES */}
                    <div className="lg:w-5/12 abt-card p-8 flex items-center justify-center relative shape-container">
                        {/* Abstract Shapes */}
                        <div className="shape shape-square animate-float top-10 left-10" />
                        <div className="shape shape-circle animate-float bottom-20 left-20" style={{ animationDelay: '1s' }} />
                        <div className="shape shape-outline-circle animate-float top-20 right-20" style={{ animationDelay: '0.5s' }} />
                        <div className="shape shape-arc absolute right-[-20px] top-[-20px] opacity-20" />

                        <div className="relative">
                            {/* Orbital border */}
                            <div className="absolute -inset-4 border-2 border-[#f1660a]/30 rounded-full animate-pulse" />
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

                {/* SOCIAL ROW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a href="https://www.linkedin.com/in/shoaib-ahmed-9a2803160/" target="_blank" rel="noopener noreferrer" className="social-card">
                        <FaLinkedin className="text-xl text-[#0a66c2]" />
                        <span className="font-medium">Linkedin</span>
                    </a>
                    <a href="https://github.com/ShoaibAhmed230" target="_blank" rel="noopener noreferrer" className="social-card">
                        <FaGithub className="text-xl" />
                        <span className="font-medium">GitHub</span>
                    </a>
                    <a href="https://www.instagram.com/shoaib52538?igsh=b2Z6bmVrcTRqOHh3" target="_blank" rel="noopener noreferrer" className="social-card">
                        <FaInstagram className="text-xl text-[#e4405f]" />
                        <span className="font-medium">Instagram</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
