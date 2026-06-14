import React, { useEffect, useRef, useState } from "react"
import { skills, skillCategories, SKILL_ICONS } from "../variables"

interface SkillProps {
    skillDisplayLevels: Record<string, number>
    setSkillDisplayLevels: React.Dispatch<React.SetStateAction<Record<string, number>>>
}

export const Skills: React.FC<SkillProps> = ({ skillDisplayLevels, setSkillDisplayLevels }) => {
    const [animateSkills, setAnimateSkills] = useState(false)
    const skillsRef = useRef<HTMLElement | null>(null)

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
    }, [animateSkills, setSkillDisplayLevels])

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

    return (
    <section id="skills" ref={skillsRef} className="glass-card animate-fade-up p-6 md:p-8" style={{ animationDelay: '0.1s' }}>
        <h2 className="font-display text-2xl font-semibold md:text-3xl">Skills</h2>
        <div className="mt-6 space-y-8">
            {skillCategories.map((cat, catIndex) => (
            <div key={cat.category} className="space-y-3">
                {/* Category Header with Icon and Description */}
                <div className="flex items-start gap-3">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{cat.category}</h3>
                    <p className="mt-1 text-sm text-slate-400">{cat.description}</p>
                </div>
                </div>

                {/* Skills in Row */}
                <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, skillIndex) => {
                    const globalIndex = skillCategories.slice(0, catIndex).reduce((sum, c) => sum + c.skills.length, 0) + skillIndex
                    return (
                    <div key={skill.name} className="flex-1 min-w-[200px] sm:min-w-[240px] rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-orange-300/40 hover:bg-white/[0.06]">
                        {/* Skill Name and Icon */}
                        <div className="flex items-center gap-2 mb-3">
                        {SKILL_ICONS[skill.name] && (
                            <img src={SKILL_ICONS[skill.name]} alt={skill.name} className="h-6 w-6 object-contain" loading="lazy" />
                        )}
                        <span className="font-semibold text-slate-200">{skill.name}</span>
                        </div>

                        {/* Skill Level Display */}
                        <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Proficiency</span>
                            <span className="font-semibold text-orange-300">{skillDisplayLevels[skill.name] ?? 0}%</span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                            <div
                            className="h-full rounded-full bg-gradient-to-r from-orange-400 via-rose-300 to-cyan-300 transition-[width] duration-1200 ease-out"
                            style={{
                                width: animateSkills ? `${skill.level}%` : '0%',
                                transitionDelay: `${globalIndex * 85}ms`,
                            }}
                            />
                        </div>
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>
            ))}
        </div>
    </section>
)
}