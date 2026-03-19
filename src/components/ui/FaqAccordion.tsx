"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article
            key={item.question}
            className="rounded-2xl border-2 border-neutral-900/20 bg-white/70 backdrop-blur-sm"
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-8 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="text-base font-semibold text-neutral-900 sm:text-xl">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-neutral-700 transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-neutral-700 sm:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
