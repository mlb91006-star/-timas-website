"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ExplodedPartSlot {
  id: string;
  node: ReactNode;
}

interface ExplodedVacuumSectionProps {
  /**
   * The assembled product visual, rendered by a Server Component parent
   * (ProductImageSlot). Passed in as children so this client component
   * never bundles server-only code (node:fs) itself.
   */
  children?: ReactNode;
  /**
   * One slot per exploded part (data/exploded-parts.ts), each already
   * rendered server-side via ProductImageSlot. Mounted now, invisible and
   * stacked on the assembled visual, so a future GSAP timeline can animate
   * partRefs.current[id] directly instead of waiting on real assets to
   * exist before the DOM structure is in place.
   */
  parts?: ExplodedPartSlot[];
}

/**
 * Technical scaffold for the future exploded-view scroll animation.
 * Real part imagery (data/exploded-parts.ts) is not uploaded yet, so this
 * only pins the section, mounts hidden per-part layers, and reserves the
 * ScrollTrigger lifecycle — no timeline, no invented internals.
 */
export function ExplodedVacuumSection({
  children,
  parts = [],
}: ExplodedVacuumSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const partRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reserved: once /public/images/dh20/exploded/*.png exist, build the
      // part-by-part timeline here, targeting partRefs.current[part.id],
      // and drive it with this ScrollTrigger.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="exploded"
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "600vh" }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center gap-8 overflow-hidden px-4 text-center">
        <span className="text-xs tracking-[0.2em] text-champagne-400 uppercase">
          Устройство DH20 Ultra
        </span>

        <h2 className="font-display max-w-2xl text-3xl font-semibold text-bone-100 sm:text-4xl lg:text-5xl">
          Продуман до каждой детали
        </h2>

        <div className="relative aspect-square w-full max-w-md">
          <div className="absolute inset-0">{children}</div>

          {parts.map((part) => (
            <div
              key={part.id}
              ref={(el) => {
                partRefs.current[part.id] = el;
              }}
              data-exploded-part={part.id}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0"
            >
              {part.node}
            </div>
          ))}
        </div>

        <p className="max-w-md text-sm text-bone-500">
          Покомпонентная анимация появится здесь после загрузки фотографий
          деталей.
        </p>
      </div>
    </section>
  );
}
