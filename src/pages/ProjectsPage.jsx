import { useEffect } from 'react'
import { Header } from '../Components/Header/Header'
import { Projects } from '../Components/Projects/Projects'
import { Footer } from '../Components/Footer/Footer'
import { ChatWidget } from '../Components/ChatWidget'

const PAGE_TITLE = 'Projects | Shoaib Ahmed — React, Next.js & WordPress Developer'
const PAGE_DESCRIPTION = 'Portfolio of web projects by Shoaib Ahmed: React and Next.js apps, WordPress and Magento 2 (Hyvä) websites, e-commerce stores and landing pages.'
const PAGE_URL = 'https://shoaibahmed-dev.vercel.app/projects'

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Per-route title, description and canonical; restore the homepage values on leave.
  useEffect(() => {
    const description = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const prev = {
      title: document.title,
      description: description?.getAttribute('content'),
      canonical: canonical?.getAttribute('href'),
    };

    document.title = PAGE_TITLE;
    description?.setAttribute('content', PAGE_DESCRIPTION);
    canonical?.setAttribute('href', PAGE_URL);

    return () => {
      document.title = prev.title;
      if (prev.description) description?.setAttribute('content', prev.description);
      if (prev.canonical) canonical?.setAttribute('href', prev.canonical);
    };
  }, []);

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
