"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SphereSection from "@/components/SphereSection";

const IMAGES = [
  { src: "/restaurant_hero_1778921073817.png",   alt: "Interior" },
  { src: "/food_combo_1_1778921093061.png",       alt: "Food" },
  { src: "/byob_special_menu_1778921115733.png",  alt: "Drinks" },
  { src: "/restaurant_hero_1778921073817.png",    alt: "Vibe" },
  { src: "/food_combo_1_1778921093061.png",       alt: "Details" },
  { src: "/byob_special_menu_1778921115733.png",  alt: "Atmosphere" },
  { src: "/restaurant_hero_1778921073817.png",    alt: "Night" },
];

const GalleryItem = ({
  src, alt, className, delay,
}: {
  src: string; alt: string; className?: string; delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.55 }}
    whileHover={{ scale: 1.015 }}
    className={`relative overflow-hidden rounded-3xl border border-white/8 group cursor-pointer ${className ?? ""}`}
  >
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-all duration-700 group-hover:scale-108 group-hover:brightness-70"
    />
    {/* Hover caption */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-7">
      <p className="text-primary text-base font-semibold tracking-widest uppercase translate-y-3 group-hover:translate-y-0 transition-transform duration-500"
        style={{ fontFamily: "var(--font-serif)" }}>
        {alt}
      </p>
    </div>
    {/* Subtle gold border on hover */}
    <div className="absolute inset-0 border-0 group-hover:border-2 border-primary/20 rounded-3xl transition-all duration-500 pointer-events-none" />
  </motion.div>
);

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-28">
      <div className="container mx-auto px-6">

        {/* ── Header ── */}
        <SphereSection>
        <div className="text-center mb-16">
          <p className="section-label mb-4">A Visual Journey</p>
          <h1 className="section-title">The Gallery</h1>
          <p className="text-[#A3A3A3] text-base mt-4">Capturing the energy and elegance of GRAS.</p>
        </div>
        </SphereSection>

        {/* ── Masonry-style Grid ── */}
        <SphereSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Row 1: three vertical */}
          <GalleryItem src={IMAGES[0].src} alt={IMAGES[0].alt} className="aspect-[3/4]" delay={0.05} />
          <GalleryItem src={IMAGES[1].src} alt={IMAGES[1].alt} className="aspect-[3/4]" delay={0.12} />
          <GalleryItem src={IMAGES[2].src} alt={IMAGES[2].alt} className="aspect-[3/4]" delay={0.19} />

          {/* Row 2: two images + statement tile */}
          <GalleryItem src={IMAGES[3].src} alt={IMAGES[3].alt} className="aspect-[3/4]" delay={0.26} />

          {/* Statement tile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col items-center justify-center p-10 bg-primary rounded-3xl relative group overflow-hidden aspect-[3/4] cursor-default"
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-500" />
            <h2
              className="text-black text-4xl md:text-5xl text-center leading-snug mb-5 z-10"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
            >
              Urban<br />Dining<br />Defined
            </h2>
            <div className="w-14 h-0.5 bg-black/30 rounded-full z-10 transition-all duration-300 group-hover:w-28" />
          </motion.div>

          <GalleryItem src={IMAGES[4].src} alt={IMAGES[4].alt} className="aspect-[3/4]" delay={0.34} />

          {/* Row 3: 1 square + 1 wide */}
          <GalleryItem src={IMAGES[5].src} alt={IMAGES[5].alt} className="md:col-span-1 aspect-square" delay={0.4} />
          <GalleryItem src={IMAGES[6].src} alt={IMAGES[6].alt} className="md:col-span-2 aspect-[16/9] md:h-auto" delay={0.46} />

        </div>
        </SphereSection>
      </div>
    </div>
  );
};

export default GalleryPage;
