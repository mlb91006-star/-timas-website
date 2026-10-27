"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";

interface MobileNavProps {
  open: boolean;
  onNavigate: () => void;
}

export function MobileNav({ open, onNavigate }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden border-b border-line bg-paper lg:hidden"
        >
          <nav className="flex flex-col gap-1 px-4 py-4">
            {siteConfig.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onNavigate}
                className="rounded-button px-3 py-3 text-sm text-ink-muted transition-colors hover:bg-paper-soft hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#where-to-buy"
              onClick={onNavigate}
              className="mt-2 rounded-button bg-accent px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Где купить
            </Link>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
