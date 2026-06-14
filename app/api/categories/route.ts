import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all unique categories
export async function GET() {
  try {
    const categories = await prisma.product.findMany({
      select: {
        category: true,
      },
      where: {
        category: {
          not: null,
        },
      },
      distinct: ["category"],
      orderBy: {
        category: "asc",
      },
    });

    // Extract unique category strings
    const uniqueCategories = categories
      .map((p) => p.category)
      .filter((cat) => cat !== null && cat.trim() !== "");

    return NextResponse.json(uniqueCategories);
  } catch (error) {
    console.error("[CATEGORIES_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
