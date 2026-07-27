import { ProductImageSlot } from "@/components/ui/ProductImageSlot";

const USE_CASES = [
  { id: "floor", src: "/images/dh20/usage/floor.webp", label: "Уборка пола" },
  { id: "carpet", src: "/images/dh20/usage/carpet.webp", label: "Уборка ковра" },
  { id: "furniture", src: "/images/dh20/usage/furniture.webp", label: "Уборка мебели" },
  { id: "nozzles", src: "/images/dh20/usage/nozzles.webp", label: "Использование насадок" },
];

/**
 * No real lifestyle photography exists yet (only the studio product shot),
 * so every slot here is an honest placeholder rather than a mislabeled
 * reuse of that photo. Drop real photos into public/images/dh20/usage/
 * with these exact filenames to fill them in.
 */
export function RealUseSection() {
  return (
    <section className="bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-bone-100 sm:text-3xl">
          В деле
        </h2>
        <p className="mt-2 max-w-md text-bone-500">
          Реальные кадры уборки появятся здесь по мере съёмки.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {USE_CASES.map((useCase) => (
            <div key={useCase.id} className="flex flex-col gap-3">
              <ProductImageSlot
                src={useCase.src}
                alt={useCase.label}
                className="aspect-[4/3] w-full"
              />
              <p className="text-sm text-bone-400">{useCase.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
