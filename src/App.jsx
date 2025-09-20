import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {Header} from './Components/Header/Header'
import { HeroSection } from './Components/Hero-Section/HeroSection'
import { About } from './Components/About/About'
import { Projects } from './Components/Projects/Projects'
import { Footer } from './Components/Footer/Footer'
import { Contact } from './Components/Contact/Contact'

function App() {

  return (

      <div className='container mx-auto px-[clamp(1rem,4vw,2rem)]'>
        <Header />
        <HeroSection />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>

  )
}

export default App
