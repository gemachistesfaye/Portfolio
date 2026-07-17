import { useInView } from "react-intersection-observer";

const milestones = [
  {
    year: "2024",
    title: "Started My Tech Journey",
    description: "Learned web development foundations, programming basics, and computer science fundamentals while building my first projects.",
  },
  {
    year: "2025",
    title: "Frontend Development",
    description: "Focused on modern frontend engineering with React, JavaScript, Tailwind CSS, Git, responsive design, and professional development workflows.",
  },
  {
    year: "2026",
    title: "Full-Stack Development & AI Exploration",
    description: "Expanded into backend development, databases, cloud deployment, software architecture, and AI integration by building real-world applications.",
  },
  {
    year: "2027",
    title: "Building Technology Products",
    description: "Focused on creating scalable software products and collaborating on solutions for businesses, education, healthcare, and public services.",
  },
];

const EngineeringJourney = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref}>
      <div className={`mb-8 opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
        <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-3">Journey</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Engineering <span className="text-gradient">Journey</span>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          A timeline of learning, building, and growing as a software developer.
        </p>
      </div>

      <div className="relative pl-6">
        <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

        <div className="space-y-6">
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className={`relative opacity-0 ${inView ? 'animate-slide-up' : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute left-[-17px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-[#020617] z-10" />

              <div className="pl-2">
                <span className="text-xs font-bold text-accent uppercase tracking-widest">{m.year}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{m.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EngineeringJourney;
