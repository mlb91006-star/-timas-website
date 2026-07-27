import { Hero } from "@/components/sections/Hero";
import { SpecsHighlight } from "@/components/sections/SpecsHighlight";
import { ExplodedVacuumSection } from "@/components/sections/ExplodedVacuumSection";
import { ProductImageSlot } from "@/components/ui/ProductImageSlot";
import { explodedParts } from "@/data/exploded-parts";

const assembled = explodedParts.find((part) => part.id === "vacuum-complete");
const disassembledParts = explodedParts.filter(
  (part) => part.id !== "vacuum-complete",
);

export default function Home() {
  return (
    <>
      <Hero />
      <SpecsHighlight />
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
    </>
  );
}
