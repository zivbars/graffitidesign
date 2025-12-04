'use client';

import { Suspense } from 'react';
import ShopClient from '@/components/ShopClient';

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
      <ShopClient />
    </Suspense>
  );
}

