import { getScrollSequenceManifest } from "@/lib/scroll-sequence";
import { ScrollImageSequence } from "@/components/ui/ScrollImageSequence";
import { heroSequenceConfig, heroTextStages } from "@/data/scroll-sequence";

/**
 * Server wrapper: reads the frame folders (fs access, server-only) and
 * hands resolved paths to the client canvas component. Keeps node:fs out
 * of the client bundle, same pattern as ProductImageSlot.
 */
export function HeroSequence() {
  const desktop = getScrollSequenceManifest("desktop");
  const mobile = getScrollSequenceManifest("mobile");

  return (
    <ScrollImageSequence
      desktopFrames={desktop.frames}
      mobileFrames={mobile.frames}
      fallbackSrc={heroSequenceConfig.fallbackImage}
      fallbackAlt={heroSequenceConfig.fallbackAlt}
      desktopHeightVh={heroSequenceConfig.desktopHeightVh}
      mobileHeightVh={heroSequenceConfig.mobileHeightVh}
      textStages={heroTextStages}
      sceneLabel="Сцена: TIMAS DH20 Ultra — мощность двигателя, всасывание, фильтрация и автономность"
    />
  );
}
