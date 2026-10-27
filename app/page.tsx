import { Hero } from "@/components/sections/Hero";
import { Catalog } from "@/components/sections/Catalog";
import { SizeGuide } from "@/components/sections/SizeGuide";
import { AboutBrand } from "@/components/sections/AboutBrand";
import { QualityCare } from "@/components/sections/QualityCare";
import { WhereToBuy } from "@/components/sections/WhereToBuy";
import { Wholesale } from "@/components/sections/Wholesale";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Catalog />
      <SizeGuide />
      <AboutBrand />
      <QualityCare />
      <WhereToBuy />
      <Wholesale />
      <FAQ />
      <FinalCTA />
    </>
  );
}
