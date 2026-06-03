"use client";

import { useState } from "react";
import { Star, Heart, Minus, Plus, Truck, RotateCcw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertAutoClose } from "@/components/ui/alert";
import { useCartStore } from "@/stores/cartStore";
import ProductCard from "@/components/ProductCard";
import ThumbnailGallery from "@/components/ThumbnailGallery";
import { formatRupiah } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  price: number;
  stock?: number;
  image: string | null;
  thumbnails?: string;
  description: string | null;
  category: string | null;
  rating: number | null;
  reviews: number;
  images?: string[];
  colors?: Array<{ name: string; value: string }>;
  sizes?: string[];
  features?: string[];
  originalPrice?: number;
  badge?: string;
}

type Props = { product: Product; relatedProducts: Product[] };

export default function ProductDetailPage({ product, relatedProducts }: Props) {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [alertState, setAlertState] = useState<{ title: string; message: string; variant: "default" | "destructive" } | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!product.stock || product.stock <= 0) {
      setAlertState({
        title: "Out of Stock",
        message: "Produk tidak tersedia (out of stock)",
        variant: "destructive"
      });
      return;
    }
    
    if (quantity > product.stock) {
      setAlertState({
        title: "Quantity Exceeds Stock",
        message: `Quantity tidak boleh lebih dari stock tersedia (${product.stock})`,
        variant: "destructive"
      });
      return;
    }

    // Check total items in cart for this product + new quantity
    const cartItems = useCartStore.getState().items;
    const currentItemInCart = cartItems.find((item) => item.id === String(product.id));
    const currentQuantityInCart = currentItemInCart?.quantity || 0;
    const totalQuantity = currentQuantityInCart + quantity;

    if (totalQuantity > product.stock) {
      setAlertState({
        title: "Total Stock Exceeds Available",
        message: `Only ${product.stock} items available in stock.`,
        variant: "destructive"
      });
      return;
    }
    
    addItem({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image || "/placeholder.svg",
      quantity: quantity
    });

    // Show success message
    setAlertState({
      title: "Added to Cart",
      message: `${product.name} berhasil ditambahkan ke cart`,
      variant: "default"
    });
  };

  // Parse thumbnails from JSON string
  let thumbnailImages: string[] = [];
  if (product.thumbnails) {
    try {
      thumbnailImages = JSON.parse(product.thumbnails);
    } catch (e) {
      console.error("Failed to parse thumbnails:", e);
      thumbnailImages = [];
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Alert Notification */}
      <AlertAutoClose
        isOpen={alertState !== null}
        onClose={() => setAlertState(null)}
        title={alertState?.title}
        message={alertState?.message || ""}
        variant={alertState?.variant}
        icon={<AlertCircle className="h-4 w-4" />}
      />
      
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Product Images */}
        <div>
          <ThumbnailGallery 
            images={thumbnailImages}
            mainImage={product.image}
            title={product.name}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">{product.name}</h1>
             <h1 className="text-sm text-gray-500 mb-2">
                Stock Available : <span className={product.stock ? (product.stock > 0 ? " font-medium" : "text-red-600 font-medium") : ""}>{product.stock || 0}</span>
              </h1>
            <div className="mb-4 flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating || 0)
                        ? "fill-current text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">{formatRupiah(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatRupiah(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {product.description && (
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          )}

          {/* Color Selection */}
          {product.colors && (
            <div>
              <h3 className="mb-3 font-semibold text-gray-900">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`h-10 w-10 rounded-full border-2 ${
                      selectedColor?.name === color.name
                        ? "border-primary border-4"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Quantity</h3>
             
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => {
                  const maxStock = product.stock || 0;
                  if (quantity < maxStock) {
                    setQuantity(quantity + 1);
                  }
                }}
                disabled={quantity >= (product.stock || 0)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button 
              onClick={handleAddToCart} 
              className="flex-1 py-4 text-base font-semibold" 
              size="lg"
              disabled={!product.stock || product.stock <= 0}
            >
              {!product.stock || product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
            <Button variant="outline" className="py-6 text-base font-semibold" size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>

          {/* Shipping Info */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center space-x-3">
              <Truck className="text-primary h-5 w-5" />
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-muted-foreground text-sm">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="text-primary h-5 w-5" />
              <div>
                <p className="font-medium">30-Day Returns</p>
                <p className="text-muted-foreground text-sm">Free returns within 30 days</p>
              </div>
            </div>
          </div>

          {/* Features */}
          {product.features && (
            <div className="border-t pt-6">
              <h3 className="mb-3 font-semibold text-gray-900">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="bg-primary h-2 w-2 rounded-full" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Related Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={{ ...product, id: String(product.id) } as any} basePath="/shopping" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
