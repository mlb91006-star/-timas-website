import { HeroSequence } from "@/components/sections/HeroSequence";
import { ExplodedVacuumSection } from "@/components/sections/ExplodedVacuumSection";
import { StickyFeatureSection } from "@/components/sections/StickyFeatureSection";
import { DetailCards } from "@/components/sections/DetailCards";
import { RealUseSection } from "@/components/sections/RealUseSection";
import { SpecsHighlight } from "@/components/sections/SpecsHighlight";
import { PackageContents } from "@/components/sections/PackageContents";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ProductImageSlot } from "@/components/ui/ProductImageSlot";
import { explodedParts } from "@/data/exploded-parts";

const assembled = explodedParts.find((part) => part.id === "vacuum-complete");
const disassembledParts = explodedParts.filter(
  (part) => part.id !== "vacuum-complete",
);

export default function Home() {
  return (
    <>
      <HeroSequence />

      <ExplodedVacuumSection
        parts={disassembledParts.map((part) => ({
          id: part.id,
          node: (
            <ProductImageSlot
              src={part.image}
              alt={part.label}
              className="h-full w-full"
            />
          ),
        }))}
      >
        {assembled && (
          <ProductImageSlot
            src={assembled.image}
            alt="TIMAS DH20 Ultra в разборе"
            className="h-full w-full"
          />
        )}
      </ExplodedVacuumSection>

      <StickyFeatureSection />
      <DetailCards />
      <RealUseSection />
      <SpecsHighlight />
      <PackageContents />
      <FinalCTA />
    </>
  );
}
