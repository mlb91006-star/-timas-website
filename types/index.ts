export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  productName: string;
  fullProductName: string;
  description: string;
  url: string;
  locale: string;
  nav: NavLink[];
  buyHref: string;
}

export interface SpecificationItem {
  id: string;
  label: string;
  value: string;
  note?: string;
}

export interface SpecificationGroup {
  id: string;
  title: string;
  items: SpecificationItem[];
}

export interface ExplodedPart {
  id: string;
  label: string;
  image: string;
}

export interface SequenceManifest {
  /** Public-relative paths (e.g. "/sequences/timas-main/desktop/frame-0001.webp"), sorted by frame number. */
  frames: string[];
  frameCount: number;
  extension: string | null;
}

export interface ScrollTextStage {
  /** Scroll progress range within the sequence, 0–1. */
  start: number;
  end: number;
  title: string;
  subtitle?: string;
}
