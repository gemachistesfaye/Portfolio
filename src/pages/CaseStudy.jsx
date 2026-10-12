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
        <div className="w-10 h-10 border-[3px] border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500 dark:text-zinc-400">Loading case study...</p>
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#09090b] p-6 gap-6">
        <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
          <AlertCircle size={36} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Case Study Not Found</h2>
          <p className="text-slate-600 dark:text-zinc-400">This project case study doesn't exist yet.</p>
        </div>
        <Link
          to="/"
          onClick={(e) => { e.preventDefault(); navigate("/"); setTimeout(() => { document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }, 100); }}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/20"
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
              className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
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
                {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-indigo-600" />}
              </button>
              {study.demo && (
                <a
                  href={study.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-md shadow-indigo-600/20"
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
                  className="flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-semibold rounded-lg transition-all duration-200 bg-white dark:bg-zinc-900"
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
          <div className="max-w-5xl mx-auto px-6 pt-16 pb-12 relative">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 text-xs font-bold uppercase tracking-wider rounded-full">
                {study.category}
              </span>
              {study.featured && (
                <span className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider rounded-full">
                  Featured Case Study
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
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
        <main className="max-w-5xl mx-auto px-6 pb-20">
          {/* Overview Grid */}
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 my-12">
            {[
              { label: "Role", value: study.overview.role, icon: <Users size={14} /> },
              { label: "Timeline", value: study.overview.timeline, icon: <Clock size={14} /> },
              { label: "Status", value: study.overview.status, icon: <CheckCircle2 size={14} /> },
              { label: "Users", value: study.overview.users, icon: <Target size={14} /> },
              { label: "Problem", value: study.overview.problem.slice(0, 80) + "...", icon: <AlertCircle size={14} /> }
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-sm">
                <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 mb-2">
                  {item.icon}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-zinc-200 leading-snug">{item.value}</p>
              </div>
            ))}
          </section>

          {/* Problem & Motivation */}
          <CaseStudySection title="Problem & Motivation" icon={<Target size={18} />} id="problem">
            <div className="space-y-4 text-slate-700 dark:text-zinc-300">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">The Problem</h4>
                <p className="text-sm leading-relaxed">{study.motivation.problem}</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Who Experiences This</h4>
                <p className="text-sm leading-relaxed">{study.motivation.whoAffected}</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Why Existing Solutions Fall Short</h4>
                <p className="text-sm leading-relaxed">{study.motivation.whyExistingInsufficient}</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Why This Matters</h4>
                <p className="text-sm leading-relaxed">{study.motivation.whyMatters}</p>
              </div>
            </div>
          </CaseStudySection>

          <div className="border-t border-slate-200 dark:border-zinc-800/80 my-8" />

          {/* Solution */}
          <CaseStudySection title="Solution & Approach" icon={<Lightbulb size={18} />} id="solution">
            <div className="space-y-6 text-slate-700 dark:text-zinc-300">
              <p className="text-sm sm:text-base leading-relaxed">{study.solution.approach}</p>

              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Key Workflows</h4>
                <div className="space-y-2">
                  {study.solution.keyWorkflows.map((wf, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-sm">
                      <ArrowRight size={15} className="text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-800 dark:text-zinc-200 leading-relaxed">{wf}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Features & Architectural Rationale</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {study.solution.features.map((f) => (
                    <div key={f.name} className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm">
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{f.name}</h5>
                      <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">{f.why}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CaseStudySection>

          <div className="border-t border-slate-200 dark:border-zinc-800/80 my-8" />

          {/* Architecture & High-Contrast Code Diagram */}
          <CaseStudySection title="System Architecture & Dataflow" icon={<Layout size={18} />} id="architecture">
            <div className="space-y-4">
              <ArchitectureDiagram layers={study.architecture.layers} />
              
              {/* High-Contrast Code / Terminal Box */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-800 text-xs font-mono text-zinc-400">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-zinc-400 font-semibold">architecture-diagram.txt</span>
                </div>
                <pre className="text-xs font-mono text-zinc-200 leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-indigo-500/40">
                  {study.architecture.diagram}
                </pre>
              </div>
            </div>
          </CaseStudySection>

          <div className="border-t border-slate-200 dark:border-zinc-800/80 my-8" />

          {/* Database */}
          {study.database && (
            <>
              <CaseStudySection title="Database Design" icon={<Database size={18} />} id="database">
                <div className="space-y-4 text-slate-700 dark:text-zinc-300">
                  <p className="text-sm leading-relaxed">{study.database.overview}</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {study.database.entities.map((e) => (
                      <div key={e.name} className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-sm">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                          <Database size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{e.name}</p>
                          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">{e.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Entity Relationships</h4>
                    <p className="text-sm font-mono text-slate-800 dark:text-zinc-300 leading-relaxed">{study.database.relationships}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Why This Design</h4>
                    <p className="text-sm leading-relaxed">{study.database.rationale}</p>
                  </div>
                </div>
              </CaseStudySection>
              <div className="border-t border-slate-200 dark:border-zinc-800/80 my-8" />
            </>
          )}

          {/* Technical Implementation */}
          <CaseStudySection title="Technical Implementation" icon={<Code size={18} />} id="implementation">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Frontend Architecture</h4>
                <ul className="space-y-2">
                  {study.implementation.frontend.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                      <CheckCircle2 size={15} className="text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Backend APIs & Services</h4>
                <ul className="space-y-2">
                  {study.implementation.backend.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                      <CheckCircle2 size={15} className="text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {study.implementation.database && (
                <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Database Persistence</h4>
                  <ul className="space-y-2">
                    {study.implementation.database.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                        <CheckCircle2 size={15} className="text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Deployment & DevOps</h4>
                  <ul className="space-y-2">
                    {study.implementation.deployment.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                        <CheckCircle2 size={15} className="text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CaseStudySection>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-zinc-800/80">
            <div className="flex items-center justify-between">
              {prevStudy ? (
                <Link
                  to={`/project/${prevStudy.slug}`}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">{prevStudy.name}</span>
                  <span className="sm:hidden">Previous</span>
                </Link>
              ) : <div />}
              {nextStudy ? (
                <Link
                  to={`/project/${nextStudy.slug}`}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
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
