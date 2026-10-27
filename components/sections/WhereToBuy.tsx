import { ShoppingBag, Store } from "lucide-react";
import { Button, DisabledButton } from "@/components/ui/Button";
import { marketplaceConfig } from "@/config/commerce";
import { Reveal } from "@/components/ui/Reveal";

const marketplaces = [
  { id: "wildberries", label: "Wildberries", url: marketplaceConfig.wildberriesUrl },
  { id: "ozon", label: "Ozon", url: marketplaceConfig.ozonUrl },
];

export function WhereToBuy() {
  return (
    <section id="where-to-buy" className="scroll-mt-20 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Где купить</h2>
          <p className="mt-2 max-w-xl text-ink-muted">
            Wildberries, Ozon, аптеки и офлайн-розница.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:max-w-xl sm:grid-cols-2">
          {marketplaces.map((market) =>
            market.url ? (
              <Button key={market.id} href={market.url} className="gap-2">
                <ShoppingBag size={18} />
                {market.label}
              </Button>
            ) : (
              <div key={market.id} className="flex min-w-0 flex-col gap-2">
                <DisabledButton className="gap-2">
                  <ShoppingBag size={18} />
                  {market.label}
                </DisabledButton>
                <p className="text-xs text-ink-muted">Ссылка появится после подтверждения</p>
              </div>
            ),
          )}

          <div className="flex min-w-0 flex-col gap-2 sm:col-span-2">
            <div className="flex items-center gap-2 rounded-button border border-line bg-paper-soft px-6 py-3 text-sm font-semibold text-ink-muted">
              <Store size={18} />
              Аптеки и офлайн-розница
            </div>
            <p className="text-xs text-ink-muted">Наличие и адреса уточняйте на месте.</p>
          </div>
        </div>

        <p className="mt-8 max-w-xl text-sm text-ink-muted">
          Цена зависит от площадки и продавца. Уточняйте наличие и
          актуальную цену на странице маркетплейса.
        </p>
      </div>
    </section>
  );
}
