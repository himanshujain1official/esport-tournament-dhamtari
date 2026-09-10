import { ScrollReveal } from './ScrollReveal';
import { Trophy, Medal, Star, Award, Crown, Zap } from 'lucide-react';

export function PrizePool() {
  const prizes = [
    {
      icon: <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />,
      title: "1st Place Champions",
      reward: "Cash Prize + Winner Trophy",
      badge: "CHAMPION",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      delay: 0.1,
    },
    {
      icon: <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />,
      title: "2nd Place Runners-Up",
      reward: "Cash Prize + Trophy",
      badge: "RUNNER-UP",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      delay: 0.2,
    },
    {
      icon: <Medal className="w-6 h-6 sm:w-7 sm:h-7 text-orange-400" />,
      title: "3rd Place Podium",
      reward: "Cash Prize + Medals",
      badge: "3RD PLACE",
      badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      delay: 0.3,
    },
  ];

  const extraPerks = [
    {
      icon: <Star className="w-4 h-4 text-purple-400" />,
      title: "Campus Spotlight",
      desc: "Top clutches and winning highlights featured on college social media.",
    },
  ];

  return (
    <section id="prizes" className="py-8 sm:py-14 md:py-16 px-4 sm:px-6 border-y border-white/5 bg-[#09090c]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5">
              <Trophy className="w-3.5 h-3.5" />
              Rewards & Glory
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight font-display">
              Prizes & Recognition
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-md mx-auto">
              Compete for glory, campus prestige, trophies, and cash pool rewards.
            </p>
          </div>
        </ScrollReveal>

        {/* Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
          {prizes.map((perk, i) => (
            <ScrollReveal key={i} delay={perk.delay}>
              <div className="bg-[#121217] border border-white/10 hover:border-white/20 rounded-xl sm:rounded-2xl p-2 sm:p-5 backdrop-blur-sm h-full flex flex-col justify-between transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 sm:p-4">
                  <span className={`text-[8px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${perk.badgeColor}`}>
                    {perk.badge}
                  </span>
                </div>

                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-3 sm:mb-4 shadow-inner">
                    {perk.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 font-display">{perk.title}</h3>
                  <div className="text-amber-400 font-semibold text-xs sm:text-sm mb-2">{perk.reward}</div>
                  <p className="text-zinc-400 leading-relaxed font-sans text-[11px] sm:text-xs">
                    {perk.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Additional Awards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {extraPerks.map((extra, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/5 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5"
            >
              <div className="p-1.5 bg-zinc-900 rounded-lg shrink-0 border border-white/10">
                {extra.icon}
              </div>
              <div>
                <h4 className="text-white font-bold text-xs sm:text-sm font-display mb-0.5">{extra.title}</h4>
                <p className="text-zinc-400 text-[11px] font-sans leading-tight">{extra.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
