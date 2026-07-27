# TIMAS DH20 Ultra — официальный сайт

Официальный сайт беспроводного пылесоса TIMAS DH20 Ultra. Проект находится
на этапе построения технического фундамента (Этап 1).

## Стек

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion (UI-анимации: меню, переходы)
- GSAP + ScrollTrigger (подготовка к scroll-анимации exploded-view)
- Lucide React (иконки)
- ESLint

## Запуск

```bash
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

Проверки перед коммитом:

```bash
npm run lint
npm run build
```

## Структура проекта

```
app/                        маршруты App Router
  page.tsx                  главная страница (/)
  products/dh20-ultra/       страница товара
  support/                   страница поддержки
  contacts/                  страница контактов
  not-found.tsx              страница 404
  robots.ts, sitemap.ts       SEO
components/
  layout/                    шапка, мобильное меню, футер
  sections/                  секции главной страницы (Hero, характеристики,
                              заготовка exploded-view)
  product/                   секции страницы товара
  ui/                        переиспользуемые примитивы
config/site.ts               навигация, мета-конфигурация
data/                        типизированные данные (характеристики, детали)
types/                       общие TypeScript-типы
public/images/dh20/          изображения товара
```

## Изображения, которые нужно загрузить следующим этапом

Сайт уже готов к их подключению — как только файлы появятся по указанным
путям, заглушки автоматически заменятся на реальные изображения без
дополнительных правок кода.

```
public/images/dh20/vacuum-hero.webp

public/images/dh20/exploded/vacuum-complete.png
public/images/dh20/exploded/motor-unit.png
public/images/dh20/exploded/battery.png
public/images/dh20/exploded/dust-bin.png
public/images/dh20/exploded/hepa-filter.png
public/images/dh20/exploded/top-module.png
public/images/dh20/exploded/folding-tube.png
public/images/dh20/exploded/floor-brush.png
public/images/dh20/exploded/crevice-nozzle.png
public/images/dh20/exploded/two-in-one-brush.png
public/images/dh20/exploded/wall-mount.png
public/images/dh20/exploded/charger.png
```

## Подтверждённые характеристики

Единственный источник характеристик — `data/specifications.ts`:

- мощность: 400 Вт
- максимальная мощность всасывания: более 30 кПа при полностью заряженном
  аккумуляторе
- аккумулятор: 29,6 В, 2200 мА·ч, Li-ion
- режимы работы: приблизительно 10, 20, 35 и 60 минут
- объём контейнера: 800 мл
- время зарядки: около 5 часов
- уровень шума: не более 76 дБ
- моющийся HEPA-фильтр
- LED-индикатор
- складная труба
- моторизированная напольная щётка
- гарантия: 1 год

## Правила проекта

Подробные правила (никаких выдуманных данных, никаких случайных
изображений, дизайн-токены) — в [CLAUDE.md](./CLAUDE.md).
