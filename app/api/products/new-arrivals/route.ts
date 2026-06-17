import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Get the 8 most recent products ordered by createdAt
    const newArrivals = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        discount: true,
        image: true,
        category: true,
        rating: true,
        reviews: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: newArrivals,
    });
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch new arrivals" },
      { status: 500 }
    );
  }
}
