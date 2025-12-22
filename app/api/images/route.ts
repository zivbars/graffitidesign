import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Recursively scan directories for images
const scanDirectory = (dir: string, basePath: string = ''): string[] => {
  const images: string[] = [];
  
  if (!fs.existsSync(dir)) return images;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const itemPath = path.join(dir, item.name);
    const relativePath = path.join(basePath, item.name);
    
    if (item.isDirectory()) {
      images.push(...scanDirectory(itemPath, relativePath));
    } else if (item.isFile() && /\.(webp|jpg|jpeg|png|gif)$/i.test(item.name)) {
      images.push(`/products/new/${relativePath.replace(/\\/g, '/')}`);
    }
  }
  
  return images;
};

// Get all available images from the products directory
export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public/products/new');
    const images = scanDirectory(imagesDir);

    // Sort images alphabetically
    images.sort();

    return NextResponse.json({ images, count: images.length });
  } catch (error) {
    console.error('Error scanning images:', error);
    return NextResponse.json({ images: [], count: 0, error: 'Failed to scan images' }, { status: 500 });
  }
}
