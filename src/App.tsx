/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Collaboration3D } from './components/Collaboration3D';
import { EventOverview } from './components/EventOverview';
import { GameShowcase } from './components/GameShowcase';
import { Rules } from './components/Rules';
import { PrizePool } from './components/PrizePool';
import { FAQ } from './components/FAQ';
import { RegistrationForm } from './components/RegistrationForm';
import { MapPin, Phone, Globe, Shield, MessageCircle } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#09090b] selection:bg-amber-500/30 overflow-x-hidden w-full text-white font-sans">
      <Navbar />
      <Hero />
      <Collaboration3D />
      <EventOverview />
      <GameShowcase />
      <Rules />
      <PrizePool />
      <FAQ />
      <RegistrationForm />

      <footer className="pt-10 sm:pt-14 pb-8 border-t border-white/5 bg-[#060608]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
            {/* Logo / Branding */}
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-900 border border-white/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-inner">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              </div>
              <h4 className="text-white font-bold text-base sm:text-lg mb-1.5 font-display">BCS Esports Dhamtari</h4>
              <p className="text-zinc-400 text-xs font-sans leading-relaxed mb-3">
                The premier collegiate gaming tournament platform for Dhamtari, bringing together the finest mobile esports talent in Free Fire and BGMI.
              </p>
              <a
                href="https://chat.whatsapp.com/Cg0q1d5T38t1KQUSFn7cfc"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium hover:bg-emerald-600/30 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Join WhatsApp Group
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-0.5 text-xs">Tournament Venue</h4>
                  <p className="text-zinc-400 text-xs font-sans">
                    BCS Govt. PG College<br />Dhamtari, Chhattisgarh 493773
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-0.5 text-xs">Organizer Helpline</h4>
                  <p className="text-zinc-400 text-xs font-sans">
                    Student Sports & Esports Desk<br />+91 706 781 4389 <br/> +91 93037 05828
                  </p>
                </div>
              </div>
            </div>
    
            {/* Links / Location */}
            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-0.5 text-xs">Official College Portal</h4>
                  <a
                    href="https://bcspgcdmt.com/#/home"
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-400 text-xs font-sans hover:text-amber-400 transition-colors"
                  >
                    https://bcspgcdmt.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-0.5 text-xs">College Map Location</h4>
                  <a 
                    href="https://maps.app.goo.gl/WoYLXXEait9mD8AC9?g_st=ac"
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-400 text-xs font-sans hover:text-amber-400 transition-colors underline underline-offset-2"
                  >
                    College Location on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-zinc-500 text-[11px] border-t border-white/5 pt-5 font-sans flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>&copy; {new Date().getFullYear()} BCS Govt. PG College Esports Tournament Committee. All rights reserved.</p>
            <p className="text-zinc-600">Dhamtari, Chhattisgarh</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
