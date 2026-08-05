/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Phone, Sparkles, Star, User, MessageSquare, ShieldCheck, Heart, Users, Clock, Flame, Check } from 'lucide-react';
import { Review, Reservation } from '../types';

export default function CommunityHub() {
  // Live guestbook reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');

  // Live table reservation state
  const [resName, setResName] = useState('');
  const [resEmail, setResEmail] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('');
  const [resGuests, setResGuests] = useState(2);
  const [resSeating, setResSeating] = useState<'indoor' | 'outdoor-balcony' | 'barista-counter'>('indoor');
  const [resOccasion, setResOccasion] = useState('Casual Catchup');
  const [isSubmittingRes, setIsSubmittingRes] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  // Fetch initial data from Express backend
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (e) {
      console.error('Error fetching reviews:', e);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    setIsSubmittingReview(true);
    setReviewMessage('');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reviewName,
          rating: reviewRating,
          comment: reviewComment
        })
      });

      if (response.ok) {
        const newRev = await response.json();
        setReviews((prev) => [newRev, ...prev]);
        setReviewName('');
        setReviewComment('');
        setReviewRating(5);
        setReviewMessage('Thank you! Your guestbook entry is live.');
        setTimeout(() => setReviewMessage(''), 3000);
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error(error);
      setReviewMessage('Failed to submit entry. Please try again.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName.trim() || !resEmail.trim() || !resPhone.trim() || !resDate || !resTime) return;

    setIsSubmittingRes(true);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resName,
          email: resEmail,
          phone: resPhone,
          date: resDate,
          time: resTime,
          guests: resGuests,
          seatingPreference: resSeating,
          occasion: resOccasion
        })
      });

      if (response.ok) {
        const data = await response.json();
        setConfirmedReservation(data);
        
        // Reset reservation fields
        setResName('');
        setResEmail('');
        setResPhone('');
        setResDate('');
        setResTime('');
        setResGuests(2);
        setResSeating('indoor');
        setResOccasion('Casual Catchup');
      } else {
        alert('Server took a temporary coffee break. Please check details and try again.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingRes(false);
    }
  };

  // Compute stats dynamically
  const ratingsSum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const averageRating = reviews.length ? (ratingsSum / reviews.length).toFixed(1) : '4.7';

  return (
    <section id="guestbook" className="bg-warm-cream py-16 lg:py-24 text-warm-espresso relative">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-art-ochre/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-art-ochre bg-art-ochre/10 px-4.5 py-2 rounded-full inline-block">
            KARKARDOOMA HUB
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-warm-espresso leading-none italic font-bold">
            The Meltado Hearth &amp; Hub
          </h2>
          <p className="text-warm-espresso/70 font-sans font-light text-sm sm:text-base max-w-2xl mx-auto">
            Book a premium seating alcove or read what East Delhi food enthusiasts write in our live Guestbook. Experience Meltado’s standalone community spirit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: NEW DELHI TABLE RESERVATION CORNER */}
          <div className="lg:col-span-5 h-full">
            <div className="bg-warm-sand/25 rounded-[36px] p-6 sm:p-8 border border-warm-espresso/10 shadow-lg relative">
              <div className="absolute top-4 right-4 bg-art-ochre/10 text-art-ochre font-mono text-[9px] px-3.5 py-1.5 rounded-full border border-art-ochre/25 uppercase tracking-wider font-bold">
                LIVE DOCK BOOKINGS
              </div>

              {!confirmedReservation ? (
                /* FORM VIEW */
                <form onSubmit={handleBooking} className="space-y-4 text-left">
                  <div className="space-y-1">
                    <h3 className="font-serif italic text-2xl font-bold text-warm-espresso">Book Your Coffee Table</h3>
                    <p className="text-[11px] text-warm-espresso/60 font-sans font-light">Reservations are highly recommended on weekends due to cozy space!</p>
                  </div>

                  <div className="space-y-3 pt-3">
                    {/* Guest Name input */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] uppercase font-mono tracking-widest text-warm-espresso/70 font-bold">Your Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 h-4 w-4 text-warm-espresso/45" />
                        <input
                          type="text"
                          required
                          value={resName}
                          onChange={(e) => setResName(e.target.value)}
                          placeholder="Aditya Sen"
                          className="w-full bg-warm-cream border border-warm-espresso/10 focus:border-art-ochre focus:ring-0 rounded-full py-3 pl-10 pr-4 text-xs text-warm-espresso transition-colors placeholder-warm-espresso/45"
                        />
                      </div>
                    </div>

                    {/* Email and Phone grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col space-y-1">
                        <label className="text-[9px] uppercase font-mono tracking-widest text-warm-espresso/70 font-bold">Email Address</label>
                        <input
                          type="email"
                          required
                          value={resEmail}
                          onChange={(e) => setResEmail(e.target.value)}
                          placeholder="aditya@example.com"
                          className="w-full bg-warm-cream border border-warm-espresso/10 focus:border-art-ochre focus:ring-0 rounded-full py-3 px-4 text-xs text-warm-espresso transition-colors placeholder-warm-espresso/45"
                        />
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <label className="text-[9px] uppercase font-mono tracking-widest text-warm-espresso/70 font-bold">Mobile Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-warm-espresso/45" />
                          <input
                            type="tel"
                            required
                            value={resPhone}
                            onChange={(e) => setResPhone(e.target.value)}
                            placeholder="+91 70217 29810"
                            className="w-full bg-warm-cream border border-warm-espresso/10 focus:border-art-ochre focus:ring-0 rounded-full py-3 pl-10 pr-4 text-xs text-warm-espresso transition-colors placeholder-warm-espresso/45"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Date and Time selectors */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col space-y-1">
                        <label className="text-[9px] uppercase font-mono tracking-widest text-warm-espresso/70 font-bold">Select Date</label>
                        <input
                          type="date"
                          required
                          value={resDate}
                          onChange={(e) => setResDate(e.target.value)}
                          className="w-full bg-warm-cream border border-warm-espresso/10 focus:border-art-ochre focus:ring-0 rounded-full py-3 px-4 text-xs text-warm-espresso transition-colors"
                        />
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <label className="text-[9px] uppercase font-mono tracking-widest text-warm-espresso/70 font-bold">Select Time</label>
                        <input
                          type="time"
                          required
                          value={resTime}
                          onChange={(e) => setResTime(e.target.value)}
                          className="w-full bg-warm-cream border border-warm-espresso/10 focus:border-art-ochre focus:ring-0 rounded-full py-3 px-4 text-xs text-warm-espresso transition-colors"
                        />
                      </div>
                    </div>

                    {/* Guests and seating selection */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col space-y-1">
                        <label className="text-[9px] uppercase font-mono tracking-widest text-warm-espresso/70 font-bold">Guests count</label>
                        <select
                          value={resGuests}
                          onChange={(e) => setResGuests(Number(e.target.value))}
                          className="w-full bg-warm-cream border border-warm-espresso/10 focus:border-art-ochre focus:ring-0 rounded-full py-3 px-4 text-xs text-warm-espresso transition-colors"
                        >
                          {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col space-y-1">
                        <label className="text-[9px] uppercase font-mono tracking-widest text-warm-espresso/70 font-bold">Seating zone</label>
                        <select
                          value={resSeating}
                          onChange={(e) => setResSeating(e.target.value as any)}
                          className="w-full bg-warm-cream border border-warm-espresso/10 focus:border-art-ochre focus:ring-0 rounded-full py-3 px-4 text-xs text-warm-espresso transition-colors"
                        >
                          <option value="indoor">Indoor Cozy Cabin</option>
                          <option value="outdoor-balcony">Outdoor Starlight Balcony</option>
                          <option value="barista-counter">Barista Craft Counter</option>
                        </select>
                      </div>
                    </div>

                    {/* Occasion input */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] uppercase font-mono tracking-widest text-warm-espresso/70 font-bold">Occasion details</label>
                      <input
                        type="text"
                        value={resOccasion}
                        onChange={(e) => setResOccasion(e.target.value)}
                        placeholder="Birthday, catchup, quiet reads..."
                        className="w-full bg-warm-cream border border-warm-espresso/10 focus:border-art-ochre focus:ring-0 rounded-full py-3 px-4 text-xs text-warm-espresso transition-colors placeholder-warm-espresso/45"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmittingRes}
                      className="w-full py-3.5 bg-warm-espresso hover:bg-warm-espresso/95 text-warm-cream font-bold rounded-full text-[10px] uppercase tracking-[0.2em] transition-transform hover:scale-[1.01] cursor-pointer shadow-md flex items-center justify-center space-x-1.5"
                    >
                      <span>{isSubmittingRes ? 'Registering Slot...' : 'Secure My Booking'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* CONFIRMED TICKET VIEW */
                <div className="space-y-6 text-warm-espresso bg-warm-cream p-6 rounded-[28px] text-left shadow-md border border-warm-espresso/10">
                  <div className="flex flex-col items-center justify-center text-center space-y-2 border-b border-dashed border-warm-espresso/15 pb-5">
                    <div className="p-3 bg-emerald-50 rounded-full border border-emerald-100 text-emerald-600 animate-pulse">
                      <Check className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold italic text-warm-espresso uppercase tracking-wider pt-1">Booking Secured</h3>
                    <p className="text-[10px] text-warm-espresso/40 font-mono">DOCK ID: {confirmedReservation.id.substring(0, 8).toUpperCase()}</p>
                  </div>

                  <div className="space-y-3 font-mono text-xs text-warm-espresso/80">
                    <div className="flex justify-between border-b border-warm-espresso/10 pb-2">
                      <span className="text-warm-espresso/50">PATRON NAME:</span>
                      <span className="font-bold text-warm-espresso">{confirmedReservation.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-warm-espresso/10 pb-2">
                      <span className="text-warm-espresso/50">BOOKED SLOT:</span>
                      <span className="font-bold text-warm-espresso">{confirmedReservation.date} @ {confirmedReservation.time}</span>
                    </div>
                    <div className="flex justify-between border-b border-warm-espresso/10 pb-2">
                      <span className="text-warm-espresso/50">TOTAL ASSEMBLY:</span>
                      <span className="font-bold text-warm-espresso">{confirmedReservation.guests} PATRONS</span>
                    </div>
                    <div className="flex justify-between border-b border-warm-espresso/10 pb-2">
                      <span className="text-warm-espresso/50">SEATING ZONE:</span>
                      <span className="font-bold text-warm-espresso capitalize">{confirmedReservation.seatingPreference.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-warm-espresso/50">OCCASION:</span>
                      <span className="font-bold text-warm-espresso">{confirmedReservation.occasion}</span>
                    </div>
                  </div>

                  <div className="bg-art-ochre/10 border border-art-ochre/20 p-4 rounded-2xl text-art-ochre text-[11px] leading-relaxed italic space-y-1 text-left">
                    <p className="font-bold">✨ Meltado Delhi Welcome Checklist:</p>
                    <p className="font-light">We will hold your table for 15 minutes past your reserved slot time. If you run late or change plans, call our hotline directly at +91 70217 29810.</p>
                  </div>

                  <button
                    onClick={() => setConfirmedReservation(null)}
                    className="w-full py-3.5 bg-warm-espresso hover:bg-warm-espresso/90 text-warm-cream font-bold text-[10px] uppercase tracking-[0.15em] rounded-full transition-colors cursor-pointer"
                  >
                    Create Another Reservation
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* COLUMN 2: GUESTBOOK DINING REVIEWS FEED */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-warm-sand/25 rounded-[36px] p-6 sm:p-8 border border-warm-espresso/10 shadow-lg flex flex-col justify-between h-full">
              
              {/* Reviews Stats Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-warm-espresso/10 pb-5 text-left">
                <div>
                  <h3 className="font-serif italic text-2xl font-bold text-warm-espresso">Meltado Guestbook Reviews</h3>
                  <p className="text-[11px] text-warm-espresso/60 font-sans mt-0.5">Live reviews generated in real-time on our Express server!</p>
                </div>

                <div className="bg-warm-cream border border-warm-espresso/10 p-3 rounded-[20px] flex items-center space-x-3 text-sm">
                  <div className="flex items-center space-x-1.5">
                    <Star className="h-4.5 w-4.5 fill-yellow-500 text-yellow-500" />
                    <span className="font-bold text-warm-espresso">{averageRating}</span>
                  </div>
                  <span className="text-[9px] text-warm-espresso/45 font-mono">({reviews.length} ENTRIES)</span>
                </div>
              </div>

              {/* WRITE A ENTRY FORM ACCORDION */}
              <div className="py-4 border-b border-warm-espresso/10">
                <form onSubmit={handleSubmitReview} className="space-y-4 text-left bg-warm-cream/50 p-4 sm:p-5 rounded-[28px] border border-warm-espresso/10 shadow-sm">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-art-ochre font-mono">Sign Meltado's Guestbook</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="Your Name (e.g., Shaurya)"
                      className="w-full bg-warm-cream border border-warm-espresso/10 focus:border-art-ochre focus:ring-0 rounded-full py-3 px-4 text-xs text-warm-espresso transition-colors placeholder-warm-espresso/45"
                    />

                    {/* Simple Stars Selector */}
                    <div className="flex items-center space-x-2 bg-warm-cream border border-warm-espresso/10 px-4 py-2 rounded-full justify-between">
                      <span className="text-[9px] text-warm-espresso/45 font-mono uppercase font-semibold">RATING:</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setReviewRating(s)}
                            className="p-0.5 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star className={`h-4.5 w-4.5 ${s <= reviewRating ? 'fill-yellow-500 text-yellow-500' : 'text-warm-espresso/20'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      required
                      rows={2}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="What is your favorite treat, or tell us about your cozy visit to our Karkardooma shop!"
                      className="w-full bg-warm-cream border border-warm-espresso/10 focus:border-art-ochre focus:ring-0 rounded-[20px] p-4 text-xs text-warm-espresso transition-colors placeholder-warm-espresso/45 resize-none"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-emerald-600 font-semibold">{reviewMessage}</span>
                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="px-5.5 py-3 bg-warm-espresso hover:bg-warm-espresso/90 text-warm-cream font-bold text-[10px] tracking-[0.15em] uppercase rounded-full transition-all cursor-pointer shadow-sm text-center"
                    >
                      {isSubmittingReview ? 'Signing...' : 'Post Entry'}
                    </button>
                  </div>
                </form>
              </div>

              {/* REVIEWS SCROLLABLE LOG */}
              <div className="flex-grow max-h-[300px] overflow-y-auto space-y-4 pt-4 pr-1 scrollbar-none">
                <AnimatePresence>
                  {reviews.map((rev) => (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      key={rev.id}
                      className="p-5 bg-warm-cream/80 hover:bg-warm-cream rounded-[24px] border border-warm-espresso/10 hover:border-art-ochre/30 transition-all text-left space-y-3.5 shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <img
                            src={rev.avatar}
                            alt={rev.name}
                            referrerPolicy="no-referrer"
                            className="h-8.5 w-8.5 rounded-full object-cover border border-warm-espresso/15 shadow-sm"
                          />
                          <div>
                            <h4 className="font-bold text-xs text-warm-espresso">{rev.name}</h4>
                            <span className="text-[9px] text-warm-espresso/45 font-mono block">{rev.date}</span>
                          </div>
                        </div>

                        <div className="flex space-x-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3.5 w-3.5 ${i < rev.rating ? 'fill-yellow-500 text-yellow-500' : 'text-warm-sand-400'}`} 
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-warm-espresso/85 font-light text-xs leading-relaxed font-sans pl-2.5 border-l-2 border-art-ochre/30">
                        "{rev.comment}"
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
