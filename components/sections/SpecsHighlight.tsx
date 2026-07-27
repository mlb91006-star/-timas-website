import { Battery, Gauge, Timer, Volume2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

const highlights = [
  { icon: Zap, label: "Мощность", value: "400 Вт" },
  { icon: Gauge, label: "Всасывание", value: "> 30 кПа" },
  { icon: Battery, label: "Аккумулятор", value: "29,6 В · 2200 мА·ч" },
  { icon: Timer, label: "Режимы работы", value: "10 / 20 / 35 / 60 мин" },
  { icon: Volume2, label: "Уровень шума", value: "≤ 76 дБ" },
  { icon: ShieldCheck, label: "Гарантия", value: "1 год" },
];

export function SpecsHighlight() {
  return (
    <section className="bg-graphite-950 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-bone-100 sm:text-3xl">
              Честные характеристики
            </h2>
            <p className="mt-2 max-w-md text-bone-500">
              Только подтверждённые данные — без придуманных процентов и
              рейтингов.
            </p>
          </div>
          <Button href="/products/dh20-ultra#specifications" variant="secondary">
            Все характеристики
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-4 rounded-2xl border border-white/5 bg-graphite-900 p-6"
            >
              <Icon className="mt-0.5 shrink-0 text-champagne-400" size={22} />
              <div>
                <p className="text-sm text-bone-500">{label}</p>
                <p className="mt-1 font-medium text-bone-100">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
