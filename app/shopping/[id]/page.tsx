import { prisma } from "@/lib/prisma";
import ProductDetailPage from "@/app/shopping/[id]/product-detail";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string | null;
  description: string | null;
  category: string | null;
  rating: number | null;
  reviews: number;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const productId = parseInt(id);
    
    // Fetch single product directly from database
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    
    if (!product) {
      return (
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          Product not found
        </div>
      );
    }
    
    // Fetch all products for related products
    const allProducts: Product[] = await prisma.product.findMany();
    
    const relatedProducts = allProducts
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 3);

    return <ProductDetailPage product={product as Product} relatedProducts={relatedProducts} />;
  } catch (error) {
    console.error('[PRODUCT_DETAIL_PAGE]', error);
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-red-600">Failed to load product</p>
      </div>
    );
  }
}
