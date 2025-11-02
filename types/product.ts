export type Category = 
  | 'envelopes'
  | 'cards'
  | 'recipe-books'
  | 'magnets'
  | 'planners'
  | 'printables'
  | 'notebooks'
  | 'shopping-lists';

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
  envelopes: 'מעטפות ואיגרות',
  cards: 'כרטיסי ברכה',
  'recipe-books': 'ספרי מתכונים',
  magnets: 'מגנטים',
  planners: 'לוחות תכנון',
  printables: 'דפי הדפסה',
  notebooks: 'מחברות',
  'shopping-lists': 'רשימות קניות',
};

