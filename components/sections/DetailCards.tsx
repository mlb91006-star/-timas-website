import { ProductImageSlot } from "@/components/ui/ProductImageSlot";
import { explodedParts } from "@/data/exploded-parts";

const DETAIL_PART_IDS = [
  "motor-unit",
  "battery",
  "dust-bin",
  "hepa-filter",
  "top-module",
  "folding-tube",
  "floor-brush",
  "crevice-nozzle",
  "two-in-one-brush",
];

export function DetailCards() {
  const parts = DETAIL_PART_IDS.map((id) =>
    explodedParts.find((part) => part.id === id),
  ).filter((part): part is NonNullable<typeof part> => Boolean(part));

  return (
    <section className="bg-graphite-950 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-bone-100 sm:text-3xl">
          Детали внутри
        </h2>
        <p className="mt-2 max-w-md text-bone-500">
          Инженерные компоненты TIMAS DH20 Ultra.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {parts.map((part) => (
            <div key={part.id} className="group flex flex-col gap-3">
              <div className="transition-transform duration-300 [@media(hover:hover)]:group-hover:-translate-y-1">
                <ProductImageSlot
                  src={part.image}
                  alt={part.label}
                  className="aspect-square w-full transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-[1.03] active:scale-[0.97]"
                />
              </div>
              <p className="text-sm text-bone-300">{part.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
