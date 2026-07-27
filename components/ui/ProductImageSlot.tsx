import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

interface ProductImageSlotProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

/**
 * Renders the real product photo when it exists in /public, otherwise a
 * neutral placeholder — no invented product imagery. Existence is checked
 * on the server so a missing asset never breaks the build or the page.
 */
export function ProductImageSlot({
  src,
  alt,
  priority,
  className,
}: ProductImageSlotProps) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-white/5 bg-graphite-900 ${className ?? ""}`}
    >
      {exists ? (
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
