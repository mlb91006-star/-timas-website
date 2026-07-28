import { Button } from "@/components/ui/Button";
import { ProductImageSlot } from "@/components/ui/ProductImageSlot";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-black pt-[max(6rem,calc(env(safe-area-inset-top)+5rem))] pb-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <div className="flex min-w-0 flex-col items-start gap-5">
          <span className="rounded-full border border-champagne-500/30 px-4 py-1.5 text-xs tracking-[0.15em] text-champagne-400 uppercase">
            Беспроводной пылесос нового поколения
          </span>

          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] font-semibold text-bone-100">
            TIMAS DH20 Ultra
          </h1>

          <p className="text-xl font-medium text-bone-100">
            Мощность, которую можно проверить
          </p>

          <p className="max-w-lg text-base text-bone-300 sm:text-lg">
            BLDC-мотор 400 Вт, максимальная мощность всасывания до 30 кПа и
            продуманная конструкция для ежедневной уборки.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button href="#exploded">Смотреть возможности</Button>
            <Button href="/products/dh20-ultra#specifications" variant="secondary">
              Все характеристики
            </Button>
          </div>
        </div>

        <ProductImageSlot
          src="/images/dh20/vacuum-hero.webp"
          alt="TIMAS DH20 Ultra"
          priority
          className="aspect-square w-full min-w-0 lg:aspect-[4/5]"
        />
      </div>
    </section>
  );
}
