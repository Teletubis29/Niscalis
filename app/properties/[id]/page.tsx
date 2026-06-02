import { prisma } from "@/lib/prisma";
import PropertiesDetailPage from "@/app/properties/[id]/property-detail";

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

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const propertyId = parseInt(id);
    
    // Fetch single property directly from database
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    
    if (!property) {
      return (
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          Properties not found
        </div>
      );
    }
    
    // Fetch all properties for related properties
    const allProperties: Property[] = await prisma.property.findMany();
    const relatedProperties = allProperties
      .filter((p) => p.id !== property.id && p.category === property.category)
      .slice(0, 3);

    return <PropertiesDetailPage property={property as Property} relatedProperties={relatedProperties} />;
  } catch (error) {
    console.error('[PROPERTIES_DETAIL_PAGE]', error);
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-red-600">Failed to load property</p>
      </div>
    );
  }
}
