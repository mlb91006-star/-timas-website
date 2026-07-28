import type { Metadata } from "next";
import { ProductHero } from "@/components/product/ProductHero";
import { SpecificationsTable } from "@/components/product/SpecificationsTable";
import { PurchaseOptions } from "@/components/product/PurchaseOptions";
import { siteConfig } from "@/config/site";
import { commerceConfig } from "@/config/commerce";

const canonicalPath = "/products/dh20-ultra";

export const metadata: Metadata = {
  title: siteConfig.productName,
  description: siteConfig.description,
  alternates: {
    canonical: canonicalPath,
  },
  openGraph: {
    title: siteConfig.fullProductName,
    description: siteConfig.description,
    url: canonicalPath,
    type: "website",
    images: ["/images/dh20/vacuum-hero.webp"],
  },
};

const availabilityMap: Record<string, string> = {
  in_stock: "https://schema.org/InStock",
  preorder: "https://schema.org/PreOrder",
  out_of_stock: "https://schema.org/OutOfStock",
};

function buildProductJsonLd() {
  const product: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: siteConfig.fullProductName,
    description: siteConfig.description,
    image: [`${siteConfig.url}/images/dh20/vacuum-hero.webp`],
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
  };

  // Only add an offer once a real price and availability are configured —
  // never a placeholder value.
  if (commerceConfig.price != null && commerceConfig.availability) {
    product.offers = {
      "@type": "Offer",
      priceCurrency: commerceConfig.currency,
      price: commerceConfig.price,
      availability: availabilityMap[commerceConfig.availability],
      url: `${siteConfig.url}${canonicalPath}`,
    };
  }

  return product;
}

function buildBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: siteConfig.productName,
        item: `${siteConfig.url}${canonicalPath}`,
      },
    ],
  };
}

export default function DH20UltraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProductJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd()) }}
      />

      <ProductHero />
      <SpecificationsTable />
      <section className="bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
          <PurchaseOptions />
        </div>
      </section>
    </>
  );
}
