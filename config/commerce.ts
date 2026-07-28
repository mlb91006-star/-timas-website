import type { CommerceConfig } from "@/types";

/**
 * No real purchase channels are connected yet. Every field is empty on
 * purpose — components reading this config must render a disabled,
 * honest "coming soon" state instead of a dead link or a fabricated price.
 * Fill in a field here the moment it becomes real; nothing else needs to
 * change in the components that consume it.
 */
export const commerceConfig: CommerceConfig = {
  ozonUrl: "",
  wildberriesUrl: "",
  telegramUrl: "",
  whatsappUrl: "",
  phone: "",
  email: "",
  price: null,
  currency: "RUB",
  availability: null,
};
