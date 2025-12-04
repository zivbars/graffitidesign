'use client';

import { useState } from 'react';
import { partners } from '@/data/partners';
import Link from 'next/link';
import Image from 'next/image';

export default function PartnersPage() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (partnerId: string) => {
    setImageErrors((prev) => ({ ...prev, [partnerId]: true }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-base-black text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
           <div className="absolute inset-0 bg-[url('/partners.png')] bg-cover bg-center blur-sm transform scale-105"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black font-fredoka mb-6 tracking-tight">
            השותפים שלנו
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            אנחנו גאים לעבוד עם הרשתות המובילות בישראל כדי להביא את העיצובים שלנו קרוב אליכם
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-20 relative z-20">
        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {partners.map((partner) => {
            const hasError = imageErrors[partner.id];
            const showLogo = partner.logo && !hasError;

            const PartnerContent = (
              <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100 h-full flex flex-col">
                <div className="w-32 h-32 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-pink/5 transition-colors relative overflow-hidden">
                  {showLogo ? (
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain p-4"
                      sizes="128px"
                      onError={() => handleImageError(partner.id)}
                    />
                  ) : (
                    <span className="text-4xl font-black text-gray-300 group-hover:text-primary-pink transition-colors">
                      {partner.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold font-fredoka text-base-black mb-4 group-hover:text-primary-pink transition-colors">
                  {partner.name}
                </h3>
                <p className="text-gray-500 leading-relaxed flex-grow">
                  {partner.description}
                </p>
              </div>
            );

            return partner.website ? (
              <a
                key={partner.id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {PartnerContent}
              </a>
            ) : (
              <div key={partner.id}>
                {PartnerContent}
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <h2 className="text-3xl font-bold text-base-black mb-6">
              למה לקנות אצל המשווקים?
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
              <p>
                השותפויות שלנו מאפשרות לכם לראות ולהרגיש את המוצרים לפני הקנייה.
                בכל אחד מהסניפים תוכלו להתרשם מאיכות הנייר, הצבעים והגימור של המוצרים שלנו.
              </p>
              <p>
                כל המשווקים המורשים שלנו נבחרו בקפידה ומחויבים לאותם סטנדרטים גבוהים
                של שירות ואיכות שאנחנו מאמינים בהם.
              </p>
              
              <div className="bg-primary-turquoise/5 rounded-2xl p-6 mt-8 border border-primary-turquoise/10">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-turquoise/20 rounded-full flex items-center justify-center flex-shrink-0 text-primary-turquoise">
                    💡
                  </div>
                  <div>
                    <h4 className="font-bold text-base-black mb-2">חשוב לדעת</h4>
                    <p className="text-sm">
                      המלאי בחנויות עשוי להשתנות מסניף לסניף. מומלץ ליצור קשר עם הסניף
                      לפני ההגעה כדי לוודא שהמוצר שרציתם קיים במלאי.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action / Map Placeholder */}
          <div className="space-y-8">
            <div className="bg-base-black rounded-3xl shadow-xl p-8 md:p-12 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">רוצים להיות משווקים שלנו?</h3>
              <p className="text-gray-400 mb-8">
                אנחנו תמיד מחפשים שותפים חדשים לדרך. אם יש לכם חנות ואתם רוצים למכור
                את המוצרים שלנו, נשמח לשמוע מכם!
              </p>
              <Link href="/contact">
                <button className="bg-white text-base-black px-8 py-3 rounded-full font-bold hover:bg-primary-pink hover:text-white transition-all duration-300 shadow-lg">
                  צרו קשר עסקי
                </button>
              </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  📍
                </div>
                <h3 className="text-xl font-bold text-base-black mb-2">
                  בקרוב: מפת סניפים
                </h3>
                <p className="text-gray-500">
                  אנחנו עובדים על מפה אינטראקטיבית שתעזור לכם למצוא את הסניף הקרוב ביותר
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
