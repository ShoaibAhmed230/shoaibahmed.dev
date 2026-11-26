import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { Header } from '../Components/Header/Header'
import { Footer } from '../Components/Footer/Footer'
import { ChatWidget } from '../Components/ChatWidget'
import { projectData } from '../data/projects'
import { usePageMeta } from '../hooks/usePageMeta'
import '../Components/About/About.css'

const SITE_URL = 'https://shoaibahmed-dev.vercel.app'

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const index = projectData.findIndex((p) => p.slug === slug);
  const project = projectData[index];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  usePageMeta(
    project
      ? { title: project.metaTitle, description: project.summary, url: `${SITE_URL}/projects/${project.slug}` }
      : { title: 'Project not found | Shoaib Ahmed', description: null, url: null }
  );

  if (!project) {
    return (
      <div className="portfolio-theme-wrapper min-h-screen">
        <Header />
        <main className="container mx-auto px-5 py-24 text-center">
          <h1 className="text-white text-3xl font-bold mb-6">Project not found</h1>
          <Link to="/projects" className="text-[#f1660a] underline">See all projects</Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Next three projects, wrapping around, for internal linking.
  const more = [1, 2, 3].map((n) => projectData[(index + n) % projectData.length]);

  return (
    <div className=''>
      <div className="portfolio-theme-wrapper">
        <Header />
        <main className="container mx-auto px-5 pt-10 pb-20 max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-8">
            <ol className="flex flex-wrap gap-2">
              <li><Link to="/" className="hover:text-[#f1660a]">Home</Link> /</li>
              <li><Link to="/projects" className="hover:text-[#f1660a]">Projects</Link> /</li>
              <li aria-current="page" className="text-gray-300">{project.title}</li>
            </ol>
          </nav>

          <article>
            <header data-reveal="up" className="mb-10">
              <span className="text-[#f1660a] font-semibold uppercase tracking-widest text-xs">{project.category}</span>
              <h1 className="text-white text-3xl md:text-5xl font-bold mt-3 mb-5 leading-tight">{project.title}</h1>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl">{project.summary}</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f1660a] text-white font-semibold text-sm hover:opacity-90 transition">
                  View live site <FaExternalLinkAlt className="text-xs" />
                </a>
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#f1660abf] text-[#f1660abf] font-semibold text-sm hover:bg-[#f1660abf] hover:text-white transition">
                    <FaGithub /> Source code
                  </a>
                )}
              </div>
            </header>

            <img
              src={project.img}
              alt={`${project.title} — screenshot of the ${project.category.toLowerCase()} built by Shoaib Ahmed`}
              width="800"
              height="370"
              className="w-full h-auto rounded-2xl border border-gray-700 mb-12"
            />

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-10">
                <section>
                  <h2 className="text-white text-2xl font-bold mb-4">Overview</h2>
                  <div className="space-y-4 text-gray-400 leading-relaxed">
                    {project.overview.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </section>
                <section>
                  <h2 className="text-white text-2xl font-bold mb-4">Key features</h2>
                  <ul className="space-y-3 text-gray-400">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex gap-3"><span className="text-[#f1660a] mt-1">▹</span><span>{f}</span></li>
                    ))}
                  </ul>
                </section>
              </div>

              <aside className="abt-card p-6 h-fit">
                <h2 className="text-white text-lg font-bold mb-4">Tech stack</h2>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <li key={t} className="px-3 py-1 rounded-full text-xs font-medium border border-gray-700 text-gray-300">{t}</li>
                  ))}
                </ul>
                <h2 className="text-white text-lg font-bold mt-8 mb-3">Need something similar?</h2>
                <p className="text-gray-400 text-sm mb-4">I build fast, responsive websites and web apps for clients worldwide.</p>
                <a href="/#contact" className="text-[#f1660a] font-semibold text-sm hover:underline">Get in touch →</a>
              </aside>
            </div>
          </article>

          <section className="mt-20">
            <h2 className="text-white text-2xl font-bold mb-6">More projects</h2>
            <ul className="grid sm:grid-cols-3 gap-4">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link to={`/projects/${p.slug}`} className="block abt-card p-5 h-full">
                    <span className="text-[#f1660a] text-xs font-semibold uppercase tracking-wider">{p.category}</span>
                    <h3 className="text-white font-semibold mt-2">{p.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </main>
        <Footer />
      </div>
      <ChatWidget />
    </div>
  )
}
