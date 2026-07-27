import type { ExplodedPart } from "@/types";

/**
 * Real part list for the exploded-view scroll animation, detail cards, and
 * package contents. Most image files aren't uploaded yet — see README.md
 * for the full list — but every consumer renders these through
 * ProductImageSlot, which shows a neutral placeholder for a missing file
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
