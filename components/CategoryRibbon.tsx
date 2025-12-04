'use client';

import Link from 'next/link';
import { categoryNames, Category } from '@/types/product';

const categoryIcons: Record<Category, string> = {
  envelopes: '✉️',
  cards: '💌',
  'recipe-books': '📖',
  magnets: '🖼️',
  planners: '📅',
  printables: '🖨️',
  notebooks: '📓',
  'shopping-lists': '🛒',
};

export default function CategoryRibbon() {
  const categories = Object.entries(categoryNames) as [Category, string][];

  return (
    <section
      className="py-16 bg-gradient-to-b from-white via-gray-50 to-white relative z-10"
      aria-label="קטגוריות מוצרים"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-base-black mb-10">
          גלו את הקטגוריות שלנו
        </h2>
        
        {/* Categories Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Mobile: Horizontal Scroll | Desktop: Grid */}
          <div className="overflow-x-auto md:overflow-visible scrollbar-hide pb-6 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex md:grid md:grid-cols-8 gap-4 md:gap-8 min-w-max md:min-w-0 justify-center">
              {categories.map(([key, label]) => (
                <Link
                  key={key}
                  href={`/shop?category=${key}`}
                  className="group flex flex-col items-center gap-3 min-w-[100px]"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-50 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 flex items-center justify-center border border-gray-100 group-hover:border-primary-pink/20">
                    <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
                      {categoryIcons[key]}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-primary-pink transition-colors text-center">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

