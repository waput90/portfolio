import { TerminalWhoAmI } from "../TerminalWhoAmI";

interface ProfileProps {
    yearsExperience: number
}

export const Profile: React.FC<ProfileProps> = ({ yearsExperience }) => (
    <section id="hero" className="glass-card grid overflow-hidden md:grid-cols-[1.1fr_0.9fr]">
        <div className="p-6 md:p-10 flex flex-col justify-center min-h-[300px]">
            <div>
            <p className="animate-fade-up text-xs font-semibold tracking-[0.3em] text-orange-200 uppercase" style={{ animationDelay: '0.05s' }}>
                C# | .NET | Enthusiast Rockstar Developer
            </p>
            
            <h4 className="font-display animate-fade-up mt-3 text-xl leading-tight font-semibold md:text-5xl lg:text-6xl" style={{ animationDelay: '0.12s' }}>
                Building digital products that balance <span className="text-gradient"> speed, reliability, and craft.</span>
            </h4>
            
            <div className="animate-fade-up mt-4 flex flex-wrap gap-2" style={{ animationDelay: '0.24s' }}>
                <span className="rounded-full border border-orange-300/35 bg-orange-300/10 px-3 py-1 text-xs font-semibold text-orange-100">
                Available for Freelance Projects
                </span>
            </div>

            <div className="animate-fade-up mt-6 flex flex-wrap gap-3" style={{ animationDelay: '0.28s' }}>
                <a href="#projects" className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110">
                View Projects
                </a>
                <a href="mailto:tubianojames@gmail.com" className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-white/40">
                Hire Me
                </a>
            </div>

            {/* Social Links */}
            <div className="animate-fade-up mt-5 flex gap-4 text-sm text-slate-300" style={{ animationDelay: '0.34s' }}>
                <a href="https://github.com/waput90" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                GitHub
                </a>
                <a href="https://ph.linkedin.com/in/james-t-140428149/tl" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                LinkedIn
                </a>
            </div>
            </div>
        </div>
        <div 
            className="p-6 md:p-10 border-t border-white/10 md:border-t-0 md:border-l relative bg-slate-950/40 flex flex-col items-center justify-center gap-8"
            style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
            }}
        >
            
            <div className="relative z-10 w-full max-w-[240px] md:max-w-[260px] aspect-square overflow-hidden rounded-full border-2 border-white/15 shadow-2xl bg-slate-900 shrink-0">
            <div className="bg-gradient-to-b from-white/5 to-transparent absolute inset-0 z-10 pointer-events-none" />
            <img
                src="images/profile-img.jpeg"
                alt="James Tubiano"
                className="w-full h-full object-cover object-center transition duration-500 hover:scale-[1.03]" 
            />
            </div>
            
            <div className="border-t border-white/10 pt-6 w-full z-10">
            <TerminalWhoAmI yearsOfExp={yearsExperience} />
            </div>
            
        </div>
    </section>
)