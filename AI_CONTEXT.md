# AI_CONTEXT.md
## תיאור כללי של האתר - Graffiti Designs

### 🎯 סקירה כללית

**Graffiti Designs (גרפיטי עיצובים)** הוא אתר חנות מקוונת (e-commerce) בעברית המתמחה במכירת מוצרי דפוס בעיצוב ייחודי ומקורי. האתר מדגיש ערכים של יצירתיות, איכות ואחריות חברתית - המוצרים מיוצרים בישראל במפעל המעסיק אנשים עם מוגבלויות.

האתר בנוי כ-**frontend-only application** ללא backend, עם נתונים סטטיים (mock data) ו-localStorage לניהול מצב מקומי. זהו פרויקט מודרני המשתמש ב-Next.js 14 עם App Router ו-React Server Components.

---

## 🛍️ קטלוג המוצרים

האתר מציע 6 קטגוריות עיקריות של מוצרי דפוס:

1. **מחברות** (Notebooks) - A4, A5, כריכה קשה/רכה, עיצובים שונים
2. **מעטפות** (Envelopes) - פסטל, קראפט, צבעוניות, מעטפות לאירועים
3. **כרטיسי ברכה** (Greeting Cards) - יום הולדת, חתונה, תודה, שנה חדשה
4. **ספרי מתכונים** (Recipe Books) - ספרים מעוצבים לתיעוד מתכונים
5. **מגנטים** (Magnets) - מגנטים עם ציטוטים, לוח שנה, פרחים
6. **תחתיות לכוסות** (Coasters) - סטים בעיצובים שונים (עץ, שיש, גיאומטרי)

בסך הכל יש 22 מוצרים שונים במערכת, כל אחד עם:
- שם, תיאור, מחיר
- תמונות מוצר
- מידע על חומרים וגודל
- סטטוס מלאי
- אפשרות למבצעים (sale prices)
- סימון כמוצר מומלץ (featured)

---

## 👥 זרימות משתמשים (User Flows)

### 1️⃣ גלישה וגילוי מוצרים

**מסלול עיקרי:**
```
דף הבית → סקירת מוצרים נבחרים → לחיצה על "לצפייה במוצרים" / "לכל המוצרים" → עמוד החנות
```

**במסך החנות:**
- סינון לפי קטגוריה (dropdown)
- מיון לפי: חדשים ביותר / פופולריים / מחיר (נמוך-גבוה / גבוה-נמוך)
- הצגת מספר התוצאות
- רשת מוצרים רספונסיבית (1-4 עמודות לפי מסך)
- כפתור "טען עוד מוצרים" (lazy loading של 12 מוצרים בכל פעם)

### 2️⃣ צפייה בפרטי מוצר

**מסלול:**
```
כרטיס מוצר → לחיצה על "לפרטים" / תמונה / שם → עמוד מוצר ייעודי
```

**בעמוד המוצר:**
- Breadcrumbs navigation (בית > חנות > קטגוריה > מוצר)
- גלריית תמונות של המוצר
- שם, מחיר (עם מחיר לפני הנחה אם במבצע)
- תיאור מפורט
- סטטוס מלאי
- פרטי מוצר: חומרים, גודל, ייצור (מיוצר בישראל 🇮🇱)
- בחירת כמות והוספה לעגלה
- מוצרים דומים בקטגוריה
- חזרה לחנות

### 3️⃣ תהליך קנייה

**Flow מלא:**
```
בחירת מוצר → "הוסף לעגלה" → המשך גלישה / מעבר לעגלה → 
עגלת קניות → בחירת אפשרות משלוח → "המשך לתשלום"
```

**בעגלת הקניות:**
- רשימת פריטים עם תמונות קטנות
- שינוי כמות (+/-)
- הסרת פריט
- חישוב סכום ביניים (subtotal)
- בחירת אפשרות משלוח:
  - משלוח רגיל (3-5 ימים) - ₪25
  - משלוח מהיר (1-2 ימים) - ₪40
  - איסוף עצמי - חינם
- **משלוח חינם מעל ₪200!** (עם אינדיקטור "עוד X ₪ למשלוח חינם")
- סה"כ לתשלום
- כפתור "המשך לתשלום" (כרגע מציג alert - עתידי: Stripe)

### 4️⃣ גילוי תוכן נוסף

**דפי מידע:**
- **אודות** (`/about`) - סיפור המותג והערכים
- **ביקורות** (`/reviews`) - המלצות לקוחות (mock reviews)
- **שותפים** (`/partners`) - רשתות שיווק שמוכרות את המוצרים
- **שאלות נפוצות** (`/faq`) - Accordion עם שאלות ותשובות
- **צור קשר** (`/contact`) - טופס יצירת קשר (נשמר ב-localStorage)
- **מבצעים** (`/sale`) - מוצרים במבצע בלבד

