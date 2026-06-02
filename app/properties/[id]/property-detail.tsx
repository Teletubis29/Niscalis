"use client";

import { useState } from "react";
import { Star, Heart, MapPin, Bed, Bath, ParkingCircle, Ruler, AlertCircle, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import ProductCard from "@/components/ProductCard";
import { formatRupiah } from "@/lib/utils";

interface Property {
  id: number;
  name: string;
  price: number;
  image: string | null;
  description: string | null;
  category: string | null;
  propertyType: string | null;
  rating: number | null;
  reviews: number;
  location?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  parkingSpaces?: number | null;
  area?: number | null;
  landArea?: number | null;
  yearBuilt?: number | null;
  condition?: string | null;
  features?: string[];
}

type Props = { property: Property; relatedProperties: Property[] };

export default function PropertiesDetailPage({ property, relatedProperties }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: String(property.id),
      name: property.name,
      price: property.price,
      image: property.image || "/placeholder.svg",
      quantity: quantity
    });
  };

  const propertyImages = [
    property.image || "/placeholder.svg",
    property.image || "/placeholder.svg",
    property.image || "/placeholder.svg",
    property.image || "/placeholder.svg",
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Property Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
            <img
              src={propertyImages[selectedImage] || "/placeholder.svg"}
              alt={property.name}
              className="h-full w-full object-cover text-[#1e3a5f]"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {propertyImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 bg-gray-100 ${
                  selectedImage === index ? "" : "border-transparent"
                }`}
                style={selectedImage === index ? { borderColor: '#1e3a5f' } : undefined}>
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${property.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900">{property.name}</h1>
                {property.location && (
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                )}
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: '#eceff1', color: '#1e3a5f' }}>
                {property.propertyType === "jual" ? "Jual" : "Sewa"}
              </span>
            </div>

            <div className="mb-4 flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(property.rating || 0)
                        ? "fill-current text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">({property.reviews} reviews)</span>
            </div>

            <div className="text-4xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
              {formatRupiah(property.price)}
            </div>
            {property.condition && (
              <div className="text-sm text-gray-600">
                <span className="font-semibold">Kondisi: </span>{property.condition}
              </div>
            )}
          </div>

          {property.description && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>
          )}

          {/* Property Specs */}
          <div className="grid grid-cols-2 gap-4">
            {property.bedrooms && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Bed className="w-5 h-5" style={{ color: '#1e3a5f' }} />
                <div>
                  <div className="text-sm text-gray-600">Kamar Tidur</div>
                  <div className="font-semibold">{property.bedrooms}</div>
                </div>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Bath className="w-5 h-5" style={{ color: '#1e3a5f' }} />
                <div>
                  <div className="text-sm text-gray-600">Kamar Mandi</div>
                  <div className="font-semibold">{property.bathrooms}</div>
                </div>
              </div>
            )}
            {property.parkingSpaces && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <ParkingCircle className="w-5 h-5" style={{ color: '#1e3a5f' }} />
                <div>
                  <div className="text-sm text-gray-600">Parkir</div>
                  <div className="font-semibold">{property.parkingSpaces}</div>
                </div>
              </div>
            )}
            {property.area && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Ruler className="w-5 h-5" style={{ color: '#1e3a5f' }} />
                <div>
                  <div className="text-sm text-gray-600">Luas Bangunan</div>
                  <div className="font-semibold">{property.area} m²</div>
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Fitur & Fasilitas</h3>
              <div className="grid grid-cols-2 gap-2">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-700">
                    <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#1e3a5f' }}></span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <Button size="lg" onClick={handleAddToCart} className="w-full text-white" style={{ backgroundColor: '#1e3a5f' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#162d47'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e3a5f'}>
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              <Heart className="mr-2 h-4 w-4" />
              Simpan untuk Nanti
            </Button>
          </div>

          {/* Additional Info */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Informasi Penting</p>
              <p>Verifikasi data properti sebelum mengambil keputusan. Hubungi penjual untuk detail lebih lanjut.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <div className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Properti Terkait</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProperties.map((relatedProperty) => (
              <ProductCard key={relatedProperty.id} product={{ ...relatedProperty, id: String(relatedProperty.id) } as any} basePath="/properties" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
