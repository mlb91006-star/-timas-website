import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Send, Building2 } from "lucide-react";
import { contactsConfig } from "@/config/contacts";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контактная информация Mylamby.",
};

const contactItems = [
  { icon: Phone, label: "Телефон", value: contactsConfig.phone },
  { icon: Mail, label: "Электронная почта", value: contactsConfig.email },
  { icon: MessageCircle, label: "WhatsApp", value: contactsConfig.whatsapp },
  { icon: Send, label: "Telegram", value: contactsConfig.telegram },
  { icon: MapPin, label: "Адрес", value: contactsConfig.address },
  { icon: Building2, label: "Юридическое лицо", value: siteConfig.legalName },
];

export default function ContactsPage() {
  return (
    <section className="bg-paper pt-32 pb-24 sm:pt-40">
      <div className="mx-auto max-w-2xl px-5 sm:px-8 lg:px-12">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Контакты</h1>
        <p className="mt-3 text-ink-muted">
          Контактные данные будут опубликованы здесь после подтверждения
          владельцем бренда.
        </p>

        <div className="mt-12 flex flex-col gap-4">
          {contactItems.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-4 rounded-card border border-line bg-paper p-6 shadow-soft"
            >
              <Icon className="mt-0.5 shrink-0 text-accent" size={22} />
              <div>
                <p className="text-sm text-ink-muted">{label}</p>
                <p className="mt-1 font-medium text-ink">{value || "Появится здесь"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
