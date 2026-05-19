"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, UtensilsCrossed, Wine } from "lucide-react";

/* ─── Data Placeholders ─────────────────────────────────────────────────── */

const COMBO_PACKAGES = [
  {
    id: "c1",
    name: "Family Feast Combo",
    shortDesc: "Our most generous sharing experience with a variety of premium dishes.",
    price: "$120",
    serves: "4-6",
    highlight: "Best for large groups",
    image: "/food_combo_1_1778921093061.png",
    includes: ["2x Signature Starters", "Large Mixed Grill", "Family Size Sides", "Dessert Platter"]
  },
  {
    id: "c2",
    name: "Friends Sharing Combo",
    shortDesc: "Perfect for a catch-up over drinks, featuring easily shared bites.",
    price: "$85",
    serves: "3-4",
    highlight: "Crowd favourite",
    image: "/restaurant_hero_1778921073817.png",
    includes: ["Assorted Sliders", "Loaded Fries", "Spicy Wings", "Dipping Sauces"]
  },
  {
    id: "c3",
    name: "GRAS Signature Combo",
    shortDesc: "The ultimate GRAS tasting selection showcasing our finest flavours.",
    price: "$150",
    serves: "2-3",
    highlight: "Chef's recommendation",
    image: "/byob_special_menu_1778921115733.png",
    includes: ["Premium Ribeye", "Grilled Seafood", "Truffle Mash", "Seasonal Greens"]
  },
  {
    id: "c4",
    name: "Couple Dinner Combo",
    shortDesc: "Intimate and carefully curated for a perfect date night.",
    price: "$95",
    serves: "2",
    highlight: "Date night essential",
    image: "/food_combo_1_1778921093061.png",
    includes: ["2x Welcome Drinks", "Shared Appetiser", "Choice of 2 Mains", "Shared Dessert"]
  },
  {
    id: "c5",
    name: "Weekend Table Combo",
    shortDesc: "Start the weekend right with high-energy flavours and satisfying portions.",
    price: "$110",
    serves: "4",
    highlight: "Weekend special",
    image: "/restaurant_hero_1778921073817.png",
    includes: ["Crispy Calamari", "BBQ Ribs", "Spicy Fried Rice", "Wok Tossed Veggies"]
  }
];

const BYOB_SPECIALS = [
  {
    id: "b1",
    name: "BYOB Bites Platter",
    shortDesc: "Assorted premium bites designed to pair with any spirit of your choice.",
    price: "$65",
    serves: "2-4",
    highlight: "Versatile pairing",
    image: "/byob_special_menu_1778921115733.png",
    includes: ["Crispy Chicken Bites", "Devilled Cashews", "Spicy Sausages", "Garlic Bread"]
  },
  {
    id: "b2",
    name: "BYOB Grill Sharing Combo",
    shortDesc: "Smoky grilled cuts perfect for bold drinks and whiskey.",
    price: "$130",
    serves: "4",
    highlight: "Meat lover's dream",
    image: "/restaurant_hero_1778921073817.png",
    includes: ["Mixed Grilled Meats", "Roasted Potatoes", "House BBQ Sauce", "Chargrilled Vegetables"]
  },
  {
    id: "b3",
    name: "BYOB Celebration Table",
    shortDesc: "For when it's a special night. Premium selections for the whole table.",
    price: "$180",
    serves: "6+",
    highlight: "Ultimate celebration",
    image: "/food_combo_1_1778921093061.png",
    includes: ["Seafood Platter", "Meat Platter", "Unlimited Fries", "Complementary Mixers"]
  },
  {
    id: "b4",
    name: "BYOB Spicy Night Combo",
    shortDesc: "Turn up the heat with spicy favourites that demand a cold drink.",
    price: "$75",
    serves: "3",
    highlight: "Spicy kick",
    image: "/byob_special_menu_1778921115733.png",
    includes: ["Devilled Chicken", "Spicy Cuttlefish", "Hot Garlic Prawns", "Steamed Rice"]
  },
  {
    id: "b5",
    name: "BYOB Friends Combo",
    shortDesc: "A bit of everything for the group. Relaxed, easy, and satisfying.",
    price: "$90",
    serves: "4",
    highlight: "Easy sharing",
    image: "/restaurant_hero_1778921073817.png",
    includes: ["Nachos Supreme", "Mini Pizzas", "Crispy Onion Rings", "Cheesy Wedges"]
  }
];

