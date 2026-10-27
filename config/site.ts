import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  // Exact casing per BRAND_KIT: capital M, rest lowercase.
  name: "Mylamby",
  legalName: "ООО «ЮГТРАНС»",
  tagline: "Честный подгузник среднего сегмента",
  description:
    "Mylamby — подгузники и трусики-подгузники для малышей. 12 слоёв, абсорбент SAP SANDIA, стандарт Japan Quality. Размеры от NB до XXL.",
  url: "https://mylamby.ru",
  locale: "ru_RU",
  nav: [
    { label: "Каталог", href: "#catalog" },
    { label: "Подбор размера", href: "#size-guide" },
    { label: "О бренде", href: "#about" },
    { label: "Где купить", href: "#where-to-buy" },
    { label: "Опт", href: "#wholesale" },
    { label: "Вопросы", href: "#faq" },
  ],
};
