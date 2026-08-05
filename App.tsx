/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import MeltBar from './components/MeltBar';
import AIBarista from './components/AIBarista';
import CommunityHub from './components/CommunityHub';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
    
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      // Offset scrolling slightly to account for the sticky 16px header
      const offset = 64;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="meltado-app-container" className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-amber-600 selection:text-stone-900 scroll-smooth">
      {/* Dynamic Header */}
      <Navbar onNavigate={handleNavigation} activeSection={activeSection} />

      {/* Main Sections */}
      <main id="meltado-main-content">
        
        {/* Hero Section */}
        <Hero onNavigate={handleNavigation} />

        {/* Dynamic Gourmet Catalog */}
        <section id="menu">
          <MenuSection />
        </section>

        {/* The "Melt Bar" Drink & Desert Customizer */}
        <section id="meltbar">
          <MeltBar />
        </section>

        {/* AI Barista Pairings Guru */}
        <section id="barista">
          <AIBarista />
        </section>

        {/* Live Reservation and Review Hub */}
        <section id="guestbook">
          <CommunityHub />
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
