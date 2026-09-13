import { ScrollReveal } from './ScrollReveal';
import { ShieldAlert, Scale, Wifi, AlertTriangle, CheckSquare } from 'lucide-react';

export function Rules() {
  const rules = [
    {
      icon: <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />,
      title: "Anti-Cheat & Emulator Ban",
      description: "Hacks, aimbots, config mods, and PC emulators (Bluestacks, Gameloop) are strictly banned. Instant disqualification for offenders.",
      delay: 0.1,
    },
    {
      icon: <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      title: "Code of Conduct",
      description: "Respectful sportsmanship is mandatory. Verbal abuse, harassment, or teaming up between squads will lead to instant elimination.",
      delay: 0.2,
    },
    {
      icon: <Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />,
      title: "Lobby Reporting Time",
      description: "Squads must join the custom room within 5 minutes of room ID distribution. Late arrivals forfeit their round slot.",
      delay: 0.3,
    },
    {
      icon: <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />,
      title: "Referee Authority",
      description: "In case of disputes, tie-breakers, or technical disconnects, official room referee logs and decisions are final and binding.",
      delay: 0.4,
    },
  ];

  return (
    <section id="rules" className="py-6 sm:py-14 md:py-16 px-4 sm:px-6 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-sm">
              <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
              Tournament Standards
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight font-display">
              Rules & Fair Play
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto">
              All registered participants must abide by these fair play regulations.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {rules.map((rule, i) => (
            <ScrollReveal key={i} delay={rule.delay}>
              <div className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 h-full hover:border-blue-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white flex items-center justify-center mb-3 sm:mb-4 border border-gray-200 shadow-sm">
                    {rule.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-black mb-1 font-display">{rule.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-sans text-[11px] sm:text-xs">
                    {rule.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
