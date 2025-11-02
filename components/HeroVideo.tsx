'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from './Button';

export default function HeroVideo() {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="video-hero-container" aria-label="דף הבית - היירו">
      {/* Video Background */}
      {!videoError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoError(true)}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-showcase.mp4" type="video/mp4" />
        </video>
      )}

      {/* Fallback Background Image */}
      {videoError && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/bg/wood-light.jpg')" }}
          aria-hidden="true"
        />
      )}

      {/* Gradient Overlay */}
      <div className="video-hero-overlay" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center animate-fadeIn">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-lg">
            <span className="bg-gradient-to-r from-primary-pink via-primary-turquoise to-primary-mustard bg-clip-text text-transparent">
              Graffiti Design
            </span>
          </h1>
          <p className="text-2xl md:text-4xl text-white mb-4 drop-shadow-md font-medium">
            מוצרי דפוס בעיצוב ייחודי ומקורי
          </p>
          <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
            עיצוב מקורי, מיוצר בישראל, מגיע אליכם עם אהבה
          </p>
          <Link href="/shop">
            <Button size="lg" className="text-xl px-16 py-4 shadow-2xl hover:scale-105 transition-transform">
              גלו את הקולקציה
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => {
          const nextSection = document.querySelector('[aria-label="קטגוריות מוצרים"]');
          if (nextSection) {
            const headerHeight = 80; // גובה ה-header
            const extraPadding = 20; // מרווח נוסף
            const elementPosition = nextSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight - extraPadding;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform"
        aria-label="גלול למטה"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white opacity-75 hover:opacity-100 transition-opacity"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </section>
  );
}

