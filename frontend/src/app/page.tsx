"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const HERO_SLIDES = [
  {
    image: "/restaurant_hero_1778921073817.png",
    tagline: "Elevated Dining. Urban Soul.",
    subtitle: "Experience the perfect blend of premium cuisine and a vibrant atmosphere.",
  },
  {
    image: "/food_combo_1_1778921093061.png",
    tagline: "Unforgettable Flavors.",
    subtitle: "Carefully curated dishes designed to tantalize your taste buds.",
  },
  {
    image: "/byob_special_menu_1778921115733.png",
    tagline: "Your Drinks. Our Vibe.",
    subtitle: "Bring your favorite bottle and enjoy our exclusive BYOB experience.",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[currentSlide].image}
              alt="Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase italic">
              {HERO_SLIDES[currentSlide].tagline}
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/reservations"
                className="px-8 py-4 bg-primary text-black font-black uppercase tracking-widest rounded-full hover:bg-accent transition-all duration-300 transform hover:scale-105"
              >
                Book Now
              </Link>
              <Link
                href="/menu"
                className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all duration-300"
              >
                View Menu
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/10 text-white hover:bg-primary hover:text-black transition-all z-20 group"
        >
          <ChevronLeft size={32} className="group-hover:scale-110" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/10 text-white hover:bg-primary hover:text-black transition-all z-20 group"
        >
          <ChevronRight size={32} className="group-hover:scale-110" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-1 ${
                currentSlide === index ? "bg-primary" : "bg-white/20"
              } transition-colors rounded-full`}
            />
          ))}
        </div>
      </section>

      {/* Vibe Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <motion.h2 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="text-6xl md:text-9xl font-black text-white leading-none uppercase italic"
              >
                BYOB <span className="text-primary">PART</span>
              </motion.h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className="h-1 bg-white/10 my-8 origin-left"
              />
              <motion.h2 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="text-6xl md:text-9xl font-black text-white/20 leading-none uppercase italic text-right"
              >
                RESTAURANT <span className="text-white">VIBE</span>
              </motion.h2>
            </div>
            <div className="flex-1">
              <p className="text-xl text-white/50 leading-relaxed mb-8">
                We&apos;ve combined the freedom of BYOB with the sophistication of a high-end restaurant. 
                Whether you&apos;re here for a private celebration or an energetic night out, 
                GRAS provides the perfect backdrop.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 border border-white/10 rounded-2xl hover:border-primary/50 transition-colors group">
                  <h3 className="text-primary font-black mb-2 uppercase">BYOB Freedom</h3>
                  <p className="text-sm text-white/40">Bring your favorite spirits and we&apos;ll handle the rest with premium glassware and mixers.</p>
                </div>
                <div className="p-6 border border-white/10 rounded-2xl hover:border-primary/50 transition-colors group">
                  <h3 className="text-white font-black mb-2 uppercase">Urban Energy</h3>
                  <p className="text-sm text-white/40">Immerse yourself in our curated playlist and sleek architectural design.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic mb-4">THE VENUE</h2>
              <p className="text-white/50">A glimpse into our world.</p>
            </div>
            <Link href="/gallery" className="text-primary font-bold flex items-center gap-2 group">
              View All Gallery <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square md:aspect-[3/4] overflow-hidden rounded-3xl border border-white/10"
            >
              <Image src="/restaurant_hero_1778921073817.png" alt="Venue 1" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <p className="text-white font-bold uppercase tracking-widest">Main Dining</p>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square md:aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 md:mt-12"
            >
              <Image src="/food_combo_1_1778921093061.png" alt="Venue 2" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <p className="text-white font-bold uppercase tracking-widest">Private Corner</p>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square md:aspect-[3/4] overflow-hidden rounded-3xl border border-white/10"
            >
              <Image src="/byob_special_menu_1778921115733.png" alt="Venue 3" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <p className="text-white font-bold uppercase tracking-widest">The Bar</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
