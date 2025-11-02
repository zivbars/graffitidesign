'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { Category, categoryNames } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { useCart } from '@/stores/cart';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular';

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  // Initialize with category from URL if valid, otherwise 'all'
  const initialCategory = categoryParam && Object.keys(categoryNames).includes(categoryParam) 
    ? (categoryParam as Category) 
    : 'all';
  
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [itemsToShow, setItemsToShow] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  
  // Update selected category when URL parameter changes
  useEffect(() => {
    if (categoryParam && Object.keys(categoryNames).includes(categoryParam)) {
      setSelectedCategory(categoryParam as Category);
      setItemsToShow(12); // Reset items to show when category changes
    }
  }, [categoryParam]);
  
  const addToCart = useCart((state) => state.add);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'newest':
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, sortBy]);

  const displayedProducts = filteredAndSortedProducts.slice(0, itemsToShow);
  const hasMore = displayedProducts.length < filteredAndSortedProducts.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setItemsToShow((prev) => prev + 12);
      setIsLoading(false);
    }, 500);
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
      });
    }
  };

  return (
    <div 
      className="animate-fadeIn min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/Shop.png')" }}
    >
      {/* Overlay for better text readability */}
      <div className="bg-white/85 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-base-black mb-4">
          החנות שלנו
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          גלו את קולקציית המוצרים המלאה שלנו - כל אחד מעוצב בקפידה ומיוצר בישראל
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-base-black mb-2">
              קטגוריה
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value as Category | 'all');
                setItemsToShow(12);
              }}
              className="w-full px-4 py-3 rounded-lg border border-base-gray focus:outline-none focus:ring-2 focus:ring-primary-turquoise bg-white"
            >
              <option value="all">כל הקטגוריות</option>
              {Object.entries(categoryNames).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-base-black mb-2">
              מיון לפי
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-4 py-3 rounded-lg border border-base-gray focus:outline-none focus:ring-2 focus:ring-primary-turquoise bg-white"
            >
              <option value="newest">חדשים ביותר</option>
              <option value="popular">פופולריים</option>
              <option value="price-low">מחיר: מהנמוך לגבוה</option>
              <option value="price-high">מחיר: מהגבוה לנמוך</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          מציג {displayedProducts.length} מתוך {filteredAndSortedProducts.length} מוצרים
        </div>
      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 mb-4">
            לא נמצאו מוצרים בקטגוריה זו
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-primary-pink hover:underline"
          >
            הצג את כל המוצרים
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            ))}
            
            {/* Loading Skeletons */}
            {isLoading &&
              [...Array(4)].map((_, i) => <LoadingSkeleton key={`skeleton-${i}`} />)}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="px-8 py-3 bg-primary-turquoise text-white rounded-lg font-medium hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'טוען...' : 'טען עוד מוצרים'}
              </button>
            </div>
          )}
        </>
      )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white/85 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-turquoise mx-auto mb-4"></div>
          <p className="text-gray-600">טוען...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}

