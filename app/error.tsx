'use client';

import { useEffect } from 'react';
import Button from '@/components/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 min-h-[70vh] flex items-center justify-center">
      <div className="text-center animate-fadeIn max-w-2xl">
        <div className="text-6xl mb-6">😵</div>
        <h1 className="text-4xl font-bold text-base-black mb-4">
          משהו השתבש
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          אנחנו מתנצלים, אבל נראה שמשהו לא עבד כמו שצריך. אנא נסו שוב או חזרו לדף
          הבית.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} size="lg">
            נסה שוב
          </Button>
          <a href="/">
            <Button variant="outline" size="lg">
              חזרה לדף הבית
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

