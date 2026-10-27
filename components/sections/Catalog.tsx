import { productCategories } from "@/data/sizes";
import { SizeCard } from "@/components/ui/SizeCard";
import { Reveal } from "@/components/ui/Reveal";

export function Catalog() {
  return (
    <section id="catalog" className="scroll-mt-20 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Каталог</h2>
          <p className="mt-2 max-w-xl text-ink-muted">
            Подгузники и трусики-подгузники Mylamby — по видам и размерам.
          </p>
        </Reveal>

        {productCategories.map((category) => (
          <div key={category.id} className="mt-14 first:mt-10">
            <h3 className="font-display text-xl font-bold text-ink">{category.title}</h3>
            <p className="mt-1 max-w-xl text-sm text-ink-muted">{category.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {category.sizes.map((size) => (
                <SizeCard key={size.id} size={size} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
