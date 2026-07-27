import { Button } from "@/components/ui/Button";
import { ProductImageSlot } from "@/components/ui/ProductImageSlot";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="flex flex-col items-start gap-6">
          <span className="rounded-full border border-champagne-500/30 px-4 py-1.5 text-xs tracking-[0.15em] text-champagne-400 uppercase">
            TIMAS · Беспроводные пылесосы
          </span>

          <h1 className="font-display text-4xl leading-[1.1] font-semibold text-bone-100 sm:text-5xl lg:text-6xl">
            TIMAS{" "}
            <span className="text-gradient-champagne">DH20 Ultra</span>
          </h1>

          <p className="max-w-lg text-lg text-bone-300">
            Беспроводной пылесос с честными характеристиками
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button href="#exploded">Смотреть модель</Button>
            <Button href="/products/dh20-ultra#specifications" variant="secondary">
              Характеристики
            </Button>
          </div>
        </div>

        <ProductImageSlot
          src="/images/dh20/vacuum-hero.webp"
          alt="TIMAS DH20 Ultra"
          priority
          className="aspect-square w-full lg:aspect-[4/5]"
        />
      </div>
    </section>
  );
}
