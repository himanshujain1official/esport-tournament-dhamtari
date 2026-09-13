import { ScrollReveal } from './ScrollReveal';
import { Target, Zap, ShieldCheck } from 'lucide-react';

export function EventOverview() {
  return (
    <section id="overview" className="py-6 sm:py-14 md:py-16 px-4 sm:px-6 relative z-10 max-w-5xl mx-auto text-center border-t border-gray-200 bg-white">
      <ScrollReveal>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[12px] sm:text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
          About The Tournament
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-3 sm:mb-4 tracking-tight font-display">
          Elevating Collegiate Esports in Dhamtari
        </h2>
        <p className="text-xm sm:text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto font-sans font-medium mb-8 sm:mb-10 px-2">
          The Dhamtari Esports Tournament is a premier platform for students to demonstrate tactical acumen, lightning-fast reflexes, and collaborative teamwork. Organized at BCS Govt. PG College, we bring together passionate mobile esports gamers for high-stakes competition under transparent guidelines.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 text-left">
        <ScrollReveal delay={0.1}>
          <div className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-5 h-full shadow-sm hover:shadow-md transition-shadow">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-black mb-1 font-display">Competitive Excellence</h3>
            <p className="text-gray-600 text-[11px] sm:text-xs font-sans leading-relaxed">
              Structured tournament brackets with official custom rooms, point multiplier systems, and referee-monitored fair lobbies.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-5 h-full shadow-sm hover:shadow-md transition-shadow">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-black mb-1 font-display">Fast Communication</h3>
            <p className="text-gray-600 text-[11px] sm:text-xs font-sans leading-relaxed">
              Real-time room distribution, match schedules, and bracket updates delivered directly through dedicated captain channels.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-5 h-full shadow-sm hover:shadow-md transition-shadow">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-black mb-1 font-display">Fair Play & Integrity</h3>
            <p className="text-gray-600 text-[11px] sm:text-xs font-sans leading-relaxed">
              Zero-tolerance policy against emulators, hacks, or toxicity to ensure a clean, level playing field for every college team.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
