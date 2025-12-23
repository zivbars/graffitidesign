'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, categoryNames } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';
import { ShoppingCart, Eye, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  priority?: boolean;
}

export default function ProductCard({ product, onAddToCart, priority = false }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = product.images.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 overflow-hidden hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative block aspect-square overflow-hidden bg-gray-50">
        <Link href={`/product/${product.slug}`} className="absolute inset-0 cursor-pointer z-0">
          {product.featured && (
            <span className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-pink shadow-sm flex items-center gap-1">
              <Sparkles size={12} />
              מומלץ
            </span>
          )}
          {!product.inStock && (
            <span className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
              <span className="bg-base-black text-white px-4 py-2 rounded-full text-sm font-bold transform -rotate-6 shadow-lg">
                אזל מהמלאי
              </span>
            </span>
          )}
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ objectPosition: 'center center' }}
          />
        </Link>

        {/* Navigation Arrows - Only for products with multiple images */}
        {hasMultipleImages && (
          <>
            {/* Right Arrow (Previous - RTL) */}
            <button
              onClick={prevImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm text-base-black p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-pink hover:text-white hover:scale-110"
              title="תמונה קודמת"
            >
              <ChevronRight size={18} />
            </button>
            
            {/* Left Arrow (Next - RTL) */}
            <button
              onClick={nextImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm text-base-black p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-pink hover:text-white hover:scale-110"
              title="תמונה הבאה"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-primary-pink w-4'
                      : 'bg-white/70 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Hover Overlay Actions (Desktop) */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex items-center justify-center gap-3 z-20 pointer-events-none">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (product.inStock && onAddToCart) onAddToCart();
            }}
            disabled={!product.inStock}
            className="pointer-events-auto bg-white text-base-black p-3 rounded-full shadow-lg hover:bg-primary-turquoise hover:text-white transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-base-black"
            title="הוסף לעגלה"
          >
            <ShoppingCart size={20} />
          </button>
          <Link 
            href={`/product/${product.slug}`}
            className="pointer-events-auto bg-white text-base-black p-3 rounded-full shadow-lg hover:bg-primary-pink hover:text-white transition-all duration-200 transform hover:scale-110 cursor-pointer"
            title="צפה בפרטים"
          >
            <Eye size={20} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
           <Link href={`/product/${product.slug}`} className="block group-hover:text-primary-pink transition-colors">
             <h3 className="font-bold text-lg leading-tight text-base-black mb-1 line-clamp-1">
              {product.name}
            </h3>
           </Link>
           <p className="text-xs text-gray-500 font-medium line-clamp-1">
             {categoryNames[product.category]}
           </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          <span className="text-xl font-black text-base-black group-hover:text-primary-turquoise transition-colors">
            {formatPrice(product.price)}
          </span>
          
          {/* Mobile Action Button (Always visible on mobile, hidden on hover-capable devices) */}
          <div className="lg:hidden">
             <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (product.inStock && onAddToCart) onAddToCart();
              }}
              disabled={!product.inStock}
              className="bg-base-black text-white p-2.5 rounded-xl shadow-md active:scale-95 transition-transform disabled:opacity-50"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
