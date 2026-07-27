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
          className="overflow-hidden border-b border-graphite-700 bg-graphite-950 lg:hidden"
        >
          <nav className="flex flex-col gap-1 px-4 py-4">
            {siteConfig.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onNavigate}
                className="rounded-md px-3 py-3 text-sm text-bone-300 transition-colors hover:bg-graphite-800 hover:text-bone-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={siteConfig.buyHref}
              onClick={onNavigate}
              className="mt-2 rounded-full bg-champagne-500 px-4 py-3 text-center text-sm font-semibold text-black transition-colors hover:bg-champagne-400"
            >
              Купить
            </Link>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
