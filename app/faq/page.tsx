'use client';

import { useState } from 'react';
import { faqData, categoryNames } from '@/data/faq';
import Accordion from '@/components/Accordion';

type Category = keyof typeof categoryNames;

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQ = faqData.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: Array<{ key: Category | 'all'; label: string }> = [
    { key: 'all', label: 'הכל' },
    { key: 'shipping', label: categoryNames.shipping },
    { key: 'payment', label: categoryNames.payment },
    { key: 'returns', label: categoryNames.returns },
    { key: 'custom', label: categoryNames.custom },
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/faq.png')" }}
    >
      {/* Overlay for better text readability */}
      <div className="bg-white/85 min-h-screen">
        <div className="container mx-auto px-4 py-12 animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-base-black mb-4">
          שאלות נפוצות
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          מצאו תשובות לשאלות הנפוצות ביותר על המוצרים והשירותים שלנו
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="חיפוש שאלה..."
            className="w-full px-6 py-4 pr-12 rounded-lg border-2 border-base-gray focus:outline-none focus:ring-2 focus:ring-primary-turquoise focus:border-transparent text-lg"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              selectedCategory === key
                ? 'bg-primary-pink text-white shadow-md scale-105'
                : 'bg-white text-gray-700 hover:bg-base-gray/30'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      {filteredFAQ.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-base-black mb-4">
            לא נמצאו תוצאות
          </h2>
          <p className="text-gray-600">
            נסו לחפש במילים אחרות או לבחור קטגוריה אחרת
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQ.map((item) => (
            <Accordion key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Contact CTA */}
      <div className="mt-16 bg-gradient-to-br from-primary-turquoise/10 to-primary-pink/10 rounded-2xl p-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-base-black mb-4">
          לא מצאתם את מה שחיפשתם?
        </h2>
        <p className="text-gray-700 mb-6">
          צוות השירות שלנו כאן כדי לעזור! צרו איתנו קשר ונשמח לענות על כל שאלה
        </p>
        <a
          href="/contact"
          className="inline-block bg-primary-pink text-white px-8 py-3 rounded-lg font-medium hover:scale-105 transition-transform"
        >
          צור קשר
        </a>
      </div>
        </div>
      </div>
    </div>
  );
}

