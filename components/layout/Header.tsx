"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-black/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between px-5 sm:px-8 lg:h-[4.5rem] lg:px-12">
        <Logo />

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {siteConfig.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm text-sm whitespace-nowrap text-bone-300 transition-colors hover:text-bone-100 focus-visible:text-bone-100 focus-visible:ring-2 focus-visible:ring-champagne-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={siteConfig.buyHref}
            className="hidden rounded-full bg-champagne-500 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-champagne-400 focus-visible:ring-2 focus-visible:ring-champagne-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none lg:inline-block"
          >
            Купить
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-bone-100 transition-colors hover:bg-graphite-800 focus-visible:ring-2 focus-visible:ring-champagne-500/60 focus-visible:outline-none lg:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <MobileNav open={open} onNavigate={() => setOpen(false)} />
    </header>
  );
}
