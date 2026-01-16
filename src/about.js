import React, { useState, useEffect, useRef } from 'react';
import { User, Code2, Rocket, GraduationCap, Sparkles, BrainCircuit } from 'lucide-react';

const About = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const highlights = [
    {
      icon: <Code2 className="text-indigo-500" size={26} />,
      title: "Frontend Developer",
      desc: "Building high-performance, responsive web applications with precision.",
      color: "hover:border-indigo-500"
    },
    {
      icon: <BrainCircuit className="text-emerald-500" size={26} />,
      title: "Information Science",
      desc: "Analyzing data structures to create smarter, human-centric interfaces.",
      color: "hover:border-emerald-500"
    },
    {
      icon: <Rocket className="text-orange-500" size={26} />,
      title: "Problem Solver",
      desc: "Turning complex technical challenges into elegant digital solutions.",
      color: "hover:border-orange-500"
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative text-gray-900 dark:text-gray-100 py-24 px-6 sm:px-12 transition-colors duration-300 overflow-hidden"
    >
      {}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 dark:opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {}
        <div
          className={`text-center mb-20 transition-all duration-1000 transform ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            My Story
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Me</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {}
          <div
            className={`w-full lg:w-2/5 transform transition-all duration-1000 ${
              inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="relative group max-w-sm mx-auto lg:max-w-none">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-2xl">
                {}
               <img
  src={process.env.PUBLIC_URL + "/Profile.jpg"}
  alt="Professional Profile"
  className="rounded-xl w-full aspect-[4/5] object-cover transition-all duration-700 filter grayscale brightness-75 hover:grayscale-0 hover:brightness-100"
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/600x750?text=Profile";
  }}
/>


                {}
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 hidden sm:block transform group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg">
                      <GraduationCap className="text-indigo-600 dark:text-indigo-400" size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">Info Science</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Student / Dev</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {}
          <div
            className={`w-full lg:w-3/5 transition-all duration-1000 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
                <User size={28} />
                <h3 className="text-2xl font-bold tracking-tight">Crafting Digital Excellence</h3>
              </div>

              <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-light">
                I am a dedicated <span className="text-indigo-600 dark:text-indigo-400 font-semibold italic">Information Science student</span> who views code as a medium for artistic and functional expression. I specialize in bridging the gap between complex backend logic and seamless frontend interaction.
              </p>

              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  With deep expertise in <span className="font-bold text-gray-900 dark:text-white underline decoration-indigo-500 decoration-2 underline-offset-4">React, JavaScript and Python</span>, I focus on building accessible, scalable and visually stunning applications. My academic background allows me to leverage data-driven insights to optimize user experiences.
                </p>
              </div>

              {}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                {highlights.map((item, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-2xl bg-white dark:bg-gray-800/40 border-2 border-transparent shadow-sm ${item.color} hover:shadow-lg transition-all duration-500 group cursor-default`}
                  >
                    <div className="mb-4 bg-gray-50 dark:bg-gray-700/50 w-12 h-12 flex items-center justify-center rounded-xl transform group-hover:rotate-6 transition-transform">
                      {item.icon}
                    </div>
                    <h4 className="font-extrabold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
