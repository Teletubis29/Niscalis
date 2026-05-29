import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Sample products data
const sampleProducts = [
  {
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
    description:
      "Experience exceptional sound quality with our premium wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and premium materials for ultimate comfort.",
    category: "audio",
    rating: 4.8,
    reviews: 124,
  },
  {
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "https://images.pexels.com/photos/22434765/pexels-photo-22434765.jpeg",
    description: "Track your fitness goals with our advanced smart watch.",
    category: "wearables",
    rating: 4.6,
    reviews: 89,
  },
  {
    name: "Minimalist Backpack",
    price: 79.99,
    image: "https://images.pexels.com/photos/1038391/pexels-photo-1038391.jpeg",
    description: "Stylish and functional backpack for everyday use.",
    category: "accessories",
    rating: 4.5,
    reviews: 156,
  },
  {
    name: "Portable SSD Storage",
    price: 149.99,
    image: "https://images.pexels.com/photos/5632613/pexels-photo-5632613.jpeg",
    description: "Fast and reliable portable storage solution.",
    category: "electronics",
    rating: 4.7,
    reviews: 203,
  },
  {
    name: "Bluetooth Speaker",
    price: 129.99,
    image: "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg",
    description: "Crystal clear sound in a portable package.",
    category: "audio",
    rating: 4.4,
    reviews: 203,
  },
  {
    name: "Professional Camera",
    price: 1299.99,
    image: "https://images.pexels.com/photos/606933/pexels-photo-606933.jpeg",
    description: "High-end camera for professional photography.",
    category: "photography",
    rating: 4.9,
    reviews: 78,
  },
];

export async function GET() {
  try {
    // Delete existing products
    await prisma.product.deleteMany({});

    // Create new products
    const products = await Promise.all(
      sampleProducts.map((product) =>
        prisma.product.create({
          data: {
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            category: product.category,
            rating: product.rating,
            reviews: product.reviews,
          },
        })
      )
    );

    return NextResponse.json(
      {
        message: "Database seeded successfully",
        count: products.length,
        products,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[SEED_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
