export interface Partner {
  id: string;
  name: string;
  logo?: string;
  description: string;
  website?: string;
}

export const partners: Partner[] = [
  {
    id: '1',
    name: 'זול סטוק',
    logo: '/partners/zol-stock.png',
    description: 'רשת חנויות מובילה המציעה מגוון מוצרים במחירים משתלמים',
    website: 'https://www.zolstock.co.il',
  },
  {
    id: '2',
    name: 'ג\'מבו סטוק',
    logo: '/partners/jumbo.png',
    description: 'רשת חנויות גדולה עם סניפים ברחבי הארץ',
    website: 'https://www.jumbostock.co.il',
  },
  {
    id: '3',
    name: 'דן דיל',
    logo: '/partners/dan-deal.png',
    description: 'רשת פופולרית למוצרי צריכה במחירים אטרקטיביים',
    website: 'https://www.dandeal.co.il',
  },
  {
    id: '4',
    name: 'ביג סטוק',
    logo: '/partners/big-stock.png',
    description: 'רשת חנויות גדולה המתמחה במגוון מוצרים לבית ולמשרד',
    website: 'https://www.bigstock.co.il',
  },
];

