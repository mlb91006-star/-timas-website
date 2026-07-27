import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo() {
  return (
    <Link
      href="/"
      className="font-display text-lg font-semibold tracking-[0.2em] text-bone-100 uppercase"
      aria-label={`${siteConfig.name} — на главную`}
    >
      {siteConfig.name}
    </Link>
  );
}
