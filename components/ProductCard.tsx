"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useFavoriteStore } from "@/stores/favoriteStore";
import type { Product } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  basePath?: string;
}

export default function ProductCard({ product, basePath = "/shopping" }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToFavorite, removeItem: removeFromFavorite, isFavorited: checkIsFavorited } = useFavoriteStore();

  // Calculate discounted price
  const discountedPrice = product.discount !== null && product.discount !== undefined && product.discount > 0
    ? product.price * (1 - product.discount / 100)
    : product.price;

  useEffect(() => {
    setIsMounted(true);
    setIsFavorited(checkIsFavorited(product.id));
  }, [product.id, checkIsFavorited]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const result = addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      stock: product.stock as number | undefined,
    });

    if (result.success) {
      toast.success(result.message || "Added to cart");
    } else {
      toast.error(result.message || "Failed to add to cart");
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isMounted) return;

    // Determine source based on basePath
    const source = basePath.includes('properties') ? 'properties' : 'shopping';

    if (isFavorited) {
      removeFromFavorite(product.id);
      setIsFavorited(false);
      toast.success("Dihapus dari favorit");
    } else {
      addToFavorite({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        source: source,
      });
      setIsFavorited(true);
      toast.success("Ditambahkan ke favorit");
    }
  };

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="inline-block rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
              New
            </span>
          )}
          {product.discount !== null && product.discount !== undefined && product.discount > 0 && (
            <span className="inline-block rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              -{product.discount}%
            </span>
          )}
          {product.isFeatured && (
            <span className="inline-block rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          )}
          {product.badge && (
            <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
              {product.badge}
            </span>
          )}
        </div>
        <button 
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50">
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        <Link href={`${basePath}/${product.id}`}>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-4">
        <Link href={`${basePath}/${product.id}`}>
          <h3 className="hover:text-primary mb-2 line-clamp-2 font-semibold text-gray-900 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mb-2 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating || 0) ? "fill-current text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            {product.discount !== null && product.discount !== undefined && product.discount > 0 ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">{formatRupiah(discountedPrice)}</span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatRupiah(product.price)}
                  </span>
                </div>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">{formatRupiah(product.price)}</span>
            )}
            {product.originalPrice && !product.discount && (
              <span className="text-sm text-gray-500 line-through">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        <Button onClick={handleAddToCart} className="w-full" size="sm">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
