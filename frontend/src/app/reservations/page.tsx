"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Clock, UtensilsCrossed } from "lucide-react";

const ReservationsPage = () => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black text-white uppercase italic mb-6"
            >
              BOOK A <span className="text-primary">TABLE</span>
            </motion.h1>
            <p className="text-white/50 text-lg uppercase tracking-widest italic">
              Secure your spot in the heart of the urban energy. 
              Reservations are recommended for weekend vibes.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-secondary rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl"
          >
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Date Selection */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-white font-black uppercase italic tracking-widest text-sm">
                    <Calendar size={18} className="text-primary" /> Select Date
                  </label>
                  <input 
                    type="date" 
                    className="w-full bg-black border border-white/10 rounded-2xl p-6 text-white focus:outline-none focus:border-primary transition-all color-scheme-dark"
                  />
                </div>

                {/* Time Selection */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-white font-black uppercase italic tracking-widest text-sm">
                    <Clock size={18} className="text-primary" /> Select Time
                  </label>
                  <select className="w-full bg-black border border-white/10 rounded-2xl p-6 text-white focus:outline-none focus:border-primary transition-all appearance-none">
                    <option>5:00 PM</option>
                    <option>6:00 PM</option>
                    <option>7:00 PM</option>
                    <option>8:00 PM</option>
                    <option>9:00 PM</option>
                    <option>10:00 PM</option>
                  </select>
                </div>

                {/* Guests */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-white font-black uppercase italic tracking-widest text-sm">
                    <Users size={18} className="text-primary" /> Number of Guests
                  </label>
                  <select className="w-full bg-black border border-white/10 rounded-2xl p-6 text-white focus:outline-none focus:border-primary transition-all appearance-none">
                    <option>2 People</option>
                    <option>3 People</option>
                    <option>4 People</option>
                    <option>5 People</option>
                    <option>6+ People</option>
                  </select>
                </div>

                {/* Occasion */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-white font-black uppercase italic tracking-widest text-sm">
                    <UtensilsCrossed size={18} className="text-primary" /> Special Occasion
                  </label>
                  <select className="w-full bg-black border border-white/10 rounded-2xl p-6 text-white focus:outline-none focus:border-primary transition-all appearance-none">
                    <option>None</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Corporate</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="h-px bg-white/5" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full bg-black border border-white/10 rounded-2xl p-6 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full bg-black border border-white/10 rounded-2xl p-6 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-8 bg-primary text-black font-black uppercase italic tracking-[0.2em] rounded-2xl hover:bg-accent transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(255,215,0,0.3)] transform hover:-translate-y-1"
              >
                Confirm Reservation
              </button>
            </form>
          </motion.div>

          <p className="mt-8 text-center text-white/30 text-sm">
            By clicking &quot;Confirm Reservation&quot;, you agree to our booking terms and conditions. 
            For groups larger than 10, please contact us directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationsPage;
