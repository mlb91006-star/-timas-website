import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-baseline gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500/60"
      aria-label={`${siteConfig.name} ${siteConfig.productName} — на главную`}
    >
      <span className="font-display text-lg font-semibold tracking-[0.2em] text-bone-100 uppercase">
        {siteConfig.name}
      </span>
      <span className="hidden text-xs tracking-wide text-bone-500 sm:inline">
        {siteConfig.productName}
      </span>
    </Link>
  );
}
