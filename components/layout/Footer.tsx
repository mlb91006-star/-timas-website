import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper-soft">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="max-w-sm">
          <span className="font-display text-lg font-bold text-ink">{siteConfig.name}</span>
          <p className="mt-2 text-sm text-ink-muted">{siteConfig.description}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
          {siteConfig.nav.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
          <Link href="/contacts" className="hover:text-ink">
            Контакты
          </Link>
        </nav>
      </div>

      <div className="border-t border-line px-4 py-6 text-center text-xs text-ink-muted sm:px-6 lg:px-8">
        © {year} {siteConfig.name}. Продавец: {siteConfig.legalName}.
      </div>
    </footer>
  );
}
