import React from 'react'
import { Link } from 'react-router-dom'
import '../About/About.css'

const services = [
  {
    title: 'React & Next.js Development',
    text: 'Fast, SEO-friendly web apps and dashboards with React, Next.js, TypeScript and Tailwind CSS.',
    example: { label: 'TalentVare job portal', slug: 'talentvare-job-portal' },
  },
  {
    title: 'Headless CMS & Full-Stack Apps',
    text: 'Next.js front ends on Strapi or Supabase, with authentication, databases and media storage.',
    example: { label: 'iArticle (Next.js + Strapi)', slug: 'iarticle-resource-platform' },
  },
  {
    title: 'WordPress Development with AI',
    text: 'WordPress websites built and managed through Claude\'s MCP connector: faster builds, same attention to detail.',
    example: { label: 'SmartStack restaurant site', slug: 'smartstack-restaurant-website' },
  },
  {
    title: 'Magento 2 & Hyvä Front End',
    text: 'E-commerce storefronts on Magento 2 and the Hyvä theme, focused on speed and conversion.',
  },
  {
    title: 'Technical SEO & Core Web Vitals',
    text: 'Site audits, PageSpeed and Core Web Vitals tuning, structured data, GA4, GTM and Search Console setup.',
  },
  {
    title: 'HTML Email Templates',
    text: 'Responsive transactional emails and newsletters that render reliably across email clients.',
    example: { label: 'Nimbus Pay payment email', slug: 'nimbus-pay-payment-email' },
  },
];

export const Services = () => {
  return (
    <section id="services" className="container mx-auto px-5 mt-10 mb-6">
      <div data-reveal="up" className="text-center mb-10">
        <h2 className="text-white md:text-3xl text-2xl font-bold">What I Do</h2>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
          Front-end web development for startups, agencies and businesses worldwide, delivered remotely from Karachi, Pakistan.
        </p>
      </div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <li key={s.title} data-reveal="up" style={{ "--d": `${(i % 3) * 120}ms` }} className="abt-card p-6 flex flex-col">
            <h3 className="text-white text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed flex-grow">{s.text}</p>
            {s.example && (
              <Link to={`/projects/${s.example.slug}`} className="text-[#f1660a] text-sm font-medium mt-4 hover:underline">
                Example: {s.example.label} →
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
