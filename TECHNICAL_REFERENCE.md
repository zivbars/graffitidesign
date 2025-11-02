# TECHNICAL_REFERENCE.md
## תיעוד טכני מלא - Graffiti Designs

---

## 📁 מבנה קבצים מפורט

```
graffiti-designs-main/
│
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx                # Root layout - RTL, metadata, fonts, JSON-LD
│   ├── page.tsx                  # דף הבית - Hero, featured products, reviews
│   ├── globals.css               # Global styles, Tailwind directives
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx             # 404 page
│   │
│   ├── about/
│   │   └── page.tsx              # דף אודות - סיפור המותג
│   ├── cart/
│   │   └── page.tsx              # עגלת קניות - Client Component
│   ├── contact/
│   │   └── page.tsx              # טופס יצירת קשר
│   ├── faq/
│   │   └── page.tsx              # שאלות נפוצות - Accordion component
│   ├── partners/
│   │   └── page.tsx              # רשימת שותפים עסקיים
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx          # דף מוצר דינמי (SSG)
│   ├── reviews/
│   │   └── page.tsx              # ביקורות לקוחות
│   ├── sale/
│   │   └── page.tsx              # מוצרים במבצע בלבד
│   └── shop/
│       └── page.tsx              # חנות - פילטרים, מיונים, lazy load
│
├── components/                   # React Components
│   ├── Accordion.tsx             # Accordion לשאלות נפוצות
│   ├── AddToCartSection.tsx      # Client - בחירת כמות והוספה לעגלה
│   ├── Button.tsx                # כפתור מעוצב עם variants
│   ├── Footer.tsx                # Footer עם newsletter
│   ├── Header.tsx                # Header עם navigation ו-cart badge
│   ├── ImageGallery.tsx          # גלריה לדף מוצר
│   ├── LoadingSkeleton.tsx       # Skeleton loader
│   ├── Newsletter.tsx            # טופס הרשמה לניוזלטר
│   ├── ProductCard.tsx           # כרטיס מוצר
│   └── ReviewCard.tsx            # כרטיס ביקורת
│
├── data/                         # Static Data (Mock)
│   ├── products.ts               # 22 מוצרים עם כל הפרטים
│   ├── reviews.ts                # ביקורות לקוחות (mock)
│   ├── faq.ts                    # שאלות ותשובות
│   └── partners.ts               # שותפים עסקיים
│
├── lib/                          # Utility Functions
│   ├── cn.ts                     # classNames merge utility
│   ├── currency.ts               # formatILS() - פורמט מחיר
│   ├── seo.ts                    # generateSEO() - metadata helper
│   └── slug.ts                   # URL slug utilities
│
├── stores/                       # Zustand State Management
│   └── cart.ts                   # Cart store עם localStorage persistence
│
├── types/                        # TypeScript Type Definitions
│   ├── product.ts                # Product, Category types
│   ├── cart.ts                   # CartItem type
│   └── review.ts                 # Review type
│
├── public/                       # Static Assets
│   ├── products/                 # תמונות מוצרים (placeholder)
│   ├── bg/                       # תמונות רקע
│   │   └── wood-light.jpg
│   ├── og-image.jpg              # Open Graph image
│   ├── robots.txt                # SEO
│   ├── HomePage.png
│   ├── Shop.png
│   ├── Product.png
│   ├── checkout.png
│   ├── about.png
│   ├── contact.png
│   ├── faq.png
│   ├── partners.png
│   ├── reviews.png
│   └── sale.png
│
├── node_modules/                 # Dependencies
│
├── package.json                  # NPM dependencies & scripts
├── package-lock.json             # Lock file
├── tsconfig.json                 # TypeScript config
├── next.config.mjs               # Next.js config
├── tailwind.config.ts            # Tailwind CSS config
├── postcss.config.mjs            # PostCSS config
├── next-env.d.ts                 # Next.js TypeScript declarations
└── README.md                     # Project documentation
```

