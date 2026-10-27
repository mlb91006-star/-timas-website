export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  /** Legal entity shown in the footer, e.g. "ООО «ЮГТРАНС»". */
  legalName: string;
  tagline: string;
  description: string;
  /** Empty until a real domain is confirmed — never invent one. */
  url: string;
  locale: string;
  nav: NavLink[];
}

export interface SizeItem {
  id: string;
  /** Short size label as printed on the pack, e.g. "NB", "S", "M". */
  label: string;
  /** Units per pack — only confirmed counts belong here. */
  packCount: number;
  /**
   * Weight range for this size, e.g. "3–6 кг" — omit entirely when not
   * confirmed by the brand owner. Never invent a range.
   */
  weightRange?: string;
  image: string;
  alt: string;
}

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  sizes: SizeItem[];
}

export interface BrandFact {
  id: string;
  title: string;
  text: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface MarketplaceConfig {
  /** Empty string = link not yet available; never link to "#". */
  wildberriesUrl: string;
  ozonUrl: string;
}

export interface ContactsConfig {
  phone: string;
  email: string;
  whatsapp: string;
  telegram: string;
  wholesalePhone: string;
  wholesaleEmail: string;
  address: string;
}
