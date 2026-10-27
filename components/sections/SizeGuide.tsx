import { productCategories } from "@/data/sizes";
import { Reveal } from "@/components/ui/Reveal";

export function SizeGuide() {
  return (
    <section id="size-guide" className="scroll-mt-20 bg-paper-soft py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Подбор размера
          </h2>
          <p className="mt-2 max-w-xl text-ink-muted">
            Количество штук в упаковке по каждому размеру.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {productCategories.map((category) => (
            <div
              key={category.id}
              className="min-w-0 overflow-hidden rounded-card border border-line bg-paper shadow-soft"
            >
              <div className="border-b border-line px-6 py-4">
                <p className="font-display text-lg font-bold text-ink">{category.title}</p>
              </div>
              <table className="w-full text-left">
                <thead className="sr-only">
                  <tr>
                    <th>Размер</th>
                    <th>Штук в упаковке</th>
                    <th>Вес ребёнка</th>
                  </tr>
                </thead>
                <tbody>
                  {category.sizes.map((size) => (
                    <tr key={size.id} className="border-b border-line last:border-0">
                      <td className="px-6 py-4 font-semibold text-ink">{size.label}</td>
                      <td className="px-6 py-4 text-right text-sm text-ink-muted">
                        {size.packCount} шт. в упаковке
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-ink-muted">
                        {size.weightRange ?? "уточняется"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-xl text-sm text-ink-muted">
          Вес ребёнка по размерам уточняется. Если сомневаетесь — сверьтесь с
          упаковкой или уточните у продавца перед покупкой.
        </p>
      </div>
    </section>
  );
}
