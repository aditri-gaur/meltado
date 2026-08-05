/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Coffee, Flame, MessageSquare, CalendarDays, Instagram, Award } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const navItems = [
    { id: 'menu', name: 'Gourmet Menu', icon: Coffee },
    { id: 'meltbar', name: 'The Melt Bar', icon: Flame },
    { id: 'barista', name: 'AI Barista', icon: MessageSquare },
    { id: 'guestbook', name: 'Community Hub', icon: CalendarDays },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-warm-cream/95 backdrop-blur-md border-b border-warm-espresso/10 text-warm-espresso shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo brand with Est. 2021 detail from theme HTML */}
          <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => onNavigate('hero')}>
            <div className="p-2 bg-art-ochre/10 rounded-full group-hover:scale-105 transition-transform flex items-center justify-center">
              <Flame className="h-5 w-5 text-art-ochre animate-pulse" />
            </div>
            <div>
              <span id="brand-title" className="text-2xl font-serif tracking-tight text-warm-espresso font-bold italic block">
                Meltado
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] opacity-60 font-sans font-bold block -mt-1">
                Karkardooma, Delhi
              </span>
            </div>
          </div>

          {/* Desktop Navigation using uppercase/high tracking */}
          <nav className="hidden md:flex space-x-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] transition-all ${
                    isActive
                      ? 'bg-warm-espresso text-warm-cream shadow-sm'
                      : 'text-warm-espresso/70 hover:text-warm-espresso hover:bg-warm-sand/50'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Location details and Instagram link */}
          <div className="flex items-center space-x-3">
            <a
              href="https://instagram.com/meltado_"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-warm-espresso/70 hover:text-art-ochre hover:bg-warm-sand/50 rounded-full transition-all"
              title="Follow Meltado Instagram"
            >
              <Instagram className="h-4.5 w-4.5" />
            </a>
            
            <button
              onClick={() => onNavigate('guestbook')}
              className="px-5 py-2.5 bg-warm-espresso text-warm-cream rounded-full hover:bg-warm-espresso/90 text-[10px] font-bold uppercase tracking-[0.2em] cursor-pointer transition-colors"
            >
              Book Table
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
