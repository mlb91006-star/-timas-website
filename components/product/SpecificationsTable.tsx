import { specificationGroups } from "@/data/specifications";

export function SpecificationsTable() {
  return (
    <section id="specifications" className="scroll-mt-24 bg-graphite-950 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-bone-100 sm:text-3xl">
          Характеристики
        </h2>
        <p className="mt-2 text-bone-500">
          Только подтверждённые производителем данные.
        </p>

        <div className="mt-10 flex flex-col gap-10">
          {specificationGroups.map((group) => (
            <div key={group.id}>
              <h3 className="text-sm tracking-[0.1em] text-champagne-400 uppercase">
                {group.title}
              </h3>
              <dl className="mt-4 divide-y divide-white/5 rounded-2xl border border-white/5 bg-graphite-900">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <dt className="text-sm text-bone-500">{item.label}</dt>
                    <dd className="text-right font-medium text-bone-100 sm:text-left">
                      {item.value}
                      {item.note && (
                        <span className="block text-xs font-normal text-bone-500">
                          {item.note}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
