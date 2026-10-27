import { Phone, Mail } from "lucide-react";
import { Button, DisabledButton } from "@/components/ui/Button";
import { contactsConfig } from "@/config/contacts";
import { Reveal } from "@/components/ui/Reveal";

export function Wholesale() {
  const hasPhone = Boolean(contactsConfig.wholesalePhone);
  const hasEmail = Boolean(contactsConfig.wholesaleEmail);

  return (
    <section id="wholesale" className="scroll-mt-20 bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Для магазинов и оптовых клиентов
          </h2>
          <p className="mt-3 max-w-xl text-paper-soft/80">
            Работаем с магазинами и партнёрами из Дагестана и других
            регионов Северного Кавказа. Чтобы запросить оптовый прайс и
            условия сотрудничества — свяжитесь с нами.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {hasPhone ? (
            <Button href={`tel:${contactsConfig.wholesalePhone}`} className="gap-2">
              <Phone size={18} />
              Позвонить
            </Button>
          ) : (
            <DisabledButton className="gap-2 border-white/15! bg-white/5! text-white/70!">
              <Phone size={18} />
              Телефон появится здесь
            </DisabledButton>
          )}

          {hasEmail ? (
            <Button
              href={`mailto:${contactsConfig.wholesaleEmail}`}
              variant="secondary"
              className="gap-2 border-white/20! text-white! hover:border-accent! hover:text-accent!"
            >
              <Mail size={18} />
              Написать на почту
            </Button>
          ) : (
            <DisabledButton className="gap-2 border-white/15! bg-white/5! text-white/70!">
              <Mail size={18} />
              Почта появится здесь
            </DisabledButton>
          )}
        </div>

        <p className="mt-6 text-xs text-paper-soft/60">
          Оптовые цены, минимальные партии и сроки поставки уточняются
          индивидуально при обращении.
        </p>
      </div>
    </section>
  );
}
