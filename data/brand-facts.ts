import type { BrandFact } from "@/types";

/**
 * Only facts confirmed in BRAND_KIT.md §4 ("Продукт — факты, которые
 * можно использовать"). Per its own rule: if a characteristic isn't in
 * that list, it doesn't go on the site — no rounding favorably, no
 * "гипоаллергенно"/"одобрено педиатрами" without documentation.
 */
export const brandFacts: BrandFact[] = [
  {
    id: "absorbent",
    title: "Абсорбент SAP SANDIA",
    text: "Впитывающий полимер SAP SANDIA.",
  },
  {
    id: "layers",
    title: "12 слоёв",
    text: "12-слойная конструкция.",
  },
  {
    id: "absorbent-share",
    title: "Впитывающий слой — 71%",
    text: "71% состава приходится на впитывающий слой.",
  },
  {
    id: "standard",
    title: "Japan Quality",
    text: "Стандарт качества Japan Quality.",
  },
];
