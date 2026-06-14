import { useState } from 'react'
import { skills } from './variables'
import { ProfessionalExperience } from './components/ProfessionalExperience'
import { Skills } from './components/Skills'
import { ImpactMatrix } from './components/ImpactMatrix'
import { SelectedProjects } from './components/SelectedProjects'
import { Footer } from './components/Footer'
import { Testimonials } from './components/Testimonials'
import { Profile } from './components/Profile'
import { Header } from './components/Header'
import { Snapshot } from './components/Snapshot'

const App: React.FC = () => {
  const yearsExperience = new Date().getFullYear() - 2018
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('about')
  const [skillDisplayLevels, setSkillDisplayLevels] = useState<Record<string, number>>(() =>
      Object.fromEntries(skills.map((skill) => [skill.name, 0])),
  )


  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-16 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="relative mx-auto w-[min(1120px,calc(100%-1.5rem))] py-6 md:py-10">
        <Header 
          activeSection={activeSection} 
          scrollProgress={scrollProgress} />
        <main className="space-y-4 md:space-y-5">
          <Profile yearsExperience={yearsExperience} />
          <Snapshot 
            yearsExperience={yearsExperience} 
            skillDisplayLevels={skillDisplayLevels} 
            setActiveSection={setActiveSection} 
            setScrollProgress={setScrollProgress} />
          <ImpactMatrix />
          <Skills 
            skillDisplayLevels={skillDisplayLevels} 
            setSkillDisplayLevels={setSkillDisplayLevels} />
          <ProfessionalExperience />
          <SelectedProjects />
          <Testimonials />
          <Footer />
        </main>
        <footer className="mt-5 text-center text-xs text-slate-400 md:text-sm">
          Copyright {new Date().getFullYear()} JMT
        </footer>
      </div>
    </div>
  )
}

export default App