"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface NewArrivalProduct {
  id: number;
  name: string;
  slug: string | null;
  price: number;
  discount: number | null;
  image: string | null;
  category: string | null;
  rating: number | null;
  reviews: number;
  createdAt: Date;
}

export default function NewArrivals() {
  const [product, setProduct] = useState<NewArrivalProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products/new-arrivals");

        if (!response.ok) {
          throw new Error("Failed to fetch new arrivals");
        }

        const data = await response.json();

        // Get the first (most recent) product for the hero section
        if (data.data && data.data.length > 0) {
          setProduct(data.data[0]);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching new arrivals:", err);
        setError("Failed to load new arrivals");
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading) {
    return (
      <Link href="/shopping?sort=new">
        <div className="flex h-full w-full flex-col justify-end rounded-md bg-gray-200 bg-cover p-0 no-underline outline-hidden select-none focus:shadow-md">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
      </Link>
    );
  }

  if (error || !product) {
    // Fallback to default
    return (
      <Link href="/shopping?sort=new" className="cursor-pointer">
        <div
          className="flex h-full w-full flex-col justify-end rounded-md bg-cover p-0 no-underline outline-hidden select-none focus:shadow-md"
          style={{
            backgroundImage: `url('https://bundui-images.netlify.app/products/01.jpeg')`,
          }}
        >
          <div className="bg-foreground/30 space-y-2 p-4 text-white backdrop-blur-md">
            <div className="font-medium">New Arrivals</div>
            <p className="text-sm leading-tight">
              Discover the latest styles in our newest collection.
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/shopping/${product.slug || product.id}`} className="cursor-pointer">
      <div
        className="flex h-full w-full flex-col justify-end rounded-md bg-cover p-0 no-underline outline-hidden select-none focus:shadow-md transition-transform duration-300 hover:scale-105"
        style={{
          backgroundImage: product.image
            ? `url('${product.image}')`
            : `url('https://bundui-images.netlify.app/products/01.jpeg')`,
        }}
      >
        <div className="bg-foreground/30 space-y-2 p-4 text-white backdrop-blur-md">
          <div className="font-medium text-lg">New Arrivals</div>
          <p className="text-sm leading-tight font-semibold line-clamp-2">
            {product.name}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">
              Rp {(product.price - (product.price * (product.discount || 0)) / 100).toLocaleString("id-ID")}
            </span>
            {product.discount && product.discount > 0 && (
              <span className="rounded bg-red-500 px-2 py-1 text-xs font-bold">
                -{product.discount}%
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
