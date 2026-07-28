import type { ExplodedNarrativeStage, ExplodedPart, ExplodedPartConfig } from "@/types";

/**
 * Simple catalog used by DetailCards and PackageContents (label + image
 * only). Most image files aren't uploaded yet — see README.md for the
 * full list — but every consumer renders these through ProductImageSlot,
 * which shows a neutral placeholder for a missing or unusable file
 * instead of breaking.
 */
export const explodedParts: ExplodedPart[] = [
  { id: "vacuum-complete", label: "Пылесос в сборе", image: "/images/dh20/exploded/vacuum-complete.png" },
  { id: "motor-unit", label: "Блок двигателя", image: "/images/dh20/exploded/motor-unit.png" },
  { id: "battery", label: "Аккумулятор", image: "/images/dh20/exploded/battery.png" },
  { id: "dust-bin", label: "Контейнер для пыли", image: "/images/dh20/exploded/dust-bin.png" },
  { id: "hepa-filter", label: "HEPA-фильтр", image: "/images/dh20/exploded/hepa-filter.png" },
  { id: "top-module", label: "Верхний модуль", image: "/images/dh20/exploded/top-module.png" },
  { id: "folding-tube", label: "Складная труба", image: "/images/dh20/exploded/folding-tube.png" },
  { id: "floor-brush", label: "Напольная щётка", image: "/images/dh20/exploded/floor-brush.png" },
  { id: "crevice-nozzle", label: "Щелевая насадка", image: "/images/dh20/exploded/crevice-nozzle.png" },
  { id: "two-in-one-brush", label: "Насадка 2-в-1", image: "/images/dh20/exploded/two-in-one-brush.png" },
  { id: "wall-mount", label: "Настенное крепление", image: "/images/dh20/exploded/wall-mount.png" },
  { id: "charger", label: "Зарядное устройство", image: "/images/dh20/exploded/charger.png" },
];

/**
 * Rich per-part config for the exploded-view scroll animation
 * (components/product/ExplodedScene.tsx). Only the six parts on the main
 * assembly axis are here — the motor unit is the scene's anchor (rendered
 * separately from the assembled photo) and wall-mount/charger are
 * accessories, not part of this axis (see project brief, "Комплектация").
 *
 * Coordinates are in px, relative to the assembled part's own position,
 * for a ~448px square scene box. Tablet/mobile tiers scale the same
 * directions down rather than reusing desktop numbers verbatim, so the
 * motion still reads clearly in a smaller box.
 */
export const explodedAnimationParts: ExplodedPartConfig[] = [
  {
    id: "floor-brush",
    title: "Моторизированная напольная щётка",
    description: "LED-подсветка помогает видеть пыль в плохо освещённых местах.",
    image: "/images/dh20/exploded/floor-brush.png",
    alt: "Напольная щётка TIMAS DH20 Ultra",
    start: 0.1,
    end: 0.22,
    desktopTransform: { x: 0, y: 130, scale: 0.98, rotate: 3 },
    tabletTransform: { x: 0, y: 95, scale: 0.98, rotate: 3 },
    mobileTransform: { x: 0, y: 70, scale: 0.96, rotate: 3 },
    zIndex: 10,
    enabled: true,
  },
  {
    id: "folding-tube",
    title: "Складная труба",
    description: "Помогает выполнять уборку под кроватью, диваном и низкой мебелью.",
    image: "/images/dh20/exploded/folding-tube.png",
    alt: "Складная труба TIMAS DH20 Ultra",
    start: 0.22,
    end: 0.34,
    desktopTransform: { x: -70, y: 100, scale: 0.98, rotate: -3 },
    tabletTransform: { x: -50, y: 70, scale: 0.98, rotate: -3 },
    mobileTransform: { x: -35, y: 50, scale: 0.96, rotate: -3 },
    zIndex: 20,
    enabled: true,
  },
  {
    id: "battery",
    title: "Съёмный аккумулятор",
    description: "29,6 В · 2200 мА·ч · Li-ion",
    image: "/images/dh20/exploded/battery.png",
    alt: "Аккумулятор TIMAS DH20 Ultra",
    start: 0.34,
    end: 0.46,
    desktopTransform: { x: 90, y: -50, scale: 0.95, rotate: 4 },
    tabletTransform: { x: 65, y: -35, scale: 0.95, rotate: 4 },
    mobileTransform: { x: 45, y: -25, scale: 0.94, rotate: 4 },
    zIndex: 30,
    enabled: true,
  },
  {
    id: "dust-bin",
    title: "Контейнер 800 мл",
    description: "Съёмная конструкция для удобного опустошения и очистки.",
    image: "/images/dh20/exploded/dust-bin.png",
    alt: "Контейнер для пыли TIMAS DH20 Ultra",
    start: 0.46,
    end: 0.6,
    desktopTransform: { x: -110, y: -10, scale: 1.05, rotate: -2 },
    tabletTransform: { x: -80, y: -8, scale: 1.03, rotate: -2 },
    mobileTransform: { x: -55, y: -6, scale: 1.0, rotate: -2 },
    zIndex: 40,
    enabled: true,
  },
  {
    id: "hepa-filter",
    title: "Моющийся HEPA-фильтр",
    description: "Фильтр можно очищать в соответствии с инструкцией производителя.",
    image: "/images/dh20/exploded/hepa-filter.png",
    alt: "HEPA-фильтр TIMAS DH20 Ultra",
    start: 0.6,
    end: 0.74,
    desktopTransform: { x: -170, y: -10, scale: 0.8, rotate: 0 },
    tabletTransform: { x: -125, y: -8, scale: 0.82, rotate: 0 },
    mobileTransform: { x: -85, y: -6, scale: 0.8, rotate: 0 },
    zIndex: 50,
    enabled: true,
  },
  {
    id: "top-module",
    title: "Продуманная система фильтрации",
    description: "Разборная конструкция упрощает регулярный уход.",
    image: "/images/dh20/exploded/top-module.png",
    alt: "Верхний модуль TIMAS DH20 Ultra",
    start: 0.74,
    end: 0.86,
    desktopTransform: { x: 20, y: -150, scale: 0.95, rotate: 2 },
    tabletTransform: { x: 15, y: -110, scale: 0.95, rotate: 2 },
    mobileTransform: { x: 10, y: -75, scale: 0.94, rotate: 2 },
    zIndex: 60,
    enabled: true,
  },
];

/** Framing copy shown before the first part starts (0–10%) and after the last one settles (86–100%). */
export const explodedIntroStage: ExplodedNarrativeStage = {
  title: "Продуман до каждой детали",
  subtitle: "Прокрутите, чтобы увидеть конструкцию.",
};

export const explodedFinalStage: ExplodedNarrativeStage = {
  title: "Каждый элемент на своём месте",
  subtitle: "TIMAS DH20 Ultra",
};
