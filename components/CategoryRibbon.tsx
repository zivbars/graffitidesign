'use client';

import Link from 'next/link';
import { categoryNames, Category } from '@/types/product';

const categoryIcons: Record<Category, string> = {
  envelopes: '✉️',
  cards: '💌',
  'recipe-books': '📖',
  magnets: '🧲',
  planners: '📅',
  printables: '🖨️',
  notebooks: '📓',
  'shopping-lists': '🛒',
};

export default function CategoryRibbon() {
  const categories = Object.entries(categoryNames) as [Category, string][];

  return (
    <section
      className="bg-gradient-to-b from-base-white to-white py-12"
      aria-label="קטגוריות מוצרים"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-base-black mb-8">
          גלו את הקטגוריות שלנו
        </h2>
        
        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {categories.map(([key, label]) => (
              <Link
                key={key}
                href={`/shop?category=${key}`}
                className="flex-shrink-0 snap-start"
              >
                <div className="group w-40 h-40 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center gap-3 border-2 border-transparent hover:border-primary-pink">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[key]}
                  </span>
                  <span className="text-base font-semibold text-base-black group-hover:text-primary-pink transition-colors">
                    {label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Hint Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          ← גלול לצפייה בכל הקטגוריות →
        </p>
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

