import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = 'https://shoaibahmed-dev.vercel.app'
const PERSON = { '@id': `${SITE_URL}/#person` }
const PERSON_NODE = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Shoaib Ahmed',
  jobTitle: 'Front-End Web Developer',
  url: `${SITE_URL}/`,
  sameAs: ['https://www.linkedin.com/in/shoaib-ahmed-9a2803160/', 'https://github.com/ShoaibAhmed230'],
}

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const breadcrumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: url })),
})

// Copies the built index.html with route-specific head tags, structured data
// and a <noscript> body, so crawlers that don't run JS still see the page.
const renderPage = (baseHtml, { title, description, url, ogType = 'website', image, jsonLd, body }) => {
  let html = baseHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${escapeHtml(description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:type" content=")[^"]*/, `$1${ogType}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta (?:property="og|name="twitter):title" content=")[^"]*/g, `$1${escapeHtml(title)}`)
    .replace(/(<meta (?:property="og|name="twitter):description" content=")[^"]*/g, `$1${escapeHtml(description)}`)
    // Swap the homepage's ProfilePage schema for this page's own graph.
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">${JSON.stringify({ ...jsonLd, '@graph': [...jsonLd['@graph'], PERSON_NODE] })}</script>`
    )
    .replace(/<noscript>\s*<h1>[\s\S]*?<\/noscript>/, `<noscript>\n${body}\n    </noscript>`)
  if (image) {
    html = html.replace(/(<meta (?:property="og|name="twitter):image" content=")[^"]*/g, `$1${image}`)
  }
  return html
}

// Generates /projects, one /projects/<slug> page per project, and sitemap.xml
// from src/data/projects.json. Vercel's cleanUrls serves the .html files
// without the extension.
function staticPages() {
  let outDir
  return {
    name: 'static-pages',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const projects = JSON.parse(fs.readFileSync(path.resolve('src/data/projects.json'), 'utf8'))
      const baseHtml = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8')
      const assets = fs.readdirSync(path.join(outDir, 'assets'))
      const imageUrl = (name) => {
        const file = assets.find((f) => f.startsWith(`${name}-`) && f.endsWith('.webp'))
        return file && `${SITE_URL}/assets/${file}`
      }
      const today = new Date().toISOString().slice(0, 10)

      // /projects
      const listTitle = 'Projects | Shoaib Ahmed — React, Next.js & WordPress Developer'
      const listDescription = 'Portfolio of web projects by Shoaib Ahmed: React and Next.js apps, WordPress websites, e-commerce stores, landing pages and HTML email templates.'
      const listUrl = `${SITE_URL}/projects`
      fs.writeFileSync(
        path.join(outDir, 'projects.html'),
        renderPage(baseHtml, {
          title: listTitle,
          description: listDescription,
          url: listUrl,
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'CollectionPage',
                '@id': `${listUrl}#page`,
                url: listUrl,
                name: listTitle,
                description: listDescription,
                isPartOf: { '@id': `${SITE_URL}/#website` },
                author: PERSON,
                mainEntity: {
                  '@type': 'ItemList',
                  itemListElement: projects.map((p, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    url: `${SITE_URL}/projects/${p.slug}`,
                    name: p.title,
                  })),
                },
              },
              breadcrumbs([['Home', `${SITE_URL}/`], ['Projects', listUrl]]),
            ],
          },
          body: [
            '      <h1>Web Development Projects by Shoaib Ahmed</h1>',
            `      <p>${escapeHtml(listDescription)}</p>`,
            '      <ul>',
            ...projects.map((p) => `        <li><a href="/projects/${p.slug}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.summary)}</li>`),
            '      </ul>',
            '      <p><a href="/">Home</a></p>',
          ].join('\n'),
        })
      )

      // /projects/<slug>
      fs.mkdirSync(path.join(outDir, 'projects'), { recursive: true })
      for (const p of projects) {
        const url = `${SITE_URL}/projects/${p.slug}`
        const image = imageUrl(p.img)
        fs.writeFileSync(
          path.join(outDir, 'projects', `${p.slug}.html`),
          renderPage(baseHtml, {
            title: p.metaTitle,
            description: p.summary,
            url,
            ogType: 'article',
            image,
            jsonLd: {
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Article',
                  '@id': `${url}#article`,
                  headline: p.title,
                  description: p.summary,
                  url,
                  mainEntityOfPage: url,
                  image,
                  author: PERSON,
                  publisher: PERSON,
                  dateModified: today,
                  keywords: p.stack.join(', '),
                  about: { '@type': 'CreativeWork', name: p.title, url: p.link, ...(p.repo && { codeRepository: p.repo }) },
                },
                breadcrumbs([['Home', `${SITE_URL}/`], ['Projects', `${SITE_URL}/projects`], [p.title, url]]),
              ],
            },
            body: [
              `      <h1>${escapeHtml(p.title)}</h1>`,
              `      <p>${escapeHtml(p.category)} · ${escapeHtml(p.stack.join(', '))}</p>`,
              `      <p>${escapeHtml(p.summary)}</p>`,
              ...p.overview.map((o) => `      <p>${escapeHtml(o)}</p>`),
              '      <h2>Key features</h2>',
              '      <ul>',
              ...p.features.map((f) => `        <li>${escapeHtml(f)}</li>`),
              '      </ul>',
              `      <p><a href="${escapeHtml(p.link)}">View live site</a>${p.repo ? ` · <a href="${escapeHtml(p.repo)}">Source code</a>` : ''} · <a href="/projects">All projects</a></p>`,
            ].join('\n'),
          })
        )
      }

      // sitemap.xml
      const urls = [
        [`${SITE_URL}/`, '1.0'],
        [listUrl, '0.8'],
        ...projects.map((p) => [`${SITE_URL}/projects/${p.slug}`, '0.7']),
      ]
      fs.writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
          .map(([loc, priority]) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`)
          .join('\n')}\n</urlset>\n`
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), staticPages()],
})
