import React from 'react'
import { Link } from 'react-router-dom'
import '../Projects/Projects.css'
import '../../assets/Theme/Theme.css'
import projects from '../../data/projects.json'
import { BsFillEyeFill } from "react-icons/bs";
import { tiltHandlers } from '../Effects/tilt'

const thumbnails = import.meta.glob('../../assets/Images/*.webp', { eager: true, import: 'default' });
const projectData = projects.map((p) => ({ ...p, img: thumbnails[`../../assets/Images/${p.img}.webp`] }));

export const Projects = ({ limit }) => {
    const visibleProjects = limit ? projectData.slice(0, limit) : projectData;

    return (
        <div className='text-center mt-10' id='projects'>
            <div data-reveal="up">
            <h2 className='inline text-white md:text-3xl text-2xl text-wrap font-bold text-center text-[#f1660abf] cursor-pointer link link--dia' id="Projects">My Projects Highlight</h2>
            <span className="heading-line" />
            </div>
            <section className="text-gray-400 body-font">
                <div className="container px-5 pt-16 pb-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {visibleProjects.map((project, index) => (
                            <div key={index} data-reveal="up" style={{ "--d": `${(index % 3) * 120}ms` }} className="lg:w-1/3 sm:w-1/2 w-full p-4">
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block group">
                                    <div {...tiltHandlers} className="tilt-card flex relative overflow-hidden rounded-lg shadow-lg shadow-[rgba(255,255,255,0.1)] border-gray-700 border-2 transition-all duration-300 group-hover:border-[#f1660abf]">
                                        <img alt={`${project.title} — project by Shoaib Ahmed`} loading={index < 3 ? "eager" : "lazy"} decoding="async" width="800" height="370" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 object-center cursor-pointer" src={project.img} />
                                        <div className="px-8 items-center justify-center flex py-10 relative z-10 w-full aspect-video bg-black/70 transition-all cursor-pointer opacity-0 group-hover:opacity-100">
                                            <BsFillEyeFill className="text-4xl text-white scale-50 group-hover:scale-100 transition-transform duration-500" />
                                        </div>
                                    </div>
                                    <div className="mt-4 text-left">
                                        <h3 className="text-white text-lg font-semibold transition-colors duration-300 group-hover:text-[#f1660abf]">
                                            {project.title}
                                        </h3>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>

                    {limit && projectData.length > limit && (
                        <div data-reveal="zoom" className="mt-4 flex justify-center">
                            <Link
                                to="/projects"
                                className="px-6 py-3 rounded-full border border-[#f1660abf] text-[#f1660abf] font-semibold text-sm hover:bg-[#f1660abf] hover:text-white transition-all duration-300"
                            >
                                View More Projects
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
