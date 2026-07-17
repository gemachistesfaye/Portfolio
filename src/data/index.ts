import { Project, Service, Testimonial, Certificate, SkillCategory, Experience, FAQ } from "../types";

export const projects: Project[] = [
  {
    name: "Sheger Health Connect",
    category: "Healthcare",
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
    problem: "Ethiopian coffee producers needed a modern online marketplace to reach international buyers.",
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
    problem: "Airlines needed accurate demand forecasting to optimize pricing and capacity planning.",
    approach: "Built an AI-powered forecasting tool with interactive dashboards and automated report generation.",
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
    title: "AI-Powered Applications",
    desc: "Intelligent features using GPT, Gemini, and custom ML models — from recommendation engines to automated analysis.",
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
    title: "Digital Transformation",
    desc: "Converting manual processes into automated digital workflows — from legacy systems to modern cloud architectures.",
    color: "from-rose-500 to-pink-600",
  },
];

export const testimonials: Testimonial[] = [];

export const certificates: Certificate[] = [
  { name: "Frontend Development", issuer: "IS Hub AAU", file: "Frontend-Dev-certificate.jpeg" },
  { name: "AI Bootcamp", issuer: "ISHub", file: "AI-bootcamp-certificate.jpeg" },
  { name: "ALX Foundations", issuer: "ALX", file: "alx-certificate.jpeg" },
  { name: "Software Frameworks", issuer: "Haramaya University", file: "Software-Frameworks-certificate.jpeg" },
  { name: "Ethidigizens", issuer: "Ethidigizens", file: "ethidigizens.jpg" },
];

export interface Achievement {
  title: string;
  org: string;
  year: string;
  description: string;
  category: "achievement" | "credential";
  proofFile?: string;
}

export const achievements: Achievement[] = [
  {
    title: "ISHub AAU Frontend Development Bootcamp",
    org: "ISHub AAU",
    year: "2025",
    description: "Completed an intensive two-month frontend development bootcamp covering HTML5, CSS3, JavaScript, React fundamentals, responsive design, Git, and modern development workflows while building and deploying multiple real-world projects.",
    category: "credential",
    proofFile: "Frontend-Dev-certificate.jpeg",
  },
  {
    title: "GeezX AI Bootcamp",
    org: "GeezX",
    year: "2025",
    description: "Completed hands-on AI training focused on AI tools, prompt engineering, practical AI integration, ethical AI, and developing intelligent software solutions.",
    category: "credential",
    proofFile: "AI-bootcamp-certificate.jpeg",
  },
  {
    title: "ALX Ventures Founder Academy",
    org: "ALX Ventures",
    year: "2025",
    description: "Completed entrepreneurship and product development training focused on product thinking, customer discovery, business strategy, leadership, and technology-driven innovation.",
    category: "credential",
    proofFile: "alx-certificate.jpeg",
  },
  {
    title: "Software Development Frameworks Training",
    org: "Haramaya University",
    year: "2024",
    description: "Completed technical training on software development frameworks, software architecture fundamentals, design patterns, and structured application development.",
    category: "credential",
    proofFile: "Software-Frameworks-certificate.jpeg",
  },
  {
    title: "EthioDigizens Digital Literacy",
    org: "EthioDigizens",
    year: "2024",
    description: "Completed digital literacy and online safety training covering responsible technology use, cybersecurity awareness, digital citizenship, and online wellbeing.",
    category: "credential",
    proofFile: "ethidigizens.jpg",
  },
];

export const skills: { categories: SkillCategory[] } = {
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
};

export const experience: Experience[] = [
  {
    role: "Software Engineering Intern",
    org: "ASTU (Adama Science and Technology University)",
    date: "2026 – Present",
    type: "Training",
    color: "from-violet-500 to-purple-500",
    points: [
      "Working on full-stack systems and real-world applications while collaborating on team-based software projects.",
      "Applying agile methodologies, code reviews, and industry best practices in a professional environment.",
    ],
    tags: ["Agile", "Teamwork", "Full-Stack", "Industry Experience"],
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
      "Built multiple class projects including full-stack web applications and data-driven systems.",
      "Coursework: Database Systems, Data Structures, Web Development, Artificial Intelligence, Networking, Digital Literacy.",
    ],
    tags: ["DB Systems", "AI", "Networking", "Web Dev", "Digital Literacy"],
  },
];

export const faqs: FAQ[] = [
  {
    q: "How can you help my business or project?",
    a: "I turn your ideas into functional, beautiful digital products. Whether you need a modern business website to attract clients, a custom web app to automate your workflow, or an AI-powered system (like custom ChatGPT integrations) to save time, I handle everything from design to final deployment.",
  },
  {
    q: "How much will my project cost?",
    a: "Pricing is tailored to your specific needs so you only pay for what brings you value. Simple frontend fixes or landing pages start around 1,000 to 5,000 ETB. Larger business websites or custom AI web apps can range from 10,000 to 50,000+ ETB. I always provide a clear, upfront quote before we begin so there are zero surprises.",
  },
  {
    q: "How does the payment process work?",
    a: "To keep things fair and transparent, payments for larger projects are split into milestones: typically 30% upfront to secure the booking, 40% at the halfway point, and 30% when you are completely satisfied with the final delivery. I accept payments via Telebirr, CBE, Bank of Abyssinia, Dashen Bank, and Awash Bank.",
  },
  {
    q: "How long will it take to build my website or app?",
    a: "It depends on what we're building! A sleek landing page can be live in 3-7 days. A multi-page business website takes about 1-2 weeks. For complex full-stack apps or AI tools, expect 3-8 weeks. During our first chat, I'll give you a realistic timeline so you know exactly when to expect results.",
  },
  {
    q: "Do you use the latest technologies to build my app?",
    a: "Absolutely. I use modern, industry-standard tools to ensure your project is fast, secure, and easy to scale. For the frontend, I use React and Next.js. For the backend, Node.js and Python. I also integrate cutting-edge AI features using OpenAI and Gemini APIs. My goal is to pick the right tech stack for your specific goals, not just what's trendy.",
  },
  {
    q: "What happens after my project goes live? Do you offer support?",
    a: "I won't leave you stranded! Every project includes 6 months of free post-launch support to ensure everything runs perfectly. After that, we can set up a low-cost monthly maintenance plan where I handle security updates, bug fixes, and minor changes, allowing you to focus purely on running your business.",
  },
  {
    q: "I have a startup idea. Can you build an MVP to test the market?",
    a: "Yes! I specialize in helping founders launch Minimum Viable Products (MVPs) quickly and affordably. I will help you cut through the noise, build only the core features needed to validate your idea, and set up cheap hosting options so you can test your concept without breaking the bank.",
  },
];
