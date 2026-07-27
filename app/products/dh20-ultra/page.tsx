import type { Metadata } from "next";
import { ProductHero } from "@/components/product/ProductHero";
import { SpecificationsTable } from "@/components/product/SpecificationsTable";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.productName,
  description: siteConfig.description,
};

export default function DH20UltraPage() {
  return (
    <>
      <ProductHero />
      <SpecificationsTable />
    </>
  );
}
