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
    <div 
      className="animate-fadeIn min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/about.png')" }}
    >
      {/* Overlay for better text readability */}
      <div className="bg-white/85 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-pink/10 via-primary-turquoise/10 to-primary-mustard/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-base-black mb-6">
            הסיפור שלנו
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            מסע של יצירתיות, איכות ואחריות חברתית
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* About Graffiti Designs */}
          <section>
            <h2 className="text-3xl font-bold text-base-black mb-6">
              על גרפיטי עיצובים
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                גרפיטי עיצובים נוסדה מתוך אהבה עמוקה לעיצוב גרפי ומחויבות לאחריות
                חברתית. אנחנו מתמחים בייצור מוצרי דפוס איכותיים ומעוצבים: מחברות,
                מעטפות, כרטיסי ברכה, ספרי מתכונים, מגנטים ולוחות שנה ועוד.
              </p>
              <p>
                כל מוצר שלנו הוא תוצאה של תהליך עיצובי קפדני, שבו אנחנו משלבים
                השראה ממרקמי עץ טבעיים, צבעים חמים, ואסתטיקה מודרנית. אנחנו מאמינים
                שמוצרי דפוס יכולים להיות לא רק פונקציונליים, אלא גם יפים, מעוררי
                השראה, ובעלי ערך רגשי.
              </p>
              <p className="font-semibold text-primary-pink">
                עיצוב מקורי, מוכן להזמנה - כל המוצרים שלנו מגיעים בעיצוב קבוע וללא
                אפשרות התאמה אישית, מה שמאפשר לנו לשמור על איכות גבוהה ועקביות
                בעיצוב ואספקה.
              </p>
            </div>
          </section>

          {/* Our Partners */}
          <section className="bg-white/80 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-base-black mb-6">
              השותפים שלנו
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                אנחנו גאים לשתף פעולה עם רשתות מובילות בישראל שמביאות את המוצרים
                שלנו ללקוחות ברחבי הארץ. תוכלו למצוא את המוצרים שלנו ב:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li>זול סטוק - רשת חנויות מובילה עם סניפים ברחבי הארץ</li>
                <li>ג&apos;מבו סטוק - מגוון רחב של מוצרים לכל הבית</li>
                <li>דן דיל - מוצרי צריכה במחירים אטרקטיביים</li>
                <li>ביג סטוק - רשת גדולה למוצרי משרד ובית</li>
              </ul>
              <p>
                השותפויות שלנו מאפשרות לנו להגיע ליותר אנשים ולהפוך את העיצוב
                האיכותי לנגיש לכולם.
              </p>
            </div>
          </section>

          {/* Social Commitment */}
          <section>
            <h2 className="text-3xl font-bold text-base-black mb-6">
              מחויבות לאיכות ולקהילה
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                הלב של גרפיטי עיצובים פועם במפעל הייחודי שלנו, המעסיק אנשים עם
                מוגבלויות. אנחנו מאמינים בשוויון הזדמנויות ובכוח של תעסוקה
                משמעותית. כל עובד שלנו הוא חלק בלתי נפרד מהצוות, ותורם את כישוריו
                ליצירת מוצרים איכותיים.
              </p>
              <p>
                המחויבות שלנו לאיכות מתבטאת בכל שלב של התהליך: מבחירת חומרי הגלם
                הטובים ביותר, דרך תהליך ההדפסה והייצור המדויק, ועד לאריזה הקפדנית
                של כל מוצר. אנחנו לא מתפשרים על איכות, וכל מוצר עובר בדיקה לפני
                שהוא יוצא מהמפעל.
              </p>
              <p>
                כשאתם קונים מוצר מגרפיטי עיצובים, אתם לא רק מקבלים מוצר יפה
                ואיכותי - אתם גם תומכים במודל עסקי שמעניק הזדמנויות לאנשים עם
                מוגבלויות, ומקדם חברה מכילה ושוויונית יותר.
              </p>
            </div>
          </section>

          {/* Values */}
          <section className="bg-gradient-to-br from-primary-pink/5 to-primary-turquoise/5 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-base-black mb-8 text-center">
              הערכים שלנו
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="font-bold text-xl mb-2 text-primary-pink">
                  יצירתיות
                </h3>
                <p className="text-gray-700">
                  עיצובים מקוריים ומרעננים שמשלבים אומנות ופונקציונליות
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="font-bold text-xl mb-2 text-primary-turquoise">
                  איכות
                </h3>
                <p className="text-gray-700">
                  מוצרים עמידים ואיכותיים שנבחרו בקפידה ומיוצרים בדייקנות
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="font-bold text-xl mb-2 text-primary-mustard">
                  אחריות חברתית
                </h3>
                <p className="text-gray-700">
                  מחויבות לשוויון הזדמנויות ולקהילה שלנו
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-bold text-base-black mb-6">
              גלו את המוצרים שלנו
            </h2>
            <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
              מזמינים אתכם להתרשם מהקולקציה המלאה שלנו ולמצוא את המוצר המושלם עבורכם
              או עבור יקיריכם
            </p>
            <Link href="/shop">
              <Button size="lg" className="px-12">
                לחנות המקוונת
              </Button>
            </Link>
          </section>
        </div>
      </div>
      </div>
    </div>
  );
}

