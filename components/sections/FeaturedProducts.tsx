"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

interface FeaturedProduct {
  id: number;
  name: string;
  slug: string | null;
  price: number;
  discount: number | null;
  image: string | null;
  category: string | null;
  rating: number | null;
  reviews: number;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products/featured");

        if (!response.ok) {
          throw new Error("Failed to fetch featured products");
        }

        const data = await response.json();
        setProducts(data.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError("Failed to load featured products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Featured Products</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Discover our most popular items, carefully selected for their exceptional quality and
            customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </>
          ) : error || products.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">
              No products available at the moment.
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id.toString(),
                  name: product.name,
                  price: product.price,
                  originalPrice: product.discount ? product.price / (1 - product.discount / 100) : undefined,
                  image: product.image || "",
                  rating: product.rating || 0,
                  reviews: product.reviews,
                  category: product.category || "",
                }}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
