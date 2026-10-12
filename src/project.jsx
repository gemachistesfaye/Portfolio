import { useState, useMemo, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "./data";
import SectionHeading from "./components/SectionHeading";
import ProjectCard from "./components/ProjectCard";
import { scrollToSection } from "./utils/scrollTo";

const INITIAL_PROJECTS_COUNT = 6;

const Project = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const carouselRef = useRef(null);

  const handleCaseStudy = useCallback((slug) => {
    navigate(`/project/${slug}`);
  }, [navigate]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const featuredProjects = useMemo(() => {
    return projects.slice(0, INITIAL_PROJECTS_COUNT);
  }, []);

  const additionalProjects = useMemo(() => {
    return projects.slice(INITIAL_PROJECTS_COUNT);
  }, []);

  return (
    <section id="projects" className="py-20 sm:py-24 px-6 relative z-10 border-t border-slate-200/80 dark:border-zinc-800/80">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <SectionHeading
            title="Featured"
            highlight="Work"
            description="Production-grade applications built to solve practical challenges across offline-first PWAs, AI systems, and healthcare."
          />
        </div>

        {/* Featured Projects Grid */}
        <div className={`opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.15s' }}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p) => (
              <ProjectCard
                key={p.name}
                project={p}
                onSelect={handleCaseStudy}
                showCaseStudyLink={!!p.slug}
              />
            ))}
          </div>

          {/* Horizontal Shelf for Additional Projects (View More) */}
          {showAll && additionalProjects.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-zinc-800/80 animate-fade-in">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    Extended Portfolio
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Additional Projects & Tools ({additionalProjects.length})
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollCarousel("left")}
                    className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm"
                    aria-label="Scroll left"
                    title="Scroll left"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => scrollCarousel("right")}
                    className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm"
                    aria-label="Scroll right"
                    title="Scroll right"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Track */}
              <div
                ref={carouselRef}
                className="flex gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory"
              >
                {additionalProjects.map((p) => (
                  <div
                    key={p.name}
                    className="w-[270px] sm:w-[310px] shrink-0 snap-start flex flex-col"
                  >
                    <ProjectCard
                      project={p}
                      onSelect={handleCaseStudy}
                      showCaseStudyLink={!!p.slug}
                      compact={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* View More / Show Less Button */}
          {additionalProjects.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => {
                  setShowAll((prev) => !prev);
                  if (!showAll) {
                    setTimeout(() => {
                      carouselRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    }, 100);
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 text-slate-700 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white transition-all duration-200 shadow-sm hover:scale-[1.01]"
              >
                {showAll ? (
                  <>
                    <span>Show Less</span>
                    <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    <span>View More Projects ({additionalProjects.length} more)</span>
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
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-md"
          >
            Let's Build Together
          </a>
        </div>
      </div>
    </section>
  );
};

export default Project;
