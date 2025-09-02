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
<h1 className='text-white'> 2test</h1>
<HeroSection />


</div>
  )
}

export default App
