"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/faq";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-12">
        <h2 className="font-display text-2xl font-semibold text-bone-100 sm:text-3xl">
          Вопросы и ответы
        </h2>

        <div className="mt-10 divide-y divide-white/5 border-y border-white/5">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div key={item.id}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex min-h-[44px] w-full items-center justify-between gap-4 rounded-sm py-5 text-left text-base font-medium text-bone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500/60"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className={`shrink-0 text-bone-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-bone-400">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
