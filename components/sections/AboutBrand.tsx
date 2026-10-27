import { ProductImageSlot } from "@/components/ui/ProductImageSlot";
import { brandFacts } from "@/data/brand-facts";
import { Reveal } from "@/components/ui/Reveal";

export function AboutBrand() {
  return (
    <section id="about" className="scroll-mt-20 bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <Reveal className="min-w-0">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">О Mylamby</h2>
          <p className="mt-4 text-ink-muted">
            Mylamby — подгузники и трусики-подгузники среднего ценового
            сегмента. Мы говорим ровно то, что есть, и показываем, чем это
            подтверждено.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {brandFacts.map((fact) => (
              <div key={fact.id} className="rounded-card border border-line bg-paper p-5 shadow-soft">
                <p className="font-semibold text-ink">{fact.title}</p>
                <p className="mt-1.5 text-sm text-ink-muted">{fact.text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <ProductImageSlot
          src="/images/mylamby/products/about-pack.jpg"
          alt="Упаковка Mylamby"
          className="aspect-square w-full min-w-0"
        />
      </div>
    </section>
  );
}
