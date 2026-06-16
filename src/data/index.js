export const projects = [
  {
    name: "Sheger Health Connect",
    category: "Healthcare",
    problem: "Clinics in Addis Ababa needed a digital triage and appointment system to reduce wait times and improve patient care.",
    approach: "Built a full-stack platform with GPT-4-powered symptom analysis, real-time notifications via Socket.io, and role-based dashboards for doctors and patients.",
    outcome: "Reduced average patient wait time by 40% and enabled video consultations for remote patients.",
    tags: ["Node.js", "MySQL", "Socket.io", "GPT-4", "React"],
    github: "https://github.com/gemachistesfaye/Sheger-Health-Connect",
    demo: "https://sheger-health-connect.vercel.app",
    featured: true,
  },
  {
    name: "Ethio-Brew",
    category: "E-Commerce",
    problem: "Ethiopian coffee producers lacked a modern online marketplace to reach international buyers with localized payment options.",
    approach: "Developed a multilingual platform with Gemini AI product recommendations, Telebirr/CBE payment integration, and seller analytics dashboard.",
    outcome: "Onboarded 50+ sellers in the first month with 95% user satisfaction rating.",
    tags: ["Node.js", "MySQL", "Gemini AI", "React"],
    github: "https://github.com/gemachistesfaye/Ethio-Brew",
    demo: "https://ethio-brew.vercel.app",
  },
  {
    name: "AeroDemand-AI",
    category: "AI / ML",
    problem: "Airlines needed accurate demand forecasting to optimize pricing and capacity planning.",
    approach: "Built a Flask REST API with predictive ML models, interactive Plotly dashboards, and automated Excel report generation.",
    outcome: "Achieved 92% prediction accuracy, enabling data-driven pricing decisions.",
    tags: ["Python", "Flask", "ML", "REST API", "Plotly"],
    github: "https://github.com/gemachistesfaye/AeroDemand-AI",
    demo: "https://aerodemand-ai.onrender.com",
  },
  {
    name: "TracePoint",
    category: "PWA / Maps",
    problem: "Students on campus frequently lost items with no efficient way to report or find them.",
    approach: "Created a PWA with AI item matching, Leaflet interactive campus maps, and real-time Firebase push notifications.",
    outcome: "Recovered rate improved by 60% within the first semester of deployment.",
    tags: ["React", "Firebase", "AI", "PWA", "Leaflet"],
    github: "https://github.com/gemachistesfaye/tracepoint-system",
    demo: "https://tracepoint-system.web.app",
  },
  {
    name: "SmartQuiz AI",
    category: "EdTech",
    problem: "Students needed an interactive way to learn JavaScript with personalized feedback and progress tracking.",
    approach: "Designed a gamified learning platform with Gemini AI tutor, code labs, real-time analytics, and achievement system.",
    outcome: "100+ active users with 85% course completion rate — 3x industry average.",
    tags: ["React", "Firebase", "Gemini AI", "Vite", "Charts"],
    github: "https://github.com/gemachistesfaye/SmartQuiz-AI-Platform",
    demo: "https://smart-quiz-ai-platform.vercel.app",
  },
];

export const services = [
  {
    title: "Full-Stack Web Apps",
    desc: "End-to-end web applications with React, Node.js, and modern databases. From MVP to production-ready.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "AI Integration",
    desc: "GPT-4, Gemini, and custom ML models integrated into your products. Chatbots, recommendation engines, and smart automation.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Database Design",
    desc: "Scalable database architecture with MySQL, PostgreSQL, Firebase, and Supabase. Optimization and migration included.",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "API Development",
    desc: "RESTful and real-time APIs with Node.js/Express. Authentication, rate limiting, and documentation.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Data Analytics",
    desc: "Interactive dashboards, data visualization, and business intelligence with Power BI, Plotly, and custom solutions.",
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "UI/UX Implementation",
    desc: "Pixel-perfect, responsive interfaces with Tailwind CSS, animations, and accessibility-first design.",
    color: "from-rose-500 to-pink-600",
  },
];

export const testimonials = [
  {
    name: "Mr. Irandufa",
    role: "Department Head, Haramaya University",
    text: "Gemachis is one of the most dedicated students I've taught. His ability to translate complex concepts into functional applications is remarkable.",
    rating: 5,
  },
  {
    name: "ISHub AAU Team",
    role: "ISHub Summer Bootcamp",
    text: "Gemachis completed our intensive frontend bootcamp with outstanding results. He built and deployed 5 projects in just 2 months.",
    rating: 5,
  },
  {
    name: "Kenanisa Boru",
    role: "Fellow Developer",
    text: "I've worked with Gemachis on several projects. His code is clean, well-organized, and he always delivers on time.",
    rating: 5,
  },
];

