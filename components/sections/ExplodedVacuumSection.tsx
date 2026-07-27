"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ExplodedVacuumSectionProps {
  /**
   * The product visual, rendered by a Server Component parent (e.g.
   * ProductImageSlot). Passed in as children so this client component
   * never bundles server-only code (node:fs) itself.
   */
  children?: ReactNode;
}

/**
 * Technical scaffold for the future exploded-view scroll animation.
 * Real part imagery (data/exploded-parts.ts) is not uploaded yet, so this
 * only pins the section and reserves the ScrollTrigger lifecycle — no
 * timeline, no invented internals.
 */
export function ExplodedVacuumSection({ children }: ExplodedVacuumSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reserved: once /public/images/dh20/exploded/*.png exist, build the
      // part-by-part timeline here and drive it with this ScrollTrigger.
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

        {children}

        <p className="max-w-md text-sm text-bone-500">
          Покомпонентная анимация появится здесь после загрузки фотографий
          деталей.
        </p>
      </div>
    </section>
  );
}
