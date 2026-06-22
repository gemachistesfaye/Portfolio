# Gemachis Tesfaye — Portfolio

A focused, source-accurate README for this repository. It documents what is present in the codebase and how to run it.

Live demo: https://gemachisdev.vercel.app/

---

## What this repo contains

- A single-page portfolio web app built with React and Vite (source in `src/`).
- A small Sanity studio for CMS/content under the `studio/` folder.
- Static assets and site metadata in `public/` (including `Profile.jpg`, `rss.xml`, `sitemap.xml`, `404.html`).
- Build and tool configuration: `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `tsconfig.json`, `vercel.json`.
- Environment variable example: `.env.example` (used for FormBlade endpoints, phone, and email placeholders).

---

## Quick facts (based on repository files)

- Primary stack: React + Vite, styled with Tailwind CSS.
- Notable libraries (from package.json): react, react-dom, react-router-dom, react-helmet-async, react-markdown, lucide-react, @sanity/client (studio uses `sanity`).
- Scripts (from package.json):
  - `npm run dev` — start Vite dev server
  - `npm run build` — produce production build
  - `npm run preview` — preview production build locally
  - `npm run test` / `npm run test:watch` — run Vitest
  - `npm run lint` — lint `src/`
  - `npm run build:rss` — run `scripts/generate-rss.js` (RSS generation)
  - `npm run build:all` — build + build:rss
- Sanity studio scripts (studio/package.json): `dev`, `build`, `deploy` (Sanity commands).

---

## How to run (exact commands)

1. Install root dependencies and run the app:

   ```bash
   git clone https://github.com/gemachistesfaye/Portfolio.git
   cd Portfolio
   npm install
   npm run dev
   ```

   Open the URL printed by Vite (typically http://localhost:5173).

2. Optional: run the Sanity studio (edit content / blog):

   ```bash
   cd studio
   npm install
   npm run dev
   ```

3. Build and preview production:

   ```bash
   # from project root
   npm run build
   npm run preview
   ```

---

## Environment

- See `.env.example` for variables expected by the app (FormBlade contact/hireme endpoints, phone, email, Sanity project id/dataset placeholders). Copy `.env.example` to `.env` and fill the real values before running in production.

Key variables shown in `.env.example`:
- VITE_FORMBLADE_CONTACT
- VITE_FORMBLADE_HIREME
- VITE_PHONE_NUMBER
- VITE_PHONEHref
- VITE_EMAIL
- VITE_SANITY_PROJECT_ID
- VITE_SANITY_DATASET

Note: `src/config.ts` checks for required env variables in development and logs a warning if they are missing.

---

## What you'll find in `src/`

- `index.jsx` — app bootstrap (ReactDOM + BrowserRouter + HelmetProvider)
- `App.jsx` — application routes and main layout (lazy-loading blog pages under `/blog`)
- Section components: `home.jsx`, `about.jsx`, `services.jsx`, `project.jsx`, `testimonials.jsx`, `experience.jsx`, `contact.jsx`
- UI pieces: `navbar.jsx`, `footer.jsx`, `floatingButtons.jsx`, `components/` (reusable components)
- Styling: `index.css` (Tailwind + custom styles)
- `config.ts` — central config and social links (includes CV links and social URLs)

---

## Deployment

- `vercel.json` is present for Vercel deployments; the repo is also set up for static hosting of the Vite build.

---

## Notes & small details observed in code

- Contact form submits to the FormBlade endpoint configured via environment variables (see `src/contact.jsx` and `src/config.ts`). The form sends JSON including a few anti-spam timing fields.
- Social links and a CV download/view link are declared in `src/config.ts`.
- Blog pages are lazy-loaded from `src/pages` (App routes).
- Tailwind classes with `dark:` appear in components, indicating dark-mode support in the UI.

---

## To improve this README (suggested, optional)

- Add the exact env values and a short example of `scripts/generate-rss.js` usage if you want to publish the RSS.
- Add a few screenshots (there are image references in the old README) by placing them under `public/` and linking here.
- Add a short CONTRIBUTING.md if you want contribution guidelines.

---

If you want, I can commit this updated README to the repository now. Reply `yes` to proceed and I will update `README.md` on the `main` branch with this content.
