import { useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { projects } from "./data";
import SectionHeading from "./components/SectionHeading";
import ProjectCard from "./components/ProjectCard";
import { scrollToSection } from "./utils/scrollTo";

const Project = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

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
            description="Real-world projects built to solve practical problems through full-stack development, database engineering, and AI integration."
          />
        </div>

        <div className={`opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.15s' }}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
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
