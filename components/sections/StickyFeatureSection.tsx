import { ProductImageSlot } from "@/components/ui/ProductImageSlot";
import { StickyFeatureSectionClient } from "./StickyFeatureSectionClient";

export function StickyFeatureSection() {
  return (
    <StickyFeatureSectionClient
      image={
        <ProductImageSlot
          src="/images/dh20/vacuum-hero.webp"
          alt="TIMAS DH20 Ultra"
          className="h-full w-full"
        />
      }
    />
  );
}
