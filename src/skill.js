import React, { useState, useEffect, useRef } from 'react';

const Skill = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skillsData = [
    {
      title: 'Technical Stack',
      description: 'Core technologies and development environments.',
      showMetrics: true,
      items: [
        { name: 'HTML5', level: 95, color: '#E34F26', shadow: 'rgba(227, 79, 38, 0.2)', img: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg' },
        { name: 'CSS3 / Responsive', level: 92, color: '#1572B6', shadow: 'rgba(21, 114, 182, 0.2)', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg' },
        { name: 'JavaScript', level: 88, color: '#F7DF1E', shadow: 'rgba(247, 223, 30, 0.2)', img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' },
        { name: 'React.js', level: 85, color: '#61DAFB', shadow: 'rgba(97, 218, 251, 0.2)', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
        { name: 'Python', level: 75, color: '#3776AB', shadow: 'rgba(55, 118, 171, 0.2)', img: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
        { name: 'VS Code', level: 95, color: '#007ACC', shadow: 'rgba(0, 122, 204, 0.2)', img: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg' },
        { name: 'Tailwind CSS', level: 90, color: '#06B6D4', shadow: 'rgba(6, 182, 212, 0.2)', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
        { name: 'Git / GitHub', level: 85, color: '#F05032', shadow: 'rgba(240, 80, 50, 0.2)', img: 'https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png' }
      ]
    },
    {
      title: 'Soft Skills & Management',
      description: 'Interpersonal strengths and leadership capabilities.',
      showMetrics: false,
      items: [
        { name: 'Project Management', color: '#8B5CF6', shadow: 'rgba(139, 92, 246, 0.2)', icon: 'briefcase', detail: 'Agile & Scrum Methodologies' },
        { name: 'Communication', color: '#EC4899', shadow: 'rgba(236, 72, 153, 0.2)', icon: 'message', detail: 'Cross-functional Collaboration' },
        { name: 'Team Leadership', color: '#10B981', shadow: 'rgba(16, 185, 129, 0.2)', icon: 'users', detail: 'Mentoring & Strategy' },
        { name: 'Problem Solving', color: '#F59E0B', shadow: 'rgba(245, 158, 11, 0.2)', icon: 'zap', detail: 'Analytical & Creative Thinking' }
      ]
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'briefcase': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
      case 'message': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>;
      case 'users': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
      case 'zap': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
      default: return null;
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative bg-slate-50 dark:bg-[#020617] text-slate-600 dark:text-slate-300 py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500"
    >
      {}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {}
        <div className={`text-center mb-16 md:mb-24 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">Mindset</span>
          </h2>
          <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light px-4">
            A blend of technical prowess and interpersonal strengths refined through years of development and leadership.
          </p>
        </div>

        {}
        <div className="space-y-24">
          {skillsData.map((category, catIdx) => (
            <div key={catIdx}>
              <div className={`flex flex-col md:flex-row md:items-center gap-4 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{category.title}</h3>
                  <p className="text-slate-500 dark:text-slate-500 mt-1 text-sm md:text-base">{category.description}</p>
                </div>
                <div className="hidden md:block h-[1px] flex-grow bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {category.items.map((skill, skillIdx) => (
                  <div
                    key={skillIdx}
                    style={{ transitionDelay: `${(skillIdx + 1) * 75}ms` }}
                    className={`group relative bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 p-6 md:p-8 rounded-[2rem] hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-500 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-2 shadow-sm dark:shadow-none
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  >
                    {}
                    <div 
                      className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: `0 0 30px -5px ${skill.shadow}` }}
                    ></div>

                    <div className="flex flex-col h-full justify-between gap-6 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 md:w-14 md:h-14 p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner border border-slate-100 dark:border-slate-800">
                          {skill.img ? (
                            <img src={skill.img} alt={skill.name} className="w-full h-full object-contain" />
                          ) : (
                            <div style={{ color: skill.color }}>{getIcon(skill.icon)}</div>
                          )}
                        </div>
                        {category.showMetrics && (
                          <div className="text-right">
                            <span className="block text-xl md:text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-none">
                              {skill.level}%
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                          {skill.name}
                        </h4>
                        
                        {category.showMetrics ? (
                          <div className="relative w-full h-1.5 bg-slate-200 dark:bg-slate-950 rounded-full overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full rounded-full transition-all duration-[1500ms] cubic-bezier(0.34, 1.56, 0.64, 1)"
                              style={{ 
                                width: isVisible ? `${skill.level}%` : '0%',
                                backgroundColor: skill.color,
                              }}
                            >
                              <div className="absolute inset-0 w-full h-full opacity-20 bg-[linear-gradient(45deg,rgba(255,255,255,0.4)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.4)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[move-stripe_2s_linear_infinite]"></div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 dark:text-slate-500 font-medium tracking-wide">
                            {skill.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes move-stripe {
          from { background-position: 0 0; }
          to { background-position: 1rem 0; }
        }
      `}} />
    </section>
  );
};

export default Skill;