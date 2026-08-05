/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Flame, MapPin, Phone, Clock, Instagram, Heart, Star, Compass } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-warm-espresso text-warm-cream border-t border-warm-espresso/15 pt-16 pb-8 relative overflow-hidden text-left">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-art-ochre/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-warm-sand/10">
          
          {/* SEC 1: COMPANY PRESENTATION */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2.5 bg-warm-sand/15 rounded-full border border-warm-sand/10">
                <Flame className="h-5 w-5 text-art-ochre animate-pulse" />
              </div>
              <span className="text-xl font-serif tracking-widest font-black text-white italic">MELTADO</span>
            </div>
            
            <p className="text-xs text-warm-cream/70 font-light font-sans max-w-sm leading-relaxed">
              Meltado is a standalone artisan bakery &amp; coffee spot based in East Delhi. We specialize in velvety, molten chocolate pours, cozy cheese toasties, and rich Arabica roasts. We make every day feel like a sweet meltdown.
            </p>

            <div className="pt-2 flex space-x-3">
              <a
                href="https://instagram.com/meltado_"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-warm-sand/10 hover:bg-warm-sand/20 hover:text-white rounded-full text-warm-cream/80 border border-warm-sand/10 transition-colors"
                title="Follow Meltado Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* SEC 2: QUICK INVENTORY SCHEMES */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif italic text-base font-bold text-white tracking-wide">The Menu Alchemy</h4>
            <ul className="space-y-2.5 text-xs text-warm-cream/70 font-light font-sans">
              <li className="hover:text-art-ochre transition-colors cursor-pointer">Specialty Sips &amp; Spain Lattes</li>
              <li className="hover:text-art-ochre transition-colors cursor-pointer">Stretchy Mozzarella Sourdoughs</li>
              <li className="hover:text-art-ochre transition-colors cursor-pointer">Volcano Waffles &amp; Molten Croissants</li>
              <li className="hover:text-art-ochre transition-colors cursor-pointer">Toasted S'ores Campfire Skillets</li>
            </ul>
          </div>

          {/* SEC 3: DELHI CONTACT INFO */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif italic text-base font-bold text-white tracking-wide">Hearth Location</h4>
            <ul className="space-y-3.5 text-xs text-warm-cream/70 font-sans font-light">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4.5 w-4.5 text-art-ochre mt-0.5 flex-shrink-0" />
                <span>Plot 4, Kiran Vihar, Karkardooma, New Delhi - 110092</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4.5 w-4.5 text-art-ochre flex-shrink-0" />
                <span>+91 70217 29810</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Clock className="h-4.5 w-4.5 text-art-ochre flex-shrink-0" />
                <span>12:00 PM – 12:00 AM (Open All Days)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-warm-cream/40 text-[11px] font-mono gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-2">
            <span>&copy; {currentYear} Meltado. All rights reserved.</span>
            <span className="hidden sm:inline text-warm-cream/20">|</span>
            <span className="flex items-center">
              Made for East Delhi with <Heart className="h-3 w-3 text-art-ochre fill-current mx-1 animate-pulse" /> &amp; Melted Fudge
            </span>
          </div>

          <div className="flex space-x-4">
            <span className="text-art-ochre font-bold uppercase tracking-widest text-[9px] bg-warm-sand/10 border border-warm-sand/10 px-3.5 py-1.5 rounded-full">
              STANDALONE BOUTIQUE
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
