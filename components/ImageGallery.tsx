'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4 select-none sticky top-24">
      {/* Main Image - Vertical aspect ratio for product images */}
      <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-gray-50 shadow-sm border border-gray-100 group">
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
        
        {/* Zoom Icon */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ZoomIn size={20} />
        </div>
      </div>

      {/* Thumbnails - Vertical aspect ratio */}
      {images.length > 1 && (
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

