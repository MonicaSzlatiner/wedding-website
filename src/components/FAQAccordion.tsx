"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Luxury editorial easing
const EASING = [0.25, 0.1, 0.25, 1.0] as const;

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[] | readonly { question: string; answer: string }[];
}

function FAQAccordionItem({ item, index }: { item: { question: string; answer: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="border-b pb-8"
      style={{ borderColor: "rgba(45, 41, 38, 0.1)" }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-4 py-8 w-full text-left cursor-pointer 
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span 
          className="font-serif text-2xl leading-snug" 
          style={{ color: "#2D2926", fontWeight: 400 }}
        >
          {item.question}
        </span>
        
        {/* Rotating + icon that becomes × when open */}
        <motion.span 
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-3xl font-thin"
          style={{ color: "rgba(45, 41, 38, 0.4)" }}
          aria-hidden="true"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ 
            duration: shouldReduceMotion ? 0 : 0.3, 
            ease: EASING 
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: EASING },
              opacity: { duration: 0.2, delay: shouldReduceMotion ? 0 : 0.1 },
            }}
            style={{ overflow: "hidden" }}
          >
            <div 
              className="mt-6 text-base font-light leading-relaxed max-w-xl faq-answer pb-2"
              style={{ color: "rgba(45, 41, 38, 0.6)" }}
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="space-y-0" role="region" aria-label="Frequently Asked Questions">
      {items.map((item, index) => (
        <FAQAccordionItem key={index} item={item} index={index} />
      ))}
    </div>
  );
}