const NORMAL_MENU = [
  { id: "n1", name: "Crispy Calamari", category: "Starters", shortDesc: "Served with garlic aioli.", price: "$14" },
  { id: "n2", name: "Devilled Prawns", category: "Starters", shortDesc: "Spicy Sri Lankan style.", price: "$18" },
  { id: "n3", name: "Seafood Fried Rice", category: "Rice", shortDesc: "Wok-tossed with fresh catch.", price: "$22" },
  { id: "n4", name: "Spicy Chicken Noodles", category: "Noodles", shortDesc: "Street style wok noodles.", price: "$18" },
  { id: "n5", name: "Cheese Kottu", category: "Kottu", shortDesc: "Creamy, cheesy, and satisfying.", price: "$20", tag: "Popular" },
  { id: "n6", name: "Mixed Meat Kottu", category: "Kottu", shortDesc: "Chicken, beef, and sausage.", price: "$24" },
  { id: "n7", name: "Grilled Ribeye", category: "Grill", shortDesc: "300g prime cut with peppercorn sauce.", price: "$45" },
  { id: "n8", name: "BBQ Pork Ribs", category: "Grill", shortDesc: "Slow-cooked and fall-off-the-bone.", price: "$35" },
  { id: "n9", name: "Devilled Cashews", category: "Bites", shortDesc: "Roasted with chili and curry leaves.", price: "$12", tag: "Spicy" },
  { id: "n10", name: "Crispy Chicken Wings", category: "Bites", shortDesc: "Tossed in spicy buffalo sauce.", price: "$16" },
  { id: "n11", name: "Fresh Lime Soda", category: "Drinks", shortDesc: "Refreshing and tangy.", price: "$6" },
  { id: "n12", name: "Virgin Mojito", category: "Drinks", shortDesc: "Mint, lime, and soda.", price: "$8" },
];

const NORMAL_CATEGORIES = ["All", "Starters", "Rice", "Noodles", "Kottu", "Grill", "Bites", "Drinks"];

/* ─── Helpers ───────────────────────────────────────────────────────────── */
const TWO_PI = 2 * Math.PI;
const norm = (a: number) => ((a % TWO_PI) + TWO_PI) % TWO_PI;

