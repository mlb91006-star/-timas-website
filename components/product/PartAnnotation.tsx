"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface PartAnnotationProps {
  activeId: string;
  title: string;
  subtitle: string;
  /** Shows a one-time (non-looping) scroll cue during the intro stage only. */
  showScrollHint?: boolean;
}

/**
 * Desktop text panel for the exploded scene: the active stage's title and
 * description, crossfading as the user scrolls. The previous stage fades
 * out before the next fades in (AnimatePresence mode="wait"), so nothing
 * overlaps mid-transition.
 */
export function PartAnnotation({
  activeId,
  title,
  subtitle,
  showScrollHint,
}: PartAnnotationProps) {
  return (
    <div className="max-w-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <p className="font-display text-2xl font-semibold text-bone-100 sm:text-3xl lg:text-4xl">
            {title}
          </p>
          <p className="mt-3 text-base text-bone-300 sm:text-lg">{subtitle}</p>
        </motion.div>
      </AnimatePresence>

      {showScrollHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 flex items-center gap-2 text-sm text-bone-500"
        >
          <ChevronDown size={18} aria-hidden="true" />
          <span>Прокрутите вниз</span>
        </motion.div>
      )}
    </div>
  );
}
