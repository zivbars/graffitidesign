'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import ProductForm from '@/components/admin/ProductForm';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const id = params.id as string;
        const response = await fetch(`/api/products/${id}`);
        
        if (!response.ok) {
          setError('המוצר לא נמצא');
          return;
        }
        
        const productData = await response.json();
        setProduct(productData);
      } catch (err) {
        setError('שגיאה בטעינת המוצר');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProduct();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-turquoise mx-auto mb-4"></div>
          <p className="text-gray-600">טוען מוצר...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || 'המוצר לא נמצא'}</h2>
        <button
          onClick={() => router.push('/admin/products')}
          className="text-primary-turquoise hover:underline"
        >
          חזרה לרשימת המוצרים
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">עריכת מוצר</h1>
        <p className="text-gray-600 mt-1">{product.name}</p>
      </div>

      <ProductForm product={product} isEditing />
    </div>
  );
}

