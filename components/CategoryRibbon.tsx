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
      className="bg-gradient-to-b from-base-white to-white py-10"
      aria-label="קטגוריות מוצרים"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-base-black mb-6">
          גלו את הקטגוריות שלנו
        </h2>
        
        {/* Categories Grid */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 pb-4 pt-2">
            {categories.map(([key, label]) => (
              <Link
                key={key}
                href={`/shop?category=${key}`}
                className="flex justify-center"
              >
                <div className="group w-full aspect-square max-w-[140px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center gap-2 border-2 border-transparent hover:border-primary-pink will-change-transform">
                  <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    {categoryIcons[key]}
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-base-black group-hover:text-primary-pink transition-colors text-center px-2">
                    {label}
                  </span>
                </div>
              </Link>
            ))}
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

