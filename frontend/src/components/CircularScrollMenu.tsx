"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useSpring } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface MenuItem {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

interface CircularScrollMenuProps {
  items: MenuItem[];
}

// ─── Constants ────────────────────────────────────────────────────────────────
const CIRCLE_SIZE   = 600;   // px – diameter of the glass circle
const CARD_W        = 220;   // px – card width
const CARD_H        = 280;   // px – card height
const ORBIT_RADIUS  = 190;   // px – distance from circle centre to card centre
const SCROLL_SPEED  = 0.003; // radians per pixel of wheel delta


// ─── Main Component ───────────────────────────────────────────────────────────
export default function CircularScrollMenu({ items }: CircularScrollMenuProps) {
  // Angle offset (radians). Spring makes it feel premium.
  const rawAngle = useRef(0);
  const springAngle = useSpring(0, { stiffness: 60, damping: 18 });

  // Track whether we're on a small screen (mobile fallback)
  const [isMobile, setIsMobile] = useState(false);

  // Active index for visual highlight
  const [activeIdx, setActiveIdx] = useState(0);

  // Keep spring display value in sync so we can read it
  const [displayAngle, setDisplayAngle] = useState(0);

  useEffect(() => {
    const unsub = springAngle.on("change", (v) => setDisplayAngle(v));
    return () => unsub();
  }, [springAngle]);

  // Detect mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll handler – updates the spring target
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      rawAngle.current += e.deltaY * SCROLL_SPEED;
      springAngle.set(rawAngle.current);
    },
    [springAngle]
  );

  // Touch scroll
  const touchStart = useRef<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  }, []);
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart.current === null) return;
      const delta = touchStart.current - e.touches[0].clientY;
      touchStart.current = e.touches[0].clientY;
      rawAngle.current += delta * SCROLL_SPEED * 2;
      springAngle.set(rawAngle.current);
    },
    [springAngle]
  );

  // ── Derived per-item geometry ──────────────────────────────────────────────
  const angleStep = (2 * Math.PI) / items.length;

  // Determine which item is currently closest to the "north" (top/front) position
  useEffect(() => {
    // The "front" slot is at angle=0 (north), so find item whose angle is closest to 0 mod 2π
    const normalized = ((displayAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    let best = 0;
    let bestDist = Infinity;
    items.forEach((_, i) => {
      const itemAngle = ((i * angleStep - normalized) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const dist = Math.min(itemAngle, 2 * Math.PI - itemAngle);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActiveIdx(best);
  }, [displayAngle, items, angleStep]);

  // ── Mobile fallback ────────────────────────────────────────────────────────
  if (isMobile) {
    return <MobileFallback items={items} />;
  }

  // ── Desktop circular layout ────────────────────────────────────────────────
  const cx = CIRCLE_SIZE / 2;
  const cy = CIRCLE_SIZE / 2;

  return (
    <div className="circular-scroll-wrapper" aria-label="Circular menu scroll">
      {/* Outer glow ring */}
      <div className="circular-glow-ring" />

      {/* Main glass circle */}
      <div
        className="circular-glass-circle"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}
      >
        {/* Centre pulse dot */}
        <div className="circular-centre-dot" />

        {/* Orbit path indicator */}
        <div
          className="circular-orbit-path"
          style={{
            width:  ORBIT_RADIUS * 2,
            height: ORBIT_RADIUS * 2,
            top:    cy - ORBIT_RADIUS,
            left:   cx - ORBIT_RADIUS,
          }}
        />

        {/* Cards */}
        {items.map((item, i) => {
          // angle of this item in world space
          const angle = i * angleStep - displayAngle;

          // Circular position
          const x = cx + ORBIT_RADIUS * Math.sin(angle) - CARD_W / 2;
          const y = cy - ORBIT_RADIUS * Math.cos(angle) - CARD_H / 2;

          // Depth: cosine of the angle gives +1 at front, -1 at back
          // cos(angle) = 1 when angle=0 (north/front)
          const depth = Math.cos(angle); // -1..+1

          // Map depth → scale, opacity, z-index
          const scale   = 0.72 + 0.28 * ((depth + 1) / 2);   // 0.72..1.00
          const opacity = 0.30 + 0.70 * ((depth + 1) / 2);   // 0.30..1.00
          const zIndex  = Math.round(50 + 50 * depth);        // 0..100
          const blur    = depth < -0.3 ? `blur(${Math.round((1 - depth) * 1.5)}px)` : "none";

          const isActive = i === activeIdx;

          return (
            <motion.div
              key={item.id}
              className={`circular-card ${isActive ? "circular-card--active" : ""}`}
              style={{
                width:   CARD_W,
                height:  CARD_H,
                left:    x,
                top:     y,
                zIndex,
                scale,
                opacity,
                filter:  blur,
              }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              whileHover={isActive ? { scale: scale * 1.04 } : {}}
            >
              {/* Image */}
              <div className="circular-card__image">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
                {/* Price badge */}
                <div className="circular-card__price">
                  <span>{item.price}</span>
                </div>
              </div>

              {/* Info */}
              <div className="circular-card__body">
                <h3 className="circular-card__name">{item.name}</h3>
                <p className="circular-card__desc">{item.description}</p>
                {isActive && (
                  <button className="circular-card__cta">
                    Details
                    <span className="circular-card__cta-line" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Scroll hint */}
        <div className="circular-scroll-hint">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2v14M5 12l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Scroll to explore</span>
        </div>
      </div>

      {/* Active item detail panel (right of circle) */}
      <ActivePanel item={items[activeIdx]} />
    </div>
  );
}

// ─── Active Side Panel ────────────────────────────────────────────────────────
function ActivePanel({ item }: { item: MenuItem }) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="circular-panel"
      aria-live="polite"
    >
      <p className="circular-panel__label">Currently Viewing</p>
      <h2 className="circular-panel__name">{item.name}</h2>
      <p className="circular-panel__price">{item.price}</p>
      <div className="circular-panel__divider" />
      <p className="circular-panel__desc">{item.description}</p>
      <button className="btn-primary circular-panel__btn">Details</button>
    </motion.div>
  );
}

// ─── Mobile Fallback ──────────────────────────────────────────────────────────
function MobileFallback({ items }: { items: MenuItem[] }) {
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);

  const prev = () => setActive((a) => (a - 1 + items.length) % items.length);
  const next = () => setActive((a) => (a + 1) % items.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx < -40) next();
    else if (dx > 40) prev();
    startX.current = null;
  };

  const item = items[active];

  return (
    <div
      className="mobile-scroll-wrapper"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        key={item.id}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.35 }}
        className="mobile-card"
      >
        <div className="mobile-card__image">
          <Image src={item.image} alt={item.name} fill className="object-cover" />
          <div className="mobile-card__price">{item.price}</div>
        </div>
        <div className="mobile-card__body">
          <h3 className="mobile-card__name">{item.name}</h3>
          <p className="mobile-card__desc">{item.description}</p>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="mobile-controls">
        <button onClick={prev} className="mobile-controls__btn" aria-label="Previous item">‹</button>
        <div className="mobile-controls__dots">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to item ${i + 1}`}
              className={`mobile-dot ${i === active ? "mobile-dot--active" : ""}`}
            />
          ))}
        </div>
        <button onClick={next} className="mobile-controls__btn" aria-label="Next item">›</button>
      </div>
    </div>
  );
}
