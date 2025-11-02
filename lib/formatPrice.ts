/**
 * Single source of truth for price formatting across the site.
 * Formats prices to exactly 2 decimal places in ILS currency.
 * 
 * @param price - The price value to format (will be coerced to Number)
 * @returns Formatted price string in ILS with ₪ symbol and 2 decimal places
 * 
 * @example
 * formatPrice(11.9)  // "₪11.90"
 * formatPrice(15.9)  // "₪15.90"
 * formatPrice(5)     // "₪5.00"
 * formatPrice(20)    // "₪20.00"
 * formatPrice(14.9)  // "₪14.90"
 */
export function formatPrice(price: number | string): string {
  const numericPrice = Number(price);
  
  if (isNaN(numericPrice)) {
    return '₪0.00';
  }
  
  const formatter = new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  });
  
  return formatter.format(numericPrice);
}

