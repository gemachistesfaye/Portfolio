import React from "react";
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
import BlogLayout from "./pages/BlogLayout";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";

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
        <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<BlogList />} />
          <Route path=":slug" element={<BlogPost />} />
        </Route>
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