---

## 🔧 תלויות וספריות (Dependencies)

### Production Dependencies (`dependencies`)

```json
{
  "next": "^14.2.0",           // React framework - App Router, SSG, SSR
  "react": "^18.3.0",          // UI library
  "react-dom": "^18.3.0",      // React DOM renderer
  "zustand": "^4.5.0"          // State management - lightweight, no boilerplate
}
```

**הסבר תלויות:**

1. **Next.js 14.2.0**
   - App Router (app/ directory)
   - React Server Components
   - Static Site Generation (SSG)
   - Image optimization (next/image)
   - Font optimization (next/font)
   - Built-in routing
   - Metadata API

2. **React 18.3.0**
   - Concurrent features
   - Suspense
   - Server Components support

3. **Zustand 4.5.0**
   - ניהול state פשוט ויעיל
   - אין providers / boilerplate
   - תמיכה ב-middleware
   - TypeScript-first

### Dev Dependencies (`devDependencies`)

```json
{
  "@types/node": "^20.0.0",            // Node.js types
  "@types/react": "^18.3.0",           // React types
  "@types/react-dom": "^18.3.0",       // React DOM types
  "typescript": "^5.0.0",              // TypeScript compiler
  "tailwindcss": "^3.4.0",             // Utility-first CSS
  "postcss": "^8.4.0",                 // CSS transformation
  "autoprefixer": "^10.4.0",           // CSS vendor prefixes
  "eslint": "^8.0.0",                  // Linting
  "eslint-config-next": "^14.2.0"      // Next.js ESLint rules
}
```

---

## 📜 Scripts (package.json)

```json
{
  "dev": "next dev",        // הרצת dev server (localhost:3000)
  "build": "next build",    // בנייה לפרודקשן
  "start": "next start",    // הרצת production server
  "lint": "next lint"       // הרצת ESLint
}
```

**שימוש:**
```bash
npm run dev       # פיתוח
npm run build     # בניה
npm run start     # פרודקשן
npm run lint      # בדיקת קוד
```

---

## 🗂️ Types & Interfaces (TypeScript)

### Product Type (`types/product.ts`)

```typescript
type Category = 
  | 'notebooks'
  | 'envelopes'
  | 'cards'
  | 'recipe-books'
  | 'magnets'
  | 'coasters';

interface Product {
  id: string;                  // Unique identifier
  slug: string;                // URL-friendly slug
  name: string;                // שם המוצר
  description: string;         // תיאור
  price: number;               // מחיר נוכחי (₪)
  compareAtPrice?: number;     // מחיר לפני הנחה (אופציונלי)
  isOnSale: boolean;           // האם במבצע
  category: Category;          // קטגוריה
  images: string[];            // מערך נתיבי תמונות
  inStock: boolean;            // סטטוס מלאי
  featured: boolean;           // מוצר מומלץ
  materials?: string;          // חומרים (אופציונלי)
  size?: string;               // גודל (אופציונלי)
}

const categoryNames: Record<Category, string> = {
  'notebooks': 'מחברות',
  'envelopes': 'מעטפות',
  'cards': 'כרטיסי ברכה',
  'recipe-books': 'ספרי מתכונים',
  'magnets': 'מגנטים',
  'coasters': 'תחתיות לכוסות',
};
```

### Cart Types (`types/cart.ts`)

```typescript
interface CartItem {
  id: string;          // Product ID
  slug: string;        // For navigation
  name: string;        // שם המוצר
  price: number;       // מחיר ליחידה
  image: string;       // תמונה ראשית
  quantity: number;    // כמות
}
```

### Review Type (`types/review.ts`)

```typescript
interface Review {
  id: string;      // Unique ID
  name: string;    // שם הלקוח
  rating: number;  // דירוג (1-5)
  text: string;    // תוכן הביקורת
  date: string;    // תאריך (ISO string)
}
```

---

## 🏪 Zustand Store - Cart Management

