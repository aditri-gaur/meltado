/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Coffee, Sparkles, MessageSquareCode, ShieldAlert, Bot, HelpCircle, ArrowRight } from 'lucide-react';
import { AIBaristaMessage } from '../types';

export default function AIBarista() {
  const [messages, setMessages] = useState<AIBaristaMessage[]>([
    {
      id: 'welcome',
      sender: 'barista',
      text: "Namaste! Welcome to Meltado's sensory hearth. I'm your AI Head Barista! 🧑‍🍳☕\n\nI live here in your browser and on our server, dreaming up pairings of rich Arabica espresso, double-roasted hazelnut core flows, and toasted campfire s'mores. What flavor profile or mood are you craving in Delhi today?",
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggestions to guide users
  const suggestions = [
    { label: "Pair me with a Cheese Melt!", prompt: "What specialty drink couples best with your Ultimate Sourdough Cheese Melt?" },
    { label: "Give me something cold & sweet", prompt: "I am in the mood for something icy cold, sweet, and chocolaty. What do you recommend?" },
    { label: "Meltado Hot Cocoa secrets?", prompt: "Tell me the story and ingredients behind the signature Meltado Hot Cocoa." },
    { label: "Late-night treat in Delhi", prompt: "I want a perfect late-night treat pairing. Recommend a combo from the menu." }
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: AIBaristaMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/barista/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      if (!response.ok) {
        throw new Error('Our espresso machine is steaming up. API Error.');
      }

      const data = await response.json();
      
      const baristaMsg: AIBaristaMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'barista',
        text: data.text || "I was just dreaming of our caramelized waffle crunch... what kind of flavor match can we make?",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, baristaMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: AIBaristaMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'barista',
        text: "My roaster's boiler took a quick heat break! But visually speaking, I highly recommend our signature combination: pair the rich, molten Meltado Hot Cocoa with the warm Cookie-Dough Lava Croissant. 🥐🍫",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="barista" className="bg-warm-sand/35 py-16 lg:py-24 text-warm-espresso border-t border-b border-warm-espresso/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-art-ochre bg-art-ochre/10 px-4.5 py-2 rounded-full inline-block">
            AI Coffee Parlare
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-warm-espresso leading-none italic font-bold">
            Consult the Melted Head Sommelier
          </h2>
          <p className="text-warm-espresso/70 font-sans font-light text-sm sm:text-base max-w-2xl mx-auto">
            Need pairing guidelines, or curious which specialty brew sets off your sourdough cheese pull? Ask recommendations or recipe secrets from our virtual companion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* SEC 1: DISCOVER INSTRUCTIONS & TIPS */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="bg-warm-espresso text-warm-cream p-6 sm:p-8 rounded-[36px] text-left border border-warm-espresso/10 flex flex-col justify-between h-full shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-art-ochre/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-4">
                <div className="p-3 bg-warm-sand/15 w-fit rounded-full border border-warm-sand/10">
                  <Coffee className="h-6 w-6 text-art-ochre" />
                </div>
                <h3 className="font-serif italic text-xl font-bold text-white">How I help you:</h3>
                <ul className="space-y-4 text-xs text-warm-cream/80 font-sans font-light leading-relaxed">
                  <li className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 text-art-ochre flex-shrink-0 mt-0.5" />
                    <span>Recommend savory &amp; sweet pairings from Meltado's Delhi database.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 text-art-ochre flex-shrink-0 mt-0.5" />
                    <span>Explain artisanal extraction notes for Arabica coffees versus Spain lattes.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 text-art-ochre flex-shrink-0 mt-0.5" />
                    <span>Translate your mood (e.g. cozy rainy Delhi evening) into a decadent order.</span>
                  </li>
                </ul>
              </div>

              {/* Suggestions shortcuts stack */}
              <div className="pt-8 space-y-3">
                <p className="text-[9px] uppercase font-mono tracking-[0.15em] text-art-ochre font-bold">Suggested Quick Queries:</p>
                <div className="flex flex-col gap-2.5">
                  {suggestions.map((sug) => (
                    <button
                      key={sug.label}
                      onClick={() => handleSendMessage(sug.prompt)}
                      className="px-4.5 py-3.5 bg-warm-sand/10 hover:bg-warm-sand/15 text-[11px] font-medium rounded-full border border-warm-sand/15 text-left text-warm-cream transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span className="truncate max-w-[210px]">{sug.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-art-ochre" />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* SEC 2: MASTER CHAT TERMINAL */}
          <div className="lg:col-span-8 flex flex-col justify-between h-[540px] bg-warm-cream rounded-[36px] border border-warm-espresso/10 shadow-lg overflow-hidden relative">
            
            {/* Header profile block */}
            <div className="bg-warm-espresso text-warm-cream px-6 py-4 flex items-center justify-between border-b border-warm-espresso/10">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-warm-sand/15 rounded-full relative mr-1">
                  <Bot className="h-5 w-5 text-warm-cream animate-pulse" />
                  <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-emerald-400 border border-warm-espresso" />
                </div>
                <div className="text-left">
                  <h4 className="font-serif font-black text-warm-cream text-base italic">The Melted Head Sommelier</h4>
                  <p className="text-[9px] text-warm-cream/50 font-mono tracking-[0.15em] uppercase">MELTADO SPECIALTY GURU</p>
                </div>
              </div>
              <span className="text-[9px] bg-warm-sand/10 text-art-ochre border border-warm-sand/10 font-mono px-3.5 py-1.5 rounded-full uppercase tracking-wider font-bold">
                POWERED BY GEMINI 1.5
              </span>
            </div>

            {/* Bubble logs body scrollable */}
            <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-warm-sand/15">
              {messages.map((m) => {
                const isBarista = m.sender === 'barista';
                return (
                  <div
                    key={m.id}
                    className={`flex items-start space-x-2.5 ${!isBarista ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    {/* Character/User Icons bubble */}
                    <div className={`p-2 rounded-full text-xs font-mono font-bold flex-shrink-0 h-9.5 w-9.5 flex items-center justify-center border border-warm-espresso/10 ${
                      isBarista ? 'bg-warm-cream text-warm-espresso' : 'bg-warm-espresso text-warm-cream'
                    }`}>
                      {isBarista ? '🧑‍🍳' : '👤'}
                    </div>

                    {/* Speech Text bubble */}
                    <div className="max-w-[80%] flex flex-col space-y-1">
                      <div className={`p-4 rounded-[24px] text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-left shadow-sm ${
                        isBarista 
                          ? 'bg-warm-cream text-warm-espresso rounded-tl-none border border-warm-espresso/10 font-sans font-light' 
                          : 'bg-warm-espresso text-warm-cream rounded-tr-none'
                      }`}>
                        {m.text}
                      </div>
                      <span className={`text-[10px] text-warm-espresso/45 font-mono px-1.5 ${!isBarista ? 'text-right' : 'text-left'}`}>
                        {m.timestamp}
                      </span>
                    </div>

                  </div>
                );
              })}

              {/* Loader indicator bubble */}
              {isLoading && (
                <div className="flex items-start space-x-2.5">
                  <div className="p-2 rounded-full bg-warm-cream text-warm-espresso border border-warm-espresso/10 text-xs font-bold h-9.5 w-9.5 flex items-center justify-center">
                    🧑‍🍳
                  </div>
                  <div className="bg-warm-cream border border-warm-espresso/10 p-4 rounded-[22px] rounded-tl-none shadow-sm flex items-center space-x-1.5">
                    <span className="h-2 w-2 rounded-full bg-art-ochre animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 rounded-full bg-art-ochre animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 rounded-full bg-art-ochre animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              
              <div ref={scrollRef} />
            </div>

            {/* Input keyboard forms */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3.5 border-t border-warm-espresso/10 bg-warm-cream flex items-center space-x-2"
            >
              <input
                disabled={isLoading}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask barista for a cocoa pairing recommendation, recipe secrets, secrets etc..."
                className="flex-grow py-3 px-5 text-sm bg-warm-sand/20 border border-warm-espresso/10 text-warm-espresso placeholder-warm-espresso/45 focus:outline-none focus:border-art-ochre rounded-full transition-all"
              />
              <button
                disabled={!inputText.trim() || isLoading}
                type="submit"
                className="p-3.5 bg-warm-espresso text-warm-cream rounded-full hover:bg-warm-espresso/90 transition-colors cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
