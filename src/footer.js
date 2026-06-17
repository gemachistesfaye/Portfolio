const Footer = () => (
  <footer className="py-6 px-6 border-t border-slate-200 dark:border-slate-700/50" role="contentinfo">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        &copy; {new Date().getFullYear()} Gemachis Tesfaye. All rights reserved.
      </p>
      <iframe src="https://github.com/sponsors/gemachistesfaye/button" title="Sponsor gemachistesfaye" height="32" width="114" style={{ border: 0, borderRadius: '6px' }}></iframe>
    </div>
  </footer>
);

export default Footer;
