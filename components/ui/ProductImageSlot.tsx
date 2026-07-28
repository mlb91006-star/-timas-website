import Image from "next/image";
import { isImageSafeToShow } from "@/lib/image-utils";

interface ProductImageSlotProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

/**
 * Renders the real product photo when it exists in /public and doesn't
 * have a checkerboard "transparency indicator" baked into its pixels
 * (see lib/image-utils.ts) — otherwise a neutral graphite silhouette.
 * Existence/quality checks run on the server, so a missing or broken
 * export never breaks the build or reaches the user.
 */
export async function ProductImageSlot({
  src,
  alt,
  priority,
  className,
}: ProductImageSlotProps) {
  const safe = await isImageSafeToShow(src);

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-white/5 bg-graphite-900 ${className ?? ""}`}
    >
      {safe ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-contain p-8"
          sizes="(min-width: 1024px) 560px, 90vw"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="h-14 w-14 rounded-full border border-champagne-500/50" />
          <p className="max-w-[240px] text-sm text-bone-500">
            Фотография товара появится здесь
          </p>
        </div>
      )}
    </div>
  );
}
