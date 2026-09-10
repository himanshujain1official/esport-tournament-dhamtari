import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Flame, Gamepad2, Sparkles, Swords, Zap, Crosshair, Shield, Award } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

// 3D Tilt Card Component for Collaboration Arena
function TiltCard({
  game,
  badge,
  title,
  subtitle,
  theme,
  icon: Icon,
  tags,
  powerLevel,
}: {
  game: 'Free Fire' | 'BGMI';
  badge: string;
  title: string;
  subtitle: string;
  theme: 'amber' | 'cyan';
  icon: any;
  tags: string[];
  powerLevel: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 15,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isAmber = theme === 'amber';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className="w-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`relative rounded-2xl sm:rounded-3xl p-3 sm:p-6 border overflow-hidden backdrop-blur-xl transition-colors duration-500 shadow-2xl ${
          isAmber
            ? 'bg-gradient-to-b from-[#181109]/90 via-[#100d08]/80 to-[#0c0906]/95 border-amber-500/30 hover:border-amber-400/60 shadow-[0_0_30px_rgba(245,158,11,0.12)]'
            : 'bg-gradient-to-b from-[#08151c]/90 via-[#071015]/80 to-[#050b0f]/95 border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.12)]'
        }`}
      >
        {/* Dynamic 3D Glow Orbs */}
        <div
          className={`absolute -top-12 -right-12 w-40 sm:w-56 h-40 sm:h-56 rounded-full blur-[70px] pointer-events-none ${
            isAmber ? 'bg-amber-500/25' : 'bg-cyan-500/25'
          }`}
        />
        <div
          className={`absolute -bottom-10 -left-10 w-32 sm:w-44 h-32 sm:h-44 rounded-full blur-[60px] pointer-events-none ${
            isAmber ? 'bg-orange-600/20' : 'bg-blue-600/20'
          }`}
        />

        {/* 3D Floating Content Layer */}
        <div style={{ transform: 'translateZ(30px)' }} className="relative z-10">
          {/* Top Badge & Power Level */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider border ${
                isAmber
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
              }`}
            >
              <Icon className="w-3 h-3 animate-pulse" />
              {badge}
            </span>

            <span className="text-[10px] sm:text-xs font-mono text-zinc-400 flex items-center gap-1">
              <Zap className={`w-3 h-3 ${isAmber ? 'text-amber-400' : 'text-cyan-400'}`} />
              {powerLevel}
            </span>
          </div>

          {/* 3D Holographic Character Emblem */}
          <div className="flex justify-center my-3 sm:my-5">
            <motion.div
              animate={{
                y: [-4, 4, -4],
                rotateZ: isAmber ? [-1, 1, -1] : [1, -1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`w-20 h-20 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center relative border shadow-inner ${
                isAmber
                  ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-amber-400/40 text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
                  : 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-400/40 text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)]'
              }`}
            >
              <Icon className="w-10 h-10 sm:w-14 sm:h-14 drop-shadow-[0_0_12px_currentColor]" />
              
              {/* Spinning Cybernetic Orbit */}
              <div
                className={`absolute inset-0 rounded-2xl border border-dashed animate-[spin_10s_linear_infinite] pointer-events-none opacity-40 ${
                  isAmber ? 'border-amber-400' : 'border-cyan-400'
                }`}
              />
            </motion.div>
          </div>

          {/* Game Title & Description */}
          <div className="text-center mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-2xl font-black text-white font-display tracking-tight uppercase">
              {title}
            </h3>
            <p className="text-[11px] sm:text-xs text-zinc-400 font-sans mt-0.5">
              {subtitle}
            </p>
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/5 font-sans"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action CTA */}
          <a
            href="#register"
            className={`w-full py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold font-display flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isAmber
                ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            Enter {game} Slot
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Collaboration3D() {
  return (
    <section className="relative py-6 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden max-w-6xl mx-auto z-10">
      {/* Background Energy Rays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-cyan-500/10 blur-[100px] pointer-events-none" />

      <ScrollReveal>
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-cyan-500/15 border border-white/10 text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Dual Championship Crossover</span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-sans mt-2">
            Experience the ultimate collegiate collision of Free Fire adrenaline and BGMI tactical warfare in Dhamtari.
          </p>
        </div>
      </ScrollReveal>

      {/* 3D Dual Battle Cards Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center max-w-4xl mx-auto">
        {/* Left: Free Fire 3D Card */}
        <ScrollReveal delay={0.1}>
          <TiltCard
            game="Free Fire"
            badge="FF ESPORTS"
            title="Free Fire Duel"
            subtitle="Rapid Reflexes & Last Squad Standing"
            theme="amber"
            icon={Flame}
            tags={['Bermuda', 'Purgatory', 'Booyah', '4v4 Rush']}
            powerLevel="High Velocity Action"
          />
        </ScrollReveal>

        {/* Central 3D VS Emblem */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-14 h-14 rounded-full bg-zinc-950 border-2 border-white/20 text-white font-black font-display text-base flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.25)] relative"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-cyan-500 opacity-20 blur-sm animate-pulse" />
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-cyan-300">
              VS
            </span>
          </motion.div>
        </div>

        {/* Right: BGMI 3D Card */}
        <ScrollReveal delay={0.2}>
          <TiltCard
            game="BGMI"
            badge="BGMI ESPORTS"
            title="BGMI Battleground"
            subtitle="Strategic Rotations & Zone Domination"
            theme="cyan"
            icon={Gamepad2}
            tags={['Erangel', 'Miramar', 'BGIS Multiplier', '4v4 Tactical']}
            powerLevel="Tactical Combat"
          />
        </ScrollReveal>
      </div>

    </section>
  );
}
