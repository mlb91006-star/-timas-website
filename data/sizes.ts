import type { ProductCategory } from "@/types";

/**
 * Pack counts are the only confirmed per-size data. No weight ranges are
 * included — the brand owner hasn't confirmed any, and guessing them would
 * mislead a parent choosing a size. If real ranges are confirmed later,
 * add a `weightRange` to the relevant SizeItem in this file.
 */
export const productCategories: ProductCategory[] = [
  {
    id: "diapers",
    title: "Подгузники",
    description:
      "Классические подгузники на липучках — для новорождённых и малышей постарше.",
    image: "/images/mylamby/catalog/diapers-cover.jpg",
    alt: "Подгузники Mylamby",
    sizes: [
      {
        id: "diapers-nb",
        label: "NB",
        packCount: 24,
        image: "/images/mylamby/sizes/diapers-nb.jpg",
        alt: "Подгузники Mylamby размер NB",
      },
      {
        id: "diapers-s",
        label: "S",
        packCount: 82,
        image: "/images/mylamby/sizes/diapers-s.jpg",
        alt: "Подгузники Mylamby размер S",
      },
      {
        id: "diapers-m",
        label: "M",
        packCount: 62,
        image: "/images/mylamby/sizes/diapers-m.jpg",
        alt: "Подгузники Mylamby размер M",
      },
      {
        id: "diapers-l",
        label: "L",
        packCount: 54,
        image: "/images/mylamby/sizes/diapers-l.jpg",
        alt: "Подгузники Mylamby размер L",
      },
      {
        id: "diapers-xl",
        label: "XL",
        packCount: 50,
        image: "/images/mylamby/sizes/diapers-xl.jpg",
        alt: "Подгузники Mylamby размер XL",
      },
      {
        id: "diapers-xxl",
        label: "XXL",
        packCount: 46,
        image: "/images/mylamby/sizes/diapers-xxl.jpg",
        alt: "Подгузники Mylamby размер XXL",
      },
    ],
  },
  {
    id: "pants",
    title: "Трусики",
    description: "Трусики-подгузники — для подвижных малышей, которые уже ползают и ходят.",
    image: "/images/mylamby/catalog/pants-cover.jpg",
    alt: "Трусики Mylamby",
    sizes: [
      {
        id: "pants-m",
        label: "M",
        packCount: 56,
        image: "/images/mylamby/sizes/pants-m.jpg",
        alt: "Трусики Mylamby размер M",
      },
      {
        id: "pants-l",
        label: "L",
        packCount: 44,
        image: "/images/mylamby/sizes/pants-l.jpg",
        alt: "Трусики Mylamby размер L",
      },
      {
        id: "pants-xl",
        label: "XL",
        packCount: 38,
        image: "/images/mylamby/sizes/pants-xl.jpg",
        alt: "Трусики Mylamby размер XL",
      },
      {
        id: "pants-xxl",
        label: "XXL",
        packCount: 28,
        image: "/images/mylamby/sizes/pants-xxl.jpg",
        alt: "Трусики Mylamby размер XXL",
      },
    ],
  },
];
