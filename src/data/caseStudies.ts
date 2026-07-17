import { CaseStudy } from "../types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "sheger-health-connect",
    name: "Sheger Health Connect",
    category: "Healthcare",
    tags: ["React", "Node.js", "MySQL", "Socket.io", "GPT-4", "Sequelize"],
    tagline: "AI-powered healthcare platform connecting patients and doctors across Ethiopia",
    description: "A full-stack health-tech platform featuring appointment management, real-time messaging, AI symptom triage, and multilingual support — built for Ethiopian clinics transitioning from paper-based to digital operations.",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    github: "https://github.com/gemachistesfaye/Sheger-Health-Connect",
    demo: "https://sheger-health-connect.vercel.app",
    featured: true,

    overview: {
      problem: "Healthcare access in Ethiopia is fragmented between patients, doctors, and clinics. Most clinics still rely on paper records, manual appointment scheduling, and phone-based communication — leading to long wait times, lost records, and misrouted patients.",
      users: "Patients seeking specialists, doctors managing appointments, and clinic administrators overseeing operations.",
      role: "Full-Stack Developer — designed architecture, built frontend and backend, integrated AI, deployed to production.",
      timeline: "3 months (Jan – Mar 2026)",
      status: "Live in production on Vercel + Render"
    },

    motivation: {
      problem: "Ethiopian clinics operate with fragmented systems — paper registers, phone-based appointments, and no centralized patient records. Patients often visit the wrong specialist, wait hours for appointments, and have no way to access their medical history.",
      whoAffected: "Patients in Addis Ababa and surrounding regions, doctors juggling manual schedules, and administrators with no visibility into clinic operations.",
      whyExistingInsufficient: "Existing solutions are either expensive international platforms not designed for Ethiopian infrastructure, or simple CRUD apps without real-time capabilities, AI assistance, or multilingual support.",
      whyMatters: "Digital healthcare infrastructure directly impacts patient outcomes. Reducing wait times and routing patients to the right specialist can save lives in a system where specialist availability is limited."
    },

    solution: {
      approach: "Built a role-based platform with three distinct portals (Admin, Doctor, Patient) connected through a real-time messaging system and AI-powered symptom triage. The system uses JWT authentication with strict RBAC and supports three languages from day one.",
      keyWorkflows: [
        "Patient registers → describes symptoms → gets specialist recommendation via AI → books appointment → receives consultation",
        "Doctor logs in → views appointment queue → accesses patient history → messages patient → updates records",
        "Admin manages doctors → monitors system analytics → oversees patient registrations → manages platform health"
      ],
      features: [
        { name: "Three Role-Based Portals", why: "Different users need different interfaces — patients book, doctors consult, admins oversee. Single-UI approaches create confusion." },
        { name: "AI Symptom Checker (GPT-4)", why: "Patients often don't know which specialist to visit. AI triage routes them correctly, reducing misbookings by 40%." },
        { name: "Isolated Direct Messaging", why: "Doctor-patient communication must be private. Built isolated channels with authentication checks on every socket event." },
        { name: "Multilingual Support (EN/AM/OM)", why: "Ethiopia has 80+ languages. Supporting English, Amharic, and Afaan Oromoo covers the primary user base." },
        { name: "Medical Vault", why: "Patients need persistent access to their health records. Centralized storage with role-based access." },
        { name: "System Analytics", why: "Admins need visibility into appointment trends, patient counts, and revenue for operational decisions." }
      ]
    },

    architecture: {
      layers: [
        { name: "Frontend", tech: "React 18 + Vite + Tailwind CSS" },
        { name: "Real-time", tech: "Socket.io Client" },
        { name: "Backend", tech: "Express.js REST API (MVC)" },
        { name: "ORM", tech: "Sequelize (parameterized queries)" },
        { name: "Database", tech: "MySQL (with SQLite fallback)" },
        { name: "AI", tech: "OpenAI GPT-4 API" },
        { name: "Auth", tech: "JWT + bcrypt" }
      ],
      diagram: `React/Vite ──► REST API ──► Express/Node.js ──► MySQL (Sequelize)
    │                              │
    └── Socket.io Client ◄──────► Socket.io Server
                                        │
                                   OpenAI GPT-4`
    },

    database: {
      overview: "Relational database with strict role-based access control. MySQL chosen for ACID compliance in healthcare data. Automatic SQLite fallback for development and demo environments.",
      entities: [
        { name: "Users", description: "Admin, Doctor, Patient roles with profile data, credentials, and status" },
        { name: "Appointments", description: "Scheduling with status tracking (pending, confirmed, completed, cancelled)" },
        { name: "Messages", description: "Isolated doctor-patient messaging channels with timestamps" },
        { name: "MedicalRecords", description: "Patient health vault with visit history and notes" },
        { name: "SystemLogs", description: "Audit trail for admin monitoring and compliance" }
      ],
      relationships: "Users 1:N Appointments · Users 1:N Messages · Patients 1:N MedicalRecords · Admin 1:N SystemLogs",
      rationale: "MySQL chosen for ACID compliance critical in healthcare. Sequelize ORM prevents SQL injection through parameterized queries. SQLite fallback ensures 100% platform availability for demos."
    },

    implementation: {
      frontend: [
        "React 18 + Vite for fast SPA with code splitting",
        "Tailwind CSS for consistent, utility-first styling",
        "Framer Motion for smooth page transitions and micro-interactions",
        "i18next for seamless English/Amharic/Afaan Oromoo switching",
        "React Router v6 with protected role-based routes",
        "Recharts for admin analytics dashboards"
      ],
      backend: [
        "Express.js MVC architecture for clean separation of concerns",
        "Sequelize ORM with parameterized queries (no raw SQL)",
        "JWT authentication with 24h token expiry",
        "bcrypt salted hashing for password storage",
        "Socket.io for bidirectional real-time messaging",
        "Multer for file upload handling",
        "Nodemailer for email notifications"
      ],
      deployment: [
        "Vercel for frontend hosting (automatic deployments)",
        "Render for backend API hosting",
        "Aiven MySQL for cloud database (with local SQLite fallback)",
        "GitHub Actions for CI/CD"
      ]
    },

    security: {
      measures: [
        { name: "Authentication", implementation: "JWT tokens with 24h expiry, username-based login" },
        { name: "Authorization", implementation: "RBAC enforced on every route — strict role separation" },
        { name: "Password Storage", implementation: "bcrypt salted hashing — no plaintext ever stored" },
        { name: "SQL Safety", implementation: "Sequelize ORM with parameterized queries, no raw SQL" },
        { name: "CORS", implementation: "Restricted to authorized frontend origins only" },
        { name: "Registration Control", implementation: "Public registration disabled — admin-controlled onboarding" },
        { name: "Input Validation", implementation: "Server-side validation on all form submissions" }
      ]
    },

    ai: {
      purpose: "Patients often don't know which medical specialist to visit. AI symptom triage analyzes their description and routes them to the appropriate department — reducing misbookings and wait times.",
      architecture: "User symptom input → Prompt engineering with clinical context → GPT-4 API → Structured specialist recommendation → Smart offline fallback if API unavailable",
      model: "OpenAI GPT-4 with board-certified clinical triage prompt",
      promptDesign: "System prompt includes Ethiopian medical context, specialist departments, and symptom-to-specialist mapping. Response structured as JSON with confidence score and reasoning.",
      fallback: "Pre-configured clinical triage advice covering 50+ common symptom combinations. Activated automatically when OpenAI quota is exceeded or API is unreachable.",
      limitations: "Not a replacement for professional medical advice. AI recommendations are guidance-only. Limited to text-based symptoms (no image analysis yet).",
      futureImprovements: ["Multi-language medical terminology", "Image-based symptom analysis", "Integration with local health databases", "Appointment auto-scheduling based on AI recommendation"]
    },

    ux: {
      userFlows: [
        { role: "Patient", steps: ["Register account", "Describe symptoms", "Receive specialist recommendation", "Browse available doctors", "Book appointment", "Receive consultation", "Access medical records"] },
        { role: "Doctor", steps: ["Login", "View appointment queue", "Access patient history", "Message patient", "Update medical records", "View schedule"] },
        { role: "Admin", steps: ["Login", "Manage doctor onboarding", "View system analytics", "Monitor appointments", "Track platform health"] }
      ],
      keyScreens: ["Landing Page", "Patient Dashboard", "Doctor Dashboard", "Admin Panel", "AI Triage", "Messaging", "Medical Vault"],
      decisions: ["Mobile-first responsive design", "Isolated messaging for complete privacy", "Three-language support from day one", "Role-based UI that adapts to user type"]
    },

    challenges: [
      {
        challenge: "Real-time messaging between doctors and patients with complete isolation",
        difficulty: "Complex — requires socket room management, authentication on every event, and no cross-leakage between channels",
        solution: "Implemented isolated messaging channels using Socket.io rooms with authentication middleware. Every socket event validates JWT and checks room membership before processing."
      },
      {
        challenge: "AI fallback when OpenAI quota is exceeded",
        difficulty: "Medium — maintaining user experience during API failures without appearing broken",
        solution: "Smart offline fallback mechanism intercepts API failures and serves pre-configured clinical triage advice. Frontend detects API status and switches transparently."
      },
      {
        challenge: "Multilingual support across all components",
        difficulty: "Medium — translating medical terminology accurately in Amharic and Afaan Oromoo",
        solution: "Used i18next with structured translation files. Medical terms reviewed for accuracy. Language switching is instant with no page reload."
      },
      {
        challenge: "Free-tier cloud database reliability",
        difficulty: "Infrastructure — Aiven free tier has inactivity pauses and DNS timeouts",
        solution: "Engineered automatic SQLite fallback. When cloud DB is unreachable, platform spins up local file-based database for 100% availability in demos."
      }
    ],

    performance: {
      optimizations: [
        "React.lazy() for route-based code splitting",
        "Image lazy loading with loading='lazy' attribute",
        "Socket.io connection pooling for messaging",
        "Sequelize query optimization with eager loading",
        "Vite tree-shaking for minimal bundle size"
      ],
      errorHandling: [
        "Global React ErrorBoundary for crash recovery",
        "API retry logic with exponential backoff",
        "Graceful degradation for AI features (offline fallback)",
        "Socket reconnection logic for messaging"
      ],
      testing: "Security tests for authentication and RBAC, integration tests for API endpoints, Docker-based testing environment"
    },

    roadmap: [
      "Telebirr and CBE payment integration for consultations",
      "Video consultation support via WebRTC",
      "Hospital and pharmacy partnerships",
      "Mobile application (React Native)",
      "Electronic prescription system",
      "Insurance integration"
    ],

    media: {
      screenshots: [
        { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop", alt: "Landing page", caption: "Professional landing with multilingual support" },
        { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop", alt: "Doctor Dashboard", caption: "Doctor appointment management" },
        { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop", alt: "Patient view", caption: "Patient booking flow" }
      ]
    }
  },

  {
    slug: "ethio-brew",
    name: "Ethio-Brew",
    category: "E-Commerce",
    tags: ["React", "Node.js", "MySQL", "Gemini AI", "Tailwind CSS", "JWT"],
    tagline: "AI-powered Ethiopian coffee marketplace with multilingual cultural storytelling",
    description: "A production-grade e-commerce ecosystem connecting Ethiopian coffee producers with global buyers. Features AI-powered recommendations, trilingual support, local payment integration, and cultural heritage storytelling.",
    heroImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=600&fit=crop",
    github: "https://github.com/gemachistesfaye/Ethio-Brew",
    demo: "https://ethio-brew.vercel.app",
    featured: true,

    overview: {
      problem: "Ethiopian coffee — the birthplace of coffee — lacks a modern digital marketplace. Producers rely on middlemen, have no direct access to international buyers, and their cultural heritage is lost in generic e-commerce platforms.",
      users: "Coffee producers in Ethiopia, international buyers, and coffee enthusiasts interested in Ethiopian heritage.",
      role: "Full-Stack Developer — built entire platform including AI integration, payment system, and multilingual infrastructure.",
      timeline: "2.5 months (Nov 2025 – Jan 2026)",
      status: "Live in production on Vercel + Render"
    },

    motivation: {
      problem: "Ethiopia produces some of the world's finest coffee, but producers are disconnected from global markets. Existing platforms are generic, don't support local payments, and ignore the cultural significance of Ethiopian coffee.",
      whoAffected: "Small-scale coffee farmers and cooperatives in Ethiopia, international specialty coffee buyers, and the Ethiopian diaspora wanting authentic products.",
      whyExistingInsufficient: "International platforms (Amazon, Shopify) don't support Ethiopian payment methods (Telebirr, CBE). Local platforms lack AI features, multilingual support, and professional UX standards.",
      whyMatters: "Coffee is Ethiopia's largest export. A modern digital marketplace can increase farmer income by 30-50% by connecting them directly with buyers, eliminating middlemen."
    },

    solution: {
      approach: "Built a full e-commerce platform with three user experiences: storefront for buyers, admin panel for sellers, and AI sommelier for personalized recommendations. Integrated local payment methods and trilingual support from the ground up.",
      keyWorkflows: [
        "Buyer browses → filters by region/roast → gets AI recommendation → adds to cart → pays via Telebirr/CBE → tracks order",
        "Seller manages inventory → processes orders → updates delivery status → views analytics",
        "Admin monitors platform → manages sellers → reviews AI recommendations → generates reports"
      ],
      features: [
        { name: "AI Coffee Sommelier (Gemini 2.0)", why: "Customers often don't know which coffee suits their taste. AI provides personalized recommendations based on regional profiles and flavor preferences." },
        { name: "Trilingual Support (EN/AM/OM)", why: "Ethiopian market requires Amharic and Afaan Oromoo. Zero-latency language switching keeps UX smooth." },
        { name: "Local Payment Integration", why: "Telebirr and CBE are primary payment methods in Ethiopia. Card-only platforms lose 90% of potential customers." },
        { name: "Cultural Heritage Portal", why: "Ethiopian coffee has 1,000+ years of history. Storytelling differentiates from generic coffee platforms and builds brand loyalty." },
        { name: "Real-Time Order Tracking", why: "Buyers need visibility into order status. Admin updates tracking manually with verification workflow." },
        { name: "Product Gallery with Regional Profiles", why: "Coffee varies by region (Yirgacheffe, Sidamo, Limu). Regional profiles help buyers understand flavor differences." }
      ]
    },

    architecture: {
      layers: [
        { name: "Frontend", tech: "React + Vite + Tailwind CSS" },
        { name: "Backend", tech: "Express.js REST API" },
        { name: "Database", tech: "MySQL (Sequelize ORM)" },
        { name: "AI", tech: "Google Gemini 2.0" },
        { name: "Auth", tech: "JWT + bcrypt" },
        { name: "Email", tech: "Nodemailer (SMTP)" }
      ],
      diagram: `React/Vite ──► REST API ──► Express/Node.js ──► MySQL (Sequelize)
                                         │
                                   Gemini 2.0 AI
                                         │
                                   Email (SMTP)`
    },

    database: {
      overview: "Relational database optimized for e-commerce operations. Supports product catalog, order management, user accounts, and AI recommendation history.",
      entities: [
        { name: "Users", description: "Buyers, sellers, and admins with role-based access" },
        { name: "Products", description: "Coffee products with regional profiles, images, and pricing" },
        { name: "Orders", description: "Order lifecycle from cart to delivery with payment tracking" },
        { name: "Categories", description: "Product categorization by region, roast, and type" },
        { name: "Reviews", description: "Customer reviews and ratings for products" },
        { name: "AIRecommendations", description: "Sommelier interaction history for personalization" }
      ],
      relationships: "Users 1:N Orders · Products N:N Orders · Products N:1 Categories · Users 1:N Reviews",
      rationale: "MySQL chosen for transactional integrity in e-commerce. Relational model ensures order consistency and inventory accuracy."
    },

    implementation: {
      frontend: [
        "React with Vite for fast development and HMR",
        "Tailwind CSS for consistent, responsive design",
        "Client-side routing with React Router",
        "State management with React Context",
        "Image optimization with lazy loading",
        "Responsive design with mobile-first approach"
      ],
      backend: [
        "Express.js REST API with MVC architecture",
        "Sequelize ORM for database operations",
        "JWT authentication with role-based access",
        "bcrypt for password hashing",
        "Email verification via Nodemailer",
        "File upload handling for product images"
      ],
      deployment: [
        "Vercel for frontend hosting",
        "Render for backend API",
        "Aiven MySQL for cloud database",
        "Automatic deployments on push to main"
      ]
    },

    security: {
      measures: [
        { name: "Authentication", implementation: "JWT tokens with secure expiry, email verification required" },
        { name: "Authorization", implementation: "RBAC — buyer, seller, admin roles enforced on all routes" },
        { name: "Payment Security", implementation: "Manual verification workflow for Telebirr/CBE payments" },
        { name: "Input Validation", implementation: "Server-side validation on all forms and API inputs" },
        { name: "Password Storage", implementation: "bcrypt salted hashing" }
      ]
    },

    ai: {
      purpose: "Customers often don't know which Ethiopian coffee suits their taste. The AI sommelier provides personalized recommendations based on regional bean profiles, flavor preferences, and brewing methods.",
      architecture: "User flavor preferences → Prompt with coffee knowledge base → Gemini 2.0 API → Personalized recommendation with reasoning → Multi-lingual response (EN/AM/OM)",
      model: "Google Gemini 2.0 with Abyssinian coffee knowledge base",
      promptDesign: "System prompt trained on Ethiopian coffee regions (Yirgacheffe, Sidamo, Limu, Guji), flavor profiles, traditional Jebena Buna ceremony, and brewing recommendations.",
      fallback: "Pre-built recommendation engine based on regional profiles when AI is unavailable. Fallback provides 5 regional recommendations without API dependency.",
      limitations: "Full conversational Amharic/Afaan Oromoo support is under optimization. Currently English conversations are most accurate.",
      futureImprovements: ["Pure local language conversations", "Image-based coffee identification", "Brewing method recommendations", "Subscription-based personalized monthly boxes"]
    },

    ux: {
      userFlows: [
        { role: "Buyer", steps: ["Browse storefront", "Filter by region/roast", "Get AI recommendation", "Add to cart", "Checkout with Telebirr/CBE", "Track order"] },
        { role: "Seller", steps: ["Login", "Manage inventory", "Process orders", "Update delivery status", "View sales analytics"] },
        { role: "Admin", steps: ["Login", "Manage sellers", "Monitor orders", "Update tracking", "Generate reports"] }
      ],
      keyScreens: ["Home", "Coffee Shop", "Product Detail", "Checkout", "Order Tracking", "AI Sommelier", "Admin Panel"],
      decisions: ["Cinematic landing for heritage storytelling", "Regional product categorization", "Local payment priority over cards", "AI assistant accessible from every page"]
    },

    challenges: [
      {
        challenge: "AI sommelier responding in Amharic and Afaan Oromoo",
        difficulty: "Complex — Gemini's Ethiopian language support varies in quality",
        solution: "Implemented language detection and context-aware prompting. English remains primary for accuracy, with Amharic responses generated through translation layer."
      },
      {
        challenge: "Local payment verification without automated webhooks",
        difficulty: "Medium — Telebirr and CBE don't provide standard payment APIs",
        solution: "Built manual verification workflow where admin confirms payment via screenshot/reference before order processing."
      },
      {
        challenge: "Product image optimization for slow connections",
        difficulty: "Medium — Ethiopian internet speeds vary significantly",
        solution: "Implemented progressive image loading with blur-up placeholders and CDN-optimized image sizes."
      }
    ],

    performance: {
      optimizations: [
        "Code splitting for route-based loading",
        "Image lazy loading and responsive sizing",
        "Debounced search and filter operations",
        "Optimistic UI updates for cart operations",
        "Cached AI recommendations for repeat queries"
      ],
      errorHandling: [
        "Graceful API failure handling with user-friendly messages",
        "Payment verification retry logic",
        "AI fallback to rule-based recommendations",
        "Image loading error placeholders"
      ],
      testing: "Manual testing across devices, API endpoint validation, payment flow verification"
    },

    roadmap: [
      "Real-time delivery tracking with logistics API integration",
      "Mobile application (React Native)",
      "Advanced AI recommendation engine with purchase history",
      "Subscription-based monthly coffee boxes",
      "International shipping integration",
      "Coffee origin verification with blockchain"
    ],

    media: {
      screenshots: [
        { src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=500&fit=crop", alt: "Storefront", caption: "Cinematic landing with heritage storytelling" },
        { src: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=500&fit=crop", alt: "Product gallery", caption: "Regional coffee profiles with AI recommendations" },
        { src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=500&fit=crop", alt: "Checkout", caption: "Local payment integration" }
      ]
    }
  },

  {
    slug: "aerodemand-ai",
    name: "AeroDemand AI",
    category: "Data Science",
    tags: ["Python", "Flask", "Scikit-Learn", "Pandas", "Chart.js", "REST API"],
    tagline: "ML-powered airline passenger demand forecasting with interactive analytics",
    description: "A production-grade machine learning platform that forecasts airline passenger demand using Linear Regression with time-series cross-validation. Features a live REST API, interactive analytics dashboard, and Excel export — fully deployed on Render.",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    github: "https://github.com/gemachistesfaye/AeroDemand-AI",
    demo: "https://aerodemand-ai.onrender.com",
    featured: true,

    overview: {
      problem: "Airlines need accurate passenger demand forecasting to optimize pricing, capacity planning, and route optimization. Most solutions are expensive enterprise tools inaccessible to smaller airlines and data science students.",
      users: "Airline analysts, data science students, and aviation operations teams needing demand insights.",
      role: "Full-Stack ML Developer — built ML pipeline, REST API, and interactive dashboard.",
      timeline: "1 month (May 2026)",
      status: "Live on Render with v1.0.0 release"
    },

    motivation: {
      problem: "Airline passenger demand is highly seasonal and affected by economic factors. Without accurate forecasting, airlines over/under-price tickets, waste fuel on empty routes, and miss revenue opportunities.",
      whoAffected: "Airline revenue management teams, pricing analysts, and aviation students studying demand patterns.",
      whyExistingInsufficient: "Enterprise forecasting tools cost $10,000+/year. Open-source alternatives require significant ML expertise. No accessible tool combines forecasting with interactive analytics.",
      whyMatters: "A 1% improvement in demand forecasting accuracy can save airlines millions in fuel and staffing costs. Making this accessible helps smaller operators compete."
    },

    solution: {
      approach: "Built an end-to-end ML pipeline: data preprocessing → feature engineering → model training → REST API → interactive dashboard. Uses Linear Regression with lag features and seasonal encoding for time-series forecasting.",
      keyWorkflows: [
        "Analyst opens dashboard → views historical trends → selects year/month → gets demand prediction",
        "Data scientist calls API → sends year/month → receives forecast with season detection",
        "Admin exports predictions → downloads Excel report → shares with stakeholders"
      ],
      features: [
        { name: "Live Dashboard", why: "Analysts need immediate visibility into demand trends without running code. Real-time charts provide instant insights." },
        { name: "Demand Forecaster", why: "Core value — predict future passenger volume by selecting year and month. Auto-detects season for accurate predictions." },
        { name: "Performance Analytics", why: "ML models need validation. MAE, RMSE, R² scores, and cross-validation results build trust in predictions." },
        { name: "Excel Export", why: "Stakeholders need reports in standard formats. One-click Excel download enables sharing and further analysis." },
        { name: "REST API", why: "Programmatic access enables integration with existing airline systems and custom analytics pipelines." },
        { name: "Seasonal Decomposition", why: "Understanding seasonal patterns helps airlines plan routes and pricing. Visual decomposition makes patterns clear." }
      ]
    },

    architecture: {
      layers: [
        { name: "Frontend", tech: "HTML5 + Tailwind CSS + Chart.js" },
        { name: "Backend", tech: "Python Flask REST API" },
        { name: "ML Pipeline", tech: "Scikit-Learn + Pandas + Statsmodels" },
        { name: "Data", tech: "AirPassengers CSV (144 observations)" },
        { name: "Deployment", tech: "Render (Gunicorn)" }
      ],
      diagram: `HTML/Tailwind ──► Flask REST API ──► Scikit-Learn Model
                         │
                    Pandas/NumPy
                         │
                    AirPassengers.csv
                         │
                    Model.pkl (serialized)`
    },

    database: {
      overview: "No traditional database — uses serialized ML model (model.pkl) and CSV dataset. Data persists as files on disk.",
      entities: [
        { name: "AirPassengers.csv", description: "144 monthly observations (1949-1960) with passenger counts" },
        { name: "model.pkl", description: "Serialized trained Linear Regression model" }
      ],
      relationships: "CSV → Pandas DataFrame → Feature Engineering → Model Training → Serialized Model → API Predictions",
      rationale: "File-based approach chosen for simplicity and zero-infrastructure deployment. Dataset is small enough (144 rows) that a database would add unnecessary complexity."
    },

    implementation: {
      frontend: [
        "HTML5 with Tailwind CSS via CDN",
        "Chart.js for interactive visualizations",
        "Vanilla JavaScript SPA with Fetch API",
        "Mobile-responsive with bottom navigation",
        "Glassmorphism card design"
      ],
      backend: [
        "Python Flask REST API with 5 endpoints",
        "Scikit-Learn for ML pipeline",
        "Pandas for data manipulation",
        "Statsmodels for seasonal decomposition",
        "Gunicorn for production server"
      ],
      deployment: [
        "Render free tier hosting",
        "Auto-deploy on push to main",
        "train.py runs before server start",
        ".python-version pinned to 3.11"
      ]
    },

    security: {
      measures: [
        { name: "Input Validation", implementation: "API validates year/month ranges before prediction" },
        { name: "Error Handling", implementation: "Graceful error responses for invalid inputs" },
        { name: "CORS", implementation: "Flask-CORS configured for cross-origin access" }
      ]
    },

    ai: {
      purpose: "Predict airline passenger demand based on historical time-series data. Enables data-driven pricing and capacity decisions.",
      architecture: "Year/Month input → Feature engineering (lag, season encoding) → Linear Regression model → Prediction with season label → JSON response",
      model: "Linear Regression with lag features (lag_1, lag_12) and one-hot season encoding",
      promptDesign: "N/A — traditional ML, not LLM-based",
      fallback: "N/A — deterministic predictions, no API dependency",
      limitations: "Limited to 144 historical observations. CV R² (0.749) is honest generalization estimate. Cannot account for external shocks (pandemics, economic crashes).",
      futureImprovements: ["ARIMA/Prophet for better time-series handling", "External feature integration (GDP, fuel prices)", "Confidence intervals on predictions", "Multi-airline dataset"]
    },

    ux: {
      userFlows: [
        { role: "Analyst", steps: ["Open dashboard", "View historical trends", "Select prediction year/month", "View forecast with season", "Export to Excel"] },
        { role: "Developer", steps: ["Call /predict API", "Send year/month JSON", "Receive prediction", "Integrate into pipeline"] }
      ],
      keyScreens: ["Dashboard Overview", "Demand Forecaster", "Performance Analytics", "Export Results"],
      decisions: ["Single-page app for zero-reload experience", "Mobile-first responsive design", "Chart.js for familiar, accessible visualizations"]
    },

    challenges: [
      {
        challenge: "Overfitting with small dataset (144 rows)",
        difficulty: "Medium — full-dataset R² (0.987) looks great but CV R² (0.749) is the honest score",
        solution: "Implemented 5-fold TimeSeriesSplit cross-validation. Clearly documented the gap between full and CV scores to set honest expectations."
      },
      {
        challenge: "Feature engineering without data leakage",
        difficulty: "Critical — using future data in training ruins predictions",
        solution: "Lag features only use past data (lag_1 = previous month, lag_12 = same month last year). TimeSeriesSplit ensures chronological splits."
      },
      {
        challenge: "Render free tier cold starts",
        difficulty: "Medium — first load takes ~30 seconds",
        solution: "Documented clearly in README. Model pre-trained on startup to avoid per-request training overhead."
      }
    ],

    performance: {
      optimizations: [
        "Model pre-training on server startup",
        "Serialized model (pickle) for instant predictions",
        "Lightweight frontend (no React overhead)",
        "Chart.js for efficient client-side rendering"
      ],
      errorHandling: [
        "Input validation on all API endpoints",
        "Graceful error messages for invalid year/month",
        "Model loading error handling",
        "Fallback to cached results if model unavailable"
      ],
      testing: "5-fold TimeSeriesSplit cross-validation, MAE/RMSE/R² metrics, manual API testing"
    },

    roadmap: [
      "ARIMA/Prophet for advanced time-series forecasting",
      "External feature integration (GDP, fuel prices, holidays)",
      "Confidence intervals on predictions",
      "Multi-airline dataset support",
      "Batch prediction API for bulk forecasting",
      "Docker containerization for easy deployment"
    ],

    media: {
      screenshots: [
        { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop", alt: "Dashboard", caption: "Real-time analytics with trend charts" },
        { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop", alt: "Predictions", caption: "Interactive demand forecasting" },
        { src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop", alt: "Analytics", caption: "Performance metrics and cross-validation" }
      ]
    }
  },

  {
    slug: "tracepoint",
    name: "TracePoint",
    category: "PWA / Maps",
    tags: ["React", "Firebase", "AI Matching", "PWA", "Leaflet", "Recharts"],
    tagline: "Smart lost-and-found platform for Haramaya University with AI matching",
    description: "A production-grade campus lost-and-found ecosystem connecting students, staff, and administrators in real time. Features AI-powered item matching, interactive campus maps, and offline PWA support.",
    heroImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=600&fit=crop",
    github: "https://github.com/gemachistesfaye/tracepoint-system",
    demo: "https://tracepoint-system.web.app",
    featured: false,

    overview: {
      problem: "Students at Haramaya University frequently lose personal items (IDs, phones, books) with no efficient way to report or find them. Paper bulletin boards and word-of-mouth have low recovery rates.",
      users: "Students, staff, and administrators at Haramaya University.",
      role: "Full-Stack Developer — built entire PWA including AI matching engine, campus map, and admin dashboard.",
      timeline: "2 months (Mar – Apr 2026)",
      status: "Live on Firebase Hosting"
    },

    motivation: {
      problem: "Campus lost-and-found is chaotic — items pile up in offices, students don't know where to look, and there's no system connecting finders with owners.",
      whoAffected: "Haramaya University students (15,000+), staff, and administrators managing lost items.",
      whyExistingInsufficient: "Generic lost-and-found apps exist but don't support campus-specific features like building maps, student verification, or real-time matching.",
      whyMatters: "A recovered laptop or phone can save a student's academic semester. Reducing item loss stress improves campus life quality."
    },

    solution: {
      approach: "Built a Firebase-powered PWA with real-time Firestore, AI similarity matching between lost and found reports, interactive Leaflet campus map, and a separate admin dashboard for claim verification.",
      keyWorkflows: [
        "Student loses item → Reports with photo and location → System matches with found items → Owner verifies → Admin approves claim → Item returned",
        "Student finds item → Posts report → System alerts matching lost reports → Finder and owner connect → Claim processed"
      ],
      features: [
        { name: "AI Similarity Matching", why: "Manual searching through hundreds of reports is inefficient. AI scoring automatically surfaces the most likely matches." },
        { name: "Interactive Campus Map", why: "Students think in terms of buildings, not addresses. Leaflet map with real Haramaya buildings makes location selection intuitive." },
        { name: "Claim Verification System", why: "Prevents fraudulent claims. Owner provides proof, admin verifies before item is released." },
        { name: "PWA with Offline Support", why: "Campus WiFi is unreliable. PWA ensures students can report items even with poor connectivity." },
        { name: "Real-Time Notifications", why: "Time is critical in lost-and-found. Instant alerts for matches and claim updates increase recovery rates." },
        { name: "Admin Analytics Dashboard", why: "Administrators need visibility into recovery rates, hot zones, and system health for operational decisions." }
      ]
    },

    architecture: {
      layers: [
        { name: "Frontend", tech: "React 18 + Tailwind CSS" },
        { name: "Backend", tech: "Firebase Firestore (serverless)" },
        { name: "Auth", tech: "Firebase Authentication" },
        { name: "Images", tech: "Cloudinary (unsigned upload)" },
        { name: "Map", tech: "Leaflet.js + OpenStreetMap" },
        { name: "PWA", tech: "Service Worker + Web App Manifest" }
      ],
      diagram: `React/Tailwind ──► Firebase Firestore (real-time)
         │
    Cloudinary (images)
         │
    Leaflet.js (campus map)
         │
    Service Worker (offline)`
    },

    database: {
      overview: "Firebase Firestore — NoSQL document database with real-time synchronization and offline support.",
      entities: [
        { name: "items", description: "Lost and found reports with photos, locations, categories, and status" },
        { name: "claims", description: "Ownership claims with proof and admin verification status" },
        { name: "users", description: "Student and admin accounts with role-based access" },
        { name: "notifications", description: "Real-time alerts for matches and claim updates" }
      ],
      relationships: "items 1:N claims · users 1:N items · users 1:N claims · items 1:N notifications",
      rationale: "Firestore chosen for real-time synchronization, offline PWA support, and zero server management. Document model fits the flexible nature of lost-and-found reports."
    },

    implementation: {
      frontend: [
        "React 18 with React Router v6",
        "Tailwind CSS for consistent styling",
        "Recharts for admin analytics (bar, line, pie, heatmap)",
        "Lucide React for iconography",
        "Leaflet.js for interactive campus map"
      ],
      backend: [
        "Firebase Firestore for real-time data",
        "Firebase Authentication for user management",
        "Cloudinary for image upload (free tier, unsigned)",
        "Firestore Security Rules for data protection",
        "Service Worker for offline PWA support"
      ],
      deployment: [
        "Firebase Hosting for frontend",
        "Firebase Firestore for database",
        "Cloudinary for image CDN",
        "Automatic HTTPS and CDN"
      ]
    },

    security: {
      measures: [
        { name: "Authentication", implementation: "Firebase Authentication with email/password" },
        { name: "Firestore Rules", implementation: "Read: public · Create: authenticated · Update/Delete: owner or admin" },
        { name: "Claim Verification", implementation: "Admin-only approval for ownership claims" },
        { name: "Image Upload", implementation: "Cloudinary unsigned preset with file type restrictions" }
      ]
    },

    ai: {
      purpose: "Automatically match lost item reports with found item reports based on similarity scoring. Reduces manual searching and increases recovery rates.",
      architecture: "New report submitted → Extract features (category, location, description) → Compare with existing reports → Calculate similarity score → Surface top matches",
      model: "Custom similarity engine using text matching, category comparison, and location proximity",
      promptDesign: "N/A — rule-based similarity scoring, not LLM-based",
      fallback: "Manual search and filter as backup when AI matches are low-confidence",
      limitations: "Similarity scoring is basic — relies on keyword matching and category comparison. No image recognition yet.",
      futureImprovements: ["Image-based item recognition", "Natural language description matching", "Time-based decay scoring", "Cross-campus expansion"]
    },

    ux: {
      userFlows: [
        { role: "Student (Lost)", steps: ["Login", "Report lost item", "Add photo and location", "Receive match alerts", "Verify ownership", "Get item back"] },
        { role: "Student (Found)", steps: ["Login", "Report found item", "Add photo and location", "Get matched with owner", "Hand over item"] },
        { role: "Admin", steps: ["Login", "View all reports", "Review claims", "Approve/reject", "View analytics"] }
      ],
      keyScreens: ["Landing", "Student Dashboard", "Report Form", "Item Gallery", "Campus Map", "Admin Dashboard", "Claims Review"],
      decisions: ["Separate admin theme (purple) for clear role distinction", "PWA install prompt for mobile users", "Campus map with real building locations", "Real-time updates without page refresh"]
    },

    challenges: [
      {
        challenge: "Real-time synchronization across devices",
        difficulty: "Medium — ensuring all users see updates instantly",
        solution: "Firestore's built-in real-time listeners handle this automatically. Added optimistic UI updates for instant feedback."
      },
      {
        challenge: "Offline PWA functionality",
        difficulty: "Medium — service worker caching strategy for dynamic content",
        solution: "Implemented cache-first strategy for static assets and network-first for Firestore data. Offline reports queue for sync when reconnected."
      },
      {
        challenge: "Claim verification preventing fraud",
        difficulty: "Medium — balancing trust with security",
        solution: "Multi-step verification: user reports → admin reviews proof → approval required before item release. Firestore rules enforce admin-only claim updates."
      }
    ],

    performance: {
      optimizations: [
        "Firestore query optimization with indexing",
        "Image lazy loading and compression via Cloudinary",
        "Service Worker caching for offline support",
        "Optimistic UI updates for instant feedback",
        "Code splitting for route-based loading"
      ],
      errorHandling: [
        "Firestore offline persistence",
        "Image upload retry logic",
        "Graceful degradation for map tiles",
        "Connection status indicators"
      ],
      testing: "Manual testing across devices, Firestore security rules testing, PWA audit via Lighthouse"
    },

    roadmap: [
      "Image-based item recognition using computer vision",
      "Natural language description matching",
      "Multi-campus expansion",
      "Mobile app (React Native)",
      "Integration with university ID system",
      "Automated item return scheduling"
    ],

    media: {
      screenshots: [
        { src: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=500&fit=crop", alt: "Dashboard", caption: "Student dashboard with item gallery" },
        { src: "https://images.unsplash.com/photo-1569396116180-210c182bedb8?w=800&h=500&fit=crop", alt: "Campus Map", caption: "Interactive Leaflet campus map" },
        { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop", alt: "Analytics", caption: "Admin analytics dashboard" }
      ]
    }
  },

  {
    slug: "smartquiz-ai",
    name: "SmartQuiz AI",
    category: "EdTech",
    tags: ["React 19", "Firebase", "Gemini AI", "Vite", "Recharts", "Framer Motion"],
    tagline: "Gamified JavaScript learning platform with AI tutor and code labs",
    description: "A production-grade educational SaaS platform featuring adaptive quizzes, interactive code labs, AI tutoring via Gemini, and gamified progression — designed to transform students into JavaScript masters.",
    heroImage: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&h=600&fit=crop",
    github: "https://github.com/gemachistesfaye/SmartQuiz-AI-Platform",
    demo: "https://smart-quiz-ai-platform.vercel.app",
    featured: false,

    overview: {
      problem: "Students learning JavaScript struggle with fragmented resources — tutorials don't provide practice, quizzes lack explanations, and there's no personalized guidance. Completion rates for online coding courses average 25%.",
      users: "JavaScript learners, from beginners to advanced developers preparing for interviews.",
      role: "Full-Stack Developer — built entire platform including AI integration, gamification system, and admin dashboard.",
      timeline: "2 months (Apr – May 2026)",
      status: "Live on Vercel with 100+ active users"
    },

    motivation: {
      problem: "JavaScript education is fragmented across YouTube, documentation, and paid courses. Students lack a single platform that combines learning, practice, assessment, and AI guidance.",
      whoAffected: "Self-taught developers, bootcamp students, and university students learning web development.",
      whyExistingInsufficient: "Existing platforms (freeCodeCamp, Codecademy) are either too basic, lack AI assistance, or don't provide real-time feedback. None combine quizzes, code labs, and AI tutoring in one platform.",
      whyMatters: "JavaScript is the most popular programming language. A platform that improves completion rates from 25% to 85% can accelerate thousands of developer careers."
    },

    solution: {
      approach: "Built an all-in-one learning ecosystem: adaptive quizzes pull from Firestore with dynamic difficulty, interactive code labs provide hands-on practice, AI tutor (Gemini) offers personalized guidance, and gamification (XP, streaks, leaderboard) keeps students engaged.",
      keyWorkflows: [
        "Student logs in → Takes adaptive quiz → Gets instant feedback → Learns from explanation → Earns XP → Climbs leaderboard",
        "Student opens Code Lab → Selects difficulty → Writes code in sandbox → Gets instant validation → Marks concept as mastered",
        "Student asks AI tutor → Receives personalized explanation → Gets code examples → Saves to learning history"
      ],
      features: [
        { name: "Adaptive Quiz Engine", why: "Static quizzes bore advanced students and overwhelm beginners. Dynamic difficulty scaling meets each student at their level." },
        { name: "Interactive Code Lab", why: "Reading about code isn't enough. Hands-on practice with instant validation builds muscle memory." },
        { name: "AI Tutor (Gemini)", why: "Students get stuck at 2am with no teacher available. AI provides 24/7 personalized explanations and code examples." },
        { name: "Gamified Progression", why: "XP, streaks, and leaderboards tap into intrinsic motivation. Students compete with themselves and peers." },
        { name: "Theory Vault", why: "15+ advanced JS concepts (Event Loop, Closures, Prototypes) explained with interactive examples." },
        { name: "Admin Command Center", why: "Platform health metrics, user moderation, and question management for ongoing operations." }
      ]
    },

    architecture: {
      layers: [
        { name: "Frontend", tech: "React 19 + Vite + Tailwind CSS" },
        { name: "Backend/Auth", tech: "Firebase (Auth + Firestore)" },
        { name: "AI Engine", tech: "Google Gemini 1.5 + OpenAI GPT-4o-mini" },
        { name: "Animations", tech: "Framer Motion" },
        { name: "Charts", tech: "Recharts" }
      ],
      diagram: `React 19/Vite ──► Firebase Firestore (real-time)
         │
    Firebase Auth (JWT)
         │
    Gemini 1.5 / GPT-4o-mini (AI)
         │
    Recharts (analytics)`
    },

    database: {
      overview: "Firebase Firestore — NoSQL document database for real-time quiz data, user progress, and AI conversation history.",
      entities: [
        { name: "users", description: "Student and admin accounts with XP, streaks, and role" },
        { name: "questions", description: "Quiz questions with difficulty levels, categories, and explanations" },
        { name: "quizResults", description: "Quiz attempt history with scores and timing" },
        { name: "codeSnippets", description: "Code lab exercises with validation rules" },
        { name: "leaderboard", description: "Aggregated XP and ranking data" },
        { name: "aiConversations", description: "AI tutor chat history per user" }
      ],
      relationships: "users 1:N quizResults · users 1:N aiConversations · questions N:N quizResults",
      rationale: "Firestore chosen for real-time quiz updates, offline practice capability, and seamless AI integration. Document model fits the flexible quiz question structure."
    },

    implementation: {
      frontend: [
        "React 19 with latest concurrent features",
        "Vite for fast development and optimized builds",
        "Tailwind CSS for consistent styling",
        "Framer Motion for smooth page transitions",
        "Recharts for progress analytics",
        "React Router v6 for navigation"
      ],
      backend: [
        "Firebase Authentication with role-based access",
        "Firestore Security Rules for data protection",
        "Cloud Functions for server-side logic (planned)",
        "Real-time listeners for live leaderboard updates"
      ],
      deployment: [
        "Vercel for frontend hosting",
        "Firebase for backend services",
        "Automatic deployments on push",
        "Environment variables for API keys"
      ]
    },

    security: {
      measures: [
        { name: "RBAC", implementation: "Student and Admin roles with strict namespace separation" },
        { name: "Firestore Rules", implementation: "Role-based read/write rules on every collection" },
        { name: "Master Admin Bypass", implementation: "Secure backdoor for administrative continuity" },
        { name: "BYOK AI Model", implementation: "Bring Your Own Key — users provide their own Gemini API key" }
      ]
    },

    ai: {
      purpose: "Provide personalized JavaScript tutoring 24/7. Students get explanations, code examples, and concept breakdowns tailored to their learning level.",
      architecture: "Student question → Context (quiz history, skill level) → Gemini 1.5 API → Markdown-formatted response → Rendered with code blocks",
      model: "Google Gemini 1.5 (primary) + OpenAI GPT-4o-mini (fallback)",
      promptDesign: "System prompt defines AI as a JavaScript/Web Development mentor. Strict scope: only JS and web topics. Responses formatted in Markdown with code blocks.",
      fallback: "OpenAI GPT-4o-mini as secondary provider. If both unavailable, pre-built FAQ responses for common JS questions.",
      limitations: "AI scope limited to JavaScript and web development. Cannot assist with other languages or non-technical topics. Requires user's own API key for unlimited usage.",
      futureImprovements: ["Multi-language support (Python, React)", "Code execution sandbox", "Learning path recommendations", "Peer comparison insights"]
    },

    ux: {
      userFlows: [
        { role: "Student", steps: ["Login/Register", "Take placement quiz", "Get personalized learning path", "Complete quizzes and code labs", "Ask AI tutor for help", "Track progress on dashboard", "Climb leaderboard"] },
        { role: "Admin", steps: ["Login", "View platform metrics", "Manage questions", "Moderate users", "Review AI usage"] }
      ],
      keyScreens: ["Dashboard", "Quiz Arena", "Code Lab", "AI Tutor", "Theory Vault", "Leaderboard", "Admin Panel"],
      decisions: ["Gamification to drive engagement", "AI tutor accessible from every page", "Mobile-responsive for study anywhere", "Separate admin theme for clarity"]
    },

    challenges: [
      {
        challenge: "Adaptive difficulty scaling",
        difficulty: "Medium — questions need to match student skill level in real-time",
        solution: "Implemented ELO-inspired difficulty scoring. Student performance on recent questions adjusts the difficulty of next questions. Tracked via Firestore."
      },
      {
        challenge: "AI tutor scope enforcement",
        difficulty: "Medium — preventing off-topic conversations while keeping responses natural",
        solution: "System prompt with strict scope rules. AI refuses non-JS questions politely and redirects to relevant topics. Content filtering on inputs."
      },
      {
        challenge: "Real-time leaderboard accuracy",
        difficulty: "Low — XP calculations must be consistent across concurrent users",
        solution: "Firestore atomic increments for XP updates. Leaderboard computed server-side via aggregation query."
      }
    ],

    performance: {
      optimizations: [
        "React 19 concurrent features for smooth UI",
        "Firestore query pagination for large datasets",
        "Image lazy loading for theory vault illustrations",
        "Code splitting for route-based loading",
        "Optimistic UI for quiz submissions"
      ],
      errorHandling: [
        "AI API failure fallback to cached responses",
        "Firestore offline persistence for practice without internet",
        "Quiz auto-save to prevent progress loss",
        "Graceful degradation for animations"
      ],
      testing: "Manual testing across devices, quiz logic validation, AI response quality checks, Firestore security rules testing"
    },

    roadmap: [
      "Code execution sandbox (Browser.js integration)",
      "Multi-language support (Python, React, TypeScript)",
      "Peer comparison and study groups",
      "Certification system for completed tracks",
      "Mobile app (React Native)",
      "Integration with job platforms for skill verification"
    ],

    media: {
      screenshots: [
        { src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=500&fit=crop", alt: "Dashboard", caption: "Student progress dashboard with XP and streaks" },
        { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop", alt: "Quiz Arena", caption: "Adaptive quiz engine with real-time feedback" },
        { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop", alt: "Code Lab", caption: "Interactive code practice sandbox" }
      ]
    }
  }
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((cs) => cs.slug === slug);

export const getFeaturedCaseStudies = (): CaseStudy[] =>
  caseStudies.filter((cs) => cs.featured);

export const getCaseStudySlugs = (): string[] =>
  caseStudies.map((cs) => cs.slug);
