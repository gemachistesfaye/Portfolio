# 🚀 Gemachis Tesfaye — Developer Portfolio

A modern, dark-themed developer portfolio built with **React**, **Vite**, and **Tailwind CSS**. Features smooth animations, a CMS-powered blog via Sanity, and a fully responsive design.

🔗 **Live:** [gemachisdev.vercel.app](https://gemachisdev.vercel.app/)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Single-Page Portfolio** | Smooth-scrolling sections for About, Services, Skills, Projects, Experience & Contact |
| **Blog (CMS)** | Dynamic blog powered by [Sanity](https://www.sanity.io/) with markdown rendering |
| **Dark Mode** | Elegant dark theme with glassmorphism effects and subtle gradients |
| **Responsive** | Mobile-first design with a slide-in side-drawer navigation |
| **Contact Form** | FormBlade-powered form with anti-spam protection |
| **Hire Me Modal** | Floating action button with a quick inquiry form |
| **SEO Optimized** | Meta tags, sitemap, robots.txt, RSS feed, and Open Graph support |
| **Animations** | Scroll-triggered animations using Intersection Observer |
| **CV Download** | One-click resume download/view from Google Drive |

---

## 🛠 Tech Stack

- **Framework:** React 18 + Vite 6
- **Styling:** Tailwind CSS 3
- **Routing:** React Router DOM 7
- **Icons:** Lucide React
- **CMS:** Sanity (headless)
- **Forms:** FormBlade
- **Markdown:** react-markdown + remark-gfm
- **SEO:** react-helmet-async
- **Testing:** Vitest + React Testing Library
- **Deployment:** Vercel

---

## 📁 Project Structure

```
Portfolio/
├── public/               # Static assets (profile image, sitemap, RSS, robots.txt)
├── src/
│   ├── components/       # Reusable UI (SectionHeading, ProcessModal, TermsModal)
│   ├── data/             # Static data files
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries (Sanity client, etc.)
│   ├── pages/            # Blog pages (BlogLayout, BlogList, BlogPost)
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Helper functions (smooth scroll, etc.)
│   ├── home.jsx          # Hero section
│   ├── about.jsx         # About section with process steps
│   ├── services.jsx      # Services grid
│   ├── project.jsx       # Projects showcase
│   ├── experience.jsx    # Work experience timeline
│   ├── contact.jsx       # Contact form + info
│   ├── testimonials.jsx  # Client testimonials
│   ├── navbar.jsx        # Sticky navigation with mobile drawer
│   ├── footer.jsx        # Footer with social links
│   ├── floatingButtons.jsx # Floating "Hire Me" button + modal
│   ├── config.ts         # Central configuration (socials, API keys, contact info)
│   ├── index.css         # Tailwind base + custom styles
│   └── App.jsx           # Routes & main layout
├── studio/               # Sanity Studio (CMS for blog content)
├── scripts/              # Build scripts (RSS generation)
├── .env.example          # Environment variable template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── vercel.json           # Vercel deployment config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
git clone https://github.com/gemachistesfaye/Portfolio.git
cd Portfolio
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_FORMBLADE_CONTACT` | FormBlade endpoint for contact form |
| `VITE_FORMBLADE_HIREME` | FormBlade endpoint for hire-me modal |
| `VITE_PHONE_NUMBER` | Your phone number (displayed on site) |
| `VITE_PHONEHref` | Phone `tel:` link |
| `VITE_EMAIL` | Your email address (displayed on site) |
| `VITE_SANITY_PROJECT_ID` | Sanity project ID (for blog) |
| `VITE_SANITY_DATASET` | Sanity dataset name |

> **Note:** Contact info has hardcoded fallbacks in `config.ts`, so the site works without env vars — but form submissions require the FormBlade endpoints.

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Run Sanity Studio (Blog CMS)

```bash
cd studio
npm install
npm run dev
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint source files |
| `npm run build:rss` | Generate RSS feed |
| `npm run build:all` | Build + generate RSS |

---

## 🌐 Deployment

The project is configured for **Vercel** deployment:

1. Push to your GitHub repository
2. Connect the repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel → Settings → Environment Variables
4. Deploy

The `vercel.json` handles SPA routing for client-side navigation.

---

## 📬 Contact

- **Email:** gemachis.tesfaye.dev@gmail.com
- **LinkedIn:** [Gemachis Tesfaye](https://www.linkedin.com/in/gemachis-tesfaye-137196318)
- **Telegram:** [@urjiiko1](https://t.me/urjiiko1)
- **GitHub:** [gemachistesfaye](https://github.com/gemachistesfaye)

---

## 📄 License

This project is open source and available for personal use and learning.

---

Built with ❤️ by **Gemachis Tesfaye**
