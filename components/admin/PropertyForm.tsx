"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Property {
  id?: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image: string | null;
  thumbnails?: string;
  category: string | null;
  propertyType: string;
  location: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  parkingSpaces: number | null;
  area: number | null;
  landArea: number | null;
  yearBuilt: number | null;
  condition: string | null;
  features: string[];
  rating: number | null;
  reviews: number;
}

interface PropertyFormProps {
  initialData?: Property;
  isLoading?: boolean;
}

export default function PropertyForm({ initialData, isLoading = false }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string[]>(
    initialData?.image ? [initialData.image] : []
  );
  const [thumbnails, setThumbnails] = useState<string[]>(
    initialData?.thumbnails ? JSON.parse(initialData.thumbnails) : []
  );
  const [formData, setFormData] = useState<Property>(
    initialData || {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
      thumbnails: "[]",
      category: "",
      propertyType: "jual",
      location: "",
      bedrooms: null,
      bathrooms: null,
      parkingSpaces: null,
      area: null,
      landArea: null,
      yearBuilt: null,
      condition: "",
      features: [],
      rating: null,
      reviews: 0,
    }
  );
  const [newFeature, setNewFeature] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (["price", "stock", "bedrooms", "bathrooms", "parkingSpaces", "area", "landArea", "yearBuilt", "reviews"].includes(name)) {
      if (value === "") {
        setFormData((prev) => ({
          ...prev,
          [name]: null,
        }));
      } else {
        // For price: remove all non-digit characters before parsing
        if (name === "price") {
          const cleanedValue = value.replace(/\D/g, "");
          if (cleanedValue) {
            const numValue = parseFloat(cleanedValue);
            if (!isNaN(numValue)) {
              setFormData((prev) => ({
                ...prev,
                [name]: numValue,
              }));
            }
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
          // For other numbers: allow decimal values
          const numValue = parseFloat(value);
          if (!isNaN(numValue)) {
            setFormData((prev) => ({
              ...prev,
              [name]: numValue,
            }));
          }
        }
      }
    } else if (name === "rating") {
      if (value === "") {
        setFormData((prev) => ({
          ...prev,
          [name]: null,
        }));
      } else {
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue >= 0 && numValue <= 5) {
          setFormData((prev) => ({
            ...prev,
            [name]: numValue,
          }));
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
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
        ? `/api/admin/properties/${initialData.id}`
        : "/api/admin/properties";

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
        throw new Error("Failed to save property");
      }

      router.push("/admin/properties");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Property" : "Create New Property"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Property Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter property name"
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
                  placeholder="Enter price"
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
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., Jakarta, Bekasi"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Property Type</Label>
                <Select value={formData.category || ""} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rumah">House</SelectItem>
                    <SelectItem value="apartemen">Apartment</SelectItem>
                    <SelectItem value="ruko">Shop</SelectItem>
                    <SelectItem value="tanah">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyType">Status *</Label>
                <Select value={formData.propertyType} onValueChange={(value) => handleSelectChange("propertyType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jual">For Sale</SelectItem>
                    <SelectItem value="sewa">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select value={formData.condition || ""} onValueChange={(value) => handleSelectChange("condition", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baru">New</SelectItem>
                    <SelectItem value="renovasi">Renovated</SelectItem>
                    <SelectItem value="standart">Standard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Property Specifications */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Property Specifications</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.bedrooms ?? ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.bathrooms ?? ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parkingSpaces">Parking Spaces</Label>
                <Input
                  id="parkingSpaces"
                  name="parkingSpaces"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.parkingSpaces ?? ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Building Area (m²)</Label>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0"
                  value={formData.area ?? ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="landArea">Land Area (m²)</Label>
                <Input
                  id="landArea"
                  name="landArea"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0"
                  value={formData.landArea ?? ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearBuilt">Year Built</Label>
                <Input
                  id="yearBuilt"
                  name="yearBuilt"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  placeholder="2024"
                  value={formData.yearBuilt ?? ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Image & Media */}
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

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter property description"
              rows={5}
              value={formData.description || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="e.g., AC, Pool, Garden"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
              />
              <Button type="button" onClick={addFeature} variant="outline">
                Add
              </Button>
            </div>
            {formData.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="hover:opacity-70"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rating & Reviews */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rating & Reviews</h3>
            <div className="grid gap-6 md:grid-cols-2">
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
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.reviews ?? ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button type="submit" disabled={loading || isLoading}>
              {loading || isLoading ? "Saving..." : "Save Property"}
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
