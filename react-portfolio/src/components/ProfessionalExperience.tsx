import { experiences } from "../variables";


export const ProfessionalExperience: React.FC = () => (
    <section id="experience" className="glass-card animate-fade-up p-6 md:p-8" style={{ animationDelay: '0.14s' }}>
        <h2 className="font-display text-2xl font-semibold md:text-3xl">Professional Experience</h2>
        
        {/* Timeline Container */}
        <div className="mt-8 space-y-6 md:space-y-8">
            {experiences.map((job, index) => (
            <div key={`${job.role}-${job.period}`} className="relative flex gap-4 md:gap-6">
                {/* Timeline Line and Dot (Left side) */}
                <div className="flex flex-col items-center">
                {/* Timeline Dot */}
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-orange-400 bg-gradient-to-br from-orange-500/20 to-rose-500/20">
                    <div className="h-3 w-3 rounded-full bg-orange-400" />
                </div>
                
                {/* Timeline Line (connects to next item) */}
                {index < experiences.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-orange-400/50 to-transparent md:h-24" style={{ minHeight: '6rem' }} />
                )}
                </div>
                
                {/* Experience Card (Right side) */}
                <div className="flex-1 pb-4 md:pb-6">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5 transition hover:border-orange-300/40 hover:bg-white/[0.06]">
                    {/* Period Badge */}
                    <div className="inline-block rounded-full bg-orange-500/20 px-3 py-1">
                    <p className="text-xs font-semibold text-orange-300">{job.period}</p>
                    </div>
                    
                    {/* Role */}
                    <h3 className="mt-3 font-display text-lg font-semibold text-white md:text-xl">{job.role}</h3>
                    
                    {/* Company */}
                    <p className="mt-1 text-sm text-slate-400">{job.company}</p>
                    
                    {/* Highlights */}
                    <ul className="mt-3 space-y-2">
                    {job.highlights.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-slate-300">
                        <span className="mt-0.5 text-orange-300">→</span>
                        <span>{item}</span>
                        </li>
                    ))}
                    </ul>
                </div>
                </div>
            </div>
            ))}
        </div>
    </section>
)