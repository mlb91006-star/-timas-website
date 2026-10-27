import { Reveal } from "@/components/ui/Reveal";

const comparisons = [
  { not: "Невероятный комфорт для вашего малыша", instead: "12 слоёв. Впитывающий слой — 71%." },
  { not: "Лучшие подгузники на рынке", instead: "Абсорбент SAP SANDIA, стандарт Japan Quality." },
  { not: "Мы заботимся о вашем ребёнке", instead: "Размеры от NB до XXL." },
];

export function QualityCare() {
  return (
    <section id="quality" className="scroll-mt-20 bg-paper-soft py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Качество и забота
          </h2>
          <p className="mt-2 max-w-xl text-ink-muted">
            Мы не используем рекламные формулировки — только конкретные
            цифры.
          </p>
        </Reveal>

        <div className="mt-10 overflow-hidden rounded-card border border-line bg-paper shadow-soft">
          <div className="grid grid-cols-2 border-b border-line bg-paper-soft text-xs font-semibold tracking-wide text-ink-muted uppercase">
            <div className="px-6 py-3">Так не говорим</div>
            <div className="px-6 py-3">Так говорим</div>
          </div>
          {comparisons.map((row) => (
            <div key={row.not} className="grid grid-cols-2 border-b border-line last:border-0">
              <div className="px-6 py-5 text-sm text-ink-muted line-through decoration-line">
                {row.not}
              </div>
              <div className="px-6 py-5 text-sm font-medium text-ink">{row.instead}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
