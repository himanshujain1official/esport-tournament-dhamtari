import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Who is eligible to participate in this tournament?',
      a: 'The tournament is open to all students of verified college students. A valid College Student ID card must be presented if requested.',
    },
    {
      q: 'Is there any registration fee?',
      a: 'Yes, there is a nominal registration fee of ₹40/- per squad to cover administrative costs and tournament organization.',
    },
    {
      q: 'How to pay the registration fee?',
      a: 'The registration fee can be paid offline at the tournament venue at the time of verification, so please ensure your squad is present for verification before the match.',
    },
    {
      q: 'Are PC Emulators, iPads, or Triggers allowed?',
      a: 'Emulators (like Bluestacks, Gameloop, LDPlayer) and external gaming hardware/triggers are strictly forbidden. Only mobile smartphones (Android & iOS) are allowed.',
    },
    {
      q: 'How will Custom Room ID & Password be shared?',
      a: 'Room IDs and passwords will be shared directly with registered Squad Captains via WhatsApp and SMS 15 to 30 minutes before your assigned match slot.',
    },
    {
      q: 'What is the squad size required?',
      a: 'Each team must have 4 main players. You may also specify 1 optional substitute player during registration.',
    },
    {
      q: 'What should we do if our team arrives late?',
      a: 'Squads must enter the custom lobby at least 5 minutes prior to match start. Late teams will forfeit their slot to preserve tournament schedule integrity.',
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-8 sm:py-14 md:py-16 px-4 sm:px-6 border-t border-white/5 bg-[#09090b]">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5">
              <HelpCircle className="w-3.5 h-3.5" />
              Got Questions?
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-md mx-auto">
              Everything you need to know about tournament participation, rules, and match rooms.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={index * 0.04}>
                <div
                  className={`border rounded-xl sm:rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-amber-500/40 bg-zinc-900/60'
                      : 'border-white/5 bg-zinc-900/20 hover:border-white/15'
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full py-3 px-4 sm:py-3.5 sm:px-5 text-left flex items-center justify-between gap-3 focus:outline-none cursor-pointer"
                  >
                    <span className="font-semibold text-white text-xs sm:text-sm font-sans">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-zinc-400"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 pb-3.5 sm:px-5 sm:pb-4 pt-1 text-zinc-400 text-[11px] sm:text-xs font-sans leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
