# TIMAS DH20 Ultra — официальный сайт

Официальный сайт беспроводного пылесоса TIMAS DH20 Ultra: премиальная
scroll-driven презентация продукта на Next.js.

## Стек

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger — покомпонентная scroll-анимация разборки
- Framer Motion — лёгкие интерфейсные анимации (меню, переходы текста)
- Lucide React — иконки
- `sharp` — серверная проверка изображений (см. ниже)
- ESLint

## Запуск

```bash
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

Перед коммитом:

```bash
npm run lint
npm run build
```

## Структура проекта

```
app/                          маршруты App Router
components/
  layout/                     шапка, мобильное меню, футер
  sections/                   секции главной страницы
  product/                    сцена разборки, страница товара
  ui/                         переиспользуемые примитивы (кнопка, слот изображения)
config/                       site.ts (навигация), commerce.ts (ссылки на покупку)
data/                         типизированные данные: характеристики, детали разборки,
                               истории о компонентах, FAQ
hooks/                        useReducedMotion, useMediaQuery, useImagesPreloaded
lib/                          lib/gsap.ts (регистрация плагинов),
                               lib/image-utils.ts (проверка изображений)
types/                        общие TypeScript-типы
public/images/dh20/           изображения товара
```

## Изображения

### Куда класть файлы

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

Имена файлов должны совпадать **точно** — по этим путям обращаются
`data/exploded-parts.ts` и остальные компоненты. Как только файл появится
по нужному пути, заглушка автоматически заменится на реальное изображение
— без правок кода.

### Шахматная сетка — это не прозрачность

Если экспортировать PNG/WebP из графического редактора неправильно,
индикатор прозрачности (серо-белая клетка) может оказаться **вшит в сами
пиксели** файла, а не быть настоящим альфа-каналом. Такой файл выглядит
прозрачным в предпросмотре редактора, но на сайте показал бы клетчатый
прямоугольник вместо детали.

Сайт проверяет это автоматически (`lib/image-utils.ts`): если в файле
обнаружен вшитый шахматный узор, вместо него показывается нейтральная
заглушка, а предупреждение попадает только в консоль сервера при
`npm run dev` — пользователь никогда не увидит клетку. Чтобы файл прошёл
проверку, экспортируйте его с настоящим альфа-каналом (например,
«Export As → PNG» с включённым «Transparency», без слоя-подложки в виде
шахматной сетки).

### Как оптимизировать PNG

Перед загрузкой в `public/images/dh20/exploded/` рекомендуется сжать
файлы, не теряя альфа-канал:

```bash
npx sharp-cli input.png -o output.png --png.quality 90 --png.compressionLevel 9
```

Либо любым инструментом, сохраняющим прозрачность (`pngquant --quality
80-95`, TinyPNG и т.п.). Проверяйте после сжатия, что края детали
остаются чёткими и фон действительно прозрачный (не серый).

## Сцена разборки (ExplodedVacuumSection)

Вся логика описана в `components/product/ExplodedScene.tsx` (GSAP
ScrollTrigger, pin, cleanup), а все данные — в `data/exploded-parts.ts`.
В коде нет ни одной захардкоженной координаты или подписи.

### Как отредактировать положение детали

Откройте `data/exploded-parts.ts` → массив `explodedAnimationParts`.
У каждой детали есть три набора трансформаций:

```ts
desktopTransform: { x: 90, y: -50, scale: 0.95, rotate: 4 },
tabletTransform: { x: 65, y: -35, scale: 0.95, rotate: 4 },
mobileTransform: { x: 45, y: -25, scale: 0.94, rotate: 4 },
```

`x`/`y` — смещение в пикселях от собранного положения, `scale` —
масштаб, `rotate` — поворот в градусах. Поля `start`/`end` задают
диапазон прогресса прокрutки (0–1), в котором деталь движется.

### Как отключить деталь

Поставьте `enabled: false` у нужной записи в `explodedAnimationParts` —
деталь пропустится в анимации и в списке для reduced-motion, без удаления
данных.

## Покупка и контакты

- `config/commerce.ts` — ссылки на Ozon, Wildberries, Telegram, WhatsApp,
  телефон, email, цена и наличие. Пока поле пустое — соответствующая
  кнопка на сайте показывает «Скоро в продаже» вместо неработающей
  ссылки. Заполните поле — кнопка сразу станет рабочей.
- `app/contacts/page.tsx` — страница контактов.
- `config/site.ts` — домен сайта (`url`), название, описание, навигация.

## Подтверждённые характеристики

Единственный источник — `data/specifications.ts`. Полный список — в
[CLAUDE.md](./CLAUDE.md).

## Production build

```bash
npm run build
npm run start
```
