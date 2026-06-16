import React from "react";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";
import { testimonials } from "./data";

const Testimonials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <section id="testimonials" className="py-28 px-6 bg-slate-50/50 dark:bg-[#060a13]">
        <div ref={ref} className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
            <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              What People <span className="text-gradient">Say</span>
            </h2>
            <p className="text-base text-slate-400 mt-3 max-w-lg mx-auto">
              Feedback from professors, collaborators, and clients I've worked with.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`group relative p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#0c1220] hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5 opacity-0 ${inView ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Quote size={14} className="text-accent" />
                </div>

                <div className="flex gap-0.5 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-[11px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
