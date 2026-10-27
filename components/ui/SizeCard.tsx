import { ProductImageSlot } from "@/components/ui/ProductImageSlot";
import type { SizeItem } from "@/types";

interface SizeCardProps {
  size: SizeItem;
}

export function SizeCard({ size }: SizeCardProps) {
  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-card border border-line bg-paper shadow-soft transition-transform duration-200 hover:-translate-y-0.5">
      <ProductImageSlot src={size.image} alt={size.alt} className="aspect-square w-full" />
      <div className="p-5">
        <p className="font-display text-xl font-bold text-ink">{size.label}</p>
        <p className="mt-1 text-sm text-ink-muted">{size.packCount} шт. в упаковке</p>
        {size.weightRange ? (
          <p className="mt-1 text-sm text-ink-muted">{size.weightRange}</p>
        ) : null}
        <a
          href="#where-to-buy"
          className="mt-4 inline-block text-sm font-semibold text-accent hover:text-accent-hover"
        >
          Где купить →
        </a>
      </div>
    </div>
  );
}
