import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Home from "./home";
import About from "./about";
import Services from "./services";
import Project from "./project";
import Testimonials from "./testimonials";
import Experience from "./experience";
import Contact from "./contact";
import Footer from "./footer";
import FloatingButtons from "./scrollTotopbutton";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020617] p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Something went wrong</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-4">Please refresh the page or try again later.</p>
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

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <ErrorBoundary>
      <main className="bg-white dark:bg-[#020617] min-h-screen transition-colors duration-300 font-sans">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
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
    </ErrorBoundary>
  );
}

export default App;
