'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image - Full display without cropping */}
      <div className="relative w-full rounded-lg overflow-hidden bg-white border border-base-gray/20" style={{ minHeight: '400px', maxHeight: '600px', height: '500px' }}>
        <Image
          src={images[selectedImage]}
          alt={`${productName} - תמונה ${selectedImage + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden snap-start transition-all bg-white border ${
                selectedImage === index
                  ? 'ring-4 ring-primary-pink border-primary-pink'
                  : 'border-base-gray/20 opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - תמונה ממוזערת ${index + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

