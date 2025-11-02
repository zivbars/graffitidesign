'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/stores/cart';
import SearchBar from './SearchBar';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const pathname = usePathname();
  const getTotalItems = useCart((state) => state.getTotalItems);
  const hydrate = useCart((state) => state.hydrate);
  const isHydrated = useCart((state) => state.isHydrated);
  const prevTotalItems = useRef(0);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const totalItems = isHydrated ? getTotalItems() : 0;

  // Trigger bounce animation when cart items change
  useEffect(() => {
    if (totalItems > prevTotalItems.current && prevTotalItems.current > 0) {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 600);
    }
    prevTotalItems.current = totalItems;
  }, [totalItems]);

  const navLinks = [
    { href: '/', label: 'בית' },
    { href: '/shop', label: 'חנות' },
    { href: '/about', label: 'עלינו' },
    { href: '/sale', label: 'מבצעים' },
    { href: '/reviews', label: 'ביקורות' },
    { href: '/partners', label: 'שותפים' },
    { href: '/faq', label: 'שאלות נפוצות' },
    { href: '/contact', label: 'צור קשר' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-sm"
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderBottom: '1px solid #E1E1E1'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo with gradient hover effect */}
          <Link
            href="/"
            className="text-2xl font-bold transition-all duration-300 hover-gradient-text"
            style={{ letterSpacing: '0.5px' }}
          >
            <span style={{ color: '#C04182' }}>Graffiti</span>
            {' '}
            <span style={{ color: '#49B4A3' }}>Designs</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Desktop Navigation - Capsule Style Buttons */}
          <nav className="hidden lg:flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full font-medium transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md ${
                  isActiveLink(link.href)
                    ? 'bg-white text-[#C04182] underline'
                    : 'bg-white text-[#C04182] hover:bg-[#C04182] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Cart + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-white/50 rounded-full transition-all duration-300 hover:-translate-y-0.5"
              aria-label="עגלת קניות"
              style={{ color: '#C04182' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span 
                  className={`absolute -top-1 -left-1 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${
                    cartBounce ? 'animate-bounce' : ''
                  }`}
                  style={{ backgroundColor: '#C04182' }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button (Hamburger) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/50 rounded-full transition-all duration-300"
              aria-label="תפריט"
              style={{ color: '#C04182' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <nav 
            className="lg:hidden py-4 mt-2 mb-4 rounded-xl shadow-lg animate-fadeIn"
            style={{ backgroundColor: 'white' }}
          >
            <div className="flex flex-col">
              {navLinks.map((link, index) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-6 py-3 font-medium transition-colors duration-200 text-right ${
                      isActiveLink(link.href)
                        ? 'underline'
                        : 'hover:bg-[#F7F5F2]'
                    }`}
                    style={{ color: '#C04182' }}
                  >
                    {link.label}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <div 
                      className="mx-4" 
                      style={{ borderBottom: '1px solid #E1E1E1' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>

      {/* CSS for gradient hover effect on logo */}
      <style jsx>{`
        .hover-gradient-text:hover {
          background: linear-gradient(90deg, #C04182 0%, #49B4A3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </header>
  );
}

