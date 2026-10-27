import type { MarketplaceConfig } from "@/types";

/**
 * Marketplace links — leave empty until the brand owner confirms a real,
 * live product listing. An empty value must render a disabled button with
 * honest text ("Уточнить наличие и цену"), never a dead "#" link and never
 * an invented URL.
 */
export const marketplaceConfig: MarketplaceConfig = {
  wildberriesUrl: "",
  ozonUrl: "",
};
