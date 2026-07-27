"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ScrollTextStage } from "@/types";

interface ScrollImageSequenceProps {
  /** Public-relative frame paths for wide screens, already sorted. */
  desktopFrames: string[];
  /** Public-relative frame paths for phones. Falls back to desktopFrames if empty. */
  mobileFrames: string[];
  /** Viewport width (px) at/above which the desktop frame set is used. */
  desktopBreakpoint?: number;
  /** Real product photo shown when no frame sequence exists yet. */
  fallbackSrc: string;
  fallbackAlt: string;
  desktopHeightVh: number;
  mobileHeightVh: number;
  textStages: ScrollTextStage[];
  /** Accessible description of the scene, for screen-reader users and the canvas's non-visual context. */
  sceneLabel: string;
}

const PRELOAD_KEYFRAMES = 16;
const PRELOAD_SEQUENTIAL = 20;
const MAX_NEIGHBOR_SEARCH = 60;
const BACKGROUND_BATCH = 4;

/**
 * Canvas-driven scroll sequence: scrollProgress -> frameIndex -> canvas draw.
 * Falls back to a single real photo (with a simple scroll-linked reveal,
 * not a fabricated animation) when no frame sequence has been uploaded yet
 * — see public/sequences/timas-main/README.md.
 */
export function ScrollImageSequence({
  desktopFrames,
  mobileFrames,
  desktopBreakpoint = 1024,
  fallbackSrc,
  fallbackAlt,
  desktopHeightVh,
  mobileHeightVh,
  textStages,
  sceneLabel,
}: ScrollImageSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const loadedRef = useRef<boolean[]>([]);
  const lastDrawnIndexRef = useRef(-1);
  const pendingIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const activeStageRef = useRef(0);

  // isMounted keeps the first client render identical to the server-rendered
  // HTML (both show the "not decided yet" tree below) so choosing between
  // canvas/fallback/reduced-motion — all genuinely different DOM shapes,
  // decidable only from browser-only APIs — never causes a hydration
  // mismatch. The one extra render right after mount is expected here.
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  // Resolved once from the real viewport on mount — deliberately not
  // re-evaluated on resize, since switching frame sets mid-scroll would
  // jump-cut the scene. Never both sets loaded at once.
  const [frames, setFrames] = useState<string[]>([]);
  const [activeStage, setActiveStage] = useState(0);

  const frameCount = frames.length;
  const hasSequence = frameCount > 0;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    const isDesktop = window.innerWidth >= desktopBreakpoint;
    setFrames(isDesktop ? desktopFrames : mobileFrames.length > 0 ? mobileFrames : desktopFrames);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawFrameAt = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || frameCount === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let found = -1;
      for (let d = 0; d <= MAX_NEIGHBOR_SEARCH; d++) {
        const forward = index + d;
        if (forward < frameCount && loadedRef.current[forward]) {
          found = forward;
          break;
        }
        const backward = index - d;
        if (d > 0 && backward >= 0 && loadedRef.current[backward]) {
          found = backward;
          break;
        }
      }
      if (found === -1 || found === lastDrawnIndexRef.current) return;

      const img = imagesRef.current[found];
      if (!img) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      if (cssW === 0 || cssH === 0) return;

      const targetW = Math.round(cssW * dpr);
      const targetH = Math.round(cssH * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      const scale = Math.min(cssW / img.naturalWidth, cssH / img.naturalHeight);
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      ctx.drawImage(img, (cssW - drawW) / 2, (cssH - drawH) / 2, drawW, drawH);

      lastDrawnIndexRef.current = found;
    },
    [frameCount],
  );

  // Preload: first + last + evenly spaced keyframes + first N sequential now,
  // the rest in small background batches so we never fetch everything at once.
  useEffect(() => {
    if (!hasSequence) return;

    imagesRef.current = new Array(frameCount).fill(null);
    loadedRef.current = new Array(frameCount).fill(false);
    lastDrawnIndexRef.current = -1;
    let cancelled = false;

    const loadOne = (i: number) => {
      if (cancelled || i < 0 || i >= frameCount || imagesRef.current[i]) return;
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (cancelled) return;
        loadedRef.current[i] = true;
        if (lastDrawnIndexRef.current === -1 || i === pendingIndexRef.current) {
          drawFrameAt(pendingIndexRef.current);
        }
      };
      img.src = frames[i];
      imagesRef.current[i] = img;
    };

    const priority = new Set<number>([0, frameCount - 1]);
    for (let k = 0; k < PRELOAD_KEYFRAMES; k++) {
      priority.add(Math.round((k / Math.max(1, PRELOAD_KEYFRAMES - 1)) * (frameCount - 1)));
    }
    for (let i = 0; i < Math.min(PRELOAD_SEQUENTIAL, frameCount); i++) priority.add(i);
    priority.forEach(loadOne);

    const remaining: number[] = [];
    for (let i = 0; i < frameCount; i++) if (!priority.has(i)) remaining.push(i);

    let cursor = 0;
    const pump = () => {
      if (cancelled) return;
      for (let c = 0; c < BACKGROUND_BATCH && cursor < remaining.length; c++, cursor++) {
        loadOne(remaining[cursor]);
      }
      if (cursor < remaining.length) setTimeout(pump, 60);
    };
    const win = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (win.requestIdleCallback) win.requestIdleCallback(pump);
    else setTimeout(pump, 200);

    return () => {
      cancelled = true;
    };
  }, [frames, frameCount, hasSequence, drawFrameAt]);

  // Scroll drives frame + text stage. No React state on every scroll tick —
  // only when the resolved stage index actually changes.
  useEffect(() => {
    if (!isMounted || prefersReducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          if (hasSequence) {
            pendingIndexRef.current = Math.min(
              frameCount - 1,
              Math.max(0, Math.floor(progress * frameCount)),
            );
            if (rafRef.current == null) {
              rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;
                drawFrameAt(pendingIndexRef.current);
              });
            }
          } else if (fallbackRef.current) {
            const reveal = Math.min(1, progress / 0.15);
            fallbackRef.current.style.opacity = String(reveal);
            fallbackRef.current.style.transform = `scale(${0.94 + 0.06 * reveal})`;
          }

          let stageIndex = textStages.findIndex((s) => progress >= s.start && progress < s.end);
          if (stageIndex === -1) {
            stageIndex = progress >= 1 ? textStages.length - 1 : 0;
          }
          if (stageIndex !== activeStageRef.current) {
            activeStageRef.current = stageIndex;
            setActiveStage(stageIndex);
          }
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [isMounted, prefersReducedMotion, hasSequence, frameCount, textStages, drawFrameAt]);

  // Resize: redraw the current frame at the new canvas size — never a new canvas.
  useEffect(() => {
    if (!isMounted || !hasSequence) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      lastDrawnIndexRef.current = -1;
      drawFrameAt(pendingIndexRef.current);
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [isMounted, hasSequence, drawFrameAt]);

  if (!isMounted || prefersReducedMotion) {
    return (
      <section className="bg-black px-4 py-20 sm:px-6 lg:px-8" aria-label={sceneLabel}>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-white/5 bg-graphite-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fallbackSrc}
              alt={fallbackAlt}
              className="h-full w-full object-contain p-8"
            />
          </div>
          <div className="flex flex-col gap-6">
            {textStages.map((stage) => (
              <div key={stage.title}>
                <p className="font-display text-xl font-semibold text-bone-100 sm:text-2xl">
                  {stage.title}
                </p>
                {stage.subtitle && (
                  <p className="mt-1 text-bone-400">{stage.subtitle}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const stage = textStages[activeStage];

  return (
    <section
      ref={sectionRef}
      className="relative bg-black [height:var(--sequence-mobile-vh)] lg:[height:var(--sequence-desktop-vh)]"
      style={
        {
          "--sequence-mobile-vh": `${mobileHeightVh}svh`,
          "--sequence-desktop-vh": `${desktopHeightVh}svh`,
        } as React.CSSProperties
      }
      aria-label={sceneLabel}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {hasSequence ? (
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-16">
            <div ref={fallbackRef} className="h-full w-full max-w-2xl opacity-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fallbackSrc}
                alt={fallbackAlt}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-[max(2rem,calc(env(safe-area-inset-bottom)+1rem))] flex justify-center px-4 lg:inset-x-auto lg:top-28 lg:bottom-10 lg:left-8 lg:flex lg:items-center lg:justify-start lg:px-0 xl:left-16">
          <div className="max-w-sm text-center lg:text-left">
            <AnimatePresence mode="wait">
              {stage && (
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <p className="font-display text-2xl font-semibold text-bone-100 sm:text-3xl lg:text-4xl">
                    {stage.title}
                  </p>
                  {stage.subtitle && (
                    <p className="mt-2 text-base text-bone-300 sm:text-lg">
                      {stage.subtitle}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
