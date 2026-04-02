import React from 'react'
import '../Projects/Projects.css'
import '../../assets/Theme/Theme.css'
import projectThummbnail1 from '../../assets/Images/applab-thumb-img.png'
import projectThummbnail2 from '../../assets/Images/iartical-thumb-img.png'
import projectThummbnail3 from '../../assets/Images/intervantion-thumb-img.png'
import projectThummbnail4 from '../../assets/Images/react-todoapp-thumb-img.png'
import projectThummbnail5 from '../../assets/Images/socialApp-thumb-img.png'
import projectThummbnail6 from '../../assets/Images/weatherapp-thumb-img.png'
import projectThummbnail7 from '../../assets/Images/talentvare-thumb-img.png'
import projectThummbnail8 from '../../assets/Images/wordpress-thumb-img.png'
import projectThummbnail9 from '../../assets/Images/jewelry-thumb-img.png'
import { BsFillEyeFill } from "react-icons/bs";

const projectData = [
    { title: "TalentVare - Job Portal", link: "https://find-job-pi.vercel.app/", img: projectThummbnail7 },
    { title: "Jewelicious - Jewelry E-commerce", link: "https://shoaibahmed230.github.io/jewelry-e-commerce-site/", img: projectThummbnail9 },
    { title: "App Lab - Software Landing Page", link: "https://connectifysync.com/shoaib/app-lab-website/", img: projectThummbnail1 },
    { title: "iArticle - Resource Platform", link: "https://iarticle-website-frontend-rr4d.vercel.app/", img: projectThummbnail2 },
    { title: "Intervention - Consultation Site", link: "https://connectifysync.com/shoaib/Intervention-website/", img: projectThummbnail3 },
    { title: "React Todo App", link: "https://todo-app-react-vite-taillwind.vercel.app/", img: projectThummbnail4 },
    { title: "Social Media Dashboard", link: "https://social-media-app-orpin-eight.vercel.app/", img: projectThummbnail5 },
    { title: "Real-time Weather App", link: "https://weather-app-by-js-one.vercel.app/", img: projectThummbnail6 },
    { title: "Molly Pittman - WordPress Site", link: "https://floralwhite-gnu-194370.hostingersite.com/", img: projectThummbnail8 },
];

export const Projects = () => {
    return (
        <div className='text-center mt-10' id='projects'>
            <h1 className='inline text-white md:text-3xl text-2xl text-wrap font-bold text-center text-[#f1660abf] cursor-pointer link link--dia' id="Projects">My Projects Highlight</h1>
            <section className="text-gray-400 body-font">
                <div className="container px-5 pt-16 pb-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {projectData.map((project, index) => (
                            <div key={index} className="lg:w-1/3 sm:w-1/2 w-full p-4">
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block group">
                                    <div className="flex relative overflow-hidden rounded-lg shadow-lg shadow-[rgba(255,255,255,0.1)] border-gray-700 border-2 transition-all duration-300 group-hover:border-[#f1660abf]">
                                        <img alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 object-center cursor-pointer" src={project.img} />
                                        <div className="px-8 items-center justify-center flex py-10 relative z-10 w-full aspect-video bg-black/70 transition-all cursor-pointer opacity-0 group-hover:opacity-100">
                                            <BsFillEyeFill className="text-4xl hover:text-white transition-all text-white" />
                                        </div>
                                    </div>
                                    <div className="mt-4 text-left">
                                        <h2 className="text-white text-lg font-semibold transition-colors duration-300 group-hover:text-[#f1660abf]">
                                            {project.title}
                                        </h2>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
