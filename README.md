# Graffiti Designs - גרפיטי עיצובים

מוצרי דפוס בעיצוב ייחודי ומקורי - אתר חנות מקוונת מודרני בעברית

## 🎨 תיאור הפרויקט

גרפיטי עיצובים הוא אתר חנות מקוונת המתמחה במוצרי דפוס איכותיים ומעוצבים:
- מחברות
- מעטפות
- כרטיסי ברכה
- ספרי מתכונים
- מגנטים
- תחתיות לכוסות

הפרויקט מיוצר בישראל במפעל המעסיק אנשים עם מוגבלויות, ומשלב ערכים של יצירתיות, איכות ואחריות חברתית.

## 🛠 טכנולוגיות

- **Next.js 14** - App Router, React Server Components
- **TypeScript** - טיפוסים חזקים
- **Tailwind CSS** - עיצוב מודרני עם תמיכה מלאה ב-RTL
- **Zustand** - ניהול מצב של עגלת הקניות
- **Next Font** - אופטימיזציה של פונטים (Heebo)

## 🚀 התקנה והרצה

### דרישות מקדימות
- Node.js 18+ 
- npm או yarn

### התקנה

\`\`\`bash
# התקנת תלויות
npm install

# הרצת שרת פיתוח
npm run dev

# פתיחת הדפדפן בכתובת
# http://localhost:3000
\`\`\`

### בנייה לפרודקשן

\`\`\`bash
# בנייה
npm run build

# הרצת שרת פרודקשן
npm start
\`\`\`

## 📁 מבנה הפרויקט

\`\`\`
graffiti-designs/
├── app/                    # App Router pages
│   ├── page.tsx           # דף הבית
│   ├── shop/              # עמוד חנות
│   ├── product/[slug]/    # עמודי מוצרים
│   ├── cart/              # עגלת קניות
│   ├── about/             # אודות
│   ├── reviews/           # ביקורות
│   ├── sale/              # מבצעים
│   ├── faq/               # שאלות נפוצות
│   ├── partners/          # שותפים
│   └── contact/           # צור קשר
├── components/            # קומפוננטות React
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ...
├── data/                  # נתונים סטטיים (mock data)
│   ├── products.ts
│   ├── reviews.ts
│   ├── faq.ts
│   └── partners.ts
├── lib/                   # פונקציות עזר
│   ├── currency.ts
│   ├── slug.ts
│   ├── cn.ts
│   └── seo.ts
├── stores/                # Zustand stores
│   └── cart.ts
├── types/                 # TypeScript types
│   ├── product.ts
│   ├── review.ts
│   └── cart.ts
└── public/               # קבצים סטטיים
    ├── products/         # תמונות מוצרים
    └── bg/              # רקעים
\`\`\`

## ✨ תכונות עיקריות

### Frontend בלבד (ללא Backend)
- ✅ עיצוב מלא בעברית עם תמיכה ב-RTL
- ✅ עגלת קניות עם Zustand + localStorage
- ✅ פילטרים ומיונים למוצרים
- ✅ דפי מוצר עם גלריה
- ✅ טפסים עם ולידציה
- ✅ SEO מלא (metadata, OG tags, JSON-LD)
- ✅ נגישות (WCAG 2.1)
- ✅ רספונסיבי מלא
- ✅ אנימציות עדינות

### עתידי (Integration)
- ⏳ Supabase - Database
- ⏳ Stripe - תשלומים
- ⏳ iCount API - הנהלת חשבונות
- ⏳ SMTP - שליחת מיילים

## 🎨 ערכת עיצוב

### צבעים
- **Primary Pink**: `#C04182`
- **Primary Turquoise**: `#49B4A3`
- **Primary Mustard**: `#D0A32D`
- **Base Black**: `#1A1A1A`
- **Off-White**: `#F7F5F2`
- **Light Gray**: `#E1E1E1`

### טיפוגרפיה
- **פונט ראשי**: Heebo (Google Fonts)
- תמיכה מלאה בעברית ולטינית

## 🔧 הגדרות נוספות

### משתני סביבה (.env.local)
כרגע לא נדרשים משתני סביבה. בעתיד:

\`\`\`bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret

# iCount
ICOUNT_API_KEY=your_icount_key
\`\`\`

## 📦 Scripts זמינים

- `npm run dev` - הרצת שרת פיתוח
- `npm run build` - בנייה לפרודקשן
- `npm start` - הרצת שרת פרודקשן
- `npm run lint` - בדיקת lint

## 🌐 פריסה (Deployment)

הפרויקט מוכן לפריסה ב-Vercel:

\`\`\`bash
# פריסה עם Vercel CLI
vercel

# או דרך GitHub integration
# פשוט חבר את הריפו ל-Vercel
\`\`\`

## 📝 הערות חשובות

1. **מוצרים**: כרגע עובדים עם mock data. בעתיד יחובר ל-Supabase
2. **תמונות**: צריך להוסיף תמונות אמיתיות ל-`public/products/`
3. **תשלומים**: כרגע מציג alert, בעתיד יחובר ל-Stripe
4. **טפסים**: נשמרים ב-localStorage, בעתיד יישלחו לשרת

## 🤝 תרומה

אנחנו מזמינים אותך לתרום לפרויקט! פתח Issue או Pull Request.

## 📄 רישיון

© כל הזכויות שמורות – גרפיטי עיצובים 2025

## 📞 יצירת קשר

- **אימייל**: info@graffiti-designs.co.il
- **טלפון**: 050-123-4567
- **אינסטגרם**: @graffiti_designs
- **פייסבוק**: /graffitidesigns

---

Made with ❤️ in Israel

