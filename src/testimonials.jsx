import { useInView } from "react-intersection-observer";
import { Quote } from "lucide-react";
import { testimonials } from "./data";
import SectionHeading from "./components/SectionHeading";

const Testimonials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <section id="testimonials" className="py-28 px-6 bg-[#060a13]">
        <div ref={ref} className="max-w-6xl mx-auto">
          <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
            <SectionHeading
              label="Testimonials"
              title="What People"
              highlight="Say"
              description="Academic & collaboration feedback from professors, bootcamps, and fellow developers."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`group relative p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] shadow-sm hover:shadow-lg hover:border-accent/30 transition-all duration-500 hover:shadow-accent/5 opacity-0 ${inView ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Quote size={14} className="text-accent" />
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-accent/20">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.role}</p>
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
