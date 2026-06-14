"use client";

import { useState, useEffect } from "react";
import { Star, Heart, MapPin, Bed, Bath, ParkingCircle, Ruler, AlertCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavoriteStore } from "@/stores/favoriteStore";
import ProductCard from "@/components/ProductCard";
import ThumbnailGallery from "@/components/ThumbnailGallery";
import { formatRupiah } from "@/lib/utils";
import { toast } from "sonner";

interface Property {
  id: number;
  name: string;
  price: number;
  stock?: number;
  image: string | null;
  thumbnails?: string;
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
  const [isFavorited, setIsFavorited] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { addItem: addToFavorite, removeItem: removeFromFavorite, isFavorited: checkIsFavorited } = useFavoriteStore();

  useEffect(() => {
    setIsMounted(true);
    setIsFavorited(checkIsFavorited(String(property.id)));
  }, [property.id, checkIsFavorited]);

  const handleContactAgent = () => {
    // Format WhatsApp message dengan detail properti
    const message = `Halo, saya tertarik dengan properti *${property.name}* di ${property.location}\n\nHarga: ${formatRupiah(property.price)}\n\nBisa info lebih lanjut dan jadwal kunjungan?`;
    const encodedMessage = encodeURIComponent(message);
    // Ganti dengan nomor WhatsApp agent yang sebenarnya
    const whatsappUrl = `https://wa.me/62851234567?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleToggleFavorite = () => {
    if (!isMounted) return;

    const propertyId = String(property.id);
    
    if (isFavorited) {
      removeFromFavorite(propertyId);
      setIsFavorited(false);
      toast.success("Dihapus dari favorit");
    } else {
      addToFavorite({
        id: propertyId,
        name: property.name,
        price: property.price,
        image: property.image,
        source: 'properties',
        propertyType: property.propertyType || undefined,
        location: property.location || undefined,
      });
      setIsFavorited(true);
      toast.success("Ditambahkan ke favorit");
    }
  };

  // Parse thumbnails from JSON string
  let thumbnailImages: string[] = [];
  if (property.thumbnails) {
    try {
      thumbnailImages = JSON.parse(property.thumbnails);
    } catch (e) {
      console.error("Failed to parse thumbnails:", e);
      thumbnailImages = [];
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Property Images */}
        <div>
          <ThumbnailGallery 
            images={thumbnailImages}
            mainImage={property.image}
            title={property.name}
          />
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
                {property.propertyType === "Sell" ? "Sell" : "Rent"}
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
                <span className="font-semibold">Status : </span>{property.condition}
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
                  <div className="text-sm text-gray-600">Bedrooms</div>
                  <div className="font-semibold">{property.bedrooms}</div>
                </div>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Bath className="w-5 h-5" style={{ color: '#1e3a5f' }} />
                <div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                  <div className="font-semibold">{property.bathrooms}</div>
                </div>
              </div>
            )}
            {property.parkingSpaces && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <ParkingCircle className="w-5 h-5" style={{ color: '#1e3a5f' }} />
                <div>
                  <div className="text-sm text-gray-600">Parking</div>
                  <div className="font-semibold">{property.parkingSpaces}</div>
                </div>
              </div>
            )}
            {property.area && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Ruler className="w-5 h-5" style={{ color: '#1e3a5f' }} />
                <div>
                  <div className="text-sm text-gray-600">Building Area</div>
                  <div className="font-semibold">{property.area} m²</div>
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Features & Facility</h3>
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



          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <Button size="lg" onClick={handleContactAgent} className="w-full text-white" style={{ backgroundColor: '#1a5a5fe3' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16324a'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e3a5f'}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Direct Agent via WhatsApp
            </Button>
            <Button 
              size="lg" 
              onClick={handleToggleFavorite}
              className="w-full"
              variant={isFavorited ? "default" : "outline"}
              style={isFavorited ? { backgroundColor: '#e74c3c', color: 'white', borderColor: '#e74c3c' } : undefined}
            >
              <Heart className={`mr-2 h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
              {isFavorited ? 'Dihapus dari Favorit' : 'Simpan ke Favorit'}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Important Information</p>
              <p>Verify property data before making a decision. Contact the seller for more details.</p>
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
