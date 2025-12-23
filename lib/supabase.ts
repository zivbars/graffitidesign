import { createClient } from '@supabase/supabase-js';
import type { Product, Category } from '@/types/product';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database product type (matches Supabase schema)
export interface DbProduct {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  is_on_sale: boolean;
  category: Category;
  images: string[];
  in_stock: boolean;
  featured: boolean;
  materials: string | null;
  size: string | null;
  created_at: string;
  updated_at: string;
}

// Convert database product to app product format
export function dbProductToProduct(dbProduct: DbProduct): Product {
  return {
    id: dbProduct.id,
    slug: dbProduct.slug,
    name: dbProduct.name,
    description: dbProduct.description || '',
    price: Number(dbProduct.price),
    compareAtPrice: dbProduct.compare_at_price ? Number(dbProduct.compare_at_price) : undefined,
    isOnSale: dbProduct.is_on_sale,
    category: dbProduct.category,
    images: dbProduct.images,
    inStock: dbProduct.in_stock,
    featured: dbProduct.featured,
    materials: dbProduct.materials || undefined,
    size: dbProduct.size || undefined,
  };
}

// Convert app product to database format for insert/update
export function productToDbProduct(product: Partial<Product>): Partial<DbProduct> {
  const dbProduct: Partial<DbProduct> = {};
  
  if (product.slug !== undefined) dbProduct.slug = product.slug;
  if (product.name !== undefined) dbProduct.name = product.name;
  if (product.description !== undefined) dbProduct.description = product.description;
  if (product.price !== undefined) dbProduct.price = product.price;
  if (product.compareAtPrice !== undefined) dbProduct.compare_at_price = product.compareAtPrice;
  if (product.isOnSale !== undefined) dbProduct.is_on_sale = product.isOnSale;
  if (product.category !== undefined) dbProduct.category = product.category;
  if (product.images !== undefined) dbProduct.images = product.images;
  if (product.inStock !== undefined) dbProduct.in_stock = product.inStock;
  if (product.featured !== undefined) dbProduct.featured = product.featured;
  if (product.materials !== undefined) dbProduct.materials = product.materials;
  if (product.size !== undefined) dbProduct.size = product.size;
  
  return dbProduct;
}

// Product CRUD operations
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return (data as DbProduct[]).map(dbProductToProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return dbProductToProduct(data as DbProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return dbProductToProduct(data as DbProduct);
}

export async function getProductsByCategory(category: Category): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return (data as DbProduct[]).map(dbProductToProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return (data as DbProduct[]).map(dbProductToProduct);
}

export async function getSaleProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_on_sale', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching sale products:', error);
    return [];
  }

  return (data as DbProduct[]).map(dbProductToProduct);
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
  const dbProduct = productToDbProduct(product);
  
  const { data, error } = await supabase
    .from('products')
    .insert(dbProduct)
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    return null;
  }

  return dbProductToProduct(data as DbProduct);
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product | null> {
  const dbProduct = productToDbProduct(product);
  
  const { data, error } = await supabase
    .from('products')
    .update(dbProduct)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    return null;
  }

  return dbProductToProduct(data as DbProduct);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }

  return true;
}

// Image upload to Supabase Storage
export async function uploadProductImage(file: File, productSlug: string): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${productSlug}-${Date.now()}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteProductImage(imageUrl: string): Promise<boolean> {
  // Extract file path from URL
  const urlParts = imageUrl.split('/product-images/');
  if (urlParts.length !== 2) return false;
  
  const filePath = urlParts[1];
  
  const { error } = await supabase.storage
    .from('product-images')
    .remove([filePath]);

  if (error) {
    console.error('Error deleting image:', error);
    return false;
  }

  return true;
}


