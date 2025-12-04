'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/stores/cart';
import { formatPrice } from '@/lib/formatPrice';
import Button from '@/components/Button';

type ShippingOption = 'standard' | 'pickup';

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
    pickup: 0,
  };

  const shippingLabels = {
    standard: 'משלוח רגיל (3-5 ימים)',
    pickup: 'איסוף עצמי',
  };

  const subtotal = getTotalPrice();
  // Free shipping logic: if subtotal >= 200, shipping is free
  const isFreeShipping = subtotal >= 200;
  const shipping = isFreeShipping ? 0 : shippingCosts[shippingOption];
  const total = subtotal + shipping;

  const handleCheckout = () => {
    alert('תשלום יתאפשר בקרוב! אנחנו עובדים על אינטגרציה עם מערכת התשלום.');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-primary-pink/20 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md animate-fadeIn">
          <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-primary-pink/20 rounded-full blur-xl transform scale-110"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-32 w-32 text-primary-pink relative z-10 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-black font-fredoka text-base-black mb-4">
            העגלה שלך ריקה
          </h1>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            נראה שעדיין לא בחרתם מוצרים. <br />
            המוצרים המעוצבים שלנו מחכים לכם בחנות!
          </p>
          <Link href="/shop">
            <Button size="lg" className="shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              התחל לקנות
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center gap-4">
            <Link href="/shop" className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl md:text-3xl font-black font-fredoka text-base-black">
              עגלת הקניות
              <span className="text-lg font-normal text-gray-500 mr-3 font-heebo">
                ({items.length} פריטים)
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Cart Items List */}
          <div className="flex-1 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-4 md:p-6 flex gap-4 md:gap-8 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100/50 group"
              >
                {/* Image */}
                <Link
                  href={`/product/${item.slug}`}
                  className="relative w-24 h-24 md:w-40 md:h-40 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 96px, 160px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <Link href={`/product/${item.slug}`}>
                        <h3 className="text-lg md:text-xl font-bold font-fredoka text-base-black hover:text-primary-pink transition-colors mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-primary-pink font-bold font-fredoka text-lg">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full -mt-2 -ml-2"
                      aria-label="הסר פריט"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-200">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-white shadow-sm hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all active:scale-95 text-gray-600 disabled:opacity-50"
                        aria-label="הפחת כמות"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value > 0) updateQuantity(item.id, value);
                        }}
                        onBlur={(e) => {
                          const value = parseInt(e.target.value);
                          if (isNaN(value) || value < 1) updateQuantity(item.id, 1);
                        }}
                        className="w-10 text-center font-bold bg-transparent focus:outline-none text-base-black text-sm md:text-base"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white shadow-sm hover:bg-primary-turquoise hover:text-white flex items-center justify-center transition-all active:scale-95 text-gray-600"
                        aria-label="הוסף כמות"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal for item */}
                    <div className="hidden md:block text-left">
                      <span className="text-xs text-gray-500 block mb-0.5">סה&quot;כ</span>
                      <p className="font-black font-fredoka text-xl text-base-black">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Link href="/shop" className="inline-flex items-center text-gray-600 hover:text-primary-pink font-bold transition-colors group text-lg">
                <span className="group-hover:-translate-x-1 transition-transform">→</span>
                <span className="mr-2">המשך לקנות מוצרים נוספים</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 sticky top-28 border border-gray-100">
              <h2 className="text-2xl font-black font-fredoka text-base-black mb-6">
                סיכום הזמנה
              </h2>

              {/* Progress Bars */}
              <div className="space-y-4 mb-8">
                {/* Minimum Order */}
                <div className={`rounded-xl p-4 transition-colors ${subtotal >= 125 ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-100'}`}>
                  <div className="flex justify-between text-sm mb-2 font-bold">
                    <span className={subtotal >= 125 ? 'text-green-700' : 'text-gray-600'}>
                      {subtotal >= 125 ? '✓ מינימום הזמנה הושג' : 'מינימום הזמנה (125 ₪)'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${subtotal >= 125 ? 'bg-green-500' : 'bg-gray-400'}`}
                      style={{ width: `${Math.min(100, (subtotal / 125) * 100)}%` }}
                    />
                  </div>
                  {subtotal < 125 && (
                    <p className="text-xs text-red-500 mt-2 font-medium animate-pulse">
                      חסר עוד {formatPrice(125 - subtotal)} להשלמת ההזמנה
                    </p>
                  )}
                </div>

                {/* Free Shipping */}
                <div className={`rounded-xl p-4 border transition-colors ${isFreeShipping ? 'bg-primary-turquoise/10 border-primary-turquoise/20' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="flex justify-between text-sm mb-2 font-bold">
                    <span className={isFreeShipping ? 'text-primary-turquoise' : 'text-gray-600'}>
                      {isFreeShipping ? '✓ זכאי למשלוח חינם!' : 'משלוח חינם (מעל 200 ₪)'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-primary-turquoise transition-all duration-1000"
                      style={{ width: `${Math.min(100, (subtotal / 200) * 100)}%` }}
                    />
                  </div>
                  {!isFreeShipping && (
                    <p className="text-xs text-gray-500 mt-2">
                      הוסיפו מוצרים ב-{formatPrice(200 - subtotal)} למשלוח חינם
                    </p>
                  )}
                </div>
              </div>

              {/* Costs Breakdown */}
              <div className="space-y-3 mb-6 text-gray-600 font-heebo">
                <div className="flex justify-between">
                  <span>סכום ביניים</span>
                  <span className="font-bold font-fredoka text-base-black">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>משלוח</span>
                  <select 
                    value={shippingOption}
                    onChange={(e) => setShippingOption(e.target.value as ShippingOption)}
                    className="text-sm border-none bg-gray-50 rounded-md px-2 py-1 focus:ring-1 focus:ring-primary-turquoise cursor-pointer"
                  >
                    <option value="standard">משלוח רגיל</option>
                    <option value="pickup">איסוף עצמי</option>
                  </select>
                </div>
                
                <div className="flex justify-between text-sm text-gray-500 pr-2">
                  <span>
                    {shippingOption === 'standard' ? 'עד 5 ימי עסקים' : 'מנקודת האיסוף'}
                  </span>
                  <span className={shipping === 0 ? 'text-primary-turquoise font-bold font-fredoka' : 'font-fredoka'}>
                    {shipping === 0 ? 'חינם' : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-gray-100 pt-6 mb-8">
                <div className="flex justify-between items-end font-fredoka">
                  <span className="text-xl font-bold text-gray-700">סה&quot;כ לתשלום</span>
                  <span className="text-4xl font-black text-primary-pink tracking-tight">{formatPrice(total)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={subtotal < 125}
                className={`w-full py-4 rounded-2xl font-bold text-xl font-fredoka transition-all duration-300 shadow-lg transform ${
                  subtotal < 125 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                    : 'bg-base-black text-white hover:shadow-xl hover:bg-primary-pink hover:-translate-y-1 active:translate-y-0'
                }`}
              >
                {subtotal < 125 ? 'מינימום הזמנה 125 ₪' : 'המשך לתשלום'}
              </button>

              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-heebo">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>תשלום מאובטח ומוצפן (SSL)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
