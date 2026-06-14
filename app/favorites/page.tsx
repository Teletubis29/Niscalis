"use client";

import { useState, useEffect } from "react";
import { Heart, MapPin, Trash2 } from "lucide-react";
import { useFavoriteStore } from "@/stores/favoriteStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";

export default function FavoritesPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem, getItemCount } = useFavoriteStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Favorites Empty</h1>
          <p className="text-gray-600 mb-8">You haven't added any properties to your favorites yet.</p>
          <Link href="/">
            <Button size="lg">Continue Browsing</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Favorite</h1>
        <p className="text-gray-600 mt-2">{getItemCount()} properties in favorites</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow bg-white">
            {/* Image */}
            <div className="relative h-48 bg-gray-100">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-red-50 transition-colors"
              >
                <Heart className="h-5 w-5 fill-red-500 text-red-500" />
              </button>
              {item.propertyType && (
                <span className="absolute top-2 left-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {item.propertyType === "jual" ? "Jual" : "Sewa"}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
              
              {item.location && (
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="line-clamp-1">{item.location}</span>
                </div>
              )}

              <div className="text-xl font-bold text-blue-900 mb-4">{formatRupiah(item.price)}</div>

              <Link href={`/${item.source}/${item.id}`} className="block w-full">
                <Button variant="outline" size="sm" className="w-full">
                  Lihat Detail
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
