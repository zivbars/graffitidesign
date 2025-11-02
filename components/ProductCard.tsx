import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/formatPrice';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Product Image */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-base-gray/10">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-2 text-base-black group-hover:text-primary-pink transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price - Fixed single price display */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-base-black font-bold text-xl">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/product/${product.slug}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              לפרטים
            </Button>
          </Link>
          {onAddToCart && (
            <Button
              variant="primary"
              size="sm"
              onClick={onAddToCart}
              className="flex-1"
              disabled={!product.inStock}
            >
              {product.inStock ? 'הוסף לעגלה' : 'אזל מהמלאי'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

