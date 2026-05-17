"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const HERO_SLIDES = [
  {
    image: "/restaurant_hero_1778921073817.png",
    tagline: "Elevated Dining.",
    taglineBold: "Urban Soul.",
    subtitle: "Experience the perfect blend of premium cuisine and an intimate, vibrant atmosphere.",
  },
  {
    image: "/food_combo_1_1778921093061.png",
    tagline: "Unforgettable",
    taglineBold: "Flavours.",
    subtitle: "Carefully curated dishes designed to complement your favourite drinks.",
  },
  {
    image: "/byob_special_menu_1778921115733.png",
    tagline: "Your Drinks.",
    taglineBold: "Our Vibe.",
    subtitle: "Bring your favourite bottle and enjoy our exclusive BYOB experience.",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => setCurrentSlide((p) => (p + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="overflow-hidden">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative h-screen w-full flex items-center justify-center">
        {/* Background image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[currentSlide].image}
              alt="GRAS Restaurant"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient: heavier at bottom so text always readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Hero content */}
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.9, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            {/* Small label */}
            <p className="section-label mb-5">Premium BYOB Restaurant · Gampaha</p>

            {/* Hero heading */}
            <h1 className="hero-title mb-6">
              {HERO_SLIDES[currentSlide].tagline}{" "}
              <span className="text-gradient-gold">{HERO_SLIDES[currentSlide].taglineBold}</span>
            </h1>

            <p className="text-[#D4D4D4] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/menu" className="btn-primary">
                View Menu
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slide controls */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full border border-white/15 text-white/60 hover:text-primary hover:border-primary/60 transition-all duration-300 z-20"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full border border-white/15 text-white/60 hover:text-primary hover:border-primary/60 transition-all duration-300 z-20"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-0.5 rounded-full transition-all duration-400 ${
                i === currentSlide ? "w-10 bg-primary" : "w-4 bg-white/20"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ── BYOB Vibe (Image Left Layout) ─────────────────────────────────── */}
      <section className="py-32 bg-[#0B0B0B] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Left: Image Composition */}
            <div className="flex-1 relative w-full aspect-[4/5] lg:aspect-square max-w-2xl mx-auto lg:mx-0">
              {/* Main Large Image */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
              >
                <Image 
                  src="/restaurant_hero_1778921073817.png" 
                  alt="Restaurant Vibe" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent" />
              </motion.div>
              
              {/* Overlapping Secondary Image */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-8 -right-8 w-2/3 aspect-[4/3] rounded-[2rem] overflow-hidden border-4 border-[#0B0B0B] shadow-[0_0_50px_rgba(255,215,0,0.1)] z-10"
              >
                <Image 
                  src="/food_combo_1_1778921093061.png" 
                  alt="Premium Dishes" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                />
              </motion.div>
            </div>

            {/* Right: Text Content */}
            <div className="flex-1 flex flex-col justify-center mt-12 lg:mt-0">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-label mb-6"
              >
                The GRAS Experience
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl md:text-7xl font-serif text-white leading-[1.1] tracking-tight mb-8 uppercase"
              >
                BYOB Dining,<br />
                <span className="text-gradient-gold">Reimagined.</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-[#A3A3A3] text-lg leading-relaxed font-light mb-12"
              >
                We&apos;ve combined the absolute freedom of BYOB with the deep sophistication of a high-end restaurant. 
                Whether you&apos;re here for a private celebration or an energetic night out, GRAS provides the perfect backdrop.
              </motion.p>

              <div className="space-y-8">
                {[
                  {
                    title: "Ultimate Freedom",
                    desc: "Bring your absolute favourite spirits. We supply premium glassware, ice, and curated mixers.",
                    highlight: true
                  },
                  {
                    title: "Urban Energy",
                    desc: "Immerse yourself in our curated soundtrack and refined architectural design.",
                    highlight: false
                  },
                  {
                    title: "Premium Service",
                    desc: "Experience attentive, non-intrusive service tailored to complement your evening perfectly.",
                    highlight: false
                  }
                ].map((feature, idx) => (
                  <motion.div 
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                    className="flex gap-6 group"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-500 ${feature.highlight ? 'bg-[rgba(255,215,0,0.1)] border-primary text-primary' : 'bg-white/5 border-white/10 text-white group-hover:border-white/30'}`}>
                      <span className="font-serif font-bold italic">0{idx + 1}</span>
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold tracking-widest uppercase mb-2 transition-colors ${feature.highlight ? 'text-primary' : 'text-white'}`}>
                        {feature.title}
                      </h3>
                      <p className="text-[#A3A3A3] text-sm font-light leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ────────────────────────────────────────────── */}
      <section className="py-28 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-14">
            <div>
              <p className="section-label mb-3">A Glimpse Inside</p>
              <h2 className="section-title">The Venue</h2>
            </div>
            <Link
              href="/gallery"
              className="text-primary text-sm font-semibold tracking-wide flex items-center gap-2 hover:gap-3 transition-all duration-300"
            >
              Full Gallery <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { src: "/restaurant_hero_1778921073817.png",  label: "Main Dining" },
              { src: "/food_combo_1_1778921093061.png",     label: "Private Corner", offset: true },
              { src: "/byob_special_menu_1778921115733.png",label: "The Bar" },
            ].map(({ src, label, offset }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.35 }}
                className={`relative overflow-hidden rounded-3xl border border-white/8 ${
                  offset ? "md:mt-10" : ""
                }`}
                style={{ aspectRatio: "3/4" }}
              >
                <Image src={src} alt={label} fill className="object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white text-sm font-semibold tracking-widest uppercase">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
