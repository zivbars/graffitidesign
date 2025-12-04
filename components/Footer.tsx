'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Button from './Button';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNewsletterSubmit = (e: FormEvent) => {
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

      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const quickLinks = [
    { href: '/shop', label: 'חנות' },
    { href: '/about', label: 'עלינו' },
    { href: '/contact', label: 'צור קשר' },
    { href: '/faq', label: 'שאלות נפוצות' },
    { href: '/sale', label: 'מבצעים' },
    { href: '/reviews', label: 'ביקורות' },
  ];

  return (
    <footer className="relative bg-base-white text-base-black mt-auto shadow-inner">
      {/* Colorful top border */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary-pink via-primary-turquoise to-primary-mustard" />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-3xl font-fredoka font-bold text-primary-pink">
              Graffiti Design
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed font-heebo max-w-sm">
              מוצרי דפוס בעיצוב ייחודי ומקורי. מיוצר בישראל במפעל המעסיק אנשים עם
              מוגבלויות. אנחנו מאמינים באיכות, יצירתיות ואחריות חברתית לקהילה.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-fredoka font-semibold mb-6 text-primary-turquoise">
              קישורים מהירים
            </h4>
            <ul className="grid grid-cols-2 gap-3 font-heebo">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary-pink transition-colors text-base flex items-center gap-2 group"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-turquoise opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-fredoka font-semibold mb-6 text-primary-mustard">
              הרשמה לעדכונים
            </h4>
            <p className="text-gray-600 text-sm font-heebo mb-4">
              הירשמו לקבלת עדכונים על מבצעים חמים ומוצרים חדשים!
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="האימייל שלך"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-base-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-turquoise focus:bg-white transition-all font-heebo"
                />
              </div>
              <Button type="submit" variant="secondary" size="md" className="w-full rounded-xl font-fredoka font-medium hover:scale-[1.02] active:scale-95 transition-all shadow-sm">
                הרשמה
              </Button>
              {showSuccess && (
                <p className="text-primary-turquoise text-sm font-heebo animate-fadeIn">
                  ✓ תודה על ההרשמה!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-gray-200 pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6 font-heebo">
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">
              © כל הזכויות שמורות – גרפיטי עיצובים {new Date().getFullYear()}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              נבנה באהבה בישראל 🇮🇱
            </p>
          </div>
          
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/graffiti_designs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-pink transition-colors transform hover:scale-110"
              aria-label="Instagram"
            >
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/graffitidesigns"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-turquoise transition-colors transform hover:scale-110"
              aria-label="Facebook"
            >
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
