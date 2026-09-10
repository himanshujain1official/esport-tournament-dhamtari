import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Menu, X, Trophy } from 'lucide-react';

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
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-white/10 py-2 sm:py-2.5 shadow-lg'
          : 'bg-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-zinc-900 border border-white/10 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:border-amber-500/50 transition-colors shadow-inner shrink-0">
            <Shield className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-xs sm:text-sm tracking-wide uppercase font-display flex items-center gap-1">
              Esports Tournament
              <span className="text-[9px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1 py-0.2 rounded font-mono">
                DHAMTARI
              </span>
            </span>
            <span className="text-zinc-400 text-[10px] font-sans -mt-0.5 hidden xs:inline">Govt. PG College</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-zinc-300 hover:text-white text-xs lg:text-sm font-medium transition-colors font-sans"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#register"
            className="px-4 py-1.5 rounded-full bg-white text-black font-bold text-xs hover:bg-amber-400 transition-all transform hover:scale-105 font-display flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <Trophy className="w-3.5 h-3.5" />
            Register Team
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-zinc-400 hover:text-white focus:outline-none"
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
            className="md:hidden bg-[#09090b]/98 border-b border-white/10 backdrop-blur-xl px-5 py-4 space-y-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(true)}
                className="block text-zinc-300 hover:text-white text-sm font-medium py-1"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#register"
              onClick={() => setMobileMenuOpen(true)}
              className="block text-center w-full py-2.5 rounded-xl bg-white text-black text-xs font-bold font-display hover:bg-amber-400 transition-colors"
            >
              Register Team
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
