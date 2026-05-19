"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Palette, Check, X, ShieldAlert } from "lucide-react";

type Theme = "urban" | "royal" | "minimalist";

const THEME_OPTIONS = [
  {
    id: "urban" as Theme,
    name: "Urban Noir",
    desc: "Modern bold headers, deep noir surfaces, organic large curves.",
    tagline: "Bold & Energetic",
  },
  {
    id: "royal" as Theme,
    name: "Imperial Gold",
    desc: "Romantic high-luxury serif headers, gold tint glow, classical rectangular frames.",
    tagline: "Sophisticated Elegance",
  },
  {
    id: "minimalist" as Theme,
    name: "Minimalist Grid",
    desc: "Sleek architectural styling, wide track clean headers, pure sharp 90° edges.",
    tagline: "Precise & Contemporary",
  },
];

export default function StyleSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<Theme>("urban");

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("gras-aesthetic-theme") as Theme;
    if (storedTheme && ["urban", "royal", "minimalist"].includes(storedTheme)) {
      setActiveTheme(storedTheme);
      applyTheme(storedTheme);
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    if (typeof window === "undefined") return;
    
    const root = document.documentElement;
    // Remove all theme classes first
    root.classList.remove("theme-royal", "theme-minimalist");

    // Apply the active theme class
    if (theme === "royal") {
      root.classList.add("theme-royal");
    } else if (theme === "minimalist") {
      root.classList.add("theme-minimalist");
    }

    localStorage.setItem("gras-aesthetic-theme", theme);
  };

  const handleSelect = (theme: Theme) => {
    setActiveTheme(theme);
    applyTheme(theme);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay background for closing on click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute bottom-16 right-0 w-[350px] md:w-[380px] bg-black/95 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_30px_rgba(255,215,0,0.05)] z-50 overflow-hidden"
              style={{
                boxShadow: activeTheme === "royal" 
                  ? "0 20px 50px rgba(0,0,0,0.8), 0 0 35px rgba(255,215,0,0.08)"
                  : activeTheme === "minimalist"
                  ? "0 20px 50px rgba(0,0,0,0.9), 0 0 10px rgba(255,255,255,0.03)"
                  : "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(255,215,0,0.05)",
                borderRadius: activeTheme === "royal" ? "8px" : activeTheme === "minimalist" ? "0px" : "24px"
              }}
            >
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <Palette className="text-[#FFD700] w-5 h-5 animate-pulse" />
                  <span className="text-white font-bold text-xs uppercase tracking-[0.2em] font-sans">
                    Aesthetic Lounge
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors"
                  style={{
                    borderRadius: activeTheme === "royal" ? "4px" : activeTheme === "minimalist" ? "0px" : "9999px"
                  }}
                >
                  <X size={15} />
                </button>
              </div>

              {/* Theme choices */}
              <div className="space-y-4">
                {THEME_OPTIONS.map((opt) => {
                  const isActive = opt.id === activeTheme;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      className={`w-full text-left p-4 border transition-all duration-300 relative group flex gap-4 items-start ${
                        isActive
                          ? "bg-white/[0.04] border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.05)]"
                          : "bg-transparent border-white/5 hover:border-white/20 hover:bg-white/[0.01]"
                      }`}
                      style={{
                        borderRadius: activeTheme === "royal" ? "6px" : activeTheme === "minimalist" ? "0px" : "16px"
                      }}
                    >
                      <div className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center border shrink-0 transition-colors ${
                        isActive 
                          ? "bg-[#FFD700]/10 border-[#FFD700] text-[#FFD700]" 
                          : "bg-white/5 border-white/10 text-white/40 group-hover:text-white/80 group-hover:border-white/25"
                      }`}
                      style={{
                        borderRadius: activeTheme === "royal" ? "4px" : activeTheme === "minimalist" ? "0px" : "9999px"
                      }}
                      >
                        {isActive ? <Check size={13} strokeWidth={3} /> : <Sparkles size={11} />}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-baseline gap-2 mb-1">
                          <span className={`text-sm font-bold tracking-wide transition-colors ${isActive ? "text-[#FFD700]" : "text-white"}`}>
                            {opt.name}
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-white/35 font-medium">
                            {opt.tagline}
                          </span>
                        </div>
                        <p className="text-[#A3A3A3] text-xs leading-relaxed font-light">
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Subtle info label */}
              <p className="text-white/25 text-[10px] text-center mt-5 leading-normal tracking-wide font-light">
                Switch styles in real-time. Core color theme remains fully intact.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 flex items-center justify-center bg-black border text-white shadow-[0_10px_30px_rgba(0,0,0,0.8),_0_0_20px_rgba(255,215,0,0.08)] cursor-pointer group transition-all duration-300"
        style={{
          borderColor: activeTheme === "royal" ? "rgba(255,215,0,0.35)" : "rgba(255,255,255,0.15)",
          borderRadius: activeTheme === "royal" ? "8px" : activeTheme === "minimalist" ? "0px" : "9999px"
        }}
        aria-label="Change design variations"
      >
        <Palette className="w-5 h-5 text-[#FFD700] transition-transform duration-300 group-hover:rotate-12" />
      </motion.button>
    </div>
  );
}
