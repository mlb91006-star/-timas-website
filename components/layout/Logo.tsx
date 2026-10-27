import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo() {
  return (
    <Link
      href="/"
      className="font-display text-lg font-bold tracking-tight text-ink"
      aria-label={`${siteConfig.name} — на главную`}
    >
      {siteConfig.name}
    </Link>
  );
}
