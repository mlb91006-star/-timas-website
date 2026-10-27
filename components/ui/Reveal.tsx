"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Restrained fade/rise-in on scroll — BRAND_KIT §6: "Анимации сдержанные:
 * появление при скролле... Никаких прыжков и мигания." Fires once; honors
 * prefers-reduced-motion via Framer Motion's default behavior plus the
 * global CSS override in globals.css.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
