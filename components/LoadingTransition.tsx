'use client';

import { useState, useEffect } from 'react';

export default function LoadingTransition() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if we've already shown the loading screen in this session
    const hasShownLoading = sessionStorage.getItem('hasShownLoading');

    if (hasShownLoading) {
      setIsVisible(false);
      return;
    }

    // Hide after 1.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('hasShownLoading', 'true');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-base-white flex items-center justify-center transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="text-center animate-fadeIn">
        {/* Logo */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary-pink via-primary-turquoise to-primary-mustard bg-clip-text text-transparent animate-shimmer">
            Graffiti Designs
          </span>
        </h1>
        
        {/* Tagline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          מוצרי דפוס בעיצוב ייחודי
        </p>

        {/* Loading Spinner */}
        <div className="flex justify-center gap-2">
          <div
            className="w-3 h-3 rounded-full bg-primary-pink animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="w-3 h-3 rounded-full bg-primary-turquoise animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="w-3 h-3 rounded-full bg-primary-mustard animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
}

