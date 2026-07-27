import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контактная информация TIMAS.",
};

export default function ContactsPage() {
  return (
    <section className="bg-black pt-32 pb-24 sm:pt-40">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-bone-100 sm:text-4xl">
          Контакты
        </h1>
        <p className="mt-3 text-bone-300">
          Контактные данные будут опубликованы здесь на следующем этапе.
        </p>

        <div className="mt-12 flex flex-col gap-4">
          <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-graphite-900 p-6">
            <Mail className="mt-0.5 shrink-0 text-champagne-400" size={22} />
            <div>
              <p className="text-sm text-bone-500">Электронная почта</p>
              <p className="mt-1 font-medium text-bone-100">Появится здесь</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-graphite-900 p-6">
            <MapPin className="mt-0.5 shrink-0 text-champagne-400" size={22} />
            <div>
              <p className="text-sm text-bone-500">Адрес</p>
              <p className="mt-1 font-medium text-bone-100">Появится здесь</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
