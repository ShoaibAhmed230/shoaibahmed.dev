import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import  Head  from "react-head";
import { Header } from './Components/Header/Header'
import { HeroSection } from './Components/Hero-Section/HeroSection'
import { About } from './Components/About/About'
import { Projects } from './Components/Projects/Projects'
import { Footer } from './Components/Footer/Footer'
import { Contact } from './Components/Contact/Contact'

function App() {
    // ✅ Use full absolute URL for social preview image
  const thumbnailUrl =
    "https://shoaibahmed-dev.vercel.app/shoaib-Thumbnail-img.jpg";
  return (
    <>

      <Head>
        {/*  SEO Meta Tags */}
        <title>Shoaib Ahmed — Front-End Developer</title>
        <meta
          name="description"
          content="I'm Shoaib Ahmed, a front-end developer specializing in React, JavaScript, and modern web technologies. Explore my portfolio projects and skills."
        />
        <meta property="og:title" content="Shoaib Ahmed — Front-End Developer" />
        <meta
          property="og:description"
          content="Portfolio of Shoaib Ahmed, showcasing web development projects in React, JavaScript, and UI/UX."
        />
        <meta property="og:image" content={thumbnailUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shoaib Ahmed — Front-End Developer" />
        <meta
          name="twitter:description"
          content="Front-end developer portfolio with projects in React, JavaScript, and modern UI design."
        />
        <meta name="twitter:image" content={thumbnailUrl} />
      </Head>
      <div className='container mx-auto px-[clamp(1rem,4vw,2rem)]'>
        <Header />
        <HeroSection />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>

    </>
  )
}

export default App