**קובץ:** `stores/cart.ts`

### State Interface

```typescript
interface CartState {
  items: CartItem[];              // רשימת פריטים בעגלה
  isHydrated: boolean;            // האם נטען מ-localStorage
  add: (item) => void;            // הוספת מוצר
  remove: (id: string) => void;   // הסרת מוצר
  updateQuantity: (id, qty) => void;  // עדכון כמות
  clear: () => void;              // ריקון העגלה
  getTotalItems: () => number;    // סה"כ פריטים
  getTotalPrice: () => number;    // סה"כ מחיר
  hydrate: () => void;            // טעינה מ-localStorage
}
```

### Actions מפורטות

1. **`add(item)`**
   - אם המוצר כבר קיים → מוסיף לכמות
   - אם לא → מוסיף פריט חדש
   - שומר ב-localStorage

2. **`remove(id)`**
   - מסיר פריט לפי ID
   - מעדכן localStorage

3. **`updateQuantity(id, quantity)`**
   - אם quantity <= 0 → קורא ל-remove()
   - אחרת → מעדכן כמות
   - שומר ב-localStorage

4. **`clear()`**
   - מרוקן את items[]
   - מוחק מ-localStorage

5. **`getTotalItems()`**
   - מחזיר סכום של כל item.quantity

6. **`getTotalPrice()`**
   - מחזיר sum(item.price * item.quantity)

7. **`hydrate()`**
   - נקרא ב-useEffect בצד הלקוח
   - טוען items מ-localStorage
   - מסמן isHydrated = true

### שימוש בקומפוננטות

```typescript
'use client';
import { useCart } from '@/stores/cart';

const items = useCart((state) => state.items);
const add = useCart((state) => state.add);
const getTotalItems = useCart((state) => state.getTotalItems);
```

---

## 🧩 Components מפורטים

### Button Component (`components/Button.tsx`)

**Props:**
```typescript
{
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;  // Tailwind classes נוספים
  children: ReactNode;
}
```

**Variants:**
- `primary` → רקע ורוד, טקסט לבן
- `secondary` → רקע טורקיז, טקסט לבן
- `outline` → גבול ורוד, טקסט ורוד, hover → רקע ורוד

**Sizes:**
- `sm` → px-4 py-2, text-sm
- `md` → px-6 py-3, text-base
- `lg` → px-8 py-4, text-lg

### Header Component (`components/Header.tsx`)

**Features:**
- Client Component (`'use client'`)
- Fixed sticky header עם backdrop blur
- Desktop: קישורי ניווט בסגנון pills
- Mobile: hamburger menu עם dropdown
- Cart badge עם מונה פריטים
- Active link highlighting
- Zustand hydration ב-useEffect

**Navigation Links:**
```javascript
[
  { href: '/', label: 'בית' },
  { href: '/shop', label: 'חנות' },
  { href: '/about', label: 'עלינו' },
  { href: '/sale', label: 'מבצעים' },
  { href: '/reviews', label: 'ביקורות' },
  { href: '/partners', label: 'שותפים' },
  { href: '/faq', label: 'שאלות נפוצות' },
  { href: '/contact', label: 'צור קשר' },
]
```

### Footer Component (`components/Footer.tsx`)

**Sections:**
1. Brand info
2. Quick links
3. Newsletter form (localStorage)

**Newsletter Flow:**
- הזנת email → preventDefault
- שמירה ב-`localStorage.newsletters`
- הודעת הצלחה 3 שניות

### ProductCard Component (`components/ProductCard.tsx`)

**Props:**
```typescript
{
  product: Product;
  onAddToCart?: () => void;  // אופציונלי
}
```

**Features:**
- Sale badge עם אחוז הנחה
- תמונה עם hover scale
- מחיר (עם/בלי הנחה)
- 2 כפתורים: "לפרטים" + "הוסף לעגלה"
- Disabled state למוצרים שלא במלאי

### AddToCartSection Component (`components/AddToCartSection.tsx`)

