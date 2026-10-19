import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../Components/Header/Header'
import { HeroSection } from '../Components/Hero-Section/HeroSection'
import HeroSkeleton from '../Components/Hero-Section/HeroSkeleton'
import { About } from '../Components/About/About'
import AboutSkeleton from '../Components/About/AboutSkeleton'
import { Projects } from '../Components/Projects/Projects'
import { ProjectsSkeletonGrid } from '../Components/Projects/ProjectSkeleton'
import { Footer } from '../Components/Footer/Footer'
import { Contact } from '../Components/Contact/Contact'
import { ChatWidget } from '../Components/ChatWidget'
import { ScrollBand } from '../Components/Effects/ScrollBand'

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { hash } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading || !hash) return;
    const element = document.getElementById(hash.replace('#', ''));
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }, [loading, hash]);

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
            <ScrollBand />
            <Projects limit={3} />
            <Contact />
            <Footer />
          </>
        )}
      </div>
      <ChatWidget />
    </div>
  )
}
