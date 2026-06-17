import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Get featured products or the first 6 products if no featured products exist
    const featuredProducts = await prisma.product.findMany({
      where: {
        isFeatured: true,
      },
      take: 6,
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
      },
    });

    // If no featured products, get the latest 6 products
    let productsToReturn = featuredProducts;
    if (productsToReturn.length === 0) {
      productsToReturn = await prisma.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 6,
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
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: productsToReturn,
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch featured products" },
      { status: 500 }
    );
  }
}
