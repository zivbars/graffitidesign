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
          <h1 className="text-3xl font-bold font-fredoka text-base-black mb-4">
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
      <div className="bg-white/90 min-h-screen backdrop-blur-[2px]">
        <div className="container mx-auto px-4 py-12 animate-fadeIn">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-primary-pink/10 rounded-full flex items-center justify-center text-primary-pink">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-fredoka text-base-black tracking-tight">
              עגלת הקניות
              <span className="text-lg md:text-xl font-normal text-gray-500 mr-4 font-heebo">
                ({items.length} פריטים)
              </span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 flex gap-6 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 group"
                >
                  {/* Image */}
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="128px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link href={`/product/${item.slug}`}>
                          <h3 className="text-xl font-bold text-base-black hover:text-primary-pink transition-colors mb-1">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-primary-pink font-bold text-lg">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                        aria-label="הסר פריט"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-white shadow-sm hover:bg-primary-pink hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 text-gray-600 disabled:opacity-50"
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
                            if (!isNaN(value) && value > 0) {
                              updateQuantity(item.id, value);
                            }
                          }}
                          onBlur={(e) => {
                            const value = parseInt(e.target.value);
                            if (isNaN(value) || value < 1) {
                              updateQuantity(item.id, 1);
                            }
                          }}
                          className="w-12 text-center font-bold bg-transparent focus:outline-none text-base-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-white shadow-sm hover:bg-primary-pink hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 text-gray-600"
                          aria-label="הוסף כמות"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-left">
                        <span className="text-xs text-gray-500 block">סה&quot;כ</span>
                        <p className="font-black text-xl text-base-black">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <div className="pt-6">
                <Link href="/shop" className="inline-flex items-center text-gray-600 hover:text-primary-pink font-bold transition-colors group">
                  <span className="group-hover:-translate-x-1 transition-transform">→</span>
                  <span className="mr-2">המשך קניות</span>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24 border border-gray-100">
                <h2 className="text-2xl font-black font-fredoka text-base-black mb-8 pb-4 border-b border-gray-100">
                  סיכום הזמנה
                </h2>

                {/* Subtotal */}
                <div className="flex justify-between mb-6 text-gray-600 font-heebo">
                  <span>סכום ביניים</span>
                  <span className="font-bold text-base-black text-lg">{formatPrice(subtotal)}</span>
                </div>

                {/* Shipping Options */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-base-black mb-3 font-heebo">
                    שיטת משלוח
                  </label>
                  <div className="space-y-3">
                    {Object.entries(shippingLabels).map(([key, label]) => (
                      <label 
                        key={key} 
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          shippingOption === key 
                            ? 'border-primary-turquoise bg-primary-turquoise/5' 
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            shippingOption === key ? 'border-primary-turquoise' : 'border-gray-300'
                          }`}>
                            {shippingOption === key && <div className="w-2.5 h-2.5 rounded-full bg-primary-turquoise" />}
                          </div>
                          <span className={`font-medium font-heebo ${shippingOption === key ? 'text-base-black' : 'text-gray-500'}`}>
                            {label.split(' (')[0]}
                          </span>
                        </div>
                        <span className="font-bold text-sm font-heebo">
                          {shippingCosts[key as ShippingOption] === 0 ? 'חינם' : formatPrice(shippingCosts[key as ShippingOption])}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Shipping Cost */}
                <div className="flex justify-between mb-6 text-gray-600 font-heebo">
                  <span>דמי משלוח</span>
                  <span className="font-bold text-base-black">
                    {shipping === 0 ? 'חינם' : formatPrice(shipping)}
                  </span>
                </div>

                {/* Order Info Messages */}
                <div className="mb-8 space-y-3 font-heebo">
                  {/* Minimum Order Progress */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-gray-700">מינימום הזמנה (125 ₪)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${subtotal >= 125 ? 'bg-green-500' : 'bg-gray-400'}`}
                        style={{ width: `${Math.min(100, (subtotal / 125) * 100)}%` }}
                      />
                    </div>
                    {subtotal < 125 && (
                      <p className="text-xs text-red-500 mt-2 font-medium">
                        חסר עוד {formatPrice(125 - subtotal)} להשלמת ההזמנה
                      </p>
                    )}
                  </div>

                  {/* Free Shipping Progress */}
                  <div className="bg-primary-turquoise/5 rounded-xl p-4 border border-primary-turquoise/10">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-primary-turquoise">משלוח חינם (מעל 200 ₪)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-primary-turquoise transition-all duration-500"
                        style={{ width: `${Math.min(100, (subtotal / 200) * 100)}%` }}
                      />
                    </div>
                    {subtotal < 200 && (
                      <p className="text-xs text-gray-500 mt-2">
                        עוד {formatPrice(200 - subtotal)} למשלוח חינם!
                      </p>
                    )}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t-2 border-dashed border-gray-200 pt-6 mb-8">
                  <div className="flex justify-between items-end font-fredoka">
                    <span className="text-xl font-bold text-gray-600">סה&quot;כ לתשלום</span>
                    <span className="text-4xl font-black text-primary-pink">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={handleCheckout}
                  disabled={subtotal < 125}
                  className={`w-full py-4 rounded-full font-bold text-xl font-fredoka transition-all duration-300 shadow-lg transform hover:-translate-y-1 ${
                    subtotal < 125 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
                      : 'bg-base-black text-white hover:shadow-xl hover:bg-primary-pink'
                  }`}
                >
                  {subtotal < 125 ? 'לא הושג מינימום' : 'המשך לתשלום'}
                </button>

                {/* Security */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 font-heebo">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>תשלום מאובטח ומוצפן בתקן SSL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

