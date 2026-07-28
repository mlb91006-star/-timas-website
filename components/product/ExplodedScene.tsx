"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useImagesPreloaded } from "@/hooks/useImagesPreloaded";
import { PartAnnotation } from "./PartAnnotation";
import { MobilePartCard } from "./MobilePartCard";
import type { ExplodedNarrativeStage, ExplodedPartConfig } from "@/types";

interface ScenePart {
  config: ExplodedPartConfig;
  node: ReactNode;
}

interface ExplodedSceneProps {
  /** Pre-rendered assembled/anchor image (server-rendered ProductImageSlot). */
  anchor: ReactNode;
  anchorImageSrc: string;
  parts: ScenePart[];
  introStage: ExplodedNarrativeStage;
  finalStage: ExplodedNarrativeStage;
  heightVh: number;
}

interface Stage {
  id: string;
  start: number;
  end: number;
  title: string;
  subtitle: string;
}

export function ExplodedScene({
  anchor,
  anchorImageSrc,
  parts,
  introStage,
  finalStage,
  heightVh,
}: ExplodedSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const partRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const activeIndexRef = useRef(0);

  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");
  const tier: "desktop" | "tablet" | "mobile" = isDesktop
    ? "desktop"
    : isAtLeastTablet
      ? "tablet"
      : "mobile";

  const preloadSrcs = useMemo(
    () => [anchorImageSrc, ...parts.map((p) => p.config.image)],
    [anchorImageSrc, parts],
  );
  const imagesReady = useImagesPreloaded(preloadSrcs);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const stages: Stage[] = useMemo(() => {
    const enabledParts = parts.filter((p) => p.config.enabled);
    return [
      { id: "intro", start: 0, end: enabledParts[0]?.config.start ?? 0.1, title: introStage.title, subtitle: introStage.subtitle },
      ...enabledParts.map((p) => ({
        id: p.config.id,
        start: p.config.start,
        end: p.config.end,
        title: p.config.title,
        subtitle: p.config.description,
      })),
      {
        id: "final",
        start: enabledParts[enabledParts.length - 1]?.config.end ?? 0.86,
        end: 1.001,
        title: finalStage.title,
        subtitle: finalStage.subtitle,
      },
    ];
  }, [parts, introStage, finalStage]);

  useEffect(() => {
    if (!isMounted || prefersReducedMotion) return;
    if (!sectionRef.current || !pinRef.current) return;

    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          pin: pinRef.current,
          onUpdate: (self) => {
            const progress = self.progress;
            let idx = stages.findIndex((s) => progress >= s.start && progress < s.end);
            if (idx === -1) idx = progress >= 1 ? stages.length - 1 : 0;
            if (idx !== activeIndexRef.current) {
              activeIndexRef.current = idx;
              setActiveIndex(idx);
            }
          },
        },
      });

      parts.forEach(({ config }) => {
        if (!config.enabled) return;
        const el = partRefs.current[config.id];
        if (!el) return;

        const transform =
          tier === "desktop"
            ? config.desktopTransform
            : tier === "tablet"
              ? config.tabletTransform
              : config.mobileTransform;

        gsap.set(el, { x: 0, y: 0, scale: 1, rotate: 0, autoAlpha: 0 });
        tl.to(
          el,
          {
            x: transform.x,
            y: transform.y,
            scale: transform.scale,
            rotate: transform.rotate,
            autoAlpha: 1,
            duration: config.end - config.start,
          },
          config.start,
        );
      });
    }, sectionRef);

    if (imagesReady) {
      ScrollTrigger.refresh();
    }

    return () => ctx.revert();
  }, [isMounted, prefersReducedMotion, tier, parts, imagesReady, stages]);

  if (!isMounted) {
    return <div style={{ height: `${heightVh}vh` }} className="bg-black" aria-hidden="true" />;
  }

  if (prefersReducedMotion) {
    return (
      <section className="bg-black px-5 py-20 sm:px-8 lg:px-12" aria-label={introStage.title}>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
          <h2 className="font-display text-3xl font-semibold text-bone-100 sm:text-4xl">
            {introStage.title}
          </h2>
          <div className="aspect-square w-full max-w-md">{anchor}</div>
          <div className="grid w-full gap-6 text-left sm:grid-cols-2">
            {parts
              .filter((p) => p.config.enabled)
              .map(({ config }) => (
                <div key={config.id}>
                  <p className="font-display text-lg font-semibold text-bone-100">
                    {config.title}
                  </p>
                  <p className="mt-1 text-sm text-bone-400">{config.description}</p>
                </div>
              ))}
          </div>
          <p className="font-display text-xl font-semibold text-champagne-400">
            {finalStage.title}
          </p>
        </div>
      </section>
    );
  }

  const stage = stages[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: `${heightVh}vh` }}
      aria-label={`Сцена разборки: ${introStage.title}`}
    >
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden bg-black">
        <div className="mx-auto flex h-full max-w-6xl flex-col px-5 lg:flex-row lg:items-center lg:gap-16 lg:px-12">
          <div
            className="relative order-1 mt-[max(4.5rem,calc(env(safe-area-inset-top)+4.5rem))] h-[58svh] shrink-0 lg:order-2 lg:mt-0 lg:aspect-square lg:h-auto lg:w-[55%] lg:max-w-lg"
            aria-hidden="true"
          >
            <div className="absolute inset-0">{anchor}</div>
            {parts.map(({ config, node }) => (
              <div
                key={config.id}
                ref={(el) => {
                  partRefs.current[config.id] = el;
                }}
                style={{ zIndex: config.zIndex }}
                className="absolute inset-0"
              >
                {node}
              </div>
            ))}
          </div>

          <div className="order-2 flex-1 py-4 lg:order-1 lg:py-0">
            <div className="hidden lg:block">
              {stage && (
                <PartAnnotation
                  activeId={stage.id}
                  title={stage.title}
                  subtitle={stage.subtitle}
                  showScrollHint={activeIndex === 0}
                />
              )}
            </div>
            <div className="h-full lg:hidden">
              {stage && (
                <MobilePartCard
                  activeId={stage.id}
                  title={stage.title}
                  subtitle={stage.subtitle}
                  current={activeIndex}
                  total={stages.length}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
