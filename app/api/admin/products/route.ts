import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    
    const response = NextResponse.json(products);
    // Disable caching to ensure fresh data from database
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST create product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { 
      name, 
      slug,
      sku,
      description, 
      price, 
      discount,
      image, 
      stock, 
      category, 
      rating, 
      reviews, 
      thumbnails,
      isFeatured,
      isNew
    } = body;

    if (!name || price === undefined) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        sku: sku || `SKU-${Date.now()}`,
        description: description || null,
        price: parseFloat(price),
        discount: discount && parseFloat(discount) > 0 ? parseFloat(discount) : null,
        image: image || null,
        stock: stock ? parseInt(stock) : 0,
        category: category || null,
        rating: rating ? parseFloat(rating) : null,
        reviews: reviews || 0,
        thumbnails: thumbnails || "[]",
        isFeatured: isFeatured || false,
        isNew: isNew || false,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
