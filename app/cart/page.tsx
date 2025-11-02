'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/stores/cart';
import { formatPrice } from '@/lib/formatPrice';
import Button from '@/components/Button';

type ShippingOption = 'standard' | 'express' | 'pickup';

export default function CartPage() {
  const items = useCart((state) => state.items);
  const remove = useCart((state) => state.remove);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const getTotalPrice = useCart((state) => state.getTotalPrice);
  const hydrate = useCart((state) => state.hydrate);
  const isHydrated = useCart((state) => state.isHydrated);

  const [shippingOption, setShippingOption] = useState<ShippingOption>('standard');

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const shippingCosts = {
    standard: 25,
    express: 40,
    pickup: 0,
  };

  const shippingLabels = {
    standard: 'משלוח רגיל (3-5 ימים)',
    express: 'משלוח מהיר (1-2 ימים)',
    pickup: 'איסוף עצמי',
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 200 ? 0 : shippingCosts[shippingOption];
  const total = subtotal + shipping;

  const handleCheckout = () => {
    alert('תשלום יתאפשר בקרוב! אנחנו עובדים על אינטגרציה עם מערכת התשלום.');
  };

  if (!isHydrated) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/checkout.png')" }}
      >
        <div className="bg-white/85 min-h-screen">
          <div className="container mx-auto px-4 py-16 text-center">
            <p className="text-gray-600">טוען...</p>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/checkout.png')" }}
      >
        <div className="bg-white/85 min-h-screen">
          <div className="container mx-auto px-4 py-16 animate-fadeIn">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-32 w-32 mx-auto text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-base-black mb-4">
            העגלה שלך ריקה
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            המוצרים שלך ממתינים לך בחנות! הוסף פריטים לעגלה והמשך לקנייה
          </p>
          <Link href="/shop">
            <Button size="lg">התחל לקנות</Button>
          </Link>
        </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/checkout.png')" }}
    >
      {/* Overlay for better text readability */}
      <div className="bg-white/85 min-h-screen">
        <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <h1 className="text-4xl font-bold text-base-black mb-8">עגלת הקניות</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl p-6 flex gap-4 transition-all duration-300"
            >
              {/* Image */}
              <Link
                href={`/product/${item.slug}`}
                className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-base-gray/10"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </Link>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="font-semibold text-base-black hover:text-primary-pink transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-primary-pink font-bold mt-1">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded border border-base-gray hover:border-primary-pink hover:bg-primary-pink hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90"
                      aria-label="הפחת כמות"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded border border-base-gray hover:border-primary-pink hover:bg-primary-pink hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90"
                      aria-label="הוסף כמות"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => remove(item.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    הסר
                  </button>
                </div>
              </div>

              {/* Item Total */}
              <div className="text-left">
                <p className="font-bold text-lg">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <div className="pt-4">
            <Link href="/shop">
              <Button variant="outline" size="md">
                ← המשך קניות
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-base-black mb-6">
              סיכום הזמנה
            </h2>

            {/* Subtotal */}
            <div className="flex justify-between mb-4 text-gray-700">
              <span>סכום ביניים</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>

            {/* Shipping Options */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-base-black mb-2">
                אפשרויות משלוח
              </label>
              <select
                value={shippingOption}
                onChange={(e) =>
                  setShippingOption(e.target.value as ShippingOption)
                }
                className="w-full px-4 py-2 rounded-lg border border-base-gray focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
              >
                {Object.entries(shippingLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label} - {shippingCosts[key as ShippingOption] === 0 ? 'חינם' : formatPrice(shippingCosts[key as ShippingOption])}
                  </option>
                ))}
              </select>
            </div>

            {/* Shipping Cost */}
            <div className="flex justify-between mb-4 text-gray-700">
              <span>משלוח</span>
              <span className="font-semibold">
                {shipping === 0 ? 'חינם' : formatPrice(shipping)}
              </span>
            </div>

            {/* Free Shipping Message */}
            {subtotal < 200 && subtotal > 0 && (
              <div className="mb-4 text-sm text-primary-turquoise bg-primary-turquoise/10 p-3 rounded-lg">
                הוסף עוד {formatPrice(200 - subtotal)} לקבלת משלוח חינם!
              </div>
            )}

            {/* Total */}
            <div className="border-t border-base-gray pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold text-base-black">
                <span>סה&quot;כ לתשלום</span>
                <span className="text-primary-pink">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button 
              onClick={handleCheckout} 
              size="lg" 
              className="w-full bg-gradient-to-r from-primary-pink to-primary-turquoise hover:from-primary-turquoise hover:to-primary-pink transition-all duration-500"
            >
              המשך לתשלום
            </Button>

            {/* Security */}
            <div className="mt-4 text-center text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary-turquoise"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>תשלום מאובטח</span>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}

