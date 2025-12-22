'use client';

import { useState, useMemo, useEffect } from 'react';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { useCart } from '@/stores/cart';
import { formatPrice } from '@/lib/formatPrice';
import Button from '@/components/Button';

export default function SalePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'discount' | 'price-low' | 'price-high'>('discount');
  const addToCart = useCart((state) => state.add);

  // Fetch products
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

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
  }, [sortBy, products]);

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
    <div className="min-h-screen bg-base-white">
      {/* Hero Section */}
      <section 
        className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/sale.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-base-black/60 via-base-black/40 to-base-white" />
        <div className="relative container mx-auto px-4 text-center z-10">
          <div className="inline-block bg-primary-pink/90 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-bold font-fredoka mb-6 animate-bounce shadow-lg">
            🔥 Sale מבצעים חמים
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-fredoka text-white mb-6 drop-shadow-lg animate-fadeIn">
            מבצעים מיוחדים
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 font-heebo font-light max-w-2xl mx-auto drop-shadow-md animate-slideIn">
            הזדמנות להתחדש במוצרים האהובים עליכם במחירים שפשוט אסור לפספס!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-20 relative z-20 mb-20">
        {/* Stats Banner */}
        <div className="bg-white rounded-3xl p-8 mb-12 shadow-xl border-t-4 border-primary-pink transform hover:-translate-y-1 transition-transform duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-100">
            <div className="p-4">
              <div className="text-5xl font-bold mb-2 font-fredoka text-primary-pink">{saleProducts.length}</div>
              <div className="text-gray-500 font-heebo text-lg">מוצרים במבצע</div>
            </div>
            <div className="p-4">
              <div className="text-5xl font-bold mb-2 font-fredoka text-primary-turquoise">עד 40%</div>
              <div className="text-gray-500 font-heebo text-lg">הנחה על המגוון</div>
            </div>
            <div className="p-4">
              <div className="text-5xl font-bold mb-2 font-fredoka text-primary-mustard">
                {formatPrice(totalSavings)}
              </div>
              <div className="text-gray-500 font-heebo text-lg">סה&quot;כ חיסכון אפשרי</div>
            </div>
          </div>
        </div>

        {/* Filter */}
        {saleProducts.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 bg-white/50 p-4 rounded-2xl backdrop-blur-sm">
            <div className="text-gray-600 font-medium font-heebo text-lg">
              נמצאו <span className="font-bold text-primary-pink">{saleProducts.length}</span> מציאות שוות
            </div>
            <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
              <label className="font-semibold text-gray-600 font-heebo px-2">מיון לפי:</label>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'discount' | 'price-low' | 'price-high')
                }
                className="bg-transparent font-heebo text-gray-800 focus:outline-none cursor-pointer pl-2 pr-8 py-1"
              >
                <option value="discount">הנחה הגבוהה ביותר</option>
                <option value="price-low">מחיר: מהנמוך לגבוה</option>
                <option value="price-high">מחיר: מהגבוה לנמוך</option>
              </select>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <LoadingSkeleton key={`skeleton-${i}`} />)}
          </div>
        ) : saleProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="text-8xl mb-6 animate-pulse">🛍️</div>
            <h2 className="text-3xl font-bold text-base-black mb-4 font-fredoka">
              אין מבצעים כרגע
            </h2>
            <p className="text-gray-500 mb-8 font-heebo text-lg max-w-md mx-auto">
              אבל אל דאגה! אנחנו מעדכנים מבצעים חדשים כל הזמן. שווה לעקוב!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {saleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            ))}
          </div>
        )}

        {/* Newsletter CTA - Integrated Design */}
        <div className="mt-24 relative overflow-hidden rounded-3xl bg-primary-turquoise/10 p-10 md:p-16 text-center">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -mr-20 -mt-20" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-pink/10 rounded-full blur-3xl -ml-20 -mb-20" />
           
           <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-base-black mb-6 font-fredoka">
              רוצים לדעת ראשונים על המבצע הבא?
            </h2>
            <p className="text-gray-600 text-lg mb-8 font-heebo max-w-2xl mx-auto">
              הירשמו לניוזלטר שלנו וקבלו עדכונים חמים ישירות למייל. מבטיחים לא להספים!
            </p>
            <Button 
              onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
              variant="primary"
              size="lg"
              className="shadow-lg shadow-primary-pink/20 hover:-translate-y-1 transition-transform"
            >
              הרשמה לניוזלטר
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
