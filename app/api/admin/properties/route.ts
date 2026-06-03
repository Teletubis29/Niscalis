import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Admin only - Get all properties
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check for admin
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const total = await prisma.property.count();
    const properties = await prisma.property.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        data: properties,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ADMIN_PROPERTIES_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

// Admin only - Create property
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check for admin
    const body = await request.json();

    const {
      name,
      description,
      price,
      stock,
      image,
      thumbnails,
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
    } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    const property = await prisma.property.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: stock ? parseInt(stock) : 0,
        image,
        thumbnails: thumbnails || "[]",
        category,
        propertyType: propertyType || "jual",
        location,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        parkingSpaces: parkingSpaces ? parseInt(parkingSpaces) : null,
        area: area ? parseFloat(area) : null,
        landArea: landArea ? parseFloat(landArea) : null,
        yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
        condition,
        features: features || [],
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("[ADMIN_PROPERTIES_POST]", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}