export const certificates = [
  { name: "Frontend Development", issuer: "IS Hub AAU", file: "Frontend-Dev-certificate.jpeg" },
  { name: "AI Bootcamp", issuer: "ISHub", file: "AI-bootcamp-certificate.jpeg" },
  { name: "ALX Foundations", issuer: "ALX", file: "alx-certificate.jpeg" },
  { name: "Software Frameworks", issuer: "Haramaya University", file: "Software-Frameworks-certificate.jpeg" },
  { name: "Ethidigizens", issuer: "Ethidigizens", file: "ethidigizens.jpg" },
  { name: "Graphic Design", issuer: "HUCISA", file: "Graphic-Design-Training-certificate.jpeg" },
  { name: "HUCISA", issuer: "HUCISA", file: "HUCISA-AMEN-CREATIVE-CERTIFICATE.jpg" },
];

export const skills = {
  categories: [
    {
      label: "Frontend",
      color: "from-blue-500 to-indigo-600",
      items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "Responsive Design", "UI Development", "Component Architecture"],
    },
    {
      label: "Backend",
      color: "from-cyan-500 to-blue-600",
      items: ["Node.js", "Express.js", "Python", "Flask", "REST APIs", "Authentication", "API Design", "Server-Side Logic"],
    },
    {
      label: "Databases",
      color: "from-amber-500 to-orange-600",
      items: ["SQL", "MySQL", "PostgreSQL", "Firebase", "Supabase", "Database Design", "Normalization", "Query Optimization"],
    },
    {
      label: "AI & Tools",
      color: "from-emerald-500 to-teal-600",
      items: ["GPT Integration", "Gemini APIs", "Prompt Engineering", "Power BI", "Data Visualization", "Git", "GitHub", "Vercel", "Render"],
    },
  ],
  strongest: [
    { name: "JavaScript", pct: 95 },
    { name: "React.js", pct: 92 },
    { name: "Node.js", pct: 88 },
    { name: "SQL / MySQL", pct: 85 },
    { name: "Python", pct: 82 },
    { name: "Database Design", pct: 80 },
    { name: "Power BI", pct: 78 },
    { name: "AI Integration", pct: 75 },
  ],
};

export const experience = [
  {
    role: "Software Engineering Intern",
    org: "ASTU (Adama Science and Technology University)",
    date: "2026 – Present",
    type: "Training",
    color: "from-violet-500 to-purple-500",
    points: [
      "Currently working on full-stack development projects and gaining hands-on industry experience.",
      "Collaborating with teams on real-world software solutions and best practices.",
    ],
    tags: ["Full-Stack", "Industry Experience", "Agile"],
  },
  {
    role: "Frontend Development Trainee",
    org: "ISHub AAU Summer Bootcamp",
    date: "Jul – Sep 2025",
    type: "Training",
    color: "from-blue-500 to-indigo-500",
    points: [
      "Intensive 2-month program covering HTML5, CSS3, JavaScript ES6+, responsive design and UI architecture.",
      "Built and deployed 5 live projects with Tailwind CSS, LocalStorage, Fetch API and GitHub version control.",
    ],
    tags: ["HTML5", "CSS3", "JS ES6+", "Tailwind"],
  },
  {
    role: "BSc Information Science",
    org: "Haramaya University",
    date: "2024 – 2027",
    type: "Degree",
    color: "from-emerald-500 to-teal-500",
    points: [
      "CGPA: 3.8 / 4.0",
      "Coursework: Database Systems, Data Structures, Web Development, Software Engineering.",
    ],
    tags: ["DB Systems", "Data Structures", "Web Dev"],
  },
];

export const faqs = [
  {
    q: "What are your rates?",
    a: "Pricing depends on project complexity. Frontend starts from 1,000 ETB for small fixes up to 20,000+ ETB for business websites. Backend, database, and AI projects are custom-priced. Contact me with your details for a free quote.",
  },
  {
    q: "What payment methods do you accept?",
    a: "I accept Telebirr, CBE Birr, bank transfers (local), and PayPal / Wise for international clients. For larger projects, I split payments into milestones: 30% upfront, 40% at mid-point, and 30% on delivery.",
  },
  {
    q: "What is your typical project timeline?",
    a: "Simple websites: 1-2 weeks. Full-stack web applications: 3-6 weeks. AI-integrated platforms: 4-8 weeks. I provide a detailed timeline during the proposal phase.",
  },
  {
    q: "Do you provide ongoing support after launch?",
    a: "Yes! Every project includes 30 days of free post-launch support. After that, I offer monthly maintenance packages or hourly support as needed.",
  },
  {
    q: "Can you build MVPs for startups?",
    a: "Yes! I specialize in building MVPs that are lean, functional, and scalable. I help founders validate ideas quickly with core features, then iterate based on user feedback.",
  },
];
