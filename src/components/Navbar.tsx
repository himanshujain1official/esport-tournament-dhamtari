import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Trophy } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#overview' },
    { name: 'Games', href: '#details' },
    { name: 'Rules', href: '#rules' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 py-2 sm:py-2.5 shadow-sm'
          : 'bg-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 sm:w-9 sm:h-9 bg-white border border-gray-200 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:border-blue-500 transition-colors shadow-sm shrink-0 overflow-hidden">
            <img src="/logo.jpg" alt="Yuva E Arena Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-black font-bold text-base sm:text-sm tracking-wide uppercase font-display flex items-center gap-1">
              Yuva E Arena
              <span className="text-[9px] bg-blue-50 text-blue-600 border border-blue-200 px-1 py-0.2 rounded font-mono">
                DHAMTARI
              </span>
            </span>
            <span className="text-gray-500 text-[10px] font-sans -mt-0.5 hidden xs:inline">Govt. PG College</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 text-xs lg:text-sm font-medium transition-colors font-sans"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#register"
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold text-xs hover:from-blue-800 hover:to-blue-600 transition-all transform hover:scale-105 font-display flex items-center gap-1.5 shadow-sm"
          >
            <Trophy className="w-3.5 h-3.5 text-white" />
            Register Team
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-gray-700 hover:text-blue-600 focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/98 border-b border-gray-200 backdrop-blur-xl px-5 py-4 space-y-3 shadow-md"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 text-sm font-medium py-1"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white text-xs font-bold font-display hover:from-blue-800 hover:to-blue-600 transition-colors shadow-sm"
            >
              Register Team
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
