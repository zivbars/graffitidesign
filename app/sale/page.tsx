'use client';

import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/stores/cart';
import { formatPrice } from '@/lib/formatPrice';

export default function SalePage() {
  const [sortBy, setSortBy] = useState<'discount' | 'price-low' | 'price-high'>('discount');
  const addToCart = useCart((state) => state.add);

  const saleProducts = useMemo(() => {
    const filtered = products.filter((p) => p.isOnSale);

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          const discountA =
            a.compareAtPrice && a.isOnSale
              ? ((a.compareAtPrice - a.price) / a.compareAtPrice) * 100
              : 0;
          const discountB =
            b.compareAtPrice && b.isOnSale
              ? ((b.compareAtPrice - b.price) / b.compareAtPrice) * 100
              : 0;
          return discountB - discountA;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [sortBy]);

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

  const totalSavings = saleProducts.reduce((sum, p) => {
    if (p.compareAtPrice) {
      return sum + (p.compareAtPrice - p.price);
    }
    return sum;
  }, 0);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/sale.png')" }}
    >
      {/* Overlay for better text readability */}
      <div className="bg-white/85 min-h-screen">
        <div className="container mx-auto px-4 py-12 animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-12">
        <div className="inline-block bg-primary-pink text-white px-6 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
          מבצעים חמים 🔥
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-base-black mb-4">
          מבצעים מיוחדים
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          חסכו עד 40% על מוצרים נבחרים! מלאי מוגבל, אל תפספסו
        </p>
      </div>

      {/* Stats Banner */}
      <div className="bg-gradient-to-br from-primary-pink to-primary-turquoise rounded-2xl p-8 mb-8 text-white text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl font-bold mb-2">{saleProducts.length}</div>
            <div className="text-white/90">מוצרים במבצע</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">עד 40%</div>
            <div className="text-white/90">הנחה</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">
              {formatPrice(totalSavings)}
            </div>
            <div className="text-white/90">סה&quot;כ חיסכון אפשרי</div>
          </div>
        </div>
      </div>

      {/* Filter */}
      {saleProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-700 font-medium">
              {saleProducts.length} מוצרים במבצע
            </div>
            <div className="flex items-center gap-3">
              <label className="font-semibold text-gray-700">מיון לפי:</label>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'discount' | 'price-low' | 'price-high')
                }
                className="px-4 py-2 rounded-lg border border-base-gray focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
              >
                <option value="discount">הנחה הגבוהה ביותר</option>
                <option value="price-low">מחיר: מהנמוך לגבוה</option>
                <option value="price-high">מחיר: מהגבוה לנמוך</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {saleProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-base-black mb-4">
            אין מבצעים כרגע
          </h2>
          <p className="text-gray-600 mb-8">
            הירשמו לניוזלטר שלנו כדי לקבל עדכונים על מבצעים עתידיים
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product.id)}
            />
          ))}
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="mt-16 bg-white/80 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-base-black mb-4">
          אל תפספסו מבצעים עתידיים!
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          הירשמו לניוזלטר שלנו וקבלו הודעה ראשונים על מבצעים חדשים
        </p>
        <a
          href="/#newsletter"
          className="inline-block bg-primary-pink text-white px-8 py-3 rounded-lg font-medium hover:scale-105 transition-transform"
        >
          הרשמה לניוזלטר
        </a>
      </div>
        </div>
      </div>
    </div>
  );
}

