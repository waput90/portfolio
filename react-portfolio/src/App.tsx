import { useEffect, useMemo, useRef, useState } from 'react'
import { divIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, A11y, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { skills, experiences, projects, testimonials, aggregateInsights, navItems } from './variables'
import { downloadResumePdf } from './DownloadPdf'


const App: React.FC = () => {
  const age = new Date().getFullYear() - 1996
  const yearsExperience = new Date().getFullYear() - 2018
  const davao: [number, number] = [7.1907, 125.4553]
  const [scrollProgress, setScrollProgress] = useState(0)
  const [shouldCount, setShouldCount] = useState(false)
  const [countYears, setCountYears] = useState(0)
  const [countReleases, setCountReleases] = useState(0)
  const [countReviews, setCountReviews] = useState(0)
  const [animateSkills, setAnimateSkills] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [skillDisplayLevels, setSkillDisplayLevels] = useState<Record<string, number>>(() =>
    Object.fromEntries(skills.map((skill) => [skill.name, 0])),
  )
  const snapshotRef = useRef<HTMLElement | null>(null)
  const skillsRef = useRef<HTMLElement | null>(null)

  const releaseCount = 45
  const reviewCount = 220
  const linkedinUrl = 'https://www.linkedin.com/in/james-t-140428149/'
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(linkedinUrl)}`

  const pulseIcon = useMemo(
    () =>
      divIcon({
        className: 'pulse-marker',
        html: '<span class="pulse-dot"></span>',
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      }),
    [],
  )

  const radarMetrics = useMemo(
    () => [
      { label: 'Backend', value: Math.round((skillDisplayLevels['C#'] + skillDisplayLevels['.NET Core']) / 2) },
      { label: 'Frontend', value: Math.round((skillDisplayLevels.JavaScript + skillDisplayLevels.ReactJS + skillDisplayLevels.Angular) / 3) },
      { label: 'Delivery', value: Math.round((skillDisplayLevels.Communication + skillDisplayLevels.CSS) / 2) },
      { label: 'Foundations', value: Math.round((skillDisplayLevels.HTML + skillDisplayLevels.CSS) / 2) },
      { label: 'Stack Breadth', value: Math.round((skillDisplayLevels['C#'] + skillDisplayLevels.JavaScript + skillDisplayLevels['.NET Core']) / 3) },
    ],
    [skillDisplayLevels],
  )

  const radarPolygons = useMemo(() => {
    const center = 74
    const maxRadius = 56
    const count = radarMetrics.length

    const toPointString = (valueScale: number) =>
      radarMetrics
        .map((_, index) => {
          const angle = -Math.PI / 2 + (index * Math.PI * 2) / count
          const x = center + valueScale * maxRadius * Math.cos(angle)
          const y = center + valueScale * maxRadius * Math.sin(angle)
          return `${x},${y}`
        })
        .join(' ')

    const rings = [0.2, 0.4, 0.6, 0.8, 1].map((scale) => toPointString(scale))
    const values = radarMetrics
      .map((metric, index) => {
        const angle = -Math.PI / 2 + (index * Math.PI * 2) / count
        const valueScale = metric.value / 100
        const x = center + valueScale * maxRadius * Math.cos(angle)
        const y = center + valueScale * maxRadius * Math.sin(angle)
        return `${x},${y}`
      })
      .join(' ')

    const labels = radarMetrics.map((metric, index) => {
      const angle = -Math.PI / 2 + (index * Math.PI * 2) / count
      const x = center + (maxRadius + 16) * Math.cos(angle)
      const y = center + (maxRadius + 16) * Math.sin(angle)
      return { ...metric, x, y }
    })

    return { rings, values, labels, center }
  }, [radarMetrics])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight
      const ratio = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0
      setScrollProgress(Math.max(0, Math.min(100, ratio)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const node = snapshotRef.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldCount(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const node = skillsRef.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateSkills(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sectionNodes = navItems
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (sectionNodes.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]?.target.id) {
          setActiveSection(visibleEntries[0].target.id)
        }
      },
      { threshold: [0.2, 0.35, 0.5, 0.65], rootMargin: '-20% 0px -30% 0px' },
    )

    sectionNodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldCount) {
      return
    }

    const duration = 1200
    const start = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setCountYears(Math.round(yearsExperience * easeOut))
      setCountReleases(Math.round(releaseCount * easeOut))
      setCountReviews(Math.round(reviewCount * easeOut))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [shouldCount, yearsExperience])

  useEffect(() => {
    if (!animateSkills) {
      return
    }

    const start = performance.now()
    const perSkillDelay = 85
    const perSkillDuration = 900
    let raf = 0

    const step = (now: number) => {
      const elapsed = now - start
      let allComplete = true

      const nextLevels = Object.fromEntries(
        skills.map((skill, index) => {
          const localProgress = Math.min(Math.max((elapsed - index * perSkillDelay) / perSkillDuration, 0), 1)
          const eased = 1 - Math.pow(1 - localProgress, 3)
          const level = Math.round(skill.level * eased)

          if (localProgress < 1) {
            allComplete = false
          }

          return [skill.name, level]
        }),
      )

      setSkillDisplayLevels(nextLevels)

      if (!allComplete) {
        raf = requestAnimationFrame(step)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [animateSkills])


  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-16 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" />

      <div className="relative mx-auto w-[min(1120px,calc(100%-1.5rem))] py-6 md:py-10">
        <header className="glass-card sticky top-4 z-20 mb-6 overflow-hidden px-4 py-3 md:px-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <a href="#hero" className="font-display text-sm font-semibold tracking-[0.24em] text-slate-200 uppercase">
            James Tubiano
          </a>
          <nav className="flex flex-wrap gap-2 text-sm text-slate-300">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`rounded-full border px-3 py-1.5 capitalize transition ${
                  activeSection === item
                    ? 'border-cyan-300/60 bg-cyan-300/10 text-cyan-100'
                    : 'border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
          </div>
          <div className="h-1 w-full rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-400 via-rose-300 to-cyan-300 transition-[width] duration-100"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </header>

        <main className="space-y-4 md:space-y-5">
          <section id="hero" className="glass-card grid overflow-hidden md:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 md:p-10">
              <p className="animate-fade-up text-xs font-semibold tracking-[0.3em] text-orange-200 uppercase" style={{ animationDelay: '0.05s' }}>
                C# .NET Developer | Frontend Enthusiast
              </p>
              <h1
                className="font-display animate-fade-up mt-3 text-4xl leading-tight font-semibold md:text-6xl"
                style={{ animationDelay: '0.12s' }}
              >
                Building digital products that balance
                <span className="text-gradient"> speed, reliability, and craft.</span>
              </h1>
              <p className="animate-fade-up mt-4 max-w-2xl text-sm text-slate-300 md:text-base" style={{ animationDelay: '0.2s' }}>
                I am James Tubiano, a software engineer with 5+ years of experience shipping
                applications with C#, ASP.NET Core, Angular, and React.
              </p>

              <div className="animate-fade-up mt-4 flex flex-wrap gap-2" style={{ animationDelay: '0.24s' }}>
                <span className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                  Open to Senior .NET Roles
                </span>
                <span className="rounded-full border border-orange-300/35 bg-orange-300/10 px-3 py-1 text-xs font-semibold text-orange-100">
                  Available for Freelance Projects
                </span>
              </div>

              <div className="animate-fade-up mt-6 flex flex-wrap gap-3" style={{ animationDelay: '0.28s' }}>
                <a
                  href="#projects"
                  className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  View Projects
                </a>
                <a
                  href="mailto:tubianojames@gmail.com"
                  className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-white/40"
                >
                  Hire Me
                </a>
              </div>

              <div className="animate-fade-up mt-5 flex gap-4 text-sm text-slate-300" style={{ animationDelay: '0.34s' }}>
                <a href="https://github.com/waput90" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                  GitHub
                </a>
                <a
                  href="https://ph.linkedin.com/in/james-t-140428149/tl"
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="relative border-t border-white/10 md:border-t-0 md:border-l">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
              <img
                src="images/profile-img.jpeg"
                alt="James Tubiano"
                className="animate-float h-full min-h-[340px] w-full object-cover"
              />
            </div>
          </section>

          <section id="snapshot" ref={snapshotRef} className="glass-card animate-fade-up p-6 md:p-8" style={{ animationDelay: '0.08s' }}>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-semibold md:text-3xl">Recruiter Snapshot</h2>
                <p className="mt-2 text-sm text-slate-300">Fast facts to evaluate fit at a glance.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => downloadResumePdf({ yearsExperience, releaseCount, reviewCount })}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-xs font-semibold tracking-wide text-white uppercase transition hover:brightness-110"
                >
                  Download One-Page Resume PDF
                </button>
                <a
                  href="mailto:tubianojames@gmail.com?subject=Interview%20Invitation"
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold tracking-wide text-slate-100 uppercase transition hover:border-white/40"
                >
                  Schedule an Interview
                </a>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/30">
                <p className="text-xs tracking-[0.18em] text-slate-400 uppercase">Experience</p>
                <p className="font-display mt-2 text-3xl font-semibold text-white">{countYears}+ yrs</p>
                <p className="mt-2 text-sm text-slate-300">Building backend and full stack solutions in production.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/30">
                <p className="text-xs tracking-[0.18em] text-slate-400 uppercase">Feature Releases</p>
                <p className="font-display mt-2 text-3xl font-semibold text-white">{countReleases}+</p>
                <p className="mt-2 text-sm text-slate-300">Delivered across fintech, CRM, and insurance workflow systems.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/30">
                <p className="text-xs tracking-[0.18em] text-slate-400 uppercase">PR Collaboration</p>
                <p className="font-display mt-2 text-3xl font-semibold text-white">{countReviews}+</p>
                <p className="mt-2 text-sm text-slate-300">Review interactions with clear communication and quality-focused feedback.</p>
              </article>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-display text-lg font-semibold text-white">Compact Skills Matrix</h3>
                <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/8 text-slate-300">
                      <tr>
                        <th className="px-3 py-2">Domain</th>
                        <th className="px-3 py-2">Strength</th>
                        <th className="px-3 py-2">Focus</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-white/10">
                        <td className="px-3 py-2 text-slate-200">Backend</td>
                        <td className="px-3 py-2 text-slate-100">High</td>
                        <td className="px-3 py-2 text-slate-300">C#, .NET Core, API design</td>
                      </tr>
                      <tr className="border-t border-white/10">
                        <td className="px-3 py-2 text-slate-200">Frontend</td>
                        <td className="px-3 py-2 text-slate-100">Strong</td>
                        <td className="px-3 py-2 text-slate-300">React, Angular, UX implementation</td>
                      </tr>
                      <tr className="border-t border-white/10">
                        <td className="px-3 py-2 text-slate-200">Delivery</td>
                        <td className="px-3 py-2 text-slate-100">Strong</td>
                        <td className="px-3 py-2 text-slate-300">Releases, PR reviews, production fixes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-display text-lg font-semibold text-white">Recruiter Quick Access</h3>
                <p className="mt-2 text-sm text-slate-300">Scan to open my LinkedIn profile quickly during screening.</p>
                <div className="mt-4 rounded-2xl border border-white/10 bg-[#0a1223]/80 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs tracking-[0.18em] text-slate-400 uppercase">Skills Snapshot</p>
                    <p className="text-[11px] text-cyan-200">Live score</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <svg viewBox="0 0 148 148" className="h-36 w-36">
                      {radarPolygons.rings.map((points) => (
                        <polygon
                          key={points}
                          points={points}
                          fill="none"
                          stroke="rgba(148,163,184,0.25)"
                          strokeWidth="1"
                        />
                      ))}
                      {radarPolygons.labels.map((label) => (
                        <line
                          key={`${label.label}-axis`}
                          x1={radarPolygons.center}
                          y1={radarPolygons.center}
                          x2={label.x}
                          y2={label.y}
                          stroke="rgba(148,163,184,0.2)"
                          strokeWidth="1"
                        />
                      ))}
                      <polygon
                        points={radarPolygons.values}
                        fill="rgba(34,211,238,0.22)"
                        stroke="rgba(251,146,60,0.9)"
                        strokeWidth="2"
                      />
                      {radarPolygons.labels.map((label) => (
                        <text
                          key={label.label}
                          x={label.x}
                          y={label.y}
                          fill="rgba(226,232,240,0.92)"
                          fontSize="7"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {label.label}
                        </text>
                      ))}
                    </svg>
                  </div>
                  <div className="mt-1 grid grid-cols-2 gap-1.5 text-[11px] text-slate-300">
                    {radarMetrics.slice(0, 4).map((metric) => (
                      <p key={metric.label}>
                        <span className="text-slate-400">{metric.label}:</span> {metric.value}%
                      </p>
                    ))}
                  </div>
                </div>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-4 inline-flex rounded-2xl border border-white/15 bg-white/5 p-3 transition hover:border-cyan-300/50"
                >
                  <img src={qrSrc} alt="LinkedIn QR code" className="h-28 w-28 rounded-lg bg-white p-1" loading="lazy" />
                </a>
              </article>
            </div>
          </section>

          <section id="impact" className="glass-card animate-fade-up p-6 md:p-8" style={{ animationDelay: '0.1s' }}>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-semibold md:text-3xl">Impact Metrics</h2>
                <p className="mt-2 text-sm text-slate-300">Quantifiable outcomes and delivery signals recruiters look for.</p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:-translate-y-1">
                <p className="text-xs tracking-[0.18em] text-slate-400 uppercase">Production Focus</p>
                <p className="font-display mt-2 text-2xl font-semibold text-white">High</p>
                <p className="mt-2 text-sm text-slate-300">Built features directly tied to business-critical operations.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:-translate-y-1">
                <p className="text-xs tracking-[0.18em] text-slate-400 uppercase">Legacy + Modern</p>
                <p className="font-display mt-2 text-2xl font-semibold text-white">End-to-End</p>
                <p className="mt-2 text-sm text-slate-300">Comfortable improving legacy systems while building new modules.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:-translate-y-1">
                <p className="text-xs tracking-[0.18em] text-slate-400 uppercase">API Integrations</p>
                <p className="font-display mt-2 text-2xl font-semibold text-white">Multiple</p>
                <p className="mt-2 text-sm text-slate-300">BlackFin, Amazon, PayPal, CoinPayments, and more.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:-translate-y-1">
                <p className="text-xs tracking-[0.18em] text-slate-400 uppercase">Team Contribution</p>
                <p className="font-display mt-2 text-2xl font-semibold text-white">Active</p>
                <p className="mt-2 text-sm text-slate-300">PR reviews, sprint planning, bug resolution, and cross-team support.</p>
              </article>
            </div>
          </section>

          <section id="about" className="glass-card animate-fade-up p-6 md:p-8" style={{ animationDelay: '0.06s' }}>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">About</h2>
            <p className="mt-3 max-w-3xl text-slate-300">
              With great power comes great responsibility. I design and deliver systems with
              ownership, clean architecture, and practical outcomes.
            </p>
            <div className="mt-5 grid gap-2 text-sm text-slate-200 sm:grid-cols-2 md:text-base">
              <p><span className="text-slate-400">Location:</span> Davao City, Philippines</p>
              <p><span className="text-slate-400">Age:</span> {age}</p>
              <p><span className="text-slate-400">Degree:</span> Bachelor of Information Technology</p>
              <p><span className="text-slate-400">Email:</span> tubianojames@gmail.com</p>
              <p><span className="text-slate-400">Freelance:</span> Available</p>
            </div>
          </section>

          <section id="skills" ref={skillsRef} className="glass-card animate-fade-up p-6 md:p-8" style={{ animationDelay: '0.1s' }}>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">Skills</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {skills.map((skill, index) => (
                <div key={skill.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-200">
                    <span>{skill.name}</span>
                    <span>{skillDisplayLevels[skill.name] ?? 0}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 via-rose-300 to-cyan-300 transition-[width] duration-1200 ease-out"
                      style={{
                        width: animateSkills ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 85}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="experience" className="glass-card animate-fade-up p-6 md:p-8" style={{ animationDelay: '0.14s' }}>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">Professional Experience</h2>
            <div className="mt-5 grid gap-3">
              {experiences.map((job) => (
                <article key={`${job.role}-${job.period}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
                  <p className="text-xs tracking-[0.2em] text-orange-200 uppercase">{job.period}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-white">{job.role}</h3>
                  <p className="mt-1 text-sm text-slate-300">{job.company}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
                    {job.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="projects" className="animate-fade-up" style={{ animationDelay: '0.18s' }}>
            <div className="mb-3 px-1">
              <h2 className="font-display text-2xl font-semibold md:text-3xl">Selected Projects</h2>
              <p className="mt-2 text-sm text-slate-300">Sites and products I contributed to and helped ship.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <a
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group glass-card block overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
                      <span className="font-display text-lg font-semibold text-white">{project.title}</span>
                    </div>
                  </div>
                  <div className="border-t border-white/10 p-4">
                    <ul className="list-disc space-y-1 pl-4 text-xs text-slate-300">
                      {project.impacts.map((impact) => (
                        <li key={impact}>{impact}</li>
                      ))}
                    </ul>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section id="testimonials" className="glass-card animate-fade-up p-6 md:p-8" style={{ animationDelay: '0.2s' }}>
            <div className="mb-4">
              <h2 className="font-display text-2xl font-semibold md:text-3xl">Testimonials</h2>
              <p className="mt-2 text-sm text-slate-300">A few recommendations from people I have collaborated with.</p>
            </div>
            <Swiper
              modules={[Autoplay, Pagination, A11y]}
              slidesPerView={1}
              spaceBetween={12}
              speed={700}
              loop
              autoplay={{ delay: 3200, pauseOnMouseEnter: true, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 14 },
                1024: { slidesPerView: 3, spaceBetween: 16 },
              }}
              className="testimonials-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.name + testimonial.role}>
                  <article className="testimonial-glow group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-300/40 hover:bg-white/[0.06]">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      {testimonial.context && (
                        <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-cyan-100 uppercase">
                          {testimonial.context}
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-slate-200">"{testimonial.quote}"</p>
                    <div className="mt-4 border-t border-white/10 pt-3">
                      <p className="font-display text-sm font-semibold text-orange-200">{testimonial.name}</p>
                      {testimonial.role && <p className="text-xs text-slate-400">{testimonial.role}</p>}
                      {testimonial.themes && testimonial.themes.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {testimonial.themes.slice(0, 3).map((theme) => (
                            <span
                              key={theme}
                              className="rounded-full border border-white/15 bg-white/6 px-2 py-0.5 text-[10px] text-slate-300"
                            >
                              {theme}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          <section id="contact" className="glass-card animate-fade-up p-6 md:p-8" style={{ animationDelay: '0.24s' }}>
            <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
              <div>
                <h2 className="font-display text-2xl font-semibold md:text-3xl">Contact</h2>
                <p className="mt-2 text-slate-300">
                  If you have questions about my skills and experience, let us connect.
                </p>
                <div className="mt-5 grid gap-2 text-slate-100 md:text-lg">
                  <a href="mailto:tubianojames@gmail.com" className="underline decoration-orange-300/70 underline-offset-4">
                    tubianojames@gmail.com
                  </a>
                  <p>Anywhere in Davao City, PH</p>
                  <a
                    href="https://maps.google.com/maps?q=davao city"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-200 underline underline-offset-4"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-2xl border border-white/10">
                  <div className="pointer-events-none absolute inset-0 z-[401] bg-gradient-to-t from-[#090c16]/35 to-transparent" />
                  <MapContainer
                    center={davao}
                    zoom={12}
                    scrollWheelZoom={false}
                    className="h-[320px] w-full"
                  >
                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                    <Marker position={davao} icon={pulseIcon}>
                      <Popup>
                        Davao City, Philippines<br />Available for remote and freelance work.
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src="images/profile-img.jpeg"
                      alt="James Tubiano"
                      className="h-16 w-16 rounded-xl object-cover ring-1 ring-white/20"
                    />
                    <div>
                      <p className="font-display text-sm font-semibold text-white">James Tubiano</p>
                      <p className="text-xs text-slate-300">Senior .NET Engineer | React Frontend Contributor</p>
                      <p className="mt-1 text-xs text-slate-400">Summary insights from recommendations</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-[11px] tracking-[0.16em] text-slate-400 uppercase">Strongest Themes</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {aggregateInsights.strongestThemes.slice(0, 6).map((theme) => (
                        <span key={theme} className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-2 py-0.5 text-[10px] text-cyan-100">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-[11px] tracking-[0.16em] text-slate-400 uppercase">Career Signals</p>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                      {aggregateInsights.careerSignals.slice(0, 4).map((signal) => (
                        <li key={signal}>{signal}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-5 text-center text-xs text-slate-400 md:text-sm">
          Copyright {new Date().getFullYear()} JMT
        </footer>
      </div>
    </div>
  )
}

export default App
