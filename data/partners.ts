export interface Partner {
  id: string;
  name: string;
  logo?: string;
  description: string;
}

export const partners: Partner[] = [
  {
    id: '1',
    name: 'זול סטוק',
    description: 'רשת חנויות מובילה המציעה מגוון מוצרים במחירים משתלמים',
  },
  {
    id: '2',
    name: 'ג\'מבו סטוק',
    description: 'רשת חנויות גדולה עם סניפים ברחבי הארץ',
  },
  {
    id: '3',
    name: 'דן דיל',
    description: 'רשת פופולרית למוצרי צריכה במחירים אטרקטיביים',
  },
  {
    id: '4',
    name: 'ביג סטוק',
    description: 'רשת חנויות גדולה המתמחה במגוון מוצרים לבית ולמשרד',
  },
];

