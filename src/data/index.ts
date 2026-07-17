import { Project, Service, SkillCategory, Experience } from "../types";

export const projects: Project[] = [
  {
    name: "Sheger Health Connect",
    category: "Healthcare",
    role: "Full-Stack Developer",
    problem: "Clinics in Addis Ababa needed a digital system to manage appointments and reduce patient wait times.",
    approach: "Built a smart healthcare platform that helps clinics manage patients, schedule appointments, and enable video consultations.",
    outcome: "Built a role-based healthcare platform with real-time messaging, AI triage, and multilingual support.",
    tags: ["Node.js", "MySQL", "Socket.io", "GPT-4", "React"],
    github: "https://github.com/gemachistesfaye/Sheger-Health-Connect",
    demo: "https://sheger-health-connect.vercel.app",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
    featured: true,
    slug: "sheger-health-connect",
  },
  {
    name: "Ethio-Brew",
    category: "E-Commerce",
    role: "Full-Stack Developer",
    problem: "Ethiopian coffee producers needed a modern online marketplace to connect with customers through digital commerce.",
    approach: "Developed a multilingual coffee marketplace with smart product recommendations and local payment support.",
    outcome: "Built a complete marketplace platform with product listings, search, and multilingual support.",
    tags: ["Node.js", "MySQL", "Gemini AI", "React"],
    github: "https://github.com/gemachistesfaye/Ethio-Brew",
    demo: "https://ethio-brew.vercel.app",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=500&fit=crop",
    slug: "ethio-brew",
  },
  {
    name: "AeroDemand-AI",
    category: "AI / ML",
    role: "ML Engineer & Backend Developer",
    problem: "Airlines needed accurate demand forecasting to optimize pricing and capacity planning.",
    approach: "Built an AI-powered forecasting system with interactive dashboards and automated report generation to help airlines predict passenger demand.",
    outcome: "Built an ML forecasting pipeline with interactive dashboards and automated report generation.",
    tags: ["Python", "Flask", "ML", "REST API", "Plotly"],
    github: "https://github.com/gemachistesfaye/AeroDemand-AI",
    demo: "https://aerodemand-ai.onrender.com",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    slug: "aerodemand-ai",
  },
  {
    name: "TracePoint",
    category: "PWA / Maps",
    role: "Full-Stack Developer",
    problem: "Students on campus frequently lost items with no efficient way to report or find them.",
    approach: "Created a smart lost-and-found app with AI matching, interactive campus maps, and real-time notifications.",
    outcome: "Built a PWA with AI matching, interactive campus maps, and real-time notifications.",
    tags: ["React", "Firebase", "AI", "PWA", "Leaflet"],
    github: "https://github.com/gemachistesfaye/tracepoint-system",
    demo: "https://tracepoint-system.web.app",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=500&fit=crop",
    slug: "tracepoint",
  },
  {
    name: "SmartQuiz AI",
    category: "EdTech",
    role: "Full-Stack Developer",
    problem: "Students needed an interactive way to learn programming with personalized feedback.",
    approach: "Designed a gamified learning platform with AI tutor, code labs, and progress tracking.",
    outcome: "Built a gamified learning platform with AI tutor, code labs, and progress tracking.",
    tags: ["React", "Firebase", "Gemini AI", "Vite", "Charts"],
    github: "https://github.com/gemachistesfaye/SmartQuiz-AI-Platform",
    demo: "https://smart-quiz-ai-platform.vercel.app",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=500&fit=crop",
    slug: "smartquiz-ai",
  },
];

export const services: Service[] = [
  {
    title: "Business Platforms",
    desc: "Full-stack platforms built for real operations — dashboards, user management, and production-grade systems.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "AI-Enhanced Applications",
    desc: "Integrating AI capabilities into software products through intelligent assistants, automation, recommendations, and AI-powered features.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Data-Driven Systems",
    desc: "Analytics dashboards, forecasting tools, and data pipelines that turn raw data into actionable insights.",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "API Development",
    desc: "Secure, documented REST APIs built with Node.js and Python — designed for scalability and third-party integration.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Database Architecture",
    desc: "Schema design, query optimization, and data modeling for MySQL, PostgreSQL, Firebase, and Supabase.",
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Business Automation Systems",
    desc: "Converting manual processes into automated digital workflows — from legacy systems to modern cloud architectures.",
    color: "from-rose-500 to-pink-600",
  },
];

export interface Achievement {
  title: string;
  org: string;
  year: string;
  description: string;
  tags: string[];
  category: "achievement" | "credential";
  proofFile?: string;
}

