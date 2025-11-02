'use client';

import { useState, FormEvent } from 'react';
import Button from './Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      // Save to localStorage
      const newsletters =
        JSON.parse(localStorage.getItem('newsletters') || '[]') || [];
      newsletters.push({ email, date: new Date().toISOString() });
      localStorage.setItem('newsletters', JSON.stringify(newsletters));

      // Show success message
      setShowSuccess(true);
      setEmail('');

      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary-turquoise to-primary-pink py-2 px-4 rounded-2xl">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
          הישארו מעודכנים!
        </h2>
        <p className="text-white/90 mb-3 text-sm">
          הירשמו לניוזלטר שלנו וקבלו עדכונים על מוצרים חדשים, מבצעים מיוחדים
          והשראה לעיצוב
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="הכניסו את כתובת האימייל שלכם"
            required
            className="flex-1 px-6 py-4 rounded-lg text-base-black focus:outline-none focus:ring-2 focus:ring-primary-mustard"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="bg-base-black hover:bg-base-black/90 sm:w-auto"
          >
            הרשמה
          </Button>
        </form>

        {showSuccess && (
          <div className="mt-4 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg inline-block">
            ✓ תודה רבה! נשלח אליך עדכונים בקרוב
          </div>
        )}
      </div>
    </section>
  );
}

