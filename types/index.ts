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

/** A pure-transform position for one exploded part at one breakpoint tier. */
export interface PartTransform {
  /** Horizontal offset in px from the assembled position. */
  x: number;
  /** Vertical offset in px from the assembled position (positive = down). */
  y: number;
  /** Uniform scale relative to the assembled photo's own scale. */
  scale: number;
  /** Rotation in degrees. Kept minimal per the animation direction rules. */
  rotate: number;
}

/**
 * Full config for one part of the exploded-view scroll animation. All
 * coordinates, timing, and copy live here — never inline in JSX — so the
 * scene component only maps data to a GSAP timeline.
 */
export interface ExplodedPartConfig {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  /** Scroll progress range (0–1) within the exploded section during which this part animates. */
  start: number;
  end: number;
  desktopTransform: PartTransform;
  tabletTransform: PartTransform;
  mobileTransform: PartTransform;
  zIndex: number;
  /** Set false to skip this part everywhere (animation, mobile cards) without deleting its data. */
  enabled: boolean;
}

export interface CommerceConfig {
  ozonUrl: string;
  wildberriesUrl: string;
  telegramUrl: string;
  whatsappUrl: string;
  phone: string;
  email: string;
  /** Price in the smallest sensible display unit (whole rubles). Omit until confirmed. */
  price: number | null;
  currency: string;
  availability: "preorder" | "in_stock" | "out_of_stock" | null;
}

export interface FeatureStoryContent {
  id: string;
  title: string;
  text: string;
  warning?: string;
  image: string;
  alt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/** Framing copy for the exploded scene's idle (0–10%) and final (86–100%) stages. */
export interface ExplodedNarrativeStage {
  title: string;
  subtitle: string;
}
