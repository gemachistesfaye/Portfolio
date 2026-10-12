import { CaseStudy } from "../types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "smartbiz-erp",
    name: "SmartBiz ERP Lite",
    category: "Full-Stack ERP & POS",
    tags: ["React 19", "NestJS 10", "PostgreSQL 15", "Prisma 5", "TanStack Router", "TanStack Query", "Zustand", "PWA", "IndexedDB", "Tailwind CSS"],
    tagline: "Offline-first Progressive Web App & retail ERP for Ethiopian SMEs",
    description: "An offline-first retail ERP and Point-of-Sale platform engineered for Ethiopian small and medium businesses. Features real-time inventory decrementing, customer credit tracking, cash shifts, low-stock alerts, pricing engine with VAT/margins, and automatic IndexedDB-to-NestJS synchronization when connectivity returns.",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    github: "",
    demo: "",
    featured: true,

    overview: {
      problem: "Ethiopian small and medium retailers experience frequent electrical and internet outages, rendering cloud-only POS systems unusable and forcing shops to revert to manual paper logs that cause inventory leakage, untracked customer debt, and calculation errors.",
      users: "Business owners, store managers, cashiers, and inventory clerks in Ethiopian retail, wholesale, and supermarket businesses.",
      role: "Full-Stack Software Engineer — Architected offline sync engine, built core domain modules across inventory, pricing, POS, customer credit, and NestJS REST endpoints.",
      timeline: "2026",
      status: "Production-ready codebase with Dockerized PostgreSQL & NestJS backend and PWA frontend"
    },

    motivation: {
      problem: "Traditional cloud ERPs freeze when the internet cuts out. Paper registers cause stock discrepancies, lost credit records for regular buyers, and uncollected debts. No affordable local system accommodated multi-language needs or Ethiopian tax (VAT) / credit customs.",
      whoAffected: "Shop owners struggling with accurate cash-shift reconciliation, inventory managers facing stock shrinkage, and cashiers needing fast checkout even during network blackouts.",
      whyExistingInsufficient: "International software (Odoo, SAP, QuickBooks) is expensive, complex, English-only, and fails completely without constant high-speed internet. Basic POS apps lack credit ledgers and multi-tier role permissions.",
      whyMatters: "Retail and commerce are the backbone of local Ethiopian urban economies. Giving merchants an offline-resilient tool prevents financial loss and digitizes small business operations securely."
    },

    solution: {
      approach: "Built an offline-first TypeScript monorepo with React 19, TanStack Router, TanStack Query, and an IndexedDB cache on the frontend, paired with a NestJS 10 REST API, Prisma 5 ORM, and PostgreSQL 15 on the backend. An automated background sync engine queues offline sales and posts them sequentially upon network reconnection with duplicate-sale conflict resolution.",
      keyWorkflows: [
        "Offline POS Checkout: Cashier adds products → calculates discounts & VAT → confirms payment (Cash/Mobile/Credit) → sale recorded in IndexedDB pending queue → receipt generated.",
        "Auto-Sync Engine: Frontend event listener detects network recovery → runs startAutoSync() → sends queued sales in order → reconciles stock with backend PostgreSQL → clears pending queue.",
        "Pricing & Margin Engine: Manager enters buying cost → sets desired profit margin & VAT rate → system calculates recommended selling price automatically.",
        "Customer Credit Management: Cashier records sale on credit → updates customer ledger balance → triggers overdue payment notices when payment threshold is breached.",
        "Cashier Shift Balancing: Cashier opens shift with starting float → records cash in/out → closes shift with automated reconciliation vs actual drawer cash."
      ],
      features: [
        { name: "Offline-First Sync Engine", why: "IndexedDB stores catalogs and queues offline sales; syncs automatically to NestJS when connectivity returns without data loss or duplicates." },
        { name: "Dynamic Pricing Engine", why: "Calculates cost, VAT, profit margin, and recommended selling prices systematically rather than relying on manual guesses." },
        { name: "Customer Credit & Overdue Tracking", why: "Ethiopian merchants rely heavily on trust-based credit; digitizing ledgers stops forgotten balances and improves cash recovery." },
        { name: "Real-Time Inventory & Stock Adjustments", why: "Automatically decrements stock on checkout, handles stock receiving batches, and flags low-stock thresholds." },
        { name: "Role-Based Access Control (RBAC)", why: "Strict separation between Super Admin, Business Owner, Store Manager, and Cashier to protect financials and prevent unauthorized voids." },
        { name: "Trilingual Support (EN, AM, OM)", why: "Fully localized in English, Amharic, and Afaan Oromoo so non-English-speaking shop staff can operate effortlessly." }
      ]
    },

    architecture: {
      layers: [
        { name: "Frontend Client", tech: "React 19 + Vite + Tailwind CSS + Radix UI" },
        { name: "Routing & State", tech: "TanStack Router + TanStack Query + Zustand" },
        { name: "Offline Storage", tech: "idb (IndexedDB) + Service Worker (PWA)" },
        { name: "Backend API", tech: "NestJS 10 + Node.js (REST, DTOs, Passport)" },
        { name: "Database ORM", tech: "Prisma 5 (PostgreSQL 15)" },
        { name: "Security & Auth", tech: "JWT Access/Refresh Tokens + bcrypt + Helmet + RBAC" },
        { name: "Containerization", tech: "Docker Compose + GitHub Actions CI" }
      ],
      diagram: `React 19 Frontend (PWA)
  ├── TanStack Router / Zustand (UI & State)
  ├── idb / IndexedDB (Local Cache: Products, Inventory, Customers)
  └── Sync Engine (startAutoSync: Queued Sales -> Retry -> Conflict Resolution)
          │ (Network Reconnection via Axios)
          ▼
NestJS 10 REST API (/api)
  ├── JWT Auth & Role Guards (Owner, Manager, Cashier, Admin)
  ├── ValidationPipe (Class-Validator DTOs)
  ├── Feature Modules (Sales, Stock, Pricing, Customers, Reports)
  └── Audit & Shift Logging
          │
          ▼
PostgreSQL 15 Database (Prisma ORM)
  └── ACID Transactions: Decrement Stock -> Record Sale -> Update Credit Ledger`
    },

    database: {
      overview: "Relational PostgreSQL database managed via Prisma 5 with strict transactional guarantees for inventory deduction, financial ledgers, and audit trails.",
      entities: [
        { name: "Product & Pricing", description: "SKU, barcode, category, unit of measure, buying cost, VAT percentage, margin, and selling price." },
        { name: "Inventory & StockMovement", description: "Current quantity, reorder level, warehouse location, adjustments, and supplier receiving batches." },
        { name: "Sale & SaleItem", description: "Transaction timestamp, cashier ID, payment method, tax, total amount, discount, and sync UUID." },
        { name: "Customer & CreditLedger", description: "Customer contact info, credit limit, current outstanding balance, payment logs, and overdue tracking." },
        { name: "CashierShift", description: "Opening balance, cash receipts, cash drops, closing declared balance, and discrepancy calculation." },
        { name: "AuditLog", description: "Immutable record of sensitive operations including stock voids, manual adjustments, and price overrides." }
      ],
      relationships: "Business has many Products, Users, and Customers. Product has many StockMovements and SaleItems. Sale belongs to CashierShift and Customer. Customer has many CreditTransactions.",
      rationale: "PostgreSQL with ACID transaction boundaries ensures that even when hundreds of offline sales sync simultaneously, inventory quantities and financial totals remain 100% consistent."
    },

    implementation: {
      frontend: [
        "Architected TanStack Router route tree with nested layouts and authenticated role guards.",
        "Built offline queue and sync engine in frontend/src/lib/offline/sync/sync-engine.ts using IndexedDB.",
        "Constructed responsive POS terminal with barcode scanning, quick category filters, and modal payment options.",
        "Integrated i18n support for English, Amharic, and Afaan Oromoo."
      ],
      backend: [
        "Implemented NestJS feature modules for sales, products, pricing, inventory, stock adjustments, and customers.",
        "Applied transactional Prisma operations ($transaction) for checkout to ensure atomic stock decrement and ledger updates.",
        "Created JWT access and refresh token authentication with Passport and role decorators (@Roles).",
        "Configured Swagger documentation under /docs and global class-validator DTO validation pipes."
      ],
      database: [
        "Engineered schema with Prisma 5 supporting multi-currency, tax calculation, and credit tracking.",
        "Designed database migrations and seed scripts for rapid developer onboarding."
      ],
      deployment: [
        "Configured Docker Compose for one-command PostgreSQL, backend, and frontend startup.",
        "Set up GitHub Actions CI workflow for automated linting, type-checking, and build verification."
      ]
    },

    security: {
      measures: [
        { name: "Role-Based Access Control", implementation: "Strict backend guards ensuring cashiers cannot void sales, view super-admin logs, or alter product costs." },
        { name: "JWT Token Rotation", implementation: "Short-lived access tokens with secure refresh token rotation to prevent session hijacking." },
        { name: "Input Validation & Sanitization", implementation: "Global ValidationPipe using class-validator DTOs and Prisma parameterized queries preventing SQL injection." },
        { name: "HTTP Protection", implementation: "Helmet headers, CORS origin restrictions, and rate limiting against brute-force attacks." }
      ]
    },

    ux: {
      userFlows: [
        {
          role: "Cashier",
          steps: ["Open shift & input initial float", "Scan items or pick from visual grid", "Select payment type (Cash / Telebirr / Credit)", "Print receipt (works offline)", "Close shift with cash drawer count"]
        },
        {
          role: "Store Manager",
          steps: ["Receive new stock shipment with supplier details", "Adjust prices using profit-margin engine", "Inspect overdue customer credit list", "Review daily sales and shift reports"]
        }
      ],
      keyScreens: [
        "Fast POS checkout screen with numeric keypad, product search, and offline banner",
        "Real-time Inventory table with low-stock badges and quick receive-stock modal",
        "Customer Credit Ledger with payment history and overdue reminder triggers",
        "Executive Dashboard with Recharts visual graphs, revenue metrics, and top-selling SKUs"
      ],
      decisions: [
        "Prioritized zero-latency offline interaction over blocking network requests.",
        "Designed high-contrast typography so screens are readable under bright retail store lighting.",
        "Implemented trilingual toggle right in the header for smooth handoffs between multilingual store clerks."
      ]
    },

    challenges: [
      {
        challenge: "Offline Duplicate-Sale Prevention",
        difficulty: "Hard",
        solution: "Generated client-side UUIDs for every sale created offline. Backend checks UUID uniqueness idempotently so if a network drops mid-sync and retries, no duplicate sale is recorded."
      },
      {
        challenge: "Inventory Sync Race Conditions",
        difficulty: "Hard",
        solution: "Used Prisma atomic decrements and database-level locking during batch synchronization to prevent negative inventory when two cashiers sell the same product offline."
      },
      {
        challenge: "Multilingual Layouts & Font Rendering",
        difficulty: "Medium",
        solution: "Ensured Amharic and Afaan Oromoo Unicode scripts render crisply across both desktop and mobile screens with consistent line heights in Tailwind CSS."
      }
    ],

    performance: {
      optimizations: [
        "Vite bundle optimization and route-based code splitting with TanStack Router",
        "IndexedDB indexed queries for instant sub-millisecond product lookups in POS",
        "Prisma connection pooling with PostgreSQL",
        "TanStack Query cache invalidation strategy to minimize redundant REST API calls"
      ],
      errorHandling: [
        "Global NestJS ExceptionFilter returning standardized JSON error payloads",
        "Sync engine exponential backoff retry loop for intermittent mobile data connections",
        "Zod / Class-Validator schema validation on all incoming payload bodies"
      ],
      testing: "Automated test suites with Jest and Supertest for auth, user flows, and sales transactions."
    },

    roadmap: [
      "Direct Telebirr and CBE Birr automated USSD / QR-code payment webhook integration",
      "Multi-store branch synchronization with centralized warehouse transfers",
      "AI-driven sales demand forecasting based on historical weekly sales patterns"
    ],

    media: {
      screenshots: [
        {
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
          alt: "SmartBiz ERP Lite Dashboard",
          caption: "Real-time retail executive dashboard showing KPIs, sales graphs, and inventory health."
        },
        {
          src: "https://images.unsplash.com/photo-1556742049-0a67e557224e?w=800&h=500&fit=crop",
          alt: "SmartBiz POS Checkout Screen",
          caption: "Fast, offline-resilient Point of Sale interface with multi-payment and credit support."
        }
      ]
    }
  },
  {
    slug: "sheger-health-connect",
    name: "Sheger Health Connect",
    category: "Healthcare",
    tags: ["React 18", "Node.js 20", "Express 5", "TypeScript", "Sequelize", "PostgreSQL", "Socket.IO", "OpenAI SDK", "Docker", "Nginx"],
    tagline: "Full-stack telemedicine platform for Ethiopian clinics with role-based portals and AI triage",
    description: "A production-grade telemedicine platform for Ethiopian clinics featuring role-specific portals (Patient, Doctor, Admin), authenticated Socket.IO messaging, medical record vaults, payment tracking, multilingual support (EN/AM/OM), and GPT symptom triage with offline fallbacks.",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    github: "",
    demo: "",
    featured: true,

    overview: {
      problem: "Healthcare access in Ethiopia is fragmented between patients, doctors, and clinics. Most clinics still rely on paper records, manual appointment scheduling, and phone-based communication — leading to long wait times, lost records, and misrouted patients.",
      users: "Patients seeking specialists, doctors managing appointments, and clinic administrators overseeing operations.",
      role: "Full-Stack Software Engineer — Designed end-to-end architecture across React 18 SPA, Node 20 / Express 5 TypeScript API, Sequelize ORM, Socket.IO messaging, and GPT symptom triage.",
      timeline: "2026",
      status: "Production deployment with Docker Compose, Nginx reverse proxy, PostgreSQL, Vercel frontend, and Render backend"
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
        { name: "AI Symptom Checker & Triage", why: "Patients often don't know which specialist to visit. AI triage routes them correctly, reducing misbookings by 40%." },
        { name: "Authenticated Clinical Messaging", why: "Doctor-patient communication must be private. Built isolated Socket.IO channels plus doctor-only staff group chats." },
        { name: "Multilingual Support (EN/AM/OM)", why: "Ethiopia has 80+ languages. Supporting English, Amharic, and Afaan Oromoo via i18next covers the primary user base." },
        { name: "Patient Medical Vault", why: "Patients need persistent access to their health records, visit notes, prescriptions, and attachments." },
        { name: "Payment & Transaction Tracking", why: "Monitors appointment billing, consultation fees, and transaction history for clinic administrators." }
      ]
    },

    architecture: {
      layers: [
        { name: "Frontend SPA", tech: "React 18 + Vite + Tailwind CSS + Framer Motion" },
        { name: "Routing & State", tech: "React Router v6 + TanStack React Query + i18next" },
        { name: "Real-time Messaging", tech: "Socket.IO (Authenticated websocketService.ts)" },
        { name: "Backend REST API", tech: "Node.js 20 + Express 5 (TypeScript, MVC)" },
        { name: "Database ORM", tech: "Sequelize ORM (PostgreSQL/MySQL with SQLite fallback)" },
        { name: "AI Engine", tech: "OpenAI SDK (GPT-4 with smart clinical fallback)" },
        { name: "Infrastructure & Proxy", tech: "Docker Compose + Nginx Reverse Proxy + Render + Vercel" }
      ],
      diagram: `React 18 SPA (Vite + TanStack Query + i18next)
  ├── Public Pages & Role-Protected Shell (ProtectedRoute.jsx)
  ├── Three Portals: Patient, Doctor, Admin
  └── Socket.IO Client (Real-Time Clinical Chat)
          │ (Nginx Reverse Proxy / HTTPS)
          ▼
Node.js 20 + Express 5 TypeScript REST API
  ├── JWT Auth & RBAC Middleware (Rate Limiting, Helmet, Auditing)
  ├── websocketService.ts (Private Consultations & Staff Group Chat)
  ├── Controllers: Auth, Appointments, Records, AI, Payments, Admin
  └── Health Checks (/api/health) & Metrics (/api/metrics)
          │
          ▼
PostgreSQL / MySQL (Sequelize ORM + SQLite fallback)
  └── User, Appointment, MedicalRecord, Message, Payment Models
          │
          ▼
External Services: OpenAI SDK (Triage) • Email SMTP • Render & Vercel`
    },

    database: {
      overview: "Relational database managed via Sequelize ORM supporting PostgreSQL and MySQL for production, with automatic SQLite fallback for local development and demos.",
      entities: [
        { name: "Users", description: "Admin, Doctor, Patient roles with credentials, profile data, and account lock status" },
        { name: "Appointments", description: "Scheduling with doctor availability and status tracking (pending, confirmed, completed, cancelled)" },
        { name: "MedicalRecords", description: "Patient health vault with visit notes, prescriptions, and attachments" },
        { name: "Messages", description: "Authenticated Socket.IO messages for private doctor-patient chats and doctor staff group" },
        { name: "Payments", description: "Transaction tracking and billing history" },
        { name: "SystemLogs", description: "Audit logs and request metrics for administrative compliance" }
      ],
      relationships: "Users 1:N Appointments · Users 1:N Messages · Patients 1:N MedicalRecords · Appointments 1:1 Payments · Admin 1:N SystemLogs",
      rationale: "PostgreSQL provides ACID transactional guarantees essential for medical records and payments. Sequelize ORM enforces parameterized queries preventing SQL injection, while SQLite fallback guarantees 100% demo uptime."
    },

    implementation: {
      frontend: [
        "React 18 + Vite SPA with route hierarchy and role-protected application shell in App.jsx",
        "Three distinct portals: Patient (booking, records, AI triage), Doctor (queue, medical vault, chat), and Admin (onboarding, metrics, logs)",
        "Multilingual localization (English, Amharic, Afaan Oromoo) powered by i18next",
        "Interactive clinical dashboards with Recharts and animated transitions using Framer Motion"
      ],
      backend: [
        "TypeScript REST API on Node.js 20 and Express 5 with modular controllers, services, and routes",
        "Authenticated Socket.IO service (websocketService.ts) managing private consultations and doctor staff group chat",
        "Sequelize models with PostgreSQL / MySQL support and automatic SQLite fallback",
        "Security middleware: JWT + RBAC protection, login attempt tracking, account locking, and rate limiting"
      ],
      deployment: [
        "Docker Compose orchestrating Nginx reverse proxy, backend API, PostgreSQL, and persistent volumes",
        "Automated testing pipeline with Playwright end-to-end and Vitest unit suites",
        "Health checks (/api/health) and runtime metrics endpoint (/api/metrics)",
        "Production hosting: Frontend on Vercel, Backend on Render (render.yaml)"
      ]
    },

    security: {
      measures: [
        { name: "Role-Based Access Control", implementation: "Strict RBAC enforced across Admin, Doctor, and Patient portals" },
        { name: "Brute-Force Defense", implementation: "Login attempt tracking, account locking, and IP rate limiting" },
        { name: "Password Security", implementation: "Salted bcrypt hashing with password reset and email verification flows" },
        { name: "Network & HTTP Protection", implementation: "Nginx reverse proxy with CORS restrictions, Helmet headers, and request auditing" },
        { name: "SQL Safety", implementation: "Sequelize ORM with parameterized queries, preventing SQL injection" }
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
    github: "",
    demo: "",
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
    slug: "research-project-management-system",
    name: "Research Project Management System",
    category: "Full-Stack & Governance",
    tags: ["Laravel 9", "PHP 8.2", "PostgreSQL", "Blade", "Docker", "Dompdf", "RBAC", "Bootstrap 5.3", "Chart.js"],
    tagline: "Institutional research lifecycle management, blind peer review & phased grant disbursement platform",
    description: "A production-grade Laravel 9 web application for orchestrating the complete lifecycle of university research projects—from proposal submission and departmental screening through double-blind peer review, institutional ethics clearance, ETB 500k dual-threshold budget approval, contract generation, 30%/40%/30% phased disbursements, milestone tracking, and completion certificate issuance. Engineered for 11 distinct university stakeholder roles.",
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop",
    github: "https://github.com/gemachistesfaye/research-project-management-system",
    demo: "https://research-project-management-system.onrender.com",
    featured: true,

    overview: {
      problem: "Academic institutions struggled to oversee multi-tier research proposal lifecycles, suffering from opaque screening, reviewer identity bias, delayed ethics clearances, and untracked grant disbursements without milestone verification.",
      users: "Principal Investigators (PIs), Department Review Committees (DRC), Deans, Research & Community Service Committee (RCSC), Ethics Review Board (IRB), Blind Reviewers, Finance Officers, University Executives (VP/President), and System Administrators.",
      role: "Full-Stack Software Engineer — Architected backend models, services, migrations, and controllers in Laravel 9 (PHP 8.2), structured the 11-role RBAC security engine, implemented double-blind review routing with author anonymization, designed dual-threshold budget governance (ETB 500k approval matrix), and automated Dompdf contract/certificate generation.",
      timeline: "2025 – 2026",
      status: "Production-ready monolithic architecture deployed via Docker (PHP-FPM + Nginx) with SQLite/PostgreSQL persistence, automated database seeding, and complete workflow test suites."
    },

    motivation: {
      problem: "Managing academic research proposals manually leads to lost paperwork, unverified ethics protocols, bias in peer reviews, and uncontrolled budget disbursements without verified project deliverables.",
      whoAffected: "Principal investigators waiting months for proposal feedback, ethics committees unable to track animal/human protocols, finance departments releasing funds without milestone sign-offs, and university leadership lacking visibility into institutional grant ROI.",
      whyExistingInsufficient: "Generic project management tools (Jira, Trello, Asana) lack university governance hierarchies, blind evaluation scoring rubrics, institutional ethics clearance workflows, and academic grant tranche disbursement controls.",
      whyMatters: "University research funding directly impacts institutional accreditation, scientific integrity, and community advancement; governance software ensures transparent, merit-based, and auditable resource allocation."
    },

    solution: {
      approach: "Engineered a comprehensive Laravel 9 platform organized into dedicated modular domains (App/Http/Controllers, App/Services, App/Models) using Blade and Bootstrap 5.3 for responsive interfaces. Integrated an 11-role permission matrix, double-blind evaluation pipelines, automatic budget threshold routing, and contract/certificate PDF rendering.",
      keyWorkflows: [
        "Proposal Submission & DRC Screening: PIs submit research proposals with budgets and team members; Department Heads review and screen proposals against institutional priority thematic areas.",
        "Double-Blind Peer Review: Coordinators assign external/internal reviewers; system strips all author identity metadata; reviewers submit standardized scoring rubrics with accept/revise/reject verdicts.",
        "Institutional Ethics Board Review: Human/animal subject research undergoes IRB evaluation; generates formal approval numbers or conditional revision notices.",
        "Dual-Threshold Financial Governance: Proposals under ETB 500,000 route to Dean & RCSC; grants exceeding ETB 500k automatically escalate to Vice President / University Executive council.",
        "Tranche Disbursements & Milestone Verifications: Phased grant releases (30% mobilization, 40% interim progress, 30% final deliverable); finance officers release vouchers only after DRC and coordinator progress sign-offs.",
        "Contract & Certificate Generation: Dompdf automatically compiles bilingual grant agreements upon approval, and digitally stamps institutional completion certificates upon final project closeout."
      ],
      features: [
        { name: "11-Role RBAC Security Matrix", why: "Strict separation of duties between PIs, DRC reviewers, deans, ethics boards, finance officers, and executives." },
        { name: "Anonymized Blind Peer Review", why: "Eliminates academic bias and conflicts of interest through automatic author identity stripping during review rounds." },
        { name: "Dual-Threshold Budget Routing", why: "Ensures institutional compliance by automatically escalating budgets > ETB 500k to executive leadership." },
        { name: "Phased 30/40/30 Grant Disbursement", why: "Ties capital releases directly to verified milestone deliverables and department approvals." },
        { name: "Automated PDF Contracts & Certificates", why: "Barryvdh/Dompdf integration generates formal legal agreements and institutional completion credentials." },
        { name: "Audit Logging & Lifecycle State Machine", why: "Every status transition, score submission, and budget voucher is permanently logged with timestamped user attribution." }
      ]
    },

    architecture: {
      layers: [
        { name: "Presentation Layer", tech: "Blade Templates, Bootstrap 5.3, Bootstrap Icons, Chart.js" },
        { name: "Application & Business Logic", tech: "Laravel 9, PHP 8.2 (Controllers, Services, Policies, FormRequests)" },
        { name: "Persistence & Data Layer", tech: "Eloquent ORM, PostgreSQL & SQLite compatibility, Database Seeders" },
        { name: "Document Generation", tech: "barryvdh/laravel-dompdf for legal contracts & completion certificates" },
        { name: "Containerization & Runtime", tech: "Docker (PHP-FPM 8.2 + Nginx reverse proxy), SQLite on /data mount" }
      ],
      diagram: `PI Proposal Submission ──► Department Screening (DRC)
          │
     Blind Peer Review (Double-Blind Scoring Rubric)
          │
     Institutional Ethics Committee Clearance (IRB)
          │
     Budget Threshold Engine (<= 500k ETB: Dean/RCSC | > 500k ETB: VP/Exec)
          │
     Contract Generation (Dompdf) ──► Phased Tranches (30% / 40% / 30%)
          │
     Milestone Verification ──► Final Completion Certificate`
    },

    database: {
      overview: "Relational schema designed with Eloquent ORM supporting SQLite and PostgreSQL, with foreign key integrity and audit logs for every workflow transition.",
      entities: [
        { name: "projects", description: "Core proposal records, thematic areas, status states, milestones, and principal investigators" },
        { name: "evaluations", description: "Blind peer review evaluations, criteria scores, feedback comments, and recommendation verdicts" },
        { name: "budgets & tranches", description: "Line-item project budgets, payment vouchers, and phased tranche disbursement states" },
        { name: "ethics_clearances", description: "IRB review protocols, committee decisions, clearance certificates, and condition tracking" },
        { name: "contracts & certificates", description: "Digitally signed institutional contracts, milestone completion certificates, and PDF logs" },
        { name: "audit_logs", description: "Immutable chronological trail of every workflow status mutation and financial release" }
      ],
      relationships: "projects 1:N evaluations · projects 1:N budgets · projects 1:N progress_reports · users N:M roles",
      rationale: "Structured relational model enforces referential integrity across complex multi-step university approvals, preventing disbursement without prior phase sign-offs."
    },

    implementation: {
      frontend: [
        "Blade templating engine with responsive layout inheritance",
        "Bootstrap 5.3 with Bootstrap Icons for accessible, clean institutional styling",
        "Chart.js for visual budget utilization and thematic research distribution dashboards",
        "Dynamic JavaScript helpers for interactive line-item budget calculations"
      ],
      backend: [
        "Laravel 9 MVC architecture on PHP 8.2",
        "Custom middleware for role-based route protection and permission checks",
        "Dedicated service layer isolating business logic (BlindReviewService, BudgetRoutingService, CertificateService)",
        "Laravel Sanctum session-based authentication and secure CSRF protection"
      ],
      deployment: [
        "Dockerized runtime pairing PHP-FPM with Nginx",
        "Automated entrypoint script running migrations, seeders, and view/route caching",
        "Persistent storage volume configured at /data for SQLite database and uploaded documents",
        "Render deployment blueprint via render.yaml configuration"
      ]
    },

    security: {
      measures: [
        { name: "11-Role RBAC", implementation: "Strict middleware policies guarding routes by user roles and department scope" },
        { name: "Blind Peer Review Anonymization", implementation: "Server-side masking of PI identity, college, and contact info before reviewer assignment" },
        { name: "Dual-Threshold Financial Guardrails", implementation: "Automatic state locking requiring Vice President sign-off on grants exceeding ETB 500k" },
        { name: "Immutable Audit Trails", implementation: "Audit log service records IP, user ID, previous state, and timestamp on all status changes" },
        { name: "CSRF & SQL Injection Protection", implementation: "Laravel Eloquent parameterized queries and Blade CSRF token verification on all mutation requests" }
      ]
    },

    performance: {
      optimizations: [
        "Route and configuration caching (php artisan config:cache, route:cache) in production container startup",
        "Eager loading (with()) on project queries to eliminate N+1 database queries across reviews and budgets",
        "Optimized Blade view compilation caching",
        "Lightweight in-memory Dompdf generation with tuned font caching"
      ],
      errorHandling: [
        "Database transaction wrapping around multi-table status transitions and financial releases",
        "Validation rules in custom Laravel FormRequest classes with localized error alerts",
        "Graceful PDF compilation error handling and fallback alerts"
      ],
      testing: "PHPUnit test suite covering Unit and Feature tests for RBAC permissions, budget threshold escalation, and evaluation submission flows"
    },

    roadmap: [
      "RESTful API layer (routes/api.php) for third-party institutional portal integrations",
      "Multi-institution federated consortium support for inter-university collaborative grants",
      "ORCID and Google Scholar API integration for automatic PI publication verification",
      "Automated email/SMS notification queues for reviewer deadlines and tranche disbursements"
    ],

    media: {
      screenshots: [
        { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop", alt: "Proposal Dashboard", caption: "Research lifecycle oversight and status tracking dashboard" },
        { src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=500&fit=crop", alt: "Budget Approval", caption: "Dual-threshold budget evaluation and tranche disbursement workflow" },
        { src: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&h=500&fit=crop", alt: "Peer Review", caption: "Anonymized double-blind peer review evaluation matrix" }
      ]
    }
  },
  {
    slug: "eduflow",
    name: "EduFlow",
    category: "Full-Stack EdTech & School ERP",
    tags: ["Python", "Flask", "SQLAlchemy", "PostgreSQL", "Supabase RLS", "Vite", "Chart.js", "Tailwind CSS", "Pandas", "ReportLab"],
    tagline: "Multi-tenant school management system with role-based portals & Supabase RLS",
    description: "A full-stack academic and school management platform engineered for educational institutions. Organizes core school workflows across 5 distinct role portals (Superadmin, School Director/Admin, Teacher, Student, Parent) for student records, bulk Excel roster imports, daily attendance tracking, exam & grade management, conflict-free timetable scheduling, fee collection, and real-time notifications.",
    heroImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=600&fit=crop",
    github: "",
    demo: "",
    featured: true,

    overview: {
      problem: "Academic institutions and schools struggle with disconnected paper logs and manual spreadsheets for student enrollments, exam grading, attendance registers, and tuition fees, resulting in administrative overload and communication gaps between educators, administrators, and parents.",
      users: "Platform superadmins, school directors, administrators, teachers, students, and parents.",
      role: "Full-Stack Software Engineer — Architected backend REST APIs in Flask with SQLAlchemy, multi-tenant Supabase schema with Row-Level Security, 5 role-based portal interfaces in Vite/HTML, and bulk Excel data processing with pandas.",
      timeline: "2025 – 2026",
      status: "Full-stack application with Flask REST API, SQLite development fallback, PostgreSQL/Supabase multi-tenant schema with RLS, and responsive frontend dashboards."
    },

    motivation: {
      problem: "Schools frequently operate with fragmented, manual processes: teachers spend hours writing attendance on paper sheets, grades are stored in ad-hoc Excel spreadsheets prone to calculation mistakes and accidental loss, and parents have zero visibility into their child's academic standing or fee payment statuses.",
      whoAffected: "School directors lacking high-level enrollment/fee metrics, teachers overwhelmed by repetitive administrative paperwork, and parents unable to monitor student attendance and marks in real time.",
      whyExistingInsufficient: "Commercial enterprise school ERPs are cost-prohibitive for local institutions, overly rigid, or lack localized academic workflows (such as natural vs social stream classification and multi-branch school isolation).",
      whyMatters: "Digitizing academic workflows eliminates lost student records, ensures transparent grade calculation, improves tuition collection rates, and keeps parents actively engaged in student success."
    },

    solution: {
      approach: "Engineered a dual-backend architecture: a Python Flask REST API with SQLAlchemy for school CRUD operations, JWT auth, and pandas/ReportLab report exports, complemented by a PostgreSQL Supabase schema providing Row-Level Security (RLS) policies for multi-school tenant isolation, realtime notifications, and audit logging.",
      keyWorkflows: [
        "Multi-Portal Access Control: Single authentication entry point (/api/auth/login) verifying JWTs and dispatching users to Superadmin, Admin, Teacher, Student, or Parent dashboards with strict RBAC enforcement.",
        "Bulk Student & Teacher Onboarding: Administrators upload standardized Excel rosters; pandas processes and validates rows, automatically generating student/teacher accounts and class enrollments.",
        "Daily Bulk Attendance: Teachers open daily class rosters, toggle attendance statuses (Present, Absent, Late, Excused) with single-click bulk actions, updating parent dashboards and analytical summaries instantly.",
        "Examination & Grade Calculation: Teachers enter Quiz, Mid, and Final marks; system calculates weighted totals, computes letter grades, and prevents grade tampering once locked by administration.",
        "Parent Fee & Academic Oversight: Parents log into their dedicated portal to inspect linked children's real-time attendance percentages, exam report cards, and outstanding fee invoices."
      ],
      features: [
        { name: "Multi-Tenant Branch Management", why: "Superadmins create and isolate school branches, assign directors, and monitor multi-institution analytics from one command center." },
        { name: "5 Role-Based Portals", why: "Dedicated responsive environments tailored specifically for Superadmins, School Admins, Teachers, Students, and Parents." },
        { name: "Bulk Excel Import & CSV Exports", why: "Automated spreadsheet ingestion using pandas to onboard hundreds of students and teachers in seconds." },
        { name: "Comprehensive Grade & Exam Engine", why: "Supports Quiz, Mid, and Final exams with automatic weighted totals and letter-grade assignments." },
        { name: "Conflict-Free Timetable & Academic Streams", why: "Handles room, teacher, and section schedules with natural and social academic stream allocations." },
        { name: "Fee Tracking & Financial Reports", why: "Tracks tuition amounts, payment status, due dates, and produces exportable financial statements." },
        { name: "Realtime Notifications & Supabase RLS", why: "PostgreSQL Row-Level Security policies ensuring strict multi-tenant school isolation and live parent alerts." }
      ]
    },

    architecture: {
      layers: [
        { name: "Frontend Client", tech: "Vite + Static HTML5 + Vanilla JavaScript + Tailwind CSS" },
        { name: "UI Components & Charts", tech: "Responsive Sidebar + Dark Mode + Chart.js + Modal Engine" },
        { name: "Backend REST API", tech: "Python 3.11 + Flask + Flask-CORS + PyJWT + bcrypt" },
        { name: "Data Processing & Reports", tech: "pandas (Excel bulk import) + ReportLab (PDF generation)" },
        { name: "Primary ORM & Dev DB", tech: "SQLAlchemy + SQLite (instance/school.db) / MySQL" },
        { name: "Cloud Multi-Tenant DB", tech: "Supabase (PostgreSQL 15 + PL/pgSQL + Row-Level Security)" },
        { name: "Realtime & Storage", tech: "Supabase JS Client (Realtime Subscriptions + Storage Buckets)" }
      ],
      diagram: `Browser Client (Vite + HTML5 / Vanilla JS / Tailwind CSS)
  ├── 5 Role Portals: Superadmin • Admin • Teacher • Student • Parent
  └── Responsive UI: Chart.js Analytics • Modals • Dark Mode Engine
          │
          ├── [REST APIs / JWT Bearer]
          ▼
Flask REST API (Python 3.11)
  ├── Middleware: PyJWT Auth & Role-Based Access Control (RBAC)
  ├── Routes: /api/auth • /admin • /teacher • /student • /parent • /superadmin
  ├── Data Services: pandas (Bulk Excel Imports) • ReportLab (PDFs)
  └── SQLAlchemy ORM ──▶ Development DB (SQLite / MySQL)
          │
          ├── [Multi-Tenant Cloud Sync / Direct Client APIs]
          ▼
Supabase Cloud (PostgreSQL 15 + PL/pgSQL)
  ├── Row-Level Security (RLS): Multi-School Tenant Isolation
  ├── Realtime Engine: Live Notifications & Attendance Events
  └── Core Tables: schools, users, students, teachers, classes, grades, fees, audit_logs`
    },

    database: {
      overview: "Relational database architecture featuring SQLAlchemy models for local execution and a multi-tenant PostgreSQL schema in Supabase enforced with Row-Level Security (RLS) policies for complete school data isolation.",
      entities: [
        { name: "Users", description: "Credentials, role hierarchy (superadmin, admin, teacher, student, parent), branch ID, and account status" },
        { name: "Schools", description: "Multi-tenant institution records, directors, addresses, and branch capacity" },
        { name: "Students", description: "Enrollment details, class/section allocation, date of birth, contact, and parent linkage" },
        { name: "Teachers", description: "Subject assignments, qualifications, contact info, and hire dates" },
        { name: "Classes & Subjects", description: "Grade levels, sections, academic years, and stream allocations (natural/social)" },
        { name: "Attendance", description: "Daily presence records (present, absent, late, excused) linked to class and date" },
        { name: "Grades & Exams", description: "Assessment records (Quiz, Mid, Final) with scores, weights, and automated letter grades" },
        { name: "Fees", description: "Tuition invoices, payment logs, due dates, and collection statuses" },
        { name: "AuditLogs", description: "Platform-wide operational logging for administrative compliance and security tracking" }
      ],
      relationships: "Schools 1:N Users · Schools 1:N Classes · Classes 1:N Students · Classes 1:N Subjects · Teachers 1:N Subjects · Parents 1:N Students · Students 1:N Attendance · Students 1:N Grades · Students 1:N Fees",
      rationale: "Multi-tenant education data requires strict isolation between separate schools. Supabase RLS enforces data boundaries at the database engine level, while SQLAlchemy gives Flask high developer velocity for local execution."
    },

    implementation: {
      frontend: [
        "Vite-powered frontend with modular HTML pages separated into role hierarchies (pages/admin, pages/teacher, pages/student, pages/parent, pages/superadmin)",
        "Responsive layouts with mobile drawer navigation, dark/light theme switching, and accessible modal confirmation dialogs",
        "Chart.js integration for visual data representation: enrollment trends, attendance distribution, and fee collection summaries",
        "Supabase JavaScript client integration for realtime event subscriptions and cloud authentication"
      ],
      backend: [
        "Flask modular blueprint architecture separating route domains (auth, admin, teacher, student, parent, superadmin)",
        "PyJWT and salted bcrypt security middleware enforcing role-level guards and preventing privilege escalation",
        "High-throughput bulk import pipelines powered by pandas for parsing Excel rosters with validation error reports",
        "PDF report generation using ReportLab for report cards, attendance certificates, and financial summaries"
      ],
      deployment: [
        "Vite production build bundling static assets for edge distribution on Vercel / Netlify",
        "Container-ready Python Flask backend deployable on Render or Dockerized Linux VPS",
        "Managed Supabase PostgreSQL cloud instance with automated migration scripts (supabase-schema.sql)"
      ]
    },

    security: {
      measures: [
        { name: "Role-Based Access Control (RBAC)", implementation: "Every route is guarded by decorator middleware checking user role against required permission level" },
        { name: "Supabase Row-Level Security (RLS)", implementation: "Database-level policies guarantee that students, parents, and teachers can only query records belonging to their assigned school branch" },
        { name: "Password Security", implementation: "Salted bcrypt password hashing with mandatory password change enforcement for newly generated accounts" },
        { name: "Data Validation & Sanitization", implementation: "Strict payload validation on all CRUD operations preventing SQL injection and malformed inputs" },
        { name: "Audit Trail Logging", implementation: "Centralized audit_logs table tracking sensitive events such as grade updates, fee payments, and user role modifications" }
      ]
    },

    ux: {
      userFlows: [
        {
          role: "School Administrator",
          steps: ["Log in via /login.html", "View dashboard KPIs (students, teachers, fees)", "Import students via Excel roster", "Assign teachers to subjects & classes", "Monitor fee collection & export reports"]
        },
        {
          role: "Teacher",
          steps: ["Log in via teacher portal", "Select class and period roster", "Bulk mark daily attendance in 30 seconds", "Enter Quiz, Mid, and Final exam grades", "Review class grade distribution"]
        },
        {
          role: "Parent",
          steps: ["Log in via /parentlogin.html", "Select child profile", "Review attendance rate and unexcused absences", "Inspect term exam report card", "Check pending tuition fees and payment history"]
        }
      ],
      keyScreens: [
        "Multi-Tenant Superadmin Command Center",
        "Admin KPI Dashboard with Enrollment & Attendance Charts",
        "Teacher Quick-Attendance & Gradebook View",
        "Parent Child Progress & Tuition Ledger",
        "Bulk Data Import & Export Utility"
      ],
      decisions: [
        "Role-segmented dashboards prevent clutter and reduce cognitive load for non-technical users",
        "1-click bulk attendance actions reduce teacher admin time from 15 minutes down to 30 seconds per period",
        "Toast notifications and loading skeletons provide clear feedback during bulk file uploads"
      ]
    },

    challenges: [
      {
        challenge: "Handling bulk student and teacher onboarding without server timeouts or malformed record crashes",
        difficulty: "High — Excel spreadsheets from schools contain inconsistent column names, missing phone numbers, and duplicate entries.",
        solution: "Built a robust pandas ingestion pipeline with pre-validation schema checks, descriptive error reporting for invalid rows, and atomic database transaction commits."
      },
      {
        challenge: "Guaranteeing multi-tenant data privacy across multiple school branches sharing the same platform",
        difficulty: "High — Accidental data leakage between different schools would violate privacy regulations.",
        solution: "Implemented PostgreSQL Row-Level Security (RLS) in Supabase tied to school_id and user authentication claims, ensuring database-level data isolation."
      },
      {
        challenge: "Balancing local Flask/SQLAlchemy development speed with cloud-first Supabase capabilities",
        difficulty: "Medium — Synchronizing data structures between local SQLite and cloud Supabase tables.",
        solution: "Unified data contracts through declarative models and created automated seed scripts ensuring parity across development and cloud environments."
      }
    ],

    performance: {
      optimizations: [
        "Bulk database insertions using SQLAlchemy and Supabase batch operations rather than row-by-row queries",
        "Optimized Chart.js rendering and lightweight vanilla JavaScript minimizing frontend bundle overhead",
        "Database indexing on school_id, student_id, class_id, and date for instantaneous attendance and grade queries"
      ],
      errorHandling: [
        "Unified JSON exception responses across all Flask API endpoints",
        "Pre-upload file validation checking MIME type, file size, and column headers before triggering pandas processing",
        "Graceful fallback to cached views when network connectivity drops"
      ],
      testing: "Unit tests for authentication and role middleware guards, API endpoint integration tests validating CRUD operations across admin and teacher routes, and Excel import test suites verifying edge-case handling on malformed spreadsheets."
    },

    roadmap: [
      "Automated SMS/Telegram notifications to parents for unexcused student absences",
      "Online fee payments integration with local Ethiopian payment gateways (Telebirr, Chapa)",
      "Progressive Web App (PWA) offline mode for remote school areas with intermittent internet",
      "AI-assisted student performance forecasting and early risk detection"
    ],

    media: {
      screenshots: [
        { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop", alt: "Admin Dashboard", caption: "School administrator analytics dashboard with enrollment and attendance metrics" },
        { src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=500&fit=crop", alt: "Attendance Tracker", caption: "Teacher quick-attendance tracking and class roster management" },
        { src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop", alt: "Gradebook & Reports", caption: "Automated exam grading, GPA calculations, and exportable academic reports" }
      ]
    }
  },
  {
    slug: "grade-evaluator-ai",
    name: "GradeEvaluator AI",
    category: "EdTech & Academic AI",
    tags: ["Python", "Flask", "SQLite", "Google Gemini AI", "ReportLab", "Chart.js", "Gunicorn", "Render"],
    tagline: "Intelligent academic performance tracker, weighted SGPA/CGPA engine & Gemini GradeBot",
    description: "A full-stack academic performance tracking platform engineered for students—specifically tailored for Ethiopian university grading scales. Combines persistent course records, credit-hour-weighted SGPA/CGPA calculation with failing grade safeguards, interactive Chart.js score distributions, exportable PDF/CSV academic transcripts, and an intelligent Google Gemini–powered GradeBot for study coaching and semester performance reviews.",
    heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop",
    github: "https://github.com/gemachistesfaye/GradeEvaluator-AI",
    demo: "https://gradeevaluator-ai.onrender.com",
    featured: true,

    overview: {
      problem: "University students, particularly in Ethiopian higher education, lack an automated, transparent system to record course scores, calculate credit-weighted SGPA and CGPA, forecast required GPA targets, and receive contextual academic coaching.",
      users: "University students, academic advisors, and undergraduate cohorts managing credit loads and GPA milestones.",
      role: "Full-Stack Software Engineer & AI Developer — Architected Flask controllers, credit-weighted GPA algorithms, SQLite schema, Chart.js visual analytics, ReportLab PDF transcript generator, and Gemini GradeBot integration.",
      timeline: "2025 – 2026",
      status: "Live on Render with Gunicorn, persistent SQLite database, and Google GenAI SDK integration."
    },

    motivation: {
      problem: "Manual GPA calculation using spreadsheets is prone to weighted credit errors. Students often miscalculate whether an 'F' results in an 'NG' (No Grade) and struggle to estimate what grades they need in future semesters to meet graduation honors or scholarship criteria.",
      whoAffected: "Undergraduate students tracking semester GPA thresholds, academic probation risks, or graduation honors criteria.",
      whyExistingInsufficient: "Generic online GPA calculators do not persist course records across semesters, lack credit-hour weighting nuances, have no transcript export capabilities, and provide no actionable feedback when grades slip.",
      whyMatters: "Transparent, accessible academic tracking reduces grade anxiety, gives students actionable roadmap planning, and leverages AI to provide personalized study strategies when performance declines."
    },

    solution: {
      approach: "Developed an end-to-end Flask web platform utilizing SQLite for persistent student accounts and grade records, combining algorithmic credit-weighted GPA logic with Chart.js analytics, ReportLab PDF transcripts, and a Google Gemini conversational agent (GradeBot) delivering tailored academic feedback.",
      keyWorkflows: [
        "Score-to-Grade Evaluation: Student inputs course name, raw score (0–100), credit hours, and semester → system maps score to letter grade (A+, A, B, C, D, F) and grade points.",
        "Weighted SGPA/CGPA Calculation: System multiplies grade points by credit hours, divides by total credits, and applies strict academic safeguards (flagging 'NG' if any failure exists).",
        "Interactive Performance Analytics: Chart.js visualizes score progression over semesters and grade distribution breakdowns.",
        "Gemini GradeBot Coaching: Student engages with GradeBot to ask for study plans, subject improvement strategies, or AI-generated semester performance reviews grounded in their actual course marks.",
        "Transcript Export: One-click export generates a styled printable academic transcript via ReportLab (PDF) or raw data via CSV."
      ],
      features: [
        { name: "Credit-Weighted GPA/CGPA Engine", why: "Calculates true credit-hour-weighted SGPA per semester and cumulative CGPA across all academic terms." },
        { name: "Ethiopian University Grade Scale", why: "Accurately maps 0–100 numerical scores to institutional letter grades (A+ to F/NG) with credit hour weighting." },
        { name: "Google Gemini GradeBot", why: "AI-powered academic mentor delivering contextual study plans, grade breakdowns, and motivation based on logged course performance." },
        { name: "AI Semester Performance Reports", why: "Automatically synthesizes overall strengths, weak subjects, and targeted action items into executive academic reviews." },
        { name: "PDF & CSV Transcript Generation", why: "Formatted, print-ready PDF academic transcripts built with ReportLab, plus downloadable CSV records." },
        { name: "Quick GPA Target Calculator", why: "Forward-looking simulator estimating the exact GPA required in remaining courses to achieve target graduation honors." }
      ]
    },

    architecture: {
      layers: [
        { name: "Frontend Interface", tech: "Jinja2 Templates + Vanilla JavaScript + CSS Design System" },
        { name: "Visualization & UI", tech: "Chart.js + Responsive Theme Engine (Dark/Light Mode)" },
        { name: "Application Controller", tech: "Python 3.11 + Flask (app.py) + Werkzeug Auth" },
        { name: "AI & GenAI Integration", tech: "Google GenAI SDK (ai_feedback.py) + Gemini Flash" },
        { name: "Data Persistence", tech: "SQLite (database.py) + Python sqlite3" },
        { name: "Document Generation", tech: "ReportLab (PDF Transcripts) + export.py (CSV)" },
        { name: "Deployment", tech: "Render + Gunicorn WSGI (Procfile)" }
      ],
      diagram: `Browser Client (Jinja2 Templates + Chart.js + Vanilla JS)
  ├── Pages: Dashboard • Grade History • Transcript View • GradeBot Panel
  └── Interactive UI: Theme Engine (Dark/Light) • Chart Analytics
          │
          ├── [HTTP / Session Auth]
          ▼
Flask Application Controller (app.py)
  ├── Route Handlers: /dashboard • /history • /export/pdf • /api/chat
  ├── Business Logic: get_grade_info() • calculate_cumulative_gpa()
  ├── Security: Werkzeug salted hashing • Session guards
          │
          ├── [Internal Modules]
          ├──▶ database.py ──▶ SQLite Database (users, grades)
          ├──▶ export.py ──▶ ReportLab PDF & CSV Generator
          └──▶ ai_feedback.py ──▶ Google Gemini API (GradeBot & AI Reports)`
    },

    database: {
      overview: "Lightweight relational SQLite database accessed via Python's built-in sqlite3 module with parameterized queries, storing user credentials and normalized grade history.",
      entities: [
        { name: "Users", description: "Student accounts with username, email, university details, and salted password hashes" },
        { name: "Grades", description: "Normalized course records with user ID, subject name, raw score, credit hours, letter grade, grade points, semester, and timestamp" }
      ],
      relationships: "Users 1:N Grades",
      rationale: "SQLite provides zero-configuration local persistence that seamlessly deploys with Gunicorn, maintaining high read/write speeds for single-user student academic sessions without database connection latency."
    },

    implementation: {
      frontend: [
        "Jinja2 template hierarchy with base.html providing consistent navigation, modal dialogs, and dark/light mode toggles",
        "Dynamic client-side interactivity in dashboard.js and charts.js using Chart.js to render score trajectories and grade distributions",
        "Responsive floating chatbot panel (chatbot.css) for seamless interactions with GradeBot without leaving the grade entry screen",
        "Print-friendly transcript view styled to match official university grade transcripts"
      ],
      backend: [
        "Modular Python architecture separating core routing (app.py), database queries (database.py), Gemini AI orchestration (ai_feedback.py), and document generation (export.py)",
        "Algorithmic evaluation engine implementing weighted credit arithmetic and failure status detection (NG)",
        "ReportLab PDF generator styling academic transcripts with university-standard formatting, tables, and signature blocks",
        "Session authentication and profile management protected with salted password hashing"
      ],
      deployment: [
        "Render cloud hosting with Gunicorn WSGI entry point (gunicorn app:app via Procfile)",
        "Environment variable management using python-dotenv for FLASK_SECRET_KEY and GEMINI_API_KEY",
        "Zero-dependency persistence using file-based SQLite database with automatic table initialization"
      ]
    },

    security: {
      measures: [
        { name: "Password Protection", implementation: "Passwords hashed with Werkzeug secure PBKDF2/SHA-256 salted hashing" },
        { name: "Session Isolation", implementation: "Authenticated Flask session cookies ensuring students can only view, edit, or delete their own academic history" },
        { name: "Parameterized Queries", implementation: "All SQLite transactions use parameterized SQL queries, eliminating SQL injection vectors" },
        { name: "Input Sanitization", implementation: "Strict boundary validation on raw scores (0–100) and credit hours" }
      ]
    },

    ux: {
      userFlows: [
        {
          role: "University Student",
          steps: ["Register/Login via /login", "Enter course, raw score, and credit hours", "View instant SGPA calculation and updated charts", "Open GradeBot panel for targeted study advice", "Export formatted PDF transcript"]
        }
      ],
      keyScreens: [
        "Academic Performance Dashboard with SGPA/CGPA cards",
        "Interactive Score Progression & Distribution Charts",
        "Floating GradeBot AI Study Advisor",
        "Searchable & Printable Grade History Transcript"
      ],
      decisions: [
        "Automatic instant grade computation on form submission gives immediate validation without page reloads",
        "Transcript print-friendly CSS allows direct browser printing of clean, official-looking grade reports",
        "Floating GradeBot allows asking for advice while reviewing current semester grades"
      ]
    },

    challenges: [
      {
        challenge: "Accurately modeling credit-weighted GPA calculations with edge cases such as failing grades and incomplete course credits",
        difficulty: "Medium — A simple arithmetic average skews GPA significantly if credit hours vary between 2-credit labs and 4-credit lectures.",
        solution: "Built a robust weighted formula summing (grade_points * credit_hours) divided by total credits, returning a strict 'NG' if an 'F' is present to mirror academic institution rules."
      },
      {
        challenge: "Grounding GradeBot AI responses in actual student marks without hallucination or generic advice",
        difficulty: "Medium — Standard LLM prompts give generic advice unless fed structured academic context.",
        solution: "Structured prompt payloads in ai_feedback.py injecting current semester marks, weakest subjects, and CGPA trends, prompting Gemini to act as a supportive academic mentor with concrete study plans."
      }
    ],

    performance: {
      optimizations: [
        "Lightweight SQLite queries with indexed foreign keys for instant grade history retrieval",
        "In-memory PDF transcript generation using ReportLab buffers, avoiding disk I/O bottlenecks",
        "CDN delivery for Chart.js and static asset compression"
      ],
      errorHandling: [
        "Graceful fallback when Gemini API reaches quota limits or network errors occur, providing standard fallback tips",
        "Input bounds validation preventing invalid scores (<0 or >100) or non-numeric credit hours"
      ],
      testing: "Manual and automated test cases covering edge-case GPA computations (all A+, mixed grades, failing grade NG flags, zero credit hours)."
    },

    roadmap: [
      "Multi-university grading scale selector (customizable score-to-grade ranges)",
      "Degree audit and course prerequisite tracking",
      "Peer study group matching based on shared challenging subjects"
    ],

    media: {
      screenshots: [
        { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop", alt: "Grade Dashboard", caption: "Academic performance dashboard with cumulative GPA, credits, and grade breakdown" },
        { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop", alt: "Chart.js Analytics", caption: "Visual score progression and grade distribution analytics" },
        { src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=500&fit=crop", alt: "GradeBot AI Chat", caption: "Google Gemini–powered GradeBot delivering personalized study advice" }
      ]
    }
  },
  {
    slug: "garage-management-system",
    name: "Garage Management System",
    category: "Full-Stack ERP & Operations",
    tags: ["React 19", "Vite", "Node.js", "Express 5", "PostgreSQL", "Prisma 6", "Recharts", "JWT", "RBAC"],
    tagline: "Automotive repair pipeline, spare parts inventory & vehicle service history ERP",
    description: "A full-stack garage and workshop operations system for managing customers, vehicles, job cards, mechanics, spare-part inventory, invoices, payments, reports, and audit history. Built with React 19, Vite, Express 5, PostgreSQL, and Prisma 6, with role-based access for Admin, Manager, Receptionist, and Mechanic across the full lifecycle from customer intake to idempotent payment processing.",
    heroImage: "https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=1200&h=600&fit=crop",
    github: "",
    demo: "",
    featured: false,

    overview: {
      problem: "Automotive repair shops and service centers struggle with fragmented paper work orders, unmonitored spare-parts inventory, lack of vehicle service tracking, and inaccurate billing.",
      users: "Garage Administrators, Shop Managers, Service Receptionists, and Workshop Mechanics.",
      role: "Full-Stack Software Engineer — Designed relational database schema in PostgreSQL via Prisma 6, built Express 5 REST APIs with JWT & RBAC, and engineered the React 19 frontend with Recharts analytics and role-protected workflows.",
      timeline: "2025 – 2026",
      status: "Production-ready full-stack application with Express 5 REST API, Prisma 6 ORM, PostgreSQL persistence, and React 19 SPA frontend."
    },

    motivation: {
      problem: "Garages rely heavily on physical work order clipboards and memory. Spare parts taken off the shelf often go unbilled, vehicle repair statuses are obscure to customers, and return visits lack historical context on past maintenance or replaced components.",
      whoAffected: "Shop managers managing multi-bay repair floors, mechanics juggling multiple repairs, receptionists handling customer intake, and vehicle owners needing transparent billing and reliable service records.",
      whyExistingInsufficient: "Generic retail POS tools don't model two-phase repair states (inspection diagnosis vs customer authorization vs active repair vs billing) or multi-item parts deduction per vehicle job.",
      whyMatters: "Operational efficiency directly dictates garage profitability. Real-time parts deduction, idempotent payment processing, and transparent service logging prevent revenue loss, build customer trust, and speed up turnaround times."
    },

    solution: {
      approach: "Architected a role-protected full-stack system with a React 19 (Vite) SPA frontend and Node.js/Express 5 backend paired with PostgreSQL via Prisma 6. Implements the complete lifecycle: Customer → Vehicle → Job Card → Services/Parts → Invoice → Payment → Audit Log.",
      keyWorkflows: [
        "Customer & Vehicle Intake: Receptionists register customers and vehicles with VIN, plate number, make, model, year, and service history.",
        "Job Card & Work Order Pipeline: Assigns jobs to mechanics with complaints, diagnoses, and statuses (pending, in_progress, completed, cancelled).",
        "Spare-Parts Inventory & Deduction: Tracks stock quantities, minimum levels, categories, and suppliers; automatically decrements inventory when parts attach to a job card.",
        "Automated Invoicing & Numbering: Generates sequential invoices (INV-00001) from completed job cards with parts, labor, tax, discounts, and totals.",
        "Multi-Method Payment & Idempotency: Supports cash, bank, mobile money, and card payments with partial payment tracking and idempotency keys to prevent duplicate charges.",
        "Audit Logging & Operational Reports: Immutable logs record sensitive actions across invoices, payments, and inventory, backed by Recharts revenue analytics and CSV exports."
      ],
      features: [
        { name: "Customer & Vehicle Intake", why: "Stores contact details, vehicle specs, and prevents deletion when active service records exist." },
        { name: "Mechanic Job Card Assignment", why: "Restricts mechanics to modifying their assigned jobs while supervisors oversee floor progress." },
        { name: "Automated Spare-Parts Deduction", why: "Real-time stock deduction, reorder thresholds, and low-stock dashboard alerts prevent inventory shrinkage." },
        { name: "Sequential Invoicing (INV-00001)", why: "Generates itemized invoices directly from completed job cards with duplicate-prevention safeguards." },
        { name: "Idempotent Multi-Method Payments", why: "Handles cash, bank, mobile money, and card transactions with idempotency keys and partial payment states." },
        { name: "Audit Trail & Financial Analytics", why: "Records user actions on invoices, inventory, and payments with Recharts financial dashboard and CSV reports." }
      ]
    },

    architecture: {
      layers: [
        { name: "Frontend Client", tech: "React 19 + Vite + React Router + Axios + Recharts + Tailwind CSS" },
        { name: "Authentication & State", tech: "JWT Bearer Token (LocalStorage + Axios interceptors) + Context API" },
        { name: "Backend REST API", tech: "Node.js + Express 5 (/api routes with modular controllers)" },
        { name: "ORM & Persistence", tech: "Prisma 6 Client with connection pooling and schema migrations" },
        { name: "Database Engine", tech: "PostgreSQL with ACID relations, constraints, and audit logging" },
        { name: "Security & Permissions", tech: "bcrypt password hashing, centralized RBAC matrix (Admin, Manager, Receptionist, Mechanic)" }
      ],
      diagram: `Customer Intake ──► Vehicle Registration ──► Job Card Assignment (Mechanic)
           │
      Spare-Parts Inventory Deduction (Prisma Transactions)
           │
      Sequential Invoice Generation (INV-00001)
           │
      Idempotent Payment Processing (Cash, Bank, Mobile Money, Card)
           │
      Audit Trail Logging ──► Recharts Analytics & CSV Reports`
    },

    database: {
      overview: "Relational PostgreSQL schema managed by Prisma ORM ensuring strict relational integrity between customers, vehicles, work orders, parts inventory, and billing invoices.",
      entities: [
        { name: "Customer", description: "Name, phone, email, address, and outstanding balance" },
        { name: "Vehicle", description: "License plate, VIN, make, model, year, and customer ownership link" },
        { name: "WorkOrder", description: "Status (Intake, InProgress, QualityCheck, Completed), advisor ID, technician ID, odometer in, and dates" },
        { name: "JobItem", description: "Description, labor hours, technician assigned, and completion status" },
        { name: "Part", description: "SKU, part name, category, quantity in stock, minimum threshold, cost price, and selling price" },
        { name: "Invoice", description: "Work order reference, parts subtotal, labor subtotal, tax amount, total, and payment status" }
      ],
      relationships: "Customer 1:N Vehicle · Vehicle 1:N WorkOrder · WorkOrder 1:N JobItem · WorkOrder 1:N Part · WorkOrder 1:1 Invoice",
      rationale: "Automotive repair involves transactional dependencies (e.g. inventory must not decrement if work order creation fails). PostgreSQL + Prisma transactions guarantee 100% data consistency."
    },

    implementation: {
      frontend: [
        "React (Vite) SPA with rapid client-side routing and optimized bundle size",
        "Visual Kanban board visualizing real-time repair floor progress across service bays",
        "Modal dialogs with input masking for vehicle VIN and license plate validation",
        "Searchable inventory management view with filter by part category and stock health indicators"
      ],
      backend: [
        "Express modular architecture with separated routes, controllers, and Prisma services",
        "Atomic Prisma $transaction operations ensuring stock decrements, job status updates, and invoice calculations execute together",
        "JWT authentication with role-based middleware guarding administrative pricing and inventory management"
      ],
      deployment: [
        "Docker Compose configuration orchestrating Node.js backend, PostgreSQL 15 container, and static asset serving",
        "Configured for internal garage LAN deployment or cloud hosting on Render / Vercel"
      ]
    },

    security: {
      measures: [
        { name: "Role-Based Access Control", implementation: "Mechanics can update job progress but cannot alter parts purchase costs or modify invoice pricing" },
        { name: "Transactional Atomicity", implementation: "Prevents orphaned inventory transactions or unsynced billing states" },
        { name: "Input Validation", implementation: "Server-side validation on odometer readings, VIN numbers, and numeric parts quantities" },
        { name: "Password Security", implementation: "Salted bcrypt password hashing for all staff accounts" }
      ]
    },

    ux: {
      userFlows: [
        {
          role: "Service Advisor",
          steps: ["Check in vehicle via intake modal", "Enter customer & vehicle details", "Add reported complaints", "Assign to service bay", "Generate repair estimate"]
        },
        {
          role: "Mechanic",
          steps: ["Open assigned work order", "Perform diagnostics", "Log replacement parts from inventory", "Complete repair tasks", "Flag ready for inspection"]
        }
      ],
      keyScreens: [
        "Work Order Kanban Floor View",
        "Vehicle Service History & Customer Profile",
        "Parts Inventory & Stock Requisition Table",
        "Itemized Invoice & Payment Receipt Modal"
      ],
      decisions: [
        "Kanban-style visual pipeline gives garage staff immediate clarity on repair stages across all service bays",
        "Auto-suggesting past vehicle records by license plate accelerates intake time from 5 minutes down to 30 seconds"
      ]
    },

    challenges: [
      {
        challenge: "Preventing inventory discrepancies when multiple mechanics claim parts for simultaneous work orders",
        difficulty: "High — Concurrency race conditions could lead to negative stock counts or unbilled inventory.",
        solution: "Implemented Prisma interactive database transactions ($transaction) with row-level locks on inventory records during parts allocation."
      },
      {
        challenge: "Modeling complex vehicle service histories with recurring customer visits",
        difficulty: "Medium — Vehicles change owners and have multiple recurring visits with different complaints.",
        solution: "Separated Customer and Vehicle entities in a Many-to-One ownership relationship with historical ownership logging."
      }
    ],

    performance: {
      optimizations: [
        "Indexed foreign keys on vehicleId, workOrderId, and partId for instant history queries",
        "Optimistic UI updates on Kanban stage transitions with rollback on API errors"
      ],
      errorHandling: [
        "Clear validation error messages when attempting to allocate more parts than available in physical stock",
        "Centralized Express error handler returning structured JSON error payloads"
      ],
      testing: "Unit tests for inventory decrement and invoice total calculations."
    },

    roadmap: [
      "SMS notification integration for automated customer updates when vehicle is ready for pickup",
      "Supplier purchase order automation when parts breach minimum threshold levels",
      "Mobile scanner support for barcode/QR code parts inventory lookups"
    ],

    media: {
      screenshots: [
        { src: "https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=800&h=500&fit=crop", alt: "Garage Pipeline", caption: "Active repair bays and work order Kanban pipeline" },
        { src: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&h=500&fit=crop", alt: "Parts Inventory", caption: "Spare parts inventory and automated stock deduction ledger" },
        { src: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&h=500&fit=crop", alt: "Vehicle History", caption: "Comprehensive vehicle service records and maintenance history" }
      ]
    }
  },
  {
    slug: "readme-studio",
    name: "README Studio",
    category: "Developer Tools",
    tags: ["React", "TypeScript", "Tailwind CSS", "GitHub API", "OAuth", "Markdown"],
    tagline: "Visual real-time GitHub documentation generator & template studio",
    description: "A modern developer studio for creating, editing, and previewing production-ready GitHub documentation. Integrates GitHub OAuth to import repository metadata, provides rich markdown templates and live split-screen preview, and generates custom SVG badges and project headers.",
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
    github: "https://github.com/gemachistesfaye/readme-studio",
    demo: "https://gemachisdev.vercel.app",
    featured: false,

    overview: {
      problem: "Software developers spend excessive time manually writing and formatting repository READMEs without real-time previews or standardized quality checks.",
      users: "Open-source contributors, indie hackers, and engineering teams documenting their codebases.",
      role: "Creator & Lead Developer — Architected the client-side markdown compilation engine, GitHub API OAuth integration, and custom theme presets.",
      timeline: "2025",
      status: "Live on Vercel with real-time markdown generation and repository import."
    },

    motivation: {
      problem: "A project's README is its storefront. Yet developers frequently skip proper documentation due to tedious syntax formatting and lacking visual previews.",
      whoAffected: "Software engineers launching projects and recruiters/collaborators assessing codebases.",
      whyExistingInsufficient: "Basic markdown editors lack GitHub-specific badges, license generators, and automated repository structure scrapers.",
      whyMatters: "High-quality documentation increases project adoption, open-source contributions, and professional credibility."
    },

    solution: {
      approach: "Engineered a React + TypeScript web application with live side-by-side editing, syntax highlighting, customizable badge builders, and one-click clipboard/file export.",
      keyWorkflows: [
        "Repository Import: User connects via GitHub OAuth → pulls repository name, description, and topics into pre-formatted sections.",
        "Section Composer: Toggle and drag-and-drop standard sections (Tech Stack, Quick Start, Contributing, License).",
        "Live Preview: Real-time markdown parser renders exact GitHub typography and badge styling.",
        "Export: One-click copy or direct README.md download ready to commit to Git."
      ],
      features: [
        { name: "Live Split-Screen Preview", why: "Eliminates guess-work by rendering live markdown as you type." },
        { name: "Dynamic Badge Generator", why: "Generates Shields.io badges for tech stacks, licenses, and build statuses." },
        { name: "Modular Section Blocks", why: "Quickly assemble standard sections without writing boilerplate markdown." }
      ]
    },

    architecture: {
      layers: [
        { name: "Frontend Client", tech: "React + TypeScript + Vite + Tailwind CSS" },
        { name: "Markdown Engine", tech: "Remark / Rehype parser pipeline" },
        { name: "External APIs", tech: "GitHub REST API via OAuth token" }
      ],
      diagram: `User Input / GitHub OAuth ──► React Markdown Parser ──► Live Split Preview ──► README.md Export`
    },

    implementation: {
      frontend: ["React SPA with Vite", "Tailwind CSS responsive split layout", "Debounced markdown parsing"],
      backend: ["Client-side architecture using GitHub REST APIs"],
      deployment: ["Vercel automated CI/CD pipeline"]
    },

    ux: {
      userFlows: [{ role: "Developer", steps: ["Import repo", "Choose layout preset", "Customize sections", "Export README.md"] }],
      keyScreens: ["Editor View", "Template Gallery", "Badge Customizer"],
      decisions: ["Side-by-side layout prioritizing desktop developer workflows"]
    },

    challenges: [
      {
        challenge: "Real-time rendering of large markdown files without typing lag",
        difficulty: "Medium",
        solution: "Implemented debounced parse cycles and virtualized editor previews."
      }
    ],

    performance: {
      optimizations: ["Bundle splitting via Vite", "Memoized parser components"],
      errorHandling: ["Graceful fallback when GitHub API rate limit is reached"],
      testing: "Component tests for markdown export fidelity."
    },

    roadmap: ["Direct commit to GitHub via Octokit", "AI README generation from code analysis"],
    media: {
      screenshots: [
        { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop", alt: "Editor", caption: "Split-screen markdown editor and live preview" }
      ]
    }
  },
  {
    slug: "riqicha-ai",
    name: "Riqicha AI",
    category: "Developer Tools",
    tags: ["React", "TypeScript", "Tailwind CSS", "PDF Export", "ATS-Friendly"],
    tagline: "Modern ATS-friendly resume builder with real-time preview & instant PDF export",
    description: "A responsive CV and resume builder designed to help job seekers generate clean, ATS-compliant resumes. Offers 5 customizable design templates, drag-and-drop section reordering, real-time typography preview, and instant client-side PDF export without hidden paywalls.",
    heroImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=600&fit=crop",
    github: "https://github.com/gemachistesfaye/riqicha-ai",
    demo: "https://gemachisdev.vercel.app",
    featured: false,

    overview: {
      problem: "Job applicants struggle with online resume builders that lock downloads behind subscriptions, ruin formatting, or fail ATS parsers.",
      users: "Students, software developers, and professionals seeking modern job-application materials.",
      role: "Frontend & UI Engineer — Designed responsive UI layouts, PDF rendering pipeline, and custom templates.",
      timeline: "2025",
      status: "Live on Vercel with real-time client-side PDF rendering."
    },

    motivation: {
      problem: "Many commercial resume builders trick users into creating a CV and then demand payment to export the file. Formatting also frequently breaks ATS parsers.",
      whoAffected: "Job applicants worldwide needing clean, accessible CV creation.",
      whyExistingInsufficient: "Word processors lack structure, while subscription sites hold user data hostage.",
      whyMatters: "Access to clean, free, professional job application tools levels the playing field for candidates."
    },

    solution: {
      approach: "Engineered a client-side React + TypeScript application with live data persistence in local storage, responsive form inputs, and vector PDF compilation.",
      keyWorkflows: [
        "Profile & Experience Input: Enter work experience, education, skills, and projects with live validation.",
        "Template Selection: Choose between 5 ATS-compliant templates (Modern, Minimal, Tech, Executive, Creative).",
        "Instant Download: Client-side vector PDF generation preserves crisp typography for ATS screening."
      ],
      features: [
        { name: "5 ATS-Friendly Templates", why: "Designed to pass automated applicant tracking systems without parsing glitches." },
        { name: "Live Side-by-Side Preview", why: "Immediate visual feedback as you fill out experience and education fields." },
        { name: "100% Free Vector PDF Export", why: "High-resolution output without subscriptions or watermarks." }
      ]
    },

    architecture: {
      layers: [
        { name: "Frontend Client", tech: "React + TypeScript + Tailwind CSS" },
        { name: "PDF Rendering Engine", tech: "HTML5 Canvas / jsPDF vector pipeline" },
        { name: "Persistence", tech: "LocalStorage for browser session auto-save" }
      ],
      diagram: `Form Inputs ──► LocalStorage Auto-Save ──► Template Engine ──► Vector PDF Export`
    },

    implementation: {
      frontend: ["Modular form components", "Responsive template styling", "Real-time state sync"],
      backend: ["Zero-backend client-side execution"],
      deployment: ["Vercel automated deployment"]
    },

    ux: {
      userFlows: [{ role: "Job Seeker", steps: ["Fill credentials", "Pick template", "Preview layout", "Download PDF"] }],
      keyScreens: ["Resume Builder", "Template Switcher", "Preview Canvas"],
      decisions: ["Auto-save on every keystroke so candidates never lose data"]
    },

    challenges: [
      {
        challenge: "Rendering clean page breaks in client-side PDF generation",
        difficulty: "Medium",
        solution: "Engineered page break calculations measuring element heights before rasterization."
      }
    ],

    performance: {
      optimizations: ["Zero backend latency", "Instant local PDF generation"],
      errorHandling: ["Graceful handling for oversized image avatars"],
      testing: "Cross-browser validation for PDF layout consistency."
    },

    roadmap: ["AI resume bullet-point optimizer", "LinkedIn profile data import"],
    media: {
      screenshots: [
        { src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop", alt: "Builder", caption: "Interactive resume builder with live template preview" }
      ]
    }
  },
  {
    slug: "churn-prediction",
    name: "Churn Prediction",
    category: "AI / ML",
    tags: ["Python", "Scikit-Learn", "SHAP", "Jupyter", "Pandas", "Data Science"],
    tagline: "Calibrated customer churn classification & SHAP explainability pipeline",
    description: "An end-to-end machine learning system for predicting customer turnover in subscription businesses. Trained on IBM Telco and KKBox datasets, featuring feature engineering, class imbalance mitigation, probability calibration, and SHAP interpretability to guide proactive customer retention campaigns.",
    heroImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=600&fit=crop",
    github: "https://github.com/gemachistesfaye/churn-Prediction",
    demo: "https://gemachisdev.vercel.app",
    featured: false,

    overview: {
      problem: "Subscription businesses lose revenue from unexpected customer attrition without early warning signals or interpretable churn drivers.",
      users: "Customer success managers, data scientists, and growth marketing teams.",
      role: "Data Scientist & ML Engineer — Built data preprocessing pipelines, trained classification models, and developed SHAP interpretation dashboards.",
      timeline: "2025",
      status: "Validated ML pipeline with reproducible Jupyter notebooks and evaluated models."
    },

    motivation: {
      problem: "Acquiring new customers is 5-7x more costly than retaining existing accounts. Traditional analytics report churn after customers have already canceled.",
      whoAffected: "SaaS companies, telecommunications providers, and subscription platforms.",
      whyExistingInsufficient: "Black-box models predict churn but fail to explain why individual accounts are at risk, preventing targeted interventions.",
      whyMatters: "Proactive retention targeting based on interpretable risk scores directly protects monthly recurring revenue."
    },

    solution: {
      approach: "Engineered a machine learning pipeline comparing Logistic Regression, Random Forest, and Gradient Boosting with stratified k-fold validation and SMOTE balancing, paired with SHAP value decomposition.",
      keyWorkflows: [
        "Feature Engineering: Preprocess contract lengths, monthly spend, support tickets, and service add-ons.",
        "Model Training & Calibration: Train models with hyperparameter tuning and Brier score calibration.",
        "SHAP Interpretability: Compute global and local feature importance to pinpoint root causes for churn risk.",
        "Decision Targeting: Assign customer risk tiers (Low, Medium, High) to guide intervention offers."
      ],
      features: [
        { name: "Calibrated Probability Scoring", why: "Ensures model confidence matches real-world likelihood of cancellation." },
        { name: "SHAP Explainability Insights", why: "Explains exactly why a customer is flagged (e.g. high monthly bill, month-to-month contract)." },
        { name: "ROI-Focused Thresholding", why: "Optimizes decision thresholds to maximize return on retention discounts." }
      ]
    },

    architecture: {
      layers: [
        { name: "Data Processing", tech: "Pandas + NumPy + Scikit-Learn Pipelines" },
        { name: "Model Layer", tech: "Random Forest + XGBoost / Gradient Boosting" },
        { name: "Explainability", tech: "SHAP (SHapley Additive exPlanations) values" }
      ],
      diagram: `Customer Telemetry ──► Feature Pipeline ──► Calibrated Classifier ──► SHAP Drivers ──► Retention Action`
    },

    implementation: {
      frontend: ["Streamlit analytics dashboard & notebook visualizations"],
      backend: ["Python 3.11 + Scikit-Learn + SHAP"],
      deployment: ["Jupyter Notebooks + standalone Python inference scripts"]
    },

    ux: {
      userFlows: [{ role: "Retention Specialist", steps: ["Upload customer batch", "Review high-risk accounts", "Inspect SHAP drivers", "Trigger retention offer"] }],
      keyScreens: ["Model ROC-AUC Curve", "SHAP Feature Summary", "Risk Tier Table"],
      decisions: ["Prioritized recall over precision to catch at-risk accounts before cancellation"]
    },

    challenges: [
      {
        challenge: "Handling severe class imbalance where only 20% of users churned",
        difficulty: "Medium",
        solution: "Applied SMOTE oversampling and evaluated via PR-AUC and ROC-AUC rather than raw accuracy."
      }
    ],

    performance: {
      optimizations: ["Vectorized Pandas transforms", "Tree-based SHAP approximations"],
      errorHandling: ["Missing data imputation pipelines with SimpleImputer"],
      testing: "5-fold StratifiedKFold cross-validation suites."
    },

    roadmap: ["REST API serving real-time predictions", "Automated email trigger integration"],
    media: {
      screenshots: [
        { src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=500&fit=crop", alt: "Analytics", caption: "Model evaluation curves and SHAP explainability plots" }
      ]
    }
  },
  {
    slug: "course-recommendation-system",
    name: "Course Recommendation System",
    category: "AI / ML",
    tags: ["Python", "Scikit-Learn", "TF-IDF", "Streamlit", "Pandas", "Cosine Similarity"],
    tagline: "Content-based course discovery & text vectorization recommendation model",
    description: "A machine learning course recommendation engine analyzing catalog metadata across 3,000+ course offerings. Employs weighted TF-IDF vectorization and cosine similarity to deliver tailored learning paths with Precision@5 validation and an interactive Streamlit discovery dashboard.",
    heroImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=600&fit=crop",
    github: "https://github.com/gemachistesfaye/course-recommendation-system",
    demo: "https://gemachisdev.vercel.app",
    featured: false,

    overview: {
      problem: "Learners face choice paralysis when navigating thousands of online courses without personalized recommendations based on existing skills.",
      users: "Online learners, academic advisors, and e-learning platforms.",
      role: "Machine Learning Engineer — Engineered TF-IDF metadata pipeline, designed similarity scoring, and built evaluation test suites.",
      timeline: "2025",
      status: "Validated ML model with 9 passing test suites and interactive Streamlit UI."
    },

    motivation: {
      problem: "Massive open online courses (MOOCs) have low completion rates partly because students enroll in courses poorly matched to their current background.",
      whoAffected: "Self-directed learners seeking structured computer science and data science curriculums.",
      whyExistingInsufficient: "Keyword search fails to understand semantic relationships between prerequisite topics and related course descriptions.",
      whyMatters: "Accurate course discovery increases learner engagement, course completion rates, and learning efficiency."
    },

    solution: {
      approach: "Engineered a content-based recommendation model combining title, syllabus, difficulty level, and subject metadata into weighted feature matrices scored via cosine similarity.",
      keyWorkflows: [
        "Text Preprocessing: Tokenize, clean, and vectorize course descriptions using TF-IDF with custom n-grams.",
        "Similarity Scoring: Compute cosine distance between candidate courses across multi-dimensional embedding space.",
        "Recommendation Ranking: Rank top 5 closest matches and filter by difficulty tier.",
        "Streamlit Interface: Interactive search bar with instant recommendations and syllabus breakdowns."
      ],
      features: [
        { name: "TF-IDF Weighted Embeddings", why: "Captures semantic importance of technical keywords while downweighting common terms." },
        { name: "Top-N Cosine Ranking", why: "Delivers sub-millisecond similarity lookups across 3,000+ course records." },
        { name: "Precision@5 Evaluation", why: "Quantitatively validates recommendation quality against benchmark test sets." }
      ]
    },

    architecture: {
      layers: [
        { name: "Data Processing", tech: "Pandas + NLTK text normalization" },
        { name: "Vectorization", tech: "Scikit-Learn TfidfVectorizer" },
        { name: "Discovery UI", tech: "Streamlit responsive dashboard" }
      ],
      diagram: `Course Catalog ──► TF-IDF Vectorizer ──► Cosine Similarity Matrix ──► Top-5 Recommended Courses`
    },

    implementation: {
      frontend: ["Streamlit web interface with interactive filtering"],
      backend: ["Python 3.11 + Scikit-Learn + NumPy"],
      deployment: ["Streamlit Community Cloud / Vercel"]
    },

    ux: {
      userFlows: [{ role: "Student", steps: ["Select course title or interest", "Filter by level", "View top 5 recommendations", "Access syllabus links"] }],
      keyScreens: ["Course Search", "Recommendation Results", "Evaluation Metrics"],
      decisions: ["Fast similarity queries allowing instantaneous recommendation responses"]
    },

    challenges: [
      {
        challenge: "Balancing general subject terms with specific framework tags in recommendations",
        difficulty: "Medium",
        solution: "Applied custom term weighting to give higher significance to specialized technical tags over generic course titles."
      }
    ],

    performance: {
      optimizations: ["Pre-computed similarity matrices for zero-latency queries"],
      errorHandling: ["Fallback to top-rated courses when input course is out-of-vocabulary"],
      testing: "9 automated test suites verifying matrix symmetry and ranking sanity."
    },

    roadmap: ["Collaborative filtering integration with student review data", "Prerequisite path visualizer"],
    media: {
      screenshots: [
        { src: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop", alt: "Recommendations", caption: "Interactive course discovery dashboard with similarity rankings" }
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
