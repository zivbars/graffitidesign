type ClassValue = string | number | boolean | undefined | null;

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .filter((x) => typeof x === 'string' && x.length > 0)
    .join(' ');
}

