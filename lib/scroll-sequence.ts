import fs from "node:fs";
import path from "node:path";
import type { SequenceManifest } from "@/types";

const SUPPORTED_EXTENSIONS = ["webp", "avif", "jpg", "jpeg", "png"];
const FRAME_NUMBER = /(\d+)(?=\.[^.]+$)/;

/**
 * Reads a frame folder under /public at build/request time, auto-detects
 * the extension in use, and sorts frames by the number embedded in their
 * filename (not alphabetically) — so any naming scheme works. Returns an
 * empty manifest (never throws) when the folder is missing or has no
 * recognizable frames, so a missing sequence never breaks the page.
 */
function readSequenceDir(publicRelativeDir: string): SequenceManifest {
  const absoluteDir = path.join(process.cwd(), "public", publicRelativeDir);

  if (!fs.existsSync(absoluteDir)) {
    return { frames: [], frameCount: 0, extension: null };
  }

  const candidates = fs
    .readdirSync(absoluteDir)
    .filter((name) => SUPPORTED_EXTENSIONS.includes(path.extname(name).slice(1).toLowerCase()));

  const numbered = candidates
    .map((name) => {
      const match = name.match(FRAME_NUMBER);
      return { name, num: match ? parseInt(match[1], 10) : NaN };
    })
    .filter((entry) => !Number.isNaN(entry.num))
    .sort((a, b) => a.num - b.num);

  const frames = numbered.map((entry) => `/${publicRelativeDir}/${entry.name}`);
  const extension = numbered.length > 0 ? path.extname(numbered[0].name).slice(1) : null;

  return { frames, frameCount: frames.length, extension };
}

export function getScrollSequenceManifest(variant: "desktop" | "mobile"): SequenceManifest {
  return readSequenceDir(`sequences/timas-main/${variant}`);
}
