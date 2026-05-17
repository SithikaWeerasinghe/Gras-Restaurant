"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CircularScrollMenu from "@/components/CircularScrollMenu";
import SphereSection from "@/components/SphereSection";

const COMBO_PACKAGES = [
  { id: 1, name: "Urban Feast Combo",       price: "$45", image: "/food_combo_1_1778921093061.png",      description: "Grilled wings, loaded fries, and signature sliders." },
  { id: 2, name: "Gras Signature Platter",  price: "$65", image: "/restaurant_hero_1778921073817.png",   description: "Premium cuts with seasonal roasted vegetables." },
  { id: 3, name: "Street Style Mix",        price: "$35", image: "/byob_special_menu_1778921115733.png", description: "Authentic local flavours with a modern twist." },
  { id: 4, name: "Midnight Snack Pack",     price: "$25", image: "/food_combo_1_1778921093061.png",      description: "The perfect late-night companion." },
  { id: 5, name: "Luxury Duo",              price: "$85", image: "/restaurant_hero_1778921073817.png",   description: "A selection of our finest chef specials for two." },
  { id: 6, name: "Vibe Sampler",            price: "$40", image: "/byob_special_menu_1778921115733.png", description: "A bit of everything that makes GRAS unique." },
];

const BYOB_SPECIALS = [
  { id: 7, name: "Steak & Spirits",         price: "$55", image: "/byob_special_menu_1778921115733.png", description: "Tender ribeye perfectly paired with dark spirits." },
  { id: 8, name: "Seafood & White Wine",    price: "$48", image: "/food_combo_1_1778921093061.png",      description: "Fresh catch with citrus infusions." },
  { id: 9, name: "Spicy Bites",             price: "$30", image: "/restaurant_hero_1778921073817.png",   description: "Hot and zesty appetisers for a lively evening." },
];

const TABS = ["Combo Packages", "BYOB Special Menu"] as const;
type Tab = typeof TABS[number];

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Combo Packages");
  const items = activeTab === "Combo Packages" ? COMBO_PACKAGES : BYOB_SPECIALS;

  return (
    <SphereSection>
    <div className="min-h-screen bg-[#050505] pt-32 pb-28">
      <div className="container mx-auto px-6">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label mb-4"
          >
            What We Offer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Our Menu
          </motion.h1>
          <div className="max-w-xl mx-auto mt-6">
            <div className="h-px bg-white/8 w-full mb-6" />
            <p className="text-[#A3A3A3] text-base leading-relaxed">
              A fusion of bold flavours and premium ingredients, crafted to complement
              your favourite drinks.
            </p>
            <div className="h-px bg-white/8 w-full mt-6" />
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3.5 text-sm font-semibold tracking-widest uppercase rounded-full border transition-all duration-300 ${
                activeTab === tab
                  ? "bg-primary text-black border-primary"
                  : "bg-transparent text-[#A3A3A3] border-white/10 hover:border-primary/40 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Circular Scroll ── */}
        <motion.div
          layout
          key={activeTab}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <CircularScrollMenu items={items} />
        </motion.div>

      </div>
    </div>
    </SphereSection>
  );
};

export default MenuPage;
