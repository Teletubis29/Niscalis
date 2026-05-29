"use client";

import { useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { products } from "@/lib/data";
import { formatRupiah } from "@/lib/utils";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const isFilterActive = selectedCategory !== "all" || priceRange[0] !== 0 || priceRange[1] !== 1000;

  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, 1000]);
  };

  const filteredProducts = products
    .filter((product) => selectedCategory === "all" || product.category === selectedCategory)
    .filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return b.id.localeCompare(a.id);
      return 0;
    });

  return (
    <>
      {/* Header Section - Full Width - Hidden on Mobile */}
      <div className="hidden bg-green-600 md:block">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-green-50">Shopping with NISCALIS</h1>
          <p className="mt-3 text-xl text-green-100">
            Discover our exclusive collection of premium products
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters Sidebar */}
          <div className="hidden border-r-1 border-gray-200 pr-7 lg:block lg:w-64">
            <div className="mb-4 lg:hidden">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              {/* Reset Button - Text Link */}
              <button
                onClick={resetFilters}
                className="text-sm font-xl text-green-600 hover:text-green-700 transition-colors cursor-pointer">
                Reset Filters
              </button>

              {/* Category Filter - Dropdown */}
              <div>
                <h3 className="mb-3 text-xs tracking-widest uppercase">Category</h3>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="focus:ring-primary w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 transition-colors focus:border-transparent focus:ring-2">
                    <option value="all">All Products</option>
                    <option value="audio">Audio</option>
                    <option value="wearables">Wearables</option>
                    <option value="accessories">Accessories</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                </div>
              </div>

              {/* Price Filter - Slider */}
              <div>
                <h3 className="mb-3 text-xs tracking-widest uppercase">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    min={0}
                    max={1000}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{formatRupiah(priceRange[0])}</span>
                    <span className="text-gray-600">{formatRupiah(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Products ({filteredProducts.length})
              </h1>

              <div className="relative w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="focus:ring-primary w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 transition-colors focus:border-transparent focus:ring-2 sm:w-auto">
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              </div>
            </div>

            {/* Active Filter Tags */}
            {isFilterActive && (
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedCategory !== "all" && (
                  <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                    <span className="capitalize">Category: {selectedCategory}</span>
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="hover:text-green-600 transition-colors"
                      aria-label="Remove category filter">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {(priceRange[0] !== 0 || priceRange[1] !== 1000) && (
                  <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                    <span>
                      Price: {formatRupiah(priceRange[0])} - {formatRupiah(priceRange[1])}
                    </span>
                    <button
                      onClick={() => setPriceRange([0, 1000])}
                      className="hover:text-blue-600 transition-colors"
                      aria-label="Remove price filter">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 transition-all duration-300 ease-out sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="animate-in fade-in duration-300">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-12 text-center">
                <p className="mb-4 text-gray-500">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="mx-auto">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
