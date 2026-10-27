import Image from "next/image";
import { isImageSafeToShow } from "@/lib/image-utils";

interface ProductImageSlotProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  /**
   * "card" (default): bordered panel with a "photo coming soon" message —
   * for a single standalone slot (hero, catalog cards, story sections).
   * "silhouette": just a soft neutral shape, no border / background /
   * text — for contexts where several slots can be visible at once,
   * where stacking multiple "card" fallbacks would read as broken,
   * overlapping duplicate UI instead of a clean diagram.
   */
  variant?: "card" | "silhouette";
}

/**
 * Renders the real product photo when it exists in /public and doesn't
 * have a checkerboard "transparency indicator" baked into its pixels
 * (see lib/image-utils.ts) — otherwise a neutral, honest placeholder.
 * Existence/quality checks run on the server, so a missing or broken
 * export never breaks the build or reaches the user. BRAND_KIT: "фото
 * продукта — на белом или светло-сером, без тяжёлых теней."
 */
export async function ProductImageSlot({
  src,
  alt,
  priority,
  className,
  variant = "card",
}: ProductImageSlotProps) {
  const safe = await isImageSafeToShow(src);

  if (safe) {
    return (
      <div
        className={`relative overflow-hidden rounded-card border border-line bg-paper-soft ${className ?? ""}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-contain p-6"
          sizes="(min-width: 1024px) 560px, 90vw"
        />
      </div>
    );
  }

  if (variant === "silhouette") {
    return (
      <div className={`relative ${className ?? ""}`}>
        <div className="absolute inset-[18%] rounded-full bg-accent-soft blur-[1px]" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-card border border-line bg-paper-soft ${className ?? ""}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="h-12 w-12 rounded-full border border-accent/40 bg-paper" />
        <p className="max-w-[240px] text-sm text-ink-muted">Фотография появится здесь</p>
      </div>
    </div>
  );
}
