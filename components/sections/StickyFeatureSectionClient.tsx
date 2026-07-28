"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { specificationGroups } from "@/data/specifications";

interface FeatureCard {
  id: string;
  title: string;
  text: string;
}

function buildFeatureCards(): FeatureCard[] {
  const all = specificationGroups.flatMap((group) => group.items);
  const suction = all.find((item) => item.id === "suction");

  return [
    {
      id: "power",
      title: "Мощность без преувеличений",
      text: `BLDC-мотор мощностью 400 Вт и максимальное всасывание ${suction?.value ?? "до 30 кПа"}${
        suction?.note ? ` ${suction.note}` : ""
      }.`,
    },
    {
      id: "runtime",
      title: "До 60 минут работы",
      text: "Четыре режима работы позволяют выбирать баланс между мощностью и продолжительностью уборки.",
    },
    {
      id: "dustbin",
      title: "Контейнер 800 мл",
      text: "Достаточный объём для повседневной уборки без постоянного опустошения.",
    },
    {
      id: "tube",
      title: "Складная конструкция",
      text: "Труба помогает добраться до пространства под низкой мебелью.",
    },
  ];
}

const featureCards = buildFeatureCards();

interface StickyFeatureSectionClientProps {
  /** Real product photo, already rendered server-side via ProductImageSlot. */
  image: ReactNode;
}

export function StickyFeatureSectionClient({ image }: StickyFeatureSectionClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = itemRefs.current.findIndex((el) => el === entry.target);
          if (idx !== -1) setActiveIndex(idx);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    const nodes = itemRefs.current;
    nodes.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="preimushestva" className="scroll-mt-24 bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <h2 className="font-display text-2xl font-semibold text-bone-100 sm:text-3xl">
          Преимущества
        </h2>

        <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="mb-10 aspect-square w-full lg:hidden">{image}</div>

          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div
                className="aspect-square w-full overflow-hidden transition-transform duration-700 ease-out"
                style={{ transform: `scale(${1 + activeIndex * 0.01})` }}
              >
                {image}
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-14 lg:gap-24 lg:py-6">
            {featureCards.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={`transition-opacity duration-500 ${
                  index === activeIndex ? "opacity-100" : "opacity-40"
                }`}
              >
                <p className="text-xs tracking-[0.2em] text-champagne-400 uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 font-display text-2xl font-semibold text-bone-100 sm:text-3xl">
                  {card.title}
                </p>
                <p className="mt-2 text-bone-400">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
