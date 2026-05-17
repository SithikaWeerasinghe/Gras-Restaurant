"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Clock, UtensilsCrossed } from "lucide-react";
import SphereSection from "@/components/SphereSection";

const ReservationsPage = () => {
  return (
    <SphereSection>
    <div className="min-h-screen bg-[#050505] pt-32 pb-28 relative overflow-hidden">
      {/* Subtle background glows */}
      <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-primary/4 rounded-full blur-[140px] -mr-60 -mt-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[480px] h-[480px] bg-primary/3 rounded-full blur-[140px] -ml-60 -mb-60 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">

          {/* ── Header ── */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-label mb-4"
            >
              Reserve Your Spot
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-title"
            >
              Book a <span className="text-gradient-gold">Table</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[#A3A3A3] text-base mt-5 leading-relaxed"
            >
              Secure your place in the heart of the GRAS experience.
              Reservations are recommended, especially for weekend evenings.
            </motion.p>
          </div>

          {/* ── Form card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="bg-[#0B0B0B] rounded-[2.5rem] p-8 md:p-12 border border-white/8"
          >
            <form className="space-y-10">

              {/* Row 1: Date + Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs text-[#D4D4D4] uppercase tracking-widest">
                    <Calendar size={14} className="text-primary" /> Select Date
                  </label>
                  <input type="date" className="input-luxury" />
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs text-[#D4D4D4] uppercase tracking-widest">
                    <Clock size={14} className="text-primary" /> Select Time
                  </label>
                  <select className="input-luxury appearance-none">
                    {["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Guests + Occasion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs text-[#D4D4D4] uppercase tracking-widest">
                    <Users size={14} className="text-primary" /> Number of Guests
                  </label>
                  <select className="input-luxury appearance-none">
                    {["2 People", "3 People", "4 People", "5 People", "6+ People"].map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs text-[#D4D4D4] uppercase tracking-widest">
                    <UtensilsCrossed size={14} className="text-primary" /> Special Occasion
                  </label>
                  <select className="input-luxury appearance-none">
                    {["None", "Birthday", "Anniversary", "Corporate", "Other"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/6" />

              {/* Row 3: Name + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-xs text-[#D4D4D4] uppercase tracking-widest">Full Name</label>
                  <input type="text" placeholder="Your full name" className="input-luxury" />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs text-[#D4D4D4] uppercase tracking-widest">Phone Number</label>
                  <input type="tel" placeholder="+94 71 234 5678" className="input-luxury" />
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="w-full btn-primary justify-center py-4 rounded-xl text-sm tracking-[0.15em]">
                Confirm Reservation
              </button>
            </form>
          </motion.div>

          <p className="mt-8 text-center text-[#A3A3A3] text-xs leading-relaxed">
            By confirming your reservation you agree to our booking terms and conditions.
            For groups larger than 10, please{" "}
            <a href="/contact" className="text-primary hover:underline">contact us directly</a>.
          </p>

        </div>
      </div>
    </div>
    </SphereSection>
  );
};

export default ReservationsPage;
