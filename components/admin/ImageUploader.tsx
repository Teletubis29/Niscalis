"use client";

import { useState, useId } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  onImagesChange: (images: string[]) => void;
  currentImages?: string[];
  maxImages?: number;
}

export default function ImageUploader({
  onImagesChange,
  currentImages = [],
  maxImages = 5,
}: ImageUploaderProps) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(currentImages);
  const [error, setError] = useState("");

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    setError("");

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await response.json();
        uploadedUrls.push(data.imageUrl);
      }

      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      onImagesChange(newImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Product Images</label>
        <span className="text-xs text-gray-500">
          {images.length}/{maxImages}
        </span>
      </div>

      {/* Upload Area */}
      <div className="relative">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading || images.length >= maxImages}
          className="sr-only"
          id={inputId}
        />
        <label
          htmlFor={inputId}
          className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition ${
            uploading || images.length >= maxImages
              ? "border-gray-200 bg-gray-50 cursor-not-allowed"
              : "border-blue-300 bg-blue-50 hover:border-blue-400"
          }`}
        >
          <Upload className="h-8 w-8 mb-2 text-blue-500" />
          <p className="text-sm font-medium text-gray-700">
            {uploading ? "Uploading..." : "Click to upload or drag images"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, GIF up to 5MB
          </p>
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={image}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 group-hover:opacity-100 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
