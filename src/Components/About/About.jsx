import React from 'react'
import shImg from '../../assets/Images/s-side-img.png'
import './About.css'
import '../Header/Header.css'
import '../../assets/Theme/Theme.css';

export const About = () => {
    return (
        <div className="my-20 text-center ">
            <h1 className='inline text-white text-3xl font-bold text-center  text-[#f1660abf] cursor-pointer link link--dia' id="about">About Me</h1>

            <div className='abt-box bg-[#181818] flex flex-col md:flex-row justify-center items-center w-3/4 mx-auto mt-20  border-gray-700 rounded-3xl  transition-all duration-300 hover:shadow-[13px_12px_19px_7px_rgba(241,102,10,0.75)] md:w-1/2'>
                <div className="side-img-box md:w-1/2">
                    <img src={shImg} />
                </div>
                <div className=" md:px-10  mx-5 py-10  md:w-1/2">
                    <p className='text-yellow-50 md:text-lg text-sm md:text-left'>I’m Shoaib Ahmed, a Frontend Web Developer with +4 years of experience in HTML, CSS, JavaScript, React, Tailwind CSS, and Bootstrap, CMS(WordPress, strapi, Magento 2). I specialize infront-end development,  engineering, and custom integrations, turning Figma designs into responsive, SEO-friendly websites with clean, scalable code. My focus is always on delivering performance, user experience, and impactful digital solutions.

                    </p>
                </div>
            </div>
        </div>

    )
}