export const achievements: Achievement[] = [
  {
    title: "ISHub AAU Frontend Development Bootcamp",
    org: "ISHub AAU",
    year: "2025",
    description: "Intensive frontend development bootcamp covering modern web technologies and real-world project building.",
    tags: ["React", "JavaScript", "Tailwind CSS", "Git"],
    category: "credential",
    proofFile: "Frontend-Dev-certificate.jpeg",
  },
  {
    title: "GeezX AI Bootcamp",
    org: "GeezX",
    year: "2025",
    description: "Hands-on AI training focused on practical AI integration and intelligent software solutions.",
    tags: ["AI Tools", "Prompt Engineering", "AI Integration"],
    category: "credential",
    proofFile: "AI-bootcamp-certificate.jpeg",
  },
  {
    title: "ALX Ventures Founder Academy",
    org: "ALX Ventures",
    year: "2025",
    description: "Entrepreneurship and product development training focused on technology-driven innovation.",
    tags: ["Product Development", "Entrepreneurship", "Customer Discovery"],
    category: "credential",
    proofFile: "alx-certificate.jpeg",
  },
  {
    title: "Software Development Frameworks Training",
    org: "Haramaya University",
    year: "2024",
    description: "Technical training on software architecture fundamentals and structured application development.",
    tags: ["Software Architecture", "Design Patterns", "Development Practices"],
    category: "credential",
    proofFile: "Software-Frameworks-certificate.jpeg",
  },
  {
    title: "EthioDigizens Digital Literacy",
    org: "EthioDigizens",
    year: "2024",
    description: "Digital literacy and online safety training covering cybersecurity awareness and responsible technology use.",
    tags: ["Digital Skills", "Cybersecurity Awareness"],
    category: "credential",
    proofFile: "ethidigizens.jpg",
  },
];

export const skills: { categories: SkillCategory[] } = {
  categories: [
    {
      label: "Full-Stack Development",
      color: "from-blue-500 to-indigo-600",
      items: ["React.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Node.js", "Express.js", "Python", "Flask", "REST APIs", "Authentication"],
    },
    {
      label: "Database & Backend Systems",
      color: "from-cyan-500 to-blue-600",
      items: ["MySQL", "PostgreSQL", "Firebase", "Supabase", "Database Design", "SQL Optimization", "Data Modeling", "Schema Design", "Backend Architecture"],
    },
    {
      label: "AI Integration",
      color: "from-emerald-500 to-teal-600",
      items: ["OpenAI APIs", "Gemini APIs", "Prompt Engineering", "AI Assistants", "AI Automation", "Machine Learning Fundamentals"],
    },
    {
      label: "Development Tools & Cloud",
      color: "from-amber-500 to-orange-600",
      items: ["Git", "GitHub", "Vercel", "Render", "Firebase Hosting", "VS Code", "Agile Development", "CI/CD"],
    },
  ],
};

export const experience: Experience[] = [
  {
    role: "BSc Information Science",
    org: "Haramaya University",
    date: "2024 – 2027",
    type: "Degree",
    color: "from-emerald-500 to-teal-500",
    points: [
      "Building a strong foundation in software development, database systems, and computational thinking.",
      "Relevant coursework: Database Systems, Data Structures & Algorithms, Software Development, Artificial Intelligence, Web Technologies, Networking.",
      "Applying academic knowledge to real-world projects including full-stack web applications and data-driven systems.",
    ],
    tags: ["Database Systems", "Data Structures", "AI", "Web Technologies"],
  },
  {
    role: "Frontend Development Trainee",
    org: "ISHub AAU Summer Bootcamp",
    date: "Jul – Sep 2025",
    type: "Training",
    color: "from-blue-500 to-indigo-500",
    points: [
      "Completed an intensive 2-month program covering modern frontend engineering.",
      "Built and deployed 5 live projects using React, Tailwind CSS, and modern development workflows.",
    ],
    tags: ["React", "Tailwind CSS", "JavaScript", "Responsive Design"],
  },
  {
    role: "Software Engineering Intern",
    org: "Adama Science and Technology University (ASTU)",
    date: "2026 – Present",
    type: "Internship",
    color: "from-violet-500 to-purple-500",
    points: [
      "Collaborating on full-stack application development in a team-based agile environment.",
      "Building and maintaining production systems using React, Node.js, and relational databases.",
      "Participating in code reviews, sprint planning, and engineering best practices.",
    ],
    tags: ["Full-Stack", "Agile", "Code Reviews", "Team Collaboration"],
  },
];
