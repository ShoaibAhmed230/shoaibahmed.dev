import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './Components/Header'
import {HeroSection} from './Components/HeroSection'

function App() {
  const [count, setCount] = useState(0)

  return (
<div>
<Header />
<HeroSection />

<h1> test</h1>

</div>
  )
}

export default App
