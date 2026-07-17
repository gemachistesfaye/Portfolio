import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight, AlertCircle, Lightbulb, Shield, Brain, Layout, Database, Code, Rocket, Target, Users, Clock, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { caseStudies, getCaseStudyBySlug } from "../data/caseStudies";
import CaseStudySection from "../components/CaseStudySection";
import ArchitectureDiagram from "../components/ArchitectureDiagram";
import TechStackBadge from "../components/TechStackBadge";

const CaseStudy = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = getCaseStudyBySlug(slug);
    setStudy(found);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] gap-4">
        <div className="w-10 h-10 border-[3px] border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-400">Loading case study...</p>
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] p-6 gap-6">
        <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center">
          <AlertCircle size={36} className="text-accent" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Case Study Not Found</h2>
          <p className="text-slate-400">This project case study doesn't exist yet.</p>
        </div>
        <Link
          to="/"
          onClick={(e) => { e.preventDefault(); navigate("/"); setTimeout(() => { document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }, 100); }}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-all duration-300 shadow-lg shadow-accent/20"
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

      <div className="min-h-screen bg-[#020617]">
        {/* Top Nav */}
        <nav className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-md border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link
              to="/"
              onClick={(e) => { e.preventDefault(); navigate("/"); setTimeout(() => { document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }, 100); }}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-accent transition-colors"
            >
              <ArrowLeft size={16} />
              Projects
            </Link>
            <div className="flex items-center gap-3">
              <a
                href={study.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-semibold rounded-lg transition-all duration-300"
              >
                <ExternalLink size={13} />
                Live Demo
              </a>
              <a
                href={study.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-700 hover:border-accent/40 text-slate-400 hover:text-accent text-xs font-semibold rounded-lg transition-all duration-300"
              >
                <Github size={13} />
                Code
              </a>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
          <div className="max-w-5xl mx-auto px-6 pt-16 pb-12 relative">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider rounded-full">
                {study.category}
              </span>
              {study.featured && (
                <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider rounded-full">
                  Featured Project
                </span>
              )}
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              {study.name}
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mb-6">
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
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {[
              { label: "Role", value: study.overview.role, icon: <Users size={14} /> },
              { label: "Timeline", value: study.overview.timeline, icon: <Clock size={14} /> },
              { label: "Status", value: study.overview.status, icon: <CheckCircle2 size={14} /> },
              { label: "Users", value: study.overview.users, icon: <Target size={14} /> },
              { label: "Problem", value: study.overview.problem.slice(0, 80) + "...", icon: <AlertCircle size={14} /> }
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220]">
                <div className="flex items-center gap-1.5 text-accent mb-2">
                  {item.icon}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{item.value}</p>
              </div>
            ))}
          </section>

          {/* Problem & Motivation */}
          <CaseStudySection title="Problem & Motivation" icon={<Target size={18} />} id="problem">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">The Problem</h4>
                <p className="text-sm">{study.motivation.problem}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Who Experiences This</h4>
                <p className="text-sm">{study.motivation.whoAffected}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Why Existing Solutions Fall Short</h4>
                <p className="text-sm">{study.motivation.whyExistingInsufficient}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Why This Matters</h4>
                <p className="text-sm">{study.motivation.whyMatters}</p>
              </div>
            </div>
          </CaseStudySection>

          <div className="border-t border-slate-200 dark:border-slate-700/40" />

          {/* Solution */}
          <CaseStudySection title="Solution" icon={<Lightbulb size={18} />} id="solution">
            <div className="space-y-6">
              <p className="text-sm">{study.solution.approach}</p>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Key Workflows</h4>
                <div className="space-y-2">
                  {study.solution.keyWorkflows.map((wf, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-slate-800/50">
                      <ArrowRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-600 dark:text-slate-400">{wf}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Features & Rationale</h4>
                <div className="grid gap-3">
                  {study.solution.features.map((f) => (
                    <div key={f.name} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220]">
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{f.name}</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{f.why}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CaseStudySection>

          <div className="border-t border-slate-200 dark:border-slate-700/40" />

          {/* Architecture */}
          <CaseStudySection title="System Architecture" icon={<Layout size={18} />} id="architecture">
            <div className="space-y-4">
              <ArchitectureDiagram layers={study.architecture.layers} />
              <pre className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-slate-800/50 text-xs text-slate-600 dark:text-slate-400 font-mono overflow-x-auto whitespace-pre-wrap">
                {study.architecture.diagram}
              </pre>
            </div>
          </CaseStudySection>

          <div className="border-t border-slate-200 dark:border-slate-700/40" />

          {/* Database */}
          {study.database && (
            <>
              <CaseStudySection title="Database Design" icon={<Database size={18} />} id="database">
                <div className="space-y-4">
                  <p className="text-sm">{study.database.overview}</p>
                  <div className="grid gap-2">
                    {study.database.entities.map((e) => (
                      <div key={e.name} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-slate-800/50">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                          <Database size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{e.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{e.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-slate-800/50">
                    <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Relationships</h4>
                    <p className="text-sm font-mono text-slate-600 dark:text-slate-400">{study.database.relationships}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-slate-800/50">
                    <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Why This Design</h4>
                    <p className="text-sm">{study.database.rationale}</p>
                  </div>
                </div>
              </CaseStudySection>
              <div className="border-t border-slate-200 dark:border-slate-700/40" />
            </>
          )}

          {/* Technical Implementation */}
          <CaseStudySection title="Technical Implementation" icon={<Code size={18} />} id="implementation">
            <div className="grid gap-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Frontend</h4>
                <ul className="space-y-1.5">
                  {study.implementation.frontend.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Backend</h4>
                <ul className="space-y-1.5">
                  {study.implementation.backend.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {study.implementation.database && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Database</h4>
                  <ul className="space-y-1.5">
                    {study.implementation.database.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-accent mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Deployment</h4>
                <ul className="space-y-1.5">
                  {study.implementation.deployment.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CaseStudySection>

          <div className="border-t border-slate-200 dark:border-slate-700/40" />

          {/* Security */}
          {study.security && (
            <>
              <CaseStudySection title="Security" icon={<Shield size={18} />} id="security">
                <div className="grid gap-3">
                  {study.security.measures.map((m) => (
                    <div key={m.name} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220]">
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{m.name}</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{m.implementation}</p>
                    </div>
                  ))}
                </div>
              </CaseStudySection>
              <div className="border-t border-slate-200 dark:border-slate-700/40" />
            </>
          )}

          {/* AI */}
          {study.ai && (
            <>
              <CaseStudySection title="AI Implementation" icon={<Brain size={18} />} id="ai">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                    <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Purpose</h4>
                    <p className="text-sm">{study.ai.purpose}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Architecture</h4>
                    <pre className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-slate-800/50 text-xs text-slate-600 dark:text-slate-400 font-mono overflow-x-auto whitespace-pre-wrap">
                      {study.ai.architecture}
                    </pre>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220]">
                      <h5 className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Model</h5>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{study.ai.model}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220]">
                      <h5 className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Fallback</h5>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{study.ai.fallback}</p>
                    </div>
                  </div>

                  {study.ai.promptDesign && (
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220]">
                      <h5 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Prompt Design</h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{study.ai.promptDesign}</p>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                    <h5 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">Limitations</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{study.ai.limitations}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Future AI Improvements</h4>
                    <ul className="space-y-1.5">
                      {study.ai.futureImprovements.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <ArrowRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CaseStudySection>
              <div className="border-t border-slate-200 dark:border-slate-700/40" />
            </>
          )}

          {/* UX */}
          <CaseStudySection title="User Experience" icon={<Users size={18} />} id="ux">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">User Flows</h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {study.ux.userFlows.map((flow) => (
                    <div key={flow.role} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220]">
                      <h5 className="text-sm font-bold text-accent mb-3">{flow.role}</h5>
                      <ol className="space-y-2">
                        {flow.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                            <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold flex-shrink-0">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Key Screens</h4>
                <div className="flex flex-wrap gap-2">
                  {study.ux.keyScreens.map((screen) => (
                    <span key={screen} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-accent/10 text-accent">
                      {screen}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">UX Decisions</h4>
                <ul className="space-y-1.5">
                  {study.ux.decisions.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CaseStudySection>

          <div className="border-t border-slate-200 dark:border-slate-700/40" />

          {/* Challenges */}
          <CaseStudySection title="Challenges & Solutions" icon={<AlertCircle size={18} />} id="challenges">
            <div className="space-y-4">
              {study.challenges.map((c, i) => (
                <div key={i} className="p-5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220]">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <XCircle size={14} className="text-red-500" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">{c.challenge}</h5>
                      <p className="text-xs text-slate-400 mt-0.5">Difficulty: {c.difficulty}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 ml-11">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={14} className="text-accent" />
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{c.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </CaseStudySection>

          <div className="border-t border-slate-200 dark:border-slate-700/40" />

          {/* Performance */}
          <CaseStudySection title="Performance & Quality" icon={<Rocket size={18} />} id="performance">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Optimizations</h4>
                <ul className="space-y-1.5">
                  {study.performance.optimizations.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Error Handling</h4>
                <ul className="space-y-1.5">
                  {study.performance.errorHandling.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-slate-800/50">
                <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Testing</h4>
                <p className="text-sm">{study.performance.testing}</p>
              </div>
            </div>
          </CaseStudySection>

          <div className="border-t border-slate-200 dark:border-slate-700/40" />

          {/* Roadmap */}
          <CaseStudySection title="Future Roadmap" icon={<Rocket size={18} />} id="roadmap">
            <div className="grid gap-2 sm:grid-cols-2">
              {study.roadmap.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-slate-800/50">
                  <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item}</p>
                </div>
              ))}
            </div>
          </CaseStudySection>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700/40">
            <div className="flex items-center justify-between">
              {prevStudy ? (
                <Link
                  to={`/project/${prevStudy.slug}`}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-accent transition-colors"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">{prevStudy.name}</span>
                  <span className="sm:hidden">Previous</span>
                </Link>
              ) : <div />}
              {nextStudy ? (
                <Link
                  to={`/project/${nextStudy.slug}`}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-accent transition-colors"
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
