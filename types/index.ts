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
