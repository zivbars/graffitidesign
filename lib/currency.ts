/**
 * @deprecated This function is deprecated and no longer used.
 * Use formatPrice from '@/lib/formatPrice' instead for consistent 2-decimal formatting.
 * 
 * This old function rounded to 0 decimals which caused price display issues.
 */
export const formatILS = (amount: number): string => {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    maximumFractionDigits: 0,
  }).format(amount);
};

