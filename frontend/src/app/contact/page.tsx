"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Send } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Top Section: Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 mb-24">
          {/* Left Side: Map Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 aspect-square bg-secondary rounded-3xl border border-white/10 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-75 transition-all duration-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-primary/20 backdrop-blur-xl border border-primary/30 p-8 rounded-full">
                <MapPin size={48} className="text-primary animate-bounce" />
              </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl">
              <p className="text-white font-black italic tracking-widest uppercase">Gampaha, Sri Lanka</p>
              <p className="text-white/50 text-xs">Click to open in Google Maps</p>
            </div>
          </motion.div>

          {/* Right Side: Info */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white uppercase italic mb-12"
            >
              FIND US AT <br />
              <span className="text-primary text-gradient-yellow">GAMPAHA</span>
            </motion.h2>

            <div className="space-y-8">
              <div className="group">
                <p className="text-xs text-white/30 uppercase tracking-[0.2em] mb-2">Address</p>
                <div className="relative">
                  <p className="text-xl md:text-2xl text-white font-bold pb-4 border-b border-white/10 group-hover:border-primary transition-colors">
                    123 Urban Avenue, Gampaha
                  </p>
                  <div className="absolute bottom-0 left-0 h-px bg-primary w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </div>

              <div className="group">
                <p className="text-xs text-white/30 uppercase tracking-[0.2em] mb-2">Contact</p>
                <div className="relative">
                  <p className="text-xl md:text-2xl text-white font-bold pb-4 border-b border-white/10 group-hover:border-primary transition-colors">
                    +94 71 234 5678
                  </p>
                  <div className="absolute bottom-0 left-0 h-px bg-primary w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </div>

              <div className="group">
                <p className="text-xs text-white/30 uppercase tracking-[0.2em] mb-2">Email</p>
                <div className="relative">
                  <p className="text-xl md:text-2xl text-white font-bold pb-4 border-b border-white/10 group-hover:border-primary transition-colors">
                    hello@grasrestaurant.com
                  </p>
                  <div className="absolute bottom-0 left-0 h-px bg-primary w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Event Inquiry */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary rounded-[3rem] p-8 md:p-16 border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
          
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic mb-6">
              LOOKING TO HAVE AN <span className="text-primary">EVENT?</span>
            </h2>
            <p className="text-white/50 mb-12 text-lg">
              From private parties to corporate takeovers, we host the most energetic events in Gampaha. 
              Let us know what you have in mind.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <textarea 
                rows={6} 
                placeholder="Tell us about your event (Date, Number of guests, Type of event...)" 
                className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all resize-none"
              ></textarea>
              
              <button 
                type="submit" 
                className="w-full md:w-auto px-16 py-6 bg-primary text-black font-black uppercase italic tracking-widest rounded-full hover:bg-accent transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-4 mx-auto"
              >
                Submit Inquiry <Send size={20} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
