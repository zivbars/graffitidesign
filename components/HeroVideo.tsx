'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HeroVideo() {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden" aria-label="דף הבית - היירו">
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

      {/* Gradient Overlay - darker in center for text readability */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.2) 100%)' 
        }} 
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fadeIn max-w-5xl mx-auto">
          <h1 
            className="text-5xl md:text-7xl lg:text-9xl font-fredoka font-bold mb-6 tracking-tight drop-shadow-2xl flex flex-wrap justify-center gap-4 leading-normal py-4 overflow-visible"
            dir="ltr"
          >
            <span className="flex overflow-visible" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5)) drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}>
              {"Graffiti".split('').map((char, index) => (
                <span
                  key={`g-${index}`}
                  className="inline-block animate-spray bg-gradient-to-b from-primary-pink to-[#962f63] bg-clip-text text-transparent pb-8 hover:brightness-110 hover:-translate-y-1 transition-all duration-300 cursor-default"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    backgroundImage: 'linear-gradient(to bottom, #C04182, #962f63)',
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="flex overflow-visible" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5)) drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}>
              {"Design".split('').map((char, index) => (
                <span
                  key={`d-${index}`}
                  className="inline-block animate-spray bg-clip-text text-transparent pb-8 hover:brightness-110 hover:-translate-y-1 transition-all duration-300 cursor-default"
                  style={{ 
                    animationDelay: `${(index + 8) * 0.1}s`,
                    backgroundImage: 'linear-gradient(to bottom, #00BCD4, #0097A7)',
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>
          
          <div className="space-y-4 mb-12">
            <p 
              className="text-3xl md:text-5xl text-white font-bold"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)' }}
            >
              מוצרי דפוס בעיצוב ייחודי ומקורי
            </p>
            <p 
              className="text-xl md:text-2xl text-white font-light max-w-3xl mx-auto leading-relaxed"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.3)' }}
            >
              עיצוב מקורי, מיוצר בישראל, מגיע אליכם עם אהבה
            </p>
          </div>

          <Link href="/shop" className="relative inline-block group">
            {/* Glowing Background Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-pink via-primary-turquoise to-primary-mustard rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 animate-gradient-xy"></div>
            
            {/* Main Button */}
            <button className="relative px-10 py-5 bg-white text-base-black rounded-full font-bold text-xl md:text-2xl transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-xl overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                גלו את הקולקציה
                <span className="group-hover:translate-x-1 transition-transform duration-300">←</span>
              </span>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent z-0" />
            </button>
          </Link>
        </div>
      </div>

      {/* Wave Separator - Smooth transition to white content */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px] rotate-180" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
}

