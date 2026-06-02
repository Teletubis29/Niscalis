import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    // Increment views
    await prisma.property.update({
      where: { id: propertyId },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error("[PROPERTIES_GET_ID]", error);
    return NextResponse.json(
      { error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}
