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
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/contact.png')" }}
    >
      {/* Overlay for better text readability */}
      <div className="bg-white/85 min-h-screen">
        <div className="container mx-auto px-4 py-12 animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-base-black mb-4">
          צור קשר
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          יש לכם שאלה, הצעה או פשוט רוצים לומר שלום? נשמח לשמוע מכם!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-base-black mb-6">
            שלחו לנו הודעה
          </h2>

          {showSuccess && (
            <div className="mb-6 bg-primary-turquoise/10 border border-primary-turquoise text-primary-turquoise px-4 py-3 rounded-lg">
              ✓ תודה על הפניה! נחזור אליך בהקדם האפשרי
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                שם מלא *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-3 rounded-lg border border-base-gray focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
                placeholder="השם שלך"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                className="w-full px-4 py-3 rounded-lg border border-base-gray focus:outline-none focus:ring-2 focus:ring-primary-turquoise text-right"
                placeholder="050-1234567"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ההודעה שלך *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-base-gray focus:outline-none focus:ring-2 focus:ring-primary-turquoise resize-none"
                placeholder="ספרו לנו במה אנחנו יכולים לעזור..."
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              שלח הודעה
            </Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          {/* Contact Details */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-base-black mb-6">
              פרטי התקשרות
            </h2>
            
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-pink/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary-pink"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-base-black mb-1">טלפון</h3>
                  <a
                    href="tel:+972505752939"
                    className="text-gray-600 hover:text-primary-pink transition-colors"
                  >
                    050-5752939
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-turquoise/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary-turquoise"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-base-black mb-1">אימייל</h3>
                  <a
                    href="mailto:graffitidesign6@gmail.com"
                    className="text-gray-600 hover:text-primary-pink transition-colors"
                  >
                    graffitidesign6@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-base-black mb-6">
              שעות פעילות
            </h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">ראשון - חמישי</span>
                <span>09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">שישי</span>
                <span>09:00 - 14:00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">שבת</span>
                <span className="text-red-600">סגור</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-gradient-to-br from-primary-pink to-primary-turquoise rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">עקבו אחרינו</h2>
            <p className="mb-6">
              הצטרפו לקהילה שלנו ברשתות החברתיות לעדכונים, השראה ומבצעים בלעדיים
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/graffiti_designs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
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
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}

