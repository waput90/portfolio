export const ImpactMatrix: React.FC = () => (
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
)