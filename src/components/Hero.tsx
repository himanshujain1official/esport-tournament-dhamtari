import { motion } from 'motion/react';
import { Shield, Sparkles, ChevronRight, Trophy, Users, Award } from 'lucide-react';

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[75vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden pt-16 pb-8 sm:pt-24 sm:pb-12 px-4 sm:px-6 bg-white">
      {/* Background Soft Tints */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-blue-100/50 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-sky-100/50 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:20px_20px] sm:[background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* College Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white border border-gray-200 mb-4 sm:mb-5 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest text-gray-800 uppercase font-mono">
            BCS GOVT. PG COLLEGE • DHAMTARI
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-5xl md:text-6xl font-black tracking-tight text-black leading-[1.1] mb-3 sm:mb-4 font-display uppercase"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500">
            Free Fire
          </span>{' '}
          <span className="text-gray-400 font-sans font-light animate-pulse">&</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-blue-500">
            BGMI
          </span>
          <br />
          <span className="text-black">Tournament</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xm sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto font-sans leading-relaxed mb-6 sm:mb-8 px-2"
        >
          The premier collegiate battleground in Dhamtari. Assemble your squad, battle the finest college players, and claim the championship trophy & rewards!
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto"
        >
          <a
            href="https://forms.gle/SAgEewwLX5LCP9y2A"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold text-x sm:text-sm rounded-full transition-all font-display shadow-md flex items-center justify-center gap-2 cursor-pointer group animate-bounce delay-0.1s"
          >
            <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform animate-pulse" />
            <span>Register Squad</span>
          </a>

          <button
            onClick={() => scrollTo('details')}
            className="w-full sm:w-auto px-5 py-2.5 sm:px-5 sm:py-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-xs sm:text-sm rounded-full border border-gray-200 transition-all font-sans flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Format & Rules</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </motion.div>

        {/* Key Highlight Pills (Compact) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 mt-8 sm:mt-12 max-w-3xl mx-auto text-left"
        >
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-2 sm:p-3 shadow-sm flex items-center gap-2.5 justify-center">
            <Trophy className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <div className="text-black font-bold text-xs sm:text-sm font-display">Trophy & Medals</div>
              <div className="text-gray-500 text-[10px] font-sans">Podium rewards</div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-2 sm:p-3 shadow-sm flex items-center gap-2.5 justify-center">
            <Shield className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <div className="text-black font-bold text-xs sm:text-sm font-display">Anti-Cheat Rules</div>
              <div className="text-gray-500 text-[10px] font-sans">No emulators</div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-2 sm:p-3 shadow-sm flex items-center gap-2.5 justify-center">
            <Users className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <div className="text-black font-bold text-xs sm:text-sm font-display">Squad Battle</div>
              <div className="text-gray-500 text-[10px] font-sans">Battle Royale</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
