"use client";

import { useState } from "react";
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
  description: string | null;
  price: number;
  stock: number;
  image: string | null;
  thumbnails?: string;
  category: string | null;
  rating: number | null;
  reviews: number;
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
  const [formData, setFormData] = useState<Product>(
    initialData || {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
      thumbnails: "[]",
      category: "",
      rating: 0,
      reviews: 0,
    }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "price" || name === "rating" || name === "reviews" || name === "stock") {
      // For empty values
      if (value === "") {
        setFormData((prev) => ({
          ...prev,
          [name]: name === "price" ? 0 : null,
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
              [name]: numValue,
            }));
          }
        } else if (name === "stock") {
          // For stock: only accept integers
          const numValue = parseInt(value, 10);
          if (!isNaN(numValue)) {
            setFormData((prev) => ({
              ...prev,
              [name]: numValue,
            }));
          }
        } else {
          // For rating: accept decimal numbers 0-5 with 0.5 steps
          if (name === "rating") {
            const numValue = parseFloat(value);
            if (!isNaN(numValue) && numValue >= 0 && numValue <= 5) {
              setFormData((prev) => ({
                ...prev,
                [name]: numValue,
              }));
            }
          } else {
            // For reviews: only accept integers
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue)) {
              setFormData((prev) => ({
                ...prev,
                [name]: numValue,
              }));
            }
          }
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
        image: images[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        image: null,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = initialData?.id
        ? `/api/admin/products/${initialData.id}`
        : "/api/admin/products";

      const method = initialData?.id ? "PUT" : "POST";

      const submitData = {
        ...formData,
        image: mainImage.length > 0 ? mainImage[0] : null,
        thumbnails: JSON.stringify(thumbnails),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
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
        <CardTitle>
          {initialData ? "Edit Product" : "Create New Product"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

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
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="e.g., Electronics, Fashion"
                value={formData.category || ""}
                onChange={handleInputChange}
              />
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
              disabled={loading || isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
