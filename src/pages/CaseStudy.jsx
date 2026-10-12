import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight, AlertCircle, Lightbulb, Shield, Brain, Layout, Database, Code, Rocket, Target, Users, Clock, CheckCircle2, XCircle, ArrowRight, Sun, Moon } from "lucide-react";
import { caseStudies, getCaseStudyBySlug } from "../data/caseStudies";
import CaseStudySection from "../components/CaseStudySection";
import ArchitectureDiagram from "../components/ArchitectureDiagram";
import TechStackBadge from "../components/TechStackBadge";
import { useTheme } from "../context/ThemeContext";

const CaseStudy = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = getCaseStudyBySlug(slug);
    setStudy(found);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#09090b] gap-4">
        <div className="w-10 h-10 border-[3px] border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500 dark:text-zinc-400">Loading case study...</p>
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#09090b] p-6 gap-6">
        <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
          <AlertCircle size={36} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Case Study Not Found</h2>
          <p className="text-slate-600 dark:text-zinc-400">This project case study doesn't exist yet.</p>
        </div>
        <Link
          to="/"
          onClick={(e) => { e.preventDefault(); navigate("/"); setTimeout(() => { document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }, 100); }}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-600/20"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>
    );
  }

  const currentIndex = caseStudies.findIndex((cs) => cs.slug === slug);
  const prevStudy = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextStudy = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  return (
    <>
      <Helmet>
        <title>{study.name} — Case Study | Gemachis Tesfaye</title>
        <meta name="description" content={study.description} />
        <meta property="og:title" content={`${study.name} — Case Study`} />
        <meta property="og:description" content={study.description} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          "name": study.name,
          "description": study.description,
          "author": {
            "@type": "Person",
            "name": "Gemachis Tesfaye",
            "url": "https://gemachisdev.vercel.app"
          },
          "codeRepository": study.github,
          "programmingLanguage": study.tags,
          "url": study.demo
        })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 transition-colors duration-300">
        {/* Top Nav */}
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#09090b]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-white/[0.08]">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link
              to="/"
              onClick={(e) => { e.preventDefault(); navigate("/"); setTimeout(() => { document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }, 100); }}
              className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
            >
              <ArrowLeft size={16} />
              Back to Projects
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500" />}
              </button>
              {study.demo && (
                <a
                  href={study.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
                >
                  <ExternalLink size={13} />
                  Live Demo
                </a>
              )}
              {study.github && (
                <a
                  href={study.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 dark:border-zinc-700/80 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:border-emerald-500/30 text-xs font-medium rounded-lg transition-colors bg-white dark:bg-zinc-900 shadow-sm"
                >
                  <Github size={13} />
                  Code
                </a>
              )}
            </div>
          </div>
        </nav>

        {/* Hero */}
        <header className="relative overflow-hidden border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-950/40">
          <div className="max-w-4xl mx-auto px-6 pt-14 pb-10 relative">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 bg-slate-100 dark:bg-zinc-800/80 text-emerald-700 dark:text-emerald-300 border border-slate-200 dark:border-zinc-700/60 text-xs font-semibold uppercase tracking-wider rounded-full">
                {study.category}
              </span>
              {study.featured && (
                <span className="px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider rounded-full">
                  Featured Project
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              {study.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mb-6 leading-relaxed">
              {study.tagline}
            </p>
            <div className="flex flex-wrap gap-2">
              {study.tags.map((t) => (
                <TechStackBadge key={t} name={t} size="md" />
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-6 pb-20">
          {/* Overview Grid - 4 balanced metric cards */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-10">
            {[
              { label: "Role", value: study.overview.role, icon: <Users size={14} /> },
              { label: "Timeline", value: study.overview.timeline, icon: <Clock size={14} /> },
              { label: "Status", value: study.overview.status, icon: <CheckCircle2 size={14} /> },
              { label: "Target Users", value: study.overview.users, icon: <Target size={14} /> },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 mb-2">
                  {item.icon}
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-zinc-400">{item.label}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-zinc-200 leading-snug">{item.value}</p>
              </div>
            ))}
          </section>

          {/* Problem & Motivation - streamlined into 2 crisp context cards */}
          <CaseStudySection title="Problem & Context" icon={<Target size={16} />} id="problem">
            <div className="grid gap-4 sm:grid-cols-2 text-slate-700 dark:text-zinc-300">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-2">The Real-World Problem</h4>
                  <p className="text-sm leading-relaxed mb-3">{study.motivation.problem}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80">
                  <p className="text-xs text-slate-500 dark:text-zinc-400"><strong className="text-slate-700 dark:text-zinc-300">Impacted:</strong> {study.motivation.whoAffected}</p>
                </div>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Why Existing Systems Failed</h4>
                  <p className="text-sm leading-relaxed mb-3">{study.motivation.whyExistingInsufficient}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80">
                  <p className="text-xs text-slate-500 dark:text-zinc-400"><strong className="text-slate-700 dark:text-zinc-300">Core Value:</strong> {study.motivation.whyMatters}</p>
                </div>
              </div>
            </div>
          </CaseStudySection>

          <div className="border-t border-slate-200 dark:border-zinc-800/80 my-6" />

          {/* Solution & Approach */}
          <CaseStudySection title="Solution & Core Architecture" icon={<Lightbulb size={16} />} id="solution">
            <div className="space-y-6 text-slate-700 dark:text-zinc-300">
              <p className="text-sm sm:text-base leading-relaxed bg-white dark:bg-zinc-900/40 p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800">{study.solution.approach}</p>

              <div>
                <h4 className="text-xs font-semibold text-slate-800 dark:text-zinc-200 uppercase tracking-wider mb-3">Key Workflows & User Journeys</h4>
                <div className="space-y-2">
                  {study.solution.keyWorkflows.map((wf, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-sm">
                      <ArrowRight size={14} className="text-slate-400 dark:text-zinc-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-800 dark:text-zinc-200 leading-relaxed">{wf}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-800 dark:text-zinc-200 uppercase tracking-wider mb-3">Core Features & Engineering Decisions</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {study.solution.features.map((f) => (
                    <div key={f.name} className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm">
                      <h5 className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5">{f.name}</h5>
                      <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">{f.why}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CaseStudySection>

          <div className="border-t border-slate-200 dark:border-zinc-800/80 my-6" />

          {/* System Architecture Layers */}
          <CaseStudySection title="System Architecture & Stack" icon={<Layout size={16} />} id="architecture">
            <div className="space-y-4">
              <ArchitectureDiagram layers={study.architecture.layers} />
            </div>
          </CaseStudySection>

          <div className="border-t border-slate-200 dark:border-zinc-800/80 my-6" />

          {/* Database (if applicable) */}
          {study.database && (
            <>
              <CaseStudySection title="Database Design & Data Models" icon={<Database size={16} />} id="database">
                <div className="space-y-4 text-slate-700 dark:text-zinc-300">
                  <p className="text-sm leading-relaxed">{study.database.overview}</p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {study.database.entities.slice(0, 6).map((e) => (
                      <div key={e.name} className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-sm">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-slate-500 dark:text-zinc-400 flex-shrink-0 text-xs">
                          <Database size={13} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white font-mono">{e.name}</p>
                          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">{e.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <h4 className="text-xs font-semibold text-slate-800 dark:text-zinc-200 uppercase tracking-wider mb-2">Entity Relationships & Strategy</h4>
                    <p className="text-xs sm:text-sm font-mono text-slate-700 dark:text-zinc-300 leading-relaxed mb-3">{study.database.relationships}</p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-zinc-800">{study.database.rationale}</p>
                  </div>
                </div>
              </CaseStudySection>
              <div className="border-t border-slate-200 dark:border-zinc-800/80 my-6" />
            </>
          )}

          {/* Technical Implementation */}
          <CaseStudySection title="Technical Implementation Highlights" icon={<Code size={16} />} id="implementation">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm">
                <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Client Architecture & UX</h4>
                <ul className="space-y-2">
                  {study.implementation.frontend.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                      <CheckCircle2 size={14} className="text-slate-400 dark:text-zinc-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm">
                <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Backend, Data & Cloud</h4>
                <ul className="space-y-2">
                  {study.implementation.backend.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                      <CheckCircle2 size={14} className="text-slate-400 dark:text-zinc-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                  {study.implementation.deployment.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                      <CheckCircle2 size={14} className="text-slate-400 dark:text-zinc-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CaseStudySection>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-zinc-800/80">
            <div className="flex items-center justify-between">
              {prevStudy ? (
                <Link
                  to={`/project/${prevStudy.slug}`}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">{prevStudy.name}</span>
                  <span className="sm:hidden">Previous</span>
                </Link>
              ) : <div />}
              {nextStudy ? (
                <Link
                  to={`/project/${nextStudy.slug}`}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
                >
                  <span className="hidden sm:inline">{nextStudy.name}</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight size={16} />
                </Link>
              ) : <div />}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CaseStudy;