**Client Component לדף מוצר:**
- Input number לבחירת כמות
- כפתור "הוסף לעגלה"
- קריאה ל-`useCart().add()`
- הודעת הצלחה זמנית

### ImageGallery Component (`components/ImageGallery.tsx`)

**Features:**
- תמונה ראשית גדולה
- Thumbnails למטה (אם יש יותר מתמונה אחת)
- קליק על thumbnail → מחליף תמונה ראשית
- next/image עם fill + object-cover

### Accordion Component (`components/Accordion.tsx`)

**Usage בדף FAQ:**
- רשימת שאלות ותשובות
- קליק → פתיחה/סגירה
- אנימציה עדינה
- אייקון +/- משתנה

---

## 🛠️ Utility Functions (lib/)

### `formatILS(price: number): string`
**קובץ:** `lib/currency.ts`

```typescript
export const formatILS = (price: number): string => {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    minimumFractionDigits: 0,
  }).format(price);
};
```

**Output:** `"₪45"`, `"₪120"`

### `generateSEO(props): Metadata`
**קובץ:** `lib/seo.ts`

```typescript
interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}
```

**Returns:** Next.js Metadata object עם:
- title
- description
- openGraph (OG tags)
- twitter (Twitter cards)

**שימוש:**
```typescript
export const metadata: Metadata = generateSEO({
  title: 'דף הבית',
  description: 'מוצרי דפוס...',
  url: 'https://graffiti-designs.vercel.app',
});
```

### `cn(...inputs): string`
**קובץ:** `lib/cn.ts`

Merge של class names עם Tailwind.
מבוסס על `clsx` / `classnames` pattern.

**שימוש:**
```typescript
cn('base-class', condition && 'conditional-class', props.className)
```

### Slug utilities
**קובץ:** `lib/slug.ts`

פונקציות ליצירת slugs מ-strings (אם נדרש).

---

## 🎨 Tailwind Configuration

**קובץ:** `tailwind.config.ts`

```typescript
{
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          pink: "#C04182",
          turquoise: "#49B4A3",
          mustard: "#D0A32D",
        },
        base: {
          black: "#1A1A1A",
          white: "#F7F5F2",
          gray: "#E1E1E1",
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
}
```

**שימוש:**
```html
<div className="bg-primary-pink text-base-white animate-fadeIn">
```

---

## 🌐 Next.js Configuration

**קובץ:** `next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // No special config needed currently
};

export default nextConfig;
```

**אפשרויות עתידיות:**
- `images.domains` - לתמונות חיצוניות
- `env` - משתני סביבה
- `redirects` - redirects
- `headers` - security headers

---

## 📊 Data Structures (data/)

### Products (`data/products.ts`)

**22 מוצרים בפורמט:**
```typescript
{
  id: '1',
  slug: 'notebook-floral-a5',
  name: 'מחברת פרחים A5',
  description: '...',
  price: 45,
  compareAtPrice: 60,
  isOnSale: true,
  category: 'notebooks',
  images: ['/products/notebook-1.jpg'],
  inStock: true,
  featured: true,
  materials: 'נייר איכותי 80 גרם, כריכה קשה',
  size: 'A5 (14.8 x 21 ס"מ)',
}
```

**Categories distribution:**
- 5 מחברות
- 4 מעטפות
- 5 כרטיסי ברכה
- 2 ספרי מתכונים
- 3 מגנטים
- 4 תחתיות לכוסות (coasters)

### Reviews (`data/reviews.ts`)

```typescript
{
  id: '1',
  name: 'שרה לוי',
  rating: 5,
  text: 'איכות מעולה...',
  date: '2025-01-15',
}
```

### FAQ (`data/faq.ts`)

```typescript
{
  question: 'מה זמן האספקה?',
  answer: '3-5 ימי עסקים...',
}
```

### Partners (`data/partners.ts`)

