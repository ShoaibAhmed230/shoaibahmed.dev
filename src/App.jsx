import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import { ScrollEffects } from './Components/Effects/ScrollEffects'
import { AmbientBackground } from './Components/Effects/AmbientBackground'

function App() {
  return (
    <>
      <AmbientBackground />
      <ScrollEffects />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </>
  )
}

export default App
