import { Hero } from "@/components/sections/Hero";
import { SpecsHighlight } from "@/components/sections/SpecsHighlight";
import { ExplodedVacuumSection } from "@/components/sections/ExplodedVacuumSection";
import { ProductImageSlot } from "@/components/ui/ProductImageSlot";

export default function Home() {
  return (
    <>
      <Hero />
      <SpecsHighlight />
      <ExplodedVacuumSection>
        <ProductImageSlot
          src="/images/dh20/exploded/vacuum-complete.png"
          alt="TIMAS DH20 Ultra в разборе"
          className="aspect-square w-full max-w-md"
        />
      </ExplodedVacuumSection>
    </>
  );
}
