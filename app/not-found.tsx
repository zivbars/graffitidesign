import Link from 'next/link';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-[70vh] flex items-center justify-center">
      <div className="text-center animate-fadeIn">
        <div className="text-9xl font-bold text-primary-pink mb-6">404</div>
        <h1 className="text-4xl font-bold text-base-black mb-4">
          הדף לא נמצא
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          אופס! נראה שהדף שחיפשת לא קיים או הועבר למקום אחר
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg">חזרה לדף הבית</Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" size="lg">
              לחנות
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

