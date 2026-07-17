import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Code, Calendar, ChevronDown } from "lucide-react";
import { experience, faqs } from "./data";
import SectionHeading from "./components/SectionHeading";

const icons = {
  Training: <Code size={14} />,
  Degree: <GraduationCap size={14} />,
};

const FAQItem = ({ faq, isOpen, onClick, index }) => (
  <div className="border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-[#0c1220] hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${index}`}
      id={`faq-question-${index}`}
    >
      <span className="text-sm font-semibold text-slate-900 dark:text-white pr-4">{faq.q}</span>
      <ChevronDown
        size={16}
        className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <div
      id={`faq-answer-${index}`}
      role="region"
      aria-labelledby={`faq-question-${index}`}
      className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
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

  return (
    <>
      <section id="experience" className="py-28 px-6 bg-[#060a13] relative z-10">
        <div ref={ref} className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 max-sm:opacity-100 sm:opacity-0 sm:transform-gpu ${inView ? 'sm:animate-slide-up' : ''}`}>
            <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4">Experience</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Experience & <span className="text-gradient">Education</span>
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 mt-3 max-w-md mx-auto">
              My professional experience and academic background.
            </p>
          </div>

          <div className={`max-sm:opacity-100 sm:opacity-0 sm:transform-gpu ${inView ? 'sm:animate-slide-right' : ''}`}>
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

                    <div className="group p-5 rounded-2xl bg-white dark:bg-[#0c1220] transition-all duration-500">
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
                            className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md text-white bg-gradient-to-r ${exp.color}`}
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
        </div>
      </section>

      <section id="faq" className="py-28 px-6 bg-[#060a13]">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked"
            highlight="Questions"
            description="Common questions about working with me."
          />

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;
