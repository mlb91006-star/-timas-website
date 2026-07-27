import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { specificationGroups } from "@/data/specifications";

const warranty = specificationGroups
  .flatMap((group) => group.items)
  .find((item) => item.id === "warranty");

export function FinalCTA() {
  return (
    <section id="garantiya" className="scroll-mt-24 bg-black py-24 sm:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold text-bone-100 sm:text-4xl lg:text-5xl">
          {siteConfig.fullProductName}
        </h2>
        <p className="text-lg text-bone-300">Мощная уборка. Честные характеристики.</p>

        <Button href={siteConfig.buyHref} className="mt-2">
          Купить
        </Button>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-bone-500">
          {warranty && <span>Гарантия {warranty.value}</span>}
          <Link href="/products/dh20-ultra#specifications" className="hover:text-bone-100">
            Характеристики
          </Link>
          <Link href="/#komplekt" className="hover:text-bone-100">
            Комплектация
          </Link>
        </div>
      </div>
    </section>
  );
}
