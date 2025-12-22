'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product, categoryNames, Category } from '@/types/product';
import { deleteProduct } from '@/lib/supabase';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.slug.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  async function handleDelete(productId: string) {
    setIsDeleting(true);
    try {
      const success = await deleteProduct(productId);
      if (success) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        setDeleteConfirm(null);
      } else {
        alert('שגיאה במחיקת המוצר');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('שגיאה במחיקת המוצר');
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-turquoise mx-auto mb-4"></div>
          <p className="text-gray-600">טוען מוצרים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ניהול מוצרים</h1>
          <p className="text-gray-600 mt-1">{products.length} מוצרים בסה״כ</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/products/bulk"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <span>✏️</span>
            עריכה מרובה
          </Link>
          <Link
            href="/admin/products/new"
            className="bg-primary-turquoise text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-turquoise/90 transition-colors flex items-center gap-2"
          >
            <span>➕</span>
            הוסף מוצר חדש
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="חיפוש מוצרים..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-turquoise bg-white"
        >
          <option value="all">כל הקטגוריות</option>
          {Object.entries(categoryNames).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>

      {/* Results info */}
      {(searchTerm || selectedCategory !== 'all') && (
        <div className="text-sm text-gray-600">
          נמצאו {filteredProducts.length} מוצרים
          {searchTerm && ` עבור "${searchTerm}"`}
          {selectedCategory !== 'all' && ` בקטגוריה "${categoryNames[selectedCategory]}"`}
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">מוצר</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">קטגוריה</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">מחיר</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">סטטוס</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {product.images[0] && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate max-w-[200px]">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-[200px]">
                          {product.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {categoryNames[product.category]}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">₪{product.price}</div>
                    {product.isOnSale && product.compareAtPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ₪{product.compareAtPrice}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.inStock
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.inStock ? 'במלאי' : 'אזל'}
                      </span>
                      {product.featured && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary-turquoise/10 text-primary-turquoise">
                          מומלץ
                        </span>
                      )}
                      {product.isOnSale && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary-pink/10 text-primary-pink">
                          מבצע
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-primary-turquoise hover:bg-primary-turquoise/10 px-3 py-1 rounded-lg text-sm transition-colors"
                      >
                        עריכה
                      </Link>
                      <Link
                        href={`/product/${product.slug}`}
                        target="_blank"
                        className="text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-lg text-sm transition-colors"
                      >
                        צפה
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg text-sm transition-colors"
                      >
                        מחק
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📦</div>
            <p className="text-gray-600">לא נמצאו מוצרים</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">מחיקת מוצר</h3>
            <p className="text-gray-600 mb-6">
              האם אתה בטוח שברצונך למחוק את המוצר? פעולה זו לא ניתנת לביטול.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ביטול
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'מוחק...' : 'מחק'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

