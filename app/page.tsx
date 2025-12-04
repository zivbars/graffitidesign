import Link from 'next/link';
import { Metadata } from 'next';
import { products } from '@/data/products';
import { reviews } from '@/data/reviews';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import { generateSEO } from '@/lib/seo';
import HeroVideo from '@/components/HeroVideo';
import CategoryRibbon from '@/components/CategoryRibbon';
import { ArrowRight, Star, Truck, ShieldCheck, Sparkles, Heart } from 'lucide-react';

export const metadata: Metadata = generateSEO({
  title: 'גרפיטי עיצובים - מוצרי דפוס בעיצוב ייחודי',
  description:
    'מוצרי דפוס איכותיים בעיצוב מקורי: מחברות, מעטפות, כרטיסי ברכה, ספרי מתכונים, מגנטים ותחתיות לכוסות. מיוצר בישראל.',
  url: 'https://graffiti-designs.vercel.app',
});

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const topReviews = reviews.filter((r) => r.rating === 5).slice(0, 3);

  return (
    <div className="relative min-h-screen font-fredoka">
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
      <div className="relative z-10">
        {/* Hero Video Section - Kept as requested */}
        <HeroVideo />

        {/* Why Choose Us */}
        <section id="why-choose-us" className="bg-white pb-10 pt-12 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 group hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-primary-pink mb-6 group-hover:bg-primary-pink/10 transition-colors">
                  <Sparkles size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-base-black mb-3">עיצוב מקורי</h3>
                <p className="text-gray-600 leading-relaxed">כל מוצר מעוצב בקפידה ובאהבה, עם תשומת לב לפרטים הקטנים ביותר</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 group hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-primary-turquoise mb-6 group-hover:bg-primary-turquoise/10 transition-colors">
                  <ShieldCheck size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-base-black mb-3">איכות מובטחת</h3>
                <p className="text-gray-600 leading-relaxed">חומרי גלם איכותיים ועמידים שנבחרו בקפידה להבטחת עמידות לאורך זמן</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 group hover:-translate-y-2">
                <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-primary-mustard mb-6 group-hover:bg-primary-mustard/10 transition-colors">
                  <Truck size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-base-black mb-3">משלוח מהיר</h3>
                <p className="text-gray-600 leading-relaxed">משלוח מהיר ונוח עד פתח הבית תוך 3-5 ימי עסקים מרגע ההזמנה</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Ribbon - Integrated nicely */}
        <div className="relative z-10">
           <CategoryRibbon />
        </div>

        {/* Featured Products Section */}
        <section className="py-20 relative bg-gray-50/30">
           {/* Wave Separator Top */}
           <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
            <svg className="relative block w-[calc(100%+1.3px)] h-[40px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10 pt-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <span className="text-primary-pink font-bold tracking-wide text-sm uppercase mb-2 block">הקולקציה החדשה</span>
                <h2 className="text-4xl md:text-5xl font-black text-base-black leading-tight">
                  מוצרים <span className="text-primary-turquoise">נבחרים</span>
                </h2>
              </div>
              <Link 
                href="/shop" 
                className="group flex items-center gap-2 font-bold text-base-black hover:text-primary-pink transition-colors"
              >
                לכל המוצרים
                <ArrowRight className="group-hover:-translate-x-1 transition-transform" size={20} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="transform hover:-translate-y-2 transition-transform duration-300">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Wave Separator Bottom */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 rotate-180">
            <svg className="relative block w-[calc(100%+1.3px)] h-[40px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
            </svg>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-bold text-sm mb-4">
                <Star size={14} fill="currentColor" />
                דירוג 5 כוכבים
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-base-black mb-4">
                לקוחות <span className="text-primary-pink">ממליצים</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                ההמלצות שלכם הן כרטיס הביקור הטוב ביותר שלנו
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {topReviews.map((review, i) => (
                <div key={review.id} className="h-full">
                   <ReviewCard review={review} index={i} />
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/reviews">
                <button className="px-8 py-3 bg-white border-2 border-base-black text-base-black rounded-full font-bold hover:bg-base-black hover:text-white transition-all duration-300 shadow-md hover:shadow-xl">
                  קראו עוד ביקורות
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="pb-20 relative">
           {/* Wave Separator - Connects to the white section above */}
           <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 -mt-[1px]">
             <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                 <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
             </svg>
           </div>

          <div className="container mx-auto px-4 relative z-20 pt-20 md:pt-32">
            <div className="bg-gradient-to-br from-primary-pink/5 to-primary-turquoise/5 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-sm border border-gray-100">
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-6 animate-bounce">
                  <Heart className="w-8 h-8 text-primary-pink" fill="currentColor" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black text-base-black mb-4">
                  רוצים לקבל השראה?
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  הצטרפו למועדון הלקוחות שלנו וקבלו עדכונים על מוצרים חדשים, טיפים לעיצוב ומבצעים בלעדיים ישירות למייל.
                </p>
                
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="הכניסו את המייל שלכם..." 
                    className="flex-1 px-6 py-3 rounded-full bg-white border border-gray-200 text-base-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-pink/50 shadow-sm"
                  />
                  <button className="px-8 py-3 bg-base-black text-white rounded-full font-bold hover:bg-primary-pink transition-colors shadow-lg whitespace-nowrap">
                    אני בפנים!
                  </button>
                </form>
                <p className="text-gray-500 text-xs mt-4">
                  *אנחנו מבטיחים לא להספים, שולחים רק דברים טובים.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
