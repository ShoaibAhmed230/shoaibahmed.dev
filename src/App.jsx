import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './Components/Header/Header'
import {HeroSection} from './Components/Hero-Section/HeroSection'
import { About } from './Components/About/About'

function App() {
  const [count, setCount] = useState(0)

  return (
<div>
<Header />
<HeroSection />
<About />
</div>
  )
}

export default App