```typescript
{
  id: '1',
  name: 'רשת שטייגר',
  logo: '/partners/steimatzky.png',
  description: '...',
  website: 'https://...',
}
```

---

## 🔐 localStorage Schema

### Cart Storage
**Key:** `"cart"`

```json
[
  {
    "id": "1",
    "slug": "notebook-floral-a5",
    "name": "מחברת פרחים A5",
    "price": 45,
    "image": "/products/notebook-1.jpg",
    "quantity": 2
  }
]
```

### Newsletter Storage
**Key:** `"newsletters"`

```json
[
  {
    "email": "user@example.com",
    "date": "2025-01-20T10:30:00.000Z"
  }
]
```

### Contact Form Storage
**Key:** `"contactForms"` (או דומה)

```json
[
  {
    "name": "ישראל ישראלי",
    "email": "israel@example.com",
    "message": "שאלה...",
    "date": "2025-01-20T14:00:00.000Z"
  }
]
```

---

## 🚀 Routing (App Router)

### Static Routes

| Path | File | Type | Description |
|------|------|------|-------------|
| `/` | `app/page.tsx` | RSC | דף הבית |
| `/shop` | `app/shop/page.tsx` | Client | חנות עם פילטרים |
| `/cart` | `app/cart/page.tsx` | Client | עגלת קניות |
| `/about` | `app/about/page.tsx` | RSC | אודות |
| `/contact` | `app/contact/page.tsx` | Client | צור קשר |
| `/faq` | `app/faq/page.tsx` | RSC | שאלות נפוצות |
| `/reviews` | `app/reviews/page.tsx` | RSC | ביקורות |
| `/sale` | `app/sale/page.tsx` | RSC | מבצעים |
| `/partners` | `app/partners/page.tsx` | RSC | שותפים |

### Dynamic Routes

| Path | File | Generation | Description |
|------|------|-----------|-------------|
| `/product/[slug]` | `app/product/[slug]/page.tsx` | SSG | דפי מוצרים (22 דפים) |

**generateStaticParams:**
```typescript
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}
```

זה מייצר 22 דפים סטטיים בזמן build.

---

## 🎯 SEO Implementation

### Root Layout Metadata (`app/layout.tsx`)

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://graffiti-designs.vercel.app'),
  title: {
    default: 'גרפיטי עיצובים - מוצרי דפוס בעיצוב ייחודי',
    template: '%s | גרפיטי עיצובים',
  },
  description: '...',
  keywords: ['מוצרי דפוס', 'מחברות', ...],
  authors: [{ name: 'גרפיטי עיצובים' }],
  openGraph: { ... },
  twitter: { ... },
  robots: { index: true, follow: true },
};
```

### JSON-LD Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "גרפיטי עיצובים",
  "url": "https://graffiti-designs.vercel.app",
  "contactPoint": { ... },
  "sameAs": [ "Instagram URL", "Facebook URL" ]
}
```

### Per-Page Metadata

כל page יכול לייצא:
```typescript
export const metadata: Metadata = generateSEO({
  title: 'כותרת הדף',
  description: 'תיאור',
});
```

---

## 🔌 Future Integrations (רשימת MCPs)

### 1️⃣ Supabase Integration

**מטרה:** Database, Authentication, Storage

**Tables מתוכננות:**

```sql
-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2),
  is_on_sale BOOLEAN DEFAULT false,
  category TEXT NOT NULL,
  images TEXT[], -- Array of image URLs
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  materials TEXT,
  size TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  status TEXT DEFAULT 'pending', -- pending, paid, shipped, delivered
  subtotal DECIMAL(10,2),
  shipping DECIMAL(10,2),
  total DECIMAL(10,2),
  shipping_option TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- Customers
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews (user-generated)
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id),
  customer_id UUID REFERENCES customers(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW()
);
```

**Supabase Client Setup:**
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**משתני סביבה:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

---

### 2️⃣ Stripe Integration

**מטרה:** תשלומים מאובטחים

