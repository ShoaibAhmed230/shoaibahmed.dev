import { useState, useEffect } from 'react'
import './App.css'
import { Header } from './Components/Header/Header'
import { HeroSection } from './Components/Hero-Section/HeroSection'
import HeroSkeleton from './Components/Hero-Section/HeroSkeleton'
import { About } from './Components/About/About'
import AboutSkeleton from './Components/About/AboutSkeleton'
import { Projects } from './Components/Projects/Projects'
import { ProjectsSkeletonGrid } from './Components/Projects/ProjectSkeleton'
import { Footer } from './Components/Footer/Footer'
import { Contact } from './Components/Contact/Contact'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=''>
      <div className="portfolio-theme-wrapper">
        <Header />
        {loading ? (
          <>
            <HeroSkeleton />
            <AboutSkeleton />
            <ProjectsSkeletonGrid />
          </>
        ) : (
          <>
            <HeroSection />
            <About />
            <Projects />
            <Contact />
            <Footer />
          </>
        )}
      </div>
    </div>
  )
}

export default App
