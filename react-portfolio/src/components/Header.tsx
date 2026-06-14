import { navItems } from "../variables"

interface HeaderProps {
    activeSection: string
    scrollProgress: number
}

export const Header: React.FC<HeaderProps> = ({ activeSection, scrollProgress }) => (
    <header className="glass-card sticky top-4 z-20 mb-6 overflow-hidden px-4 py-3 md:px-6">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <a href="#hero" className="font-display text-sm font-semibold tracking-[0.24em] text-slate-200 uppercase">
                Digital Profile
            </a>
            <nav className="flex flex-wrap gap-2 text-sm text-slate-300">
                {navItems.map((item) => (
                    <a
                        key={item}
                        href={`#${item}`}
                        className={`rounded-full border px-3 py-1.5 capitalize transition ${activeSection === item
                                ? 'border-white/10 hover:border-white/30 hover:text-white'
                                // 'border-cyan-300/60 bg-cyan-300/10 text-cyan-100'
                                : 'border-white/10 hover:border-white/30 hover:text-white'}`}
                    >
                        {item}
                    </a>
                ))}
            </nav>
        </div>
        <div className="h-1 w-full rounded-full bg-white/10">
            <div
                className="h-full rounded-full bg-gradient-to-r from-orange-400 via-rose-300 to-cyan-300 transition-[width] duration-100"
                style={{ width: `${scrollProgress}%` }} />
        </div>
    </header>
)