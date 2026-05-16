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
              <Link href="/reservations" className="btn-primary">
                Book a Table
              </Link>
              <Link href="/menu" className="btn-secondary">
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

      {/* ── BYOB Vibe ──────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#0B0B0B]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">

            {/* Left: headline */}
            <div className="flex-1">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-label mb-4"
              >
                The GRAS Experience
              </motion.p>
              <motion.h2
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="section-title mb-4"
              >
                BYOB Dining,{" "}
                <span className="text-gradient-gold">Reimagined.</span>
              </motion.h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-px bg-white/8 mt-8 origin-left w-full"
              />
            </div>

            {/* Right: body + feature cards */}
            <div className="flex-1">
              <p className="text-[#A3A3A3] text-base leading-loose mb-8">
                We&apos;ve combined the freedom of BYOB with the sophistication of a high-end restaurant.
                Whether you&apos;re here for a private celebration or a relaxed evening out,
                GRAS provides the perfect backdrop.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: "BYOB Freedom",
                    body: "Bring your favourite spirits — we supply premium glassware, ice, and mixers.",
                    gold: true,
                  },
                  {
                    title: "Urban Energy",
                    body: "Immerse yourself in our curated soundtrack and refined architectural design.",
                    gold: false,
                  },
                ].map((f) => (
                  <div
                    key={f.title}
                    className={`p-6 rounded-2xl border transition-colors duration-300 ${
                      f.gold
                        ? "border-primary/20 bg-[rgba(255,215,0,0.04)] hover:border-primary/40"
                        : "border-white/8 bg-[#121212] hover:border-white/15"
                    }`}
                  >
                    <h3 className={`text-sm font-semibold uppercase tracking-widest mb-2 ${f.gold ? "text-primary" : "text-white"}`}>
                      {f.title}
                    </h3>
                    <p className="text-xs text-[#A3A3A3] leading-relaxed">{f.body}</p>
                  </div>
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
