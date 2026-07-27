"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { specificationGroups } from "@/data/specifications";

interface FeatureCard {
  id: string;
  headline: string;
  caption: string;
}

function buildFeatureCards(): FeatureCard[] {
  const all = specificationGroups.flatMap((group) => group.items);
  const byId = (id: string) => all.find((item) => item.id === id);

  const power = byId("power");
  const suction = byId("suction");
  const modes = byId("modes");
  const hepa = byId("hepa");
  const battery = byId("battery");
  const brush = byId("brush");

  const cards: FeatureCard[] = [];
  if (power) cards.push({ id: power.id, headline: power.value, caption: power.label });
  if (suction) {
    cards.push({
      id: suction.id,
      headline: suction.value,
      caption: suction.note ? `${suction.label} — ${suction.note}` : suction.label,
    });
  }
  if (modes) cards.push({ id: modes.id, headline: modes.value, caption: modes.label });
  if (hepa) cards.push({ id: hepa.id, headline: hepa.label, caption: hepa.value });
  if (battery) cards.push({ id: battery.id, headline: battery.value, caption: battery.label });
  if (brush) cards.push({ id: brush.id, headline: brush.label, caption: brush.value });

  return cards;
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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

          <div className="flex flex-col gap-14 lg:gap-24 lg:py-6">
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
                  {card.headline}
                </p>
                <p className="mt-2 text-bone-400">{card.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
