"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const COMBO_PACKAGES = [
  { id: 1, name: "Urban Feast Combo", price: "$45", image: "/food_combo_1_1778921093061.png", description: "Grilled wings, loaded fries, and signature sliders." },
  { id: 2, name: "Gras Signature Platter", price: "$65", image: "/restaurant_hero_1778921073817.png", description: "Premium cuts with seasonal roasted vegetables." },
  { id: 3, name: "Street Style Mix", price: "$35", image: "/byob_special_menu_1778921115733.png", description: "Authentic local flavors with a modern twist." },
  { id: 4, name: "Midnight Snack Pack", price: "$25", image: "/food_combo_1_1778921093061.png", description: "The perfect late-night companion." },
  { id: 5, name: "Luxury Duo", price: "$85", image: "/restaurant_hero_1778921073817.png", description: "A selection of our finest chef specials for two." },
  { id: 6, name: "Vibe Sampler", price: "$40", image: "/byob_special_menu_1778921115733.png", description: "A bit of everything that makes GRAS unique." },
];

const BYOB_SPECIALS = [
  { id: 7, name: "Steak & Spirits", price: "$55", image: "/byob_special_menu_1778921115733.png", description: "Tender ribeye perfectly paired with dark spirits." },
  { id: 8, name: "Seafood & White Wine", price: "$48", image: "/food_combo_1_1778921093061.png", description: "Fresh catch with citrus infusions." },
  { id: 9, name: "Spicy Bites", price: "$30", image: "/restaurant_hero_1778921073817.png", description: "Hot and zesty appetizers for a lively night." },
];

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState("Combo Packages");

  const currentItems = activeTab === "Combo Packages" ? COMBO_PACKAGES : BYOB_SPECIALS;

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white uppercase italic mb-6"
          >
            MENU
          </motion.h1>
          <div className="max-w-2xl mx-auto">
            <div className="h-px bg-white/10 w-full mb-6" />
            <p className="text-white/50 text-lg uppercase tracking-widest italic">
              Experience a fusion of bold urban flavors and premium ingredients. 
              Our menu is designed to complement your favorite drinks.
            </p>
            <div className="h-px bg-white/10 w-full mt-6" />
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
          {["Combo Packages", "BYOB Special Menu"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-12 py-6 text-xl font-black uppercase italic transition-all duration-300 rounded-2xl border ${
                activeTab === tab 
                  ? "bg-primary text-black border-primary scale-105" 
                  : "bg-transparent text-white/50 border-white/10 hover:border-primary/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Food Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {currentItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group bg-secondary rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 right-4 bg-primary px-4 py-2 rounded-full">
                    <span className="text-black font-black text-lg italic">{item.price}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-white uppercase italic mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <button className="mt-6 text-primary text-sm font-bold uppercase tracking-widest flex items-center gap-2 group/btn">
                    Details <div className="h-px w-0 group-hover/btn:w-8 bg-primary transition-all duration-300" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default MenuPage;
