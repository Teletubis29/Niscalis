"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ThumbnailGalleryProps {
  images: string[];
  mainImage: string | null;
  title: string;
}

export default function ThumbnailGallery({
  images,
  mainImage,
  title,
}: ThumbnailGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Combine main image with thumbnails, removing duplicates
  const allImages = mainImage 
    ? [mainImage, ...images.filter(img => img !== mainImage)]
    : images;

  if (allImages.length === 0) {
    // Fallback if no images
    return (
      <div className="relative bg-gray-100 rounded-lg overflow-hidden">
        <div className="aspect-square flex items-center justify-center">
          <span className="text-gray-400">No image available</span>
        </div>
      </div>
    );
  }

  const currentImage = allImages[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={currentImage}
          alt={`${title} - Image ${selectedIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
        
        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev === 0 ? allImages.length - 1 : prev - 1
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev === allImages.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 mt-1 flex-shrink-0 rounded-lg overflow-hidden border-2 transition ${
                selectedIndex === index
                  ? "border-primary"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
