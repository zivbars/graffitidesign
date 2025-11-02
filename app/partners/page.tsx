import { partners } from '@/data/partners';
import Button from '@/components/Button';
import Link from 'next/link';

export default function PartnersPage() {
  return (
    <div 
      className="animate-fadeIn min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/partners.png')" }}
    >
      {/* Overlay for better text readability */}
      <div className="bg-white/85 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-turquoise/10 via-primary-pink/10 to-primary-mustard/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-base-black mb-6">
            איפה אפשר למצוא אותנו
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            המוצרים שלנו זמינים ברשתות מובילות ברחבי הארץ
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-8 text-center"
            >
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary-pink mb-2">
                  {partner.name}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {partner.description}
              </p>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-white/80 rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-base-black mb-6 text-center">
            על השותפויות שלנו
          </h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              אנחנו גאים לשתף פעולה עם רשתות החנויות המובילות בישראל, שמאפשרות לנו
              להגיע ללקוחות ברחבי הארץ ולהפוך את מוצרי העיצוב האיכותיים שלנו לנגישים
              לכולם.
            </p>
            <p>
              השותפויות שלנו מבוססות על ערכים משותפים של איכות, שירות מעולה,
              ומחויבות ללקוח. כל מוצר שאתם רוכשים ברשתות האלה עבר את אותו תהליך
              ייצור קפדני ובדיקת איכות כמו המוצרים שלנו באתר.
            </p>
            <div className="bg-primary-turquoise/10 border-r-4 border-primary-turquoise p-6 rounded">
              <p className="font-semibold text-primary-turquoise mb-2">
                חשוב לדעת:
              </p>
              <p className="text-gray-700">
                עיצוב מקורי, מוכן להזמנה - כל המוצרים שלנו מגיעים בעיצוב קבוע וללא
                אפשרות התאמה אישית. זה מאפשר לנו לשמור על עקביות באיכות ולהציע
                מחירים משתלמים.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-base-gray/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-base-black mb-6">
              מפת סניפים אינטראקטיבית
            </h2>
            <div className="bg-white rounded-lg shadow-md p-16">
              <div className="flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 text-gray-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  בקרוב...
                </h3>
                <p className="text-gray-600">
                  אנחנו עובדים על מפה אינטראקטיבית שתאפשר לכם למצוא את הסניף הקרוב
                  אליכם
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-primary-pink to-primary-turquoise rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            קנו ישירות מהאתר שלנו
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            מגוון רחב יותר, מבצעים בלעדיים, ומשלוח מהיר לכל הארץ
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-white text-primary-pink hover:bg-base-white px-12">
              לחנות המקוונת
            </Button>
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
}

