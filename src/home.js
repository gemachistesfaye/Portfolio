import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, Briefcase, Github, Linkedin } from 'lucide-react';

const App = () => {
  const [inView, setInView] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    const currentRef = heroRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500 font-sans flex flex-col selection:bg-indigo-100 dark:selection:bg-indigo-900/50">
      {}
      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1.05); }
            50% { transform: scale(1.1); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 15s ease-in-out infinite;
          }
        `}
      </style>

      {}
      <section
        id="home"
        ref={heroRef}
        className="flex-grow flex flex-col items-center justify-center relative overflow-hidden px-4 py-20"
      >
        {}
        <div className="absolute inset-0 z-0">
          <div
            className="h-full w-full bg-cover bg-center animate-pulse-slow"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
              filter: 'grayscale(40%) brightness(0.6)'
            }}
          ></div>
          {}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/95 to-white dark:from-gray-900/80 dark:via-gray-900/95 dark:to-gray-900"></div>
          <div className="absolute inset-0 opacity-30 dark:opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>
        </div>

        {}
        <div
          className={`relative py-10 z-10 max-w-5xl mx-auto text-center transition-all duration-1000 ease-out transform ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          {}
          <div className="inline-flex items-center space-x-2 px-4 py-2 mb-8 bg-white/50 dark:bg-white/5 backdrop-blur-md text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-100/50 dark:border-indigo-500/20 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex  h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
            </span>
            <span className="font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase">  Available for new projects</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-8 tracking-tighter text-gray-900 dark:text-white leading-[1.1]">
            Hello, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">
              Gemachis Tesfaye
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed ">
            A Passionate software engineer specializing in web development and data-driven solutions.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center items-center">
            {}
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative w-full sm:w-auto overflow-hidden bg-indigo-600 text-white font-bold py-4 px-10 rounded-2xl shadow-2xl shadow-indigo-500/20 transition-all duration-300 hover:bg-indigo-700 active:scale-95 flex items-center justify-center"
            >
              <Briefcase className="mr-2 h-5 w-5 transition-transform group-hover:-rotate-12" />
              <span>Explore My Work</span>
            </button>

            {}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 text-gray-900 dark:text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center group"
            >
              <Mail className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              <span>Get in Touch</span>
            </button>
          </div>

          {}
          <div className="mt-16 flex justify-center items-center space-x-5 ">
            <a 
              href="https://github.com/gemachistesfaye" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-all"
            >
              <Github size={30} className="transform group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/gemachis-tesfaye-137196318" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-all"
            >
              <Linkedin size={30} className="transform group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">LinkedIn</span>
            </a>
          </div>
        </div>

        {}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 delay-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-0'
        }`}>
          <button 
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="flex flex-col items-center space-y-2 group"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 transition-colors">Scroll</span>
            <div className="animate-bounce p-2 bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm">
              <ChevronDown size={24} className="text-gray-400 dark:text-gray-500" />
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default App;