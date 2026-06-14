"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUploader from "@/components/admin/ImageUploader";

interface Product {
  id?: number;
  name: string;
  slug?: string;
  sku?: string;
  description: string | null;
  price: number;
  discount?: number;
  stock: number;
  image: string | null;
  thumbnails?: string;
  category: string | null;
  rating: number | null;
  reviews: number;
  isFeatured?: boolean;
  isNew?: boolean;
}

interface ProductFormProps {
  initialData?: Product;
  isLoading?: boolean;
}

export default function ProductForm({ initialData, isLoading = false }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string[]>(
    initialData?.image ? [initialData.image] : []
  );
  const [thumbnails, setThumbnails] = useState<string[]>(
    initialData?.thumbnails ? JSON.parse(initialData.thumbnails) : []
  );
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formData, setFormData] = useState<Product>(
    initialData || {
      name: "",
      slug: "",
      sku: "",
      description: "",
      price: 0,
      discount: 0,
      stock: 0,
      image: "",
      thumbnails: "[]",
      category: "",
      rating: 0,
      reviews: 0,
      isFeatured: false,
      isNew: false
    }
  );

  // Fetch all categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const categories = await res.json();
          setAllCategories(categories);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategoryError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (
      name === "price" ||
      name === "rating" ||
      name === "reviews" ||
      name === "stock" ||
      name === "discount"
    ) {
      // For empty values
      if (value === "") {
        setFormData((prev) => ({
          ...prev,
          [name]: name === "price" ? 0 : null
        }));
      } else {
        // For price: only allow numbers
        if (name === "price") {
          // Remove all non-digit characters
          const cleanedValue = value.replace(/\D/g, "");
          if (cleanedValue) {
            const numValue = parseInt(cleanedValue, 10);
            setFormData((prev) => ({
              ...prev,
              [name]: numValue
            }));
          }
        } else if (name === "stock") {
          // For stock: only accept integers
          const numValue = parseInt(value, 10);
          if (!isNaN(numValue)) {
            setFormData((prev) => ({
              ...prev,
              [name]: numValue
            }));
          }
        } else if (name === "discount") {
          // For discount: accept 0-100
          const numValue = parseInt(value, 10);
          if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
            setFormData((prev) => ({
              ...prev,
              [name]: numValue
            }));
          }
        } else {
          // For rating: accept decimal numbers 0-5 with 0.5 steps
          if (name === "rating") {
            const numValue = parseFloat(value);
            if (!isNaN(numValue) && numValue >= 0 && numValue <= 5) {
              setFormData((prev) => ({
                ...prev,
                [name]: numValue
              }));
            }
          } else {
            // For reviews: only accept integers
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue)) {
              setFormData((prev) => ({
                ...prev,
                [name]: numValue
              }));
            }
          }
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  // Format price with thousand separator for Rupiah
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const handleThumbnailsChange = (images: string[]) => {
    setThumbnails(images);
  };

  const handleMainImageChange = (images: string[]) => {
    setMainImage(images);
    if (images.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: images[0]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        image: null
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = initialData?.id ? `/api/admin/products/${initialData.id}` : "/api/admin/products";

      const method = initialData?.id ? "PUT" : "POST";

      const submitData = {
        ...formData,
        image: mainImage.length > 0 ? mainImage[0] : null,
        thumbnails: JSON.stringify(thumbnails)
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData)
      });

      if (!res.ok) {
        throw new Error("Failed to save product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Product" : "Create New Product"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (Rp) *</Label>
              <Input
                id="price"
                name="price"
                type="text"
                inputMode="numeric"
                placeholder="Enter Price"
                value={formData.price ? formatPrice(formData.price) : ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (SEO URL)</Label>
              <Input
                id="slug"
                name="slug"
                placeholder="e.g., gaming-laptop (auto-generated if empty)"
                value={formData.slug || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                name="sku"
                placeholder="e.g., SKU-12345 (auto-generated if empty)"
                value={formData.sku || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="text"
                inputMode="numeric"
                placeholder="Enter stock quantity"
                value={formData.stock ?? ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                name="discount"
                type="text"
                inputMode="numeric"
                placeholder="0-100"
                value={formData.discount ?? ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <div className="relative">
                <Input
                  id="category"
                  name="category"
                  placeholder="e.g., Electronics, Fashion"
                  value={formData.category || ""}
                  onChange={(e) => {
                    handleInputChange(e);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                
                {/* Suggestions Dropdown */}
                {showSuggestions && formData.category && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-md">
                    {allCategories
                      .filter((cat) =>
                        cat
                          .toLowerCase()
                          .includes((formData.category || "").toLowerCase())
                      )
                      .slice(0, 5)
                      .map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, category: cat }));
                            setShowSuggestions(false);
                          }}
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-blue-50"
                        >
                          <span className="text-gray-900">{cat}</span>
                          <span className="ml-2 text-xs text-gray-500">
                            (existing)
                          </span>
                        </button>
                      ))}
                    {allCategories.filter((cat) =>
                      cat
                        .toLowerCase()
                        .includes((formData.category || "").toLowerCase())
                    ).length === 0 && (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No matching categories - a new category will be created
                      </div>
                    )}
                  </div>
                )}
                
                {/* New Category Info */}
                {formData.category && !allCategories.includes(formData.category) && (
                  <p className="mt-1 text-xs text-amber-600">
                    New category: "{formData.category}" will be created
                  </p>
                )}
                {formData.category && allCategories.includes(formData.category) && (
                  <p className="mt-1 text-xs text-green-600">
                    ✓ use category already exists
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating (0.5, 1.0, 1.5...5.0)</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.5"
                placeholder="e.g., 1.5, 2.5, 3.5"
                value={formData.rating ?? ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reviews">Number of Reviews</Label>
              <Input
                id="reviews"
                name="reviews"
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={formData.reviews ?? ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured || false}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="isFeatured" className="mb-0 cursor-pointer">
                Featured Product
              </Label>
              <div className="flex items-center space-x-2 ml-4">
                <input
                  type="checkbox"
                  id="isNew"
                  name="isNew"
                  checked={formData.isNew || false}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="isNew" className="mb-0 cursor-pointer">
                  New Product
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Main Image Upload *</Label>
            <ImageUploader
              onImagesChange={handleMainImageChange}
              currentImages={mainImage}
              maxImages={1}
            />
          </div>

          <div className="space-y-2">
            <Label>Additional Images (Thumbnails)</Label>
            <ImageUploader
              onImagesChange={handleThumbnailsChange}
              currentImages={thumbnails}
              maxImages={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              rows={5}
              value={formData.description || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={loading || isLoading}>
              {loading || isLoading ? "Saving..." : "Save Product"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading || isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