**Setup:**
```bash
npm install stripe @stripe/stripe-js
```

**Stripe Client:**
```typescript
// lib/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
```

**Server-side Stripe:**
```typescript
// lib/stripe-server.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});
```

**Checkout Flow:**
1. לקוח לוחץ "המשך לתשלום"
2. יצירת Checkout Session:
```typescript
// app/api/checkout/route.ts
import { stripe } from '@/lib/stripe-server';

export async function POST(req: Request) {
  const { items } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'ils',
        product_data: { name: item.name },
        unit_amount: item.price * 100, // Agorot
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get('origin')}/cart`,
  });

  return Response.json({ sessionId: session.id });
}
```

3. Redirect ל-Stripe Checkout
4. Webhook לעדכון הזמנה

**Webhook:**
```typescript
// app/api/webhooks/stripe/route.ts
import { stripe } from '@/lib/stripe-server';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === 'checkout.session.completed') {
    // עדכן order status ב-Supabase
  }

  return Response.json({ received: true });
}
```

**משתני סביבה:**
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

---

### 3️⃣ iCount API Integration

**מטרה:** הנהלת חשבונות ישראלית, חשבוניות

**Documentation:** https://api.icount.co.il/docs

**Setup:**
```typescript
// lib/icount.ts
const ICOUNT_API_URL = 'https://api.icount.co.il/api/v3.php';

export async function createInvoice(orderData: any) {
  const response = await fetch(ICOUNT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cid: process.env.ICOUNT_COMPANY_ID,
      user: process.env.ICOUNT_USER,
      pass: process.env.ICOUNT_PASS,
      action: 'create_doc',
      doc_type: 'invoice',
      client_name: orderData.customerName,
      client_email: orderData.customerEmail,
      items: orderData.items.map(item => ({
        description: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    }),
  });

  return await response.json();
}
```

**Flow:**
1. הזמנה מתקבלת (Stripe webhook)
2. יצירת חשבונית ב-iCount
3. שליחת חשבונית ללקוח באימייל

**משתני סביבה:**
```bash
ICOUNT_COMPANY_ID=xxx
ICOUNT_USER=xxx
ICOUNT_PASS=xxx
```

---

### 4️⃣ Email Service (SMTP / SendGrid / Resend)

**מטרה:** שליחת מיילים (אישורי הזמנה, ניוזלטר)

**אופציה 1: Resend (מומלץ)**
```bash
npm install resend
```

```typescript
// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(order: any) {
  await resend.emails.send({
    from: 'Graffiti Designs <orders@graffiti-designs.co.il>',
    to: order.customerEmail,
    subject: 'אישור הזמנה - גרפיטי עיצובים',
    html: `
      <h1>תודה על ההזמנה!</h1>
      <p>הזמנה מספר: ${order.id}</p>
      <p>סה"כ: ${formatILS(order.total)}</p>
    `,
  });
}

export async function sendNewsletter(subscribers: string[], content: string) {
  await resend.emails.send({
    from: 'Graffiti Designs <newsletter@graffiti-designs.co.il>',
    to: subscribers,
    subject: 'עדכון שבועי מגרפיטי עיצובים',
    html: content,
  });
}
```

**משתני סביבה:**
```bash
RESEND_API_KEY=re_xxx
```

---

### 5️⃣ Google Analytics / Microsoft Clarity

**GA4:**
```typescript
// app/layout.tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

**Microsoft Clarity:**
```typescript
<Script id="clarity-script">
  {`
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "CLARITY_ID");
  `}
</Script>
```

---

### 6️⃣ NextAuth.js (Authentication)

**Setup:**
```bash
npm install next-auth @auth/supabase-adapter
```

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Supabase adapter for storing sessions
});

export { handler as GET, handler as POST };
```

---

## 🧪 Testing (עתידי)

**מומלץ:**
- **Vitest** - unit testing
- **Playwright** - E2E testing
- **React Testing Library** - component testing

**Setup:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
```

