import type { ScrollTextStage } from "@/types";

export const heroSequenceConfig = {
  desktopHeightVh: 500,
  mobileHeightVh: 380,
  fallbackImage: "/images/dh20/vacuum-hero.webp",
  fallbackAlt: "TIMAS DH20 Ultra",
};

/**
 * Text overlay stages for the hero scroll sequence. Values are limited to
 * what's confirmed in data/specifications.ts — no invented figures.
 */
export const heroTextStages: ScrollTextStage[] = [
  {
    start: 0,
    end: 0.15,
    title: "TIMAS DH20 Ultra",
    subtitle: "Мощность, которой можно доверять.",
  },
  {
    start: 0.15,
    end: 0.32,
    title: "Мощность двигателя",
    subtitle: "400 Вт",
  },
  {
    start: 0.32,
    end: 0.5,
    title: "Мощность всасывания",
    subtitle: "более 30 кПа при полностью заряженном аккумуляторе",
  },
  {
    start: 0.5,
    end: 0.68,
    title: "Фильтрация",
    subtitle: "Моющийся HEPA-фильтр",
  },
  {
    start: 0.68,
    end: 0.85,
    title: "Автономность",
    subtitle: "Режимы работы: ≈10 / 20 / 35 / 60 минут",
  },
  {
    start: 0.85,
    end: 1,
    title: "Создан для ежедневной уборки",
  },
];
