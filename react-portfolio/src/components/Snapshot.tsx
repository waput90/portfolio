import { useRef, useMemo, useEffect, useState } from "react"
import { navItems, linkedinUrl, qrSrc } from "../variables"
import { downloadResumePdf } from "./DownloadPdf"

interface SnapshotProps {
    yearsExperience: number
    skillDisplayLevels: Record<string, number>
    setActiveSection: React.Dispatch<React.SetStateAction<string>>
    setScrollProgress: React.Dispatch<React.SetStateAction<number>>
}

export const Snapshot: React.FC<SnapshotProps> = ({ 
    yearsExperience, 
    skillDisplayLevels, 
    setActiveSection, 
    setScrollProgress }) => {
    const snapshotRef = useRef<HTMLElement | null>(null)
        
    const releaseCount = 45
    const reviewCount = 220


    const [shouldCount, setShouldCount] = useState(false)
    const [countYears, setCountYears] = useState(0)
    const [countReleases, setCountReleases] = useState(0)
    const [countReviews, setCountReviews] = useState(0)

  
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

    return (
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
    )
}