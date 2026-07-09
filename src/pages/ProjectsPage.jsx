import { useEffect } from 'react'
import { Header } from '../Components/Header/Header'
import { Projects } from '../Components/Projects/Projects'
import { Footer } from '../Components/Footer/Footer'
import { ChatWidget } from '../Components/ChatWidget'

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=''>
      <div className="portfolio-theme-wrapper">
        <Header />
        <div className="pt-10">
          <Projects />
        </div>
        <Footer />
      </div>
      <ChatWidget />
    </div>
  )
}
