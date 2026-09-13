import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
import { Flame, Gamepad2, Swords } from 'lucide-react';

export function GameShowcase() {
  const freeFireDetails = [
    { label: "Squad Size", value: "4 Players + 1 Substitute" },
    { label: "Maps", value: "Bermuda & Purgatory" },
    { label: "Format", value: "Qualifiers → Semi → Grand Finals" },
    { label: "Device", value: "Mobile Only (Android / iOS) • No Emulators" },
    { label: "Timing", value: "Slots announced in WhatsApp group" },
  ];

  const bgmiDetails = [
    { label: "Squad Size", value: "4 Players + 1 Substitute" },
    { label: "Maps", value: "Erangel & Miramar" },
    { label: "Format", value: "Qualifiers → Semi → Grand Finals" },
    { label: "Device", value: "Mobile Only (Android / iOS) • No Emulators" },
    { label: "Timing", value: "Slots announced in WhatsApp group" },
  ];

  return (
    <section id="details" className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 relative z-10 max-w-6xl mx-auto bg-white">
      <ScrollReveal>
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[12px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-sm">
            <Swords className="w-3.5 h-3.5 text-blue-600" />
            Competitive Rules
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight font-display">
            Games & Format
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto">
            Choose your battlefield. Both titles feature standard competitive esports lobby rules.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Free Fire Card */}
        <ScrollReveal delay={0.1}>
          <motion.div
            whileHover={{ y: -3 }}
            className="group relative bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-300 h-full shadow-sm hover:shadow-md flex flex-col"
          >
            <div className="p-4 sm:p-6 md:p-7 relative z-10 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-4 pb-3 sm:pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-black text-black tracking-tight font-display">
                      FF ESPORTS
                    </h3>
                    <span className="text-[10px] sm:text-xs text-blue-600 font-mono font-bold">BATTLE ROYALE SQUAD</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5 flex-1">
                {freeFireDetails.map((detail, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between gap-2 border-b border-gray-200 pb-2 text-[11px] sm:text-xs last:border-0 last:pb-0"
                  >
                    <span className="text-gray-500 font-sans font-medium uppercase tracking-wider">
                      {detail.label}
                    </span>
                    <span className="text-gray-900 font-semibold text-right">
                      {detail.value}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t border-gray-200">
                <a
                  href="#register"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors font-display shadow-sm"
                >
                  <Flame className="w-3.5 h-3.5 text-white" />
                  Register for Free Fire
                </a>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* BGMI Card */}
        <ScrollReveal delay={0.2}>
          <motion.div
            whileHover={{ y: -3 }}
            className="group relative bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-300 h-full shadow-sm hover:shadow-md flex flex-col"
          >
            <div className="p-4 sm:p-6 md:p-7 relative z-10 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-4 pb-3 sm:pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                    <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-black text-black tracking-tight font-display">
                      BGMI ESPORTS
                    </h3>
                    <span className="text-[10px] sm:text-xs text-blue-600 font-mono font-bold">BATTLEGROUNDS SQUAD</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5 flex-1">
                {bgmiDetails.map((detail, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between gap-2 border-b border-gray-200 pb-2 text-[11px] sm:text-xs last:border-0 last:pb-0"
                  >
                    <span className="text-gray-500 font-sans font-medium uppercase tracking-wider">
                      {detail.label}
                    </span>
                    <span className="text-gray-900 font-semibold text-right">
                      {detail.value}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t border-gray-200">
                <a
                  href="#register"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors font-display shadow-sm"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-white" />
                  Register for BGMI
                </a>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
