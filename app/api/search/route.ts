import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get("q")?.trim()
    const type = searchParams.get("type") // 'products', 'properties', or 'all'

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] })
    }

    const limit = 8

    if (type === "products" || type === "all") {
      const products = await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          category: true,
          discount: true,
          isFeatured: true,
          isNew: true,
        },
        take: limit,
      })

      if (type === "products") {
        return NextResponse.json({
          results: products.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.image,
            type: "product",
            category: p.category,
            discount: p.discount,
            isFeatured: p.isFeatured,
            isNew: p.isNew,
          })),
        })
      }
    }

    if (type === "properties" || type === "all") {
      const properties = await prisma.property.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { location: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          location: true,
          propertyType: true,
        },
        take: limit,
      })

      if (type === "properties") {
        return NextResponse.json({
          results: properties.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.image,
            type: "property",
            location: p.location,
            propertyType: p.propertyType,
          })),
        })
      }
    }

    // If type === "all", combine both
    if (type === "all") {
      const products = await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          category: true,
          discount: true,
          isFeatured: true,
          isNew: true,
        },
        take: limit / 2,
      })

      const properties = await prisma.property.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { location: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          location: true,
          propertyType: true,
        },
        take: limit / 2,
      })

      const results = [
        ...products.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image,
          type: "product",
          category: p.category,
          discount: p.discount,
          isFeatured: p.isFeatured,
          isNew: p.isNew,
        })),
        ...properties.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image,
          type: "property",
          location: p.location,
          propertyType: p.propertyType,
        })),
      ]

      return NextResponse.json({ results })
    }

    return NextResponse.json({ results: [] })
  } catch (error) {
    console.error("[SEARCH_ERROR]", error)
    return NextResponse.json({ results: [] }, { status: 500 })
  }
}
