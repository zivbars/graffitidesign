'use client';

import { useState } from 'react';
import { useCart } from '@/stores/cart';
import Button from './Button';
import { formatPrice } from '@/lib/formatPrice';
import { Product } from '@/types/product';

interface AddToCartSectionProps {
  product: Product;
}

export default function AddToCartSection({ product }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const addToCart = useCart((state) => state.add);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
    });

    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
  };

  return (
    <>
      {/* Quantity Selector */}
      {product.inStock && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-base-black mb-2">
            כמות
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-lg border-2 border-base-gray hover:border-primary-pink flex items-center justify-center font-bold"
            >
              -
            </button>
            <span className="w-16 text-center font-semibold text-lg">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-lg border-2 border-base-gray hover:border-primary-pink flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <div className="mb-8">
        <Button
          onClick={handleAddToCart}
          size="lg"
          disabled={!product.inStock}
          className="w-full md:w-auto md:px-16"
        >
          {product.inStock ? 'הוסף לעגלה' : 'אזל מהמלאי'}
        </Button>

        {showAddedMessage && (
          <div className="mt-4 bg-primary-turquoise/10 border border-primary-turquoise text-primary-turquoise px-4 py-3 rounded-lg">
            ✓ המוצר נוסף לעגלה בהצלחה!
          </div>
        )}
      </div>

      {/* Sticky Mobile Add to Cart */}
      {product.inStock && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-base-gray p-4 shadow-lg z-40">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="text-xl font-bold text-base-black">
                {formatPrice(product.price)}
              </div>
            </div>
            <Button onClick={handleAddToCart} size="md" className="flex-1">
              הוסף לעגלה
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

