'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, Category, categoryNames } from '@/types/product';
import { createProduct, updateProduct } from '@/lib/supabase';
import ImageUploader from './ImageUploader';

interface ProductFormProps {
  product?: Product;
  isEditing?: boolean;
}

export default function ProductForm({ product, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    description: product?.description || '',
    price: product?.price || 0,
    compareAtPrice: product?.compareAtPrice || undefined,
    isOnSale: product?.isOnSale || false,
    category: product?.category || ('cards' as Category),
    images: product?.images || [],
    inStock: product?.inStock ?? true,
    featured: product?.featured || false,
    materials: product?.materials || '',
    size: product?.size || '',
  });

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      // Only auto-generate slug if it's a new product or slug is empty
      slug: !isEditing || !prev.slug ? generateSlug(name) : prev.slug,
    }));
  };

  const handleImagesChange = (images: string[]) => {
    setFormData((prev) => ({ ...prev, images }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name || !formData.slug || !formData.category) {
        throw new Error('נא למלא את כל השדות הנדרשים');
      }

      if (formData.price <= 0) {
        throw new Error('המחיר חייב להיות גדול מ-0');
      }

      const productData = {
        ...formData,
        compareAtPrice: formData.isOnSale ? formData.compareAtPrice : undefined,
      };

      let result;
      if (isEditing && product?.id) {
        result = await updateProduct(product.id, productData);
      } else {
        result = await createProduct(productData);
      }

      if (!result) {
        throw new Error('שגיאה בשמירת המוצר');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה לא צפויה');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">פרטים בסיסיים</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              שם המוצר *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
              placeholder="לדוגמה: כרטיס ברכה יום הולדת"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (כתובת URL) *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-turquoise font-mono text-sm"
              placeholder="birthday-card"
              dir="ltr"
            />
            <p className="text-xs text-gray-500 mt-1">
              הכתובת תהיה: /product/{formData.slug || 'slug'}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              תיאור
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-turquoise resize-none"
              placeholder="תיאור המוצר..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              קטגוריה *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as Category }))}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-turquoise bg-white"
            >
              {Object.entries(categoryNames).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">מחירים</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              מחיר (₪) *
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <input
                type="checkbox"
                checked={formData.isOnSale}
                onChange={(e) => setFormData((prev) => ({ ...prev, isOnSale: e.target.checked }))}
                className="rounded border-gray-300 text-primary-turquoise focus:ring-primary-turquoise"
              />
              במבצע
            </label>
            {formData.isOnSale && (
              <input
                type="number"
                value={formData.compareAtPrice || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, compareAtPrice: parseFloat(e.target.value) || undefined }))}
                min="0"
                step="0.01"
                placeholder="מחיר מקורי"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
              />
            )}
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">תמונות</h2>
        <ImageUploader
          images={formData.images}
          onChange={handleImagesChange}
          productSlug={formData.slug}
        />
      </div>

      {/* Additional Details */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">פרטים נוספים</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              חומרים
            </label>
            <input
              type="text"
              value={formData.materials}
              onChange={(e) => setFormData((prev) => ({ ...prev, materials: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
              placeholder="לדוגמה: קרטון 300 גרם"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              גודל
            </label>
            <input
              type="text"
              value={formData.size}
              onChange={(e) => setFormData((prev) => ({ ...prev, size: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
              placeholder='לדוגמה: 15 x 20 ס"מ'
            />
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">סטטוס</h2>
        
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.inStock}
              onChange={(e) => setFormData((prev) => ({ ...prev, inStock: e.target.checked }))}
              className="rounded border-gray-300 text-primary-turquoise focus:ring-primary-turquoise w-5 h-5"
            />
            <span className="text-gray-700">במלאי</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
              className="rounded border-gray-300 text-primary-turquoise focus:ring-primary-turquoise w-5 h-5"
            />
            <span className="text-gray-700">מוצר מומלץ (יופיע בדף הבית)</span>
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          ביטול
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-primary-turquoise text-white rounded-lg font-medium hover:bg-primary-turquoise/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'שומר...' : isEditing ? 'עדכן מוצר' : 'צור מוצר'}
        </button>
      </div>
    </form>
  );
}

