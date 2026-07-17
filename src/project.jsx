import { useState, useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { projects } from "./data";
import SectionHeading from "./components/SectionHeading";
import ProjectCard from "./components/ProjectCard";
import ProjectFilter from "./components/ProjectFilter";
import { scrollToSection } from "./utils/scrollTo";

const categories = ["All", ...new Set(projects.map((p) => p.category))];

const Project = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const featured = useMemo(() => projects.filter((p) => p.featured), []);

  const handleCaseStudy = useCallback((slug) => {
    navigate(`/project/${slug}`);
  }, [navigate]);

  return (
    <section id="projects" className="py-28 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <SectionHeading
            label="Projects"
            title="Featured"
            highlight="Work"
            description="Real projects with real results. Each one built from problem to production."
          />
        </div>

        {/* Featured Projects */}
        <div className={`mb-16 opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-accent rounded-full" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Featured Projects</h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-2xl">
            These projects demonstrate end-to-end engineering — from problem analysis to production deployment.
            Each includes a detailed case study covering architecture, security, AI implementation, and lessons learned.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard
                key={p.name}
                project={p}
                onSelect={handleCaseStudy}
                showCaseStudyLink={true}
              />
            ))}
          </div>
        </div>

        {/* All Projects */}
        <div className={`opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-accent rounded-full" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">All Projects</h3>
          </div>

          <ProjectFilter
            categories={categories}
            active={activeFilter}
            onChange={setActiveFilter}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard
                key={p.name}
                project={p}
                onSelect={handleCaseStudy}
                showCaseStudyLink={!!p.slug}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-slate-500 dark:text-slate-400">No projects in this category yet.</p>
            </div>
          )}
        </div>

        <div className={`mt-16 text-center opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Ready to bring your ideas to life?</p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-300 text-base shadow-lg shadow-accent/20 hover:shadow-accent/40"
          >
            Let's Build Together
          </a>
        </div>
      </div>
    </section>
  );
};

export default Project;