**הרשמה לניוזלטר:**
- בכל דף (דרך קומפוננט Newsletter או Footer)
- הזנת אימייל → שמירה ב-localStorage
- הודעת הצלחה

---

## 🏗️ ארכיטקטורה כללית

### מבנה טכנולוגי

```
Next.js 14 (App Router)
    ↓
React Server Components (RSC) + Client Components
    ↓
Zustand (State Management) + localStorage
    ↓
Tailwind CSS (Styling)
    ↓
TypeScript (Type Safety)
```

### מודל הנתונים

**מוצרים (Products):**
- נתונים סטטיים מוגדרים ב-`data/products.ts`
- 22 מוצרים עם מאפיינים מלאים
- אין חיבור ל-database - הכל בקוד

**עגלת קניות (Cart):**
- ניהול מצב עם Zustand
- Persistence דרך localStorage
- Hydration בצד הלקוח
- פעולות: add, remove, updateQuantity, clear, getTotalItems, getTotalPrice

**ביקורות, שותפים, FAQ:**
- נתונים סטטיים ב-`data/` directory
- אין אפשרות להוספה דינמית (frontend-only)

### רינדור והידרציה

**Server Components (RSC):**
- דפי layout, דפי מוצרים סטטיים
- SEO metadata generation
- Static generation של דפי מוצרים (generateStaticParams)

**Client Components:**
- Header (עם תפריט מובייל וסל קניות)
- Footer (עם טופס newsletter)
- ProductCard (כפתור הוספה לעגלה)
- AddToCartSection (בחירת כמות והוספה)
- Shop page (פילטרים ומיונים)
- Cart page (ניהול העגלה)
- טפסים (Contact, Newsletter)

---

## 🎨 עקרונות עיצוב

### ערכת צבעים (Brand Colors)

```css
Primary Pink: #C04182    /* כפתורים עיקריים, קישורים, מבטאים */
Primary Turquoise: #49B4A3  /* כפתורים משניים, הדגשות */
Primary Mustard: #D0A32D    /* אקסנטים, גרדיאנטים */
Base Black: #1A1A1A        /* טקסט ראשי */
Base White: #F7F5F2        /* רקעים */
Light Gray: #E1E1E1        /* גבולות, פרידות */
```

### טיפוגרפיה

- **פונט:** Heebo (Google Fonts)
- תמיכה מלאה בעברית ולטינית
- משקלים: 300, 400, 500, 700
- אופטימיזציה עם `next/font` (display: swap)

### כיווניות (RTL)

- כל האתר ב-RTL מלא
- `<html lang="he" dir="rtl">`
- Tailwind עם תמיכה אוטומטית ב-RTL
- שימוש ב-`start`/`end` במקום `left`/`right`

### רספונסיביות

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- תפריט hamburger במובייל
- Grid משתנה: 1 → 2 → 3 → 4 עמודות

### אנימציות

- Fade-in לטעינת דפים
- Hover effects (scale, color transitions)
- Smooth scroll
- כיבוד `prefers-reduced-motion`

### תמונות רקע

כל דף עיקרי מקבל תמונת רקע ייחודית:
- `HomePage.png`
- `Shop.png`
- `Product.png`
- `checkout.png`
- `about.png`
- `contact.png`
- `faq.png`
- `partners.png`
- `reviews.png`
- `sale.png`

עם overlay לבן שקוף (85%-95%) לקריאות טובה.

---

## ♿ נגישות (Accessibility)

- **WCAG 2.1 compliance:**
  - שימוש סמנטי ב-HTML5
  - `aria-label` לאלמנטים אינטראקטיביים
  - Focus visible styles (outline turquoise)
  - כפתורי + / - עם aria-label
  - Alt text לתמונות
  - Color contrast מספק
- **Keyboard navigation:**
  - כל האלמנטים נגישים דרך מקלדת
  - Focus indicators ברורים
- **Screen readers:**
  - Structured headings (h1 → h6)
  - Semantic landmarks

---

## 🔍 SEO ואופטימיזציה

### Metadata

- **Title templates:** `%s | גרפיטי עיצובים`
- **Description:** תיאורים ייחודיים לכל דף
- **Keywords:** רלוונטיים לתחום
- **Open Graph tags:** מלאים עם תמונות
- **Twitter cards:** summary_large_image
- **Canonical URLs**
- **robots.txt**

### Structured Data (JSON-LD)

```json
{
  "@type": "Organization",
  "name": "גרפיטי עיצובים",
  "url": "https://graffiti-designs.vercel.app",
  "contactPoint": { "telephone": "+972-50-123-4567" },
  "sameAs": ["Instagram", "Facebook"]
}
```

### Performance

- Next.js Image optimization (next/image)
- Static generation של דפי מוצרים
- Font optimization (next/font)
- Lazy loading של תמונות
- Code splitting אוטומטי
- Responsive images עם sizes

