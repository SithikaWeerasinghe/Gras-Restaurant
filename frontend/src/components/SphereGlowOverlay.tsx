"use client";

/**
 * SphereGlowOverlay
 * ─────────────────────────────────────────────────────────────────────────────
 * A fixed, full-screen radial glow that sits behind all page content and
 * suggests the surface of a large invisible sphere.
 *
 * It is pointer-events-none and z-index: 0 so it never interferes with
 * clicking, scrolling, or form inputs.
 *
 * Three layers:
 *   1. A dim, warm-gold radial gradient centred on the viewport midpoint.
 *   2. A second softer gradient shifted slightly upward for the "north pole".
 *   3. A third shifted downward for the "south pole".
 *
 * Combined they give a very subtle spherical depth without neon brightness.
 */

import React from "react";

export default function SphereGlowOverlay() {
  return (
    <div
      aria-hidden="true"
      className="sphere-glow-overlay"
    >
      {/* Equator pulse – warm gold centre */}
      <div className="sphere-glow sphere-glow--equator" />
      {/* North pole – cooler, slightly blue-shifted */}
      <div className="sphere-glow sphere-glow--north" />
      {/* South pole – cooler, slightly deeper */}
      <div className="sphere-glow sphere-glow--south" />
    </div>
  );
}
