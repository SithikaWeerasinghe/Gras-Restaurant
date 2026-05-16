"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const GalleryPage = () => {
  const images = [
    { src: "/restaurant_hero_1778921073817.png", alt: "Interior" },
    { src: "/food_combo_1_1778921093061.png", alt: "Food" },
    { src: "/byob_special_menu_1778921115733.png", alt: "Drinks" },
    { src: "/restaurant_hero_1778921073817.png", alt: "Vibe" },
    { src: "/food_combo_1_1778921093061.png", alt: "Details" },
    { src: "/byob_special_menu_1778921115733.png", alt: "Atmosphere" },
    { src: "/restaurant_hero_1778921073817.png", alt: "Night" },
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic mb-4">THE GALLERY</h1>
          <p className="text-primary font-bold uppercase tracking-widest italic">Capturing the Energy of GRAS</p>
        </div>

        {/* Dynamic Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Row: 3 Vertical Rectangles */}
          <GalleryItem src={images[0].src} alt={images[0].alt} className="aspect-[3/4]" delay={0.1} />
          <GalleryItem src={images[1].src} alt={images[1].alt} className="aspect-[3/4]" delay={0.2} />
          <GalleryItem src={images[2].src} alt={images[2].alt} className="aspect-[3/4]" delay={0.3} />

          {/* Middle Row: 2 Outer, 1 Center Text Box */}
          <GalleryItem src={images[3].src} alt={images[3].alt} className="aspect-[3/4]" delay={0.4} />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center p-12 bg-primary rounded-3xl border-4 border-primary transition-all duration-500 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
            <h2 className="text-black font-black text-4xl md:text-5xl text-center uppercase italic leading-tight mb-4 z-10">
              URBAN<br />DINING<br />DEFINED
            </h2>
            <div className="w-16 h-1 bg-black rounded-full z-10 transition-all group-hover:w-32" />
            
            {/* Spotlight overlay effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
            </div>
          </motion.div>

          <GalleryItem src={images[4].src} alt={images[4].alt} className="aspect-[3/4]" delay={0.5} />

          {/* Bottom Row: 2 Horizontal or Large Vertical */}
          <GalleryItem src={images[5].src} alt={images[5].alt} className="md:col-span-1 aspect-square" delay={0.6} />
          <GalleryItem src={images[6].src} alt={images[6].alt} className="md:col-span-2 aspect-[16/9] md:aspect-auto" delay={0.7} />
        </div>
      </div>
    </div>
  );
};

const GalleryItem = ({ src, alt, className, delay }: { src: string; alt: string; className: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ scale: 1.02 }}
    className={`relative overflow-hidden rounded-3xl border border-white/10 group cursor-pointer ${className}`}
  >
    <Image 
      src={src} 
      alt={alt} 
      fill 
      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75" 
    />
    
    {/* Spotlight / Yellow Border effect on hover */}
    <div className="absolute inset-0 border-0 group-hover:border-[12px] border-primary/20 transition-all duration-500" />
    
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
      <p className="text-primary font-black uppercase italic tracking-tighter text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        {alt}
      </p>
    </div>
  </motion.div>
);

export default GalleryPage;
