import { useInView } from "react-intersection-observer";
import SectionHeading from "./components/SectionHeading";

const milestones = [
  {
    year: "2024",
    title: "Started My Tech Journey",
    description: "Began exploring software development and computer science fundamentals. Learned HTML, CSS, Git, and the foundations of web development while building my first websites and strengthening problem-solving skills.",
  },
  {
    year: "2025",
    title: "Frontend Development",
    description: "Focused on modern frontend engineering through intensive training and practical projects. Built responsive web applications using JavaScript, React, Tailwind CSS, and modern development workflows while completing professional bootcamps.",
  },
  {
    year: "2026",
    title: "Full-Stack & AI Engineering",
    description: "Expanded into backend development, databases, cloud deployment, software architecture, and AI integration. Built production-ready full-stack applications using React, Node.js, Express, MySQL, Firebase, Supabase, and AI APIs to solve real business and organizational challenges.",
  },
  {
    year: "2027",
    title: "Building Technology Products",
    description: "Focused on creating scalable software products, collaborating with organizations, and growing an independent software studio dedicated to delivering intelligent digital solutions for businesses, education, healthcare, and public services.",
  },
];

const EngineeringJourney = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="journey" className="py-28 px-6">
      <div ref={ref} className="max-w-4xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <SectionHeading
            label="Journey"
            title="My Engineering"
            highlight="Journey"
            description="A continuous path of learning, building, and solving real-world problems through software engineering."
          />
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`relative flex items-start gap-6 md:gap-0 opacity-0 ${inView ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'}`}>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{m.year}</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">{m.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{m.description}</p>
                </div>

                <div className="relative z-10 w-8 h-8 rounded-full bg-[#020617] border-2 border-accent/40 flex items-center justify-center flex-shrink-0 md:mx-auto">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>

                <div className={`flex-1 hidden md:block ${i % 2 === 0 ? 'md:order-2' : ''}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringJourney;
