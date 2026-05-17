"use client";

/**
 * SphereSection — v2 (Strong 3D Sphere Scroll)
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps any page section and applies a convincing 3D sphere-surface scroll
 * effect. As the section scrolls through the viewport it curves away at the
 * north and south poles and snaps flat at the equator (centre).
 *
 * COORDINATE MODEL
 * ─────────────────
 *  scrollYProgress = 0   → section entering from the SOUTH (bottom of screen)
 *  scrollYProgress = 0.5 → section at the EQUATOR   (centred, fully readable)
 *  scrollYProgress = 1   → section exiting to NORTH  (top of screen)
 *
 * TRANSFORMS APPLIED
 * ───────────────────
 *  rotateX   – tilts the section along the sphere surface
 *  z         – pushes curved sections deeper into the screen
 *  scale     – slightly smaller at edges (depth compression)
 *  opacity   – dimmed at edges, full at equator
 *  blur      – soft at edges, sharp at equator
 *
 * HYDRATION
 * ──────────
 *  Window/matchMedia access is deferred to useEffect so SSR and client
 *  output match. The component renders with desktop settings on SSR (the
 *  safe default) and adjusts on the client after mount.
 *
 * ACCESSIBILITY
 * ─────────────
 *  prefers-reduced-motion: all geometry is disabled; only opacity fades.
 */

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionTemplate,
} from "framer-motion";

// ─── Per-breakpoint config ────────────────────────────────────────────────────
const CFG = {
  desktop: {
    perspective: 1100,   // px – CSS perspective on the wrapper
    rotateXMax:  45,     // ° – maximum tilt at poles
    zEdge:      -300,    // px – translateZ at poles (negative = deeper)
    scaleEdge:   0.76,   // scale at poles
    opacityEdge: 0.28,   // opacity at poles
    blurEdge:    6,      // px blur at poles
  },
  tablet: {
    perspective: 1200,
    rotateXMax:  22,
    zEdge:      -140,
    scaleEdge:   0.88,
    opacityEdge: 0.48,
    blurEdge:    3,
  },
  mobile: {
    perspective: 1600,   // very large → almost no visible tilt
    rotateXMax:   5,
    zEdge:         0,
    scaleEdge:    0.94,
    opacityEdge:  0.70,
    blurEdge:     0,
  },
} as const;

type Bp = keyof typeof CFG;
type BpCfg = (typeof CFG)[Bp];

// ─── Types ────────────────────────────────────────────────────────────────────
interface SphereSectionProps {
  children: React.ReactNode;
  /** Extra class names forwarded to the inner motion wrapper. */
  className?: string;
  /**
   * Disables all 3D transforms for this section.
   * Use on full-screen hero images where rotateX looks wrong.
   */
  flat?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SphereSection({
  children,
  className = "",
  flat = false,
}: SphereSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  // prefers-reduced-motion — null during SSR → default false
  const prefersReduced = useReducedMotion() ?? false;

  // ── SSR-safe breakpoint ───────────────────────────────────────────────────
  // Always start with "desktop" so SSR and first client render match,
  // then correct on the client in useEffect. This eliminates hydration errors.
  const [bp, setBp] = useState<Bp>("desktop");

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(max-width: 767px)").matches)        setBp("mobile");
      else if (window.matchMedia("(max-width: 1023px)").matches)  setBp("tablet");
      else                                                         setBp("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const cfg: BpCfg = CFG[bp];

  // When reduced motion is requested, collapse all geometry but keep opacity.
  const geoMult = prefersReduced ? 0 : 1;

  // ── Scroll tracking ───────────────────────────────────────────────────────
  // offset ["start end", "end start"]:
  //   0 → section top hits viewport bottom (entering from south)
  //   1 → section bottom hits viewport top (exiting to north)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // ── Motion values ─────────────────────────────────────────────────────────
  // south (0) → equator (0.5) → north (1)

  const rotateX = useTransform(
    scrollYProgress,
    [0,  0.5,  1],
    [
      -(cfg.rotateXMax * geoMult),   // south: curves away below
       0,                             // equator: flat & readable
       cfg.rotateXMax * geoMult,     // north: curves away above
    ]
  );

  // translateZ: sections at poles are pushed back into the screen
  const z = useTransform(
    scrollYProgress,
    [0,  0.5,  1],
    [cfg.zEdge * geoMult, 0, cfg.zEdge * geoMult]
  );

  // scale: slightly smaller at poles (mirrors the depth compression of a sphere)
  const scaleAt0 = prefersReduced ? 1 : cfg.scaleEdge;
  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.5, 0.65, 1],
    [scaleAt0, 1, 1, 1, scaleAt0]
  );

  // opacity: sections fade slightly at poles
  // When reduced motion, keep opacity near full even at edges.
  const opaqueEdge = prefersReduced ? 0.88 : cfg.opacityEdge;
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.28, 0.5, 0.72, 1],
    [opaqueEdge, 1, 1, 1, opaqueEdge]
  );

  // blur: sharp at equator, soft at poles
  const blurRaw = useTransform(
    scrollYProgress,
    [0, 0.28, 0.5, 0.72, 1],
    [cfg.blurEdge * geoMult, 0, 0, 0, cfg.blurEdge * geoMult]
  );
  const filter = useMotionTemplate`blur(${blurRaw}px)`;

  // ── Flat / no-3D path ─────────────────────────────────────────────────────
  if (flat) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  // ── 3D sphere path ────────────────────────────────────────────────────────
  // Three-layer structure:
  //   1. ref div     – scroll target; never transformed
  //   2. perspective – CSS perspective context (parent of the 3D element)
  //   3. motion div  – receives all transforms
  return (
    <div ref={ref}>
      <div
        style={{
          perspective: `${cfg.perspective}px`,
          perspectiveOrigin: "50% 50%",
          // Allow children to escape the box during rotation
          overflow: "visible",
        }}
      >
        <motion.div
          style={{
            rotateX,
            z,
            scale,
            opacity,
            filter,
            transformOrigin: "50% 50%",
            transformStyle: "preserve-3d",
            willChange: "transform, opacity, filter",
          }}
          className={className}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
