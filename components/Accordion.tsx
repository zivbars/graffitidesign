'use client';

import { useState } from 'react';
import { FAQItem } from '@/data/faq';

interface AccordionProps {
  item: FAQItem;
}

export default function Accordion({ item }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-base-gray rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-right hover:bg-base-gray/10 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-base-black text-lg">
          {item.question}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 text-primary-pink transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 text-gray-700 leading-relaxed border-t border-base-gray">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

