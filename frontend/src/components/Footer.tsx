import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Globe, Share2, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] border-t border-white/8 pt-16 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* ── Brand ── */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_14px_rgba(255,215,0,0.35)]">
                <span className="text-black font-bold text-sm" style={{ fontFamily: "var(--font-serif)" }}>G</span>
              </div>
              <span
                className="text-white font-semibold text-lg tracking-wide"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                GRAS
              </span>
            </Link>
            <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6">
              A premium BYOB dining experience where elevated cuisine meets an intimate urban atmosphere.
            </p>
            <div className="flex gap-3">
              {[Globe, Share2, MessageSquare].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#A3A3A3] hover:text-primary hover:border-primary/50 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6">
              Explore
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-[#A3A3A3]">
              {[
                { label: "Home",         href: "/" },
                { label: "Menu",         href: "/menu" },
                { label: "Gallery",      href: "/gallery" },
                { label: "Reservations", href: "/reservations" },
                { label: "Contact",      href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Info ── */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6">
              Find Us
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-[#A3A3A3]">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                <span>123 Urban Avenue,<br />Gampaha, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-primary shrink-0" />
                <span>+94 71 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-primary shrink-0" />
                <span>hello@grasrestaurant.com</span>
              </li>
            </ul>
          </div>

          {/* ── Hours ── */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-6">
              Opening Hours
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-[#A3A3A3]">
              {[
                { days: "Mon – Thu", hours: "5:00 PM – 11:00 PM" },
                { days: "Fri – Sat", hours: "4:00 PM – 1:00 AM" },
                { days: "Sunday",    hours: "11:00 AM – 10:00 PM" },
              ].map((row) => (
                <li key={row.days} className="flex justify-between gap-4">
                  <span>{row.days}</span>
                  <span className="text-[#D4D4D4]">{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#A3A3A3] text-xs">
            © {new Date().getFullYear()} GRAS Restaurant. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[#A3A3A3]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
