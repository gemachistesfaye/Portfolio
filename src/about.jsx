import { useInView } from "react-intersection-observer";
import { Users, FolderOpen, Rocket, ArrowRight, Code2 } from "lucide-react";
import { scrollToSection } from "./utils/scrollTo";

const highlights = [
  { icon: <FolderOpen size={20} />, label: "10+", desc: "Projects Built" },
  { icon: <Users size={20} />, label: "5+", desc: "Full-Stack Applications" },
  { icon: <Rocket size={20} />, label: "15+", desc: "Technologies Used" },
  { icon: <Code2 size={20} />, label: "2+", desc: "Years Learning & Building" },
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="py-20 sm:py-24 px-6 relative z-10">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          {/* Photo & Animated Glow (Moderately Minimized Height) */}
          <div className={`lg:col-span-2 ${inView ? 'animate-slide-right' : 'opacity-0'} flex justify-center`}>
            <div className="relative group w-full max-w-sm mx-auto lg:max-w-none animate-float">
              {/* Dynamic Animated Pulse Glow */}
              <div className="absolute -inset-3 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
              
              <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-white/[0.1] shadow-xl transition-all duration-500 group-hover:border-slate-300 dark:group-hover:border-zinc-700">
                <img
                  src="/Profile.jpg"
                  alt="Gemachis Tesfaye - Full-Stack Developer"
                  className="w-full object-cover aspect-[4/5] max-h-[440px] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback avatar if image fails */}
                <div
                  className="hidden w-full aspect-[4/5] items-center justify-center bg-stone-100 dark:bg-zinc-900"
                  aria-hidden="true"
                >
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white text-4xl font-black shadow-xl">
                    GT
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 dark:from-[#09090b]/80 via-transparent to-transparent opacity-60" />

                {/* Floating Glass Status Pill with Pulsing Live Dot */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 dark:bg-zinc-950/80 backdrop-blur-md border border-white/10 text-white shadow-lg flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                    </span>
                    <span className="text-[11px] font-semibold tracking-wide text-zinc-200">
                      Shipping Production Code
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text & Metrics */}
          <div className={`lg:col-span-3 ${inView ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.15s' }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-5 tracking-tight leading-snug">
              Building scalable digital products{' '}
              <span className="text-gradient">and AI-enhanced systems</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed mb-8">
              <p>
                I am a Full-Stack Developer and aspiring Software & AI Engineer focused on building scalable digital products that solve real-world problems.
              </p>
              <p>
                I specialize in creating modern web applications, backend systems, and AI-enhanced solutions using technologies like React, Node.js, Python, and modern cloud platforms.
              </p>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              {highlights.map((h, i) => (
                <div
                  key={h.label}
                  className="group p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80 backdrop-blur-sm hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50/50 dark:hover:bg-zinc-900/90 transition-all duration-200 shadow-sm hover:shadow-md"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="text-amber-600 dark:text-amber-400 mb-2 group-hover:scale-105 transition-transform duration-200">
                    {h.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white transition-colors">
                    {h.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-semibold mt-1">
                    {h.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-md"
              >
                Let's Collaborate
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
