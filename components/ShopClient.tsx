'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { Category, categoryNames } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { useCart } from '@/stores/cart';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, X, Sparkles, Palette } from 'lucide-react';
import { cn } from '@/lib/cn';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular';

const sortOptions: Record<SortOption, string> = {
  newest: 'חדשים ביותר',
  popular: 'הכי פופולריים',
  'price-low': 'מחיר: מהנמוך לגבוה',
  'price-high': 'מחיר: מהגבוה לנמוך',
};

export default function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category');
  
  const initialCategory = categoryParam && Object.keys(categoryNames).includes(categoryParam) 
    ? (categoryParam as Category) 
    : 'all';
  
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [itemsToShow, setItemsToShow] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  
  const addToCart = useCart((state) => state.add);

  // Update selected category when URL parameter changes
  useEffect(() => {
    if (categoryParam && Object.keys(categoryNames).includes(categoryParam)) {
      setSelectedCategory(categoryParam as Category);
    } else if (!categoryParam) {
        setSelectedCategory('all');
    }
    setItemsToShow(12);
  }, [categoryParam]);

  // Update URL when category changes (internal state change)
  const handleCategoryChange = (category: Category | 'all') => {
    setSelectedCategory(category);
    if (category === 'all') {
      router.push('/shop', { scroll: false });
    } else {
      router.push(`/shop?category=${category}`, { scroll: false });
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'popular': return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'newest': default: return 0; // Assuming default order is roughly newest or by ID
      }
    });
  }, [selectedCategory, sortBy]);

  const displayedProducts = filteredAndSortedProducts.slice(0, itemsToShow);
  const hasMore = displayedProducts.length < filteredAndSortedProducts.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setItemsToShow((prev) => prev + 12);
      setIsLoading(false);
    }, 600);
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
      className="animate-fadeIn min-h-screen bg-cover bg-center bg-no-repeat bg-fixed font-fredoka"
      style={{ backgroundImage: "url('/Shop.png')" }}
    >
      {/* Modern Glass Overlay */}
      <div className="bg-white/70 backdrop-blur-md min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto mb-16 relative"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              className="absolute -top-12 right-0 lg:right-20 text-primary-turquoise opacity-40 hidden md:block"
            >
              <Palette size={50} strokeWidth={1.5} />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 left-0 lg:left-20 text-primary-pink opacity-40 hidden md:block"
            >
              <Sparkles size={40} strokeWidth={1.5} />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-base-black mb-6 tracking-tight">
              <span className="relative inline-block">
                החנות שלנו
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary-pink/30 -rotate-1 rounded-full -z-10"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              עיצובים מקוריים שמכניסים <span className="text-primary-turquoise font-bold">צבע</span> ו<span className="text-primary-pink font-bold">שמחה</span> לכל רגע בחיים.
            </p>
          </motion.div>

          {/* Filters & Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="sticky top-4 z-30 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-4 mb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Filter Groups */}
              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4 flex-1">
                {/* Category Filter */}
                <div className="relative flex-1 min-w-[200px]">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                    <span className="text-sm font-bold">קטגוריה:</span>
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value as Category | 'all')}
                    className="w-full appearance-none bg-white/50 border border-gray-200 text-base-black py-3 pr-20 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-turquoise/50 focus:border-primary-turquoise transition-all cursor-pointer font-medium hover:bg-white"
                  >
                    <option value="all">הכל מהכל</option>
                    {Object.entries(categoryNames).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>

                {/* Sort Filter */}
                <div className="relative flex-1 min-w-[200px]">
                   <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                    <SlidersHorizontal size={16} className="ml-2" />
                    <span className="text-sm font-bold">מיון:</span>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full appearance-none bg-white/50 border border-gray-200 text-base-black py-3 pr-24 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-turquoise/50 focus:border-primary-turquoise transition-all cursor-pointer font-medium hover:bg-white"
                  >
                    {Object.entries(sortOptions).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              {/* Results Count & Clear */}
              <div className="flex items-center gap-4 text-sm font-medium text-gray-600 bg-gray-50/50 px-4 py-2 rounded-lg whitespace-nowrap">
                <span>{displayedProducts.length} מוצרים</span>
                {selectedCategory !== 'all' && (
                  <>
                    <span className="w-px h-4 bg-gray-300"></span>
                    <button 
                      onClick={() => handleCategoryChange('all')}
                      className="text-primary-pink hover:text-primary-pink/80 flex items-center gap-1 transition-colors"
                    >
                      <X size={14} />
                      נקה סינון
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          {filteredAndSortedProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60 shadow-sm max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="text-gray-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">לא מצאנו מוצרים בקטגוריה זו</h3>
              <p className="text-gray-600 mb-8">נסו לבחור קטגוריה אחרת או לנקות את הסינון</p>
              <button
                onClick={() => handleCategoryChange('all')}
                className="px-8 py-3 bg-base-black text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                הצג את כל המוצרים
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {displayedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      layout
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={() => handleAddToCart(product.id)}
                        priority={index < 8}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Loading Skeletons */}
                {isLoading && [...Array(4)].map((_, i) => (
                  <motion.div
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <LoadingSkeleton />
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-16">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="group relative px-8 py-4 bg-white text-base-black rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-primary-pink transition-colors">
                      {isLoading ? (
                        <>
                          <span className="animate-spin">↻</span> טוען...
                        </>
                      ) : (
                        <>
                          טען עוד מוצרים <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                        </>
                      )}
                    </span>
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
