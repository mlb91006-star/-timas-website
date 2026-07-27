import type { Metadata } from "next";
import { ShieldCheck, Droplets, Battery } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Поддержка",
  description: "Гарантия, обслуживание и уход за TIMAS DH20 Ultra.",
};

const topics = [
  {
    icon: ShieldCheck,
    title: "Гарантия",
    text: "На TIMAS DH20 Ultra предоставляется гарантия 1 год с момента покупки.",
  },
  {
    icon: Droplets,
    title: "HEPA-фильтр",
    text: "Фильтр моющийся — промывайте его водой и дайте полностью высохнуть перед установкой обратно.",
  },
  {
    icon: Battery,
    title: "Аккумулятор",
    text: "Полная зарядка занимает около 5 часов. Батарея 29,6 В, 2200 мА·ч, Li-ion.",
  },
];

export default function SupportPage() {
  return (
    <section className="bg-black pt-32 pb-24 sm:pt-40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-bone-100 sm:text-4xl">
          Поддержка
        </h1>
        <p className="mt-3 max-w-xl text-bone-300">
          Ответы на основные вопросы по обслуживанию TIMAS DH20 Ultra. Если
          нужна дополнительная помощь — свяжитесь с нами.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {topics.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/5 bg-graphite-900 p-6"
            >
              <Icon className="text-champagne-400" size={22} />
              <h2 className="mt-4 font-medium text-bone-100">{title}</h2>
              <p className="mt-2 text-sm text-bone-500">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Button href="/contacts">Связаться с нами</Button>
        </div>
      </div>
    </section>
  );
}
