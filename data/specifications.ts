import type { SpecificationGroup } from "@/types";

export const specificationGroups: SpecificationGroup[] = [
  {
    id: "power",
    title: "Мощность и всасывание",
    items: [
      { id: "motor-type", label: "Тип двигателя", value: "BLDC (бесщёточный)" },
      { id: "power", label: "Мощность", value: "400 Вт" },
      {
        id: "suction",
        label: "Максимальная мощность всасывания",
        value: "до 30 кПа",
        note: "при полностью заряженном аккумуляторе",
      },
      { id: "noise", label: "Уровень шума", value: "не более 76 дБ" },
    ],
  },
  {
    id: "battery",
    title: "Аккумулятор и автономность",
    items: [
      { id: "battery", label: "Аккумулятор", value: "29,6 В, 2200 мА·ч, Li-ion" },
      {
        id: "modes",
        label: "Режимы работы",
        value: "≈10 / 20 / 35 / 60 минут",
      },
      {
        id: "charge-time",
        label: "Время зарядки",
        value: "около 5 часов",
        note: "возможное отклонение ±30 минут",
      },
    ],
  },
  {
    id: "design",
    title: "Конструкция и фильтрация",
    items: [
      { id: "dustbin", label: "Объём контейнера", value: "800 мл" },
      { id: "hepa", label: "HEPA-фильтр", value: "моющийся" },
      { id: "led", label: "Индикация", value: "LED-индикатор" },
      { id: "tube", label: "Труба", value: "складная" },
      { id: "brush", label: "Напольная щётка", value: "моторизированная" },
    ],
  },
  {
    id: "charger",
    title: "Зарядное устройство",
    items: [
      {
        id: "charger-output",
        label: "Выход адаптера",
        value: "DC 36 В, 500 мА",
      },
      {
        id: "cable-length",
        label: "Длина видимого кабеля адаптера",
        value: "около 150 см",
        note: "возможное отклонение ±10%",
      },
    ],
  },
  {
    id: "warranty",
    title: "Гарантия",
    items: [{ id: "warranty", label: "Гарантия", value: "1 год" }],
  },
];
