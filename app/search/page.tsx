"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { formatRupiah } from "@/lib/utils";

interface SearchResult {
  id: string;
  name: string;
  price: number;
  image: string | null;
  type: "product" | "property";
  category?: string;
  location?: string;
  propertyType?: string;
  rating?: number;
  reviews?: number;
  stock?: number;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "products" | "properties">("all");

  useEffect(() => {
    if (query.trim().length >= 2) {
      fetchResults();
    }
  }, [query, filterType]);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&type=${filterType}`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const products = results.filter((r) => r.type === "product");
  const properties = results.filter((r) => r.type === "property");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Hasil Pencarian: <span className="text-blue-600">"{query}"</span>
        </h1>
        <p className="mt-2 text-gray-600">
          {isLoading ? "Memproses..." : `Ditemukan ${results.length} hasil`}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8 flex gap-4 border-b border-gray-200">
        {["all", "products", "properties"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type as any)}
            className={`px-4 py-3 font-medium transition-colors ${
              filterType === type
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {type === "all"
              ? "Semua"
              : type === "products"
                ? `Produk (${products.length})`
                : `Properti (${properties.length})`}
          </button>
        ))}
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : results.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-600 mb-2">Tidak ada hasil ditemukan</p>
          <p className="text-gray-500">Coba cari dengan kata kunci yang berbeda</p>
        </div>
      ) : (
        <>
          {/* Products Section */}
          {products.length > 0 && (filterType === "all" || filterType === "products") && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Produk</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      category: product.category,
                      rating: product.rating || 0,
                      reviews: product.reviews || 0,
                      stock: product.stock,
                    } as any}
                    basePath="/shopping"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Properties Section */}
          {properties.length > 0 && (filterType === "all" || filterType === "properties") && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Properti</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {properties.map((property) => (
                  <ProductCard
                    key={property.id}
                    product={{
                      id: property.id,
                      name: property.name,
                      price: property.price,
                      image: property.image,
                      category: property.propertyType,
                      rating: 0,
                      reviews: 0,
                    } as any}
                    basePath="/properties"
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
