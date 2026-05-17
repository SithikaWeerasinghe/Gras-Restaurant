"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Music } from "lucide-react";
import SphereSection from "@/components/SphereSection";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  name: string;
  phone: string;
  email: string;
  inquiryType: string;
  guests: string;
  date: string;
  time: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const INQUIRY_TYPES = [
  "General Inquiry",
  "Table Reservation Help",
  "Birthday / Private Event",
  "Group Dining",
  "BYOB Night Inquiry",
  "Feedback",
];

// ─── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ─── Component ─────────────────────────────────────────────────────────────────

const ContactPage = () => {
  // Form state
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    inquiryType: "",
    guests: "",
    date: "",
    time: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // Field update
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Please enter your name.";
    if (!form.phone.trim()) newErrors.phone = "Please enter your phone number.";
    if (!form.email.trim()) newErrors.email = "Please enter your email.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Please enter a valid email.";
    if (!form.inquiryType) newErrors.inquiryType = "Please select an inquiry type.";
    if (!form.message.trim()) newErrors.message = "Please add a brief message.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    // TODO: Later connect this form to POST /api/contact-inquiries 
    // so the inquiry can be saved and sent to the restaurant owner by email or WhatsApp notification.
    
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({
      name: "",
      phone: "",
      email: "",
      inquiryType: "",
      guests: "",
      date: "",
      time: "",
      message: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO & INTRO SECTION (COMBINED)
      ══════════════════════════════════════════════════════════════════════ */}
      {/* flat: full-screen image hero looks best without rotateX tilt */}
      <SphereSection flat>
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden pt-20 pb-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/contact-hero.jpg"
            alt="Contact GRAS"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark Overlay - slightly darker so text is very readable */}
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            {/* Small Gold Label */}
            <motion.p
              variants={fadeUp}
              className="text-[#FFD700] text-sm font-semibold tracking-widest uppercase mb-4"
            >
              Contact GRAS
            </motion.p>

            {/* Main Heading */}
            <motion.h2
              variants={fadeUp}
              className="text-5xl md:text-7xl text-white mb-6"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
            >
              Get in <span className="text-[#FFD700]">Touch</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-[#D4D4D4] text-lg md:text-xl leading-relaxed max-w-3xl"
            >
              Whether it&apos;s an intimate dinner, a birthday celebration, a private gathering, or a relaxed BYOB evening, our team is here to help you plan a memorable GRAS experience.
            </motion.p>
          </motion.div>
        </div>
      </section>
      </SphereSection>

      {/* ══════════════════════════════════════════════════════════════════════
          2. MAP AND CONTACT INFO SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <SphereSection>
      <section className="py-20 bg-[#0B0B0B]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
            {/* Left: Map Area */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 flex flex-col"
            >
              <div className="flex-1 w-full bg-[#121212] border border-white/10 rounded-2xl overflow-hidden min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58585971485!2d79.77380251121852!3d6.92192208467262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1714421456987!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GRAS Restaurant Location"
                />
              </div>
            </motion.div>

            {/* Right: Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2 flex flex-col justify-center"
            >
              <h3
                className="text-3xl md:text-4xl text-white mb-10"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
              >
                Find us at the heart of Colombo.
              </h3>

              <div className="space-y-8">
                {/* Block 1: Address */}
                <div>
                  <p className="text-[#A3A3A3] text-sm uppercase tracking-widest font-semibold mb-2">
                    Address
                  </p>
                  <p className="text-white text-lg">
                    GRAS Restaurant, Colombo, Sri Lanka
                  </p>
                </div>

                {/* Block 2: Contact */}
                <div>
                  <p className="text-[#A3A3A3] text-sm uppercase tracking-widest font-semibold mb-2">
                    Contact
                  </p>
                  <p className="text-white text-lg">+94 77 000 0000</p>
                </div>

                {/* Block 3: Email */}
                <div>
                  <p className="text-[#A3A3A3] text-sm uppercase tracking-widest font-semibold mb-2">
                    Email
                  </p>
                  <a href="mailto:info@grasrestaurant.lk" className="text-white text-lg hover:text-[#FFD700] transition-colors">
                    info@grasrestaurant.lk
                  </a>
                </div>

                {/* Block 4: Hours */}
                <div>
                  <p className="text-[#A3A3A3] text-sm uppercase tracking-widest font-semibold mb-2">
                    Opening Hours
                  </p>
                  <p className="text-white text-lg">4:00 PM – 11:00 PM</p>
                </div>

                {/* Block 5: Social Media */}
                <div className="pt-2">
                  <p className="text-[#A3A3A3] text-sm uppercase tracking-widest font-semibold mb-4">
                    Social Media
                  </p>
                  <div className="flex gap-4">
                    {/* Facebook Icon Button */}
                    <a
                      href="https://facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center bg-[#121212] border border-white/10 rounded-full text-white font-bold text-xl hover:border-[#FFD700] hover:text-[#FFD700] transition-all"
                      aria-label="Facebook"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      f
                    </a>
                    {/* TikTok Icon Button (using Music icon as fallback) */}
                    <a
                      href="https://www.tiktok.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center bg-[#121212] border border-white/10 rounded-full text-white hover:border-[#FFD700] hover:text-[#FFD700] transition-all"
                      aria-label="TikTok"
                    >
                      <Music size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      </SphereSection>

      {/* ══════════════════════════════════════════════════════════════════════
          3. EVENT AND INQUIRY FORM SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <SphereSection>
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-[#FFD700] text-sm font-semibold tracking-widest uppercase mb-4">
                Events &amp; Inquiries
              </p>
              <h2
                className="text-4xl md:text-5xl text-white mb-4"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
              >
                Send Us a <span className="text-[#FFD700]">Message</span>
              </h2>
              <p className="text-[#D4D4D4] text-lg">
                Fill in the form below and our team will get back to you shortly.
              </p>
            </div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#121212] border border-white/10 rounded-3xl p-8 md:p-12"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
                  <div className="w-16 h-16 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center">
                    <CheckCircle size={32} className="text-[#FFD700]" />
                  </div>
                  <div>
                    <h3
                      className="text-white text-2xl font-semibold mb-3"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      Thank you!
                    </h3>
                    <p className="text-[#D4D4D4] text-base leading-relaxed max-w-md">
                      Your inquiry has been received. Our team will contact you soon.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-8 py-3 border border-[#FFD700] text-[#FFD700] rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-[#FFD700] hover:text-black transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Full Name <span className="text-[#FFD700]">*</span>
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full bg-black border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#FFD700] transition-colors`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Phone Number <span className="text-[#FFD700]">*</span>
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className={`w-full bg-black border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#FFD700] transition-colors`}
                        placeholder="+94 77 000 0000"
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-2">{errors.phone}</p>}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Email Address <span className="text-[#FFD700]">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full bg-black border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#FFD700] transition-colors`}
                        placeholder="hello@example.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email}</p>}
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Inquiry Type <span className="text-[#FFD700]">*</span>
                      </label>
                      <select
                        name="inquiryType"
                        value={form.inquiryType}
                        onChange={handleChange}
                        className={`w-full bg-black border ${errors.inquiryType ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-[#FFD700] transition-colors`}
                      >
                        <option value="" disabled className="text-[#A3A3A3]">
                          Select inquiry type
                        </option>
                        {INQUIRY_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.inquiryType && <p className="text-red-400 text-xs mt-2">{errors.inquiryType}</p>}
                    </div>

                    {/* Guests (Optional) */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Number of Guests
                      </label>
                      <input
                        name="guests"
                        type="text"
                        value={form.guests}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#FFD700] transition-colors"
                        placeholder="E.g., 4"
                      />
                    </div>

                    {/* Preferred Date (Optional) */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Preferred Date
                      </label>
                      <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#FFD700] transition-colors [color-scheme:dark]"
                      />
                    </div>

                    {/* Preferred Time (Optional) */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Preferred Time
                      </label>
                      <input
                        name="time"
                        type="time"
                        value={form.time}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#FFD700] transition-colors [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Message <span className="text-[#FFD700]">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      className={`w-full bg-black border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#FFD700] transition-colors resize-none`}
                      placeholder="Tell us about your plans — date, number of guests, occasion, and any special requests..."
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-2">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex justify-center md:justify-end">
                    <button
                      type="submit"
                      className="w-full md:w-auto px-10 py-4 bg-[#FFD700] text-black rounded-full font-bold tracking-widest text-sm uppercase hover:bg-[#EAB308] transition-colors"
                    >
                      Send Inquiry
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      </SphereSection>
    </div>
  );
};

export default ContactPage;
