import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Download, Github, Sparkles, CheckCircle2 } from "lucide-react";
import config from "./config";
import { scrollToSection } from "./utils/scrollTo";

const Home = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [activeTab, setActiveTab] = useState("developer.ts");

  return (
    <section id="home" className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-6 relative z-10">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className={`lg:col-span-7 ${inView ? 'animate-slide-up' : 'opacity-0'}`}>
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/80 text-slate-700 dark:text-zinc-300 text-xs font-semibold tracking-wide mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              Available for Software Engineering & AI Roles
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08] mb-4">
              Gemachis{" "}
              <span className="text-gradient">Tesfaye</span>
            </h1>

            {/* Title / Role */}
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={18} className="text-amber-500 dark:text-amber-400 flex-shrink-0" />
              <p className="text-lg sm:text-2xl font-bold text-slate-700 dark:text-zinc-200 tracking-tight">
                Full-Stack Developer & AI Systems Engineer
              </p>
            </div>

            {/* Bio Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-xl mb-8">
              I architect and build scalable web applications, backend APIs, and AI-integrated products. Focused on clean system design, database performance, and solving practical real-world challenges.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); scrollToSection("projects"); }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-md"
              >
                Explore Projects
                <ArrowRight size={16} />
              </a>

              <a
                href={config.cvView}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white dark:bg-zinc-900/80 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-sm"
              >
                <Download size={15} />
                Resume / CV
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Developer Terminal / Code Card (Desktop only) */}
          <div className={`hidden lg:block lg:col-span-5 ${inView ? 'animate-slide-left' : 'opacity-0'}`} style={{ animationDelay: '0.15s' }}>
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-slate-900 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl overflow-hidden relative group hover:border-orange-500/40 transition-all duration-300">
              {/* Top Window Bar */}
              <div className="px-5 py-3.5 bg-slate-950 dark:bg-zinc-950/80 border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-zinc-400 ml-2">gemachis-terminal</span>
                </div>
                <div className="flex gap-1.5">
                  {["developer.ts", "system.json"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-2.5 py-1 text-[10px] font-mono rounded-md transition-colors ${
                        activeTab === tab ? "bg-zinc-800 text-zinc-100 font-medium border border-zinc-700" : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Snippet */}
              <div className="p-6 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-300 bg-slate-900 dark:bg-transparent min-h-[215px]">
                {activeTab === "developer.ts" ? (
                  <div className="space-y-1.5">
                    <p><span className="text-orange-400">const</span> <span className="text-amber-300">developer</span>: <span className="text-orange-300">Engineer</span> = &#123;</p>
                    <p className="pl-4"><span className="text-zinc-400">name:</span> <span className="text-amber-200">"Gemachis Tesfaye"</span>,</p>
                    <p className="pl-4"><span className="text-zinc-400">role:</span> <span className="text-amber-200">"Full-Stack & AI Systems"</span>,</p>
                    <p className="pl-4"><span className="text-zinc-400">education:</span> <span className="text-amber-200">"BSc Information Science"</span>,</p>
                    <p className="pl-4"><span className="text-zinc-400">focus:</span> [<span className="text-orange-300">"Web"</span>, <span className="text-amber-300">"APIs"</span>, <span className="text-orange-300">"AI"</span>],</p>
                    <p className="pl-4"><span className="text-zinc-400">status:</span> <span className="text-orange-400">"Ready for Production"</span>,</p>
                    <p className="pl-4"><span className="text-zinc-400">openToWork:</span> <span className="text-orange-300">true</span></p>
                    <p>&#125;;</p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <p>&#123;</p>
                    <p className="pl-4"><span className="text-orange-400">"architecture"</span>: <span className="text-amber-200">"React 19 + Node.js + SQL + AI"</span>,</p>
                    <p className="pl-4"><span className="text-orange-400">"totalProjects"</span>: <span className="text-amber-400">10</span>,</p>
                    <p className="pl-4"><span className="text-orange-400">"liveDeployments"</span>: <span className="text-amber-400">5</span>,</p>
                    <p className="pl-4"><span className="text-orange-400">"uptime"</span>: <span className="text-orange-400">"99.9%"</span>,</p>
                    <p className="pl-4"><span className="text-orange-400">"openToRelocate"</span>: <span className="text-orange-300">true</span>,</p>
                    <p className="pl-4"><span className="text-orange-400">"remoteFriendly"</span>: <span className="text-orange-300">true</span></p>
                    <p>&#125;</p>
                  </div>
                )}
              </div>

              {/* Bottom Quick Bar */}
              <div className="px-5 py-3 bg-slate-950 dark:bg-zinc-950/60 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 size={13} /> All systems operational
                </span>
                <span className="text-zinc-500 font-mono text-[11px] hidden sm:inline">
                  TypeScript • React 19 • NestJS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