/* ─── Main Component ────────────────────────────────────────────────────── */
export default function MenuPage() {
  /* Round Table State */
  const [tableCategory, setTableCategory] = useState<"Combo Packages" | "BYOB Special Combos">("Combo Packages");

  const tableItems = tableCategory === "Combo Packages" ? COMBO_PACKAGES : BYOB_SPECIALS;
  const count = tableItems.length;

  const [activeIdx, setActiveIdx] = useState(0);
  const [angleOffset, setAngleOffset] = useState(0);
  const angleOffsetRef = useRef(0);

  const activeItem = tableItems[activeIdx];

  // Reset active item when category changes
  useEffect(() => {
    setActiveIdx(0);
    setAngleOffset(0);
    angleOffsetRef.current = 0;
  }, [tableCategory]);

  /* Normal Menu State */
  const [activeNormalCategory, setActiveNormalCategory] = useState("All");
  const filteredNormalMenu = activeNormalCategory === "All"
    ? NORMAL_MENU
    : NORMAL_MENU.filter(item => item.category === activeNormalCategory);

  /* Round Table Logic */
  const baseAngle = useCallback((i: number) => (TWO_PI * i) / count, [count]);

  const rotateTo = useCallback((index: number) => {
    // We want the clicked item to end up at the "front" (angle Pi or 180 deg).
    // In our coordinate system: x = sin(a), y = cos(a).
    // Let's set front as a = 0 (top) or a = PI (bottom). Let's use right side (PI/2) for desktop.
    // Actually, circular rotation: 
    // targetAngle offset to make item `index` appear at a specific visual angle.
    // Let's keep it simple: just update active index. The render logic will rotate the circle.
    setActiveIdx(index);
  }, []);

  const nextTableItem = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % count);
  }, [count]);

  const prevTableItem = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Handle wheel scrolling for round table
  const tableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) nextTableItem();
      else prevTableItem();
    };

    // Passive false to allow preventDefault
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [nextTableItem, prevTableItem]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#FFD700] selection:text-black font-sans">

      {/* ─── 1. Menu Hero Section ────────────────────────────────────────── */}
      <section 
        className="relative pt-32 pb-20 px-6 overflow-hidden flex flex-col items-center justify-center text-center min-h-[50vh] md:min-h-[60vh] lg:min-h-[75vh]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/images/menu-hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FFD700]/10 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col items-center mt-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#FFD700] text-xs font-semibold tracking-[0.2em] uppercase mb-6 drop-shadow-md"
          >
            GRAS MENU
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-8 font-serif drop-shadow-xl"
          >
            Explore Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#D4D4D4] max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed drop-shadow-md"
          >
            Discover signature combo packages, BYOB sharing specials, and classic GRAS favourites prepared for evening dining from 4 PM to 11 PM.
          </motion.p>
        </div>
      </section>

      {/* ─── 2. Round Table Menu Section ───────────────────────────────── */}
      <section className="py-20 bg-[#0B0B0B] border-y border-white/5 relative z-10 overflow-hidden">
        <div className="container mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold uppercase mb-6">
              Signature Sharing Packages
            </h2>
            <p className="text-[#A3A3A3] max-w-xl mx-auto text-base leading-relaxed">
              Choose from our curated combo packages and BYOB specials designed for groups, celebrations, and relaxed dining nights.
            </p>
          </div>

          {/* Category Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {(["Combo Packages", "BYOB Special Combos"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setTableCategory(cat)}
                className={`px-8 py-3.5 text-sm font-semibold tracking-widest uppercase rounded-full border transition-all duration-300 ${tableCategory === cat
                  ? "bg-[#FFD700] text-black border-[#FFD700]"
                  : "bg-transparent text-[#A3A3A3] border-white/10 hover:border-[#FFD700]/40 hover:text-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Round Table Layout */}
          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-stretch min-h-[600px]">

            {/* Left: Round Table Circle (Desktop & Tablet) */}
            <div className="w-full lg:w-1/2 relative flex justify-center items-center h-[550px] lg:h-[600px] hidden md:flex" ref={tableRef}>
              <div
                className="relative w-[460px] h-[460px] rounded-full border border-white/10 flex items-center justify-center transition-transform duration-700 ease-out"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.5) 100%)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "inset 0 0 50px rgba(0,0,0,0.8), 0 0 30px rgba(255,215,0,0.05)",
                  transform: `rotate(${-activeIdx * (360 / count)}deg)`
                }}
              >
                {/* Center Label */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 transition-transform duration-700 ease-out"
                  style={{ transform: `rotate(${activeIdx * (360 / count)}deg)` }}
                >
                  <div className="text-center max-w-[240px] flex flex-col items-center">
                    <p className="text-[#FFD700] text-sm font-semibold tracking-widest uppercase mb-1">
                      {tableCategory === "Combo Packages" ? "GRAS FAMILY" : "GRAS BYOB"}
                    </p>
                    <h3 className="text-white text-3xl font-serif font-bold uppercase tracking-widest mb-3">Round Table</h3>
                    <div className="flex items-center gap-3 mb-4 opacity-80 text-[#FFD700]">
                      <div className="w-8 h-px bg-[#FFD700]/50"></div>
                      {tableCategory === "Combo Packages" ? (
                        <UtensilsCrossed size={18} strokeWidth={1.5} />
                      ) : (
                        <Wine size={18} strokeWidth={1.5} />
                      )}
                      <div className="w-8 h-px bg-[#FFD700]/50"></div>
                    </div>
                    <p className="text-[#A3A3A3] text-xs tracking-wide leading-relaxed">
                      {tableCategory === "Combo Packages"
                        ? "Share the food, relax in peace, and enjoy the table with your family."
                        : "Bring your own bottle, stay relaxed in peace, and enjoy the GRAS night."}
                    </p>
                  </div>
                </div>

                {/* Circular Items */}
                {tableItems.map((item, i) => {
                  const angleDeg = i * (360 / count);
                  const isActive = i === activeIdx;

                  return (
                    <div
                      key={item.id}
                      className="absolute top-1/2 left-1/2 w-[125px] h-[125px] -ml-[62.5px] -mt-[62.5px]"
                      style={{
                        transform: `rotate(${angleDeg}deg) translateY(-230px) rotate(${-angleDeg}deg)`, // Position on circle
                      }}
                    >
                      <div
                        className="w-full h-full transition-transform duration-700 ease-out"
                        style={{
                          transform: `rotate(${activeIdx * (360 / count)}deg)` // Counter-rotate to stay upright
                        }}
                      >
                        <button
                          onClick={() => rotateTo(i)}
                          className={`w-full h-full rounded-2xl flex flex-col items-center justify-center p-3 text-center transition-all duration-500 cursor-pointer group ${isActive
                            ? "bg-[#181818] border-2 border-[#FFD700] scale-110 shadow-[0_10px_30px_rgba(255,215,0,0.15)] z-20"
                            : "bg-[#121212] border border-white/10 scale-90 opacity-70 hover:opacity-100 hover:border-white/30 z-10 hover:bg-[#151515]"
                            }`}
                        >
                          <span className={`text-xs font-serif font-bold mb-1.5 leading-snug ${isActive ? 'text-white' : 'text-[#D4D4D4] group-hover:text-white'}`}>{item.name}</span>
                          <span className={`text-[13px] font-bold mb-1.5 ${isActive ? 'text-[#FFD700]' : 'text-[#FFD700]/70'}`}>{item.price}</span>
                          <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full ${isActive ? 'bg-[#FFD700]/10 text-[#FFD700]' : 'text-[#A3A3A3]'}`}>
                            Serves {item.serves}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Controls */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-6 z-20">
                <button onClick={prevTableItem} className="p-3 rounded-full border border-white/10 text-white/50 hover:text-[#FFD700] hover:border-[#FFD700] transition-colors bg-[#050505]">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextTableItem} className="p-3 rounded-full border border-white/10 text-white/50 hover:text-[#FFD700] hover:border-[#FFD700] transition-colors bg-[#050505]">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Mobile View: Horizontal Scroll Cards */}
            <div className="w-full md:hidden flex overflow-x-auto pb-8 pt-4 px-4 snap-x snap-mandatory gap-4 no-scrollbar">
              {tableItems.map((item, i) => (
                <div
                  key={item.id}
                  className={`min-w-[95px] w-[95px] h-[95px] snap-center shrink-0 rounded-xl flex flex-col items-center justify-center p-2 text-center transition-all duration-300 ${i === activeIdx
                    ? "bg-[#181818] border-2 border-[#FFD700] shadow-[0_5px_20px_rgba(255,215,0,0.15)] scale-105"
                    : "bg-[#121212] border border-white/10 opacity-70 scale-95"
                    }`}
                  onClick={() => setActiveIdx(i)}
                >
                  <span className="text-[10px] font-serif font-bold text-white mb-1.5 leading-tight line-clamp-2">{item.name}</span>
                  <span className="text-[11px] font-bold text-[#FFD700] mb-1.5">{item.price}</span>
                  <span className={`text-[7px] uppercase tracking-widest px-1.5 py-0.5 rounded-full ${i === activeIdx ? 'bg-[#FFD700]/10 text-[#FFD700]' : 'text-[#A3A3A3]'}`}>
                    Serves {item.serves}
                  </span>
                </div>
              ))}
            </div>

            {/* Right: Selected Package Description */}
            <div className="w-full lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md bg-[#121212] border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden group shadow-2xl"
                >
                  {/* Subtle top border accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50" />

                  <span className="inline-block px-3 py-1 bg-[#FFD700]/10 text-[#FFD700] text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                    {activeItem.highlight}
                  </span>

                  <h3 className="text-3xl lg:text-4xl font-serif font-bold mb-4 leading-tight">
                    {activeItem.name}
                  </h3>

                  <p className="text-[#A3A3A3] text-sm lg:text-base leading-relaxed mb-8">
                    {activeItem.shortDesc}
                  </p>

                  <div className="flex items-end gap-4 mb-8 pb-8 border-b border-white/10">
                    <div className="text-4xl lg:text-5xl font-bold text-[#FFD700]">
                      {activeItem.price}
                    </div>
                    <div className="text-white/50 text-sm font-medium pb-2 uppercase tracking-wide">
                      Serves {activeItem.serves}
                    </div>
                  </div>

                  <div className="mb-10">
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Includes:</h4>
                    <ul className="space-y-3">
                      {activeItem.includes.map((inc, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-[#D4D4D4] text-sm">
                          <span className="text-[#FFD700] mt-0.5">•</span>
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full py-4 bg-[#FFD700] hover:bg-[#EAB308] text-black font-bold uppercase tracking-widest text-sm rounded-full transition-colors flex items-center justify-center gap-2">
                    Add to Booking <ArrowRight size={16} />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. Normal Menu Section ────────────────────────────────────── */}
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase mb-4">
              Explore Our Full Menu
            </h2>
            <p className="text-[#A3A3A3] max-w-xl mx-auto text-base">
              Browse classic GRAS favourites, sides, bites, and drinks available alongside our signature packages.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-16 max-w-4xl mx-auto">
            {NORMAL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveNormalCategory(cat)}
                className={`px-5 py-2 text-xs md:text-sm font-semibold tracking-wider uppercase rounded-full border transition-all duration-300 ${activeNormalCategory === cat
                  ? "bg-white text-black border-white"
                  : "bg-[#121212] text-[#A3A3A3] border-white/10 hover:border-white/30 hover:text-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredNormalMenu.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#121212] border border-white/5 rounded-2xl p-6 hover:border-[#FFD700]/30 transition-colors group flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className="font-serif font-bold text-lg text-white group-hover:text-[#FFD700] transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-[#FFD700] font-bold">{item.price}</span>
                  </div>

                  <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6 flex-grow">
                    {item.shortDesc}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-white/30 text-xs font-semibold uppercase tracking-widest">
                      {item.category}
                    </span>
                    {item.tag && (
                      <span className="text-[#FFD700] bg-[#FFD700]/10 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                        {item.tag}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
