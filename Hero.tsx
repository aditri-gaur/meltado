/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Instagram, Heart, Star, Flame, ChevronRight, Award } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [currentTimeDelhi, setCurrentTimeDelhi] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const updateDelhiTime = () => {
      // Calculate India Standard Time (UTC+5:30)
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istTime = new Date(utc + 3600000 * 5.5);
      
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      
      // Format 12-hour clock
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setCurrentTimeDelhi(`${formattedHours}:${formattedMinutes} ${ampm} (IST)`);

      // Meltado open hours: 12:00 PM (12) to 12:00 AM (24 or 0)
      if (hours >= 12 && hours < 24) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    updateDelhiTime();
    const interval = setInterval(updateDelhiTime, 30000); // update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-warm-cream text-warm-espresso py-16 lg:py-28 border-b border-warm-espresso/10">
      {/* Decorative Warm Ochre background accents */}
      <div className="absolute top-0 left-1/4 w-[450px] h-[450px] rounded-full bg-art-ochre/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40%] h-80 bg-art-ochre/5 -z-10 rounded-tl-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Presentation Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            
            {/* Elegant Header Tagline inspired by original HTML/design */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <span className="text-[10px] tracking-[0.2em] font-bold uppercase opacity-60">Est. 2021</span>
              <span className="h-[1px] w-8 bg-warm-espresso/30"></span>
              <span className="text-[10px] tracking-[0.2em] font-bold uppercase opacity-60">Karkardooma, Delhi</span>
            </motion.div>

            {/* Huge artistic font-serif heading & tagline */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-7xl sm:text-8xl lg:text-[110px] leading-[0.85] font-serif tracking-tighter italic text-warm-espresso"
              >
                Meltado
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl sm:text-2xl font-serif text-art-ochre italic max-w-lg opacity-95 leading-snug"
              >
                A sanctuary for slow-poured coffee &amp; hand-tempered chocolate arts.
              </motion.p>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-warm-espresso/80 text-sm sm:text-base max-w-xl font-sans font-light leading-relaxed"
            >
              Step into our sensory realm in East Delhi. We’ve baked this digital space purely to let you touch, taste, customize, and secure your premium pairings of slow-poured Arabica, warm campfire s’mores, and molten lava croissants. Standalone, artistic, and completely artisan-led.
            </motion.p>

            {/* Practical Quick Info Grid - Framed in subtle borders */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 text-xs font-sans"
            >
              <div className="flex items-center space-x-3 bg-warm-sand/40 p-3.5 rounded-2xl border border-warm-espresso/5 hover:border-art-ochre/20 transition-all">
                <MapPin className="h-4.5 w-4.5 text-art-ochre flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-warm-espresso">Hearth Location</h4>
                  <p className="text-warm-espresso/60 text-[11px]">Plot 4, Kiran Vihar, Karkardooma, Delhi</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-warm-sand/40 p-3.5 rounded-2xl border border-warm-espresso/5 hover:border-art-ochre/20 transition-all">
                <Phone className="h-4.5 w-4.5 text-art-ochre flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-warm-espresso">Request Hotline</h4>
                  <p className="text-warm-espresso/60 text-[11px]">+91 70217 29810</p>
                </div>
              </div>
            </motion.div>

            {/* Dual stats counter directly matching layout specs in HTML */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-6 flex gap-12 items-center"
            >
              <div className="flex flex-col text-left">
                <span className="text-4xl font-serif italic text-warm-espresso">4.7</span>
                <span className="text-[9px] uppercase tracking-widest text-warm-espresso/60 font-bold">1,245 Google Reviews</span>
              </div>
              <div className="h-12 w-[1px] bg-warm-espresso/20"></div>
              <div className="flex flex-col text-left">
                <span className="text-4xl font-serif italic text-warm-espresso">12—12</span>
                <span className="text-[9px] uppercase tracking-widest text-warm-espresso/60 font-bold">Open Daily IST</span>
              </div>
            </motion.div>

            {/* Action CTAs in pill layouts with uppercase styles */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-6"
            >
              <button
                onClick={() => onNavigate('menu')}
                className="px-8 py-4.5 bg-warm-espresso text-warm-cream hover:bg-warm-espresso/90 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-md flex items-center gap-3 transition-colors cursor-pointer"
              >
                <span>Order Gourmet Menu</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigate('meltbar')}
                className="px-8 py-4.5 border-2 border-warm-espresso/80 text-warm-espresso hover:bg-warm-sand/50 rounded-full font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <Flame className="h-4 w-4 text-art-ochre animate-pulse" />
                <span>Melt Customizer</span>
              </button>
            </motion.div>
          </div>

          {/* Graphical Image/Interactive column featuring beautiful Oval Masks & Dashed Borders */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Decorative dashed element matching layout */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full border-2 border-art-ochre border-dashed opacity-40 animate-spin-slow pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[420px] aspect-[4/5] sm:aspect-[3/4] bg-warm-espresso rounded-t-full rounded-b-[180px] overflow-hidden shadow-2xl mx-auto border-4 border-warm-cream"
            >
              {/* Main atmospheric imagery */}
              <img 
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600" 
                alt="Bespoke Specialty Latte cup sitting on wood table" 
                className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.05]"
                referrerPolicy="no-referrer"
              />

              {/* Absolute glassmorphic badge for live status info (matching warm dark look) */}
              <div className="absolute top-6 right-6 bg-warm-espresso/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-warm-cream/10 text-[10px] font-mono space-y-1">
                <div className="flex items-center space-x-2 justify-end">
                  <span className={`h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                  <span className="font-bold text-warm-cream uppercase tracking-wider">{isOpen ? 'OPEN FOR INDULGENCE' : 'WE ARE CLOSED'}</span>
                </div>
                <div className="text-right text-warm-cream/60">
                  Delhi Time: <span className="text-art-ochre font-bold">{currentTimeDelhi || 'Loading...'}</span>
                </div>
              </div>

              {/* Absolute overlay detailing reviews, customized in premium look */}
              <div className="absolute bottom-6 left-6 right-6 bg-warm-espresso/95 backdrop-blur-md p-4.5 rounded-3xl border border-warm-cream/10 text-xs flex justify-between items-center text-warm-cream">
                <div className="space-y-1 text-left">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-art-ochre text-art-ochre" />
                    ))}
                    <span className="font-black ml-1.5 text-white">4.7</span>
                  </div>
                  <p className="text-warm-cream/80 text-[11px] leading-snug italic">"The molten sourdough toast is absolute art!"</p>
                </div>
                <div className="text-right flex flex-col justify-center items-end bg-warm-cream/10 px-3 py-2 rounded-xl">
                  <span className="text-xs font-bold text-art-ochre">7.2K+</span>
                  <span className="text-[8px] text-warm-cream/60 tracking-widest font-mono uppercase">Fans</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
