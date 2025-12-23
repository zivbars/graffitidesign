'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-3 select-none sticky top-24">
      {/* Main Image - Smaller vertical aspect ratio to fit viewport */}
      <div className="relative w-full max-h-[65vh] aspect-[4/5] rounded-3xl overflow-hidden bg-gray-50 shadow-sm border border-gray-100 group">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[selectedImage]}
              alt={`${productName} - תמונה ${selectedImage + 1}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: 'center center' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Only for products with multiple images */}
        {hasMultipleImages && (
          <>
            {/* Right Arrow (Previous - RTL) */}
            <button
              onClick={prevImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm text-base-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-pink hover:text-white hover:scale-110"
              title="תמונה קודמת"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Left Arrow (Next - RTL) */}
            <button
              onClick={nextImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm text-base-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-pink hover:text-white hover:scale-110"
              title="תמונה הבאה"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === selectedImage
                      ? 'bg-primary-pink w-6'
                      : 'bg-white/70 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Zoom Icon */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ZoomIn size={20} />
        </div>
      </div>

      {/* Thumbnails - Vertical aspect ratio */}
      {hasMultipleImages && (
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 w-16 h-20 rounded-2xl overflow-hidden snap-start transition-all duration-300 border-2 bg-gray-50 ${
                selectedImage === index
                  ? 'border-primary-pink scale-95 shadow-md'
                  : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - תמונה ממוזערת ${index + 1}`}
                fill
                sizes="64px"
                className="object-contain"
                style={{ objectPosition: 'center center' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
