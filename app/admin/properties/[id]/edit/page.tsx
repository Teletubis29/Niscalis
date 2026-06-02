"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";

interface Property {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
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

export default function EditPropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/admin/properties/${id}`);
        if (!res.ok) throw new Error("Failed to fetch property");
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  if (error || !property) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Property</h1>
        </div>
        <div className="rounded-lg bg-red-50 p-4 text-red-700">
          {error || "Property not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Property</h1>
        <p className="text-gray-600">Update property details</p>
      </div>
      <PropertyForm initialData={property} />
    </div>
  );
}
