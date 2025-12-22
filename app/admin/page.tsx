'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product, categoryNames, Category } from '@/types/product';

interface Stats {
  totalProducts: number;
  inStock: number;
  outOfStock: number;
  onSale: number;
  featured: number;
  byCategory: Record<string, number>;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);

        // Calculate stats
        const byCategory: Record<string, number> = {};
        data.forEach((p: Product) => {
          byCategory[p.category] = (byCategory[p.category] || 0) + 1;
        });

        setStats({
          totalProducts: data.length,
          inStock: data.filter((p: Product) => p.inStock).length,
          outOfStock: data.filter((p: Product) => !p.inStock).length,
          onSale: data.filter((p: Product) => p.isOnSale).length,
          featured: data.filter((p: Product) => p.featured).length,
          byCategory,
        });
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-turquoise mx-auto mb-4"></div>
          <p className="text-gray-600">טוען נתונים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">דשבורד</h1>
          <p className="text-gray-600 mt-1">סקירה כללית של המוצרים באתר</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-primary-turquoise text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-turquoise/90 transition-colors flex items-center gap-2"
        >
          <span>➕</span>
          הוסף מוצר חדש
        </Link>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-gray-900">{stats.totalProducts}</div>
            <div className="text-gray-600 text-sm mt-1">סה״כ מוצרים</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600">{stats.inStock}</div>
            <div className="text-gray-600 text-sm mt-1">במלאי</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-red-600">{stats.outOfStock}</div>
            <div className="text-gray-600 text-sm mt-1">אזל מהמלאי</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-primary-pink">{stats.onSale}</div>
            <div className="text-gray-600 text-sm mt-1">במבצע</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-primary-turquoise">{stats.featured}</div>
            <div className="text-gray-600 text-sm mt-1">מוצרים מומלצים</div>
          </div>
        </div>
      )}

      {/* Categories Breakdown */}
      {stats && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">מוצרים לפי קטגוריה</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.byCategory).map(([category, count]) => (
              <div key={category} className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-gray-600 text-sm">{categoryNames[category as Category]}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Products */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">מוצרים אחרונים</h2>
          <Link href="/admin/products" className="text-primary-turquoise hover:underline text-sm">
            צפה בכל המוצרים ←
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {products.slice(0, 5).map((product) => (
            <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {product.images[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                <p className="text-sm text-gray-600">{categoryNames[product.category]}</p>
              </div>
              <div className="text-left flex-shrink-0">
                <div className="font-bold text-gray-900">₪{product.price}</div>
                <div className={`text-xs ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'במלאי' : 'אזל'}
                </div>
              </div>
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="text-primary-turquoise hover:bg-primary-turquoise/10 px-3 py-1 rounded-lg text-sm"
              >
                עריכה
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/products"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary-turquoise transition-colors group"
        >
          <div className="text-3xl mb-3">📦</div>
          <h3 className="font-bold text-gray-900 group-hover:text-primary-turquoise">ניהול מוצרים</h3>
          <p className="text-gray-600 text-sm mt-1">צפה, ערוך ומחק מוצרים</p>
        </Link>
        <Link
          href="/admin/products/new"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary-turquoise transition-colors group"
        >
          <div className="text-3xl mb-3">➕</div>
          <h3 className="font-bold text-gray-900 group-hover:text-primary-turquoise">הוסף מוצר</h3>
          <p className="text-gray-600 text-sm mt-1">צור מוצר חדש בחנות</p>
        </Link>
        <Link
          href="/shop"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary-turquoise transition-colors group"
        >
          <div className="text-3xl mb-3">👁️</div>
          <h3 className="font-bold text-gray-900 group-hover:text-primary-turquoise">צפה בחנות</h3>
          <p className="text-gray-600 text-sm mt-1">ראה איך האתר נראה למבקרים</p>
        </Link>
      </div>
    </div>
  );
}

