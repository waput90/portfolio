import { projects } from "../variables";


export const SelectedProjects: React.FC = () => (
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
)