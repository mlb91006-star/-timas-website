import { ProductImageSlot } from "@/components/ui/ProductImageSlot";
import type { FeatureStoryContent } from "@/types";

interface FeatureStorySectionProps {
  story: FeatureStoryContent;
  reverse?: boolean;
  graphite?: boolean;
}

export function FeatureStorySection({ story, reverse, graphite }: FeatureStorySectionProps) {
  return (
    <section className={`${graphite ? "bg-graphite-950" : "bg-black"} py-20 sm:py-28`}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <div className={`min-w-0 ${reverse ? "lg:order-2" : ""}`}>
          <h2 className="font-display text-3xl font-semibold break-words text-bone-100 sm:text-4xl">
            {story.title}
          </h2>
          <p className="mt-4 max-w-md text-base text-bone-300 sm:text-lg">{story.text}</p>
          {story.warning && (
            <p className="mt-6 rounded-xl border border-champagne-500/20 bg-champagne-500/5 px-4 py-3 text-sm text-champagne-300">
              {story.warning}
            </p>
          )}
        </div>

        <ProductImageSlot
          src={story.image}
          alt={story.alt}
          className={`aspect-square w-full min-w-0 ${reverse ? "lg:order-1" : ""}`}
        />
      </div>
    </section>
  );
}
