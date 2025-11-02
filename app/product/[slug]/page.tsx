import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';
import { categoryNames } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';
import ImageGallery from '@/components/ImageGallery';
import ProductCard from '@/components/ProductCard';
import AddToCartSection from '@/components/AddToCartSection';

interface PageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div 
      className="animate-fadeIn min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/Product.png')" }}
    >
      {/* Overlay for better text readability */}
      <div className="bg-white/85 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-gray-600">
        <Link href="/" className="hover:text-primary-pink">
          בית
        </Link>
        {' > '}
        <Link href="/shop" className="hover:text-primary-pink">
          חנות
        </Link>
        {' > '}
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-primary-pink"
        >
          {categoryNames[product.category]}
        </Link>
        {' > '}
        <span className="text-base-black font-medium">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div>
          <ImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-base-black mb-4">
            {product.name}
          </h1>

          {/* Price - Fixed single price display */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-base-black">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
              <span className="text-primary-turquoise font-medium flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                במלאי
              </span>
            ) : (
              <span className="text-red-600 font-medium">אזל מהמלאי</span>
            )}
          </div>

          {/* Add to Cart Section (Client Component) */}
          <AddToCartSection product={product} />

          {/* Product Details */}
          <div className="bg-base-white/80 rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-xl text-base-black mb-4">
              פרטי המוצר
            </h3>
            {product.materials && (
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700">חומרים:</span>
                <span className="text-gray-600">{product.materials}</span>
              </div>
            )}
            {product.size && (
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700">גודל:</span>
                <span className="text-gray-600">{product.size}</span>
              </div>
            )}
            <div className="flex gap-2">
              <span className="font-semibold text-gray-700">ייצור:</span>
              <span className="text-gray-600">מיוצר בישראל 🇮🇱</span>
            </div>
            <div className="pt-4 border-t border-base-gray">
              <p className="text-sm text-gray-600">
                עיצוב מקורי, מוכן להזמנה (ללא התאמה אישית)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="pb-16">
          <h2 className="text-3xl font-bold text-base-black mb-8">
            מוצרים דומים
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Back to Shop */}
      <div className="text-center pb-8 lg:pb-0">
        <Link href="/shop" className="inline-block">
          <button className="px-6 py-3 rounded-lg border-2 border-primary-pink text-primary-pink hover:bg-primary-pink hover:text-white transition-all">
            ← חזרה לחנות
          </button>
        </Link>
      </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

