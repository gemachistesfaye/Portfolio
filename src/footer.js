import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="footer" 
      className="relative border-t border-gray-180/60 dark:border-gray-800/60 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md py-4 transition-all duration-500"
    >
      {}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          
          {}
          <div className="flex items-center gap-3 text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
            <span className=" text-gray-900 dark:text-gray-100 tracking-tight transition-colors duration-300">
              &copy; {currentYear} Gemachis Tesfaye
            </span>
            <span className="text-gray-300 dark:text-gray-800 font-light text-lg">|</span>
            <span className="flex items-center gap-2 group cursor-default ">
              Made with 
              <Heart size={18} className="text-rose-500 fill-rose-500/20 group-hover:fill-rose-500 transition-all duration-300 animate-pulse" /> 
              in Ethiopia
            </span>
          </div>

          {}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gray-900 dark:bg-gray-100 text-[13px] font-extrabold text-white dark:text-black hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-white shadow-md hover:shadow-indigo-500/20 transition-all duration-300"
          >
            <span className="tracking-widest uppercase">Back to top</span>
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-500 ease-out" />
          </button>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;