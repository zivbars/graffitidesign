export type Category = 
  | 'a4-printables'           // דפי A4 להדפסה
  | 'greeting-cards'          // כרטיסי ברכה
  | 'daily-planner'           // לוח תכנון יומי
  | 'weekly-planner'          // לוח תכנון שבועי
  | 'envelopes-small'         // מארז קטן מעטפות ואיגרות
  | 'envelopes-medium'        // מארזי מעטפות בינוני
  | 'envelopes-large'         // מארזי מעטפות גדולות
  | 'magnets'                 // מגנטים
  | 'spiral-notebooks'        // מחברות ספירלה
  | 'lined-notebooks'         // מחברות שורות
  | 'recipe-books'            // ספר מתכונים
  | 'daily-journal'           // פנקס יומן
  | 'shopping-lists';         // רשימת קניות

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  isOnSale: boolean;
  category: Category;
  images: string[];
  inStock: boolean;
  featured: boolean;
  materials?: string;
  size?: string;
}

export const categoryNames: Record<Category, string> = {
  'a4-printables': 'דפי A4 להדפסה',
  'greeting-cards': 'כרטיסי ברכה',
  'daily-planner': 'לוח תכנון יומי',
  'weekly-planner': 'לוח תכנון שבועי',
  'envelopes-small': 'מארז קטן מעטפות ואיגרות',
  'envelopes-medium': 'מארזי מעטפות בינוני',
  'envelopes-large': 'מארזי מעטפות גדולות',
  'magnets': 'מגנטים',
  'spiral-notebooks': 'מחברות ספירלה',
  'lined-notebooks': 'מחברות שורות',
  'recipe-books': 'ספרי מתכונים',
  'daily-journal': 'פנקס יומן',
  'shopping-lists': 'רשימות קניות',
};