---

## 📱 חוויית משתמש (UX)

### אלמנטים מרכזיים

1. **Navigation:**
   - Header קבוע (sticky) עם blur backdrop
   - לוגו עם gradient hover effect
   - קישורים בסגנון capsule pills
   - סל קניות עם badge מונה פריטים
   - Mobile menu עם אנימציה

2. **Product Discovery:**
   - כרטיסי מוצר עם hover effects
   - תגיות "מבצע X%" בולטות
   - תמונות איכותיות עם zoom on hover
   - Breadcrumbs לניווט חזרה

3. **Feedback:**
   - הודעות הצלחה ירוקות
   - מונה פריטים בעגלה
   - אינדיקטור "עוד X ₪ למשלוח חינם"
   - סטטוס מלאי ברור
   - Loading skeletons

4. **Call-to-Actions:**
   - כפתורים בצבעי המותג
   - הבחנה ויזואלית בין primary ו-secondary
   - Hover states ברורים
   - Disabled states למוצרים לא זמינים

---

## 🚀 מצב נוכחי ותכונות עתידיות

### ✅ מה עובד כרגע (Frontend-Only)

- ✅ גלישה מלאה באתר
- ✅ הצגת מוצרים עם פילטרים ומיונים
- ✅ עגלת קניות מתקדמת עם localStorage
- ✅ טפסים (שמירה מקומית בלבד)
- ✅ SEO מלא
- ✅ נגישות (WCAG 2.1)
- ✅ עיצוב רספונסיבי
- ✅ חוויית משתמש מלוטשת

### ⏳ מתוכנן לעתיד (Integrations)

**Backend & Database:**
- ⏳ **Supabase** - לניהול מוצרים, משתמשים, הזמנות
  - Products table
  - Orders table
  - Customers table
  - Reviews table (user-generated)
  - Newsletter subscribers

**תשלומים:**
- ⏳ **Stripe** - אינטגרציה לתשלומים מאובטחים
  - Checkout sessions
  - Payment intents
  - Webhooks לעדכון סטטוס הזמנות

**הנהלת חשבונות:**
- ⏳ **iCount API** - אינטגרציה למערכת הנהלת חשבונות ישראלית
  - יצירת חשבוניות אוטומטית
  - ניהול מלאי
  - דוחות מכירות

**תקשורת:**
- ⏳ **SMTP / Email Service** - שליחת מיילים
  - אישורי הזמנה
  - עדכוני משלוח
  - Newsletter campaigns
  - Contact form submissions

**אימות:**
- ⏳ **NextAuth.js / Supabase Auth** - הזדהות משתמשים
  - התחברות / הרשמה
  - פרופיל לקוח
  - היסטוריית הזמנות
  - Wishlist

---

## 📊 מטריקות ומעקב (עתידי)

רעיונות לאינטגרציות analytics:
- **Google Analytics** - מעקב תנועה
- **Hotjar / Microsoft Clarity** - heatmaps ו-session recordings
- **Meta Pixel** - מעקב קמפיינים
- **Google Tag Manager** - ניהול tags

---

## 💡 עקרונות פיתוח

1. **Type Safety:** כל הקוד ב-TypeScript עם טיפוסים מדויקים
2. **Component Reusability:** קומפוננטים מודולריים (Button, ProductCard, etc.)
3. **Separation of Concerns:** הפרדה בין UI, logic, data
4. **Performance First:** קוד מותאם, lazy loading, optimization
5. **Accessibility First:** נגישות כחלק בלתי נפרד
6. **Mobile First:** תחילה מובייל, אח"כ desktop
7. **SEO Optimized:** metadata מלא בכל דף
8. **User-Centric:** חוויית משתמש בראש סדר העדיפויות

---

## 📝 הערות חשובות למפתחים

### מגבלות נוכחיות
- אין backend - כל הנתונים סטטיים
- localStorage בלבד - נתונים לא משותפים בין מכשירים
- תמונות placeholder - צריך להחליף בתמונות אמיתיות
- תשלומים - כרגע רק alert, לא עובד באמת

### דברים שחשוב לדעת
- Cart state נשמר ב-localStorage → hydration בצד הלקוח בלבד
- כל דפי המוצרים מתוצרים statically (SSG)
- Background images צריכים להיות ב-`public/` directory
- פונט Heebo נטען אוטומטית (next/font)

### Deployment
- האתר מוכן ל-Vercel deployment
- אין צורך במשתני סביבה כרגע
- Build command: `npm run build`
- Start command: `npm start`

---

**סיכום:** Graffiti Designs הוא אתר e-commerce מודרני, מלוטש ומוכן לשימוש כ-frontend showcase. המבנה הקיים מאפשר הרחבה עתידית קלה עם backend, תשלומים ואינטגרציות נוספות.

