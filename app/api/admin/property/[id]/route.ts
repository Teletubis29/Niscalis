import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Admin only - Get single property
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add authentication check for admin
    const { id } = await params;
    const propertyId = parseInt(id);

    if (isNaN(propertyId)) {
      return NextResponse.json(
        { error: "Invalid property ID" },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error("[ADMIN_PROPERTY_GET_ID]", error);
    return NextResponse.json(
      { error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}

// Admin only - Update property
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add authentication check for admin
    const { id } = await params;
    const propertyId = parseInt(id);

    if (isNaN(propertyId)) {
      return NextResponse.json(
        { error: "Invalid property ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      name,
      description,
      price,
      image,
      category,
      propertyType,
      location,
      bedrooms,
      bathrooms,
      parkingSpaces,
      area,
      landArea,
      yearBuilt,
      condition,
      features,
      rating,
    } = body;

    const property = await prisma.property.update({
      where: { id: propertyId },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(image && { image }),
        ...(category && { category }),
        ...(propertyType && { propertyType }),
        ...(location && { location }),
        ...(bedrooms !== undefined && { bedrooms: bedrooms ? parseInt(bedrooms) : null }),
        ...(bathrooms !== undefined && { bathrooms: bathrooms ? parseInt(bathrooms) : null }),
        ...(parkingSpaces !== undefined && { parkingSpaces: parkingSpaces ? parseInt(parkingSpaces) : null }),
        ...(area !== undefined && { area: area ? parseFloat(area) : null }),
        ...(landArea !== undefined && { landArea: landArea ? parseFloat(landArea) : null }),
        ...(yearBuilt !== undefined && { yearBuilt: yearBuilt ? parseInt(yearBuilt) : null }),
        ...(condition && { condition }),
        ...(features && { features }),
        ...(rating !== undefined && { rating }),
      },
    });

    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error("[ADMIN_PROPERTY_PUT]", error);
    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 500 }
    );
  }
}

// Admin only - Delete property
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add authentication check for admin
    const { id } = await params;
    const propertyId = parseInt(id);

    if (isNaN(propertyId)) {
      return NextResponse.json(
        { error: "Invalid property ID" },
        { status: 400 }
      );
    }

    await prisma.property.delete({
      where: { id: propertyId },
    });

    return NextResponse.json(
      { message: "Property deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ADMIN_PROPERTY_DELETE]", error);
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 }
    );
  }
}
