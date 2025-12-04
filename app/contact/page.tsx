'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Save to localStorage
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    messages.push({
      ...formData,
      date: new Date().toISOString(),
    });
    localStorage.setItem('contact_messages', JSON.stringify(messages));

    // Show success
    setShowSuccess(true);
    setFormData({ name: '', phone: '', message: '' });

    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-base-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-[url('/contact.png')] bg-cover bg-center blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black font-fredoka mb-6 tracking-tight">
            דברו איתנו
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
            יש לכם שאלה? הצעה? או סתם רוצים להגיד שלום? <br/>
            אנחנו זמינים עבורכם בכל הערוצים
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          
          {/* Contact Info Cards */}
          <div className="space-y-6 lg:col-span-1">
            {/* Phone */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:-translate-y-1 transition-transform duration-300 group">
              <div className="w-14 h-14 bg-primary-pink/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-pink group-hover:text-white transition-colors text-primary-pink">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-base-black mb-2">טלפון</h3>
              <p className="text-gray-500 mb-4 text-sm">זמינים בימים א'-ה' בין 09:00-18:00</p>
              <a href="tel:+972505752939" className="text-lg font-bold text-primary-pink hover:underline ltr">
                050-5752939
              </a>
            </div>

            {/* Email */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:-translate-y-1 transition-transform duration-300 group">
              <div className="w-14 h-14 bg-primary-turquoise/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-turquoise group-hover:text-white transition-colors text-primary-turquoise">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-base-black mb-2">אימייל</h3>
              <p className="text-gray-500 mb-4 text-sm">נשתדל לחזור אליכם תוך 24 שעות</p>
              <a href="mailto:graffitidesign6@gmail.com" className="text-lg font-bold text-primary-turquoise hover:underline break-all">
                graffitidesign6@gmail.com
              </a>
            </div>

            {/* Social */}
            <div className="bg-gradient-to-br from-primary-pink to-primary-turquoise rounded-3xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">עקבו אחרינו</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/graffiti_designs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/graffitidesigns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-base-black mb-2">
                שלחו לנו הודעה
              </h2>
              <p className="text-gray-500">
                מלאו את הפרטים ונחזור אליכם בהקדם
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    שם מלא *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-turquoise/50 transition-all bg-gray-50 focus:bg-white"
                    placeholder="ישראל ישראלי"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    טלפון *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    pattern="[0-9]{9,10}"
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-turquoise/50 transition-all bg-gray-50 focus:bg-white text-right"
                    placeholder="050-0000000"
                    dir="rtl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  ההודעה שלך *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={6}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-turquoise/50 transition-all bg-gray-50 focus:bg-white resize-none"
                  placeholder="ספרו לנו במה נוכל לעזור..."
                />
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto px-12 shadow-lg hover:shadow-xl">
                שלח הודעה
              </Button>
            </form>
          </div>

        </div>
      </div>

      {/* Success Message Toast */}
      {showSuccess && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-base-black text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-bounce z-50">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">✓</div>
          <span className="font-bold">תודה! ההודעה נשלחה בהצלחה</span>
        </div>
      )}
    </div>
  );
}
