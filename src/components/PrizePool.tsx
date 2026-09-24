import { ScrollReveal } from './ScrollReveal';
import { Trophy, Medal, Star, Award, Crown, Zap } from 'lucide-react';

export function PrizePool() {
  const prizes = [
    {
      icon: <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />,
      title: "1st Place Champions",
      reward: "Prize + Winner Trophy",
      badge: "CHAMPION",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      delay: 0.1,
    },
    {
      icon: <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />,
      title: "2nd Place Runners-Up",
      reward: "Prize + Trophy",
      badge: "RUNNER-UP",
      badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
      delay: 0.2,
    },
    {
      icon: <Medal className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />,
      title: "3rd Place Podium",
      reward: "Prize + Medals",
      badge: "3RD PLACE",
      badgeColor: "bg-gray-100 text-gray-700 border-gray-300",
      delay: 0.3,
    },
  ];

  const extraPerks = [
    { icon: <Award className="w-4 h-4 text-blue-600" />, 
      title: "MVP", desc: "Most Valuable Player recognition." },
    {
      icon: <Star className="w-4 h-4 text-blue-600" />,
      title: "Campus Spotlight",
      desc: "Top clutches and winning highlights featured on college social media.",
    },
  ];

  return (
    <section id="prizes" className="py-8 sm:py-14 md:py-16 px-4 sm:px-6 border-y border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-sm">
              <Trophy className="w-3.5 h-3.5 text-blue-600" />
              Rewards & Glory
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight font-display">
              Prizes & Recognition
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto">
              Compete for glory, campus prestige, trophies, and cash pool rewards.
            </p>
          </div>
        </ScrollReveal>

        {/* Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
          {prizes.map((perk, i) => (
            <ScrollReveal key={i} delay={perk.delay}>
              <div className="bg-gray-50 border border-gray-200 hover:border-blue-400 rounded-xl sm:rounded-2xl p-4 sm:p-5 h-full flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-sm hover:shadow-md">
                <div className="absolute top-0 right-0 p-3 sm:p-4">
                  <span className={`text-[8px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${perk.badgeColor}`}>
                    {perk.badge}
                  </span>
                </div>

                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3 sm:mb-4 shadow-sm">
                    {perk.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-black mb-0.5 font-display">{perk.title}</h3>
                  <div className="text-blue-700 font-semibold text-xs sm:text-sm mb-2">{perk.reward}</div>
                  <p className="text-gray-600 leading-relaxed font-sans text-[11px] sm:text-xs">
                    {perk.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Additional Awards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
          {extraPerks.map((extra, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 shadow-sm"
            >
              <div className="p-1.5 bg-white rounded-lg shrink-0 border border-gray-200 shadow-sm">
                {extra.icon}
              </div>
              <div>
                <h4 className="text-black font-bold text-xs sm:text-sm font-display mb-0.5">{extra.title}</h4>
                <p className="text-gray-600 text-[11px] font-sans leading-tight">{extra.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
