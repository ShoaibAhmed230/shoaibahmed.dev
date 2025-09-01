import React from 'react';
import './HeroSection.css'
// import heroImg from '../assets/Images/hero_section_wide.jpg'
import heroImg from '../assets/Images/IMG-20250708-WA0013.jpg'

export const HeroSection = () => {
  return (
    <section
      className="text-gray-400 bg-black body-font"

    >
      <div className="container mx-auto flex px-5 md:py-0  md:flex-row flex-col items-center">

        {/* IMAGE - show first on mobile, second on desktop */}
        <div className="order-1 md:order-2 md:max-w-sm lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded pb-10 md:pb-0  " alt="hero" src={heroImg} />
        </div>

        {/* TEXT - show second on mobile, first on desktop */}
        <div className="order-2 md:order-1 lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-baseline text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-white">
            I'm Shoaib Ahmed
            <br className="hidden lg:inline-block" />Frontend Developer
          </h1>
          <p className="mb-8 leading-relaxed w-3/4">
            During these <b className='font- text-white'>4 years</b> as <b className='font- text-white'>Front-End Software Engineer</b>. My role has extended beyond coding to effective communication with various departments, to define new features and spearheading the development of new web apps.
          </p>
          <div className="flex justify-center">
            <button
              id="contact-btn"
              className=" relative inline-flex items-center justify-start overflow-hidden
  font-medium transition-all text-white bg-orange-600 rounded
  hover:bg-white group py-2 px-6
  shadow-lg"   // custom shadow
            >
              <span className="w-56 h-48 rounded bg-orange-900 absolute bottom-0 left-0 
    translate-x-full ease-out duration-500 transition-all translate-y-full 
    mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0" />
              <span className="relative w-full text-left text-white transition-colors 
    duration-300 ease-in-out group-hover:text-white">
                Contact me
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>

  )
}
