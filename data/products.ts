import { Product } from '@/types/product';

export const products: Product[] = [
  // ספרי מתכונים (Recipe Books)
  {
    id: '11',
    slug: 'recipe-book-family',
    name: 'ספר המתכונים המשפחתי',
    description: 'ספר מתכונים מעוצב עם 120 עמודים לתיעוד המתכונים האהובים שלכם.',
    price: 20.00,
    isOnSale: false,
    category: 'recipe-books',
    images: [
      '/products/comr/ספר מתכונים 1.jpg',
      '/products/back/ספר מתכונים 1.jpg'
    ],
    inStock: true,
    featured: true,
    materials: 'כריכה קשה, נייר 120 גרם',
    size: 'A4 (21 x 29.7 ס"מ)',
  },
  {
    id: '12',
    slug: 'recipe-book-baking',
    name: 'ספר מתכונים לאפייה',
    description: 'ספר מתכונים מיוחד לאפייה עם חלוקה לקטגוריות וטיפים שימושיים.',
    price: 20.00,
    isOnSale: false,
    category: 'recipe-books',
    images: [
      '/products/comr/ספר מתכונים 2.jpg',
      '/products/back/ספר מתכונים 2.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'כריכה קשה, נייר מצופה',
    size: '20 x 25 ס"מ',
  },

  // כרטיסי ברכה (Greeting Cards)
  {
    id: '7',
    slug: 'birthday-card-balloons',
    name: 'כרטיס ברכה יום הולדת - בלונים',
    description: 'כרטיס ברכה מעוצב עם איור בלונים צבעוניים. כולל מעטפה תואמת.',
    price: 5.00,
    isOnSale: false,
    category: 'cards',
    images: [
      '/products/comr/כרטיס ברכה יום הולדת 1.jpg',
      '/products/back/כרטיס ברכה יום הולדת 1.jpg'
    ],
    inStock: true,
    featured: true,
    materials: 'קרטון 300 גרם, ציפוי מט',
    size: '15 x 20 ס"מ',
  },
  {
    id: '7b',
    slug: 'birthday-card-celebration',
    name: 'כרטיס ברכה יום הולדת - חגיגי',
    description: 'כרטיס ברכה מעוצב בסגנון חגיגי. כולל מעטפה תואמת.',
    price: 5.00,
    isOnSale: false,
    category: 'cards',
    images: [
      '/products/comr/כרטיס יום הולדת 2.jpg',
      '/products/back/כרטיס יום הולדת 2.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'קרטון 300 גרם, ציפוי מט',
    size: '15 x 20 ס"מ',
  },
  {
    id: '8',
    slug: 'wedding-card-elegant',
    name: 'כרטיס ברכה לחתונה - אלגנטי',
    description: 'כרטיס ברכה מעודן לחתונה עם הטבעת זהב. מגיע בקופסת מתנה.',
    price: 5.00,
    isOnSale: false,
    category: 'cards',
    images: [
      '/products/comr/כרטיס ברכה חתונה 1.jpg',
      '/products/back/כרטיס ברכה חתונה 1.jpg'
    ],
    inStock: true,
    featured: true,
    materials: 'קרטון פרימיום 350 גרם, הטבעה',
    size: '12 x 18 ס"מ',
  },
  {
    id: '8b',
    slug: 'wedding-card-classic',
    name: 'כרטיס ברכה לחתונה - קלאסי',
    description: 'כרטיס ברכה קלאסי לחתונה בעיצוב מעודן.',
    price: 5.00,
    isOnSale: false,
    category: 'cards',
    images: [
      '/products/comr/כרטיס ברכה חתונה 2.jpg',
      '/products/back/כרטיס ברכה חתונה 2.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'קרטון פרימיום 350 גרם',
    size: '12 x 18 ס"מ',
  },
  {
    id: '23',
    slug: 'card-brit-ceremony',
    name: 'כרטיס ברכה לברית',
    description: 'כרטיס ברכה מעוצב לטקס ברית מילה.',
    price: 5.00,
    isOnSale: false,
    category: 'cards',
    images: [
      '/products/comr/כרטיס ברכה ברית 1.jpg',
      '/products/back/כרטיס ברכה ברית 1.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'קרטון 300 גרם',
    size: '14 x 20 ס"מ',
  },
  {
    id: '24',
    slug: 'card-brit-bat-ceremony',
    name: 'כרטיס ברכה לברית בת',
    description: 'כרטיס ברכה מעוצב לטקס ברית בת.',
    price: 5.00,
    isOnSale: false,
    category: 'cards',
    images: [
      '/products/comr/כרטיס ברכה בריתה 1.jpg',
      '/products/back/כרטיס ברכה בריתה 1.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'קרטון 300 גרם',
    size: '14 x 20 ס"מ',
  },
  {
    id: '25',
    slug: 'card-bat-mitzvah',
    name: 'כרטיס ברכה לבת מצווה',
    description: 'כרטיס ברכה אלגנטי לבת מצווה.',
    price: 5.00,
    isOnSale: false,
    category: 'cards',
    images: [
      '/products/comr/כרטיס ברכה בת מצווה 1.jpg',
      '/products/back/כרטיס ברכה בת מצווה 1.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'קרטון 300 גרם',
    size: '15 x 21 ס"מ',
  },

  // מגנטים (Magnets)
  {
    id: '13',
    slug: 'magnet-set-quotes',
    name: 'סט מגנטים עם ציטוטים - 1',
    description: 'סט של מגנטים עם ציטוטים מעוררי השראה בעברית.',
    price: 11.90,
    isOnSale: false,
    category: 'magnets',
    images: [
      '/products/comr/מגנטים למקרר 1.jpg',
      '/products/back/מגנטים למקרר 1.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'מגנט גמיש, הדפסה איכותית',
    size: '5 x 7 ס"מ כל אחד',
  },
  {
    id: '14',
    slug: 'magnet-calendar',
    name: 'מגנט לוח שנה',
    description: 'מגנט לוח שנה שימושי למקרר עם עיצוב צבעוני.',
    price: 11.90,
    isOnSale: false,
    category: 'magnets',
    images: [
      '/products/comr/מגנטים למקרר 2.jpg',
      '/products/back/מגנטים למקרר 2.jpg'
    ],
    inStock: true,
    featured: true,
    materials: 'מגנט חזק, למינציה',
    size: '15 x 20 ס"מ',
  },
  {
    id: '15',
    slug: 'magnet-flowers',
    name: 'מגנטים בעיצוב פרחים',
    description: 'סט מגנטים עגולים עם איורים מקסימים.',
    price: 11.90,
    isOnSale: false,
    category: 'magnets',
    images: [
      '/products/comr/מגנטים למקרר 3.jpg',
      '/products/back/מגנטים למקרר 3.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'מגנט עגול, הדפסה UV',
    size: '6 ס"מ קוטר',
  },
  {
    id: '15b',
    slug: 'magnet-set-colorful',
    name: 'סט מגנטים צבעוני',
    description: 'סט מגנטים מעוצב בצבעים עזים.',
    price: 11.90,
    isOnSale: false,
    category: 'magnets',
    images: [
      '/products/comr/מגנטים למקרר 4.jpg',
      '/products/back/מגנטים למקרר 4.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'מגנט גמיש, הדפסה איכותית',
    size: '5 x 7 ס"מ כל אחד',
  },
  {
    id: '15c',
    slug: 'magnet-set-artistic',
    name: 'סט מגנטים אומנותי',
    description: 'סט מגנטים בעיצוב אומנותי ייחודי.',
    price: 11.90,
    isOnSale: false,
    category: 'magnets',
    images: [
      '/products/comr/מגנטים למקרר 5.jpg',
      '/products/back/מגנטים למקרר 5.jpg'
    ],
    inStock: true,
    featured: true,
    materials: 'מגנט גמיש, הדפסה איכותית',
    size: '5 x 7 ס"מ כל אחד',
  },

  // מארזי מעטפות ואיגרות (Envelope & Letter Sets) - Renamed with professional branding
  {
    id: '32',
    slug: 'envelope-letter-set-1',
    name: 'מארז "פריחה" - מעטפות ואיגרות',
    description: 'מארז מעוצב הכולל 8 מעטפות ו-8 איגרות תואמות. מושלם למכתבים אישיים.',
    price: 15.90,
    isOnSale: false,
    category: 'envelopes',
    images: [
      '/products/comr/מארז 8 מעטפות ו8 איגרות 1.PNG',
      '/products/back/מארז 8 מעטפות ו8 איגרות 1.jpg'
    ],
    inStock: true,
    featured: true,
    materials: 'נייר איכותי 120 גרם',
    size: '16 x 23 ס"מ',
  },
  {
    id: '33',
    slug: 'envelope-letter-set-2',
    name: 'מארז "הרמוניה" - מעטפות ואיגרות',
    description: 'מארז מעוצב הכולל 8 מעטפות ו-8 איגרות תואמות.',
    price: 15.90,
    isOnSale: false,
    category: 'envelopes',
    images: [
      '/products/comr/מארז 8 מעטפות ו8 איגרות 2.jpg',
      '/products/back/מארז 8 מעטפות ו8 איגרות 2.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'נייר איכותי 120 גרם',
    size: '16 x 23 ס"מ',
  },
  {
    id: '34',
    slug: 'envelope-letter-set-3',
    name: 'מארז "קלאסי" - מעטפות ואיגרות',
    description: 'מארז מעוצב הכולל 8 מעטפות ו-8 איגרות תואמות.',
    price: 15.90,
    isOnSale: false,
    category: 'envelopes',
    images: [
      '/products/comr/מארז 8 מעטפות ו8 איגרות 3.jpg',
      '/products/back/מארז 8 מעטפות ו8 איגרות 3.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'נייר איכותי 120 גרם',
    size: '16 x 23 ס"מ',
  },
  {
    id: '35',
    slug: 'envelope-letter-set-5',
    name: 'מארז "רומנטיקה" - מעטפות ואיגרות',
    description: 'מארז מעוצב הכולל 8 מעטפות ו-8 איגרות תואמות.',
    price: 15.90,
    isOnSale: false,
    category: 'envelopes',
    images: [
      '/products/comr/מארז 8 מעטפות ו8 איגרות 5.jpg',
      '/products/back/מארז 8 מעטפות ו8 איגרות 5.jpg'
    ],
    inStock: true,
    featured: true,
    materials: 'נייר איכותי 120 גרם',
    size: '16 x 23 ס"מ',
  },
  {
    id: '36',
    slug: 'envelope-letter-set-6',
    name: 'מארז "אלגנט" - מעטפות ואיגרות',
    description: 'מארז מעוצב הכולל 8 מעטפות ו-8 איגרות תואמות.',
    price: 15.90,
    isOnSale: false,
    category: 'envelopes',
    images: [
      '/products/comr/מארז 8 מעטפות ו8 איגרות 6.jpg',
      '/products/back/מארז 8 מעטפות ו8 איגרות 6.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'נייר איכותי 120 גרם',
    size: '16 x 23 ס"מ',
  },
  {
    id: '37',
    slug: 'envelope-letter-set-7',
    name: 'מארז "מודרני" - מעטפות ואיגרות',
    description: 'מארז מעוצב הכולל 8 מעטפות ו-8 איגרות תואמות.',
    price: 15.90,
    isOnSale: false,
    category: 'envelopes',
    images: [
      '/products/comr/מארז 8 מעטפות ו8 איגרות 7.jpg',
      '/products/back/מארז 8 מעטפות ו8 איגרות 7.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'נייר איכותי 120 גרם',
    size: '16 x 23 ס"מ',
  },
  {
    id: '38',
    slug: 'envelope-letter-set-8',
    name: 'מארז "וינטג׳" - מעטפות ואיגרות',
    description: 'מארז מעוצב הכולל 8 מעטפות ו-8 איגרות תואמות.',
    price: 15.90,
    isOnSale: false,
    category: 'envelopes',
    images: [
      '/products/comr/מארז 8 מעטפות ו8 איגרות 8.jpg',
      '/products/back/מארז 8 מעטפות ו8 איגרות 8.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'נייר איכותי 120 גרם',
    size: '16 x 23 ס"מ',
  },
  {
    id: '39',
    slug: 'envelope-letter-set-9',
    name: 'מארז "טבע" - מעטפות ואיגרות',
    description: 'מארז מעוצב הכולל 8 מעטפות ו-8 איגרות תואמות.',
    price: 15.90,
    isOnSale: false,
    category: 'envelopes',
    images: [
      '/products/comr/מארז 8 מעטפות ו8 איגרות 9.jpg',
      '/products/back/מארז 8 מעטפות ו8 איגרות 9.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'נייר איכותי 120 גרם',
    size: '16 x 23 ס"מ',
  },
  {
    id: '40',
    slug: 'envelope-letter-set-10',
    name: 'מארז "אקולוגי" - מעטפות ואיגרות',
    description: 'מארז מעוצב הכולל 8 מעטפות ו-8 איגרות תואמות.',
    price: 15.90,
    isOnSale: false,
    category: 'envelopes',
    images: [
      '/products/comr/מארז 8 מעטפות ו8 איגרות 10.PNG',
      '/products/back/מארז 8 מעטפות ו8 איגרות 10.jpg'
    ],
    inStock: true,
    featured: true,
    materials: 'נייר איכותי 120 גרם',
    size: '16 x 23 ס"מ',
  },
  {
    id: '41',
    slug: 'envelope-letter-set-11',
    name: 'מארז "מינימליסט" - מעטפות ואיגרות',
    description: 'מארז מעוצב הכולל 8 מעטפות ו-8 איגרות תואמות.',
    price: 15.90,
    isOnSale: false,
    category: 'envelopes',
    images: [
      '/products/comr/מארז 8 מעטפות ו8 איגרות 11.jpg',
      '/products/back/מארז 8 מעטפות ו8 איגרות 11.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'נייר איכותי 120 גרם',
    size: '16 x 23 ס"מ',
  },
  {
    id: '42',
    slug: 'envelope-letter-set-12',
    name: 'מארז "פרימיום" - מעטפות ואיגרות',
    description: 'מארז מעוצב מיוחד הכולל 8 מעטפות ו-8 איגרות תואמות עם עיצוב נוסף.',
    price: 15.90,
    isOnSale: false,
    category: 'envelopes',
    images: [
      '/products/comr/מארז 8 מעטפות ו8 איגרות 12.jpg',
      '/products/back/מארז 8 מעטפות ו8 איגרות 12.jpg',
      '/products/back/מארז 8 מעטפות ו8 איגרות 12O.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'נייר איכותי 120 גרם',
    size: '16 x 23 ס"מ',
  },
  {
    id: '43',
    slug: 'envelope-letter-set-13',
    name: 'מארז "אומנות" - מעטפות ואיגרות',
    description: 'מארז מעוצב הכולל 8 מעטפות ו-8 איגרות תואמות.',
    price: 15.90,
    isOnSale: false,
    category: 'envelopes',
    images: [
      '/products/comr/מארז 8 מעטפות ו8 איגרות 13.jpg',
      '/products/back/מארז 8 מעטפות ו8 איגרות 13.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'נייר איכותי 120 גרם',
    size: '16 x 23 ס"מ',
  },
  {
    id: '44',
    slug: 'envelope-letter-set-14',
    name: 'מארז "שיק" - מעטפות ואיגרות',
    description: 'מארז מעוצב הכולל 8 מעטפות ו-8 איגרות תואמות.',
    price: 15.90,
    isOnSale: false,
    category: 'envelopes',
    images: [
      '/products/comr/מארז 8 מעטפות ו8 איגרות 14.jpg',
      '/products/back/מארז 8 מעטפות ו8 איגרות 14.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'נייר איכותי 120 גרם',
    size: '16 x 23 ס"מ',
  },

  // לוחות תכנון (Planners)
  {
    id: '26',
    slug: 'daily-planner-desk',
    name: 'לוח תכנון יומי - שולחני',
    description: 'לוח תכנון יומי לשולחן העבודה. עיצוב נקי ופונקציונלי.',
    price: 14.90,
    isOnSale: false,
    category: 'planners',
    images: [
      '/products/comr/לוח תכנון יומי 1.jpg',
      '/products/back/לוח תכנון יומי 1.jpg'
    ],
    inStock: true,
    featured: true,
    materials: 'נייר 120 גרם, בסיס קרטון',
    size: 'A4 (21 x 29.7 ס"מ)',
  },
  {
    id: '27',
    slug: 'daily-planner-modern',
    name: 'לוח תכנון יומי - מודרני',
    description: 'לוח תכנון יומי בעיצוב מודרני וצבעוני.',
    price: 14.90,
    isOnSale: false,
    category: 'planners',
    images: [
      '/products/comr/לוח תכנון יומי 2.jpg',
      '/products/back/לוח תכנון יומי 2.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'נייר 120 גרם, בסיס קרטון',
    size: 'A4 (21 x 29.7 ס"מ)',
  },
  {
    id: '28',
    slug: 'weekly-planner-organized',
    name: 'לוח תכנון שבועי - מאורגן',
    description: 'לוח תכנון שבועי עם חלוקה ברורה לימים ומשימות.',
    price: 14.90,
    isOnSale: false,
    category: 'planners',
    images: [
      '/products/comr/לוח תכנון שבועי 1.jpg',
      '/products/back/לוח תכנון שבועי 1.jpg'
    ],
    inStock: true,
    featured: true,
    materials: 'נייר 120 גרם, בסיס קרטון',
    size: 'A4 (21 x 29.7 ס"מ)',
  },
  {
    id: '29',
    slug: 'weekly-planner-colorful',
    name: 'לוח תכנון שבועי - צבעוני',
    description: 'לוח תכנון שבועי בעיצוב צבעוני ועליז.',
    price: 14.90,
    isOnSale: false,
    category: 'planners',
    images: [
      '/products/comr/לוח תכנון שבועי 2.png',
      '/products/back/לוח תכנון שבועי 2.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'נייר 120 גרם, בסיס קרטון',
    size: 'A4 (21 x 29.7 ס"מ)',
  },

  // דפי הדפסה (Printables)
  {
    id: '30',
    slug: 'printable-sheets-a4-set1',
    name: 'דפי A4 להדפסה - סט 1',
    description: 'סט דפים מעוצבים להדפסה ביתית. מושלם למסגור או לפרויקטים אישיים.',
    price: 11.90,
    isOnSale: false,
    category: 'printables',
    images: [
      '/products/comr/דפי A4 להדפסה 1.jpg',
      '/products/back/דפי A4 להדפסה 1.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'קובץ דיגיטלי להדפסה',
    size: 'A4 (21 x 29.7 ס"מ)',
  },
  {
    id: '31',
    slug: 'printable-sheets-a4-set2',
    name: 'דפי A4 להדפסה - סט 2',
    description: 'סט נוסף של דפים מעוצבים להדפסה ביתית.',
    price: 11.90,
    isOnSale: false,
    category: 'printables',
    images: [
      '/products/comr/דפי A4 להדפסה 2.jpg',
      '/products/back/דפי A4 להדפסה 2.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'קובץ דיגיטלי להדפסה',
    size: 'A4 (21 x 29.7 ס"מ)',
  },

  // מחברות (Notebooks)
  {
    id: '45',
    slug: 'notebook-inspiration',
    name: 'מחברת השראה - "יש ימים בהם"',
    description: 'מחברת ספירלה מעוצבת עם ציטוט מעורר השראה. מושלמת לרשימות יומיות, רעיונות ויומן אישי.',
    price: 18.90,
    isOnSale: false,
    category: 'notebooks',
    images: [
      '/products/back/IMG_0891.jpg'
    ],
    inStock: true,
    featured: true,
    materials: 'נייר איכותי 80 גרם, ספירלה מתכתית',
    size: 'A5 (14.8 x 21 ס"מ)',
  },
  {
    id: '46',
    slug: 'notebook-floral-colorful',
    name: 'מחברת פרחים צבעונית',
    description: 'מחברת ספירלה בעיצוב פרחוני צבעוני ועליז. אידיאלית לכתיבה יומית ולתיעוד רגעים מיוחדים.',
    price: 18.90,
    isOnSale: false,
    category: 'notebooks',
    images: [
      '/products/back/IMG_0892.jpg'
    ],
    inStock: true,
    featured: true,
    materials: 'נייר איכותי 80 גרם, ספירלה מתכתית',
    size: 'A5 (14.8 x 21 ס"מ)',
  },

  // רשימות קניות (Shopping Lists)
  {
    id: '47',
    slug: 'shopping-list-watermelon',
    name: 'רשימת קניות - אבטיח',
    description: 'רשימת קניות מגנטית עם עיצוב אבטיח קיצי ועליז. מתאימה למקרר או ללוח מתכת.',
    price: 9.90,
    isOnSale: false,
    category: 'shopping-lists',
    images: [
      '/products/comr/IMG_0912.JPG',
      '/products/back/IMG_0893.jpg'
    ],
    inStock: true,
    featured: true,
    materials: 'נייר 120 גרם, מגנט',
    size: '18 x 10 ס"מ',
  },
  {
    id: '48',
    slug: 'shopping-list-floral-green',
    name: 'רשימת קניות - פרחים ירוקה',
    description: 'רשימת קניות מגנטית בעיצוב פרחוני עדין בגווני ירוק וחום.',
    price: 9.90,
    isOnSale: false,
    category: 'shopping-lists',
    images: [
      '/products/comr/רשימת קניות 1.JPG',
      '/products/back/רשימת קניות 1.jpg'
    ],
    inStock: true,
    featured: true,
    materials: 'נייר 120 גרם, מגנט',
    size: '18 x 10 ס"מ',
  },
  {
    id: '49',
    slug: 'notepad-watering-can',
    name: 'פנקס פרחים - מזלף',
    description: 'פנקס פתקיות מעוצב עם איור מזלף ופרחים. מושלם לרשימות קצרות ותזכורות.',
    price: 9.90,
    isOnSale: false,
    category: 'shopping-lists',
    images: [
      '/products/comr/IMG_0911.JPG',
      '/products/back/IMG_0894.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'נייר 100 גרם',
    size: '18 x 10 ס"מ',
  },
  {
    id: '50',
    slug: 'notepad-bicycle',
    name: 'פנקס אופניים - וינטג׳',
    description: 'פנקס פתקיות רומנטי עם איור אופניים וסל פרחים. בעיצוב וינטג׳ קלאסי.',
    price: 9.90,
    isOnSale: false,
    category: 'shopping-lists',
    images: [
      '/products/comr/IMG_0910.JPG',
      '/products/back/IMG_0895.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'נייר 100 גרם',
    size: '18 x 10 ס"מ',
  },
  {
    id: '51',
    slug: 'notepad-floral-rose',
    name: 'פנקס פרחים - רוזי',
    description: 'פנקס פתקיות אלגנטי בעיצוב פרחוני בגווני ורוד וכתום.',
    price: 9.90,
    isOnSale: false,
    category: 'shopping-lists',
    images: [
      '/products/comr/IMG_0909.JPG',
      '/products/back/IMG_0896.jpg'
    ],
    inStock: true,
    featured: false,
    materials: 'נייר 100 גרם',
    size: '18 x 10 ס"מ',
  },
];
