// Serverless Edge Function / Vercel API Route: POST /api/chat
// Implements Pattern 1: Serverless Edge + Gemini 1.5 Flash RAG

const PORTFOLIO_KNOWLEDGE = [
  {
    id: "profile",
    tags: ["who", "about", "bio", "gemachis", "background", "role", "engineer", "developer", "hire", "available", "status"],
    text: "Gemachis Tesfaye is a Full-Stack Software Engineer and AI Systems Developer based in Ethiopia. He specializes in scalable web applications, backend architectures, and AI integrations using React 19, NestJS, Node.js, Python, and PostgreSQL. He is actively open to Full-Stack Developer roles, Software Engineering internships, and high-impact contract opportunities."
  },
  {
    id: "skills",
    tags: ["tech", "stack", "skills", "tools", "languages", "frameworks", "technologies", "frontend", "backend", "database"],
    text: "Technical Stack & Engineering Capabilities:\n• Frontend: React 19, TypeScript, JavaScript (ES6+), Tailwind CSS, Next.js / Vite, PWA, responsive design.\n• Backend: NestJS, Node.js, Express.js, Python (Flask), REST APIs, JWT authentication & RBAC.\n• Database & Storage: PostgreSQL, MySQL, Prisma ORM, Supabase, Firebase, schema design, SQL query optimization.\n• AI & Machine Learning: Google Gemini API, OpenAI APIs, Prompt Engineering, Scikit-Learn, SHAP explainability, TF-IDF, recommendation algorithms.\n• DevOps & Cloud: Git & GitHub, Docker, Vercel, Render, CI/CD pipelines, Postman, Agile/Scrum workflows."
  },
  {
    id: "smartbiz",
    tags: ["smartbiz", "erp", "sofomar", "remote", "internship", "offline", "pwa", "sme", "inventory"],
    text: "SmartBiz ERP Lite:\n• Role: Full-Stack Software Engineer Intern at Sofomar Technologies (Remote, 2026).\n• Stack: React 19, NestJS, Prisma ORM, PostgreSQL, Offline-First PWA.\n• Challenge: Ethiopian SMEs and local merchants struggled with manual inventory tracking and unstable internet connectivity.\n• Solution: Implemented local offline caching, automatic background data synchronization for low-connectivity environments, inventory tracking modules, and community financing workflows (Equb)."
  },
  {
    id: "rpms",
    tags: ["rpms", "research", "project", "management", "astu", "on-site", "internship", "governance", "grant", "university"],
    text: "Research Project Management System (RPMS):\n• Role: Full-Stack Engineering Intern (On-site) at Adama Science and Technology University (ASTU, 2026 – Present).\n• Stack: Laravel 9, PHP 8.2, Blade, Bootstrap 5.3, PostgreSQL / SQLite, Docker, Dompdf.\n• Features: Institutional research lifecycle governance platform featuring 11-role RBAC, blind peer reviews, milestone tracking, dual-threshold budget governance, and multi-tranche fund disbursements."
  },
  {
    id: "sheger-health",
    tags: ["sheger", "health", "telemedicine", "doctor", "triage", "chat", "socket", "clinic"],
    text: "Sheger Health Connect:\n• Role: Full-Stack Software Engineer.\n• Stack: React 18, Node.js 20, Express 5, TypeScript, Socket.IO, PostgreSQL, Docker.\n• Features: Full-stack telemedicine platform with role-based portals (Patient, Doctor, Admin), authenticated real-time Socket.IO clinical chat, encrypted medical records vault, and AI symptom triage with multilingual support (English, Amharic, Afaan Oromoo)."
  },
  {
    id: "eduflow",
    tags: ["eduflow", "school", "education", "edtech", "flask", "students", "teachers", "grades"],
    text: "EduFlow:\n• Role: Full-Stack Software Engineer.\n• Stack: Python, Flask, SQLAlchemy, PostgreSQL, Supabase RLS, Vite, Chart.js.\n• Features: Multi-portal school management platform unifying operations for superadmins, school directors, teachers, students, and parents with automated grading, bulk Excel imports, and real-time alerts."
  },
  {
    id: "ml-projects",
    tags: ["aerodemand", "churn", "ml", "ai", "machine learning", "forecasting", "scikit-learn", "shap", "time series"],
    text: "Machine Learning Projects:\n• AeroDemand-AI: Passenger demand time-series ML forecasting system training Linear Regression with seasonal and lag features on AirPassengers dataset, evaluated with 5-fold TimeSeriesSplit, deployed on Render with Flask APIs.\n• Churn Prediction: Customer retention ML pipeline on Telco and KKBox datasets with SHAP explainability and budget optimization targeting."
  },
  {
    id: "experience",
    tags: ["experience", "jobs", "internships", "work", "companies", "history", "career"],
    text: "Work Experience & Internships:\n1. Full-Stack Software Engineer Intern at Sofomar Technologies (Remote, 2026) — Engineered SmartBiz ERP Lite offline-first PWA.\n2. Full-Stack Engineering Intern (On-site) at Adama Science and Technology University (ASTU, 2026 – Present) — Engineered the institutional RPMS research platform.\n3. Frontend Development Trainee at ISHub, Addis Ababa University (July 2025 – Sept 2025) — Built & deployed 5 production web applications."
  },
  {
    id: "education-credentials",
    tags: ["education", "degree", "university", "haramaya", "credentials", "certificates", "insa", "alx", "geezx", "bootcamp"],
    text: "Education & Credentials:\n• Degree: BSc in Information Science from Haramaya University (2024 – 2027, Expected). Final year standing. Core coursework: Database Systems, Data Structures, Web Development, AI, Systems Analysis.\n• INSA Cyber Talent Summer Camp 2026 (Emerging Technologies: AI Engineering & Big Data)\n• Frontend Development Bootcamp (ISHub AAU, 2025 - Verified Certificate)\n• AI Bootcamp (GeezX, 2025 - Verified Certificate)\n• Founder Academy 6-Week Deep Dive (ALX Ventures, 2024 - Verified Certificate)\n• Software Development Frameworks Training (Haramaya University, 2024 - Verified Certificate)"
  },
  {
    id: "contact",
    tags: ["contact", "email", "phone", "hire", "collaborate", "telegram", "github", "linkedin", "reach"],
    text: "Contact & Links:\n• Email: gemachistesfaye1@gmail.com\n• Phone: +251 984 656 444\n• Telegram: @gemachis_t\n• GitHub: https://github.com/gemachistesfaye\n• LinkedIn: https://www.linkedin.com/in/gemachis-tesfaye-a54823337/\n• Location: Adama / Addis Ababa, Ethiopia"
  }
];

