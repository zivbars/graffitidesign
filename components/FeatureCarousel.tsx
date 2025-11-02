'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

export default function FeatureCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: 'rtl' }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const features: Feature[] = [
    {
      title: 'עיצוב מקורי ומושקע',
      description: 'כל מוצר עובר תהליך עיצוב מדוקדק ומקצועי, עם תשומת לב מיוחדת לאסתטיקה ולפרטים הקטנים',
      color: 'from-primary-pink to-primary-turquoise',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      title: 'חומרים איכותיים',
      description: 'אנחנו משתמשים רק בחומרי גלם מהשורה הראשונה - נייר עבה, דיו איכותי והדפסה ברמה הגבוהה ביותר',
      color: 'from-primary-turquoise to-primary-mustard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      title: 'אחריות חברתית',
      description: 'המוצרים שלנו מיוצרים במפעל המעסיק אנשים עם מוגבלויות, ומקדם שוויון הזדמנויות בעולם העבודה',
      color: 'from-primary-mustard to-primary-pink',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'משלוח מהיר',
      description: 'משלוח לכל רחבי הארץ תוך 3-5 ימי עסקים, עם אפשרות למשלוח מהיר ואיסוף עצמי',
      color: 'from-primary-pink to-primary-mustard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
    },
    {
      title: 'שירות אישי',
      description: 'צוות התמיכה שלנו זמין לכל שאלה, עם מענה מהיר ואדיב לכל פניה',
      color: 'from-primary-turquoise to-primary-pink',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <section className="py-16 bg-white" aria-label="תכונות המותג" role="region">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-base-black mb-4">
            למה לבחור בנו?
          </h2>
          <p className="text-gray-600 text-lg">
            הערכים שמובילים אותנו בכל שלב
          </p>
        </div>

        {/* Embla Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex" style={{ direction: 'rtl' }}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 px-4"
              >
                <div className={`max-w-2xl mx-auto bg-gradient-to-br ${feature.color} p-1 rounded-3xl`}>
                  <div className="bg-white rounded-3xl p-12 text-center h-full">
                    <div className="flex justify-center mb-6 text-primary-pink">
                      {feature.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-base-black mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="carousel-dots">
          {features.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === selectedIndex ? 'active' : ''}`}
              onClick={() => scrollTo(index)}
              aria-label={`עבור לשקופית ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

