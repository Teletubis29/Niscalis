import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { productIds } = await req.json();

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { error: "productIds must be a non-empty array" },
        { status: 400 }
      );
    }

    // Fetch products with their stock
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds.map((id) => parseInt(id)),
        },
      },
      select: {
        id: true,
        name: true,
        stock: true,
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("[PRODUCTS_STOCK_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch product stock" },
      { status: 500 }
    );
  }
}
