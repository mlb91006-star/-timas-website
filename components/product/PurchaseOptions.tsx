import { Mail, MessageCircle, Phone, ShoppingBag } from "lucide-react";
import type { ComponentType } from "react";
import { commerceConfig } from "@/config/commerce";

interface Channel {
  key: string;
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
}

function buildChannels(): Channel[] {
  const channels: Channel[] = [];
  if (commerceConfig.ozonUrl) {
    channels.push({ key: "ozon", label: "Ozon", href: commerceConfig.ozonUrl, icon: ShoppingBag });
  }
  if (commerceConfig.wildberriesUrl) {
    channels.push({
      key: "wildberries",
      label: "Wildberries",
      href: commerceConfig.wildberriesUrl,
      icon: ShoppingBag,
    });
  }
  if (commerceConfig.telegramUrl) {
    channels.push({
      key: "telegram",
      label: "Telegram",
      href: commerceConfig.telegramUrl,
      icon: MessageCircle,
    });
  }
  if (commerceConfig.whatsappUrl) {
    channels.push({
      key: "whatsapp",
      label: "WhatsApp",
      href: commerceConfig.whatsappUrl,
      icon: MessageCircle,
    });
  }
  if (commerceConfig.phone) {
    channels.push({ key: "phone", label: commerceConfig.phone, href: `tel:${commerceConfig.phone}`, icon: Phone });
  }
  if (commerceConfig.email) {
    channels.push({ key: "email", label: commerceConfig.email, href: `mailto:${commerceConfig.email}`, icon: Mail });
  }
  return channels;
}

/**
 * Renders one real, working link per configured commerce channel
 * (config/commerce.ts). No channel is faked: an empty config renders a
 * disabled, honest "coming soon" state instead of a dead href="#" link.
 */
export function PurchaseOptions() {
  const channels = buildChannels();

  return (
    <div id="buy" className="scroll-mt-24 rounded-2xl border border-white/5 bg-graphite-900 p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold text-bone-100 sm:text-2xl">Купить</h2>

      {commerceConfig.price != null && (
        <p className="mt-3 font-display text-2xl font-semibold text-bone-100">
          {commerceConfig.price.toLocaleString("ru-RU")} {commerceConfig.currency}
        </p>
      )}

      {channels.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {channels.map(({ key, label, href, icon: Icon }) => {
            const isExternal = href.startsWith("http");
            return (
              <a
                key={key}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-champagne-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-champagne-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-300 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-900"
              >
                <Icon size={18} aria-hidden />
                {label}
              </a>
            );
          })}
        </div>
      ) : (
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="mt-5 inline-flex min-h-[44px] cursor-not-allowed items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-bone-500"
        >
          Ссылка появится после запуска продаж
        </button>
      )}
    </div>
  );
}
