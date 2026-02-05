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
            className="group border-t"
            style={{ borderColor: "rgba(45, 41, 38, 0.1)" }}
          >
            <summary
              className="flex items-center justify-between gap-4 py-6 cursor-pointer list-none 
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              <span 
                className="font-serif text-lg md:text-xl italic leading-snug" 
                style={{ color: "#2D2926", fontWeight: 400 }}
              >
                {item.question}
              </span>
              
              {/* Rotating + icon */}
              <span 
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center relative"
                aria-hidden="true"
              >
                {/* Horizontal line (always visible) */}
                <span 
                  className="absolute w-4 h-0.5 transition-all duration-200"
                  style={{ backgroundColor: "#C37B60" }}
                />
                {/* Vertical line (rotates to form + or -) */}
                <span 
                  className="absolute w-0.5 h-4 transition-all duration-200 group-open:rotate-90 group-open:opacity-0"
                  style={{ backgroundColor: "#C37B60" }}
                />
              </span>
            </summary>

            <div 
              className="pb-6 text-sm md:text-base leading-relaxed faq-answer pr-10"
              style={{ color: "rgba(45, 41, 38, 0.6)" }}
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </details>
        );
      })}
      {/* Bottom border for last item */}
      <div className="border-t" style={{ borderColor: "rgba(45, 41, 38, 0.1)" }} />
    </div>
  );
}
