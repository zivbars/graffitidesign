import Link from 'next/link';
import { Metadata } from 'next';
import Button from '@/components/Button';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'עלינו - הסיפור שלנו',
  description:
    'גרפיטי עיצובים - מוצרי דפוס איכותיים מיוצרים בישראל במפעל המעסיק אנשים עם מוגבלויות. עיצוב, איכות ואחריות חברתית.',
  url: 'https://graffiti-designs.vercel.app/about',
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base-white">
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/about.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-base-black/60 via-base-black/50 to-base-white" />
        <div className="relative container mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold font-fredoka text-white mb-6 drop-shadow-lg animate-fadeIn">
            הסיפור שלנו
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 font-heebo font-light max-w-3xl mx-auto drop-shadow-md animate-slideIn">
            מסע של יצירתיות, איכות ואחריות חברתית
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-20 relative z-20 mb-20">
        <div className="max-w-5xl mx-auto">
          
          {/* Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary-pink">
              <div className="text-6xl mb-6 bg-primary-pink/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">🎨</div>
              <h3 className="font-bold text-2xl mb-3 font-fredoka text-primary-pink">
                יצירתיות
              </h3>
              <p className="text-gray-600 font-heebo leading-relaxed">
                עיצובים מקוריים ומרעננים שמשלבים אומנות ופונקציונליות למוצרים שכיף להשתמש בהם.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary-turquoise">
              <div className="text-6xl mb-6 bg-primary-turquoise/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">✨</div>
              <h3 className="font-bold text-2xl mb-3 font-fredoka text-primary-turquoise">
                איכות
              </h3>
              <p className="text-gray-600 font-heebo leading-relaxed">
                חומרי גלם משובחים, הדפסה מתקדמת וגימור מוקפד. מוצרים שנשמרים לאורך זמן.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary-mustard">
              <div className="text-6xl mb-6 bg-primary-mustard/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">🤝</div>
              <h3 className="font-bold text-2xl mb-3 font-fredoka text-primary-mustard">
                אחריות חברתית
              </h3>
              <p className="text-gray-600 font-heebo leading-relaxed">
                גאווה ישראלית. המפעל שלנו מעסיק ומשלב אנשים עם מוגבלויות כחלק בלתי נפרד מהמשפחה.
              </p>
            </div>
          </div>

          {/* Main Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-4xl font-bold font-fredoka text-base-black relative inline-block">
                על גרפיטי עיצובים
                <span className="absolute -bottom-2 right-0 w-1/2 h-1.5 bg-primary-pink rounded-full"></span>
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-heebo">
                <p>
                  גרפיטי עיצובים נוסדה מתוך אהבה עמוקה לעיצוב גרפי ומחויבות לאחריות חברתית. 
                  אנחנו לא סתם עוד בית דפוס - אנחנו בית ליצירה ישראלית מקורית.
                </p>
                <p>
                  כל מוצר שלנו - ממחברות ומעטפות ועד כרטיסי ברכה ולוחות שנה - הוא תוצאה של תהליך עיצובי קפדני.
                  אנחנו שואבים השראה ממרקמי עץ טבעיים, צבעים חמים ואסתטיקה מודרנית כדי ליצור מוצרים שמעוררים רגש.
                </p>
                <div className="bg-primary-pink/5 border-r-4 border-primary-pink p-4 rounded-l-lg mt-6">
                  <p className="font-bold text-primary-pink">
                    עיצוב מקורי, מוכן להזמנה
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    כל המוצרים שלנו מגיעים בעיצוב קבוע (ללא התאמה אישית) כדי להבטיח איכות מקסימלית וזמינות מיידית.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-pink/20 to-primary-turquoise/20 mix-blend-overlay z-10" />
              {/* Since we don't have a dedicated image, we use a pattern or color block with the existing bg image logic if needed, or just reuse about.png for now but smaller */}
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('/about.png')" }}
              />
            </div>
          </div>

          {/* Social Responsibility - Full Width Highlight */}
          <div className="bg-gradient-to-r from-primary-pink to-primary-turquoise text-white rounded-3xl p-10 md:p-16 mb-24 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-mustard/20 rounded-full blur-3xl -ml-32 -mb-32" />
            
            <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold font-fredoka text-white drop-shadow-sm">
                יותר מסתם מוצרים יפים
              </h2>
              <p className="text-lg md:text-xl text-white/90 font-heebo leading-relaxed font-light">
                הלב של גרפיטי עיצובים פועם במפעל הייחודי שלנו. אנחנו מאמינים שכל אדם ראוי להזדמנות ולתעסוקה משמעותית.
                הצוות שלנו מורכב מאנשים מוכשרים עם מוגבלויות, שמוכיחים יום יום שאין גבול ליכולת וליצירה.
              </p>
              <p className="text-lg md:text-xl text-white/90 font-heebo leading-relaxed font-light">
                כשאתם רוכשים מוצר שלנו, אתם שותפים לדרך הזו. אתם תומכים בחברה שוויונית, מכילה וטובה יותר.
              </p>
            </div>
          </div>

          {/* Partners */}
          <div className="mb-24 text-center">
            <h2 className="text-3xl font-bold font-fredoka text-base-black mb-12 relative inline-block">
              השותפים שלנו לדרך
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1.5 bg-primary-turquoise rounded-full"></span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'זול סטוק', desc: 'פריסה ארצית' },
                { name: "ג'מבו סטוק", desc: 'לכל הבית' },
                { name: 'דן דיל', desc: 'מחירים מנצחים' },
                { name: 'ביג סטוק', desc: 'ציוד משרדי וביתי' },
              ].map((partner) => (
                <div key={partner.name} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 group">
                  <div className="h-16 w-16 bg-gray-50 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h4 className="font-bold text-lg font-fredoka text-base-black mb-1">{partner.name}</h4>
                  <p className="text-sm text-gray-500 font-heebo">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <section className="text-center bg-gradient-to-b from-transparent to-primary-pink/5 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold font-fredoka text-base-black mb-6">
              מוכנים להתאהב?
            </h2>
            <p className="text-gray-600 text-xl font-heebo mb-8 max-w-2xl mx-auto">
              הקולקציה החדשה שלנו מחכה לכם בחנות. בואו למצוא את הפריט שיוסיף צבע ושמחה ליום שלכם.
            </p>
            <Link href="/shop">
              <Button size="lg" className="px-12 py-4 text-lg shadow-lg hover:shadow-primary-pink/30 hover:-translate-y-1 transition-all">
                למעבר לחנות
              </Button>
            </Link>
          </section>

        </div>
      </div>
    </div>
  );
}
