import type { FeatureStoryContent } from "@/types";

export const featureStories: FeatureStoryContent[] = [
  {
    id: "motor",
    title: "400 Вт контролируемой мощности",
    text: "Бесщёточный двигатель сочетает высокую производительность и стабильную работу.",
    image: "/images/dh20/exploded/motor-unit.png",
    alt: "Блок двигателя TIMAS DH20 Ultra",
  },
  {
    id: "filtration",
    title: "Система, за которой легко ухаживать",
    text: "Моющийся HEPA-фильтр и разборный контейнер предназначены для регулярной очистки.",
    warning: "Перед установкой промытого фильтра убедитесь, что он полностью высох.",
    image: "/images/dh20/exploded/hepa-filter.png",
    alt: "HEPA-фильтр TIMAS DH20 Ultra",
  },
  {
    id: "battery",
    title: "Свобода без провода",
    text: "Съёмный Li-ion аккумулятор 29,6 В и 2200 мА·ч. Время работы зависит от выбранного режима.",
    image: "/images/dh20/exploded/battery.png",
    alt: "Аккумулятор TIMAS DH20 Ultra",
  },
  {
    id: "tube",
    title: "Ниже мебели. Без лишнего наклона",
    text: "Складной механизм помогает направлять щётку под кровать, диван и другую низкую мебель.",
    image: "/images/dh20/exploded/folding-tube.png",
    alt: "Складная труба TIMAS DH20 Ultra",
  },
  {
    id: "brush",
    title: "Видеть больше во время уборки",
    text: "LED-подсветка освещает зону перед щёткой и помогает замечать пыль.",
    image: "/images/dh20/exploded/floor-brush.png",
    alt: "Напольная щётка TIMAS DH20 Ultra",
  },
];
