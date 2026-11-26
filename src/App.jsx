import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
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
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </>
  )
}

export default App
