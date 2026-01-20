import React, { useState, useEffect, useRef } from 'react';

import {
  Briefcase,
  GraduationCap,
  Palette,
  X,
  Award,
  CheckCircle2,
  Download,
  Layers,
  Code2,
  Sparkles,
  ArrowUpRight,
  Globe,
  Zap,
  Cpu,
  ShieldCheck,
  FileText,
  Eye
} from 'lucide-react';


const CountingNumber = ({ label, value, duration = 1200, trigger = false }) => {
  const targetValue = parseInt(value.replace('+', '')) || 0;
  const isExperience = label.toLowerCase() === 'experience';

  const [count, setCount] = useState(targetValue);

  useEffect(() => {
    if (isExperience) return;

    if (trigger) {
      let startTime;
      let raf;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * targetValue));

        if (progress < 1) {
          raf = requestAnimationFrame(animate);
        }
      };

      raf = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(raf);
    } else {
      setCount(targetValue);
    }
  }, [trigger, targetValue, duration, isExperience]);

  if (isExperience) {
    return <span>{targetValue}+</span>;
  }

  const displayValue = count < 10 ? `0${count}` : count;
  return <span>{displayValue}+</span>;
};



const CVPreviewSkeleton = () => (
  <div className="w-full aspect-[1/1.4] bg-white dark:bg-slate-800 rounded-lg shadow-inner p-4 border border-slate-200 dark:border-slate-700 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700" />
      <div className="space-y-1">
        <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="w-12 h-1.5 bg-slate-100 dark:bg-slate-700 rounded" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded" />
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded" />
      <div className="w-3/4 h-1.5 bg-slate-100 dark:bg-slate-700 rounded" />
    </div>
    <div className="mt-6 space-y-3">
      <div className="w-1/2 h-2 bg-indigo-50 dark:bg-indigo-900/20 rounded" />
      <div className="w-full h-12 bg-slate-50 dark:bg-slate-900/50 rounded-md border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-300">
        <FileText size={16} />
      </div>
    </div>
  </div>
);


const CertificateVisual = ({ cert }) => {
  return (
    <div className="
      relative
      w-full
      max-h-[80vh]
      flex items-center justify-center
      overflow-auto
      rounded-2xl
      shadow-2xl
      border border-slate-200 dark:border-slate-800
      bg-slate-100 dark:bg-slate-900
    ">
      <img
        src={cert.image}
        alt={cert.role}
        className="
          w-full
          h-auto
          object-contain
          rounded-xl
        "
      />
    </div>
  );
};




