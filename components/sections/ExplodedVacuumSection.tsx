import { ProductImageSlot } from "@/components/ui/ProductImageSlot";
import { ExplodedPart } from "@/components/product/ExplodedPart";
import { ExplodedScene } from "@/components/product/ExplodedScene";
import {
  explodedAnimationParts,
  explodedParts,
  explodedIntroStage,
  explodedFinalStage,
} from "@/data/exploded-parts";

const ANIMATION_HEIGHT_VH = 680;

/**
 * Thin wrapper: resolves the anchor image + one ExplodedPart per config
 * entry (server-rendered, checkerboard/missing-file safe), then hands
 * everything to ExplodedScene, which owns the actual GSAP timeline. No
 * coordinates, timing, or copy live here — see data/exploded-parts.ts.
 *
 * The assembled photo (vacuum-complete) serves as the scene's anchor for
 * now — it's the only real photo TIMAS has supplied. A dedicated
 * motor-unit-only cutout can replace it later with no code changes.
 */
export function ExplodedVacuumSection() {
  const anchorPart = explodedParts.find((part) => part.id === "vacuum-complete");

  return (
    <ExplodedScene
      anchorImageSrc={anchorPart?.image ?? "/images/dh20/exploded/vacuum-complete.png"}
      anchor={
        anchorPart && (
          <ProductImageSlot
            src={anchorPart.image}
            alt="TIMAS DH20 Ultra в сборе"
            className="h-full w-full"
          />
        )
      }
      parts={explodedAnimationParts.map((config) => ({
        config,
        node: <ExplodedPart key={config.id} part={config} />,
      }))}
      introStage={explodedIntroStage}
      finalStage={explodedFinalStage}
      heightVh={ANIMATION_HEIGHT_VH}
    />
  );
}
