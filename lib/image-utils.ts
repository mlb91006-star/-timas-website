import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

export function resolvePublicPath(relativeSrc: string): string {
  return path.join(process.cwd(), "public", relativeSrc);
}

export function imageFileExists(relativeSrc: string): boolean {
  return fs.existsSync(resolvePublicPath(relativeSrc));
}

interface CheckerboardResult {
  isCheckerboard: boolean;
  cellSize?: number;
  matchRatio?: number;
}

const CANDIDATE_CELL_SIZES = [8, 10, 12, 16, 20, 24, 32];
const GRID_SAMPLE = 24;
const MATCH_THRESHOLD = 0.85;
const NO_CHECKERBOARD: CheckerboardResult = { isCheckerboard: false };

async function detectCheckerboard(absolutePath: string): Promise<CheckerboardResult> {
  try {
    const image = sharp(absolutePath);
    const meta = await image.metadata();
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;
    if (!width || !height) return NO_CHECKERBOARD;

    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const channels = info.channels;

    // Real alpha transparency doesn't need this heuristic at all — a
    // checkerboard "transparency indicator" only ever shows up baked into
    // fully (or mostly) opaque pixels.
    if (meta.hasAlpha) {
      let transparentSamples = 0;
      const probes = 200;
      for (let i = 0; i < probes; i++) {
        const x = Math.floor((i * 37) % width);
        const y = Math.floor((i * 53) % height);
        const idx = (y * width + x) * channels;
        if (data[idx + 3] < 250) transparentSamples++;
      }
      if (transparentSamples > probes * 0.02) return NO_CHECKERBOARD;
    }

    const sampleAt = (x: number, y: number) => {
      const cx = Math.min(width - 1, Math.max(0, x));
      const cy = Math.min(height - 1, Math.max(0, y));
      const idx = (cy * width + cx) * channels;
      return [data[idx], data[idx + 1], data[idx + 2]];
    };

    const brightness = (c: number[]) => (c[0] + c[1] + c[2]) / 3;
    const isGrayish = (c: number[]) =>
      Math.abs(c[0] - c[1]) < 12 && Math.abs(c[1] - c[2]) < 12 && Math.abs(c[0] - c[2]) < 12;

    let best: CheckerboardResult = NO_CHECKERBOARD;

    for (const cell of CANDIDATE_CELL_SIZES) {
      const cols = Math.min(GRID_SAMPLE, Math.floor(width / cell));
      const rows = Math.min(GRID_SAMPLE, Math.floor(height / cell));
      if (cols < 6 || rows < 6) continue;

      const cellColors: number[][][] = [];
      for (let ry = 0; ry < rows; ry++) {
        const row: number[][] = [];
        for (let rx = 0; rx < cols; rx++) {
          row.push(sampleAt(rx * cell + cell / 2, ry * cell + cell / 2));
        }
        cellColors.push(row);
      }

      const flat = cellColors.flat();
      const sortedByBrightness = [...flat].sort((a, b) => brightness(a) - brightness(b));
      const mid = Math.floor(sortedByBrightness.length / 2);
      const avg = (group: number[][]) => {
        const n = group.length || 1;
        const sum = group.reduce(
          (acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]],
          [0, 0, 0],
        );
        return [sum[0] / n, sum[1] / n, sum[2] / n];
      };
      const colorA = avg(sortedByBrightness.slice(0, mid));
      const colorB = avg(sortedByBrightness.slice(mid));

      if (!isGrayish(colorA) || !isGrayish(colorB)) continue;
      const contrast = Math.abs(brightness(colorA) - brightness(colorB));
      if (contrast < 15 || contrast > 130) continue;

      const classify = (c: number[]) =>
        Math.abs(brightness(c) - brightness(colorA)) < Math.abs(brightness(c) - brightness(colorB))
          ? 0
          : 1;

      let matches = 0;
      let invertedMatches = 0;
      let total = 0;
      for (let ry = 0; ry < rows; ry++) {
        for (let rx = 0; rx < cols; rx++) {
          const bucket = classify(cellColors[ry][rx]);
          const expected = (rx + ry) % 2;
          if (bucket === expected) matches++;
          else invertedMatches++;
          total++;
        }
      }

      const ratio = Math.max(matches, invertedMatches) / total;
      if (ratio >= MATCH_THRESHOLD && ratio > (best.matchRatio ?? 0)) {
        best = { isCheckerboard: true, cellSize: cell, matchRatio: ratio };
      }
    }

    return best;
  } catch {
    return NO_CHECKERBOARD;
  }
}

const checkerboardCache = new Map<string, Promise<CheckerboardResult>>();

/**
 * True if the file has a checkerboard "transparency indicator" baked into
 * its actual pixels instead of a real alpha channel — the classic failure
 * mode when a design tool's preview grid gets exported as part of the
 * image. Heuristic best-effort check; only ever logs to the server
 * console, and only in development.
 */
export async function hasBakedCheckerboard(relativeSrc: string): Promise<boolean> {
  const absolutePath = resolvePublicPath(relativeSrc);
  if (!fs.existsSync(absolutePath)) return false;

  let pending = checkerboardCache.get(absolutePath);
  if (!pending) {
    pending = detectCheckerboard(absolutePath);
    checkerboardCache.set(absolutePath, pending);
  }

  const result = await pending;
  if (result.isCheckerboard && process.env.NODE_ENV === "development") {
    console.warn(
      `[image-utils] "${relativeSrc}" looks like it has a checkerboard pattern baked into its pixels ` +
        `(cell ≈${result.cellSize}px, match ${(((result.matchRatio ?? 0) * 100)).toFixed(0)}%). ` +
        "That is not real transparency — showing the neutral placeholder instead. Re-export with a genuine alpha channel.",
    );
  }
  return result.isCheckerboard;
}

/**
 * Combined "safe to show" check: the file must exist AND not have a baked
 * checkerboard. Used by ProductImageSlot so a broken export never reaches
 * the user.
 */
export async function isImageSafeToShow(relativeSrc: string): Promise<boolean> {
  if (!imageFileExists(relativeSrc)) return false;
  const checkerboard = await hasBakedCheckerboard(relativeSrc);
  return !checkerboard;
}
