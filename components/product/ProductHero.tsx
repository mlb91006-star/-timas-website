import { Button } from "@/components/ui/Button";
import { ProductImageSlot } from "@/components/ui/ProductImageSlot";
import { siteConfig } from "@/config/site";

export function ProductHero() {
  return (
    <section className="bg-black pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <div className="flex min-w-0 flex-col items-start gap-6">
          <span className="rounded-full border border-champagne-500/30 px-4 py-1.5 text-xs tracking-[0.15em] text-champagne-400 uppercase">
            {siteConfig.productName}
          </span>

          <h1 className="font-display text-4xl leading-[1.1] font-semibold text-bone-100 sm:text-5xl">
            {siteConfig.fullProductName}
          </h1>

          <p className="max-w-lg text-lg text-bone-300">
            Беспроводной пылесос с честными характеристиками
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button href="#buy">Купить</Button>
            <Button href="#specifications" variant="secondary">
              Характеристики
            </Button>
          </div>
        </div>

        <ProductImageSlot
          src="/images/dh20/vacuum-hero.webp"
          alt={siteConfig.fullProductName}
          priority
          className="aspect-square w-full min-w-0 lg:aspect-[4/5]"
        />
      </div>
    </section>
  );
}
