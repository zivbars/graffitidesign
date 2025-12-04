import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';
import { categoryNames } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';
import ImageGallery from '@/components/ImageGallery';
import ProductCard from '@/components/ProductCard';
import AddToCartSection from '@/components/AddToCartSection';
import { Check, Truck, Shield } from 'lucide-react';

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
      className="animate-fadeIn min-h-screen bg-cover bg-center bg-no-repeat bg-fixed font-fredoka"
      style={{ backgroundImage: "url('/Product.png')" }}
    >
      {/* Modern Glass Overlay */}
      <div className="bg-white/80 backdrop-blur-md min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Images Section */}
            <div className="relative">
               <ImageGallery images={product.images} productName={product.name} />
            </div>

            {/* Info Section */}
            <div className="flex flex-col h-full">
              <div className="mb-auto">
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
                  <Link href="/" className="hover:text-primary-pink transition-colors">בית</Link>
                  <span className="text-gray-300">/</span>
                  <Link href="/shop" className="hover:text-primary-pink transition-colors">חנות</Link>
                  <span className="text-gray-300">/</span>
                  <Link href={`/shop?category=${product.category}`} className="hover:text-primary-pink transition-colors">
                    {categoryNames[product.category]}
                  </Link>
                </nav>

                <h1 className="text-4xl md:text-5xl font-black text-base-black leading-tight mb-4">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-4xl font-bold text-primary-pink">
                    {formatPrice(product.price)}
                  </span>
                  {product.inStock ? (
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-bold border border-green-100">
                      במלאי
                    </span>
                  ) : (
                    <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-bold border border-red-100">
                      אזל מהמלאי
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold border border-yellow-100">
                      מומלץ
                    </span>
                  )}
                </div>

                <div className="prose prose-lg text-gray-600 mb-10 leading-relaxed max-w-none">
                  <p>{product.description}</p>
                </div>

                {/* Features - Clean Look */}
                <div className="flex flex-wrap gap-6 mb-10 border-y border-gray-100 py-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 rounded-full bg-primary-pink/10 flex items-center justify-center text-primary-pink">
                      <Shield size={20} />
                    </div>
                    <span className="font-medium">איכות מובטחת</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 rounded-full bg-primary-turquoise/10 flex items-center justify-center text-primary-turquoise">
                      <Truck size={20} />
                    </div>
                    <span className="font-medium">משלוח מהיר</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 rounded-full bg-primary-mustard/10 flex items-center justify-center text-primary-mustard">
                      <Check size={20} />
                    </div>
                    <span className="font-medium">ייצור ישראלי</span>
                  </div>
                </div>

                {/* Product Specs */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10 text-sm">
                  {product.materials && (
                    <div className="flex flex-col">
                      <span className="text-gray-500 mb-1">חומרים</span>
                      <span className="font-bold text-gray-800">{product.materials}</span>
                    </div>
                  )}
                  {product.size && (
                    <div className="flex flex-col">
                      <span className="text-gray-500 mb-1">גודל</span>
                      <span className="font-bold text-gray-800">{product.size}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <AddToCartSection product={product} />
            </div>
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <section className="pb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-base-black relative inline-block">
                  מוצרים דומים
                  <span className="absolute -bottom-2 left-0 w-full h-2 bg-primary-pink/20 -rotate-1 rounded-full"></span>
                </h2>
                <Link href="/shop" className="text-primary-turquoise font-bold hover:underline hidden sm:block">
                  צפה בכל המוצרים
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {similarProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
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
