import React from 'react'
import '../Projects/Projects.css'
import '../../assets/Theme/Theme.css'
import projectThummbnail1 from '../../assets/Images/applab-thumb-img.png'
import projectThummbnail2 from '../../assets/Images/iartical-thumb-img.png'
import projectThummbnail3 from '../../assets/Images/intervantion-thumb-img.png'
import projectThummbnail4 from '../../assets/Images/react-todoapp-thumb-img.png'
import projectThummbnail5 from '../../assets/Images/socialApp-thumb-img.png'
import projectThummbnail6 from '../../assets/Images/weatherapp-thumb-img.png'
import { BsFillEyeFill } from "react-icons/bs";


export const Projects = () => {
    return (
        <div className='text-center mt-10' id='projects'>
            <h1 className='inline text-white md:text-3xl text-2xl text-wrap font-bold text-center  text-[#f1660abf] cursor-pointer link link--dia' id="Projects">My Projects Highlight</h1>
            <section className="text-gray-400  body-font">
                <div className="container px-5 pt-16 pb-24 mx-auto">

                    <div className="flex flex-wrap ">
                        <div className="lg:w-1/3 sm:w-1/2 p-4 border-gray-900 border-double ">
                            <a href='https://connectifysync.com/shoaib/app-lab-website/' target="blank">
                                <div className="flex relative overflow-hidden  rounded-lg shadow-lg shadow-[rgba(255,255,255,0.6)] border-gray-500 border-3">
                                    <img alt="gallery" className="absolute inset-0 w-full h-full object-cover  transition-transform duration-500 hover:scale-110 object-center cursor-pointer" src={projectThummbnail1} />
                                    <div className="px-8 items-center justify-center flex py-10 relative z-10 w-full border-4 border-gray-500 h-48 inset-0 bg-black/70 transition-all cursor-pointer  opacity-0 hover:opacity-100">
                                        <BsFillEyeFill className="text-4xl hover:text-white transition-all text-white" />
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="lg:w-1/3 sm:w-1/2 p-4 border-gray-900 border-double ">
                            <a href='https://iarticle-website-frontend-rr4d.vercel.app/' target="blank">
                                <div className="flex relative overflow-hidden  rounded-lg shadow-lg shadow-[rgba(255,255,255,0.6)] border-gray-500 border-3">
                                    <img alt="gallery" className="absolute inset-0 w-full h-full object-cover  transition-transform duration-500 hover:scale-110 object-center cursor-pointer" src={projectThummbnail2} />
                                    <div className="px-8 items-center justify-center flex py-10 relative z-10 w-full border-4 border-gray-500 h-48 inset-0 bg-black/70 transition-all cursor-pointer  opacity-0 hover:opacity-100">
                                        <BsFillEyeFill className="text-4xl hover:text-white transition-all text-white" />
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="lg:w-1/3 sm:w-1/2 p-4 border-gray-900 border-double ">
                            <a href='https://connectifysync.com/shoaib/Intervention-website/' target="blank">
                                <div className="flex relative overflow-hidden  rounded-lg shadow-lg shadow-[rgba(255,255,255,0.6)] border-gray-500 border-3">
                                    <img alt="gallery" className="absolute inset-0 w-full h-full object-cover  transition-transform duration-500 hover:scale-110 object-center cursor-pointer" src={projectThummbnail3} />
                                    <div className="px-8 items-center justify-center flex py-10 relative z-10 w-full border-4 border-gray-500 h-48 inset-0 bg-black/70 transition-all cursor-pointer  opacity-0 hover:opacity-100">
                                        <BsFillEyeFill className="text-4xl hover:text-white transition-all text-white" />
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="lg:w-1/3 sm:w-1/2 p-4 border-gray-900 border-double ">
                            <a href='https://todo-app-react-vite-taillwind.vercel.app/' target="blank">
                                <div className="flex relative overflow-hidden  rounded-lg shadow-lg shadow-[rgba(255,255,255,0.6)] border-gray-500 border-3">
                                    <img alt="gallery" className="absolute inset-0 w-full h-full object-cover  transition-transform duration-500 hover:scale-110 object-center cursor-pointer" src={projectThummbnail4} />
                                    <div className="px-8 items-center justify-center flex py-10 relative z-10 w-full border-4 border-gray-500 h-48 inset-0 bg-black/70 transition-all cursor-pointer  opacity-0 hover:opacity-100">
                                        <BsFillEyeFill className="text-4xl hover:text-white transition-all text-white" />
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="lg:w-1/3 sm:w-1/2 p-4 border-gray-900 border-double ">
                            <a href='https://social-media-app-orpin-eight.vercel.app/' target="blank">
                                <div className="flex relative overflow-hidden  rounded-lg shadow-lg shadow-[rgba(255,255,255,0.6)] border-gray-500 border-3">
                                    <img alt="gallery" className="absolute inset-0 w-full h-full object-cover  transition-transform duration-500 hover:scale-110 object-center cursor-pointer" src={projectThummbnail5} />
                                    <div className="px-8 items-center justify-center flex py-10 relative z-10 w-full border-4 border-gray-500 h-48 inset-0 bg-black/70 transition-all cursor-pointer  opacity-0 hover:opacity-100">
                                        <BsFillEyeFill className="text-4xl hover:text-white transition-all text-white" />
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="lg:w-1/3 sm:w-1/2 p-4 border-gray-900 border-double ">
                            <a href='https://weather-app-by-js-one.vercel.app/' target="blank">
                                <div className="flex relative overflow-hidden  rounded-lg shadow-lg shadow-[rgba(255,255,255,0.6)] border-gray-500 border-3">
                                    <img alt="gallery" className="absolute inset-0 w-full h-full object-cover  transition-transform duration-500 hover:scale-110 object-center cursor-pointer" src={projectThummbnail6} />
                                    <div className="px-8 flex items-center justify-center py-10 relative z-10 w-full border-4 border-gray-500 h-48 inset-0 bg-black/70 transition-all cursor-pointer  opacity-0 hover:opacity-100">
                                        <BsFillEyeFill className="text-4xl hover:text-white transition-all text-white" />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
