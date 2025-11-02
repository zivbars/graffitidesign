'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 0) {
        const filtered = products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.description.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5);
        setResults(filtered);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        const product = results[selectedIndex];
        window.location.href = `/product/${product.slug}`;
      }
    },
    [results, selectedIndex]
  );

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          placeholder="חיפוש מוצרים..."
          className="w-full px-4 py-2 pr-10 pl-10 rounded-full border-2 border-base-gray focus:border-primary-turquoise focus:outline-none bg-white transition-all"
          aria-label="חיפוש מוצרים"
          aria-expanded={isOpen}
          aria-controls="search-results"
        />
        
        {/* Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="נקה חיפוש"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          className="search-dropdown absolute top-full mt-2 w-full min-w-[400px] lg:min-w-[500px] bg-white rounded-2xl border-2 border-base-gray z-50 max-h-96 overflow-y-auto shadow-xl"
          role="listbox"
        >
          {results.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              onClick={() => setIsOpen(false)}
              className={`search-result-item flex items-center gap-4 p-4 hover:bg-base-white/50 transition-colors ${
                index === selectedIndex ? 'bg-base-white/50' : ''
              } ${index === 0 ? 'rounded-t-2xl' : ''} ${
                index === results.length - 1 ? 'rounded-b-2xl' : 'border-b border-base-gray'
              }`}
              role="option"
              aria-selected={index === selectedIndex}
            >
              {/* Product Image */}
              <div className="w-20 h-20 bg-base-gray/20 rounded-lg flex-shrink-0">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-base-black line-clamp-2">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-left font-bold text-primary-pink whitespace-nowrap flex-shrink-0">
                {formatPrice(product.price)}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && query && results.length === 0 && (
        <div className="search-dropdown absolute top-full mt-2 w-full bg-white rounded-2xl border-2 border-base-gray z-50 p-6 text-center">
          <p className="text-gray-600">לא נמצאו תוצאות עבור &quot;{query}&quot;</p>
          <Link
            href="/shop"
            className="text-primary-pink hover:underline text-sm mt-2 inline-block"
            onClick={() => setIsOpen(false)}
          >
            עבור לעמוד החנות
          </Link>
        </div>
      )}
    </div>
  );
}

