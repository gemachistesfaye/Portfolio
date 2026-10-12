import { useInView } from "react-intersection-observer";
import { Users, FolderOpen, Rocket, ArrowRight, Code2 } from "lucide-react";
import { scrollToSection } from "./utils/scrollTo";

const highlights = [
  { icon: <FolderOpen size={20} />, label: "10+", desc: "Projects Built" },
  { icon: <Users size={20} />, label: "5+", desc: "Full-Stack Apps" },
  { icon: <Rocket size={20} />, label: "15+", desc: "Tech Stack" },
  { icon: <Code2 size={20} />, label: "2+", desc: "Years Building" },
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="py-24 sm:py-28 px-6 relative z-10">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          {/* Photo & Glow */}
          <div className={`lg:col-span-2 ${inView ? 'animate-slide-right' : 'opacity-0'}`}>
            <div className="relative group max-w-sm mx-auto lg:max-w-none">
              <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500/20 via-blue-500/15 to-transparent rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
              <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/[0.08] shadow-2xl">
                <img
                  src="/Profile.jpg"
                  alt="Gemachis Tesfaye - Full-Stack Developer"
                  className="w-full object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback avatar if image fails */}
                <div
                  className="hidden w-full aspect-[3/4] items-center justify-center bg-slate-100 dark:bg-zinc-900"
                  aria-hidden="true"
                >
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-indigo-500/30">
                    GT
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 dark:from-[#09090b]/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>

          {/* Text & Metrics */}
          <div className={`lg:col-span-3 ${inView ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.15s' }}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-4">
              <span>About Me</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
              Building scalable digital products{' '}
              <span className="text-gradient">and AI-enhanced systems</span>
            </h2>

            <div className="space-y-4 text-base text-slate-600 dark:text-zinc-400 leading-relaxed mb-8">
              <p>
                I am a Full-Stack Developer and aspiring Software & AI Engineer passionate about building software solutions that solve real-world operational challenges.
              </p>
              <p>
                I specialize in creating modern web applications, backend architectures, and AI-integrated products using React, Node.js, Python, and relational/cloud databases.
              </p>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              {highlights.map((h, i) => (
                <div
                  key={h.label}
                  className="group p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80 backdrop-blur-sm hover:border-indigo-500/40 hover:bg-slate-50 dark:hover:bg-zinc-900/90 transition-all duration-300 shadow-sm hover:shadow-md"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="text-indigo-600 dark:text-indigo-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {h.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                    {h.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-semibold mt-1">
                    {h.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Contextual Action */}
            <div>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all duration-300 text-sm shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:scale-105"
              >
                Get In Touch
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
