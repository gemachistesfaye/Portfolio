import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Home from "./home";
import About from "./about";
import Skills from "./skills";
import Project from "./project";
import Experience from "./experience";
import Contact from "./contact";
import Footer from "./footer";
import FloatingButtons from "./floatingButtons";

const BlogLayout = lazy(() => import("./pages/BlogLayout"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));

const BlogFallback = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f3ee] dark:bg-[#09090b] gap-4">
    <div className="w-10 h-10 border-[3px] border-orange-500 border-t-transparent rounded-full animate-spin" />
    <p className="text-sm text-stone-500 dark:text-zinc-400">Loading blog...</p>
  </div>
);

const CaseStudyFallback = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#09090b] gap-4">
    <div className="w-10 h-10 border-[3px] border-accent border-t-transparent rounded-full animate-spin" />
    <p className="text-sm text-zinc-400">Loading case study...</p>
  </div>
);

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#09090b] p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-zinc-400 mb-4">Please refresh the page or try again later.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function Portfolio() {
  return (
    <main className="bg-[#fcfaf6] dark:bg-[#09090b] text-slate-800 dark:text-zinc-100 min-h-screen font-sans transition-colors duration-300 relative overflow-x-hidden selection:bg-orange-500/20 selection:text-orange-700 dark:selection:bg-orange-500/30 dark:selection:text-orange-200">
      {/* Linear Studio Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Ambient glow spots */}
        <div className="absolute -top-[10%] left-1/3 w-[650px] h-[650px] rounded-full bg-orange-500/08 dark:bg-orange-600/10 blur-[150px]" />
        <div className="absolute top-[35%] -right-[10%] w-[550px] h-[550px] rounded-full bg-amber-500/06 dark:bg-amber-600/10 blur-[150px]" />
        <div className="absolute top-[65%] -left-[10%] w-[550px] h-[550px] rounded-full bg-orange-500/06 dark:bg-orange-500/08 blur-[140px]" />
        <div className="absolute -bottom-[10%] right-1/3 w-[600px] h-[600px] rounded-full bg-amber-500/08 dark:bg-amber-600/10 blur-[160px]" />
      </div>

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <div id="main-content" className="relative z-10">
        <Home />
        <About />
        <Skills />
        <Project />
        <Experience />
        <Contact />
        <Footer />
      </div>
      <FloatingButtons />
    </main>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/blog" element={<Suspense fallback={<BlogFallback />}><BlogLayout /></Suspense>}>
          <Route index element={<Suspense fallback={<BlogFallback />}><BlogList /></Suspense>} />
          <Route path=":slug" element={<Suspense fallback={<BlogFallback />}><BlogPost /></Suspense>} />
        </Route>
        <Route path="/project/:slug" element={<Suspense fallback={<CaseStudyFallback />}><CaseStudy /></Suspense>} />
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
