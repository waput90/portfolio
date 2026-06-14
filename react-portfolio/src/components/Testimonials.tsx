
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, A11y, Pagination } from 'swiper/modules'
import { testimonials } from '../variables'

export const Testimonials: React.FC = () => (
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
)