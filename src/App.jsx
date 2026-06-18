import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Home from "./home";
import About from "./about";
import Services from "./services";
import Project from "./project";
import Testimonials from "./testimonials";
import Experience from "./experience";
import Contact from "./contact";
import Footer from "./footer";
import FloatingButtons from "./floatingButtons";

const BlogLayout = lazy(() => import("./pages/BlogLayout"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const BlogFallback = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f3ee] gap-4">
    <div className="w-10 h-10 border-[3px] border-[#5a9a7a] border-t-transparent rounded-full animate-spin" />
    <p className="text-sm text-[#a09890]">Loading blog...</p>
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
        <div className="min-h-screen flex items-center justify-center bg-[#020617] p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-slate-400 mb-4">Please refresh the page or try again later.</p>
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
    <main className="bg-[#020617] min-h-screen font-sans">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <div id="main-content">
        <Home />
        <About />
        <Services />
        <Project />
        <Testimonials />
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
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
