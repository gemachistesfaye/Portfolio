import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronDown, HelpCircle } from "lucide-react";
import SectionHeading from "./components/SectionHeading";

const faqs = [
  {
    q: "What is your current availability for work?",
    a: "I am actively open to software engineering internships, full-time developer roles, and select contract projects in full-stack web and AI systems.",
  },
  {
    q: "What technologies do you work with most frequently?",
    a: "My primary stack centers on React 18/19, TypeScript, and Tailwind CSS for frontend; Node.js/Express, NestJS, and Python/Flask for backend APIs; and PostgreSQL, MySQL, Prisma, and Supabase for databases.",
  },
  {
    q: "Do you build full-stack applications from scratch?",
    a: "Yes. I handle the entire lifecycle: database modeling, backend REST APIs, authentication/authorization, responsive user interfaces, AI integration, and cloud deployment (Vercel, Render).",
  },
  {
    q: "Can you collaborate with remote or distributed teams?",
    a: "Yes. I am experienced with Git/GitHub workflows, Agile sprint practices, async communication, and collaborating effectively across teams.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 px-6 relative z-10 border-t border-slate-200/80 dark:border-zinc-800/80">
      <div ref={ref} className="max-w-4xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <SectionHeading
            label="FAQ"
            title="Frequently Asked"
            highlight="Questions"
            description="Quick answers to common questions about my technical background, workflow, and availability."
          />
        </div>

        <div className={`mt-10 space-y-3 opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.15s' }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 backdrop-blur-md overflow-hidden transition-all duration-300 shadow-sm hover:border-indigo-500/40"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                    <HelpCircle size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 dark:text-zinc-500 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-100 dark:border-zinc-800/60">
                    <p className="mt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
