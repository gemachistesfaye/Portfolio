import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Code, Calendar, ChevronDown, Award, X } from "lucide-react";
import { experience, certificates, faqs } from "./data";

const icons = {
  Training: <Code size={14} />,
  Degree: <GraduationCap size={14} />,
};

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div className="border border-slate-200/80 dark:border-slate-800/60 rounded-xl overflow-hidden">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-[#0c1220] hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
      aria-expanded={isOpen}
    >
      <span className="text-sm font-semibold text-slate-900 dark:text-white pr-4">{faq.q}</span>
      <ChevronDown
        size={16}
        className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <p className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {faq.a}
      </p>
    </div>
  </div>
);

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState(null);
  const [certImage, setCertImage] = useState(null);

  React.useEffect(() => {
    if (certImage) {
      document.body.classList.add("cert-lightbox-open");
    } else {
      document.body.classList.remove("cert-lightbox-open");
    }
    return () => document.body.classList.remove("cert-lightbox-open");
  }, [certImage]);

  return (
    <>
      <section id="experience" className="py-28 px-6 bg-slate-50/50 dark:bg-[#060a13]">
        <div ref={ref} className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
            <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4">Experience</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Education & <span className="text-gradient">Credentials</span>
            </h2>
            <p className="text-base text-slate-400 mt-3 max-w-md mx-auto">
              My academic background, training, and certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className={`opacity-0 ${inView ? 'animate-slide-right' : ''}`}>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-slate-200 dark:via-slate-800 to-transparent" />

                <div className="space-y-8">
                  {experience.map((exp, i) => (
                    <div
                      key={i}
                      className="relative pl-16"
                    >
                      <div className="absolute left-3 top-1 flex items-center justify-center">
                        <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-br from-accent to-emerald-600 flex items-center justify-center text-white ring-[6px] ring-white dark:ring-[#060a13] shadow-lg shadow-accent/20 z-10">
                          {icons[exp.type]}
                        </div>
                      </div>

                      <div className="group p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#0c1220] hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors">
                              {exp.role}
                            </h3>
                            <p className="text-xs text-accent font-semibold mt-0.5">{exp.org}</p>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold">
                            <Calendar size={11} />
                            {exp.date}
                          </div>
                        </div>

                        <ul className="space-y-2 mb-3">
                          {exp.points.map((p, j) => (
                            <li key={j} className="text-sm text-slate-500 dark:text-slate-400 flex items-start gap-2 leading-relaxed">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" />
                              {p}
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5">
                          {exp.tags.map((t) => (
                            <span
                              key={t}
                              className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-gradient-to-r ${exp.color} bg-clip-text text-transparent border border-slate-200/80 dark:border-slate-700/40`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`opacity-0 ${inView ? 'animate-slide-left' : ''}`} style={{ animationDelay: '0.15s' }}>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-[0.15em]">Awards</h3>
              <div className="grid grid-cols-1 gap-2.5 h-full">
                {certificates.map((cert) => (
                  <button
                    key={cert.name}
                    onClick={() => setCertImage(cert)}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#0c1220] hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 text-left"
                  >
                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent/10 to-emerald-600/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Award size={18} className="text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors truncate">
                        {cert.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">{cert.issuer}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {certImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm" onClick={() => setCertImage(null)}>
          <button
            onClick={() => setCertImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <img
            src={process.env.PUBLIC_URL + `/Certificate/${certImage.file}`}
            alt={certImage.name}
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <section id="faq" className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-base text-slate-400 mt-3 max-w-lg mx-auto">
              Common questions about working with me.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;
