import { BookOpen, ShieldCheck, Wrench } from "lucide-react";
import { ProductImageSlot } from "@/components/ui/ProductImageSlot";
import { explodedParts } from "@/data/exploded-parts";

const PACKAGE_PART_IDS = [
  "vacuum-complete",
  "battery",
  "folding-tube",
  "floor-brush",
  "crevice-nozzle",
  "two-in-one-brush",
  "wall-mount",
  "charger",
];

/** Paper/hardware items that were never photographed as standalone products — shown as icon cards instead. */
const NON_PHOTO_ITEMS = [
  { id: "mounting-kit", label: "Комплект крепежа", icon: Wrench },
  { id: "manual", label: "Инструкция", icon: BookOpen },
  { id: "warranty-card", label: "Гарантийный талон", icon: ShieldCheck },
];

export function PackageContents() {
  const parts = PACKAGE_PART_IDS.map((id) =>
    explodedParts.find((part) => part.id === id),
  ).filter((part): part is NonNullable<typeof part> => Boolean(part));

  return (
    <section id="komplekt" className="scroll-mt-24 bg-graphite-950 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
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

          {NON_PHOTO_ITEMS.map(({ id, label, icon: Icon }) => (
            <div key={id} className="flex flex-col gap-3">
              <div className="flex aspect-square w-full items-center justify-center rounded-[2rem] border border-white/5 bg-graphite-900">
                <Icon className="text-champagne-400" size={32} aria-hidden />
              </div>
              <p className="text-sm text-bone-300">{label}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-sm text-bone-500">
          Фактическая комплектация может отличаться в зависимости от партии.
          Уточняйте состав перед покупкой.
        </p>
      </div>
    </section>
  );
}
