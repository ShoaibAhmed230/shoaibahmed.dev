import { useEffect } from 'react'
import { Header } from '../Components/Header/Header'
import { Projects } from '../Components/Projects/Projects'
import { Footer } from '../Components/Footer/Footer'
import { ChatWidget } from '../Components/ChatWidget'
import { usePageMeta } from '../hooks/usePageMeta'

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageMeta({
    title: 'Projects | Shoaib Ahmed — React, Next.js & WordPress Developer',
    description: 'Portfolio of web projects by Shoaib Ahmed: React and Next.js apps, WordPress and Magento 2 (Hyvä) websites, e-commerce stores and landing pages.',
    url: 'https://shoaibahmed-dev.vercel.app/projects',
  });

  return (
    <div className=''>
      <div className="portfolio-theme-wrapper">
        <Header />
        <h1 className="sr-only">Web Development Projects by Shoaib Ahmed</h1>
        <div className="pt-10">
          <Projects />
        </div>
        <Footer />
      </div>
      <ChatWidget />
    </div>
  )
}
