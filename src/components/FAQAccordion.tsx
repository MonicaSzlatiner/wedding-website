"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[] | readonly { question: string; answer: string }[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 md:space-y-4" role="region" aria-label="Frequently Asked Questions">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden"
          >
            <h3>
              <button
                id={buttonId}
                onClick={() => toggleItem(index)}
                className="w-full px-4 py-4 md:px-6 md:py-5 text-left flex items-center justify-between gap-3 md:gap-4 hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-inset min-h-[56px]"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="font-serif text-base md:text-lg text-stone-800 leading-snug">
                  {item.question}
                </span>
                <ChevronDownIcon
                  className={`h-5 w-5 text-stone-400 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                isOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="px-4 pb-4 md:px-6 md:pb-5 text-stone-600 text-sm md:text-base leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
