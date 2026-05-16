"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home",         href: "/" },
    { name: "Menu",         href: "/menu" },
    { name: "Gallery",      href: "/gallery" },
    { name: "Reservations", href: "/reservations" },
    { name: "Contact",      href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-lg border-b border-white/8 py-4 shadow-[0_4px_32px_rgba(0,0,0,0.6)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(255,215,0,0.4)]">
            <span className="text-black font-bold text-base" style={{ fontFamily: "var(--font-serif)" }}>G</span>
          </div>
          <span
            className="text-white font-semibold text-xl tracking-wide hidden sm:block"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            GRAS
          </span>
        </Link>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-text-secondary hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ── Book Now CTA ── */}
        <div className="hidden md:block">
          <Link
            href="/reservations"
            className="px-5 py-2.5 border border-primary text-primary rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-primary hover:text-black transition-all duration-300"
          >
            Book Now
          </Link>
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          className="md:hidden text-white/70 hover:text-white p-2 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/8 px-6 py-8 md:hidden"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium tracking-wide transition-colors ${
                    pathname === link.href ? "text-primary" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/reservations"
                onClick={() => setIsOpen(false)}
                className="mt-3 w-full py-3 bg-primary text-black rounded-full text-center text-sm font-bold tracking-widest uppercase hover:bg-primary-hover transition-colors"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
