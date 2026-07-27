import { ProductImageSlot } from "@/components/ui/ProductImageSlot";
import { explodedParts } from "@/data/exploded-parts";

const PACKAGE_PART_IDS = [
  "vacuum-complete",
  "folding-tube",
  "floor-brush",
  "crevice-nozzle",
  "two-in-one-brush",
  "wall-mount",
  "charger",
];

export function PackageContents() {
  const parts = PACKAGE_PART_IDS.map((id) =>
    explodedParts.find((part) => part.id === id),
  ).filter((part): part is NonNullable<typeof part> => Boolean(part));

  return (
    <section id="komplekt" className="scroll-mt-24 bg-graphite-950 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-bone-100 sm:text-3xl">
          Комплектация
        </h2>
        <p className="mt-2 max-w-md text-bone-500">
          Всё, что входит в комплект TIMAS DH20 Ultra.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {parts.map((part) => (
            <div key={part.id} className="flex flex-col gap-3">
              <ProductImageSlot
                src={part.image}
                alt={part.label}
                className="aspect-square w-full"
              />
              <p className="text-sm text-bone-300">{part.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
