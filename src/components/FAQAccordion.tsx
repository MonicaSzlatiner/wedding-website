"use client";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[] | readonly { question: string; answer: string }[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="space-y-0" role="region" aria-label="Frequently Asked Questions">
      {items.map((item, index) => {
        return (
          <details
            key={index}
            className="group border-b pb-8"
            style={{ borderColor: "rgba(45, 41, 38, 0.1)" }}
          >
            <summary
              className="flex items-center justify-between gap-4 py-8 cursor-pointer list-none 
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              <span 
                className="font-serif text-2xl leading-snug" 
                style={{ color: "#2D2926", fontWeight: 400 }}
              >
                {item.question}
              </span>
              
              {/* Rotating + icon that becomes × when open */}
              <span 
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-3xl font-thin transition-transform duration-200 group-open:rotate-45"
                style={{ color: "rgba(45, 41, 38, 0.4)" }}
                aria-hidden="true"
              >
                +
              </span>
            </summary>

            <div 
              className="mt-6 text-base font-light leading-relaxed max-w-xl faq-answer"
              style={{ color: "rgba(45, 41, 38, 0.6)" }}
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </details>
        );
      })}
    </div>
  );
}
