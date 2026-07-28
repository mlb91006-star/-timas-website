import { specificationGroups } from "@/data/specifications";

const byId = (id: string) =>
  specificationGroups.flatMap((group) => group.items).find((item) => item.id === id);

const power = byId("power");
const suction = byId("suction");
const dustbin = byId("dustbin");

const metrics = [
  { value: power?.value ?? "400 Вт", label: "BLDC-мотор" },
  { value: suction?.value ?? "до 30 кПа", label: "Максимальное всасывание" },
  { value: "до 60 минут", label: "Время работы в экономичном режиме" },
  { value: dustbin?.value ?? "800 мл", label: "Объём контейнера" },
];

export function KeyMetrics() {
  return (
    <section className="bg-black py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <p className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold text-bone-100">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-bone-400 sm:text-base">{metric.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-sm text-bone-500">
          Фактическое время работы зависит от выбранного режима, состояния
          аккумулятора и условий эксплуатации.
        </p>
      </div>
    </section>
  );
}
