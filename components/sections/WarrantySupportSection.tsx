import Link from "next/link";
import { specificationGroups } from "@/data/specifications";

const warranty = specificationGroups
  .flatMap((group) => group.items)
  .find((item) => item.id === "warranty");

export function WarrantySupportSection() {
  return (
    <section id="garantiya" className="scroll-mt-24 bg-graphite-950 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8 lg:px-12">
        <h2 className="font-display text-2xl font-semibold text-bone-100 sm:text-3xl">
          Гарантия и поддержка
        </h2>
        <p className="mt-4 text-lg text-bone-300">
          Гарантия на TIMAS DH20 Ultra — {warranty?.value ?? "1 год"}.
        </p>
        <p className="mt-2 text-bone-400">
          Вопросы по эксплуатации и обслуживанию — на странице поддержки.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/support"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-bone-100 transition-colors hover:border-champagne-500/60 hover:text-champagne-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500/60"
          >
            Страница поддержки
          </Link>
          <Link
            href="/contacts"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-bone-100 transition-colors hover:border-champagne-500/60 hover:text-champagne-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500/60"
          >
            Контакты
          </Link>
        </div>
      </div>
    </section>
  );
}
