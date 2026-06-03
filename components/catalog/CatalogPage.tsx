"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatRupiah } from "@/lib/utils";
import type { z } from "zod";
import { ProductSchema } from "@/lib/schemas";
import type { CatalogConfig } from "@/config/catalog-configs";

type Item = z.infer<typeof ProductSchema>;

interface CatalogPageProps {
  catalogConfig: CatalogConfig;
}

export default function CatalogPage({ catalogConfig }: CatalogPageProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  // Dynamic state for filters
  const [filterState, setFilterState] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    catalogConfig.filters.forEach((filter) => {
      initial[filter.id] = filter.defaultValue ?? "all";
    });
    return initial;
  });

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(catalogConfig.apiEndpoint, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch from ${catalogConfig.apiEndpoint}`);
      }
      const data = await response.json();
      
      // Handle both array response and object with data property
      const itemsArray = Array.isArray(data) ? data : data.data || data;
      
      const transformedItems = itemsArray.map((item: any) => ({
        ...item,
        image: item.image || "/placeholder.svg",
        rating: item.rating || 0,
        reviews: item.reviews || 0,
      }));
      setItems(transformedItems);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [catalogConfig.apiEndpoint]);

  // Get price filter config
  const priceFilter = catalogConfig.filters.find((f) => f.id === "price");
  const categoryFilter = catalogConfig.filters.find((f) => f.id === "category");
  const propertyTypeFilter = catalogConfig.filters.find((f) => f.id === "propertyType");

  const isFilterActive = Object.entries(filterState).some(([key, value]) => {
    const filter = catalogConfig.filters.find((f) => f.id === key);
    return value !== filter?.defaultValue;
  });

  const resetFilters = () => {
    const reset: Record<string, any> = {};
    catalogConfig.filters.forEach((filter) => {
      reset[filter.id] = filter.defaultValue ?? "all";
    });
    setFilterState(reset);
  };

  // Dynamic filtering
  const filteredItems = items
    .filter((item) => {
      // Property Type filter (jual/sewa) - only for properties
      const propertyTypeValue = filterState["propertyType"];
      if (propertyTypeValue && propertyTypeValue !== "all" && "propertyType" in item) {
        return (item as any).propertyType === propertyTypeValue;
      }
      return true;
    })
    .filter((item) => {
      // Category filter
      const categoryValue = filterState["category"];
      if (categoryValue && categoryValue !== "all") {
        return item.category === categoryValue;
      }
      return true;
    })
    .filter((item) => {
      // Price filter
      const priceValue = filterState["price"];
      if (priceValue && Array.isArray(priceValue)) {
        return item.price >= priceValue[0] && item.price <= priceValue[1];
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const handleFilterChange = (filterId: string, value: any) => {
    setFilterState((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  // Color mapping for tags
  const colorMap: Record<string, string> = {
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
  };

  // Custom color configs for properties (navy blue)
  const customColorMap: Record<string, { bg: string; text: string }> = {
    blue: {
      bg: "#eceff1",
      text: "#1e3a5f",
    },
  };

  const tagColor = catalogConfig.colorClass === "blue" 
    ? "bg-blue-100 text-blue-800"
    : colorMap[catalogConfig.colorClass || "green"] || colorMap.green;

  // Get CSS variable overrides for properties
  const styleOverrides = catalogConfig.colorClass === "blue" 
    ? {
        "--primary": "#1e3a5f",
        "--primary-foreground": "#ffffff",
      } as React.CSSProperties
    : {};

  return (
    <>
      {/* Header Section */}
      <div className={`hidden ${catalogConfig.headerColor} md:block relative overflow-hidden`}>
        {/* Background Image */}
        {catalogConfig.backgroundImage && (
          <img
            src={catalogConfig.backgroundImage}
            alt="Header background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {/* Overlay untuk readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className={`text-5xl font-bold ${catalogConfig.headerTextColor}`}>
            {catalogConfig.pageTitle}
          </h1>
          <p className={`mt-3 text-xl ${catalogConfig.headerTextColor} opacity-90`}>
            {catalogConfig.pageDescription}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" style={styleOverrides}>
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
              {/* Reset Button */}
              <button
                onClick={resetFilters}
                style={
                  catalogConfig.colorClass === "blue" && isFilterActive
                    ? { color: customColorMap.blue.text }
                    : undefined
                }
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  isFilterActive
                    ? catalogConfig.colorClass === "blue"
                      ? ""
                      : `text-${catalogConfig.colorClass}-600 hover:text-${catalogConfig.colorClass}-700`
                    : "cursor-default text-gray-400"
                }`}
                disabled={!isFilterActive}>
                Reset Filters
              </button>

              {/* Dynamic Filters */}
              {catalogConfig.filters.map((filter) => {
                if (filter.type === "category") {
                  return (
                    <div key={filter.id}>
                      <h3 className="mb-3 text-xs tracking-widest uppercase">
                        {filter.label}
                      </h3>
                      <div className="relative">
                        <select
                          value={filterState[filter.id]}
                          onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                          className="focus:ring-primary w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 transition-colors focus:border-transparent focus:ring-2">
                          {filter.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                      </div>
                    </div>
                  );
                }

                if (filter.type === "price") {
                  return (
                    <div key={filter.id}>
                      <h3 className="mb-3 text-xs tracking-widest uppercase">
                        {filter.label}
                      </h3>
                      <div className="space-y-4">
                        <Slider
                          value={filterState[filter.id]}
                          onValueChange={(value) => handleFilterChange(filter.id, value)}
                          min={0}
                          max={catalogConfig.maxPrice}
                          step={1000000}
                          className="w-full"
                        />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {formatRupiah(filterState[filter.id]?.[0] ?? 0)}
                          </span>
                          <span className="text-gray-600">
                            {formatRupiah(filterState[filter.id]?.[1] ?? catalogConfig.maxPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>

          {/* Items Grid */}
          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Items ({filteredItems.length})
              </h1>

              <div className="flex gap-2 flex-col sm:flex-row sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="focus:ring-primary w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 transition-colors focus:border-transparent focus:ring-2 sm:w-auto">
                    {catalogConfig.sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="py-12 text-center">
                <p className="text-gray-500">{catalogConfig.loadingText}</p>
              </div>
            )}

            {/* Error State */}
            {/* {error && !loading && (
              <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
                <p className="font-semibold">Error loading items</p>
                <p className="text-sm">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="mt-3">
                  Retry
                </Button>
              </div>
            )} */}

            {/* Active Filter Tags */}
            {!loading && isFilterActive && (
              <div className="mb-6 flex flex-wrap gap-2">
                {propertyTypeFilter && filterState["propertyType"] && filterState["propertyType"] !== "all" && (
                  <div 
                    style={catalogConfig.colorClass === "blue" ? { backgroundColor: customColorMap.blue.bg, color: customColorMap.blue.text } : undefined}
                    className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm ${catalogConfig.colorClass !== "blue" ? tagColor : ""}`}>
                    <span className="capitalize">
                      {propertyTypeFilter.label}: {filterState["propertyType"]}
                    </span>
                    <button
                      onClick={() => handleFilterChange("propertyType", "all")}
                      className="hover:opacity-70 transition-opacity"
                      aria-label="Remove property type filter">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {filterState["category"] && filterState["category"] !== "all" && (
                  <div 
                    style={catalogConfig.colorClass === "blue" ? { backgroundColor: customColorMap.blue.bg, color: customColorMap.blue.text } : undefined}
                    className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm ${catalogConfig.colorClass !== "blue" ? tagColor : ""}`}>
                    <span className="capitalize">
                      {categoryFilter?.label}: {filterState["category"]}
                    </span>
                    <button
                      onClick={() => handleFilterChange("category", "all")}
                      className="hover:opacity-70 transition-opacity"
                      aria-label="Remove category filter">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredItems.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500">{catalogConfig.emptyStateText}</p>
              </div>
            )}

            {/* Grid */}
            {!loading && filteredItems.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <ProductCard key={item.id} product={item} basePath={catalogConfig.detailPathPrefix} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
