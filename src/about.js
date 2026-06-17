import { useInView } from "react-intersection-observer";
import { Download, Code2, TrendingUp, Users, FolderOpen, MessageSquare, Palette, Rocket, Headphones, ArrowRight } from "lucide-react";
import config from "./config";
import SectionHeading from "./components/SectionHeading";
import TermsModal from "./components/TermsModal";
import { useState } from "react";

const highlights = [
  { icon: <FolderOpen size={18} />, label: "10+", desc: "Projects Delivered" },
  { icon: <Users size={18} />, label: "5+", desc: "Happy Clients" },
  { icon: <TrendingUp size={18} />, label: "30+", desc: "GitHub Repos" },
  { icon: <Code2 size={18} />, label: "3.8", desc: "CGPA" },
];

const steps = [
  { icon: <MessageSquare size={20} />, title: "Discovery & Planning", desc: "We discuss your goals, requirements, and timeline. We analyze the technical needs and create a clear project roadmap.", color: "from-blue-500 to-indigo-600" },
  { icon: <Palette size={20} />, title: "Design & Architecture", desc: "We design the system architecture, database schema, and user flows. You review and approve before development begins.", color: "from-violet-500 to-purple-600" },
  { icon: <Rocket size={20} />, title: "Development & Testing", desc: "Agile development with regular demos. You see progress every week and can provide feedback in real-time.", color: "from-emerald-500 to-teal-600" },
  { icon: <Headphones size={20} />, title: "Launch & Support", desc: "Deployment, documentation, and 30 days of free post-launch support. We are always a message away.", color: "from-amber-500 to-orange-600" },
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <>
      <section id="about" className="py-28 px-6">
        <div ref={ref} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className={`lg:col-span-2 opacity-0 ${inView ? 'animate-slide-right' : ''}`}>
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-br from-accent/20 via-teal-400/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50">
                  <img
                    src={process.env.PUBLIC_URL + "/Profile.jpg"}
                    alt="Gemachis Tesfaye - Full-Stack Developer"
                    className="w-full object-cover aspect-[3/4] group-hover:scale-[1.03] transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="absolute -bottom-4 -right-4 px-4 py-2.5 bg-white dark:bg-[#0c1220] rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-xl shadow-black/5 flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Accepting new clients</span>
                </div>
              </div>
            </div>

            <div className={`lg:col-span-3 opacity-0 ${inView ? 'animate-slide-left' : ''}`} style={{ animationDelay: '0.15s' }}>
              <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4">About</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                Building software that{' '}
                <span className="text-gradient">solves real problems</span>
              </h2>

              <div className="space-y-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                <p>
                  I'm a Full-Stack Software Engineer and Information Science student at
                  Haramaya University (CGPA: 3.8/4.0). I work across the entire stack —
                  from database design to backend APIs to clean frontend interfaces.
                </p>
                <p>
                  Over the past year I've built and shipped 10+ real-world projects
                  including AI-powered marketplaces, healthcare platforms, and data analytics tools.
                  I specialize in turning complex problems into elegant, scalable solutions.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {highlights.map((h, i) => (
                  <div
                    key={h.label}
                    className="group p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-white/[0.03] hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                      {h.icon}
                    </div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-accent transition-colors">
                      {h.label}
                    </div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-[0.12em] font-semibold mt-0.5">
                      {h.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-nowrap gap-2.5">
                <a
                  href={config.cvView}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3.5 glass hover:border-accent/30 text-slate-600 dark:text-slate-400 hover:text-accent font-semibold rounded-xl transition-all duration-300 text-xs sm:text-base whitespace-nowrap"
                >
                  <Download size={15} />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="py-28 px-6 bg-[#060a13]">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="How I Work"
            title="From Idea to"
            highlight="Launch"
            description="A transparent, collaborative process designed to deliver results on time and within budget."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-slate-300 dark:from-slate-700 to-transparent z-0" />
                )}
                <div className="group relative z-10 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#0c1220] hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                      {step.icon}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step {i + 1}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Ready to start? It all begins with a free 15-minute discovery call.
            </p>
            <button
              onClick={() => setIsTermsOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 glass hover:border-accent/30 text-slate-600 dark:text-slate-400 hover:text-accent font-semibold rounded-xl transition-all duration-300 text-base"
            >
              View Process & Payment Terms
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </>
  );
};

export default About;
