import { ProductImageSlot } from "@/components/ui/ProductImageSlot";
import type { ExplodedPartConfig } from "@/types";

interface ExplodedPartProps {
  part: ExplodedPartConfig;
}

/**
 * Purely presentational: renders one part's image at its assembled (rest)
 * position and scale. All motion is applied externally by ExplodedScene
 * via GSAP transforms on the wrapping element it owns — this component
 * never animates itself.
 */
export function ExplodedPart({ part }: ExplodedPartProps) {
  return <ProductImageSlot src={part.image} alt={part.alt} className="h-full w-full" />;
}
