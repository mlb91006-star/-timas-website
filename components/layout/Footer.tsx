import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-graphite-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <span className="font-display text-sm font-semibold tracking-[0.2em] text-bone-100 uppercase">
            {siteConfig.name}
          </span>
          <p className="mt-2 max-w-sm text-sm text-bone-500">
            {siteConfig.description}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-bone-500">
          <Link href="/products/dh20-ultra" className="hover:text-bone-100">
            {siteConfig.productName}
          </Link>
          <Link href="/support" className="hover:text-bone-100">
            Поддержка
          </Link>
          <Link href="/contacts" className="hover:text-bone-100">
            Контакты
          </Link>
        </nav>
      </div>

      <div className="border-t border-white/5 px-4 py-6 text-center text-xs text-bone-500 sm:px-6 lg:px-8">
        © {year} {siteConfig.name}. Все права защищены.
      </div>
    </footer>
  );
}
