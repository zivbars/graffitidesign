import Link from 'next/link';
import { Metadata } from 'next';
import { products } from '@/data/products';
import { reviews } from '@/data/reviews';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import Newsletter from '@/components/Newsletter';
import Button from '@/components/Button';
import { generateSEO } from '@/lib/seo';
import HeroVideo from '@/components/HeroVideo';
import CategoryRibbon from '@/components/CategoryRibbon';
import StoryStrip from '@/components/StoryStrip';
import FeatureCarousel from '@/components/FeatureCarousel';

export const metadata: Metadata = generateSEO({
  title: 'גרפיטי עיצובים - מוצרי דפוס בעיצוב ייחודי',
  description:
    'מוצרי דפוס איכותיים בעיצוב מקורי: מחברות, מעטפות, כרטיסי ברכה, ספרי מתכונים, מגנטים ותחתיות לכוסות. מיוצר בישראל.',
  url: 'https://graffiti-designs.vercel.app',
});

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const topReviews = reviews.slice(0, 4);

  return (
    <div className="relative min-h-screen">
      {/* Fixed Video Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(8px)', transform: 'scale(1.1)' }}
        >
          <source src="/videos/video1.MP4" type="video/mp4" />
        </video>
        {/* White transparency overlay */}
        <div className="absolute inset-0 bg-white/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 animate-fadeIn">
        {/* Hero Video Section */}
        <HeroVideo />

        {/* Category Ribbon */}
        <CategoryRibbon />

        {/* Story Strip */}
        <StoryStrip />

        {/* Feature Carousel */}
        <FeatureCarousel />

        {/* Featured Products Section */}
        <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-white/80 to-base-white/80 backdrop-blur-sm">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-base-black mb-4">
              מוצרים נבחרים
            </h2>
            <p className="text-gray-600 text-lg">
              הקולקציה המיוחדת שלנו - מוצרים שמשלבים עיצוב, איכות ויצירתיות
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/shop">
              <Button variant="outline" size="lg">
                לכל המוצרים
              </Button>
            </Link>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="container mx-auto px-4 py-16 bg-white/80 backdrop-blur-sm">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-base-black mb-4">
              לקוחות ממליצים
            </h2>
            <p className="text-gray-600 text-lg">
              מה הלקוחות שלנו אומרים על המוצרים
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {topReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/reviews">
              <Button variant="outline" size="md">
                לכל הביקורות
              </Button>
            </Link>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="container mx-auto px-4 py-16 bg-base-white/80 backdrop-blur-sm">
          <Newsletter />
        </section>
      </div>
    </div>
  );
}

