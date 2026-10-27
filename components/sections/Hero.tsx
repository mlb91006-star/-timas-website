import { Button } from "@/components/ui/Button";
import { ProductImageSlot } from "@/components/ui/ProductImageSlot";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <Reveal className="flex min-w-0 flex-col items-start gap-5">
          <span className="rounded-pill border border-line bg-accent-soft px-4 py-1.5 text-xs font-medium tracking-[0.08em] text-accent uppercase">
            Подгузники и трусики для малышей
          </span>

          <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.15] font-bold text-ink">
            Честный подгузник среднего сегмента
          </h1>

          <p className="max-w-lg text-base text-ink-muted sm:text-lg">
            12 слоёв. Впитывающий слой — 71%. Абсорбент SAP SANDIA, стандарт
            Japan Quality. Размеры от NB до XXL.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button href="#size-guide">Выбрать размер</Button>
            <Button href="#where-to-buy" variant="secondary">
              Где купить
            </Button>
          </div>
        </Reveal>

        <ProductImageSlot
          src="/images/mylamby/hero/hero-main.jpg"
          alt="Mylamby — упаковка подгузников"
          priority
          className="aspect-square w-full min-w-0 lg:aspect-[4/5]"
        />
      </div>
    </section>
  );
}
