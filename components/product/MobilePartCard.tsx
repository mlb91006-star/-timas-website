"use client";

import { AnimatePresence, motion } from "framer-motion";

interface MobilePartCardProps {
  activeId: string;
  title: string;
  subtitle: string;
  current: number;
  total: number;
}

/**
 * Mobile bottom card for the exploded scene (below the pinned image area,
 * per the mobile layout spec). Shows the active stage's copy plus a plain
 * step indicator — no reliance on hover, no information lost versus desktop.
 */
export function MobilePartCard({ activeId, title, subtitle, current, total }: MobilePartCardProps) {
  return (
    <div className="flex h-full flex-col justify-center px-5 py-6">
      <div className="mb-3 flex items-center gap-1.5" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i === current ? "bg-champagne-400" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <p className="font-display text-xl font-semibold text-bone-100">{title}</p>
          <p className="mt-2 text-sm text-bone-300">{subtitle}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