---

## 📦 Build & Deployment

### Build Process

```bash
npm run build
```

**Output:**
```
.next/
├── cache/
├── server/
│   └── app/
│       ├── page.html          # Static HTML
│       ├── shop.html
│       └── product/
│           └── [slug].html    # 22 static pages
└── static/
```

### Vercel Deployment

**1. GitHub Integration:**
- Push לריפו GitHub
- חבר ל-Vercel account
- Auto-deploy על כל push

**2. CLI:**
```bash
npm i -g vercel
vercel
```

**Environment Variables בפרודקשן:**
- הוסף ב-Vercel Dashboard → Settings → Environment Variables

**Vercel Config (אופציונלי):**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

---

## 🔍 Debugging & Development

### Next.js Dev Tools

```bash
npm run dev -- --turbo  # Turbopack (faster)
```

### React DevTools
- התקן extension: React Developer Tools
- Zustand DevTools middleware (אופציונלי)

### Logging

```typescript
// Development only
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

---

## 📋 Checklist לפני Launch

### Frontend
- ✅ כל הדפים עובדים
- ✅ רספונסיבי בכל הגדלים
- ✅ נגישות (WCAG 2.1)
- ✅ SEO metadata
- ⏳ תמונות אמיתיות (לא placeholders)
- ⏳ תוכן סופי (טקסטים, מחירים)

### Backend (עתידי)
- ⏳ Supabase setup
- ⏳ Stripe setup
- ⏳ Email service
- ⏳ iCount integration
- ⏳ Environment variables configured
- ⏳ Webhooks tested

### Performance
- ✅ Image optimization (next/image)
- ✅ Font optimization (next/font)
- ✅ Code splitting
- ⏳ Lighthouse score > 90

### Security
- ⏳ HTTPS only
- ⏳ Environment variables secured
- ⏳ CORS configured
- ⏳ Rate limiting on APIs
- ⏳ Input validation

---

## 🆘 Common Issues & Solutions

### Issue 1: Hydration Mismatch
**Problem:** `useCart()` בצד שרת מחזיר [] אבל בצד לקוח יש items

**Solution:** 
```typescript
const isHydrated = useCart((state) => state.isHydrated);
if (!isHydrated) return <Loading />;
```

### Issue 2: localStorage undefined (SSR)
**Problem:** `localStorage is not defined`

**Solution:**
```typescript
if (typeof window !== 'undefined') {
  localStorage.setItem('key', 'value');
}
```

### Issue 3: תמונות לא נטענות
**Problem:** 404 על `/products/image.jpg`

**Solution:** ודא שהתמונות ב-`public/products/` ולא ב-`assets/`

---

## 📚 Resources & Links

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Zustand:** https://docs.pmnd.rs/zustand
- **Supabase:** https://supabase.com/docs
- **Stripe:** https://stripe.com/docs
- **Vercel:** https://vercel.com/docs

---

## 👨‍💻 Development Workflow

### סדר עדיפויות לעבודה:

1. **Phase 1 - Content (כרגע):**
   - החלפת תמונות placeholder באמיתיות
   - עדכון תוכן (טקסטים, מחירים)
   - בדיקת נגישות

2. **Phase 2 - Backend:**
   - Setup Supabase
   - העברת mock data ל-database
   - API routes לטעינת מוצרים

3. **Phase 3 - Payments:**
   - Stripe integration
   - Checkout flow מלא
   - Webhooks

4. **Phase 4 - Automation:**
   - iCount integration
   - Email automation
   - Admin dashboard (ניהול מוצרים/הזמנות)

5. **Phase 5 - Growth:**
   - Analytics
   - A/B testing
   - Marketing integrations

---

**סיכום טכני:** האתר בנוי בצורה מודולרית, מסודרת ומוכנה להרחבה. המבנה הקיים מאפשר הוספת backend ואינטגרציות בלי לשנות את ה-frontend הקיים.

