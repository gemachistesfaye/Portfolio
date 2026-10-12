import { useState, useMemo, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { projects } from "./data";
import SectionHeading from "./components/SectionHeading";
import ProjectCard from "./components/ProjectCard";
import { scrollToSection } from "./utils/scrollTo";

const categories = ["All", "Full-Stack", "Developer Tools", "AI / ML", "Healthcare", "EdTech", "E-Commerce", "PWA / Maps"];

const Project = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const handleCaseStudy = useCallback((slug) => {
    navigate(`/project/${slug}`);
  }, [navigate]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase() || p.tags.some(t => t.toLowerCase() === selectedCategory.toLowerCase())
    );
  }, [selectedCategory]);

  return (
    <section id="projects" className="py-24 sm:py-28 px-6 relative z-10 border-t border-slate-200/80 dark:border-zinc-800/80">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <SectionHeading
            label="Portfolio"
            title="Featured"
            highlight="Work"
            description="Production-grade applications built to solve practical challenges across offline-first PWAs, AI systems, and healthcare."
          />
        </div>

        {/* Category Filter Tabs */}
        <div className={`flex flex-wrap items-center justify-center gap-2 mb-12 opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.1s' }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/25"
                    : "bg-white dark:bg-zinc-900/80 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 hover:text-slate-900 dark:hover:text-zinc-200 shadow-sm"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className={`opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.15s' }}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p) => (
              <ProjectCard
                key={p.name}
                project={p}
                onSelect={handleCaseStudy}
                showCaseStudyLink={!!p.slug}
              />
            ))}
          </div>
        </div>

        <div className={`mt-16 text-center opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.3s' }}>
          <p className="text-sm text-slate-600 dark:text-zinc-400 mb-4">Interested in building something similar or custom?</p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all duration-300 text-sm shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:scale-105"
          >
            Let's Build Together
          </a>
        </div>
      </div>
    </section>
  );
};

export default Project;
