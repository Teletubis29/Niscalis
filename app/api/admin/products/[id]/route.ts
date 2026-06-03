import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    const body = await request.json();

    const { name, description, price, image, stock, category, rating, reviews, thumbnails } = body;

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name: name || undefined,
        description: description !== undefined ? description : undefined,
        price: price !== undefined ? parseFloat(price) : undefined,
        image: image !== undefined ? image : undefined,
        stock: stock !== undefined ? parseInt(stock) : undefined,
        category: category !== undefined ? category : undefined,
        rating: rating !== undefined ? parseFloat(rating) : undefined,
        reviews: reviews !== undefined ? parseInt(reviews) : undefined,
        thumbnails: thumbnails !== undefined ? thumbnails : undefined,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_PUT]", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PRODUCT_DELETE]", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