function retrieveRelevantContext(query) {
  const queryTokens = query.toLowerCase().split(/\W+/).filter(t => t.length > 2);
  if (queryTokens.length === 0) {
    return [PORTFOLIO_KNOWLEDGE[0], PORTFOLIO_KNOWLEDGE[1]];
  }

  const scored = PORTFOLIO_KNOWLEDGE.map(item => {
    let score = 0;
    for (const token of queryTokens) {
      if (item.tags.some(tag => tag.includes(token) || token.includes(tag))) {
        score += 3;
      }
      if (item.text.toLowerCase().includes(token)) {
        score += 1;
      }
    }
    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const selected = scored.filter(s => s.score > 0).slice(0, 3).map(s => s.item);

  return selected.length > 0 ? selected : [PORTFOLIO_KNOWLEDGE[0], PORTFOLIO_KNOWLEDGE[1]];
}

export default async function handler(req, res) {
  // CORS & method verification
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const userMessage = (body.message || "").trim();

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required." });
    }

    // 1. RAG Retrieval Step: Fetch most relevant knowledge chunks
    const relevantChunks = retrieveRelevantContext(userMessage);
    const contextText = relevantChunks.map(c => c.text).join("\n\n---\n\n");

    const apiKey = process.env.GEMINI_API_KEY;

    // 2. RAG Generation Step: If Gemini API key is configured, call Gemini 1.5 Flash
    if (apiKey) {
      const systemInstruction = `You are "Ask Gemachis", the official AI portfolio assistant for Gemachis Tesfaye, a Full-Stack Software Engineer and AI Systems Developer.
Answer the visitor's question accurately, concisely (maximum 2-4 sentences), and professionally using ONLY the retrieved portfolio context provided below.
Do not hallucinate or state experience not in the context.
If asked about contact or hiring, provide his official email (gemachistesfaye1@gmail.com) and mention his contact section.

RETRIEVED PORTFOLIO CONTEXT:
${contextText}`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const geminiResponse = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemInstruction}\n\nUSER QUESTION: ${userMessage}` }]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 350
          }
        })
      });

      if (geminiResponse.ok) {
        const data = await geminiResponse.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return res.status(200).json({
            reply: reply.trim(),
            source: "gemini-1.5-flash-rag",
            chunksUsed: relevantChunks.map(c => c.id)
          });
        }
      }
    }

    // 3. Resilient Fallback: If no API key or API temporarily unavailable, synthesize from retrieved context
    const fallbackSummary = relevantChunks[0].text;
    return res.status(200).json({
      reply: fallbackSummary,
      source: "local-rag",
      chunksUsed: relevantChunks.map(c => c.id)
    });
  } catch (err) {
    console.error("RAG Chat Error:", err);
    return res.status(500).json({
      error: "Failed to generate reply",
      details: err.message
    });
  }
}

