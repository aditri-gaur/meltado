/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { Search, Heart, Sparkles, AlertCircle, ShoppingBag, Eye, X, Star } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menu';

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'sips' | 'savory' | 'sweets'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('meltado_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing favorites', e);
      }
    }
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('meltado_favorites', JSON.stringify(updated));
  };

  // Filter items
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !vegOnly || item.isVegetarian;
    return matchesTab && matchesSearch && matchesVeg;
  });

  const getCategoryTitle = (cat: string) => {
    switch(cat) {
      case 'sips': return 'Specialty Sips & Cocoa';
      case 'savory': return 'Molten Savory Grills';
      case 'sweets': return 'Bespoke Sweet Melts';
      default: return 'Gourmet Treats';
    }
  };

  return (
    <section id="menu" className="bg-warm-cream py-16 text-warm-espresso relative border-b border-warm-espresso/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-art-ochre bg-art-ochre/10 px-4.5 py-2 rounded-full inline-block animate-pulse">
            Today's Selection
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-warm-espresso italic font-bold leading-tight">
            The Meltado Catalog
          </h2>
          <p className="text-warm-espresso/80 font-sans font-light text-sm sm:text-base leading-relaxed">
            Each item is designed to celebrate slow coffee extractions, molten cocoa pour-overs, or warm cheese pulls. Tap an item to inspect pairing culinary secrets!
          </p>
        </div>

        {/* Filter Toolbar Controls */}
        <div className="bg-warm-sand/20 rounded-[30px] border border-warm-espresso/10 p-5 sm:p-7 mb-12 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Tab switcher buttons */}
            <div className="flex flex-wrap gap-2.5">
              {(['all', 'sips', 'savory', 'sweets'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                    activeTab === tab
                      ? 'bg-warm-espresso text-warm-cream shadow-sm'
                      : 'bg-warm-sand/50 text-warm-espresso/75 hover:bg-warm-sand border border-warm-espresso/5'
                  }`}
                >
                  {tab === 'all' ? 'All Treats' : tab === 'sips' ? 'Sips & Cocoa' : tab === 'savory' ? 'Savory' : 'Sweets'}
                </button>
              ))}
            </div>

            {/* Live Search Input and vegetarian toggle */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-grow min-w-[240px]">
                <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-warm-espresso/40" />
                <input
                  type="text"
                  placeholder="Search coffee, waffles, sliders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-5 py-2.5 w-full text-xs bg-warm-cream border border-warm-espresso/10 focus:border-art-ochre focus:outline-none rounded-full text-warm-espresso transition-all"
                />
              </div>

              <label className="flex items-center space-x-2 bg-warm-cream border border-warm-espresso/10 px-4 py-2.5 rounded-full cursor-pointer hover:bg-warm-sand/40 transition-colors">
                <input
                  type="checkbox"
                  checked={vegOnly}
                  onChange={(e) => setVegOnly(e.target.checked)}
                  className="rounded border-warm-espresso/20 text-art-ochre focus:ring-art-ochre h-3.5 w-3.5 accent-art-ochre"
                />
                <span className="text-[10px] font-bold text-warm-espresso/80 uppercase tracking-widest">VEG ONLY 🌱</span>
              </label>
            </div>

          </div>
        </div>

        {/* Products Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-100 shadow-sm flex flex-col justify-center items-center max-w-lg mx-auto">
            <AlertCircle className="h-12 w-12 text-stone-300 mb-3" />
            <h3 className="font-bold text-stone-900 text-lg">No treats found</h3>
            <p className="text-xs text-stone-500 mt-1">Try resetting your keyboard search or selecting another tab.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredItems.map((item) => {
              const isFav = favorites.includes(item.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedItem(item)}
                  key={item.id}
                  className="bg-warm-sand/20 rounded-[32px] overflow-hidden border border-warm-espresso/10 hover:border-art-ochre/30 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between cursor-pointer relative"
                >
                  <div className="relative overflow-hidden h-44 bg-warm-sand/30">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Dark gradient shadow inside photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-warm-espresso/50 via-transparent to-warm-espresso/10" />

                    {/* Vegetarian tag */}
                    <div className="absolute top-3.5 left-3.5 bg-warm-cream/95 backdrop-blur-sm py-1 px-2.5 rounded-full text-[9px] font-bold text-warm-espresso flex items-center space-x-1.5 border border-warm-espresso/5 shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>VEG</span>
                    </div>

                    {/* Special labels (Signature, Chef Special etc) */}
                    {item.tag && (
                      <div className="absolute top-3.5 right-3.5 bg-art-ochre text-white font-bold text-[8px] tracking-[0.12em] uppercase px-2.5 py-1.5 rounded-full shadow-sm">
                        {item.tag}
                      </div>
                    )}

                    {/* Quick view icon badge */}
                    <div className="absolute bottom-3.5 right-3.5 bg-warm-espresso text-warm-cream p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Text Details Box */}
                  <div className="p-5.5 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2.5 mb-1.5">
                        <h3 className="font-bold text-warm-espresso text-sm sm:text-base font-sans group-hover:text-art-ochre transition-colors leading-tight">
                          {item.name}
                        </h3>
                        <span className="font-serif italic font-extrabold text-xs sm:text-sm text-warm-espresso bg-warm-cream border border-warm-espresso/15 px-2.5 py-1 rounded-full flex-shrink-0 group-hover:bg-warm-espresso group-hover:text-warm-cream transition-colors duration-350">
                          ₹{item.price}
                        </span>
                      </div>
                      
                      <p className="text-warm-espresso/65 font-light font-sans text-[11px] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-warm-espresso/10 pt-3.5 mt-4">
                      <span className="text-[9px] tracking-[0.15em] font-mono text-warm-espresso/50 font-bold uppercase">
                        {getCategoryTitle(item.category)}
                      </span>
                      
                      {/* Heart favoriting button */}
                      <button
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className={`p-2 rounded-full cursor-pointer transition-all duration-300 ${
                          isFav 
                            ? 'bg-rose-50 text-rose-500 scale-110 shadow-sm border border-rose-100' 
                            : 'bg-warm-cream text-warm-espresso/40 hover:text-warm-espresso hover:bg-warm-sand hover:scale-105 border border-warm-espresso/5'
                        }`}
                        title={isFav ? "Remove from Favorites" : "Favorite this treat!"}
                      >
                        <Heart className={`h-3.5 w-3.5 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Modal product sheet for selected product */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-warm-espresso/80 backdrop-blur-sm flex justify-center items-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-warm-cream rounded-[40px] overflow-hidden max-w-2xl w-full border border-warm-espresso/10 shadow-2xl relative"
            >
              {/* Close Button element */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-warm-espresso text-warm-cream hover:bg-art-ochre rounded-full cursor-pointer shadow-sm transition-all"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-auto min-h-[250px] relative bg-warm-sand/30">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-espresso/55 via-transparent to-transparent" />
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 text-left">
                  <div className="space-y-4">
                    <span className="font-mono text-[9px] font-bold text-art-ochre bg-art-ochre/10 border border-art-ochre/25 uppercase tracking-[0.15em] px-3 py-1.5 rounded-full inline-block">
                      {getCategoryTitle(selectedItem.category)}
                    </span>
                    
                    <h3 className="text-3xl font-serif italic text-warm-espresso leading-tight">
                      {selectedItem.name}
                    </h3>

                    <div className="flex items-center space-x-4">
                      <span className="font-serif italic font-extrabold text-lg text-warm-espresso bg-warm-sand/50 px-4 py-1.5 border border-warm-espresso/10 rounded-full shadow-inner">
                        ₹{selectedItem.price}
                      </span>
                      
                      <div className="text-[10px] text-warm-espresso/60 font-mono font-bold uppercase tracking-wider">
                        🌱 Vegetarian • Co-Pair
                      </div>
                    </div>

                    <p className="text-warm-espresso/75 font-light text-xs font-sans leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  {/* Suggest Pairings area in gorgeous artistic terracotta background tints */}
                  <div className="bg-art-ochre/10 rounded-[24px] border border-art-ochre/20 p-4.5 space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-[10px] font-bold text-art-ochre uppercase tracking-[0.12em]">
                      <Sparkles className="h-3.5 w-3.5 text-art-ochre" />
                      <span>Artisan Pairing Match</span>
                    </div>
                    <p className="text-[11px] text-warm-espresso/80 font-light leading-relaxed font-sans">
                      {selectedItem.category === 'sips' 
                        ? "Pairs excellently with our warm Sourdough Cheese Melt or the Peri-Peri Paneer Slider to balance the textures."
                        : selectedItem.category === 'savory'
                          ? "We love pairing this with the velvety Meltado Hot Cocoa or the creamy Spanish Latte for high contrast."
                          : "Complements a hot double shot of Espresso or a steaming Spanish Latte beautifully."}
                    </p>
                  </div>

                  <div className="pt-2 flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedItem(null);
                        // Open simulator or just close and highlight
                      }}
                      className="flex-grow py-3.5 bg-warm-espresso text-warm-cream font-bold text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-warm-espresso/90 text-center cursor-pointer transition-colors"
                    >
                      Bake / Customize Simulator
                    </button>
                    
                    <button
                      onClick={(e) => {
                        toggleFavorite(selectedItem!.id, e as any);
                      }}
                      className={`px-4 py-3.5 border border-warm-espresso/15 rounded-full cursor-pointer transition-all duration-300 ${
                        favorites.includes(selectedItem.id) 
                          ? 'bg-rose-50 text-rose-500 border-rose-100 shadow-sm' 
                          : 'bg-warm-cream text-warm-espresso/45 hover:text-warm-espresso hover:bg-warm-sand/80'
                      }`}
                    >
                      <Heart className={`h-4.5 w-4.5 ${favorites.includes(selectedItem.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
}
