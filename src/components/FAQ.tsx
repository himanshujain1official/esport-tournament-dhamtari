import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Who is eligible to participate in this tournament?',
      a: 'The tournament is open for all.',
    },
    {
      q: 'Is there any registration fee?',
      a: 'NO, the tournament is completely free to participate in. There are no hidden charges or fees.',
    },
    {
      q: 'Are PC Emulators, iPads, or Triggers allowed?',
      a: 'Emulators (like Bluestacks, Gameloop, LDPlayer) and external gaming hardware/triggers are strictly forbidden. Only mobile smartphones (Android & iOS) are allowed.',
    },
    {
      q: 'How will Custom Room ID & Password be shared?',
      a: 'Room IDs and passwords will be shared directly with registered Squad Captains via WhatsApp 15 to 30 minutes before your assigned match slot.',
    },
    {
      q: 'What is the squad size required?',
      a: 'Each team must have 4 main players. You may also specify 1 substitute player during registration.',
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
    <section id="faq" className="py-8 sm:py-14 md:py-16 px-4 sm:px-6 border-t border-gray-200 bg-white">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-sm">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              Got Questions?
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto">
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
                      ? 'border-blue-300 bg-blue-50/40 shadow-sm'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full py-3 px-4 sm:py-3.5 sm:px-5 text-left flex items-center justify-between gap-3 focus:outline-none cursor-pointer"
                  >
                    <span className="font-semibold text-gray-900 text-xs sm:text-sm font-sans">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-gray-500"
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
                        <div className="px-4 pb-3.5 sm:px-5 sm:pb-4 pt-1 text-gray-600 text-[11px] sm:text-xs font-sans leading-relaxed border-t border-gray-200">
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
