'use client';

import { useState } from 'react';
import { faqData, categoryNames } from '@/data/faq';
import Accordion from '@/components/Accordion';
import Link from 'next/link';

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-base-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('/faq.png')] bg-cover bg-center blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black font-fredoka mb-6 tracking-tight">
            שאלות נפוצות
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
            כל מה שרציתם לדעת על ההזמנות, המשלוחים והמוצרים שלנו
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-10 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="איך אפשר לעזור לך היום?"
              className="w-full px-8 py-5 pr-14 rounded-full text-base-black shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary-turquoise/30 transition-all text-lg"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400"
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
      </div>

      <div className="container mx-auto px-4 py-12 relative z-20">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                selectedCategory === key
                  ? 'bg-base-black text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:shadow-md'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto min-h-[400px]">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="text-6xl mb-6 opacity-50">🤔</div>
              <h2 className="text-2xl font-bold text-base-black mb-2">
                לא מצאנו תשובה לחיפוש שלך
              </h2>
              <p className="text-gray-500">
                נסו לחפש מילים אחרות או עברו לקטגוריה "הכל"
              </p>
            </div>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              {filteredFAQ.map((item) => (
                <div key={item.id} className="transform transition-all hover:scale-[1.01]">
                  <Accordion item={item} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-20 bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-turquoise via-primary-pink to-primary-mustard"></div>
          <h2 className="text-3xl font-bold text-base-black mb-4">
            עדיין יש לכם שאלות?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
            צוות השירות שלנו זמין עבורכם לכל שאלה או התייעצות. אנחנו משתדלים לענות במהירות!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-base-black text-white px-8 py-4 rounded-full font-bold hover:bg-primary-pink transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <span>צור קשר</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
            <a
              href="https://wa.me/972505752939"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:bg-[#128C7E] transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <span>וואטסאפ</span>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
