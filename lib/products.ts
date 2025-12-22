import { 
  getProducts, 
  getProductBySlug, 
  getProductsByCategory, 
  getFeaturedProducts,
  getSaleProducts 
} from './supabase';
import { products as staticProducts } from '@/data/products';
import type { Product, Category } from '@/types/product';

// Check if we should use Supabase (when environment variables are set)
// Note: Currently disabled to use static products from data/products.ts
const shouldUseSupabase = () => {
  // Temporarily disabled - using static products
  return false;
  // return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
};

// Fetch all products (from static data or Supabase)
export async function fetchProducts(): Promise<Product[]> {
  // Use static products first
  if (staticProducts.length > 0) {
    return staticProducts;
  }
  if (shouldUseSupabase()) {
    const products = await getProducts();
    if (products.length > 0) {
      return products;
    }
  }
  return staticProducts;
}

// Fetch a single product by slug
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  // Check static products first
  const staticProduct = staticProducts.find(p => p.slug === slug);
  if (staticProduct) {
    return staticProduct;
  }
  if (shouldUseSupabase()) {
    const product = await getProductBySlug(slug);
    if (product) {
      return product;
    }
  }
  return null;
}

// Fetch products by category
export async function fetchProductsByCategory(category: Category): Promise<Product[]> {
  // Check static products first
  const staticFiltered = staticProducts.filter(p => p.category === category);
  if (staticFiltered.length > 0) {
    return staticFiltered;
  }
  if (shouldUseSupabase()) {
    const products = await getProductsByCategory(category);
    if (products.length > 0) {
      return products;
    }
  }
  return [];
}

// Fetch featured products
export async function fetchFeaturedProducts(): Promise<Product[]> {
  // Check static products first
  const staticFeatured = staticProducts.filter(p => p.featured);
  if (staticFeatured.length > 0) {
    return staticFeatured;
  }
  if (shouldUseSupabase()) {
    const products = await getFeaturedProducts();
    if (products.length > 0) {
      return products;
    }
  }
  return [];
}

// Fetch sale products
export async function fetchSaleProducts(): Promise<Product[]> {
  // Check static products first
  const staticSale = staticProducts.filter(p => p.isOnSale);
  if (staticSale.length > 0) {
    return staticSale;
  }
  if (shouldUseSupabase()) {
    const products = await getSaleProducts();
    if (products.length > 0) {
      return products;
    }
  }
  return [];
}

// Fetch a single product by ID
export async function fetchProductById(id: string): Promise<Product | null> {
  // Check static products first
  const staticProduct = staticProducts.find(p => p.id === id);
  if (staticProduct) {
    return staticProduct;
  }
  // If not found in static, could try Supabase here if needed
  return null;
}

// Get all product slugs (for static generation)
export async function getAllProductSlugs(): Promise<string[]> {
  const products = await fetchProducts();
  return products.map(p => p.slug);
}

