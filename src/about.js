import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Code2,
  Rocket,
  GraduationCap,
  Briefcase,
  Award,
  Sparkles,
  Layers,
  BrainCircuit,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Download,
  Eye,
  X,
  ArrowUpRight,
} from "lucide-react";

const CountingNumber = ({ label, value, duration = 1200, trigger = false }) => {
  const targetValue = parseInt(value.replace("+", "")) || 0;
  const isExperience = label.toLowerCase() === "experience";
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isExperience) {
      setCount(targetValue);
      return;
    }

    if (!trigger) {
      setCount(0);
      return;
    }

    let startTime;
    let raf;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * targetValue));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [trigger, targetValue, duration, isExperience]);

  if (isExperience) return <span>{targetValue}</span>;
  return <span>{count < 10 ? `0${count}` : count}</span>;
};

const CVModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const cvUrl =
    "https://drive.google.com/file/d/1lzpGC9a6dJs0dpBdCpnrxz-MbdPwNuK3/preview";
  const downloadUrl =
    "https://drive.google.com/file/d/1lzpGC9a6dJs0dpBdCpnrxz-MbdPwNuK3/view";

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-3 sm:px-4">
      {}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {}
      <div
        className="
      relative
      w-full max-w-4xl
      max-h-[90vh]
      overflow-y-auto
      rounded-2xl sm:rounded-3xl md:rounded-[3rem]
      bg-white dark:bg-slate-900
      border border-slate-200 dark:border-white/10
      shadow-2xl
      flex flex-col md:flex-row
      animate-in zoom-in-95 duration-300
    "
      >
        {}
        <div
          className="
        w-full md:w-1/2
        bg-slate-50 dark:bg-black/20
        p-4 sm:p-6 md:p-10
        border-b md:border-b-0 md:border-r
        border-slate-100 dark:border-white/5
        flex flex-col items-center
      "
        >
          <iframe
            title="CV Internal Preview"
            src={cvUrl}
            className="
          w-full
          h-[260px] sm:h-[340px] md:h-[420px]
          rounded-xl sm:rounded-2xl
          border border-slate-200 dark:border-white/10
          bg-white
        "
            loading="lazy"
          />
          <p className="mt-3 text-center text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400">
            Internal Preview
          </p>
        </div>

        {}
        <div
          className="
        w-full md:w-1/2
        p-6 sm:p-8 md:p-12
        flex flex-col justify-center items-center
        text-center
        space-y-6
      "
        >
          <div className="space-y-3">
            <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
              <FileText size={26} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Curriculum Vitae
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Select your preferred method to review my profile.
            </p>
          </div>

          {}
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
          w-full flex items-center justify-between p-4 sm:p-6
          rounded-2xl sm:rounded-3xl
          border border-indigo-500/20
          bg-indigo-50/40 hover:bg-indigo-100
          dark:bg-indigo-900/20
          transition-all group
        "
          >
            <div className="flex items-center gap-3 sm:gap-4 text-left">
              <Eye size={20} className="text-indigo-600" />
              <div>
                <p className="font-black text-xs sm:text-sm uppercase text-slate-900 dark:text-white">
                  Preview Full Screen
                </p>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400">
                  External view
                </p>
              </div>
            </div>
            <ArrowUpRight
              size={18}
              className="text-indigo-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </a>

          {}
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
          w-full flex items-center justify-between p-4 sm:p-6
          rounded-2xl sm:rounded-3xl
          border border-emerald-500/20
          bg-emerald-50/40 hover:bg-emerald-100
          dark:bg-emerald-900/20
          transition-all group
        "
          >
            <div className="flex items-center gap-3 sm:gap-4 text-left">
              <Download size={20} className="text-emerald-600" />
              <div>
                <p className="font-black text-xs sm:text-sm uppercase text-slate-900 dark:text-white">
                  Open / Download
                </p>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400">
                  PDF • Google Drive
                </p>
              </div>
            </div>
            <ArrowUpRight
              size={18}
              className="text-emerald-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </a>

          {}
          <button
            onClick={onClose}
            className="text-[10px] uppercase font-black text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mt-2"
          >
            Return to Profile
          </button>
        </div>

        {}
        <button
          onClick={onClose}
          className="
        absolute top-3 right-3 sm:top-6 sm:right-6
        z-50
        p-2
        bg-white dark:bg-slate-800 rounded-full
        shadow-md
        text-slate-400 hover:text-slate-600 dark:hover:text-slate-200
        transition-all
      "
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [inView, setInView] = useState(false);
  const [showCVOptions, setShowCVOptions] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const coreCompetencies = [
    "Web Application Development (Frontend-focused)",
    "Database Design & Data Analysis",
    "UI Development & Component Design",
    "Information Governance & Data Management",
    "API Integration & Consumption",
    "Version Control & Collaborative Development",
  ];

  const highlights = [
    {
      icon: (
        <Code2 className="text-indigo-600 dark:text-indigo-400" size={24} />
      ),
      title: "Technical Excellence",
      desc: "Delivering robust, scalable frontend solutions with modern frameworks.",
    },
    {
      icon: (
        <BrainCircuit
          className="text-indigo-600 dark:text-indigo-400"
          size={24}
        />
      ),
      title: "Analytical Insight",
      desc: "Leveraging Information Science principles to optimize data flow.",
    },
    {
      icon: (
        <ShieldCheck
          className="text-indigo-600 dark:text-indigo-400"
          size={24}
        />
      ),
      title: "Quality Assurance",
      desc: "Ensuring cross-browser compatibility and accessible user experiences.",
    },
  ];

  const stats = [
    { label: "Experience", value: "1+", icon: <Briefcase /> },
    { label: "Projects", value: "10+", icon: <Layers /> },
    { label: "Credentials", value: "07+", icon: <Award /> },
  ];

  const [hoveredStats, setHoveredStats] = useState(stats.map(() => false));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/30">
      <section
        id="about"
        ref={sectionRef}
        className="relative py-24 px-6 sm:px-12 overflow-hidden"
      >
        {}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#4f46e5 0.5px, transparent 0.5px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="container mx-auto max-w-6xl relative z-10">
          {}
          <div
            className={`mb-20 transition-all duration-1000 transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-indigo-600" />
              <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-[0.3em]">
                Professional Profile
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Driving Innovation Through <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-slate-500 dark:from-indigo-400 dark:via-purple-400 dark:to-slate-400">
                Information Science
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {}
            <div
              className={`lg:col-span-5 transition-all duration-1000 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
            >
              <div className="relative mb-12 group">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-slate-200 dark:border-slate-800 rounded-3xl -z-10 group-hover:top-0 group-hover:left-0 transition-all duration-500" />
                <div className="bg-white dark:bg-slate-800 p-3 rounded-3xl shadow-2xl overflow-hidden">
                  <img
                    src={process.env.PUBLIC_URL + "/Profile.jpg"}
                    alt="Professional Profile"
                    className="rounded-2xl w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                  />
                </div>
                {}
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 hidden sm:block">
                  <div className="flex items-center gap-4">
                    <div className="bg-cyan-500 w-3 h-3 rounded-full animate-pulse" />
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Primary Stack
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        Frontend & Data
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {}
              <div className="bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-sm backdrop-blur-sm">
                <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Layers size={14} /> Core Competencies
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {coreCompetencies.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group"
                    >
                      <div className="p-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-sm font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {}
            <div
              className={`lg:col-span-7 transition-all duration-1000 delay-300 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            >
              <div className="space-y-12">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">
                    Executive Summary
                  </h3>
                  <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-light">
                    As an{" "}
                    <span className="font-bold text-slate-900 dark:text-white border-b-2 border-indigo-500/30">
                      Information Science Professional
                    </span>{" "}
                    and Software Developer, I specialize in the intersection of
                    data integrity and high-performance user interfaces.
                  </p>
                  <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-light mt-6">
                    My approach is rooted in structural logic—transforming
                    complex datasets into intuitive, accessible digital
                    experiences. Based in{" "}
                    <span className="text-indigo-600 font-medium">
                      Ethiopia
                    </span>
                    , I am dedicated to architecting scalable web
                    infrastructures that bridge the gap between technical
                    efficiency and human-centric design.
                  </p>
                </div>

                {}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {highlights.map((item, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 group"
                    >
                      <div className="mb-4 transform group-hover:-translate-y-1 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-[11px] mb-2 uppercase tracking-widest">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {}
                <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                    {stats.map((stat, i) => (
                      <div
                        key={i}
                        className="group flex flex-col gap-2 cursor-default"
                        onMouseEnter={() => {
                          const n = [...hoveredStats];
                          n[i] = true;
                          setHoveredStats(n);
                        }}
                        onMouseLeave={() => {
                          const n = [...hoveredStats];
                          n[i] = false;
                          setHoveredStats(n);
                        }}
                      >
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                            <CountingNumber
                              label={stat.label}
                              value={stat.value}
                              trigger={hoveredStats[i] || inView}
                            />
                          </span>
                          <span className="text-indigo-600 dark:text-indigo-500 font-black text-2xl">
                            +
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-1 w-6 bg-indigo-500 rounded-full group-hover:w-12 transition-all duration-500" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            {stat.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {}
                <div className="pt-10 relative">
                  <button
                    onClick={() => setShowCVOptions(true)}
                    className="group relative inline-flex items-center gap-4 px-10 py-4 rounded-full
               bg-white dark:bg-slate-900
               text-slate-900 dark:text-white
               border border-slate-200/70 dark:border-slate-700/70
               shadow-[0_8px_25px_-8px_rgba(0,0,0,0.25)]
               hover:shadow-[0_25px_60px_-15px_rgba(99,102,241,0.45)]
               transition-all duration-500 ease-out
               hover:-translate-y-1
               overflow-hidden"
                  >
                    {}
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-purple-500/0
                     opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />

                    {}
                    <span
                      className="absolute -inset-[1px] rounded-full
                     bg-gradient-to-r from-indigo-500/0 via-indigo-500/40 to-purple-500/0
                     opacity-0 group-hover:opacity-100
                     blur-sm transition-opacity duration-700"
                    />

                    {}
                    <FileText
                      size={17}
                      className="relative text-indigo-600 dark:text-indigo-400
                 transition-all duration-300
                 group-hover:scale-110 group-hover:-rotate-6"
                    />

                    {}
                    <span className="relative font-semibold tracking-wide">
                      View CV
                    </span>

                    {}
                    <span
                      className="relative text-indigo-600 dark:text-indigo-400
                     transition-all duration-300
                     translate-x-0 group-hover:translate-x-2"
                    >
                      →
                    </span>

                    {}
                    <span
                      className="absolute top-0 left-[-150%] w-[120%] h-full
                     bg-gradient-to-r from-transparent via-white/40 to-transparent
                     skew-x-[-20deg]
                     group-hover:left-[150%]
                     transition-all duration-700"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <CVModal isOpen={showCVOptions} onClose={() => setShowCVOptions(false)} />
    </div>
  );
};

export default App;
