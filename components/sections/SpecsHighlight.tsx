import {
  Tag,
  Zap,
  Gauge,
  Timer,
  Container,
  Filter,
  Battery,
  MonitorSmartphone,
  Wind,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { specificationGroups } from "@/data/specifications";

const byId = (id: string) =>
  specificationGroups.flatMap((group) => group.items).find((item) => item.id === id);

const suction = byId("suction");
const modes = byId("modes");
const dustbin = byId("dustbin");
const hepa = byId("hepa");
const battery = byId("battery");
const led = byId("led");
const brush = byId("brush");

const highlights = [
  { icon: Tag, label: "Модель", value: siteConfig.fullProductName },
  { icon: Zap, label: "Мощность", value: "400 Вт" },
  {
    icon: Gauge,
    label: "Мощность всасывания",
    value: suction ? `${suction.value}${suction.note ? `, ${suction.note}` : ""}` : "",
  },
  { icon: Timer, label: "Время работы", value: modes?.value ?? "" },
  { icon: Container, label: "Объём контейнера", value: dustbin?.value ?? "" },
  { icon: Filter, label: "Фильтрация", value: hepa ? `HEPA-фильтр, ${hepa.value}` : "" },
  { icon: Battery, label: "Аккумулятор", value: battery?.value ?? "" },
  { icon: MonitorSmartphone, label: "Дисплей", value: led?.value ?? "" },
  { icon: Wind, label: "Щётка", value: brush?.value ? `${brush.value} напольная щётка` : "" },
];

export function SpecsHighlight() {
  return (
    <section id="specifications" className="scroll-mt-24 bg-graphite-950 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-bone-100 sm:text-3xl">
              Характеристики
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
