import { Hero } from "@/components/sections/Hero";
import { KeyMetrics } from "@/components/sections/KeyMetrics";
import { ExplodedVacuumSection } from "@/components/sections/ExplodedVacuumSection";
import { StickyFeatureSection } from "@/components/sections/StickyFeatureSection";
import { FeatureStorySection } from "@/components/sections/FeatureStorySection";
import { SpecsHighlight } from "@/components/sections/SpecsHighlight";
import { PackageContents } from "@/components/sections/PackageContents";
import { WarrantySupportSection } from "@/components/sections/WarrantySupportSection";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { featureStories } from "@/data/feature-stories";

export default function Home() {
  return (
    <>
      <Hero />
      <KeyMetrics />
      <ExplodedVacuumSection />
      <StickyFeatureSection />

      {featureStories.map((story, index) => (
        <FeatureStorySection
          key={story.id}
          story={story}
          reverse={index % 2 === 1}
          graphite={index % 2 === 1}
        />
      ))}

      <SpecsHighlight />
      <PackageContents />
      <WarrantySupportSection />
      <FAQ />
      <FinalCTA />
    </>
  );
}