const Experience = ({ showCVOptions, setShowCVOptions }) => {

  const [selectedCert, setSelectedCert] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [activeScrollId, setActiveScrollId] = useState(null);
  const timelineRef = useRef(null);
  const cardRefs = useRef({});
  const [fullImageOpen, setFullImageOpen] = useState(false);


useEffect(() => {
  document.body.style.overflow =
    showCVOptions || selectedCert ? "hidden" : "auto";

  return () => {
    document.body.style.overflow = "auto";
  };
}, [showCVOptions, selectedCert]);

{}
useEffect(() => {
  document.body.style.overflow =
    selectedCert || fullImageOpen ? "hidden" : "auto";
}, [selectedCert, fullImageOpen]);



  const GOOGLE_DRIVE_CV_LINK = "https://drive.google.com/file/d/1lzpGC9a6dJs0dpBdCpnrxz-MbdPwNuK3/view?usp=sharing";

  const experiences = [
{
  id: "education",
  company: "Haramaya University",
  role: "Information Science",
  period: "2021 – 2025",
  location: "Harar, Ethiopia",
  description: "Studied Information Science with a focus on applying data management, database design and analytics to solve real-world business and organizational problems. Developed skills in data visualization, programming and information retrieval.",
  technologies: ["Python", "MySQL", "HTML/CSS/JS", "Power BI", "Information Retrieval"],
  type: "education",
  icon: <GraduationCap size={24} />,
  color: "from-blue-500 to-cyan-400",
  lightBg: "bg-blue-50/50",
  darkBg: "dark:bg-blue-900/10",
  border: "border-blue-200 dark:border-blue-800/50",
  accent: "#3b82f6",
  image: "https://images.unsplash.com/photo-1523050338392-06ba54431b72?auto=format&fit=crop&q=80&w=1200"
}
,
    {
      id: "hu-software",
      company: "Haramaya University",
      role: "Software Frameworks",
      period: "Oct 2024",
      location: "Harar, Ethiopia",
      description: "Specialized training on modern Software Development Frameworks. Awarded for dedication to advanced technical architecture.",
      technologies: ["Architecture", "SQL Server", "Systems"],
      type: "certificate",
      hasCertificate: true,
      icon: <Cpu size={24} />,
      color: "from-amber-500 to-orange-400",
      lightBg: "bg-amber-50/50",
      darkBg: "dark:bg-amber-900/10",
      border: "border-amber-200 dark:border-amber-800/50",
      accent: "#f59e0b",
      image: process.env.PUBLIC_URL + "/Certificate/Software-Frameworks-certificate.jpeg"

    },
    {
      id: "alx-ventures",
      company: "ALX Ventures",
      role: "Founder Academy",
      period: "Nov 2024",
      location: "Haramaya, Ethiopia",
      description: "Deep Dive program focused on entrepreneurship and venture building. Developing skills for scaling impactful startups.",
      technologies: ["Venture", "Strategy", "Market"],
      type: "certificate",
      hasCertificate: true,
      icon: <Zap size={24} />,
      color: "from-indigo-600 to-purple-500",
      lightBg: "bg-indigo-50/50",
      darkBg: "dark:bg-indigo-900/10",
      border: "border-indigo-200 dark:border-indigo-800/50",
      accent: "#4f46e5",
     image: process.env.PUBLIC_URL + "/Certificate/alx-certificate.jpeg"
    },
    {
      id: "geezx-ai",
      company: "GeezX AI",
      role: "AI Bootcamp",
      period: "Sept 2025",
      location: "Online",
      description: "Mastering AI foundations, tools, and ethics. Practical applications of Machine Learning foundations.",
      technologies: ["AI Tools", "Ethics", "ML"],
      type: "certificate",
      hasCertificate: true,
      icon: <Code2 size={24} />,
      color: "from-emerald-500 to-teal-400",
      lightBg: "bg-emerald-50/50",
      darkBg: "dark:bg-emerald-900/10",
      border: "border-emerald-200 dark:border-emerald-800/50",
      accent: "#10b981",
     image: process.env.PUBLIC_URL + "/Certificate/AI-bootcamp-certificate.jpeg"
    },
    {
      id: "meta",
      company: "EthioDigizens x Meta",
      role: "Digital Literacy",
      period: "Sept 2025",
      location: "Online",
      description: "Digital literacy and online wellbeing course. Recognized for fostering responsible online practices.",
      technologies: ["Safety", "Literacy", "Meta"],
      type: "certificate",
      hasCertificate: true,
      icon: <ShieldCheck size={24} />,
      color: "from-blue-600 to-blue-400",
      lightBg: "bg-blue-50/70",
      darkBg: "dark:bg-blue-900/10",
      border: "border-blue-200 dark:border-blue-800/50",
      accent: "#0668E1",
      image: process.env.PUBLIC_URL + "/Certificate/ethidigizens.jpg"
    },
    {
      id: "amen",
      company: "Amen x HUCISA",
      role: "Graphic Design",
      period: "Sept 2025",
      location: "Online",
     description: "Successfully completed a comprehensive Graphic Design training, gaining hands-on experience in creating visual content, branding and UI design. Applied practical skills through projects and final creative assignments, demonstrating proficiency in modern design tools and techniques.",
  technologies: ["Adobe Photoshop", "Branding", "UI/UX Design"],
      type: "creative",
      hasCertificate: true,
      icon: <Palette size={24} />,
      color: "from-pink-500 to-rose-400",
      lightBg: "bg-pink-50/50",
      darkBg: "dark:bg-pink-900/10",
      border: "border-pink-200 dark:border-pink-800/50",
      accent: "#ec4899",
      image: process.env.PUBLIC_URL + "/Certificate/HUCISA-AMEN-CREATIVE-CERTIFICATE.jpg"
    },
    {
  id: "ishub",
  company: "ISHUB AAU",
  role: "Frontend Developer",
  period: "Sept 2025",
  location: "Addis Ababa",
  description: "Completed an intensive frontend development bootcamp with a focus on building responsive, user-friendly React applications. Gained hands-on experience with modern frontend technologies, implementing interactive UI components and applying best practices in web design and development.",
  technologies: ["React.js", "JavaScript", "Tailwind CSS"],
  type: "work",
  hasCertificate: true,
  icon: <Globe size={24} />,
  color: "from-sky-500 to-blue-400",
  lightBg: "bg-sky-50/50",
  darkBg: "dark:bg-sky-900/10",
  border: "border-sky-200 dark:border-sky-800/50",
  accent: "#0ea5e9",
  image: process.env.PUBLIC_URL + "/Certificate/Frontend-Dev-certificate.jpeg"
}, 

 {
  id: "graphic-design-training",
  company: "IFARGAN x Haramaya University",
  role: "Graphic Design Training",
  period: "Dec 2025",
  location: "Harar, Ethiopia",
  description: `Successfully completed a hands-on Graphic Design Training organized by IFARGAN in collaboration with Haramaya University. Gained practical experience in creating visual content, designing brand identities, and crafting UI/UX designs using industry-standard tools. Applied skills through real-world design exercises and final creative projects.`,
  technologies: ["Adobe Photoshop", "Adobe Illustrator", "Branding"],
  type: "certificate",
  hasCertificate: true,
  icon: <Palette size={24} />,
  color: "from-pink-500 to-rose-400",
  lightBg: "bg-pink-50/50",
  darkBg: "dark:bg-pink-900/10",
  border: "border-pink-200 dark:border-pink-800/50",
  accent: "#ec4899",
  image: process.env.PUBLIC_URL + "/Certificate/Graphic-Design-Training-certificate.jpeg"
}

  ];


  

const stats = [
  { label: "Experience", value: "1+", icon: <Briefcase /> },
  { label: "Projects", value: "10+", icon: <Layers /> },
  { label: "Credentials", value: "07+", icon: <Award /> },
];

const [hoveredStats, setHoveredStats] = useState(stats.map(() => false));


 
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px', 
      threshold: 0.1
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveScrollId(entry.target.getAttribute('data-id'));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    const timer = setTimeout(() => {
      Object.values(cardRefs.current).forEach(ref => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const handleDownload = () => {
    setShowCVOptions(false);
    window.open(GOOGLE_DRIVE_CV_LINK, '_blank');
  };

  return (
    <div id="experience" className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-500 min-h-screen font-sans">
      <section className="py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        {}
        <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} /> Career Milestones
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Work & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Education</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {}
        <div className="max-w-6xl mx-auto relative mb-32" ref={timelineRef}>
          {}
          <div className="absolute top-[8%] bottom-[8%] left-1/2 -translate-x-1/2 w-px hidden md:block z-0">
             <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800/60 rounded-full" />
             <div className="absolute inset-0 w-[3px] left-1/2 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-[2px]" />
             
             {experiences.map((_, i) => (
               <div 
                 key={i} 
                 className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 z-10"
                 style={{ top: `${(i / (experiences.length - 1)) * 100}%` }}
               />
             ))}
          </div>

          <div className="relative z-10 space-y-12 md:space-y-0">
            {experiences.map((item, index) => {
              const isActive = hoveredId === item.id || activeScrollId === item.id;
              const isOtherActive = (hoveredId || activeScrollId) && (hoveredId !== item.id && activeScrollId !== item.id);

              return (
                <div 
                  key={item.id}
                  data-id={item.id}
                  ref={el => cardRefs.current[item.id] = el}
                  className={`flex flex-col md:flex-row items-center w-full md:min-h-[350px] ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} relative py-8 md:py-0 transition-opacity duration-700`}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] z-0 transition-all duration-700 
                    ${isActive ? `bg-gradient-to-r ${item.color} w-[8%]` : 'bg-slate-200 dark:bg-slate-800 w-[5%]'}
                    ${index % 2 === 0 ? 'right-1/2 translate-x-0.5' : 'left-1/2 -translate-x-0.5'}`} 
                  />

                  {}
                  <div className="w-full md:w-[45%] relative z-10 px-4 md:px-0">
                    <div 
                      className={`group relative flex flex-col rounded-[2.5rem] border ${item.border} ${item.lightBg} ${item.darkBg} p-8 transition-all duration-500 overflow-hidden 
                        ${isOtherActive ? 'opacity-30 scale-[0.98] blur-[1px]' : 'opacity-100 scale-100'}
                        ${isActive ? 'shadow-2xl shadow-indigo-500/10 -translate-y-2' : ''}
                        hover:shadow-2xl hover:shadow-indigo-500/10
                      `}
                    >
                      {}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} ${isActive ? 'opacity-20' : 'opacity-0'} group-hover:opacity-20 blur-3xl transition-opacity duration-700`} />
                      
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg transform transition-transform duration-500 ${isActive ? 'rotate-6 scale-110' : ''} group-hover:rotate-6 group-hover:scale-110`}>
                          {item.icon}
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{item.period}</span>
                          <div className="flex items-center justify-end mt-1 gap-1 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter">
                            <Globe size={10}/> {item.location}
                          </div>
                        </div>
                      </div>

                      <h3 className={`text-2xl font-black leading-tight mb-1 transition-colors duration-500 ${isActive ? 'text-indigo-600 dark:text-white' : 'text-slate-900 dark:text-white'}`}>{item.role}</h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">{item.company}</p>

                      <p className={`text-base font-medium leading-relaxed mb-6 transition-all duration-500 ${isActive ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'} line-clamp-2 group-hover:line-clamp-none`}>
                        {item.description}
                      </p>

                     <div className="flex flex-wrap gap-2">
  {item.technologies.map((tech) => (
 <span className="
  px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide
  border-2 border-gray-400 dark:border-gray-600
  text-gray-700 dark:text-gray-200
  bg-transparent
  transition-all duration-200 ease-in-out
  hover:bg-gray-200 dark:hover:bg-gray-700
  hover:scale-105 hover:shadow-sm
  cursor-default
">
  {tech}
</span>

  ))}
</div>




                      {item.hasCertificate && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCert(item);
                          }}
                          className={`mt-6 pt-6 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[12px] font-black uppercase tracking-[0.2em] w-full transition-colors group/link ${isActive ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-400 dark:text-slate-500 hover:text-indigo-600'}`}
                        >
                          <span>View Certificate</span>
                          <ArrowUpRight size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>

                  {}
                  <div className="hidden md:flex w-[10%] justify-center items-center relative h-full">
                    {}
                    <div className={`absolute w-16 h-16 rounded-full bg-gradient-to-br ${item.color} transition-all duration-700 ${isActive ? 'opacity-20 scale-125 animate-pulse' : 'opacity-0 scale-0'}`} />
                    
                    {}
                    <div className={`relative w-4 h-4 rounded-full bg-gradient-to-br ${item.color} z-20 shadow-xl ring-4 ring-white dark:ring-slate-950 transition-all duration-700 ${isActive ? 'scale-[2.2] rotate-90' : 'scale-100'}`}>
                      {isActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Zap size={6} className="text-white animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>

                  {}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>

        {}
        <div className="max-w-5xl mx-auto mt-24 relative z-10">


<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
  {stats.map((stat, i) => (
    <div
      key={i}
      className="group flex items-center gap-6 p-8 rounded-[2rem] bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:scale-[1.02] transition-all duration-300"
      onMouseEnter={() => {
        const newHover = [...hoveredStats];
        newHover[i] = true;
        setHoveredStats(newHover);
      }}
      onMouseLeave={() => {
        const newHover = [...hoveredStats];
        newHover[i] = false;
        setHoveredStats(newHover);
      }}
    >
      <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        {React.cloneElement(stat.icon, { size: 20 })}
      </div>
      <div>
         <h4 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
  <CountingNumber
    label={stat.label}
    value={stat.value}
    trigger={hoveredStats[i]}
  />
</h4>

        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
          {stat.label}
        </p>
      </div>
    </div>
  ))}
</div>


          <div className="text-center">
            <button 
              onClick={() => setShowCVOptions(true)}
              className="group relative px-10 py-7 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[12px] shadow-[0_20px_50px_rgba(79,70,229,0.2)] hover:shadow-[0_25px_60px_rgba(79,70,229,0.4)] hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all flex items-center gap-4 mx-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-center gap-4">
                <FileText size={20} className="group-hover:rotate-12 transition-transform" />
                <span className="group-hover:text-white">Get Professional CV</span>
              </div>
            </button>
          </div>
        </div>
      </section>
{}
{showCVOptions && (
  <div className="fixed inset-0 z-[120] flex items-center justify-center px-3 sm:px-4">
    
    {}
    <div
      className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      onClick={() => setShowCVOptions(false)}
    />

    {}
    <div
      className="
        relative
        w-full max-w-4xl
        max-h-[92vh]
        overflow-y-auto
        rounded-2xl sm:rounded-3xl md:rounded-[3rem]
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-white/10
        shadow-2xl
        flex flex-col md:flex-row
        animate-in zoom-in-95 duration-300
      "
    >

      {}
      <div
        className="
          w-full md:w-1/2
          bg-slate-50 dark:bg-black/20
          p-4 sm:p-6 md:p-10
          border-b md:border-b-0 md:border-r
          border-slate-100 dark:border-white/5
        "
      >
        <iframe
          title="CV Internal Preview"
          src="https://drive.google.com/file/d/1lzpGC9a6dJs0dpBdCpnrxz-MbdPwNuK3/preview"
          className="
            w-full
            h-[260px] sm:h-[340px] md:h-[420px]
            rounded-xl sm:rounded-2xl
            border border-slate-200 dark:border-white/10
            bg-white
          "
          loading="lazy"
        />
        <p className="mt-3 text-center text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400">
          Internal Preview
        </p>
      </div>

      {}
      <div
        className="
          w-full md:w-1/2
          p-6 sm:p-8 md:p-12
          flex flex-col justify-center items-center
          text-center
          space-y-6
        "
      >

        <div className="space-y-3">
          <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
            <FileText size={26} />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Curriculum Vitae
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Preview inside or open externally
          </p>
        </div>

        {}
        <a
          href="https://drive.google.com/file/d/1lzpGC9a6dJs0dpBdCpnrxz-MbdPwNuK3/preview"
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-full
            flex items-center justify-between
            p-4 sm:p-6
            rounded-2xl sm:rounded-3xl
            border border-indigo-500/20
            bg-indigo-50/40 hover:bg-indigo-100
            dark:bg-indigo-900/20
            transition-all
          "
        >
          <div className="flex items-center gap-3 sm:gap-4 text-left">
            <Eye size={20} className="text-indigo-600" />
            <div>
              <p className="font-black text-xs sm:text-sm uppercase">
                Preview Full Screen
              </p>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400">
                External view
              </p>
            </div>
          </div>
          <ArrowUpRight size={18} className="text-indigo-500" />
        </a>

        {}
        <a
          href="https://drive.google.com/file/d/1lzpGC9a6dJs0dpBdCpnrxz-MbdPwNuK3/view"
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-full
            flex items-center justify-between
            p-4 sm:p-6
            rounded-2xl sm:rounded-3xl
            border border-emerald-500/20
            bg-emerald-50/40 hover:bg-emerald-100
            dark:bg-emerald-900/20
            transition-all
          "
        >
          <div className="flex items-center gap-3 sm:gap-4 text-left">
            <Download size={20} className="text-emerald-600" />
            <div>
              <p className="font-black text-xs sm:text-sm uppercase">
                Open / Download
              </p>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400">
                PDF • Google Drive
              </p>
            </div>
          </div>
          <ArrowUpRight size={18} className="text-emerald-500" />
        </a>

        {}
        <button
          onClick={() => setShowCVOptions(false)}
          className="text-[9px] sm:text-[10px] uppercase font-black text-slate-400 hover:text-slate-600 transition-colors"
        >
          Return
        </button>
      </div>

      {}
      <button
        onClick={() => setShowCVOptions(false)}
        className="
          absolute
          top-3 right-3
          sm:top-6 sm:right-6
          text-slate-400
          hover:text-slate-600
        "
      >
        <X size={22} />
      </button>

    </div>
  </div>
)}



{}
{selectedCert && (
  <div className="fixed inset-0 z-[150] flex items-center justify-center px-3 sm:px-4">

    {}
    <div
      className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
      onClick={() => setSelectedCert(null)}
    />

    {}
    <div
      className="
        relative
        w-full max-w-6xl
        max-h-[94vh]
        overflow-y-auto
        bg-white dark:bg-slate-900
        rounded-2xl sm:rounded-3xl md:rounded-[3rem]
        shadow-2xl
        flex flex-col md:flex-row
        animate-in slide-in-from-bottom-4
      "
    >

      {}
      <div
        className="
          w-full md:w-3/5
          p-4 md:p-8
          flex items-center justify-center
          bg-slate-100/60 dark:bg-black/30
        "
      >
       <div
  onClick={() => setFullImageOpen(true)}
  className="relative group w-full cursor-pointer"
>

          <CertificateVisual cert={selectedCert} />

          {}
          <div
            className="
              absolute inset-0
              bg-black/40
              flex items-center justify-center
            "
          >
            <span
              className="
                px-5 py-2
                bg-white/90
                text-slate-900
                text-[10px]
                font-black
                uppercase
                tracking-widest
                rounded-full
              "
            >
              View Full Certificate
            </span>
          </div>
        </div>
      </div>

      {}
      <div
        className="
          w-full md:w-2/5
          p-6 sm:p-8 md:p-12
          flex flex-col justify-center
          text-center md:text-left
        "
      >
        <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-4">
          <CheckCircle2 size={16} />
          Verified Achievement
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2">
          {selectedCert.role}
        </h3>

        <p className="text-indigo-600 dark:text-indigo-400 font-bold text-[10px] uppercase tracking-widest mb-10">
          {selectedCert.company}
        </p>

        {}
        <button
          onClick={() => setSelectedCert(null)}
          className="
            w-full
            py-4 sm:py-5
            bg-slate-900 dark:bg-white
            text-white dark:text-slate-900
            rounded-xl sm:rounded-2xl
            text-[10px]
            font-black
            uppercase
            tracking-widest
            hover:scale-[1.02]
            transition
          "
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

{}
{fullImageOpen && (
  <div className="fixed inset-0 z-[200] flex items-center justify-center">

    {}
    <div
      className="absolute inset-0 bg-black/95"
      onClick={() => setFullImageOpen(false)}
    />

    {}
    <img
      src={selectedCert.image}
      alt={selectedCert.role}
      className="
        relative
        max-w-[95vw]
        max-h-[95vh]
        object-contain
        rounded-xl
        shadow-2xl
      "
    />

    {}
    <button
      onClick={() => setFullImageOpen(false)}
      className="
        absolute top-6 right-6
        text-white
        bg-black/50
        rounded-full
        p-2
        hover:bg-black/70
        transition
      "
    >
      <X size={24} />
    </button>

 
  </div>
)}




    </div>
  );
};

export default Experience;
