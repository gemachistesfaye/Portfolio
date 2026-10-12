import { useState, useMemo, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { projects } from "./data";
import SectionHeading from "./components/SectionHeading";
import ProjectCard from "./components/ProjectCard";
import { scrollToSection } from "./utils/scrollTo";

const categories = ["All", "Full-Stack", "Developer Tools", "AI / ML", "Healthcare", "EdTech", "E-Commerce", "PWA / Maps"];
const INITIAL_PROJECTS_COUNT = 6;

const Project = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setShowAll(false);
  };

  const handleCaseStudy = useCallback((slug) => {
    navigate(`/project/${slug}`);
  }, [navigate]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase() || p.tags.some(t => t.toLowerCase() === selectedCategory.toLowerCase())
    );
  }, [selectedCategory]);

  const displayedProjects = useMemo(() => {
    if (showAll) return filteredProjects;
    return filteredProjects.slice(0, INITIAL_PROJECTS_COUNT);
  }, [filteredProjects, showAll]);

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
                onClick={() => handleCategoryChange(cat)}
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
            {displayedProjects.map((p) => (
              <ProjectCard
                key={p.name}
                project={p}
                onSelect={handleCaseStudy}
                showCaseStudyLink={!!p.slug}
              />
            ))}
          </div>

          {/* View More / Show Less Button */}
          {filteredProjects.length > INITIAL_PROJECTS_COUNT && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 text-slate-700 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 shadow-sm hover:scale-[1.02]"
              >
                {showAll ? (
                  <>
                    <span>Show Less</span>
                    <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    <span>View More Projects ({filteredProjects.length - INITIAL_PROJECTS_COUNT} more)</span>
                    <ChevronDown size={14} />
                  </>
                )}
              </button>
            </div>
          )}
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
