import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "TIMAS",
  productName: "DH20 Ultra",
  fullProductName: "TIMAS DH20 Ultra",
  description:
    "Беспроводной пылесос с честными характеристиками. Официальный сайт TIMAS DH20 Ultra.",
  url: "https://timas-dh20.example",
  locale: "ru_RU",
  nav: [
    { label: "DH20 Ultra", href: "/products/dh20-ultra" },
    { label: "Характеристики", href: "/products/dh20-ultra#specifications" },
    { label: "Поддержка", href: "/support" },
  ],
  buyHref: "/products/dh20-ultra#buy",
};
