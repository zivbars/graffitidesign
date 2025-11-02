import { create } from 'zustand';
import { CartItem } from '@/types/cart';

interface CartState {
  items: CartItem[];
  isHydrated: boolean;
  add: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  remove: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  hydrate: () => void;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  isHydrated: false,

  add: (item) => {
    const items = structuredClone(get().items);
    const existingIndex = items.findIndex((i) => i.id === item.id);

    if (existingIndex > -1) {
      items[existingIndex].quantity += item.quantity || 1;
    } else {
      items.push({ ...item, quantity: item.quantity || 1 });
    }

    set({ items });
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  },

  remove: (id) => {
    const items = get().items.filter((item) => item.id !== id);
    set({ items });
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().remove(id);
      return;
    }

    const items = get().items.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    set({ items });
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  },

  clear: () => {
    set({ items: [] });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  hydrate: () => {
    if (typeof window !== 'undefined' && !get().isHydrated) {
      const stored = localStorage.getItem('cart');
      if (stored) {
        try {
          const items = JSON.parse(stored);
          set({ items, isHydrated: true });
        } catch (e) {
          console.error('Failed to parse cart from localStorage', e);
          set({ isHydrated: true });
        }
      } else {
        set({ isHydrated: true });
      }
    }
  },
}));

