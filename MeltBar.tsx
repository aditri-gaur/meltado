/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Check, Sparkles, Printer, Copy, RotateCcw, AlertCircle, RefreshCw } from 'lucide-react';
import { CustomOrderItem } from '../types';

export default function MeltBar() {
  const bases = [
    { name: 'Meltado Cocoa Mug', price: 140, calories: 180, image: '☕' },
    { name: 'Belgian Waffle Tower', price: 160, calories: 240, image: '🧇' },
    { name: 'Fresh Butter Croissant', price: 150, calories: 210, image: '🥐' },
    { name: 'Specialty Espresso Double', price: 120, calories: 10, image: '🧉' },
  ];

  const syrups = [
    { name: 'Molten Belgian Fudge', price: 50, calories: 120, color: '#451a03', hoverName: 'dark-fudge' },
    { name: 'Toasted Speculoos Praline', price: 40, calories: 110, color: '#ca8a04', hoverName: 'praline' },
    { name: 'Rich Caramelized Melt', price: 40, calories: 95, color: '#d97706', hoverName: 'caramel' },
    { name: 'Melted Fresh Mozzarella', price: 60, calories: 140, color: '#fef08a', hoverName: 'mozzarella' },
  ];

  const toppings = [
    { name: 'Toasted Marshmallows', price: 30, calories: 60 },
    { name: 'Crushed Biscoff Crumbs', price: 20, calories: 45 },
    { name: 'Salted Almond Brittle', price: 25, calories: 55 },
    { name: 'Madagascar Vanilla Gelato', price: 40, calories: 90 },
    { name: 'Glazed Berry Compote', price: 30, calories: 35 },
  ];

  const thermalStates = [
    { name: 'Steaming', desc: 'Served boiling hot, ideal for sips' },
    { name: 'Freshly Warmed', desc: 'Double-baked warm ovens, ideal for pastries' },
    { name: 'Chilled', desc: 'Smooth, cool, without melting ice' },
    { name: 'Iced', desc: 'On a mountain of crushed ice cubes' },
  ];

  // Config State
  const [selectedBase, setSelectedBase] = useState(bases[0]);
  const [selectedSyrup, setSelectedSyrup] = useState(syrups[0]);
  const [selectedToppings, setSelectedToppings] = useState<typeof toppings>([]);
  const [sweetness, setSweetness] = useState(75);
  const [thermal, setThermal] = useState('Freshly Warmed');
  
  // Simulation Outcome State
  const [isBaking, setIsBaking] = useState(false);
  const [activeTab, setActiveTab] = useState<'cook' | 'ticket'>('cook');
  const [generatedTicket, setGeneratedTicket] = useState<CustomOrderItem | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [baristaNote, setBaristaNote] = useState('');

  // Calculations
  const toppingPrices = selectedToppings.reduce((acc, current) => acc + current.price, 0);
  const totalPrice = selectedBase.price + selectedSyrup.price + toppingPrices;

  const toppingCalories = selectedToppings.reduce((acc, current) => acc + current.calories, 0);
  const totalCalories = selectedBase.calories + selectedSyrup.calories + toppingCalories;

  const handleToppingToggle = (topping: typeof toppings[0]) => {
    if (selectedToppings.some(t => t.name === topping.name)) {
      setSelectedToppings(selectedToppings.filter(t => t.name !== topping.name));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleCreateTicket = () => {
    setIsBaking(true);

    // Dynamic Barista advice generator based on choices
    let note = "Excellent selection! Warm Belgian fudge with speculoos creates an ultimate dessert. ";
    if (selectedSyrup.name.includes("Mozzarella")) {
      note = "Cheesy choice! We will melt the fresh mozzarella deep into the layers of your plate. ";
    }
    if (selectedToppings.length > 3) {
      note += "Note: A heavy loaded stack! Perfect for ultimate sweet cravings.";
    } else if (selectedBase.name.includes("Espresso")) {
      note += "We recommend taking this steaming hot to preserve the extraction quality.";
    } else {
      note += "Your pastry will be double heated in our premium deck oven for optimal flaky crunch.";
    }

    setTimeout(() => {
      const ticket: CustomOrderItem = {
        base: selectedBase.name,
        syrup: selectedSyrup.name,
        toppings: selectedToppings.map(t => t.name),
        sweetness: sweetness,
        heatLevel: thermal.toLowerCase().includes('steaming') ? 'steaming' : thermal.toLowerCase().includes('warm') ? 'warmed' : thermal.toLowerCase().includes('chilled') ? 'chilled' : 'iced',
        estimatedCalories: totalCalories,
        totalPrice: totalPrice,
        ticketNumber: `MT-${Math.floor(1000 + Math.random() * 9000)}`
      };
      
      setGeneratedTicket(ticket);
      setBaristaNote(note);
      setIsBaking(false);
      setActiveTab('ticket');
    }, 1500);
  };

  const resetAll = () => {
    setSelectedBase(bases[0]);
    setSelectedSyrup(syrups[0]);
    setSelectedToppings([]);
    setSweetness(75);
    setThermal('Freshly Warmed');
    setGeneratedTicket(null);
    setActiveTab('cook');
  };

  const copyTicketCode = () => {
    if (!generatedTicket) return;
    const descStr = `MELTADO CUSTOM TICKET: ${generatedTicket.ticketNumber}\nBase: ${generatedTicket.base}\nMelted Core: ${generatedTicket.syrup}\nToppings: ${generatedTicket.toppings.join(', ') || 'None'}\nSweetness: ${generatedTicket.sweetness}%\nTemp: ${thermal}\nTotal Price: ₹${generatedTicket.totalPrice}\nShow this to the Meltado barista in Delhi!`;
    
    navigator.clipboard.writeText(descStr).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <section id="meltbar" className="bg-warm-cream text-warm-espresso py-16 lg:py-24 relative border-b border-warm-espresso/10">
      <div className="absolute top-0 right-10 w-96 h-96 bg-art-ochre/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-art-ochre bg-art-ochre/10 px-4.5 py-2 rounded-full inline-block">
            Barista Lab
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-warm-espresso leading-none italic font-bold">
            The Melt Bar Creator
          </h2>
          <p className="text-warm-espresso/70 font-sans font-light text-sm sm:text-base max-w-2xl mx-auto">
            Do not limit your taste buds to static menu presets. Select your dessert canvas base, pour your warm chocolate core, stack hand-crushed roasted toppings, and build an artisan kitchen ticket.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <div className="bg-warm-sand/35 p-1.5 rounded-full border border-warm-espresso/10 flex space-x-2">
            <button
              onClick={() => setActiveTab('cook')}
              className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                activeTab === 'cook'
                  ? 'bg-warm-espresso text-warm-cream shadow-sm'
                  : 'text-warm-espresso/60 hover:text-warm-espresso'
              }`}
            >
              1. Build Creation
            </button>
            <button
              disabled={!generatedTicket}
              onClick={() => generatedTicket && setActiveTab('ticket')}
              className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                activeTab === 'ticket'
                  ? 'bg-warm-espresso text-warm-cream shadow-sm'
                  : 'text-warm-espresso/60 hover:text-warm-espresso disabled:opacity-40 disabled:cursor-not-allowed'
              }`}
            >
              2. Your Melt Ticket {generatedTicket && `(${generatedTicket.ticketNumber})`}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CONTEXT: STEP-BY-STEP CUSTOMIZER */}
          <div className="lg:col-span-7">
            {activeTab === 'cook' ? (
              <div className="bg-warm-sand/20 rounded-[36px] border border-warm-espresso/10 p-6 sm:p-8 space-y-8 text-left">
                
                {/* STEP 1: SELECT COFFEE / DESSERT BASE */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-art-ochre font-bold">STEP 01 //</span>
                    <span className="text-[10px] text-warm-espresso/55 font-mono uppercase tracking-widest">CHOOSE CANVAS BASE</span>
                  </div>
                  <h3 className="font-serif italic text-xl font-bold text-warm-espresso">Select Your Freshly Baked Base Canvas</h3>
                  <div className="grid grid-cols-2 gap-3.5">
                    {bases.map((base) => {
                      const isSelected = selectedBase.name === base.name;
                      return (
                        <button
                          key={base.name}
                          onClick={() => setSelectedBase(base)}
                          className={`p-4.5 rounded-[22px] text-left border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                            isSelected
                              ? 'bg-warm-espresso text-warm-cream border-warm-espresso shadow-md'
                              : 'bg-warm-cream border-warm-espresso/10 text-warm-espresso/70 hover:border-art-ochre/40'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2.5xl group-hover:scale-110 transition-transform">{base.image}</span>
                            <div>
                              <p className="font-bold text-xs truncate max-w-[130px]">{base.name}</p>
                              <p className={`text-[10px] font-mono ${isSelected ? 'text-warm-cream/70' : 'text-warm-espresso/50'}`}>₹{base.price} • {base.calories} Cal</p>
                            </div>
                          </div>
                          {isSelected && <Check className="h-4 w-4 text-art-ochre" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 2: CHOOSE MELTED CORE SYRUP */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-art-ochre font-bold">STEP 02 //</span>
                    <span className="text-[10px] text-warm-espresso/55 font-mono uppercase tracking-widest">CORE MELTED COATING</span>
                  </div>
                  <h3 className="font-serif italic text-xl font-bold text-warm-espresso">Choose Your Molten Core Fill &amp; Pour</h3>
                  <div className="grid grid-cols-2 gap-3.5">
                    {syrups.map((syrup) => {
                      const isSelected = selectedSyrup.name === syrup.name;
                      return (
                        <button
                          key={syrup.name}
                          onClick={() => setSelectedSyrup(syrup)}
                          className={`p-4.5 rounded-[22px] text-left border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-warm-espresso text-warm-cream border-warm-espresso shadow-md'
                              : 'bg-warm-cream border-warm-espresso/10 text-warm-espresso/70 hover:border-art-ochre/40'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span 
                              className="w-5.5 h-5.5 rounded-full block border border-white/20 shadow-inner" 
                              style={{ backgroundColor: syrup.color }}
                            />
                            <div>
                              <p className="font-bold text-xs truncate max-w-[130px]">{syrup.name}</p>
                              <p className={`text-[10px] font-mono ${isSelected ? 'text-warm-cream/70' : 'text-warm-espresso/50'}`}>₹{syrup.price} • {syrup.calories} Cal</p>
                            </div>
                          </div>
                          {isSelected && <Check className="h-4 w-4 text-art-ochre" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 3: STACK TOPPING CRUNCH */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-art-ochre font-bold">STEP 03 //</span>
                    <span className="text-[10px] text-warm-espresso/55 font-mono uppercase tracking-widest">STACK TOPPING LAYERINGS</span>
                  </div>
                  <h3 className="font-serif italic text-xl font-bold text-warm-espresso">Add Gourmet Topping Crunch (Optional)</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {toppings.map((tp) => {
                      const isSelected = selectedToppings.some(t => t.name === tp.name);
                      return (
                        <button
                          key={tp.name}
                          onClick={() => handleToppingToggle(tp)}
                          className={`px-4 py-2.5 text-xs font-semibold rounded-full border transition-all duration-300 cursor-pointer flex items-center space-x-2 ${
                            isSelected
                              ? 'bg-warm-espresso text-warm-cream border-warm-espresso font-bold shadow-sm'
                              : 'bg-warm-cream border-warm-espresso/10 text-warm-espresso/70 hover:bg-warm-sand/80 hover:border-art-ochre/30'
                          }`}
                        >
                          <span>{tp.name}</span>
                          <span className={`font-mono text-[10px] ${isSelected ? 'text-warm-cream/70' : 'text-warm-espresso/45'}`}>(+₹{tp.price})</span>
                          {isSelected && <Check className="h-3.5 w-3.5 inline-block ml-1 text-art-ochre" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 4: HEAT LEVEL & TEMPERATURE */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-art-ochre font-bold">STEP 04 //</span>
                    <span className="text-[10px] text-warm-espresso/55 font-mono uppercase tracking-widest">TEMPERATURE AND SWEETNESS</span>
                  </div>
                  <h3 className="font-serif italic text-xl font-bold text-warm-espresso">Heat Level & Comfort</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {thermalStates.map((state) => (
                      <button
                        key={state.name}
                        onClick={() => setThermal(state.name)}
                        className={`p-3.5 rounded-[18px] border text-center transition-all duration-300 cursor-pointer ${
                          thermal === state.name
                            ? 'bg-warm-espresso text-warm-cream border-warm-espresso font-semibold shadow-sm'
                            : 'bg-warm-cream border-warm-espresso/10 text-warm-espresso/70 hover:border-art-ochre/30'
                        }`}
                      >
                        <p className="text-xs font-bold">{state.name}</p>
                      </button>
                    ))}
                  </div>

                  {/* Sweetness index */}
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-warm-espresso/70">Custom Sweetness Index:</span>
                      <span className="font-mono text-art-ochre font-bold">{sweetness}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sweetness}
                      onChange={(e) => setSweetness(Number(e.target.value))}
                      className="w-full h-1 bg-warm-espresso/15 rounded-lg appearance-none cursor-pointer accent-art-ochre focus:outline-none"
                    />
                    <div className="flex justify-between text-[9px] text-warm-espresso/50 font-mono font-bold uppercase tracking-wider">
                      <span>0% (UNSWEETENED)</span>
                      <span>50% (MODERATE)</span>
                      <span>100% (INSANE INDULGENCE)</span>
                    </div>
                  </div>
                </div>

                {/* Submitting build request */}
                <div className="pt-4">
                  <button
                    onClick={handleCreateTicket}
                    disabled={isBaking}
                    className="w-full py-4.5 bg-warm-espresso text-warm-cream hover:bg-warm-espresso/95 text-xs font-bold uppercase tracking-[0.18em] rounded-full flex items-center justify-center space-x-2.5 cursor-pointer shadow-md transition-all active:scale-[0.98]"
                  >
                    {isBaking ? (
                      <>
                        <RefreshCw className="h-4.5 w-4.5 animate-spin text-art-ochre" />
                        <span>Baking Core Layers...</span>
                      </>
                    ) : (
                      <>
                        <Flame className="h-4.5 w-4.5 text-art-ochre animate-pulse" />
                        <span>Bake Digital Melt Ticket (₹{totalPrice})</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            ) : (
              /* TICKET VIEW SCREEN */
              <div className="bg-warm-cream text-warm-espresso rounded-[40px] border border-warm-espresso/15 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden text-left">
                
                {/* Top torn slip pattern styling */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-warm-sand/50 via-warm-sand to-warm-sand/50 flex space-x-0.5 overflow-hidden">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-warm-cream rotate-45 transform -translate-y-2 flex-shrink-0" />
                  ))}
                </div>

                {/* Brand receipt header */}
                <div className="text-center pt-4 border-b border-dashed border-warm-espresso/20 pb-6 space-y-1">
                  <span className="font-serif text-3xl font-black tracking-widest italic text-warm-espresso">MELTADO</span>
                  <p className="text-[9px] text-warm-espresso/60 font-mono font-bold uppercase tracking-wider">PLOT 4, KIRAN VIHAR, KARKARDOOMA, NEW DELHI</p>
                  <p className="text-[9px] text-warm-espresso/60 font-mono font-bold uppercase tracking-wider">PHONE: +91 70217 29810</p>
                  <span className="inline-block bg-warm-espresso text-warm-cream font-mono text-xs font-bold px-4 py-1.5 rounded-full mt-3">
                    {generatedTicket?.ticketNumber}
                  </span>
                </div>

                {/* Structured details of receipt */}
                <div className="space-y-4 py-2 text-warm-espresso/80 text-xs">
                  <div className="flex justify-between font-mono">
                    <span className="text-warm-espresso/50 font-bold">TIMESTAMP:</span>
                    <span>{new Date().toLocaleDateString('en-US')} @ {new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-warm-espresso/50 font-bold">KITCHEN SERVICE:</span>
                    <span>{thermal.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-warm-espresso/50 font-bold">SWEETNESS SCALE:</span>
                    <span>{generatedTicket?.sweetness}% INDEX</span>
                  </div>

                  {/* Core Items lists and dynamic calculations */}
                  <div className="border-t border-b border-dashed border-warm-espresso/20 py-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-warm-espresso">{generatedTicket?.base}</p>
                        <p className="text-[10px] text-warm-espresso/55">Premium Bake Base Canvas</p>
                      </div>
                      <span className="font-mono font-semibold">₹{selectedBase.price}.00</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-warm-espresso">{generatedTicket?.syrup}</p>
                        <p className="text-[10px] text-warm-espresso/55">Molten Core Secret Coating Pour</p>
                      </div>
                      <span className="font-mono font-semibold">₹{selectedSyrup.price}.00</span>
                    </div>

                    {selectedToppings.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <p className="text-[10px] font-bold text-warm-espresso/50 uppercase tracking-wider">Top Spreads &amp; Toppings:</p>
                        {selectedToppings.map((t) => (
                          <div key={t.name} className="flex justify-between items-center pl-2">
                            <span className="text-warm-espresso/85 font-light">• {t.name}</span>
                            <span className="font-mono text-warm-espresso/70">₹{t.price}.00</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Calculations breakdown block */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-[11px] text-warm-espresso/60">
                      <span>ESTIMATED DOCK CALORIES:</span>
                      <span className="font-mono">{generatedTicket?.estimatedCalories} CAL</span>
                    </div>
                    <div className="flex justify-between font-black text-sm text-warm-espresso pt-2 border-t border-warm-espresso/10">
                      <span>TOTAL PRICE (DOCK NET):</span>
                      <span className="font-mono">₹{generatedTicket?.totalPrice}.00</span>
                    </div>
                  </div>

                </div>

                {/* Notes from head barista */}
                <div className="bg-art-ochre/10 border border-art-ochre/20 rounded-[20px] p-4 text-xs text-art-ochre space-y-1.5">
                  <div className="flex items-center space-x-1.5 font-bold">
                    <Sparkles className="h-4 w-4 text-art-ochre" />
                    <span>Barista Sommelier Secret Note:</span>
                  </div>
                  <p className="font-light text-[11px] leading-relaxed text-warm-espresso/80 font-sans italic">{baristaNote}</p>
                </div>

                {/* Action buttons on ticket receipt details */}
                <div className="flex flex-col sm:flex-row gap-2 pt-4">
                  <button
                    onClick={copyTicketCode}
                    className="flex-grow py-3.5 bg-warm-espresso hover:bg-warm-espresso/95 text-warm-cream font-bold text-[10px] uppercase tracking-[0.2em] rounded-full flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    {copySuccess ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    <span>{copySuccess ? 'Copied Order Code!' : 'Copy Ticket Code'}</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="px-4.5 py-3.5 border border-warm-espresso/15 text-warm-espresso/70 hover:text-warm-espresso hover:bg-warm-sand/70 rounded-full cursor-pointer flex justify-center items-center"
                    title="Print Ticket"
                  >
                    <Printer className="h-4.5 w-4.5" />
                  </button>

                  <button
                    onClick={resetAll}
                    className="px-4.5 py-3.5 border border-warm-espresso/15 text-warm-espresso/70 hover:text-warm-espresso hover:bg-warm-sand/70 rounded-full cursor-pointer flex justify-center items-center"
                    title="Reset Simulator"
                  >
                    <RotateCcw className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Note explaining what to do with the ticket */}
                <div className="flex items-start space-x-2 text-[10px] text-warm-espresso/60 pt-2 leading-tight font-sans">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-art-ochre" />
                  <p>Meltado operates as a walk-in specialty shop. Take a screenshot or copy this custom ticket code and show it on your phone to our actual Delhi team for premium preparation!</p>
                </div>

              </div>
            )}
          </div>

          {/* RIGHT CONTEXT: DYNAMIC LIVE PREVIEW CANVAS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-warm-sand/20 rounded-[36px] p-6 border border-warm-espresso/10 text-center space-y-6 relative overflow-hidden">
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase font-bold text-art-ochre bg-art-ochre/10 px-3.5 py-2 rounded-full inline-block border border-art-ochre/25">
                LIVE COMPILING SENSORY CANVAS
              </span>
              
              {/* Outer Plate mockup */}
              <div className="relative min-h-[290px] w-full bg-warm-sand/35 rounded-[28px] flex justify-center items-center border border-warm-espresso/10 p-6 overflow-hidden">
                
                {/* Micro atmospheric details */}
                <div className="absolute top-3 left-3 bg-warm-espresso text-warm-cream/80 font-mono text-[9px] px-2.5 py-0.5 rounded-full border border-warm-espresso/10 shadow-sm">
                  REFRESH // {selectedBase.name.substring(0, 3).toUpperCase()}-{selectedSyrup.hoverName.toUpperCase()}
                </div>

                {/* The composite custom dessert layer graphics built purely with CSS animations */}
                <div className="relative flex flex-col items-center justify-center space-y-4">
                  
                  {/* Floating base animation */}
                  <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="relative z-10 scale-125"
                  >
                    {/* Render Base character or icon */}
                    <span className="text-8xl filter drop-shadow-[0_10px_15px_rgba(217,119,6,0.12)] block select-none">
                      {selectedBase.image}
                    </span>

                    {/* Syrup cascade illustration layout */}
                    <AnimatePresence>
                      <motion.div
                        key={selectedSyrup.name}
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 0.85, scaleY: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 top-1/3 rounded-full blur-[2px] opacity-75 origin-top pointer-events-none"
                        style={{ 
                           backgroundColor: selectedSyrup.color,
                           height: '24px',
                           mixBlendMode: 'multiply'
                        }}
                      />
                    </AnimatePresence>

                    {/* Animated Steam lines if base is hot */}
                    {thermal.toLowerCase().includes('steaming') && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex space-x-2 pointer-events-none">
                        {[1, 2, 3].map((s) => (
                          <motion.div
                            key={s}
                            animate={{ y: [10, -30], opacity: [0, 0.6, 0] }}
                            transition={{ repeat: Infinity, duration: 2 + s * 0.4, delay: s * 0.3 }}
                            className="w-1 h-12 bg-white/40 rounded-full blur-[4px]"
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>

                  {/* Toppings items visualization pills */}
                  <div className="flex flex-wrap gap-1.5 justify-center max-w-[200px] absolute -bottom-4 z-20">
                    {selectedToppings.map((tp) => (
                      <motion.span
                        key={tp.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[9px] font-mono font-bold bg-art-ochre/10 border border-art-ochre/25 text-art-ochre px-2.5 py-0.5 rounded-full"
                      >
                        +{tp.name.split(' ')[0]}
                      </motion.span>
                    ))}
                  </div>

                </div>

              </div>

              {/* Composition labels and values list */}
              <div className="bg-warm-cream rounded-[24px] p-5.5 text-xs font-mono border border-warm-espresso/10 space-y-2.5 text-left shadow-sm">
                <div className="flex justify-between text-warm-espresso/60 font-semibold">
                  <span>BASE SELECTION:</span>
                  <span className="text-warm-espresso font-bold">{selectedBase.name}</span>
                </div>
                <div className="flex justify-between text-warm-espresso/60 font-semibold">
                  <span>MOLTEN POUR LAYER:</span>
                  <span className="text-warm-espresso font-bold">{selectedSyrup.name}</span>
                </div>
                <div className="flex justify-between text-warm-espresso/60 font-semibold">
                  <span>TOPPING STACKED:</span>
                  <span className="text-warm-espresso font-bold">{selectedToppings.length} ITEMS</span>
                </div>
                <div className="flex justify-between text-warm-espresso/60 font-semibold">
                  <span>DOCK HEAT INDEX:</span>
                  <span className="text-art-ochre font-bold uppercase">{thermal}</span>
                </div>
                <div className="flex justify-between text-warm-espresso/60 border-t border-warm-espresso/10 pt-2.5 mt-2.5 font-semibold">
                  <span>EST. TOTAL KCALS:</span>
                  <span className="text-warm-espresso font-black">{totalCalories} KCAL</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
