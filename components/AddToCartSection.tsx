'use client';

import { useState } from 'react';
import { useCart } from '@/stores/cart';
import { formatPrice } from '@/lib/formatPrice';
import { Product } from '@/types/product';
import { ShoppingCart, Minus, Plus, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      {/* Desktop Actions */}
      <div className="mt-4">
        {product.inStock && (
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            {/* Quantity Selector */}
            <div className="flex items-center bg-white border border-gray-200 rounded-xl px-1 h-14 w-full sm:w-auto justify-between sm:justify-start min-w-[140px]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary-pink transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={18} />
              </button>
              <span className="font-bold text-xl text-base-black w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary-pink transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 h-14 bg-primary-pink text-white rounded-xl font-bold text-lg shadow-md hover:bg-primary-pink/90 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 px-8 whitespace-nowrap"
            >
              {product.inStock ? (
                <>
                  <ShoppingCart size={20} /> הוספה לעגלה
                </>
              ) : (
                'אזל מהמלאי'
              )}
            </button>
          </div>
        )}

        <AnimatePresence>
          {showAddedMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-green-50 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-bold"
            >
              <CheckCircle size={18} className="text-green-600" />
              המוצר נוסף לעגלה בהצלחה!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Mobile Add to Cart */}
      {product.inStock && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 p-4 shadow-2xl z-50 pb-safe">
          <div className="flex items-center gap-3 max-w-md mx-auto">
             <div className="flex flex-col">
               <span className="text-xs text-gray-500 font-medium">סה"כ</span>
               <span className="text-lg font-black text-base-black">{formatPrice(product.price * quantity)}</span>
             </div>
            <button 
              onClick={handleAddToCart} 
              className="flex-1 bg-primary-pink text-white py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} /> הוספה
            </button>
          </div>
        </div>
      )}
    </>
  );
}

