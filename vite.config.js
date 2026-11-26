import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = 'https://shoaibahmed-dev.vercel.app'

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Writes dist/projects.html after the build so crawlers that don't run JS get
// the right title, description, canonical, structured data and project links.
// Vercel's cleanUrls serves it at /projects.
function projectsPageHtml() {
  let outDir
  return {
    name: 'projects-page-html',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const projects = JSON.parse(fs.readFileSync(path.resolve('src/data/projects.json'), 'utf8'))
      const title = 'Projects | Shoaib Ahmed — React, Next.js & WordPress Developer'
      const description = 'Portfolio of web projects by Shoaib Ahmed: React and Next.js apps, WordPress and Magento 2 (Hyvä) websites, e-commerce stores and landing pages.'
      const url = `${SITE_URL}/projects`

      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        url,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        author: { '@id': `${SITE_URL}/#person` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: projects.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: { '@type': 'CreativeWork', name: p.title, url: p.link, creator: { '@id': `${SITE_URL}/#person` } },
          })),
        },
      }

      const list = projects
        .map((p) => `        <li><a href="${escapeHtml(p.link)}">${escapeHtml(p.title)}</a></li>`)
        .join('\n')

      let html = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8')
      html = html
        .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
        .replace(/(<meta name="description" content=")[^"]*/, `$1${escapeHtml(description)}`)
        .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
        .replace(/(<meta property="og:type" content=")[^"]*/, '$1website')
        .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
        .replace(/(<meta (?:property="og|name="twitter):title" content=")[^"]*/g, `$1${escapeHtml(title)}`)
        .replace(/(<meta (?:property="og|name="twitter):description" content=")[^"]*/g, `$1${escapeHtml(description)}`)
        .replace('</head>', `    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`)
        .replace(
          /<noscript>\s*<h1>[\s\S]*?<\/noscript>/,
          `<noscript>\n      <h1>Web Development Projects by Shoaib Ahmed</h1>\n      <p>${escapeHtml(description)}</p>\n      <ul>\n${list}\n      </ul>\n      <p><a href="/">Home</a></p>\n    </noscript>`
        )

      fs.writeFileSync(path.join(outDir, 'projects.html'), html)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), projectsPageHtml()],
})
