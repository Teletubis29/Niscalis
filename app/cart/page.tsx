"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertAutoClose } from "@/components/ui/alert";
import { useCartStore } from "@/stores/cartStore";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";

interface ProductStock {
  id: number;
  name: string;
  stock: number;
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const [productStocks, setProductStocks] = useState<Map<string, ProductStock>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);
  const [alertState, setAlertState] = useState<{ title: string; message: string } | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      setLoading(false);
      return;
    }

    const fetchStocks = async () => {
      try {
        const productIds = items.map((item) => item.id);
        const response = await fetch("/api/products/stock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productIds }),
        });

        if (response.ok) {
          const data = await response.json();
          const stockMap = new Map<string, ProductStock>();
          data.products.forEach((product: ProductStock) => {
            stockMap.set(String(product.id), product);
          });
          setProductStocks(stockMap);
        }
      } catch (error) {
        console.error("Failed to fetch product stocks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [items]);

  // Check if any item exceeds stock
  const hasStockViolation = items.some((item) => {
    const stock = productStocks.get(item.id);
    return stock && item.quantity > stock.stock;
  });

  // Get items that exceed stock for warnings
  const violatingItems = items.filter((item) => {
    const stock = productStocks.get(item.id);
    return stock && item.quantity > stock.stock;
  });

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          Looks like you haven&#39;t added anything to your cart yet.
        </p>
        <Link href="/shopping">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>

      {/* Alert Notification */}
      <AlertAutoClose
        isOpen={alertState !== null}
        onClose={() => setAlertState(null)}
        title={alertState?.title}
        message={alertState?.message || ""}
        variant="destructive"
        icon={<AlertCircle className="h-4 w-4" />}
      />

      {/* Stock Warning Alerts */}
      {violatingItems.length > 0 && (
        <div className="mb-6 space-y-3">
          {violatingItems.map((item) => {
            const stock = productStocks.get(item.id);
            return (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                <div className="flex-1">
                  <p className="font-semibold text-red-900">{stock?.name}</p>
                  <p className="text-sm text-red-800">
                    Quantity {item.quantity}, but only
                    {stock && stock.stock > 0 ? ` ${stock.stock} units` : " 0 units (out of stock)"} are available.
                    Please reduce the quantity to proceed with checkout.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="divide-y divide-gray-200">
          {items.map((item) => {
            const stock = productStocks.get(item.id);
            const exceedsStock = stock && item.quantity > stock.stock;
            const isOutOfStock = stock && stock.stock === 0;

            return (
              <div
                key={item.id}
                className={`flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:space-x-4 sm:p-6 ${
                  exceedsStock ? "bg-red-50" : ""
                }`}>
                {/* Image */}
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="h-24 w-24 rounded-lg object-cover sm:h-20 sm:w-20"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{formatRupiah(item.price)}</p>
                  {stock && (
                    <p className={`text-sm ${isOutOfStock ? "text-red-600 font-semibold" : exceedsStock ? "text-red-600" : "text-green-600"}`}>
                      {isOutOfStock ? "Out of Stock" : `Stock available: ${stock.stock}`}
                    </p>
                  )}
                </div>

                {/* Quantity Controls & Price - Desktop */}
                <div className="hidden sm:flex sm:items-center sm:space-x-3">
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        const result = updateQuantity(item.id, item.quantity - 1);
                        if (!result.success) {
                          setAlertState({
                            title: "Cannot Update Quantity",
                            message: result.message || "Failed to update quantity"
                          });
                          setTimeout(() => setAlertState(null), 3000);
                        }
                      }
                    }}
                    disabled={item.quantity <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
                    <Minus className="h-4 w-4 cursor-pointer" />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => {
                      const newQuantity = item.quantity + 1;
                      const result = updateQuantity(item.id, newQuantity);
                      if (!result.success) {
                        setAlertState({
                          title: "Stock Limit Reached",
                          message: result.message || `Cannot add more! Stock is insufficient.`
                        });
                        setTimeout(() => setAlertState(null), 3000);
                      }
                    }}
                    disabled={isOutOfStock}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
                    <Plus className="h-4 w-4 cursor-pointer" />
                  </button>
                </div>

                {/* Price - Desktop */}
                <div className="hidden sm:flex sm:flex-col sm:text-right sm:min-w-[120px]">
                  <p className="font-semibold text-gray-900">
                    {formatRupiah(item.price * item.quantity)}
                  </p>
                </div>

                {/* Delete Button - Desktop */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="hidden sm:flex sm:p-2 text-red-500 hover:text-red-700 cursor-pointer">
                  <Trash2 className="h-5 w-5" />
                </button>

                {/* Mobile Bottom Row - Quantity Controls & Actions */}
                <div className="flex sm:hidden items-center justify-between gap-4 pt-4 border-t border-gray-200">
                  {/* Quantity Section */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          const result = updateQuantity(item.id, item.quantity - 1);
                          if (!result.success) {
                            setAlertState({
                              title: "Cannot Update Quantity",
                              message: result.message || "Failed to update quantity"
                            });
                            setTimeout(() => setAlertState(null), 3000);
                          }
                        }
                      }}
                      disabled={item.quantity <= 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => {
                        const newQuantity = item.quantity + 1;
                        const result = updateQuantity(item.id, newQuantity);
                        if (!result.success) {
                          setAlertState({
                            title: "Stock Limit Reached",
                            message: result.message || `Cannot add more! Stock is insufficient.`
                          });
                          setTimeout(() => setAlertState(null), 3000);
                        }
                      }}
                      disabled={isOutOfStock}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Price & Delete Section */}
                  <div className="flex items-center justify-end gap-4">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatRupiah(item.price * item.quantity)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:text-red-700">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-primary text-2xl font-bold">{formatRupiah(getTotal())}</span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/shopping" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Continue Shopping
              </Button>
            </Link>
            {hasStockViolation ? (
              <Button disabled className="flex-1" size="lg">
                Fix Stock Issues to Checkout
              </Button>
            ) : (
              <Link href="/checkout" className="flex-1">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
