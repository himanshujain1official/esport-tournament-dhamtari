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
import { MapPin, Phone, Globe, MessageCircle } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 overflow-x-hidden w-full text-gray-900 font-sans">
      <Navbar />
      <Hero />
      <Collaboration3D />
      <EventOverview />
      <GameShowcase />
      <Rules />
      <PrizePool />
      <FAQ />
      <RegistrationForm />

      <footer className="pt-10 sm:pt-14 pb-8 border-t border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
            {/* Logo / Branding */}
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-sm overflow-hidden">
                <img src="/logo.jpg" alt="Yuva E Arena Logo" className="w-full h-full object-contain" />
              </div>
              <h4 className="text-black font-bold text-base sm:text-lg mb-1.5 font-display">Yuva E Arena Dhamtari</h4>
              <p className="text-gray-600 text-xs font-sans leading-relaxed mb-3">
                The premier collegiate gaming tournament platform for Dhamtari, bringing together the finest mobile esports talent in Free Fire and BGMI.
              </p>
              <a
                href="https://chat.whatsapp.com/C9Dtsv1jPgpFTN6dtx8sGY"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium hover:bg-emerald-100 transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                Join WhatsApp Community
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 text-blue-600 shadow-sm">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-black font-semibold mb-0.5 text-xs">Tournament Venue</h4>
                  <p className="text-gray-600 text-xs font-sans">
                    BCS Govt. PG College<br />Dhamtari, Chhattisgarh 493773
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 text-blue-600 shadow-sm">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-black font-semibold mb-0.5 text-xs">Organizer Helpline</h4>
                  <p className="text-gray-600 text-xs font-sans">
                    Student Sports & Esports Desk<br />  +91 93037 05828  <br/> +91 706 781 4389
                  </p>
                </div>
              </div>
            </div>
    
            {/* Links / Location */}
            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 text-blue-600 shadow-sm">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-black font-semibold mb-0.5 text-xs">Official Esport Social Media</h4>
                  <h5 className="text-gray-500 text-xs font-sans">Follow us for updates, announcements, and highlights.</h5>
                  <a
                    href="https://www.instagram.com/yuva_e_arena?stkn=MTY4cnp0ZTJsejBxZQ=="
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 text-xs font-sans hover:text-blue-600 transition-colors"
                  >
                    Instagram
                  </a> 
                  <br />
                  <a
                    href="https://www.facebook.com/share/19WevM45et/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 text-xs font-sans hover:text-blue-600 transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 text-blue-600 shadow-sm">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-black font-semibold text-xs">College Map Location</h4>
                  <a 
                    href="https://maps.app.goo.gl/WoYLXXEait9mD8AC9?g_st=ac"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 text-xs font-sans hover:text-blue-600 transition-colors underline underline-offset-2"
                  >
                    College Location on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-400 text-[11px] border-t border-gray-200 pt-5 font-sans flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>&copy; {new Date().getFullYear()} BCS Govt. PG College Esports Tournament Committee. All rights reserved.</p>
            <p className="text-gray-400">Dhamtari, Chhattisgarh</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
